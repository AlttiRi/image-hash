import {ANSI_BLUE, t} from "../../test/tester.ts";
import {readFileImageData} from "../util.demo.ts";
import path from "node:path";
import {getCalculateAverage, getCalculateBT601, getCalculateBT709, getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {GrayScalerGetter, ImageDataLike} from "@/types.ts";
function resolve(str: string) {
    return path.resolve(import.meta.dirname, str);
}

console.log(ANSI_BLUE("--- Tests compare luminance value before and after down-scaling ---"));

type Opts = {
    getFunc?: GrayScalerGetter
    median?: boolean
    width?: number
    height?: number
    iData?: ImageDataLike
}
async function getLumus(imgPath: string, opts: Opts = {}) {
    const iData = opts.iData || await readFileImageData(resolve(imgPath));
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
        expect: 88.2366212314174,
    });
    t({
        result: avgLuminanceScaled,
        expect: 88.21875,
    });
}
{
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/kittens-minicrop-3258x2448.jpg`);
    t({
        result: avgLuminanceOrig,
        expect: 88.27163302398921,
    });
    t({
        result: avgLuminanceScaled,
        expect: 88.171875,
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
        expect: 60.6081875,
    });
    t({
        result: avgLuminanceScaled,
        expect: 60.59375,
    });
}

{
    const iData = await readFileImageData(resolve(`../img/alyson_hannigan_500x500.jpg`));
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateBT601, iData, width: 32, height: 32,
        });
        t({
            result: avgLuminanceOrig,
            expect: 161.311652,
        });
        t({
            result: avgLuminanceScaled,
            expect: 161.3486328125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateBT601, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 161.311652,
        });
        t({
            result: avgLuminanceScaled,
            expect: 161.296875,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateAverage, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 156.365124,
        });
        t({
            result: avgLuminanceScaled,
            expect: 156.390625,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateBT709, iData,
        });
        t({
            result: avgLuminanceOrig,
            expect: 159.945212,
        });
        t({
            result: avgLuminanceScaled,
            expect: 159.953125,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateBT601, iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 161.311652,
        });
        t({
            result: avgLuminanceScaled,
            expect: 165.140625,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateAverage, iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 156.365124,
        });
        t({
            result: avgLuminanceScaled,
            expect: 159.921875,
        });
    }
    {
        const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, {
            getFunc: getCalculateBT709, iData, median: true,
        });
        t({
            result: avgLuminanceOrig,
            expect: 159.945212,
        });
        t({
            result: avgLuminanceScaled,
            expect: 163.6875,
        });
    }
}

{
    const iData = await readFileImageData(resolve(`../img/rabbit-320x192.png`));
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
