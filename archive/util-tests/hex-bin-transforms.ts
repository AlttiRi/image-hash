import {ANSI_BLUE, t} from "../../test/tester.ts";
import {HashBinary} from "../util.ts";

console.log(ANSI_BLUE("--- Hash: Bin <-> Hex ---"));



const b = (bin: string): string => HashBinary.fromBinary(bin).hex;
const h = (hex: string): string => HashBinary.fromHex(hex).binary;
t({
    result: b("0"),
    expect: "00",
});
t({
    result: h("0"),
    expect: "00000000",
});

t({
    result: b("00"),
    expect: "00",
});
t({
    result: b("00000000"),
    expect: "00",
});
t({
    result: b("00000001"),
    expect: "01",
});
t({
    result: b("00000011"),
    expect: "03",
});
t({
    result: b("00000111"),
    expect: "07",
});
t({
    result: b("00001000"),
    expect: "08",
});
t({
    result: b("00010000"),
    expect: "10",
});
t({
    result: b("00010001"),
    expect: "11",
});
t({
    result: b("00010010"),
    expect: "12",
});
t({
    result: b("00010100"),
    expect: "14",
});
t({
    result: b("00011000"),
    expect: "18",
});
t({
    result: b("00001111"),
    expect: "0f",
});
t({
    result: b("00011111"),
    expect: "1f",
});
t({
    result: b("11111111"),
    expect: "ff",
});
t({
    result: b("0b11111111"),
    expect: "ff",
});
t({
    result: b("0b1111 1111"),
    expect: "ff",
});
t({
    result: b("0b1111_1111"),
    expect: "ff",
});
t({
    result: b("1111_1111_1111_1111_1111_1111_1111_1111"),
    expect: "ffffffff",
});
t({
    result: b("11111111_11111111_11111111_11111111"),
    expect: "ffffffff",
});

t({
    result: b("00111111_11111010_10101111_11111100"),
    expect: "3ffaaffc",
});



t({
    result: h("00"),
    expect: "00000000",
});
t({
    result: h("0000"),
    expect: "0000000000000000",
});
t({
    result: h("FF"),
    expect: "11111111",
});
t({
    result: h("FF00FF00"),
    expect: "11111111000000001111111100000000",
});
t({
    result: h("CE00FFDB"),
    expect: "11001110000000001111111111011011",
});
t({
    result: h("AB CD EF 09"),
    expect: "10101011110011011110111100001001",
});
t({
    result: h("AB CD EF 09 C3 B2 A1 F9"),
    expect: "1010101111001101111011110000100111000011101100101010000111111001",
});
