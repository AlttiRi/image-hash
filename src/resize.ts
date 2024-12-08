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
    const dest = new GrayImageData(new Uint8Array(width * height), width, height);
    if (median) {
        scaleDownLinearMedianEx(orig, dest, round);
    } else {
        scaleDownLinearAverageEx(orig, dest, round);
    }
    return dest;
}


type SingleChannelImageData = { data: Uint8Array; width: number; height: number; };

function scaleDownLinearAverageEx(from: SingleChannelImageData, to: SingleChannelImageData, round: Round = "round") {
    if (round === "round") {
        return scaleDownLinearAverageRound(from, to);
    }
    const near: (n: number) => number = Math[round];
    const {data: orig, width, height} = from;
    const {data: dest, width: newWidth, height: newHeight} = to;
    const xScale = width  / newWidth;
    const yScale = height / newHeight;
    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
            const fromY = near(yScale * newY);
            const fromX = near(xScale * newX);
            const toY   = near(yScale * (newY + 1));
            const toX   = near(xScale * (newX + 1));
            const count = (toY - fromY) * (toX - fromX);
            let value = 0;
            for (let y = fromY; y < toY; y++) {
                for (let x = fromX; x < toX; x++) {
                    value += orig[y * width + x];
                }
            }
            dest[newY * newWidth + newX] = value / count + 0.5 << 0;
        }
    }
}
function scaleDownLinearAverageRound(from: SingleChannelImageData, to: SingleChannelImageData) {
    const {data: orig, width, height} = from;
    const {data: dest, width: newWidth, height: newHeight} = to;
    const xScale = width  / newWidth;
    const yScale = height / newHeight;
    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
            const fromY = yScale * newY       + 0.5 << 0;
            const fromX = xScale * newX       + 0.5 << 0;
            const toY   = yScale * (newY + 1) + 0.5 << 0;
            const toX   = xScale * (newX + 1) + 0.5 << 0;
            const count = (toY - fromY) * (toX - fromX);
            let value = 0;
            for (let y = fromY; y < toY; y++) {
                for (let x = fromX; x < toX; x++) {
                    value += orig[y * width + x];
                }
            }
            dest[newY * newWidth + newX] = value / count + 0.5 << 0;
        }
    }
}

function scaleDownLinearMedianEx(from: SingleChannelImageData, to: SingleChannelImageData, round: Round = "round") {
    const {data: orig, width, height} = from;
    const {data: dest, width: newWidth, height: newHeight} = to;
    const xScale = width  / newWidth;
    const yScale = height / newHeight;
    const near: (n: number) => number = Math[round];
    const cache = new Map();
    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
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
                    medianArray[i++] = orig[offset + x];
                }
                offset += width;
            }
            const medianValue = calculateMedian(medianArray);
            dest[newY * newWidth + newX] = Math.round(medianValue);
        }
    }
}


export function scaleDownLinearAverage(orig: GrayImageData, width: number, height: number, round: Round = "round"): Uint8Array {
    const data = new Uint8Array(width * height);
    scaleDownLinearAverageEx(orig, {data, width, height}, round);
    return data;
}
export function scaleDownLinearMedian(orig: GrayImageData, width: number, height: number, round: Round = "round"): Uint8Array {
    const data = new Uint8Array(width * height);
    scaleDownLinearMedianEx(orig, {data, width, height}, round);
    return data;
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

export function scaleUpNearestNeighbor<T extends MonoImageData>(
    orig: T, newWidth: number, newHeight: number, integer = false
): T {
    if (integer) {
        newWidth  = orig.width  * (newWidth  / orig.width  << 0); // "Math.trunc"
        newHeight = orig.height * (newHeight / orig.height << 0);
    }

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

