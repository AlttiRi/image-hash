import path from "node:path";
import {ANSI_BLUE, report, t} from "../tester.ts";
import {getImageDataFromFS}   from "../util.demo.ts";
import {
    getCalculateAverage, getCalculateBT601, getCalculateBT709, getGrayData
} from "@/grayscale.ts";
import {scaleDownLinear}               from "@/resize.ts";
import {GrayScalingOpt, ImageDataLike} from "@/types.ts";
function resolve(...strs: string[]) {
    return path.resolve(import.meta.dirname, ...strs);
}


console.log(ANSI_BLUE("--- Test 2 - Tests compare luminance value before and after down-scaling ---"));

type Opts = {
    getFunc?: GrayScalingOpt
    median?: boolean
    width?: number
    height?: number
    iData?: ImageDataLike
}
async function getLumus(imgPath: string, opts: Opts = {}) {
    const iData = opts.iData || await getImageDataFromFS(resolve(imgPath));
    const grayData = getGrayData(iData, opts.getFunc);
    const avgLuminanceOrig = grayData.data.reduce((a, b) => a + b, 0) / grayData.data.length;
    const grayDataScaled = scaleDownLinear(grayData, {width: 8, height: 8, ...opts});
    const avgLuminanceScaled = grayDataScaled.data.reduce((a, b) => a + b, 0) / grayDataScaled.data.length;
    return {avgLuminanceOrig, avgLuminanceScaled};
}

{
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/kittens-3264x2448.jpg`);
    t({
        result: avgLuminanceOrig,
        expect: 89.19265939882898,
    });
    t({
        result: avgLuminanceScaled,
        expect: 89.203125,
    });
}
{
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/kittens-minicrop-3258x2448.jpg`);
    t({
        result: avgLuminanceOrig,
        expect: 89.23587589322612,
    });
    t({
        result: avgLuminanceScaled,
        expect: 89.125,
    });
}
{
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/peppers-600x600.png`);
    t({
        result: avgLuminanceOrig,
        expect: 103.70579444444445,
    });
    t({
        result: avgLuminanceScaled,
        expect: 103.6875,
    });
}
{
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/bridge-500x320.jpg`);
    t({
        result: avgLuminanceOrig,
        expect: 61.54680625,
    });
    t({
        result: avgLuminanceScaled,
        expect: 61.46875,
    });
}

{
    const iData = await getImageDataFromFS(resolve(`../img/alyson_hannigan_500x500.jpg`));
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateBT601, iData, width: 32, height: 32,
        });
        t({
            result: avgLuminanceOrig,
            expect: 162.248832,
        });
        t({
            result: avgLuminanceScaled,
            expect: 162.2158203125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: "bt601", iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 162.248832,
        });
        t({
            result: avgLuminanceScaled,
            expect: 162.234375,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateAverage, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 156.631924,
        });
        t({
            result: avgLuminanceScaled,
            expect: 156.609375,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateBT709, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 160.355592,
        });
        t({
            result: avgLuminanceScaled,
            expect: 160.328125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateBT601, iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 162.248832,
        });
        t({
            result: avgLuminanceScaled,
            expect: 165.921875,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: "average", iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 156.631924,
        });
        t({
            result: avgLuminanceScaled,
            expect: 160.03125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: "bt709", iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 160.355592,
        });
        t({
            result: avgLuminanceScaled,
            expect: 164,
        });
    }
}

{
    const iData = await getImageDataFromFS(resolve(`../img/rabbit-320x192.png`));
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/rabbit-320x192.png`, {
            getFunc: getCalculateBT601, iData, width: 32, height: 32,
        });
        t({
            result: avgLuminanceOrig,
            expect: 119.32757161458333,
        });
        t({
            result: avgLuminanceScaled,
            expect: 119.3349609375,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/rabbit-320x192.png`, {
            getFunc: getCalculateBT601, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 119.32757161458333,
        });
        t({
            result: avgLuminanceScaled,
            expect: 119.3125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/rabbit-320x192.png`, {
            getFunc: getCalculateAverage, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 111.24775390625,
        });
        t({
            result: avgLuminanceScaled,
            expect: 111.203125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/rabbit-320x192.png`, {
            getFunc: getCalculateBT709, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 120.06565755208334,
        });
        t({
            result: avgLuminanceScaled,
            expect: 120.125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/rabbit-320x192.png`, {
            getFunc: getCalculateBT601, iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 119.32757161458333,
        });
        t({
            result: avgLuminanceScaled,
            expect: 118.828125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/rabbit-320x192.png`, {
            getFunc: getCalculateAverage, iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 111.24775390625,
        });
        t({
            result: avgLuminanceScaled,
            expect: 109.828125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/rabbit-320x192.png`, {
            getFunc: getCalculateBT709, iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 120.06565755208334,
        });
        t({
            result: avgLuminanceScaled,
            expect: 119.609375,
        });
    }
}

report();
