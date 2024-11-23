import {ANSI_BLUE, t} from "../../test/tester.ts";
import {arrayToBits} from "../util.ts";

console.log(ANSI_BLUE("--- Array To Bits ---"));

t({
    result: arrayToBits(new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255])).toString(),
    expect: "255",
});

t({
    result: arrayToBits(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])).toString(),
    expect: "0",
});
t({
    result: arrayToBits(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255])).toString(),
    expect: "1",
});
t({
    result: arrayToBits(new Uint8Array([0, 0, 0, 0, 0, 0, 255, 0])).toString(),
    expect: "2",
});
t({
    result: arrayToBits(new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255])).toString(),
    expect: "3",
});
t({
    result: arrayToBits(new Uint8Array([0, 0, 0, 0, 0, 255, 0, 0])).toString(),
    expect: "4",
});
t({
    result: arrayToBits(new Uint8Array([255, 0, 0, 0, 0, 0, 0, 0])).toString(),
    expect: "128",
});

t({
    result: arrayToBits(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 255])).toString(),
    expect: "1,1",
});
t({
    result: arrayToBits(new Uint8Array([255, 0, 0, 0, 0, 0, 0, 255, 255, 0, 0, 0, 0, 0, 0, 255])).toString(),
    expect: "129,129",
});


t({
    result: arrayToBits(new Uint8Array([255, 255, 255, 255])).toString(),
    expect: Number(0b0000_1111).toString(),
    name: "half-byte"
});
t({
    result: arrayToBits(new Uint8Array([255, 255, 255, 255, 255])).toString(),
    expect: Number(0b0001_1111).toString(),
    name: "part-byte"
});
t({
    result: arrayToBits(new Uint8Array([255])).toString(),
    expect: Number(0b000_0001).toString(),
    name: "part-byte"
});
