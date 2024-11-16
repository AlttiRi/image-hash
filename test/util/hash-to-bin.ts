import {ANSI_BLUE, t} from "../tester.ts";
import {ui8aToBinary} from "@/util.ts";


console.log(ANSI_BLUE("--- Hash Binary ---"));

t({
    result: ui8aToBinary(new Uint8ClampedArray()),
    expect: "",
    name: "empty"
});
t({
    result: ui8aToBinary(new Uint8ClampedArray(0)),
    expect: "",
    name: "empty"
});
t({
    result: ui8aToBinary(new Uint8Array()),
    expect: "",
    name: "empty"
});
t({
    result: ui8aToBinary(new Uint8ClampedArray(1)),
    expect: "00000000",
    name: "8-bits"
});
t({
    result: ui8aToBinary(new Uint8Array(2)),
    expect: "0000000000000000",
    name: "16-bits"
});
t({
    result: ui8aToBinary(new Uint8Array(8)),
    expect: "0000000000000000000000000000000000000000000000000000000000000000",
    name: "64-bits"
});

t({
    result: ui8aToBinary(new Uint8Array([])),
    expect: "",
    name: "empty"
});
t({
    result: ui8aToBinary(new Uint8Array([1])),
    expect: "00000001",
    name: "16-bits"
});
t({
    result: ui8aToBinary(new Uint8Array([255])),
    expect: "11111111",
    name: "16-bits"
});
t({
    result: ui8aToBinary(new Uint8Array([255, 255, 255, 255])),
    expect: "11111111111111111111111111111111",
    name: "32-bits"
});
t({
    result: ui8aToBinary(new Uint8Array([255, 0, 255, 0, 255, 0, 255, 0])),
    expect: "1111111100000000111111110000000011111111000000001111111100000000",
    name: "64-bits"
});
t({
    result: ui8aToBinary(new Uint8Array([0, 255, 0, 255, 0, 255, 0, 255])),
    expect: "0000000011111111000000001111111100000000111111110000000011111111",
    name: "64-bits"
});

t({
    result: ui8aToBinary(new Uint8Array([0,  1,  2,  3,  4,  5,  6,  7])),
    expect: "0000000000000001000000100000001100000100000001010000011000000111"
});
t({
    result: ui8aToBinary(new Uint8Array([8,  9, 10, 11, 12, 13, 14, 15])),
    expect: "0000100000001001000010100000101100001100000011010000111000001111"
});
t({
    result: ui8aToBinary(new Uint8Array([16, 17, 18, 19, 20, 21, 22, 23])),
    expect: "0001000000010001000100100001001100010100000101010001011000010111"
});
t({
    result: ui8aToBinary(new Uint8Array([24, 25, 26, 27, 28, 29, 30, 31])),
    expect: "0001100000011001000110100001101100011100000111010001111000011111"
});
t({
    result: ui8aToBinary(new Uint8Array([32, 33, 34, 35, 36, 37, 38, 39])),
    expect: "0010000000100001001000100010001100100100001001010010011000100111"
});
t({
    result: ui8aToBinary(new Uint8Array([40, 41, 42, 43, 44, 45, 46, 47])),
    expect: "0010100000101001001010100010101100101100001011010010111000101111"
});
t({
    result: ui8aToBinary(new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55])),
    expect: "0011000000110001001100100011001100110100001101010011011000110111"
});
t({
    result: ui8aToBinary(new Uint8Array([56, 57, 58, 59, 60, 61, 62, 63])),
    expect: "0011100000111001001110100011101100111100001111010011111000111111"
});
t({
    result: ui8aToBinary(new Uint8Array([64, 122, 186, 198, 202, 228, 244, 238])),
    expect: "0100000001111010101110101100011011001010111001001111010011101110"
});

t({
    result: ui8aToBinary(new Uint8Array([0])),
    expect: "00000000"
});
t({
    result: ui8aToBinary(new Uint8Array([1])),
    expect: "00000001"
});
t({
    result: ui8aToBinary(new Uint8Array([255])),
    expect: "11111111"
});
t({
    result: ui8aToBinary(new Uint8Array([255, 0])),
    expect: "1111111100000000"
});
t({
    result: ui8aToBinary(new Uint8Array([0, 255])),
    expect: "0000000011111111"
});
t({
    result: ui8aToBinary(new Uint8Array([255, 2])),
    expect: "1111111100000010"
});
t({
    result: ui8aToBinary(new Uint8Array([2, 255])),
    expect: "0000001011111111"
});
