import {BiImageData, GrayImageData} from "./mono-image-data.js";
import {calculateAverage, calculateMedian} from "./median.js";

export function dHashCore({data, width, height}: GrayImageData): BiImageData {
    const _width = width - 1;
    const hash = new Uint8Array(_width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < _width; x++) {
            hash[y * _width + x] = data[y * width + x + 1] > data[y * width + x] ? 255 : 0;
        }
    }
    return new BiImageData(hash, _width, height);
}

export function aHashCore({data, width, height}: GrayImageData): BiImageData {
    const mean = calculateAverage(data);
    const hash = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            hash[y * width + x] = data[y * width + x] > mean ? 255 : 0;
        }
    }
    return new BiImageData(hash, width, height);
}

export function mHashCore({data, width, height}: GrayImageData): BiImageData {
    const hash = _mHashCore(data, width, height);
    return new BiImageData(hash, width, height);
}

function _mHashCore(data: Uint8Array, width: number, height: number): Uint8Array {
    const median = calculateMedian(data);
    const hash = new Uint8Array(width * height);
    if (median === 255) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                hash[y * width + x] = data[y * width + x] === median ? 255 : 0;
            }
        }
    } else {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                hash[y * width + x] = data[y * width + x] > median ? 255 : 0;
            }
        }
    }
    return hash;
}

export function bHashCore({data, width, height}: GrayImageData): BiImageData {
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
        const hash = _mHashCore(view, width, bandHeight);
        hashes.push(hash);
    }

    const hash = new Uint8Array(width * height);
    for (let i = 0; i < bandCount; i++) {
        for (let j = 0; j < hashes[i].length; j++) {
            hash[i * hashes[i].length + j] = hashes[i][j];
        }
    }
    return new BiImageData(hash, width, height);
}
