// calculateMedianByCountSorting
// calculateMedianBySorting
export const calculateMedian = calculateMedianByCountSorting;

export function calculateMedianBySorting(arr: Uint8ClampedArray, copy = true) {
    if (copy) {
        arr = Uint8ClampedArray.from(arr);
    }
    const mid = Math.trunc(arr.length / 2);
    arr.sort((a, b) => a - b);
    if (arr.length % 2 === 0) {
        return (arr[mid - 1] + arr[mid]) / 2;
    } else {
        return arr[mid];
    }
}

export function calculateMedianByCountSorting(ui8ca: Uint8ClampedArray): number {
    let counts: Uint8Array | Uint16Array | Uint32Array/* | number[] */;
    if (ui8ca.length > 256) {
        // counts = Array.from({length: 256}, () => 0);
        if (ui8ca.length > 65535) {
            counts = new Uint32Array(256);
        } else {
            counts = new Uint16Array(256);
        }
    } else {
        counts = new Uint8Array(256);
    }

    for (const value of ui8ca) {
        counts[value]++;
    }

    const middle = ui8ca.length / 2;
    let passedCount = 0;
    for (let i = 0; i < 256; i++) {
        const count = counts[i];
        passedCount += count;
        if (passedCount >= middle) {
            if (middle % 1 === 0 && passedCount - middle === 0) {
                let nextI = i;
                for (let j = i + 1; j < 256; j++) {
                    if (counts[j]) {
                        nextI = j;
                        break;
                    }
                }
                return (i + nextI) / 2;
            }
            return i;
        }
    }

    throw new Error("Unreachable code was reached");
}

// let a = new Uint8ClampedArray([255,3,45,56,5,5,56,4,6,3,2,6,7,3,5,6,3,4,5,6,3,33,66,88]);
// // a = new Uint8ClampedArray([2, 2, 2,  3, 4,   5, 5, 5]);
// a = new Uint8ClampedArray([ ]);
// console.log(
//     calculateMedianByCountSorting(a) === calculateMedianBySorting(a),
//     calculateMedianByCountSorting(a),
//     calculateMedianBySorting(a),
// );
