import {ANSI_BLUE, t} from "../tester.ts";
import {hammingDistanceBiUi8a} from "@/image-hash.ts";


console.log(ANSI_BLUE("--- hammingDistanceBiUi8a ---"));

t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,0,0,0,0]),
        new Uint8Array([0,0,0,0,0,0,0,0]),
    ),
    expect: 0,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,0,0,0,0,0]),
        new Uint8Array([0,0,0,0,0,0,0,0]),
    ),
    expect: -1,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,0,0,0,255]),
        new Uint8Array([0,0,0,0,0,0,0,  0]),
    ),
    expect: 1,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,0,0,255,255]),
        new Uint8Array([0,0,0,0,0,0,  0,  0]),
    ),
    expect: 2,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([255,255,255,255,255,255,255,255]),
        new Uint8Array([  0,  0,  0,  0,  0,  0,  0,  0]),
    ),
    expect: 8,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([255,255,255,255,255,255,255,255]),
        new Uint8Array([  1,  1,  1,  1,  1,  1,  1,  1]),
    ),
    expect: 8,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,0,1,1,1]),
        new Uint8Array([0,0,0,0,0,0,0,0]),
    ),
    expect: 3,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,1,1,1,1]),
        new Uint8Array([0,0,0,0,0,0,0,0]),
    ),
    expect: 4,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,1,1,1,1]),
        new Uint8Array([1,1,1,1,0,0,0,0]),
    ),
    expect: 8,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,1,1,1,1]),
        new Uint8Array([1,1,1,1,0,1,1,1]),
    ),
    expect: 5,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,1,1,1,1]),
        new Uint8Array([1,1,1,1,0,1,1,1]),
    ),
    expect: 5,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,255,255,255,255]),
        new Uint8Array([255,255,255,255,0,255,255,255]),
    ),
    expect: 5,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,1,1,1,1,]),
        new Uint8Array([1,1,1,1,0,1,1,1,]),
    ),
    expect: 5,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,]),
        new Uint8Array([1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,]),
    ),
    expect: 10,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,]),
        new Uint8Array([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,]),
    ),
    expect: 16,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,]),
        new Uint8Array([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,]),
    ),
    expect: 32,
});
t({
    result: hammingDistanceBiUi8a(
        new Uint8Array([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,]),
        new Uint8Array([1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,]),
    ),
    expect: 32,
});
