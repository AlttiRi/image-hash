import {getCalculateAverage, getCalculateBT601, getCalculateBT709, getGrayData} from "@/grayscale.ts";

import {ANSI_BLUE, t} from "../tester.ts";


console.log(ANSI_BLUE("--- getGrayData ---"));

t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            0,0,0,255, 0,0,0,255,
            0,0,0,255, 0,0,0,255,
        ])
    }).data.toString(),
    expect: "0,0,0,0",
});
t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            100,100,100,255, 0,0,0,255,
            200,200,200,255, 50,50,50,255,
        ])
    }).data.toString(),
    expect: "100,0,200,50",
});

t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            100,50,10,255,  0,100,200,255,
            50,100,200,255, 200,0,100,255,
        ])
    }).data.toString(),
    expect: "60,82,96,71",
});
t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            100,50,10,255,  0,100,200,255,
            50,100,200,255, 200,0,100,255,
        ])
    }, getCalculateBT601).data.toString(),
    expect: "60,82,96,71",
});
t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            100,50,10,255,  0,100,200,255,
            50,100,200,255, 200,0,100,255,
        ])
    }, getCalculateBT709).data.toString(),
    expect: "57,85,96,49",
});
t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            100,50,10,255,  0,100,200,255,
            50,100,200,255, 200,0,100,255,
        ])
    }, getCalculateAverage).data.toString(),
    expect: "53,100,116,100",
});
t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            100,100,100,255, 0,0,0,255,
            200,200,200,255, 50,50,50,255,
        ])
    }, getCalculateAverage).data.toString(),
    expect: "100,0,200,50",
});

t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            0,0,0,255, 0,0,0,255,
            0,0,0,255, 0,0,0,255,
        ])
    }).width,
    expect: 2,
});
t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            0,0,0,255, 0,0,0,255,
            0,0,0,255, 0,0,0,255,
        ])
    }).height,
    expect: 2,
});
t({
    result: getGrayData({
        width: 2,
        height: 2,
        data: new Uint8ClampedArray([
            0,0,0,255, 0,0,0,255,
            0,0,0,255, 0,0,0,255,
        ])
    }).type,
    expect: "gray-scaled",
});
