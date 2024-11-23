import {ANSI_BLUE, t} from "../../test/tester.ts";
import {HashBinary} from "../util.ts";

console.log(ANSI_BLUE("--- Hash diff ---"));

const b = (bin1: string, bin2: string): number => {
    const h1 = HashBinary.fromBinary(bin1);
    const h2 = HashBinary.fromBinary(bin2);
    return h1.diff(h2);
};

t({
    result: b("0000", "0000"),
    expect: 0,
});
t({
    result: b("0000", "0001"),
    expect: 1,
});
t({
    result: b("0010", "0001"),
    expect: 2,
});
t({
    result: b("0000", "0011"),
    expect: 2,
});
t({
    result: b("11110000", "0011"),
    expect: 6,
});
t({
    result: b("11110000", "00000011"),
    expect: 6,
});
t({
    result: b("111110000", "0011"),
    expect: -1,
});
t({
    result: b("1_11110000", "00000011"),
    expect: -1,
});
t({
    result: b("1100_1100 1111_0000", "1010_1010 0101_0101"),
    expect: 8,
});
t({
    result: b("10101010 10101010", "01010101 01010101"),
    expect: 16,
});
t({
    result: b("10101010 10101010 10101010 10101010", "01010101 01010101 01010101 01010101"),
    expect: 32,
});
t({
    result: b("1 10101010 10101010 10101010 10101010",   "01010101 01010101 01010101 01010101"),
    expect: -1,
});
t({
    result: b("1 10101010 10101010 10101010 10101010", "0 01010101 01010101 01010101 01010101"),
    expect: 33,
});

