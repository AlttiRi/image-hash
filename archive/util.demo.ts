import fs from "node:fs";
import {readFile} from "node:fs/promises";
import jpeg from "jpeg-js";
// @ts-ignore (no types)
import PNG_Old from "png-js";
import {PNG} from "pngjs";
import sharp from "sharp";
import {createCanvas, ImageData, loadImage} from "canvas";
import getPixels from "get-pixels";
import {ImageDataLike, ImageDataLikeEx} from "@/types.ts";
import {MonoImageData} from "@/mono-image-data.ts";


// saveImageDataWithSharp saveImageDataWithCanvas
export const saveImageData = saveImageDataWithSharp;

export function saveImageDataWithSharp(imageData: ImageDataLikeEx, outputFilePath: string): Promise<sharp.OutputInfo> {
    const image: sharp.Sharp = sharp(imageData.data, {
        raw: {
            width: imageData.width,
            height: imageData.height,
            channels: imageData.channels ? imageData.channels : 4,
        }
    });
    return image.toFile(outputFilePath);
}

// very slow ~5 secs vs ~1.2 (sharp)
function saveImageDataWithCanvas(imageData: ImageDataLikeEx, outputFilePath: string) {
    const canvas = createCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext("2d");
    let iData: ImageData;
    if (imageData.channels === 1) {
        iData = toImageDataFromMono(imageData as MonoImageData); // todo?: add `isMono` guard function
    } else {
        if (imageData.channels) {
            throw new Error("Unsupported transform");
        }
        iData = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
    }
    ctx.putImageData(iData, 0, 0);
    const png = canvas.toBuffer();
    return fs.promises.writeFile(outputFilePath, png);
}
export function toImageDataFromMono(imageData: MonoImageData): ImageData {
    const array = imageData.data;
    const length = array.length;
    const data = new Uint8ClampedArray(length * 4);
    for (let i = 0; i < length; i++) {
        data[i * 4] = array[i];
        data[i * 4 + 1] = array[i];
        data[i * 4 + 2] = array[i];
        data[i * 4 + 3] = 255;
    }
    return new ImageData(data, imageData.width, imageData.height);
}
export function toMonoFromImageData(imageData: ImageDataLikeEx): MonoImageData {
    const array = imageData.data;
    const length = array.length / 4;
    const data = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        data[i] = array[i * 4];
    }
    return new MonoImageData(data, imageData.width, imageData.height);
}


// getImageDataWithSharp   getImageDataWithCanvas
// readFileImageDataEx (getImageDataWithGetPixels)   readFileImageDataExOld (old png) // wrong (?) jpg decoding
export const getImageDataFromFS = getImageDataWithSharp;

// "get-pixels"
// same as "jpeg-js" (very slow and incorrect)
// same as "pngjs" (slower than "sharp" or "canvas")
export async function getImageDataWithGetPixels(filePath: string): Promise<ImageDataLike> {
    // console.time("get-pixels");
    return new Promise((resolve, reject) =>
        getPixels(filePath, (err, ndarray) => {
            if (err) {
                reject(err);
            }
            // console.timeEnd("get-pixels");
            resolve({
                data: new Uint8ClampedArray(ndarray.data),
                width: ndarray.shape[0],
                height: ndarray.shape[1],
            });
        })
    );
}

// "sharp"
export async function getImageDataWithSharp(imagePath: string): Promise<ImageDataLike> {
    // console.time("sharp");
    const imageData = await sharp(imagePath)
        .ensureAlpha()
        .raw()
        .toBuffer({resolveWithObject: true});
    // console.timeEnd("sharp");
    const {data, info} = imageData;
    return {
        width: info.width,
        height: info.height,
        data: new Uint8ClampedArray(data),
    };
}

// "canvas"
export async function getImageDataWithCanvas(imagePath: string): Promise<ImageData> {
    // console.time("canvas");
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const idata = context.getImageData(0, 0, canvas.width, canvas.height);
    // console.timeEnd("canvas");
    return idata;
}

// "pngjs"
// 1 sec // 400 ms sharp // 600 canvas
async function getImageDataForPngWithPngjs(filePath: string): Promise<ImageDataLike> {
    return new Promise(async (resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(new PNG())
            .on("parsed", function(this: any) {
                const {width, height, data} = this;
                resolve({width, height, data: new Uint8ClampedArray(data)});
            }).on("error", reject);
    });
}
// "png-js"
// 2 secs // 400 ms sharp // 600 canvas
async function getImageDataForPngWithPngJs_Old(filePath: string): Promise<ImageDataLike> {
    const data = await readFile(filePath);
    const png = new PNG_Old(data);
    const imgData = {
        width: png.width,
        height: png.height,
        data: new Uint8ClampedArray(png.width * png.height * 4)
    };
    await new Promise<void>(resolve => {
        png.decodePixels((px: number) => {
            png.copyToImageData(imgData, px);
            resolve();
        });
    });
    return imgData;
}

// "jpeg-js"
// 3 secs // ~450 ms sharp // ~550 canvas
// very slow and result is different a bit
async function getImageDataForJpgWithJpegJs(filePath: string): Promise<ImageDataLike> {
    const data = await readFile(filePath);
    const jiData = jpeg.decode(data);
    return {...jiData, data: new Uint8ClampedArray(jiData.data)};
}

export async function readFileImageDataEx(filePath: string): Promise<ImageDataLike> {
    let idata: ImageDataLike;
    if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        // console.time("JpegJs");
        idata = await getImageDataForJpgWithJpegJs(filePath);
        // console.timeEnd("JpegJs");
    }
    if (filePath.endsWith(".png")) {
        // console.time("Pngjs");
        idata = await getImageDataForPngWithPngjs(filePath);
        // console.timeEnd("Pngjs");
    }
    if (idata!) { // ts!
        return idata;
    }
    throw new Error("Unsupported image extension");
}

/** with the old png parser */
export async function readFileImageDataExOld(filePath: string): Promise<ImageDataLike> {
    let idata: ImageDataLike;
    if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        // console.time("JpegJs");
        idata = await getImageDataForJpgWithJpegJs(filePath);
        // console.timeEnd("JpegJs");
    }
    if (filePath.endsWith(".png")) {
        // console.time("PngJs_Old");
        idata = await getImageDataForPngWithPngJs_Old(filePath);
        // console.timeEnd("PngJs_Old");
    }
    if (idata!) { // ts!
        return idata;
    }
    throw new Error("Unsupported image extension");
}
