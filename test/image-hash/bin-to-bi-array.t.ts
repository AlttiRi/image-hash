import {ANSI_BLUE, t} from "../tester.ts";
import {binToBiUi8a} from "@/image-hash.ts";


console.log(ANSI_BLUE("--- binToBiUi8a ---"));

t({
    result: binToBiUi8a("00").toString(),
    expect: "0,0,0,0,0,0,0,0",
});
t({
    result: binToBiUi8a("0000_0000").toString(),
    expect: "0,0,0,0,0,0,0,0",
});
t({
    result: binToBiUi8a("0000_0001").toString(),
    expect: "0,0,0,0,0,0,0,255",
});
t({
    result: binToBiUi8a("1000_0001").toString(),
    expect: "255,0,0,0,0,0,0,255",
});
t({
    result: binToBiUi8a("0_1000_0001").toString(),
    expect: "0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,255",
});
t({
    result: binToBiUi8a("1_0001_1000_0001").toString(),
    expect: "0,0,0,255,0,0,0,255,255,0,0,0,0,0,0,255",
});
t({
    result: binToBiUi8a("1000_0001_1000_0001").toString(),
    expect: "255,0,0,0,0,0,0,255,255,0,0,0,0,0,0,255",
});
t({
    result: binToBiUi8a("1_0000_0001_1000_0001").toString(),
    expect: "0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,255",
});
t({
    result: binToBiUi8a("0000_0001_0000_0001_1000_0001").toString(),
    expect: "0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,255",
});
