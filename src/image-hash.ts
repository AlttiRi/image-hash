import {BiImageData} from "./mono-image-data.js";

export class ImageHash {
    public readonly mono: BiImageData; // todo: make private
    private constructor(mid: BiImageData) {
        this.mono = mid;
    }

    static fromMono(mono: BiImageData) {
        return new ImageHash(mono);
    }
    getMono(copy = false): BiImageData {
        if (copy) {
            const {data, width, height} = this.mono;
            return new BiImageData(new Uint8Array(data), width, height);
        }
        return this.mono;
    }

    static fromHex(hexLine: string, width?: number, height?: number): ImageHash {
        const biUi8a = hexToBiUi8a(hexLine);
        return ImageHash.from(biUi8a, width, height);
    }
    static fromBin(binLine: string, width?: number, height?: number): ImageHash {
        const biUi8a = binToBiUi8a(binLine);
        return ImageHash.from(biUi8a, width, height);
    }
    private static from(biUi8a: Uint8Array, width?: number, height?: number): ImageHash {
        if (!width || !height) {
            ({width, height} = calculateSquareSize(biUi8a.length));
        } else {
            const square = width * height;
            if (square < biUi8a.length && square + 8 > biUi8a.length) {
                biUi8a = biUi8a.slice(biUi8a.length - square);
            }
        }
        const mono = new BiImageData(biUi8a, width, height);
        return ImageHash.fromMono(mono);
    }

    /** Bits size */
    get size(): number {
        return this.mono.data.length;
    }

    get hex(): string {
        return biUi8aToHex(this.mono.data);
    }
    get bin(): string {
        return biUi8aToBin(this.mono.data);
    }

    diff(hash: ImageHash): number {
        return hammingDistanceBiUi8a(this.mono.data, hash.mono.data);
    }
    diffHex(hex: string): number { // todo: add sizes params
        return hammingDistanceBiUi8a(this.mono.data, ImageHash.fromHex(hex).mono.data);
    }
    diffBin(bin: string): number {
        return hammingDistanceBiUi8a(this.mono.data, ImageHash.fromBin(bin).mono.data);
    }
    static diffHex(hex1: string, hex2: string) {
        return ImageHash.fromHex(hex1).diffHex(hex2);
    }
    static diffBin(bin1: string, bin2: string) {
        return ImageHash.fromBin(bin1).diffBin(bin2);
    }

}

export function calculateSquareSize(pixelCount: number) {
    const sqrt = Math.sqrt(pixelCount);
    if (sqrt % 1 === 0) {
        return {width: sqrt, height: sqrt};
    }
    return {width: 0, height: 0};
}

export function hexToBiUi8a(hex: string): Uint8Array {
    hex = hex.replace(/_|\s+/g, "").replace(/^0x/, "");
    if (hex.length % 2) {
        hex = "0" + hex;
    }
    const ui8a = new Uint8Array(hex.length * 4);
    for (let k = 0, j = 0; k < hex.length; k += 2) {
        const byte = parseInt(hex.slice(k, k + 2), 16);
        for (let i = 7; i >= 0; i--) {
            ui8a[j++] = ((byte >> i) & 1 ? 255 : 0);
        }
    }
    return ui8a;
}

export function binToBiUi8a(bin: string): Uint8Array {
    bin = bin.replace(/_|\s+/g, "").replace(/^0b/, "");
    if (bin.length % 8) {
        bin = "0".repeat(8 - bin.length % 8) + bin;
    }
    const ui8a = new Uint8Array(bin.length);
    let i = 0;
    for (const bit of bin) {
        ui8a[i++] = bit === "1" ? 255 : 0;
    }
    return ui8a;
}

export function biUi8aToHex(biUi8a: Uint8Array): string {
    const remainder = biUi8a.length % 8;
    if (remainder) {
        const extendedLength = biUi8a.length + 8 - remainder;
        const _biUi8a = new Uint8Array(extendedLength);
        _biUi8a.set(biUi8a, extendedLength - biUi8a.length);
        biUi8a = _biUi8a;
    }
    const byteArray: number[] = [];
    let currentByte = 0;
    for (let i = 0; i < biUi8a.length; i++) {
        const bit = biUi8a[i] === 0 ? 0 : 1;
        currentByte = (currentByte << 1) | bit;
        if ((i + 1) % 8 === 0) {
            byteArray.push(currentByte);
            currentByte = 0;
        }
    }
    const hexes = byteArray.map(byte => byte.toString(16).padStart(2, "0"));
    return hexes.join("");
}

export function biUi8aToBin(biUi8a: Uint8Array): string {
    const byteArray: string[] = [];
    const remainder = biUi8a.length % 8;
    if (remainder) {
        byteArray.push("0".repeat(8 - remainder));
    }
    for (const bitStr of biUi8a) {
        byteArray.push(bitStr ? "1" : "0");
    }
    return byteArray.join("");
}

export function hammingDistanceBiUi8a(arr1: Uint8Array, arr2: Uint8Array): number {
    if (arr1.length !== arr2.length) {
        return -1;
    }
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            count++;
        }
    }
    return count;
}
