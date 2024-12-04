import {Files, getImageData} from "../constants.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {aHash, dHash} from "@/hashers.ts";
import {ANSI_BLUE, t} from "../../test/tester.ts";
import {GrayImageData} from "@/mono-image-data.ts";
import sharp from "sharp";
import {ImageDataLike} from "@/types.ts";



console.log(ANSI_BLUE("--- Tests 4 - Sharp.js ---"));


async function getGrayDataWithSharp(iData: ImageDataLike) {
    const {data, info: {width, height} } = await sharp(iData.data, {
        raw: {
            width: iData.width,
            height: iData.height,
            channels: 4,
        }
    }).grayscale()
        .raw()
        .toBuffer({resolveWithObject: true});

    return new GrayImageData(data, width, height);
}

// very slow for every "kernel" mode except "nearest" (but it produces very bad result)
async function getGrayDataScaledWithSharp(iData: ImageDataLike, width = 8, height = 8) {
    const sh = await sharp(iData.data, {
        raw: {
            width: iData.width,
            height: iData.height,
            channels: 4,
        }
    }).grayscale()
        .resize({
            fit: "fill",
            kernel: "lanczos3",
            width,
            height,
        })
        .raw()
        .toBuffer({resolveWithObject: true});

    return new GrayImageData(sh.data, sh.info.width, sh.info.height);
}


const known_a_py_hashes = {
    "alyson_hannigan_500x500.jpg":                        "e7c7dac2c6fcfae8",
    "black-bg-orthocanna-500x500.jpg":                    "0c0c1c1c18181810",
    "black-bg-orthocanna-500x500-reverse.jpg":            "f3f3e3e3e7e7e7ef",
    "bridge-500x320.jpg":                                 "00010e3ce08ffffe",
    "grey-dark-bg-2-600x600.png":                         "e00e0e0000000060",
    "grey-dark-bg-600x600.png":                           "0000000070768ec0",
    "grey-light-bg-2-600x600.png":                        "1f13f1fffffffefc",
    "grey-light-bg-600x600.png":                          "8f8ff1d1fffbefe7",
    "imagehash-1200x600.png":                             "ffd7918181c9ffff",
    "imagehash-1200x600-reverse.png":                     "00286e7e7e360000",
    "kittens-3264x2448.jpg":                              "001000204286fffe",
    "kittens-minicrop-3258x2448.jpg":                     "001000204286fffe",
    "peppers-600x600.png":                                "9f172786e71f1e00",
    "peppers-minicrop-599x599.png":                       "9f172786e71f1e00",
    "rabbit-320x192.png":                                 "efcf8f8180c67e00",
    "saint-stephen-150x200.png":                          "3c000101fbffb919",
    "screenshot-dark-purple-flower-1353x851.png":         "ffffef000c0c0d01",
    "screenshot-dark-purple-flower-1353x851-reverse.png": "000010fff3f3f2fe",
    "screenshot-magenta-dress-1898x946.png":              "ffefef0c706006e2",
    "wallpaper-dark-purple-2560x1600.jpg":                "203e1f0f0f0f0700",
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        "dfc1e0f0f0f0f8ff",
} as const;
const known_d_py_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                        "8f94b616b4245452",
    "black-bg-orthocanna-500x500.jpg":                    "59593938b2b2b0b4",
    "black-bg-orthocanna-500x500-reverse.jpg":            "262606060d4d4c4a",
    "bridge-500x320.jpg":                                 "fdffeef0c03e96c0",
    "grey-dark-bg-2-600x600.png":                         "86383887082040d0",
    "grey-dark-bg-600x600.png":                           "80341333cacc2c23",
    "grey-light-bg-2-600x600.png":                        "7c36c76812020404",
    "grey-light-bg-600x600.png":                          "323cc333ccc20c48",
    "imagehash-1200x600.png":                             "0026273b2b19550e",
    "imagehash-1200x600-reverse.png":                     "00c8d8c4d4e6a2f0",
    "kittens-3264x2448.jpg":                              "e030b8ce864c8e8e",
    "kittens-minicrop-3258x2448.jpg":                     "e030b8ce864cae8e",
    "peppers-600x600.png":                                "3a7ece1c9df4fcb9",
    "peppers-minicrop-599x599.png":                       "3a7ece1c9df4fcb9",
    "rabbit-320x192.png":                                 "0c18383b3b8cc858",
    "saint-stephen-150x200.png":                          "6171714763e373b3",
    "screenshot-dark-purple-flower-1353x851.png":         "6a95cdccd8d839a9",
    "screenshot-dark-purple-flower-1353x851-reverse.png": "956a22332727c656",
    "screenshot-magenta-dress-1898x946.png":              "d09c9dd9c3c22a82",
    "wallpaper-dark-purple-2560x1600.jpg":                "cce4f058797b7e3e",
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        "331b0fa7860401c1",
} as const;
const size = 8;
const count = Object.keys(Files).length;

{
    // let's pre-cache the data
    for (const filename of Object.values(Files)) {
        await getImageData(filename);
    }
}

{
    let aDiff = 0;
    let dDiff = 0;
    console.time("getGrayData+scaleDownLinear"); // 300 ms
    for (const filename of Object.values(Files)) {
        const iData = await getImageData(filename);
        const grayData       = getGrayData(iData);
        const grayDataScaled = scaleDownLinear(grayData);
        const a = aHash(iData, {grayData, grayDataScaled});
        const d = dHash(iData, {grayData, grayDataScaled, ignore: true});
        aDiff += a.diffHex(known_a_py_hashes[filename]);
        dDiff += d.diffHex(known_d_py_hashes[filename]);
    }
    console.timeEnd("getGrayData+scaleDownLinear");

    t({
        result: aDiff,
        expect: 61,
        name: `${aDiff}`,
    });
    t({
        result: dDiff,
        expect: 156,
        name: `${dDiff}`,
    });
    const aDiffPercentage = aDiff / (size * size * count / 100);
    const dDiffPercentage = dDiff / (size * size * count / 100);
    t({
        result: aDiffPercentage,
        expect: 4.538690476190476,
        name: `aDiff ${aDiffPercentage} %`,
    });
    t({
        result: dDiff / (size * size * count / 100),
        expect: 11.607142857142858,
        name: `dDiff ${dDiffPercentage} %`,
    });
}

{
    let aDiff = 0;
    let dDiff = 0;
    console.time("getGrayDataWithSharp+scaleDownLinear"); // 600 ms
    for (const filename of Object.values(Files)) {
        const iData = await getImageData(filename);
        const grayData:       GrayImageData = await getGrayDataWithSharp(iData);
        const grayDataScaled: GrayImageData = scaleDownLinear(grayData);
        const a = aHash(iData, {grayData, grayDataScaled});
        const d = dHash(iData, {grayData, grayDataScaled, ignore: true});
        aDiff += a.diffHex(known_a_py_hashes[filename]);
        dDiff += d.diffHex(known_d_py_hashes[filename]);
    }
    console.timeEnd("getGrayDataWithSharp+scaleDownLinear");

    t({
        result: aDiff,
        expect: 67,
        name: `${aDiff}`,
    });
    t({
        result: dDiff,
        expect: 158,
        name: `${dDiff}`,
    });
    const aDiffPercentage = aDiff / (size * size * count / 100);
    const dDiffPercentage = dDiff / (size * size * count / 100);
    t({
        result: aDiffPercentage,
        expect: 4.9851190476190474,
        name: `aDiff ${aDiffPercentage} %`,
    });
    t({
        result: dDiff / (size * size * count / 100),
        expect: 11.755952380952381,
        name: `dDiff ${dDiffPercentage} %`,
    });
}

{
    let aDiff = 0;
    let dDiff = 0;
    console.time("getGrayDataScaledWithSharp");  // 3600 ms
    for (const filename of Object.values(Files)) {
        const iData = await getImageData(filename);
        const gds1: GrayImageData = await getGrayDataScaledWithSharp(iData, 8, 8);
        const gds2: GrayImageData = await getGrayDataScaledWithSharp(iData, 9, 8);
        const a = aHash(iData, {grayDataScaled: gds1});
        const d = dHash(iData, {grayDataScaled: gds2});
        aDiff += a.diffHex(known_a_py_hashes[filename]);
        dDiff += d.diffHex(known_d_py_hashes[filename]);
    }
    console.timeEnd("getGrayDataScaledWithSharp");

    t({
        result: aDiff,
        expect: 22,
        name: `${aDiff}`,
    });
    t({
        result: dDiff,
        expect: 60,
        name: `${dDiff}`,
    });
    const aDiffPercentage = aDiff / (size * size * count / 100);
    const dDiffPercentage = dDiff / (size * size * count / 100);
    t({
        result: aDiffPercentage,
        expect: 1.6369047619047619,
        name: `aDiff ${aDiffPercentage} %`,
    });
    t({
        result: dDiff / (size * size * count / 100),
        expect: 4.464285714285714,
        name: `dDiff ${dDiffPercentage} %`,
    });
}
