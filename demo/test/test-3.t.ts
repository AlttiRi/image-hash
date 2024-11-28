import {ANSI_BLUE, t} from "../../test/tester.ts";
import {readFileImageData} from "../util.demo.ts";
import path from "node:path";
import {getCalculateAverage, getCalculateBT601, getCalculateBT709, getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {GrayScalerGetter} from "@/types.ts";
function resolve(str: string) {
    return path.resolve(import.meta.dirname, str);
}

console.log(ANSI_BLUE("--- Tests compare luminance value before and after down-scaling ---"));

async function getLumus(imgPath: string, getFunc?: GrayScalerGetter) {
    const iData = await readFileImageData(resolve(imgPath));
    const grayData = getGrayData(iData, getFunc);
    const avgLuminanceOrig = grayData.data.reduce((a, b) => a + b, 0) / grayData.data.length;
    const grayDataScaled = scaleDownLinear(grayData, {width: 8, height: 8});
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
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, getCalculateBT601);
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
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, getCalculateAverage);
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
    const {avgLuminanceOrig, avgLuminanceScaled} = await getLumus(`../img/alyson_hannigan_500x500.jpg`, getCalculateBT709);
    t({
        result: avgLuminanceOrig,
        expect: 159.945212,
    });
    t({
        result: avgLuminanceScaled,
        expect: 159.953125,
    });
}


