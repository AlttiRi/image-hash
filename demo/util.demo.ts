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


export function saveImageData(imageData: ImageDataLikeEx, outputFilePath: string, channels: 4 | 1 | 2 | 3 = 4): Promise<sharp.OutputInfo> {
    const image: sharp.Sharp = sharp(imageData.data, {
        raw: {
            width: imageData.width,
            height: imageData.height,
            channels: imageData.channels ? imageData.channels : channels,
        }
    });
    return image.toFile(outputFilePath);
}


// getImageDataWithSharp   getImageDataWithCanvas
// readFileImageDataEx (getImageDataWithGetPixels)   readFileImageDataExOld (old png)
export const readFileImageData = readFileImageDataEx;

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
async function getImageDataWithSharp(imagePath: string) {
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
async function parsePng(filePath: string): Promise<ImageDataLike> {
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
async function parsePngOld(filePath: string): Promise<ImageDataLike> {
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
async function parseJpeg(filePath: string): Promise<ImageDataLike> {
    const data = await readFile(filePath);
    const jiData = jpeg.decode(data);
    return {...jiData, data: new Uint8ClampedArray(jiData.data)};
}

export async function readFileImageDataEx(filePath: string): Promise<ImageDataLike> {
    let idata: ImageDataLike;
    if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        // console.time("parseJpeg");
        idata = await parseJpeg(filePath);
        // console.timeEnd("parseJpeg");
    }
    if (filePath.endsWith(".png")) {
        // console.time("parsePng");
        idata = await parsePng(filePath);
        // console.timeEnd("parsePng");
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
        // console.time("parseJpeg");
        idata = await parseJpeg(filePath);
        // console.timeEnd("parseJpeg");
    }
    if (filePath.endsWith(".png")) {
        // console.time("parsePngOld");
        idata = await parsePngOld(filePath);
        // console.timeEnd("parsePngOld");
    }
    if (idata!) { // ts!
        return idata;
    }
    throw new Error("Unsupported image extension");
}
