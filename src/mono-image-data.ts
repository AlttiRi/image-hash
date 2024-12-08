import {ImageDataLikeEx} from "./types.js";

/** ImageData fot only one channel (luminance). */
export class MonoImageData implements ImageDataLikeEx {
    public readonly data: Uint8Array;
    public readonly width:  number;
    public readonly height: number;
    public readonly channels: 1 = 1;
    constructor(data: Uint8Array, width: number, height: number) {
        const mult = width * height;
        if (mult !== data.length || !mult) {
            throw new Error("Incorrect data");
        }
        this.data   = data;
        this.width  = width;
        this.height = height;
    }
    newInstance<T extends MonoImageData>(data: Uint8Array, width: number, height: number): T {
        // @ts-ignore
        return new this.constructor(data, width, height);
    }
}

/** "binary"/"black-white" image pixels (`0` and `255` values) */
export class BiImageData extends MonoImageData {
    public readonly type = "binary";
}

/** "gray-scaled" image pixels (values from `0` up to `255`) */
export class GrayImageData extends MonoImageData { // todo?: store `calculateLuminance.name` and verify it
    public readonly type = "gray-scaled";
}
