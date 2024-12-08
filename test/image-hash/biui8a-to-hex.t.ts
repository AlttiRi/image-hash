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


t({
    result: biUi8aToHex(new Uint8Array([1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1,])).toString(),
    expect: "7fff",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1,])).toString(),
    expect: "3fff",
});
t({
    result: biUi8aToHex(new Uint8Array([1, 1,1,1,1, 1,1,1,1, 1,1,1,1,])).toString(),
    expect: "1fff",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,1,1, 1,1,1,1, 1,1,1,1,])).toString(),
    expect: "0fff",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,1, 1,1,1,1, 1,1,1,1,])).toString(),
    expect: "07ff",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1, 1,1,1,1, 1,1,1,1,])).toString(),
    expect: "03ff",
});
t({
    result: biUi8aToHex(new Uint8Array([1, 1,1,1,1, 1,1,1,1,])).toString(),
    expect: "01ff",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,1,1, 1,1,1,1,])).toString(),
    expect: "ff",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,1, 1,1,1,1,])).toString(),
    expect: "7f",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1, 1,1,1,1,])).toString(),
    expect: "3f",
});
t({
    result: biUi8aToHex(new Uint8Array([1, 1,1,1,1,])).toString(),
    expect: "1f",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,1,1,])).toString(),
    expect: "0f",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,1,])).toString(),
    expect: "07",
});
t({
    result: biUi8aToHex(new Uint8Array([1,1,])).toString(),
    expect: "03",
});
t({
    result: biUi8aToHex(new Uint8Array([1,])).toString(),
    expect: "01",
});

t({
    result: biUi8aToHex(new Uint8Array([])).toString(),
    expect: "",
});
