import fs from "node:fs";
import sharp from "sharp";
import {createCanvas, ImageData, loadImage} from "canvas";
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


// getImageDataWithSharp getImageDataWithCanvas
export const getImageDataFromFS = getImageDataWithSharp;

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
