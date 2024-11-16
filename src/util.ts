/**
 * 16 bit counts for values from 0b0000 to 0b1111 (from 0 to 15 including both end)
 * @example
 * const bitCounts = [];
 * for (let i = 0; i < 16; i++) {
 *     bitCounts.push([...i.toString(2)].filter(b => b === "1").length);
 * }
 * console.log(bitCounts);
 */
const bitCounts = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];

export function hammingDistanceHex(hash1: string, hash2: string) {
    if (hash1.length !== hash2.length) {
        return -1;
    }

    let count = 0;
    for (let i = 0; i < hash1.length; i++) {
        const value1 = parseInt(hash1[i], 16);
        const value2 = parseInt(hash2[i], 16);
        count += bitCounts[value1 ^ value2];
    }
    return count;
}


class Hash {
    public readonly hash: Uint8ClampedArray;
    constructor(hash: Uint8ClampedArray) {
        this.hash = new Uint8ClampedArray();
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

    // todo
    // static fromHex(hash: string): Hash {
    //     return new Hash(new Uint8ClampedArray(hash.length));
    // }
    // static fromBinary(hash: string): Hash {
    //     return new Hash(new Uint8ClampedArray(hash.length));
    // }
}

export function ui8aToHex(ui8a: Uint8ClampedArray | Uint8Array): string {
    const hexes = [];
    for (const byte of ui8a) {
        hexes.push(byte.toString(16).padStart(2, "0"));
    }
    return hexes.join("");
}

export function ui8aToBinary(ui8a: Uint8ClampedArray | Uint8Array): string {
    const hexes = [];
    for (const byte of ui8a) {
        hexes.push(byte.toString(2).padStart(8, "0"));
    }
    return hexes.join("");
}

/**
 * 32 bits version. Just for example.
 * Useless. 8x8 hash is 64-bits, and it's more than `Number.MAX_SAFE_INTEGER`
 * 0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111
 * 0xFFFFFFFFFFFFFFFF
 * todo: use ArrayBuffer
 */
export function hammingDistance32(hash1: number, hash2: number, length = 32) {
    if (hash1 > 0xFFFFFFFF || hash2 > 0xFFFFFFFF) {
        return -1;
    }

    let xorResult = hash1 ^ hash2;
    let distance = 0;
    for (let i = 0; i < length; i++) {
        distance += xorResult & 1;
        xorResult >>= 1;
    }
    return distance;
}


