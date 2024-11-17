import {ANSI_BLUE, t} from "../tester.ts";
import {hexToUi8a} from "@/util.ts";

console.log(ANSI_BLUE("--- Hash Hex ---"));

const h = (hex: string): string => hexToUi8a(hex).join(" ");

t({
    result: h("0xFFFFFFFFFFFFFFFF"),
    expect: "255 255 255 255 255 255 255 255",
});
t({
    result: h("FFFFFFFFFFFFFFFF"),
    expect: "255 255 255 255 255 255 255 255",
});
t({
    result: h("ffffffffffffffff"),
    expect: "255 255 255 255 255 255 255 255",
});
t({
    result: h("FF FF FF FF FF FF FF FF"),
    expect: "255 255 255 255 255 255 255 255",
});
t({
    result: h("00"),
    expect: "0",
});
t({
    result: h("0"),
    expect: "0",
});
t({
    result: h(""),
    expect: "",
});

t({
    result: h("00"),
    expect: "0",
});
t({
    result: h("ff"),
    expect: "255",
});
t({
    result: h("ffff"),
    expect: "255 255",
});
t({
    result: h("ffff0000"),
    expect: "255 255 0 0",
});
t({
    result: h("00ffff0000"),
    expect: "0 255 255 0 0",
});
t({
    result: h("000ffff0000"),
    expect: "0 0 255 255 0 0",
});
t({
    result: h("0000ffff0000"),
    expect: "0 0 255 255 0 0",
});
t({
    result: h("00 00 ff ff 00 00"),
    expect: "0 0 255 255 0 0",
});
t({
    result: h("0 00 ff ff 00 00"),
    expect: "0 0 255 255 0 0",
});
t({
    result: h("f 00 ff ff 00 00"),
    expect: "15 0 255 255 0 0",
});
t({
    result: h("0f 00 ff ff 00 00"),
    expect: "15 0 255 255 0 0",
});
t({
    result: h("0x0f00ffff0000"),
    expect: "15 0 255 255 0 0",
});
t({
    result: h("0x0f00 ffff 0000"),
    expect: "15 0 255 255 0 0",
});
t({
    result: h("99 aa bb cc dd ee ff"),
    expect: "153 170 187 204 221 238 255",
});
t({
    result: h("a b c d e f"),
    expect: "171 205 239",
});
t({
    result: h("ab cd ef"),
    expect: "171 205 239",
});
t({
    result: h("abcdef"),
    expect: "171 205 239",
});
t({
    result: h("0xabcdef"),
    expect: "171 205 239",
});
t({
    result: h("0xABCDEF"),
    expect: "171 205 239",
});
t({
    result: h("AB CD EF"),
    expect: "171 205 239",
});
t({
    result: h(" AB  CD  EF "),
    expect: "171 205 239",
});
t({
    result: h(" A B  C D  E F "),
    expect: "171 205 239",
});

t({
    result: h("0011223344556677889900"),
    expect: "0 17 34 51 68 85 102 119 136 153 0",
});
t({
    result: h("00 11 22 33 44 55  66  77  88  99 00"),
    expect:    "0 17 34 51 68 85 102 119 136 153 0",
});
t({
    result: h("00 11 22 33 44 55 66  77  88  99 100"),
    expect:    "0 1 18 35 52 69 86 103 120 137 145 0",
});
t({
    result: h("0 01 12 23 34 45 56 67  78  89  91 00"),
    expect:   "0 1 18 35 52 69 86 103 120 137 145 0",
});
t({
    result: h("00 01 12 23 34 45 56 67  78  89  91 00"),
    expect:    "0 1 18 35 52 69 86 103 120 137 145 0",
});
t({
    result: h("0001 1223 3445 5667 7889 9100"),
    expect:    "0 1 18 35 52 69 86 103 120 137 145 0",
});
t({
    result: h("0000 abde ffff 0987 cece fafa"),
    expect: "0 0 171 222 255 255 9 135 206 206 250 250",
});
