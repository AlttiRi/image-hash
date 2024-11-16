import {ANSI_BLUE, t} from "../tester.ts";
import {hammingDistance32} from "@/util.ts";

console.log(ANSI_BLUE("--- Hamming Distance UINT32 ---"));


t({
    result: hammingDistance32(0b0000, 0b0000),
    expect: 0
});
t({
    result: hammingDistance32(0b0000, 0b0001),
    expect: 1
});
t({
    result: hammingDistance32(0b0000, 0b0011),
    expect: 2
});
t({
    result: hammingDistance32(0b0000, 0b1111),
    expect: 4
});
t({
    result: hammingDistance32(0b1100, 0b0011),
    expect: 4
});
t({
    result: hammingDistance32(0b1010, 0b0000),
    expect: 2
});
t({
    result: hammingDistance32(0b00001010, 0b10000000),
    expect: 3
});
t({
    result: hammingDistance32(0b00000000, 0b1111000011110000),
    expect: 8
});
t({
    result: hammingDistance32(0b11111111, 0b1111000011110000),
    expect: 8
});
t({
    result: hammingDistance32(0b0000000011111111, 0b1111000011110000),
    expect: 8
});
t({
    result: hammingDistance32(
        0b00000000000000000000000011111111,
        0b00000000000000001111000011110000),
    expect: 8
});
t({
    result: hammingDistance32(
        0b11111111111111111111111111111111,
        0b00000000000000001111000011110000),
    expect: 24
});
t({
    result: hammingDistance32(
        0b11111111111111111111111111111111,
        0b00000000000000001111000011110000),
    expect: 24
});
t({
    result: hammingDistance32(
        0b01010101010101010101010101010101,
        0b10101010101010101010101010101010),
    expect: 32
});
t({
    result: hammingDistance32(
        0b01010101010101010101010101010101,
        0b01010101010101010101010101010101),
    expect: 0
});
t({
    result: hammingDistance32(
        0b00_0100_0100_0100_0100_0100_0100_0100_01,
        0b01_0101_0101_0101_0101_0101_0101_0101_01),
    expect: 8
});
t({
    result: hammingDistance32(
        0b10000000000000000000000000000000,
        0b10000000000000000000000000000000),
    expect: 0
});
t({
    result: hammingDistance32(
        0b00000000000000000000000000000000,
        0b00000000000000000000000000000000),
    expect: 0
});
t({
    result: hammingDistance32(
        0b00000000_00000000_00000000_00000000,
        0b00000000_00000000_00000000_00000000),
    expect: 0
});
t({
    result: hammingDistance32(
        0b0_00000000_00000000_00000000_00000000,
        0b0_00000000_00000000_00000000_00000000),
    expect: 0
});
t({
    result: hammingDistance32(
        0b1_00000000_00000000_00000000_00000000,
        0b1_00000000_00000000_00000000_00000000),
    expect: -1
});
t({
    result: hammingDistance32(
        0b1000_00000000_00000000_00000000_00000000,
        0b0111_00000000_00000000_00000000_00000000),
    expect: -1
});

t({
    result: hammingDistance32(
        0xFFFFFFFF - 1,
        0xFFFFFFFF - 1),
    expect: 0
});
t({
    result: hammingDistance32(
        0xFFFFFFFF,
        0xFFFFFFFF),
    expect: 0
});
t({
    result: hammingDistance32(
        0xFFFFFFFF + 1,
        0xFFFFFFFF + 1),
    expect: -1
});

t({
    result: hammingDistance32(0xFFFFFFFF, 0),
    expect: 32
});
t({
    result: hammingDistance32(0xFFFF, 0),
    expect: 16
});
t({
    result: hammingDistance32(0xFFFF + 1, 0),
    expect: 1
});
