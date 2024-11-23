import {ANSI_BLUE, t} from "../tester.ts";
import {getPrintedArray, scaleDownLinear, scaleDownMedian} from "@/resize.ts";
import {GrayImageData} from "@/mono-image-data.ts";
import {calculateMedian} from "@/median.ts";


console.log(ANSI_BLUE("--- scaleDownLinear / scaleDownMedian ---"));

t({
    result: scaleDownLinear(new GrayImageData(
        new Uint8Array([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ]),
        3,
        3
    ), 3, 3).toString(),
    expect: "1,2,3,4,5,6,7,8,9",
});
t({
    result: scaleDownLinear(new GrayImageData(
        new Uint8Array([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ]),
        3,
        3
    ), 1, 1).toString(),
    expect: "5",
});
t({
    result: scaleDownLinear(new GrayImageData(
        new Uint8Array([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ]),
        3,
        3,
    ), 1, 1, true).toString(),
    expect: "5",
});

const data1 = [
    11, 11, 14, 14, 66, 78,
    11, 11, 14, 14, 66, 78,
    12, 12, 11, 55,  8,  8,
    12, 12, 11, 55,  8,  8,
    19, 91, 44, 28,  2,  2,
    19, 91, 44, 28,  2,  2,
];
t({
    result: getPrintedArray(scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 3, 3), 3).trim(),
    expect: `
 11  14  72
 12  33   8
 55  36   2`.trim(),
});
t({
    result: getPrintedArray(scaleDownMedian(new GrayImageData(new Uint8Array(data1), 6, 6), 3, 3), 3).trim(),
    expect: `
 11  14  72
 12  33   8
 55  36   2`.trim(),
});

t({
    result: (() => { try {
        return scaleDownLinear(new GrayImageData(new Uint8Array(data1), 4, 4), 1, 1, ).toString();
    } catch (e) { return (e as Error).message; }})(),
    expect: "Incorrect data",
});
t({
    result: (() => { try {
        return scaleDownLinear(new GrayImageData(new Uint8Array(data1), 1, 1), 1, 1, ).toString();
    } catch (e) { return (e as Error).message; }})(),
    expect: "Incorrect data",
});

t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 12, 3), 1, 1, ).toString(),
    expect: "27",
});

t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 1, 1, ).toString(),
    expect: "27",
});
t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 1, 1, true).toString(),
    expect: "13",
});
t({
    result: calculateMedian(new Uint8Array(data1)).toString(),
    expect: "13",
});

t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 2, 2, ).toString(),
    expect: "12,43,38,15",
});
t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 2, 2, true).toString(),
    expect: "11,55,19,8",
});

t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 3, 3, ).toString(),
    expect: "11,14,72,12,33,8,55,36,2",
});
t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 3, 3, true).toString(),
    expect: "11,14,72,12,33,8,55,36,2",
});

t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 4, 4, ).toString(),
    expect: "11,13,14,72,12,12,35,40,12,12,55,8,19,68,28,2",
});
t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data1), 6, 6), 4, 4, true).toString(),
    expect: "11,13,14,72,12,12,35,37,12,12,55,8,19,68,28,2",
});

const data2 = [
    11, 11, 14, 14, 66, 78, 255, 255, 255,
    11, 11, 14, 14, 66, 78, 255, 255, 255,
    12, 12, 11, 55,  8,  8, 255, 255, 255,
    12, 12, 11, 55,  8,  8,   1,   1,   1,
    19, 91, 44, 28,  2,  2,   1,   1,   1,
    19, 91, 44, 28,  2,  2,   1,   1,   1,
    5,  5,  5,   0,  0,  0,   9,   9,   9,
    5,  5,  5,   0,  0,  0,   9,   9,   9,
    5,  5,  5,   0,  0,  0,   9,   9,   9,
];
t({
    result: getPrintedArray(scaleDownLinear(new GrayImageData(new Uint8Array(data2), 9, 9), 3, 3), 3).trim(),
    expect: `
 12  43 255
 38  15   1
  5   0   9`.trim(),
});
t({
    result: getPrintedArray(scaleDownMedian(new GrayImageData(new Uint8Array(data2), 9, 9), 3, 3), 3).trim(),
    expect: `
 11  55 255
 19   8   1
  5   0   9`.trim(),
});

t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data2), 9, 9), 3, 3, ).toString(),
    expect: "12,43,255,38,15,1,5,0,9",
});
t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data2), 9, 9), 3, 3, true).toString(),
    expect: "11,55,255,19,8,1,5,0,9",
});

t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data2), 9, 9), 1, 1, ).toString(),
    expect: "42",
});
t({
    result: scaleDownLinear(new GrayImageData(new Uint8Array(data2), 9, 9), 1, 1, true).toString(),
    expect: "9",
});
t({
    result: calculateMedian(new Uint8Array(data2)).toString(),
    expect: "9",
});

const data3 = [
    11, 10, 12, 13, 11, 78,
   255,  1, 15, 16, 66, 78,
    12, 12, 11, 55,  1,  2,
    12, 12, 11, 11,  3,  4,
    19, 91, 44, 28,  5,  6,
    19, 19, 44, 28,  7,  8,
];
t({
    result: getPrintedArray(scaleDownLinear(new GrayImageData(new Uint8Array(data3), 6, 6), 3, 3), 3).trim(),
    expect: `
 69  14  58
 12  22   3
 37  36   7`.trim(),
});
t({
    result: getPrintedArray(scaleDownMedian(new GrayImageData(new Uint8Array(data3), 6, 6), 3, 3), 3).trim(),
    expect: `
 11  14  72
 12  11   3
 19  36   7`.trim(),
});

{
    t({
        result: data3.reduce((a, b) => a + b, 0) / data3.length,
        expect: 28.61111111111111,
        name: "avg luminance"
    });
    {
        const ui8a = scaleDownLinear(new GrayImageData(new Uint8Array(data3), 6, 6), 3, 3)
        t({
            result: ui8a.reduce((a, b) => a + b, 0) / ui8a.length,
            expect: 28.666666666666668,
            name: "avg luminance scaleDownLinear"
        });
    }
    {
        const ui8a = scaleDownMedian(new GrayImageData(new Uint8Array(data3), 6, 6), 3, 3)
        t({
            result: ui8a.reduce((a, b) => a + b, 0) / ui8a.length,
            expect: 20.555555555555557,
            name: "avg luminance scaleDownMedian"
        });
    }
}

{
    const data = [
        11, 11, 14, 14, 66, 78, 255, 255, 255,
        11, 11, 14, 14, 66, 78, 255, 255, 255,
        12, 12, 11, 55,  8,  8, 255, 255, 255,
        12, 12, 11, 55,  8,  8,   1,   1,   1,
        19, 91, 44, 28,  2,  2,   1,   1,   1,
        19, 91, 44, 28,  2,  2,   1,   1,   1,
        5,  5,  5,   0,  0,  0,   9,   9,   9,
        5,  5,  5,   0,  0,  0,   9,   9,   9,
        5,  5,  5,   0,  0,  0,   9,   9,   9,
    ];
    t({
        result: data.reduce((a, b) => a + b, 0) / data.length,
        expect: 42,
        name: "avg luminance"
    });
    {
        const ui8a = scaleDownLinear(new GrayImageData(new Uint8Array(data), 9, 9), 3, 3)
        t({
            result: ui8a.reduce((a, b) => a + b, 0) / ui8a.length,
            expect: 42, // same when (integer down-scaling)
            name: "avg luminance scaleDownLinear"
        });
    }
    {
        const ui8a = scaleDownMedian(new GrayImageData(new Uint8Array(data), 9, 9), 3, 3)
        t({
            result: ui8a.reduce((a, b) => a + b, 0) / ui8a.length,
            expect: 40.333333333333336,
            name: "avg luminance scaleDownMedian"
        });
    }
}

