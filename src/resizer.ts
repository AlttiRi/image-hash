const data1 = [
    11, 11, 14, 14, 66, 78,
    11, 11, 14, 14, 66, 78,
    12, 12, 11, 55,  8,  8,
    12, 12, 11, 55,  8,  8,
    19, 91, 44, 28,  2,  2,
    19, 91, 44, 28,  2,  2,
] as unknown as Uint8ClampedArray;
const data2 = [
    11, 11, 14, 14, 66, 78, 255, 255, 255,
    11, 11, 14, 14, 66, 78, 255, 255, 255,
    12, 12, 11, 55,  8,  8, 255, 255, 255,
    12, 12, 11, 55,  8,  8,   1,   1,   1,
    19, 91, 44, 28,  2,  2,   1,   1,   1,
    19, 91, 44, 28,  2,  2,   1,   1,   1,
    5,  5,  5,   0,  0,  0,   9,   9,   9,
    5,  5,  5,   0,  0,  0,   9,   9,   9,
    5,  5,  5,   0,  0,  0,   9,   9,   9,
] as unknown as Uint8ClampedArray;
const inputData1 = {data: data1, height: 6, width: 6};
const inputData2 = {data: data2, height: 9, width: 9};
const to = 3;
scaleDown1(inputData1, to, to); // wrong result when 255, 255, 255 pixels and % !== 0

export function scaleDown1(orig: {data: Uint8ClampedArray, height: number, width: number}, width: number, height: number): number[] {
    if (orig.height % height !== 0 || orig.width % width !== 0) {
        throw "% ! 0";
    }
    console.time("scaleDown1");

    let dest = Array.from({ length: (width * height)}, () => 0);

    for (let y = 0; y < orig.height; y++) {
        for (let x = 0; x < orig.width; x++) {
            const indexY = Math.trunc(y * height / orig.height);
            const indexX = Math.trunc(x * width  / orig.width);
            const index = indexY * width + indexX;
            const value = orig.data[y * orig.width + x];

            dest[index] = (dest[index] + value);
        }
    }
    const size = (orig.width / width * orig.height / height);
    console.log(size);
    dest = dest.map(value => Math.round(value / size));

    console.timeEnd("scaleDown1");

    printArray([...dest], width);
    console.log(dest.reduce((a, b) => a + b, 0) / dest.length);
    return dest;
}


function printArray(array: number[], columns: number) {
    console.log(array.reduce((acc: number[][], cur: number, i: number) => {
        if (i % columns === 0) {
            acc.push([]);
        }
        acc[Math.trunc(i / columns)].push(cur);
        return acc;
    }, []).map((a: number[]) => a.map(d => d.toString().padStart(3)).join(" ")).join("\n"));
}
