import {ANSI_BLUE, t} from "../tester.ts";
import {biUi8aToHex} from "@/image-hash.ts";


console.log(ANSI_BLUE("--- biUi8aToHex ---"));

t({
    result: biUi8aToHex(new Uint8Array([0,0,0,0,0,0,0,0])).toString(),
    expect: "00",
});
t({
    result: biUi8aToHex(new Uint8Array([255,0,0,0 ,0,0,0,0])).toString(),
    expect: "80",
});
t({
    result: biUi8aToHex(new Uint8Array([255,255,255,255, 0,0,0,0])).toString(),
    expect: "f0",
});
t({
    result: biUi8aToHex(new Uint8Array([255,255,255,255, 255,255,255,255])).toString(),
    expect: "ff",
});

t({
    result: biUi8aToHex(new Uint8Array([255,255,255,255, 0,0,0,0, 0,0,0,0])).toString(),
    expect: "0f00",
});
t({
    result: biUi8aToHex(new Uint8Array([0,0,0,0, 255,255,255,255, 0,0,0,0, 0,0,0,0])).toString(),
    expect: "0f00",
});
t({
    result: biUi8aToHex(new Uint8Array([255,255,255,255, 0,0,0,0, 0,0,0,0, 0,0,0,0])).toString(),
    expect: "f000",
});

t({
    result: biUi8aToHex(new Uint8Array([1,1,1,1, 0,0,0,0, 0,0,0,0, ])).toString(),
    expect: "0f00",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,1,1, 0,0,0,0, 0,0,0,0, 0,0,0,0,])).toString(),
    expect: "f000",
});

t({
    result: biUi8aToHex(new Uint8Array([1,1,1,1, 0,0,0,0, 1,1,1,1, ])).toString(),
    expect: "0f0f",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,1,1, 0,0,0,0, 1,1,1,1, 0,0,0,0])).toString(),
    expect: "f0f0",
});
