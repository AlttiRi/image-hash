/** ImageData fot only one channel (luminance). */
export class MonoImageData {
    public data: Uint8Array;
    public width:  number;
    public height: number;
    constructor(data: Uint8Array, width: number, height: number) {
        this.data = data;
        if (width * height !== data.length) {
            throw new Error("Incorrect data");
        }
        this.width  = width;
        this.height = height;
    }
}

/** "binary"/"black-white" image pixels (`0` and `255` values) */
export class BiImageData extends MonoImageData {
    type = "binary";
}

/** "gray-scaled" image pixels (values from `0` up to `255`) */
export class GrayImageData extends MonoImageData {
    type = "gray-scaled";
}
