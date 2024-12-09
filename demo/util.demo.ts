import fs from "node:fs";
import sharp from "sharp";
import {ImageDataLike, ImageDataLikeEx} from "@/types.ts";
import {GrayImageData, MonoImageData} from "@/mono-image-data.ts";
import Pica from "pica";


export const getImageDataFromFS = getImageDataWithSharp;
export const saveImageData = saveImageDataWithSharp;

// `useFs` is to add support of long paths
export async function getImageDataWithSharp(imagePath: string, useFs = true): Promise<ImageDataLike> {
    let inputData: string | ArrayBufferLike = imagePath;
    if (useFs) {
        inputData = fs.readFileSync(imagePath).buffer;
    }
    const imageData = await sharp(inputData)
        .ensureAlpha()
        .raw()
        .toBuffer({resolveWithObject: true});
    const {data, info} = imageData;
    return {
        width: info.width,
        height: info.height,
        data: new Uint8ClampedArray(data.buffer),
    };
}
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

// ---

// 1 channel gray-scaled image data common 3 channels ImageData
export function toImageDataFromMono(imageData: MonoImageData): ImageDataLike {
    const array = imageData.data;
    const length = array.length;
    const data = new Uint8ClampedArray(length * 4);
    for (let i = 0; i < length; i++) {
        data[i * 4] = array[i];
        data[i * 4 + 1] = array[i];
        data[i * 4 + 2] = array[i];
        data[i * 4 + 3] = 255;
    }
    return {data, width: imageData.width, height: imageData.height};
}
// expects the image was already gray-scaled
export function toMonoFromImageData(imageData: ImageDataLikeEx): MonoImageData {
    const array = imageData.data;
    const length = array.length / 4;
    const data = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        data[i] = array[i * 4];
    }
    return new MonoImageData(data, imageData.width, imageData.height);
}

// ---

export async function getGrayDataWithSharp(iData: ImageDataLike) {
    const {data, info: {width, height}} = await sharp(iData.data, {
        raw: {
            width: iData.width,
            height: iData.height,
            channels: 4,
        }
    }).grayscale()
        .raw()
        .toBuffer({resolveWithObject: true});

    return new GrayImageData(data, width, height);
}

// very slow for every "kernel" mode except "nearest" (but it produces very bad result)
export async function getGrayDataScaledWithSharp(iData: ImageDataLike, width = 8, height = 8,
                                                 kernel: "nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3") {
    const sh = await sharp(iData.data, {
        raw: {
            width: iData.width,
            height: iData.height,
            channels: 4,
        }
    }).grayscale()
        .resize({
            fit: "fill",
            kernel,
            width,
            height,
        })
        .raw()
        .toBuffer({resolveWithObject: true});

    return new GrayImageData(sh.data, sh.info.width, sh.info.height);
}

export async function resizeGrayDataWithPica(grayData: GrayImageData, toWidth = 8, toHeight = 8,
                                             filter: "lanczos2" | "lanczos3" | "box" | "hamming" | "mks2013"
) {
    const pica = new Pica();
    const data = new Uint8Array(toWidth * toHeight * 4);
    await pica.resizeBuffer({
        src: new Uint8Array(toImageDataFromMono(grayData).data.buffer),
        dest: data,
        width: grayData.width,
        height: grayData.height,
        toWidth,
        toHeight,
        filter,
    });
    const iData: ImageDataLikeEx = {
        data,
        width: toWidth,
        height: toHeight,
        channels: 4,
    }
    return new GrayImageData(toMonoFromImageData(iData).data, toWidth, toHeight);
}
