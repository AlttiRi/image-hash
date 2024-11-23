import {calculateMedian} from "./median.js";
import {GrayImageData} from "./mono-image-data.js";


export function scaleDownLinear(orig: GrayImageData, width: number, height: number, median = false): Uint8Array {
    if (median) {
        return scaleDownMedian(orig, width, height);
    }

    console.time("scaleDownLinear");
    if (width * height >= orig.width * orig.height) {
        return orig.data;
    }

    const dest = new Uint8Array(width * height);
    const yScale = orig.height / height;
    const xScale = orig.width  / width;
    console.log({yScale, xScale});

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const fromY = Math.trunc(yScale * y);
            const fromX = Math.trunc(xScale * x);
            const toY   = Math.trunc(yScale * (y + 1));
            const toX   = Math.trunc(xScale * (x + 1));
            const count = (toY - fromY) * (toX - fromX);

            let value = 0;
            for (let iy = fromY; iy < toY; iy++) {
                for (let ix = fromX; ix < toX; ix++) {
                    value += orig.data[iy * orig.width + ix];
                }
            }

            const meanValue = value / count;
            const index = y * width + x;
            dest[index] = Math.round(meanValue);
        }
    }

    console.timeEnd("scaleDownLinear");

    if (width <= 32) {
        printArray([...dest], width);
    }
    console.log(     dest.reduce((a, b) => a + b, 0) / dest.length);
    console.log(orig.data.reduce((a, b) => a + b, 0) / orig.data.length, "orig");

    return dest;
}

function scaleDownMedian(orig: GrayImageData, width: number, height: number): Uint8Array {
    console.time("scaleDownMedian");
    if (width * height >= orig.width * orig.height) {
        return orig.data;
    }

    const dest = new Uint8Array(width * height);
    const yScale = orig.height / height;
    const xScale = orig.width  / width;
    console.log({yScale, xScale, height, width});

    const cache = new Map();

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const fromY = Math.trunc(yScale * y);
            const fromX = Math.trunc(xScale * x);
            const toY   = Math.trunc(yScale * (y + 1));
            const toX   = Math.trunc(xScale * (x + 1));
            const count = (toY - fromY) * (toX - fromX);

            const value = cache.get(count);
            const medianArray = value || new Uint8Array(count);
            if (!value) {
                cache.set(count, medianArray);
            }

            let i = 0;
            for (let iy = fromY; iy < toY; iy++) {
                for (let ix = fromX; ix < toX; ix++) {
                    medianArray[i++] = orig.data[iy * orig.width + ix];
                }
            }

            const medianValue = calculateMedian(medianArray);

            const index = y * width + x;
            dest[index] = Math.round(medianValue);
        }
    }

    console.timeEnd("scaleDownMedian");

    if (width <= 32) {
        printArray([...dest], width);
    }
    console.log(     dest.reduce((a, b) => a + b, 0) / dest.length);
    console.log(orig.data.reduce((a, b) => a + b, 0) / orig.data.length, "orig");

    return dest;
}

function printArray(array: number[] | Uint8Array, columns: number) {
    // @ts-ignore
    console.log(array.reduce((acc: number[][], cur: number, i: number) => {
        if (i % columns === 0) {
            acc.push([]);
        }
        acc[Math.trunc(i / columns)].push(cur);
        return acc;
    }, []).map((a: number[]) => a.map(d => d.toString().padStart(3)).join(" ")).join("\n"));
}
