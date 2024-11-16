import {ANSI_BLUE, t} from "../tester.ts";
import {hammingDistanceHex} from "@/util.ts";

console.log(ANSI_BLUE("--- Hamming Distance HEX ---"));


t({
    result: hammingDistanceHex("c7c48f8989c77e0c", "c7c48f8989c77e0c"),
    expect: 0, name: "d-gh-rabbit",
});

t({
    result: hammingDistanceHex("000000004286fefe", "001000204286fffe"),
    expect: 3, name: "a-site-cats"
});
t({
    result: hammingDistanceHex("00180e634287fffe", "009c0c634287ffff"),
    expect: 4, name: "m-site-cats"
});
t({
    result: hammingDistanceHex("3c9c1e63c38746e6", "3c9c1e63c38746e6"),
    expect: 0, name: "b-site-cats"
});
t({
    result: hammingDistanceHex("e030acce864cae8a", "f030b8ce864c8e8e"),
    expect: 5, name: "d-site-cats"
});

t({
    result: hammingDistanceHex("000000004286fefe", "001000204286fffe"),
    expect: 3, name: "a-py-cats"
});
t({
    result: hammingDistanceHex("e030acce864cae8a", "e030b8ce864c8e8e"),
    expect: 4, name: "d-py-cats"
});



t({
    result: hammingDistanceHex("0000", "0000"),
    expect: 0
});
t({
    result: hammingDistanceHex("FFFF", "FFFF"),
    expect: 0
});
t({
    result: hammingDistanceHex("FFFF", "0000"),
    expect: 16
});
t({
    result: hammingDistanceHex("F0F0", "0000"),
    expect: 8
});
t({
    result: hammingDistanceHex("FFFFFFFF", "0000"),
    expect: -1
});
t({
    result: hammingDistanceHex("FFFFFFFF", "00000000"),
    expect: 32
});
t({
    result: hammingDistanceHex("FFFFFFFFFFFFFFFF", "0000000000000000"),
    expect: 64
});
t({
    result: hammingDistanceHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "00000000000000000000000000000000"),
    expect: 128
});

t({
    result: hammingDistanceHex("FFFF", "0000"),
    expect: 16
});
t({
    result: hammingDistanceHex("0", "0"),
    expect: 0
});
t({
    result: hammingDistanceHex("1", "0"),
    expect: 1
});
t({
    result: hammingDistanceHex("2", "0"),
    expect: 1
});
t({
    result: hammingDistanceHex("3", "0"),
    expect: 2
});
t({
    result: hammingDistanceHex("4", "0"),
    expect: 1
});
t({
    result: hammingDistanceHex("5", "0"),
    expect: 2
});
t({
    result: hammingDistanceHex("6", "0"),
    expect: 2
});
t({
    result: hammingDistanceHex("7", "0"),
    expect: 3
});
t({
    result: hammingDistanceHex("8", "0"),
    expect: 1
});
t({
    result: hammingDistanceHex("9", "0"),
    expect: 2
});
t({
    result: hammingDistanceHex("A", "0"),
    expect: 2
});
t({
    result: hammingDistanceHex("B", "0"),
    expect: 3
});
t({
    result: hammingDistanceHex("C", "0"),
    expect: 2
});
t({
    result: hammingDistanceHex("D", "0"),
    expect: 3
});
t({
    result: hammingDistanceHex("E", "0"),
    expect: 3
});
t({
    result: hammingDistanceHex("F", "0"),
    expect: 4
});
t({
    result: hammingDistanceHex("FF", "00"),
    expect: 8
});
t({
    result: hammingDistanceHex("FFF", "000"),
    expect: 12
});
t({
    result: hammingDistanceHex("FFFF", "0000"),
    expect: 16
});
