import {ANSI_BLUE, t} from "../tester.ts";
import {ImageHash} from "@/image-hash.ts";


console.log(ANSI_BLUE("--- binToBiUi8a ---"));

function binData(bin: string, w?: number, h?: number) {
    try {
        return ImageHash.fromBin(bin, w, h).mono.data.toString();
    } catch (e) {
        return (e as Error).message;
    }
}
function hexData(bin: string, w?: number, h?: number) {
    try {
        return ImageHash.fromHex(bin, w, h).mono.data.toString();
    } catch (e) {
        return (e as Error).message;
    }
}
function bin(bin: string, w?: number, h?: number) {
    try {
        return ImageHash.fromBin(bin, w, h).bin;
    } catch (e) {
        return (e as Error).message;
    }
}
function hex(bin: string, w?: number, h?: number) {
    try {
        return ImageHash.fromHex(bin, w, h).hex;
    } catch (e) {
        return (e as Error).message;
    }
}

t({
    result: binData("1111_1111"),
    expect: "Incorrect data",
});
t({
    result: binData("1111_1111", 1, 1),
    expect: "255",
});
t({
    result: binData("0000_0001", 1, 1),
    expect: "255",
});
t({
    result: binData("0000_0000", 1, 1),
    expect: "0",
});
t({
    result: binData("1111_1111", 2, 2),
    expect: "255,255,255,255",
});
t({
    result: binData("1111_1111", 4, 2),
    expect: "255,255,255,255,255,255,255,255",
});
t({
    result: binData("1111_1111", 2, 4),
    expect: "255,255,255,255,255,255,255,255",
});
t({
    result: binData("1111_1111", 4, 4),
    expect: "Incorrect data",
});
t({
    result: binData("1111_1111", 3, 3),
    expect: "Incorrect data",
});

t({
    result: hexData("ff", 2, 4),
    expect: "255,255,255,255,255,255,255,255",
});
t({
    result: hexData("ff", 3, 3),
    expect: "Incorrect data",
});
t({
    result: hexData("ff", 1, 1),
    expect: "255",
});
t({
    result: hexData("ffff", 1, 1),
    expect: "Incorrect data",
});
t({
    result: hexData("ffff", 3, 3),
    expect: "255,255,255,255,255,255,255,255,255",
});
t({
    result: hexData("ffff", 4, 4),
    expect: "255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255",
});
t({
    result: hexData("ffff"),
    expect: "255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255",
});
t({
    result: hexData("0000"),
    expect: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
});
t({
    result: hexData("000"),
    expect: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
});
t({
    result: hexData("00"),
    expect: "Incorrect data",
});
t({
    result: hexData("00", 2, 4),
    expect: "0,0,0,0,0,0,0,0",
});
t({
    result: hexData("0000_0000_0000_0000"),
    expect: "0,".repeat(64).slice(0, -1),
    name: "64-bits hash (8x8 image)"
});
t({
    result: hexData("0000_0000_0000_0000", 8, 8),
    expect: "0,".repeat(64).slice(0, -1),
});
t({
    result: hexData("0000_0000_0000_0000", 16, 4),
    expect: "0,".repeat(64).slice(0, -1),
});

t({
    result: bin("0", 2, 4),
    expect: "00000000",
});
t({
    result: bin("00000000", 2, 4),
    expect: "00000000",
});
t({
    result: bin("00000000", 2, 2),
    expect: "00000000",
});
t({
    result: bin("0000", 2, 2),
    expect: "00000000",
});
t({
    result: bin("0", 2, 2),
    expect: "00000000",
    name: "input hash was padded"
});
t({
    result: bin("0", 2, 4),
    expect: "00000000",
});
t({
    result: bin("0", 3, 3),
    expect: "Incorrect data",
});
t({
    result: bin("0101", 2, 4),
    expect: "00000101",
});

t({
    result: hex("0101", 2, 4),
    expect: "Incorrect data",
});
t({
    result: hex("0101", 4, 4),
    expect: "0101",
});
t({
    result: hex("ffff", 4, 4),
    expect: "ffff",
});
t({
    result: hex("0a0", 4, 4),
    expect: "00a0",
});
t({
    result: hex("a0a0", 4, 4),
    expect: "a0a0",
});
t({
    result: hex("12345678abcd1234"),
    expect: "12345678abcd1234",
});

t({
    result: ImageHash.fromHex("12345678abcd1234").size,
    expect: 64,
});
t({
    result: ImageHash.fromHex("12345678abcd1234").mono.width,
    expect: 8,
});
t({
    result: ImageHash.fromHex("12345678abcd1234").mono.height,
    expect: 8,
});
t({
    result: ImageHash.fromHex("12345678abcd1234", 16, 4).mono.width,
    expect: 16,
});
t({
    result: ImageHash.fromHex("12345678abcd1234", 16, 4).mono.height,
    expect: 4,
});

t({
    result: ImageHash.fromHex("12345678abcd1234", 16, 4).mono.type,
    expect: "binary",
});

t({
    result: ImageHash.fromHex("12345678abcd1234", 16, 4).mono.data.length,
    expect: 64,
});
t({
    result: ImageHash.fromHex("02345678abcd1234").mono.data.length,
    expect: 64,
});
t({
    result: ImageHash.fromBin("0000_0000", 4, 2).mono.data.length,
    expect: 8,
});
t({
    result: ImageHash.fromBin("0000_0000", 3, 2).mono.data.length,
    expect: 6,
});
t({
    result: ImageHash.fromBin("0000_0000", 2, 2).mono.data.length,
    expect: 4,
});
t({
    result: ImageHash.fromBin("0000_0000", 1, 1).mono.data.length,
    expect: 1,
});
t({
    result: (() => { try {
        return ImageHash.fromBin("0000_0000", 0, 0).mono.data.length;
    } catch (e) { return (e as Error).message; }})(),
    expect: "Incorrect data",
});
t({
    result: (() => { try {
        return ImageHash.fromBin("0", 0, 0).mono.data.length;
    } catch (e) { return (e as Error).message; }})(),
    expect: "Incorrect data",
});
t({
    result: (() => { try {
        return ImageHash.fromBin("", 0, 0).mono.data.length;
    } catch (e) { return (e as Error).message; }})(),
    expect: "Incorrect data",
});
t({
    result: (() => { try {
        return ImageHash.fromBin("").mono.data.length;
    } catch (e) { return (e as Error).message; }})(),
    expect: "Incorrect data",
});

t({
    result: ImageHash.fromHex("0000 0000 0000 0000").mono.type,
    expect: "binary",
});
t({
    result: ImageHash.fromHex("0000 0000 0000 0000").getMono().height,
    expect: 8,
});
t({
    result: ImageHash.fromHex("0000 0000 0000 0000").getMono().width,
    expect: 8,
});
t({
    result: ImageHash.fromHex("0000 0000 0000 0000").getMono().data.toString(),
    expect: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
});
t({
    result: ImageHash.fromHex("0000 0000 0000 0000").getMono().data.toString(),
    expect: "0,".repeat(64).slice(0, -1),
});

t({
    result: ImageHash.fromBin("0b 0000 0000 0000 0000").getMono(true).width,
    expect: 4,
});
t({
    result: ImageHash.fromBin("0b 0000 0000 0000 0000").getMono(true).height,
    expect: 4,
});

t({
    result: ImageHash.fromBin("0000 0000 0000 0000").diff(
            ImageHash.fromBin("0000 0000 0000 0000")
    ),
    expect: 0,
});
t({
    result: ImageHash.fromBin("0000 0000 0000 0001").diff(
            ImageHash.fromBin("0000 0000 0000 0000")
    ),
    expect: 1,
});
t({
    result: ImageHash.fromBin("0000 0000 0000 0010").diff(
            ImageHash.fromBin("0000 0000 0000 0000")
    ),
    expect: 1,
});
t({
    result: ImageHash.fromBin("0000 0000 0000 0011").diff(
            ImageHash.fromBin("0000 0000 0000 0000")
    ),
    expect: 2,
});
t({
    result: ImageHash.fromBin("0000 0000 0000 0011").diff(
            ImageHash.fromBin("0000 0000 0000 1111")
    ),
    expect: 2,
});
t({
    result: ImageHash.fromBin("1010 1010 1010 1010").diff(
            ImageHash.fromBin("0101 0101 0101 0101")
    ),
    expect: 16,
});
t({
    result: ImageHash.fromBin("1111 1111 1111 1111").diff(
            ImageHash.fromBin("0000 0000 0000 0000")
    ),
    expect: 16,
});

t({
    result: ImageHash.fromHex("0x 0000 0000 0000 0000").getMono(true).width,
    expect: 8,
});
t({
    result: ImageHash.fromHex("0x 0000 0000 0000 0000").getMono(true).height,
    expect: 8,
});


t({
    result: ImageHash.fromHex("0000 0000 0000 0000").diff(
            ImageHash.fromHex("0000 0000 0000 0000")
    ),
    expect: 0,
});
t({
    result: ImageHash.fromHex("0000 0000 0000 0001").diff(
            ImageHash.fromHex("0000 0000 0000 0000")
    ),
    expect: 1,
});
t({
    result: ImageHash.fromHex("0000 0000 0000 0002").diff(
            ImageHash.fromHex("0000 0000 0000 0000")
    ),
    expect: 1,
});
t({
    result: ImageHash.fromHex("0000 0000 0000 0003").diff(
            ImageHash.fromHex("0000 0000 0000 0000")
    ),
    expect: 2,
});
t({
    result: ImageHash.fromHex("0000 0000 0000 000f").diff(
            ImageHash.fromHex("0000 0000 0000 0000")
    ),
    expect: 4,
});
t({
    result: ImageHash.fromHex("0000 0000 0000 00ff").diff(
            ImageHash.fromHex("0000 0000 0000 0000")
    ),
    expect: 8,
});
t({
    result: ImageHash.fromHex("ffff ffff ffff ffff").diff(
            ImageHash.fromHex("0000 0000 0000 0000")
    ),
    expect: 64,
});

t({
    result: ImageHash.fromHex("f0f0 f0f0 f0f0 f0f0").diff(
            ImageHash.fromHex("0f0f 0f0f 0f0f 0f0f")
    ),
    expect: 64,
});
