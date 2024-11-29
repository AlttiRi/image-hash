import {calculateMedian} from "./median.js";
import {GrayImageData, MonoImageData} from "./mono-image-data.js";

type ScaleOpts = {
    width?:  number
    height?: number
    median?: boolean
    ignore?: boolean
}

export function scaleDownLinear(orig: GrayImageData, opts: ScaleOpts = {}): GrayImageData {
    const {width = 8, height = 8, median = false, ignore = false} = opts;
    if (width === orig.width || height === orig.height) {
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
        data = scaleDownLinearMedian(orig, width, height);
    } else {
        data = scaleDownLinearAverage(orig, width, height);
    }
    return new GrayImageData(data, width, height);
}


export function scaleDownLinearAverage(orig: GrayImageData, newWidth: number, newHeight: number): Uint8Array {
    // console.time("scaleDownLinearAverage");

    const {data, width, height} = orig;
    const dest = new Uint8Array(newWidth * newHeight);
    const xScale = width  / newWidth;
    const yScale = height / newHeight;

    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
            const fromY = Math.trunc(yScale * newY);
            const fromX = Math.trunc(xScale * newX);
            const toY   = Math.trunc(yScale * (newY + 1));
            const toX   = Math.trunc(xScale * (newX + 1));
            const count = (toY - fromY) * (toX - fromX);

            let value = 0;
            for (let y = fromY; y < toY; y++) {
                for (let x = fromX; x < toX; x++) {
                    value += data[y * width + x];
                }
            }

            dest[newY * newWidth + newX] = Math.round(value / count);
        }
    }

    return dest;
}

export function scaleDownLinearMedian(orig: GrayImageData, newWidth: number, newHeight: number): Uint8Array {
    // console.time("scaleDownLinearMedian");

    const {data, width, height} = orig;
    const dest = new Uint8Array(newWidth * newHeight);
    const xScale = width  / newWidth;
    const yScale = height / newHeight;

    const cache = new Map();
    for (let newY = 0; newY < newHeight; newY++) {
        for (let newX = 0; newX < newWidth; newX++) {
            const fromY = Math.trunc(yScale * newY);
            const fromX = Math.trunc(xScale * newX);
            const toY   = Math.trunc(yScale * (newY + 1));
            const toX   = Math.trunc(xScale * (newX + 1));
            const count = (toY - fromY) * (toX - fromX);

            const value = cache.get(count);
            const medianArray = value || new Uint8Array(count);
            if (!value) {
                cache.set(count, medianArray);
            }

            let i = 0;
            for (let y = fromY; y < toY; y++) {
                for (let x = fromX; x < toX; x++) {
                    medianArray[i++] = data[y * width + x];
                }
            }

            const medianValue = calculateMedian(medianArray);
            dest[newY * newWidth + newX] = Math.round(medianValue);
        }
    }

    return dest;
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
