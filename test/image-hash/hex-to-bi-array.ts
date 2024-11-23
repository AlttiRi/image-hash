import {ANSI_BLUE, t} from "../tester.ts";
import {hexToBiUi8a} from "@/image-hash.ts";


console.log(ANSI_BLUE("--- hexToBiUi8a ---"));

t({
    result: hexToBiUi8a("00").toString(),
    expect: "0,0,0,0,0,0,0,0",
});
t({
    result: hexToBiUi8a("ff").toString(),
    expect: "255,255,255,255,255,255,255,255",
});
t({
    result: hexToBiUi8a("0000").toString(),
    expect: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
});
t({
    result: hexToBiUi8a("000").toString(),
    expect: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
});
t({
    result: hexToBiUi8a("ffff").toString(),
    expect: "255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255",
});
t({
    result: hexToBiUi8a("aa").toString(),
    expect: "255,0,255,0,255,0,255,0",
});
t({
    result: hexToBiUi8a(0b10101010.toString(16)).toString(),
    expect: "255,0,255,0,255,0,255,0",
});
t({
    result: hexToBiUi8a(0b10101111.toString(16)).toString(),
    expect: "255,0,255,0,255,255,255,255",
});
t({
    result: hexToBiUi8a(0b0_1000_1000.toString(16)).toString(),
    expect: "255,0,0,0,255,0,0,0",
});
t({
    result: hexToBiUi8a(0b1_1000_1000.toString(16)).toString(),
    expect: "0,0,0,0,0,0,0,255,255,0,0,0,255,0,0,0",
});
