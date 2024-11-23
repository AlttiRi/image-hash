// calculateMedianByCountSorting
// calculateMedianBySorting
export const calculateMedian = calculateMedianByCountSorting;

export function calculateMedianBySorting(arr: Uint8Array, copy = true) {
    if (copy) {
        arr = Uint8Array.from(arr);
    }
    const mid = Math.trunc(arr.length / 2);
    arr.sort((a, b) => a - b);
    if (arr.length % 2 === 0) {
        return (arr[mid - 1] + arr[mid]) / 2;
    } else {
        return arr[mid];
    }
}

export function calculateMedianByCountSorting(ui8ca: Uint8Array): number {
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

    const to = ui8ca.length;
    for (let i = 0; i < to; i++) { // do not use slow `for of` loop
        counts[ui8ca[i]]++;
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

export function calculateAverage(ui8ca: Uint8Array): number {
    let sum = 0;
    for (let i = 0; i < ui8ca.length; i++) {
        sum += ui8ca[i];
    }
    return sum / ui8ca.length;
}
