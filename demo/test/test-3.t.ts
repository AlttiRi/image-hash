import {ANSI_BLUE, t} from "../../test/tester.ts";
import {getImageDataFromFS} from "../util.demo.ts";
import path from "node:path";
import {getCalculateAverage, getCalculateBT601, getCalculateBT709, getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {GrayScalingOpt, ImageDataLike} from "@/types.ts";
function resolve(...strs: string[]) {
    return path.resolve(import.meta.dirname, ...strs);
}

console.log(ANSI_BLUE("--- Tests compare luminance value before and after down-scaling ---"));

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
        expect: 88.69448311646963,
    });
    t({
        result: avgLuminanceScaled,
        expect: 88.671875,
    });
}
{
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/kittens-minicrop-3258x2448.jpg`);
    t({
        result: avgLuminanceOrig,
        expect: 88.73086861100077,
    });
    t({
        result: avgLuminanceScaled,
        expect: 88.78125,
    });
}
{
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/peppers-600x600.png`);
    t({
        result: avgLuminanceOrig,
        expect: 103.20869166666667,
    });
    t({
        result: avgLuminanceScaled,
        expect: 103.203125,
    });
}
{
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/bridge-500x320.jpg`);
    t({
        result: avgLuminanceOrig,
        expect: 61.01254375,
    });
    t({
        result: avgLuminanceScaled,
        expect: 61.015625,
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
            expect: 161.695484,
        });
        t({
            result: avgLuminanceScaled,
            expect: 161.6826171875,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: "bt601", iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 161.695484,
        });
        t({
            result: avgLuminanceScaled,
            expect: 161.625,
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
            expect: 161.695484,
        });
        t({
            result: avgLuminanceScaled,
            expect: 165.34375,
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
            expect: 118.81228841145834,
        });
        t({
            result: avgLuminanceScaled,
            expect: 118.8271484375,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/rabbit-320x192.png`, {
            getFunc: getCalculateBT601, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 118.81228841145834,
        });
        t({
            result: avgLuminanceScaled,
            expect: 118.8125,
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
            expect: 118.81228841145834,
        });
        t({
            result: avgLuminanceScaled,
            expect: 118.265625,
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
