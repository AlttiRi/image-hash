import {calculateAverage, calculateMedian} from "./median.js";

/** difference hash */
function dHash(data: Uint8Array, width: number, height: number) {
    const _width = width - 1;
    const hash = new Uint8Array(_width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < _width; x++) {
            hash[y * _width + x] = data[y * width + x + 1] > data[y * width + x] ? 255 : 0;
        }
    }
    return hash;
}

/** average hash */
export function aHash(data: Uint8Array, width: number, height: number) {
    const mean = calculateAverage(data);
    const hash = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            hash[y * width + x] = data[y * width + x] > mean ? 255 : 0;
        }
    }
    return hash;
}

/** median hash */
export function mHash(data: Uint8Array, width: number, height: number) {
    const median = calculateMedian(data);
    const hash = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            hash[y * width + x] = data[y * width + x] > median ? 255 : 0;
        }
    }
    return hash;
}

/** block hash */
export function bHash(data: Uint8Array, width: number, height: number) {
    const bandHeight = 2;
    const bandCount    = height / bandHeight;
    const pixelsInBand = width  * bandHeight;
    const hashes: Uint8Array[] = [];

    // console.log({bandCount, pixelsInBand});

    for (let i = 0; i < bandCount; i++) {
        const byteOffset = pixelsInBand * i;
        let length = pixelsInBand * i + pixelsInBand - pixelsInBand * i;

        if (byteOffset + length > data.length) { // when pixels count is even (like 9x9)
            length = data.length - byteOffset;
        }
        const view = new Uint8Array(data.buffer, byteOffset, length);
        const hash = mHash(view, width, bandHeight);
        hashes.push(hash);
    }

    const hash = new Uint8Array(width * height);
    for (let i = 0; i < bandCount; i++) {
        for (let j = 0; j < hashes[i].length; j++) {
            hash[i * hashes[i].length + j] = hashes[i][j];
        }
    }

    return hash;
}

