import {ANSI_BLUE, t} from "../tester.ts";
import {hammingDistance} from "@/util.ts";

console.log(ANSI_BLUE("--- Hamming Distance (UI8A) ---"));


const u8 = (...args: number[]) => {
    if (args.some(a => a > 255)) { throw new Error(`Some value is over 1 byte.`); }
    return new Uint8Array(args);
};

t({
    result: hammingDistance(new Uint8Array([0, 255]), new Uint8Array([255, 0])),
    expect: 16
});
t({
    result: hammingDistance(new Uint8Array([0, 0, 0, 0]), new Uint8Array([0, 0, 255, 0])),
    expect: 8
});
t({
    result: hammingDistance(new Uint8Array([0, 0, 0, 0]), new Uint8Array([0, 0, 0, 0])),
    expect: 0
});
t({
    result: hammingDistance(new Uint8Array([0, 0, 0, 0]), new Uint8Array([0])),
    expect: -1
});
t({
    result: hammingDistance(new Uint8ClampedArray([0, 255]), new Uint8Array([255, 0])),
    expect: 16
});
t({
    result: hammingDistance(new Uint8ClampedArray([0, 255]), new Uint8ClampedArray([255, 0])),
    expect: 16
});
t({
    result: hammingDistance(new Uint8ClampedArray([127]), new Uint8ClampedArray([0])),
    expect: 7
});
t({
    result: hammingDistance(new Uint8ClampedArray([0]), new Uint8ClampedArray([127])),
    expect: 7
});
t({
    result: hammingDistance(new Uint8ClampedArray([0]), new Uint8ClampedArray([128])),
    expect: 1
});
t({
    result: hammingDistance(new Uint8ClampedArray([127]), new Uint8ClampedArray([128])),
    expect: 8
});

t({
    result: hammingDistance(u8(), u8()),
    expect: 0
});
t({
    result: hammingDistance(u8(128), u8(128)),
    expect: 0
});
t({
    result: hammingDistance(u8(0), u8(128)),
    expect: 1
});
t({
    result: hammingDistance(u8(0, 0), u8(1)),
    expect: -1, name: "diff length"
});
t({
    result: hammingDistance(u8(0, 1), u8(1, 1)),
    expect: 1
});
t({
    result: hammingDistance(
        u8(0b0000_0000, 0b0000_0000),
        u8(0b0000_0000, 0b0000_0000)),
    expect: 0
});
t({
    result: hammingDistance(
        u8(0b0000_1111, 0b0000_1111),
        u8(0b0000_0000, 0b0000_0000)),
    expect: 8
});
t({
    result: hammingDistance(
        u8(0b0000_1111, 0b0000_1111),
        u8(0b0000_1111, 0b0000_0000)),
    expect: 4
});
t({
    result: hammingDistance(
        u8(0b0000_1111, 0b0000_1111),
        u8(0b0000_1111, 0b0000_0000)),
    expect: 4
});
t({
    result: hammingDistance(
        u8(0b0000_1111, 0b0000_1111),
        u8(0b1111_1111, 0b0000_0000)),
    expect: 8
});
t({
    result: hammingDistance(
        u8(0xff,        0xff),
        u8(0xff, 0b1111_1111)),
    expect: 0
});
t({
    result: hammingDistance(
        u8(0xff, 0xff),
        u8(0xff,    0)),
    expect: 8
});
t({
    result: hammingDistance(
        u8(   0, 0xff),
        u8(0xff,    0)),
    expect: 16
});
t({
    result: hammingDistance(
        u8(   0, 0xff, 0xff, 0, 0xff, 0, 0xff, 0),
        u8(0xff,    0, 0xff, 0, 0xff, 0, 0xff, 0)),
    expect: 16
});
t({
    result: hammingDistance(
        u8(   0, 0xff, 0xff, 0, 0xff, 0xff,    0, 0),
        u8(0xff,    0, 0xff, 0, 0xff,    0, 0xff, 0)),
    expect: 32
});
t({
    result: hammingDistance(
        u8(   0, 0xff,    0, 0xff,    0, 0xff,    0, 0xff),
        u8(0xff,    0, 0xff,    0, 0xff,    0, 0xff,    0)),
    expect: 64
});
t({
    result: hammingDistance(
        u8(   0, 0xff,    0, 0xff,    0, 0xff,    0, 0xff,    0, 0xff),
        u8(0xff,    0, 0xff,    0, 0xff,    0, 0xff,    0, 0xff,    0)),
    expect: 80
});

t({
    result: hammingDistance(
        u8(128, 64, 32, 8),
        u8(  0,  0,  0, 0)),
    expect: 4
});
t({
    result: hammingDistance(
        u8(128, 64, 32, 8),
        u8(133, 21,  9, 1)),
    expect: 11
});

