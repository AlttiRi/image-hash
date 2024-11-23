import {ANSI_BLUE, t} from "../tester.ts";
import {biUi8aToBin} from "@/image-hash.ts";


console.log(ANSI_BLUE("--- biUi8aToBin ---"));

t({
    result: biUi8aToBin(new Uint8Array([0,0,0,0,0,0,0,0])).toString(),
    expect: "00000000",
});
t({
    result: biUi8aToBin(new Uint8Array([255,0,0,0 ,0,0,0,0])).toString(),
    expect: "10000000",
});
t({
    result: biUi8aToBin(new Uint8Array([255,255,255,255, 0,0,0,0])).toString(),
    expect: "11110000",
});
t({
    result: biUi8aToBin(new Uint8Array([255,255,255,255, 255,255,255,255])).toString(),
    expect: "11111111",
});

t({
    result: biUi8aToBin(new Uint8Array([255,255,255,255, 0,0,0,0, 0,0,0,0])).toString(),
    expect: "0000111100000000",
});
t({
    result: biUi8aToBin(new Uint8Array([0,0,0,0, 255,255,255,255, 0,0,0,0, 0,0,0,0])).toString(),
    expect: "0000111100000000",
});
t({
    result: biUi8aToBin(new Uint8Array([255,255,255,255, 0,0,0,0, 0,0,0,0, 0,0,0,0])).toString(),
    expect: "1111000000000000",
});

t({
    result: biUi8aToBin(new Uint8Array([1,1,1,1, 0,0,0,0, 0,0,0,0, ])).toString(),
    expect: "0000111100000000",
});
t({
    result: biUi8aToBin(new Uint8Array([1,1,1,1, 0,0,0,0, 0,0,0,0, 0,0,0,0,])).toString(),
    expect: "1111000000000000",
});

t({
    result: biUi8aToBin(new Uint8Array([1,1,1,1, 0,0,0,0, 1,1,1,1, ])).toString(),
    expect: "0000111100001111",
});
t({
    result: biUi8aToBin(new Uint8Array([1,1,1,1, 0,0,0,0, 1,1,1,1, 0,0,0,0])).toString(),
    expect: "1111000011110000",
});
