import {readFileSync} from "node:fs";
import jpeg from "jpeg-js";
// @ts-ignore (no types)
import PNG from "png-js";
import {ImageDataLike} from "@/types.ts";


export async function readFileImageData(filePath: string): Promise<ImageDataLike> {
    if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        const data = readFileSync(filePath);
        const jiData = jpeg.decode(data);
        return {...jiData, data: new Uint8ClampedArray(jiData.data)}
    }
    if (filePath.endsWith(".png")) {
        const data = readFileSync(filePath);
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
    throw new Error("Unsupported image extension");
}
