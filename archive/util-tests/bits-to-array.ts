import {ANSI_BLUE, t} from "../../test/tester.ts";
import {bitsToArray} from "../util.ts";

console.log(ANSI_BLUE("--- Bits To Array ---"));

function b(...values: number[]) {
    return bitsToArray(new Uint8Array(values)).join(" ");
}
function e(str: string) {
    return str.replaceAll(/\s+/g, " ");
}

t({
    result: bitsToArray(new Uint8Array([0])).join(" "),
    expect: e("0 0 0 0  0 0 0 0"),
});
t({
    result: b(0),
    expect: e("0 0 0 0  0 0 0 0"),
});
t({
    result: b(1),
    expect: e("0 0 0 0  0 0 0 255"),
});
t({
    result: b(2),
    expect: e("0 0 0 0  0 0 255 0"),
});
t({
    result: b(3),
    expect: e("0 0 0 0  0 0 255 255"),
});

t({
    result: b(255),
    expect: e("255 255 255 255  255 255 255 255"),
});
t({
    result: b(0b0000_0001),
    expect: e("0 0 0 0  0 0 0 255"),
});
t({
    result: b(0b0000_1111),
    expect: e("0 0 0 0  255 255 255 255"),
});
t({
    result: b(0b1000_1111),
    expect: e("255 0 0 0  255 255 255 255"),
});
t({
    result: bitsToArray(new Uint8Array([0, 255])).join(" "),
    expect: e("0 0 0 0  0 0 0 0   255 255 255 255  255 255 255 255"),
});
t({
    result: bitsToArray(new Uint8Array([0, 255, 1])).join(" "),
    expect: e("0 0 0 0  0 0 0 0   255 255 255 255  255 255 255 255   0 0 0 0  0 0 0 255"),
});
t({
    result: b(0b1000_1111, 0b1000_1111),
    expect: e("255 0 0 0  255 255 255 255   255 0 0 0  255 255 255 255"),
});
t({
    result: b(0b1111_1111, 0b1000_1000),
    expect: e("255 255 255 255  255 255 255 255   255 0 0 0  255 0 0 0"),
});
