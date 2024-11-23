import {ANSI_BLUE, t} from "../tester.ts";
import {calculateAverage, calculateMedianByCountSorting, calculateMedianBySorting} from "@/median.ts";


console.log(ANSI_BLUE("--- calculateMedian ---"));

t({
    result: calculateMedianBySorting(new Uint8Array([])).toString(),
    expect: "NaN",
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([])),
    expect: 0,
});


t({
    result: calculateMedianBySorting(new Uint8Array([0])),
    expect: 0,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([0])),
    expect: 0,
});

t({
    result: calculateMedianBySorting(new Uint8Array([0,0])),
    expect: 0,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([0,0])),
    expect: 0,
});
t({
    result: calculateMedianBySorting(new Uint8Array([0,1])),
    expect: 0.5,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([0,1])),
    expect: 0.5,
});
t({
    result: calculateMedianBySorting(new Uint8Array([0,1,0])),
    expect: 0,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([0,1,0])),
    expect: 0,
});
t({
    result: calculateMedianBySorting(new Uint8Array([0,255,0])),
    expect: 0,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([0,255,0])),
    expect: 0,
});
t({
    result: calculateMedianBySorting(new Uint8Array([255,255,0])),
    expect: 255,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([255,255,0])),
    expect: 255,
});

t({
    result: calculateMedianBySorting(new Uint8Array([2, 2, 2,  3, 4,   5, 5, 5])),
    expect: 3.5,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([2, 2, 2,  3, 4,   5, 5, 5])),
    expect: 3.5,
});

t({
    result: calculateMedianBySorting(new Uint8Array([255,3,45,56,5,5,56,4,6,3,2,6,7,3,5,6,3,4,5,6,3,33,66,88])),
    expect: 5.5,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([255,3,45,56,5,5,56,4,6,3,2,6,7,3,5,6,3,4,5,6,3,33,66,88])),
    expect: 5.5,
});
t({
    result: [255,3,45,56,5,5,56,4,6,3,2,6,7,3,5,6,3,4,5,6,3,33,66,88].sort((a, b) => a - b).toString(),
    expect: "2,3,3,3,3,3,4,4,5,5,5,5,6,6,6,6,7,33,45,56,56,66,88,255",
});


t({
    result: calculateMedianBySorting(new Uint8Array([255,3,45,56,5,5,56,4,6,3,2,6,7,3,5,6,3,4,5,6,3,33,66])),
    expect: 5,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([255,3,45,56,5,5,56,4,6,3,2,6,7,3,5,6,3,4,5,6,3,33,66])),
    expect: 5,
});

t({
    result: calculateMedianBySorting(new Uint8Array([255,250,240,240,50,0])),
    expect: 240,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([255,250,240,240,50,0])),
    expect: 240,
});

t({
    result: calculateMedianBySorting(new Uint8Array([255,250,250,250,240,240,50,0])),
    expect: 245,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([255,250,250,250,240,240,50,0])),
    expect: 245,
});

t({
    result: calculateMedianBySorting(new Uint8Array([255,251,251,251,240,240,50,0])),
    expect: 245.5,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([255,251,251,251,240,240,50,0])),
    expect: 245.5,
});

t({
    result: calculateMedianBySorting(new Uint8Array([255,250,250,250,241,240,50,0])),
    expect: 245.5,
});
t({
    result: calculateMedianByCountSorting(new Uint8Array([255,250,250,250,241,240,50,0])),
    expect: 245.5,
});


t({
    result: calculateAverage(new Uint8Array([255,250,250,250,241,240,50,0])),
    expect: 192,
});
t({
    result: calculateAverage(new Uint8Array([0])),
    expect: 0,
});
t({
    result: calculateAverage(new Uint8Array([0, 0, 0, 1])),
    expect: 0.25,
});
t({
    result: calculateAverage(new Uint8Array([0, 1, 1, 1])),
    expect: 0.75,
});
t({
    result: calculateAverage(new Uint8Array([1, 1, 1, 1])),
    expect: 1,
});
t({
    result: calculateAverage(new Uint8Array([1, 1, 1, 1, 0])),
    expect: 0.8,
});
t({
    result: calculateAverage(new Uint8Array([0, 255])),
    expect: 127.5,
});
t({
    result: calculateAverage(new Uint8Array([0, 255, 0])),
    expect: 85,
});


