import fs from "node:fs";
import {readFile} from "node:fs/promises";
import jpeg from "jpeg-js";
// @ts-ignore (no types)
import PNG from "png-js";
import {PNG as PNGjs} from "pngjs";
import sharp from "sharp";
import {createCanvas, ImageData, loadImage} from "canvas";
import {ImageDataLike} from "@/types.ts";


// getImageDataWithSharp getImageDataWithCanvas readFileImageDataEx
export const readFileImageData = readFileImageDataEx;

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
            .pipe(new PNGjs())
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
    const png = new PNG(data);
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

        // console.time("parsePngOld");
        // idata = await parsePngOld(filePath);
        // console.timeEnd("parsePngOld");
    }
    if (idata!) { // ts!
        return idata;
    }
    throw new Error("Unsupported image extension");
}
