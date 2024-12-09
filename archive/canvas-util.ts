import {createCanvas, ImageData, loadImage} from "canvas";
import {ImageDataLikeEx} from "../src/types";
import {MonoImageData} from "../src/mono-image-data";
import fs from "node:fs";
import {toImageDataFromMono} from "../demo/util.demo";


export async function getImageDataWithCanvas(imagePath: string): Promise<ImageData> {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

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
        iData = new ImageData(new Uint8ClampedArray(imageData.data.buffer), imageData.width, imageData.height);
    }
    ctx.putImageData(iData, 0, 0);
    const png = canvas.toBuffer();
    return fs.promises.writeFile(outputFilePath, png);
}

// 1 channel gray-scaled image data common 3 channels ImageData
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
