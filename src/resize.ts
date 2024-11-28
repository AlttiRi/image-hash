import {calculateMedian} from "./median.js";
import {GrayImageData} from "./mono-image-data.js";

type ScaleOpts = {
    width:  number
    height: number
    median?: boolean
}

export function scaleDownLinear(orig: GrayImageData, {width, height, median = false}: ScaleOpts): GrayImageData {
    if (width * height >= orig.width * orig.height) {
        // Dummy scale-up support for tiny input
        return scaleDownLinear(scaleUpIntegerTwice(orig), {width, height, median});
    }
    let data: Uint8Array;
    if (median) {
        data = scaleDownLinearMedian(orig, width, height);
    } else {
        data = scaleDownLinearAverage(orig, width, height);
    }
    return new GrayImageData(data, width, height);
}


export function scaleDownLinearAverage(orig: GrayImageData, width: number, height: number): Uint8Array {
    // console.time("scaleDownLinear");

    const dest = new Uint8Array(width * height);
    const yScale = orig.height / height;
    const xScale = orig.width  / width;
    // console.log({yScale, xScale});

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

    // console.timeEnd("scaleDownLinear");

    // if (width <= 32) {
    //     printArray([...dest], width);
    // }
    // console.log(     dest.reduce((a, b) => a + b, 0) / dest.length);
    // console.log(orig.data.reduce((a, b) => a + b, 0) / orig.data.length, "orig");

    return dest;
}

export function scaleDownLinearMedian(orig: GrayImageData, width: number, height: number): Uint8Array {
    // console.time("scaleDownMedian");

    const dest = new Uint8Array(width * height);
    const yScale = orig.height / height;
    const xScale = orig.width  / width;
    // console.log({yScale, xScale, height, width});

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

    // console.timeEnd("scaleDownMedian");
    //
    // if (width <= 32) {
    //     printArray([...dest], width);
    // }
    // console.log(     dest.reduce((a, b) => a + b, 0) / dest.length);
    // console.log(orig.data.reduce((a, b) => a + b, 0) / orig.data.length, "orig");

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

export function scaleUpIntegerTwice(orig: GrayImageData): GrayImageData {
    const {data, width, height} = orig;

    const newWidth  = orig.width  * 2;
    const newHeight = orig.height * 2;
    const newData = new Uint8Array(newWidth * newHeight);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelValue = data[y * width + x];
            const x1 = x * 2;
            const y1 = y * 2;
            const x2 = x1 + 1;
            const y2 = y1 + 1;

            newData[y1 * newWidth + x1] = pixelValue;
            newData[y1 * newWidth + x2] = pixelValue;
            newData[y2 * newWidth + x1] = pixelValue;
            newData[y2 * newWidth + x2] = pixelValue;
        }
    }

    return new GrayImageData(newData, newWidth, newHeight);
}
