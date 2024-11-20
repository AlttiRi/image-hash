/**
 * 16 bit counts for values from 0b0000 to 0b1111 (from 0 to 15 including both end)
 * @example
 * const bitCounts = [];
 * for (let i = 0; i < 16; i++) {
 *     bitCounts.push([...i.toString(2)].filter(b => b === "1").length);
 * }
 * console.log(bitCounts);
 */
const bitCounts16 = /*#__PURE__*/ [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]; // todo: test tree-shaking

export function hammingDistanceHex(hash1: string, hash2: string) {
    if (hash1.length !== hash2.length) {
        return -1;
    }

    let count = 0;
    for (let i = 0; i < hash1.length; i++) {
        const value1 = parseInt(hash1[i], 16);
        const value2 = parseInt(hash2[i], 16);
        count += bitCounts16[value1 ^ value2];
    }
    return count;
}


type UI8A = Uint8Array | Uint8ClampedArray;

export function hammingDistance(hash1: UI8A, hash2: UI8A) {
    if (hash1.length !== hash2.length) {
        return -1;
    }
    let distance = 0, xorDiff, {length} = hash1;
    for (let i = 0; i < length; i++) {
        xorDiff = hash1[i] ^ hash2[i];
        while (xorDiff > 0) {
            distance += xorDiff & 1;
            xorDiff >>= 1;
        }
    }
    return distance;
}


export class Hash {
    // todo?: bits size
    public readonly data: Uint8Array;
    constructor(hash: Uint8Array) {
        this.data = hash;
    }
    static fromHex(hexLine: string): Hash {
        return new Hash(hexToUi8a(hexLine));
    }
    static fromBinary(binLine: string): Hash {
        return new Hash(binaryToUi8a(binLine));
    }
    get size(): number {
        return this.data.byteLength;
    }
    get hex(): string {
        return ui8aToHex(this.data);
    }
    get binary(): string { // todo: rename to bin
        return ui8aToBinary(this.data);
    }
    diff(hash: Hash): number {
        return hammingDistance(this.data, hash.data);
    }
    toMono() {
        return new MonoImageData(bitsToArray(this.data));
    }
    static fromMono(mono: MonoImageData) {
        return new Hash(arrayToBits(mono.data));
    }
}


// ImageData with one channel for black-white or gray-scaled pixels
export class MonoImageData {
    public data: Uint8Array;
    public width:  number = 0;
    public height: number = 0;
    constructor(data: Uint8Array, width?: number, height?: number) {
        this.data = data;
        if (width !== undefined) {
            this.width = width;
            if (height === undefined) {
                this.height = Math.trunc(data.length / width);
            } else {
                this.height = height;
            }
        }
        if (this.width * this.height !== data.length) {
            const size = calculateSquareSize(data.length);
            this.width  = size.width;
            this.height = size.height;
        }
    }
}

/**
 * Finds a square size from the count of pixels.
 * Width may be a bit (by 1 pixel) bigger than height.
 * Either returns `0` for both sides.
 */
export function calculateSquareSize(pixelCount: number) {
    const sqrt = Math.sqrt(pixelCount);
    if (sqrt % 1 === 0) {
        return {width: sqrt, height: sqrt};
    }
    const h = Math.trunc(sqrt);
    const w = pixelCount / h;
    if (w !== h + 1) {
        return {width: 0, height: 0};
    }
    return {width: w, height: h};
}

export function ui8aToHex(ui8a: UI8A): string {
    const hexes = [];
    for (const byte of ui8a) {
        hexes.push(byte.toString(16).padStart(2, "0"));
    }
    return hexes.join("");
}

export function ui8aToBinary(ui8a: UI8A): string {
    const hexes = [];
    for (const byte of ui8a) {
        hexes.push(byte.toString(2).padStart(8, "0"));
    }
    return hexes.join("");
}

export function hexToUi8a(hex: string): Uint8Array {
    hex = hex.replace(/_|\s+/g, "").replace(/^0x/, "");
    if (hex.length % 2) {
        hex = "0" + hex;
    }
    const length = hex.length / 2;
    const ui8a = new Uint8Array(length);
    for (let i = 0, k = 0; i < length; i++, k += 2) {
        ui8a[i] = parseInt(hex.slice(k, k + 2), 16);
    }
    return ui8a;
}

export function binaryToUi8a(binary: string): Uint8Array { // todo: rename "to bits"
    binary = binary.replace(/_|\s+/g, "").replace(/^0b/, "");
    if (binary.length % 8) {
        binary = "0".repeat(8 - binary.length % 8) + binary;
    }
    const length = binary.length / 8;
    const ui8a = new Uint8Array(length);
    for (let i = 0, k = 0; i < length; i++, k += 8) {
        const byteString = binary.slice(k, k + 8);
        ui8a[i] = parseInt(byteString, 2);
    }
    return ui8a;
}

/**
 * Maps a number' bits:
 *
 * 0 -> `0`, 1 -> `255`
 * @example
 * new Uint8Array([0b0000_0111]) -> new Uint8Array([0,0,0,0, 0,255,255,255])
 */
export function bitsToArray(hash: Uint8Array): Uint8Array {
    const result: number[] = [];
    for (const byte of hash) {
        for (let i = 7; i >= 0; i--) {
            result.push((byte >> i) & 1 ? 255 : 0);
        }
    }
    return new Uint8Array(result);
}

/** Reverse version of `bitsToArray` */
export function arrayToBits(bits: Uint8Array): Uint8Array {
    const byteArray: number[] = [];

    let currentByte = 0;
    for (let i = 0; i < bits.length; i++) {
        const bit = bits[i] === 255 ? 1 : 0;
        currentByte = (currentByte << 1) | bit;
        if ((i + 1) % 8 === 0) {
            byteArray.push(currentByte);
            currentByte = 0;
        }
    }
    if (bits.length % 8) {
        byteArray.push(currentByte);
    }
    return new Uint8Array(byteArray);
}
