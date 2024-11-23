import {ANSI_BLUE, t} from "../../test/tester.ts";
import {calculateSquareSize} from "../../src/mono-image-data.ts";

console.log(ANSI_BLUE("--- Calc size ---"));


function c(pixelCount: number) {
    return JSON.stringify(calculateSquareSize(pixelCount));
}
function r(w: number, h: number) {
    return JSON.stringify({width: w, height: h});
}

t({
    result: c(4),
    expect: r(2, 2)
});
t({
    result: c(9),
    expect: r(3, 3)
});
t({
    result: c(25),
    expect: r(5, 5)
});
t({
    result: c(24),
//  expect: r(6, 4) // Not a square
    expect: r(0, 0)
});
t({
    result: c(23),
    expect: r(0, 0)
});
t({
    result: c(22),
    expect: r(0, 0)
});
t({
    result: c(21),
    expect: r(0, 0)
});
t({
    result: c(20),
    expect: r(5, 4)
});
t({
    result: c(19),
    expect: r(0, 0)
});
t({
    result: c(18),
    expect: r(0, 0)
});
t({
    result: c(17),
    expect: r(0, 0)
});
t({
    result: c(16),
    expect: r(4, 4)
});
t({
    result: c(15),
    expect: r(0, 0),
});
t({
    result: c(14),
    expect: r(0, 0)
});
t({
    result: c(13),
    expect: r(0, 0)
});
t({
    result: c(12),
    expect: r(4, 3)
});
t({
    result: c(64),
    expect: r(8, 8)
});
t({
    result: c(72),
    expect: r(9, 8),
    name: "square-like"
});
t({
    result: c(6),
    expect: r(3, 2),
    name: "square-like"
});
t({
    result: c(2),
    expect: r(2, 1),
    name: "square-like" // Questionable, but let it be. Like for 1-bit dHash.
});

t({
    result: c(3000 * 3000),
    expect: r(3000,  3000),
    name: "0 pixels side size diff (3000 * 3000)"
});
t({
    result: c(3000 * 3001),
    expect: r(3001,  3000),
    name: "1 pixel  side size diff"
});
t({
    result: c(3000 * 3002),
    expect: r(0, 0),
    name: "2 pixels side size diff"
});
t({
    result: c(3000 * 3003),
    expect: r(0, 0)
});
t({
    result: c(3000 * 3004),
    expect: r(0, 0)
});
t({
    result: c(3000 * 3005),
    expect: r(0, 0)
});

t({
    result: c(3001 * 3001),
    expect: r(3001,  3001)
});
t({
    result: c(3002 * 3002),
    expect: r(3002,  3002)
});
t({
    result: c(3003 * 3003),
    expect: r(3003,  3003)
});

