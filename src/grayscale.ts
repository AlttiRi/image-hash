import {GrayImageData} from "./mono-image-data.js";

/**
 * Using of 1 `getUint32 is faster than 3 accesses by index (`array[N]`).
 * `getCalculateBT601` is faster than:
 *   array[i / 4] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
 * or `getCalculateAverage` is faster than:
 *   array[i / 4] = (data[i] + data[i + 1] + data[i + 2]) / 3;
 *
 * Using `dw.getUint32` inside the function is faster,
 *   than using `dw.getUint32` in a loop and passing `uint` directly to the function.
 * Do not change the get functions' signature.
 */
function getCalculateBT601(dw: DataView) {
    return function calculateBT601(i: number) {
        const uint = dw.getUint32(i);
        return ((uint >> 24) & 0xFF) * 0.299
            +  ((uint >> 16) & 0xFF) * 0.587
            +  ((uint >>  8) & 0xFF) * 0.114;
    };
}
function getCalculateAverage(dw: DataView) {
    return function calculateAverage(i: number) {
        const uint = dw.getUint32(i);
        return ((uint >> 24) & 0xFF)
            +  ((uint >> 16) & 0xFF)
            +  ((uint >>  8) & 0xFF) / 3;
    };
}
function getCalculateBT709(dw: DataView) {
    return function calculateBT709(i: number) {
        const uint = dw.getUint32(i);
        return ((uint >> 24) & 0xFF) * 0.2126
            +  ((uint >> 16) & 0xFF) * 0.7152
            +  ((uint >>  8) & 0xFF) * 0.0722;
    };
}

export function getGrayData(imageData: {
    data:   Uint8ClampedArray
    width:  number
    height: number
}) {
    const {data, width, height, data: {length}} = imageData;
    const array = new Uint8Array(length / 4); // todo: use Uint32Array

    const dw = new DataView(data.buffer);
    const calculateLuminance = getCalculateBT601(dw);

    // It runs 25_000_000 iterations for 5000x5000 image,
    // so, don't use `i < data.length`, but `i < length`.
    for (let i = 0; i < length; i += 4) {
        array[i / 4] = calculateLuminance(i);
    }
    return new GrayImageData(array, width, height);
}
