import {ANSI_BLUE, t} from "../../test/tester.ts";
import {ui8aToHex} from "../util.ts";


console.log(ANSI_BLUE("--- Hash Hex ---"));

t({
    result: ui8aToHex(new Uint8ClampedArray()),
    expect: "",
    name: "empty"
});
t({
    result: ui8aToHex(new Uint8ClampedArray(0)),
    expect: "",
    name: "empty"
});
t({
    result: ui8aToHex(new Uint8Array()),
    expect: "",
    name: "empty"
});
t({
    result: ui8aToHex(new Uint8ClampedArray(1)),
    expect: "00",
    name: "8-bits"
});
t({
    result: ui8aToHex(new Uint8Array(2)),
    expect: "0000",
    name: "16-bits"
});
t({
    result: ui8aToHex(new Uint8Array(8)),
    expect: "0000000000000000",
    name: "64-bits"
});

t({
    result: ui8aToHex(new Uint8Array([])),
    expect: "",
    name: "empty"
});
t({
    result: ui8aToHex(new Uint8Array([1])),
    expect: "01",
    name: "16-bits"
});
t({
    result: ui8aToHex(new Uint8Array([255])),
    expect: "ff",
    name: "16-bits"
});
t({
    result: ui8aToHex(new Uint8Array([255, 255, 255, 255])),
    expect: "ffffffff",
    name: "32-bits"
});
t({
    result: ui8aToHex(new Uint8Array([255, 0, 255, 0, 255, 0, 255, 0])),
    expect: "ff00ff00ff00ff00",
    name: "64-bits"
});
t({
    result: ui8aToHex(new Uint8Array([0, 255, 0, 255, 0, 255, 0, 255])),
    expect: "00ff00ff00ff00ff",
    name: "64-bits"
});

t({
    result: ui8aToHex(new Uint8Array([0,  1,  2,  3,  4,  5,  6,  7])),
    expect: "0001020304050607"
});
t({
    result: ui8aToHex(new Uint8Array([8,  9, 10, 11, 12, 13, 14, 15])),
    expect: "08090a0b0c0d0e0f"
});
t({
    result: ui8aToHex(new Uint8Array([16, 17, 18, 19, 20, 21, 22, 23])),
    expect: "1011121314151617"
});
t({
    result: ui8aToHex(new Uint8Array([24, 25, 26, 27, 28, 29, 30, 31])),
    expect: "18191a1b1c1d1e1f"
});
t({
    result: ui8aToHex(new Uint8Array([32, 33, 34, 35, 36, 37, 38, 39])),
    expect: "2021222324252627"
});
t({
    result: ui8aToHex(new Uint8Array([40, 41, 42, 43, 44, 45, 46, 47])),
    expect: "28292a2b2c2d2e2f"
});
t({
    result: ui8aToHex(new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55])),
    expect: "3031323334353637"
});
t({
    result: ui8aToHex(new Uint8Array([56, 57, 58, 59, 60, 61, 62, 63])),
    expect: "38393a3b3c3d3e3f"
});
t({
    result: ui8aToHex(new Uint8Array([64, 122, 186, 198, 202, 228, 244, 238])),
    expect: "407abac6cae4f4ee"
});

t({
    result: ui8aToHex(new Uint8Array([0])),
    expect: "00"
});
t({
    result: ui8aToHex(new Uint8Array([1])),
    expect: "01"
});
t({
    result: ui8aToHex(new Uint8Array([255])),
    expect: "ff"
});
t({
    result: ui8aToHex(new Uint8Array([255, 0])),
    expect: "ff00"
});
t({
    result: ui8aToHex(new Uint8Array([0, 255])),
    expect: "00ff"
});
t({
    result: ui8aToHex(new Uint8Array([255, 2])),
    expect: "ff02"
});
t({
    result: ui8aToHex(new Uint8Array([2, 255])),
    expect: "02ff"
});
