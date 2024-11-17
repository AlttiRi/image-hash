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


class Hash {
    public readonly hash: Uint8Array;
    constructor(hash: Uint8Array) {
        this.hash = hash;
    }
    get size(): number {
        return this.hash.byteLength;
    }
    get hex(): string {
        return ui8aToHex(this.hash);
    }
    get binary(): string {
        return ui8aToBinary(this.hash);
    }
    static fromHex(hexLine: string): Hash {
        return new Hash(hexToUi8a(hexLine));
    }
    static fromBinary(binLine: string): Hash {
        return new Hash(binaryToUi8a(binLine));
    }
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

export function binaryToUi8a(binary: string): Uint8Array {
    binary = binary.replace(/_|\s+/g, "").replace(/^0b/, "");
    if (binary.length % 8) {
        binary = "0".repeat(8 - binary.length % 8) + binary;
    }
    const ui8a = new Uint8Array(binary.length / 8);
    for (let i = 0, k = 0; i < binary.length; i++, k += 8) {
        const byteString = binary.slice(k, k + 8);
        ui8a[i] = parseInt(byteString, 2);
    }
    return ui8a;
}
