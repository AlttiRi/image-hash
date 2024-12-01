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

export function _mHashCoreClassic(data: Uint8Array, width: number, height: number): Uint8Array {
    const median = calculateMedian(data);
    const hash = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            hash[y * width + x] = data[y * width + x] > median ? 255 : 0;
        }
    }
    return hash;
}
export function mHashCoreClassic({data, width, height}: GrayImageData): BiImageData {
    return new BiImageData(_mHashCoreClassic(data, width, height), width, height);
}

export function mHashCore({data, width, height}: GrayImageData): BiImageData {
    return new BiImageData(_mHashCore(data, width, height), width, height);
}

/**
 * Two conditions for the proper handling of images with extreme median values (~0 or ~255). Do not edit.
 *
 * On dark  images the median value will be a black pixel.
 * On light images the median value will be a white pixel.
 *
 * So, it prefers to display the light details on dark images and vice versa.
 *
 * Check the "big" hashes for the follow images:
 * - `black-bg-orthocanna-500x500`
 * - `screenshot-dark-purple-flower-1353x851` (look at the text on the screenshot)
 */
export function _mHashCore(data: Uint8Array, width: number, height: number): Uint8Array {
    const median = calculateMedian(data);
    const hash = new Uint8Array(width * height);
    if (median < 128) { // if value === median -> 0
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                hash[y * width + x] = data[y * width + x] > median ? 255 : 0;
            }
        }
    } else {            // if value === median -> 255
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                hash[y * width + x] = data[y * width + x] < median ? 0 : 255;
            }
        }
    }
    return hash;
}

export function bHashCore({data, width, height}: GrayImageData, bandCount?: number): BiImageData {
    if (bandCount) {
        bandCount = Math.min(height, bandCount);
    } else {
        bandCount = Math.ceil(height / 2);
    }
    const yScale = height / bandCount;
    const hashes: Uint8Array[] = [];
    for (let bandNum = 0, offset = 0; bandNum < bandCount; bandNum++) {
        const fromY = Math.round(yScale *  bandNum);
        const toY   = Math.round(yScale * (bandNum + 1));
        const bandHeight = toY - fromY;
        const pixelsInBand = bandHeight * width;
        const view = new Uint8Array(data.buffer, offset, pixelsInBand);
        const hash = _mHashCore(view, width, bandHeight);
        hashes.push(hash);
        offset += pixelsInBand;
    }
    const result = new Uint8Array(width * height);
    for (let i = 0, offset = 0; i < hashes.length; i++) {
        result.set(hashes[i], offset);
        offset += hashes[i].length;
    }
    return new BiImageData(result, width, height);
}
