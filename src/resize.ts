import {calculateMedian} from "./median.js";
import {GrayImageData, MonoImageData} from "./mono-image-data.js";
import {Round, ScaleOpts} from "./types.js";


const defaultSize = 8;

export function scaleDownLinear(orig: GrayImageData, opts: ScaleOpts = {}): GrayImageData {
    const width  = opts.size || opts.width  || defaultSize;
    const height = opts.size || opts.height || defaultSize;
    const round  = opts.round || "round";
    const {median = false, ignore = false} = opts;
    if (width === orig.width && height === orig.height) {
        return orig;
    }
    if (width > orig.width || height > orig.height) {
        if (ignore) {
            return orig;
        }
        throw new Error("Up-scaling is not supported");
    }
    let data: Uint8Array;
    if (median) {
        data = scaleDownLinearMedian(orig, width, height, round);
    } else {
        data = scaleDownLinearAverage(orig, width, height, round);
    }
    return new GrayImageData(data, width, height);
}


export function scaleDownLinearAverage(orig: GrayImageData, newWidth: number, newHeight: number, round: Round = "round"): Uint8Array {
    const dest = new Uint8Array(newWidth * newHeight);
    const initPixel = getInitPixel(orig, dest, newWidth, newHeight, round);
    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
            initPixel(newX, newY);
        }
    }
    return dest;
}
// todo: use (value + 0.5) << 0 — "Faster Math.round for positive numbers"
function getInitPixel(orig: GrayImageData, dest: Uint8Array, newWidth: number, newHeight: number, round: Round = "round") {
    const {data, width, height} = orig;
    const xScale = width  / newWidth;
    const yScale = height / newHeight;
    const near: (n: number) => number = Math[round];
    return function initPixel(newX: number, newY: number) {
        const fromY = near(yScale * newY);
        const fromX = near(xScale * newX);
        const toY   = near(yScale * (newY + 1));
        const toX   = near(xScale * (newX + 1));
        const count = (toY - fromY) * (toX - fromX);

        let value = 0;
        let offset = fromY * width; // notable optimisation
        for (let y = fromY; y < toY; y++) {
            for (let x = fromX; x < toX; x++) {
                value += data[offset + x];
            }
            offset += width;
        }
        // todo?: pass `newY * newWidth + newX` as initPixel param (`index: number`) — it's a bit faster
        dest[newY * newWidth + newX] = Math.round(value / count); // do not return a value, init inside, it's faster
    }
}

export function scaleDownLinearMedian(orig: GrayImageData, newWidth: number, newHeight: number, round: Round = "round"): Uint8Array {
    const dest = new Uint8Array(newWidth * newHeight);
    const initPixel = getInitPixelMedian(orig, dest, newWidth, newHeight, round);
    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
            initPixel(newX, newY);
        }
    }
    return dest;
}
function getInitPixelMedian(orig: GrayImageData, dest: Uint8Array, newWidth: number, newHeight: number, round: Round = "round") {
    const {data, width, height} = orig;
    const xScale = width  / newWidth;
    const yScale = height / newHeight;
    const near: (n: number) => number = Math[round];
    const cache = new Map();
    return function foo(newX: number, newY: number) {
        const fromY = near(yScale * newY);
        const fromX = near(xScale * newX);
        const toY   = near(yScale * (newY + 1));
        const toX   = near(xScale * (newX + 1));
        const count = (toY - fromY) * (toX - fromX);

        const value = cache.get(count);
        const medianArray = value || new Uint8Array(count);
        if (!value) {
            cache.set(count, medianArray);
        }

        let i = 0;
        let offset = fromY * width;
        for (let y = fromY; y < toY; y++) {
            for (let x = fromX; x < toX; x++) {
                medianArray[i++] = data[offset + x];
            }
            offset += width;
        }

        const medianValue = calculateMedian(medianArray);
        dest[newY * newWidth + newX] = Math.round(medianValue);
    }
}


function printArray(array: number[] | Uint8Array, columns: number) {
    console.log(getPrintedArray(array, columns));
}

export function getPrintedArray(array: number[] | Uint8Array, columns: number) {
    // @ts-ignore
    return array.reduce((acc: number[][], cur: number, i: number) => {
        if (i % columns === 0) {
            acc.push([]);
        }
        acc[Math.trunc(i / columns)].push(cur);
        return acc;
    }, []).map((a: number[]) => a.map(d => d.toString().padStart(3)).join(" ")).join("\n")
}

export function scaleUpIntegerTwice<T extends MonoImageData>(orig: T): T {
    return scaleUpNearestNeighbor(orig, orig.width * 2, orig.height * 2);
}

export function scaleUpNearestNeighbor<T extends MonoImageData>(orig: T, newWidth: number, newHeight: number): T {
    const {data, width, height} = orig;
    const dest = new Uint8Array(newWidth * newHeight);
    const xScale = width  / newWidth;
    const yScale = height / newHeight;

    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
            const x = Math.trunc(newX * xScale);
            const y = Math.trunc(newY * yScale);
            dest[newY * newWidth + newX] = data[y * width + x];
        }
    }
    return orig.newInstance<T>(dest, newWidth, newHeight);
}

export function scaleDownLinearAverageX(source: GrayImageData, newWidth: number, newHeight: number, round: Round = "round"): Uint8Array {
    const {data, width, height} = source;
    const dest = new Uint8Array(newWidth * newHeight);
    const xScale = width  / newWidth;
    const yScale = height / newHeight;
    let offsetDest = 0;
    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
            const fromY = yScale * newY + 0.5 << 0;
            const fromX = xScale * newX + 0.5 << 0;
            const toY   = yScale * (newY + 1) + 0.5 << 0;
            const toX   = xScale * (newX + 1) + 0.5 << 0;
            const count = (toY - fromY) * (toX - fromX);
            let value = 0;
            let offsetSource = fromY * width;
            for (let y = fromY; y < toY; y++) {
                for (let x = fromX; x < toX; x++) {
                    value += data[offsetSource + x];
                }
                offsetSource += width;
            }
            dest[offsetDest + newX] = (value / count) + 0.5 << 0;
        }
        offsetDest += newWidth;
    }
    return dest;
}
