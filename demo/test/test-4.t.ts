import {ANSI_BLUE, t} from "../../test/tester.ts";
import path from "node:path";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {getImageDataFromFS} from "../util.demo.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
function resolve(...strs: string[]) {
    return path.resolve(import.meta.dirname, ...strs);
}


console.log(ANSI_BLUE("--- Tests 4 ---"));


const filenames = `
alyson_hannigan_500x500.jpg               
black-bg-orthocanna-500x500.jpg            
bridge-500x320.jpg 
imagehash-1200x600.png    
kittens-3264x2448.jpg 
kittens-minicrop-3258x2448.jpg       
peppers-600x600.png  
rabbit-320x192.png   
screenshot-dark-purple-flower-1353x851.png
screenshot-magenta-dress-1898x946.png
wallpaper-dark-purple-2560x1600.jpg`.trim().split(/\s+/);
const entries = filenames.map(filename => ({
    filepath: resolve("../img", filename),
    name: filename
}));

const a_hashes: Record<string, string> = {};
const m_hashes: Record<string, string> = {};
const d_hashes: Record<string, string> = {};
const b_hashes: Record<string, string> = {};
for (const entry of entries) {
    const iData = await getImageDataFromFS(entry.filepath);
    const grayData       = getGrayData(iData);
    const grayDataScaled = scaleDownLinear(grayData);
    a_hashes[entry.name] = aHash(iData, {grayData, grayDataScaled}).hex;
    m_hashes[entry.name] = mHash(iData, {grayData, grayDataScaled}).hex;
    d_hashes[entry.name] = dHash(iData, {grayData, grayDataScaled, ignore: true}).hex;
    b_hashes[entry.name] = bHash(iData, {grayData, grayDataScaled}).hex;
}

const known_a_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                "e7c7cbc2c4f4fae8",
    "black-bg-orthocanna-500x500.jpg":            "0c0c1c1c18181810",
    "bridge-500x320.jpg":                         "0001063c608ffffe",
    "imagehash-1200x600.png":                     "ffd7f58181c1ffff",
    "kittens-3264x2448.jpg":                      "000000004286fefe",
    "kittens-minicrop-3258x2448.jpg":             "000000004286fefe",
    "peppers-600x600.png":                        "9f170786e51f1e00",
    "rabbit-320x192.png":                         "efcf8f8180427c04",
    "screenshot-dark-purple-flower-1353x851.png": "fff7ff000c080d01",
    "screenshot-magenta-dress-1898x946.png":      "ffefff04706000c2",
    "wallpaper-dark-purple-2560x1600.jpg":        "003e1f0f0f0f0700",
};
const known_m_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                "e7c7ca80c4f4f8a0",
    "black-bg-orthocanna-500x500.jpg":            "1c1c1c1c1c181818",
    "bridge-500x320.jpg":                         "0001063ce08ffffe",
    "imagehash-1200x600.png":                     "ffd391818181a5e7",
    "kittens-3264x2448.jpg":                      "00981e634287fffe",
    "kittens-minicrop-3258x2448.jpg":             "00981e634287fffe",
    "peppers-600x600.png":                        "9f1f2786e51f1e00",
    "rabbit-320x192.png":                         "efcf8f818042fc04",
    "screenshot-dark-purple-flower-1353x851.png": "ffffff000e080d01",
    "screenshot-magenta-dress-1898x946.png":      "ffefff04706000c2",
    "wallpaper-dark-purple-2560x1600.jpg":        "643e1f0f0f0f0f02"
};
const known_d_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                "8f94b43434245452",
    "black-bg-orthocanna-500x500.jpg":            "1818181030303030",
    "bridge-500x320.jpg":                         "ffffeef0c07e96d2",
    "imagehash-1200x600.png":                     "002643332b15550c",
    "kittens-3264x2448.jpg":                      "e020acce864cae8a",
    "kittens-minicrop-3258x2448.jpg":             "e020acce864cae8a",
    "peppers-600x600.png":                        "ba7ece1cddf4fcb9",
    "rabbit-320x192.png":                         "0c1c383b3b8c88d5",
    "screenshot-dark-purple-flower-1353x851.png": "68d5ddccd8dc29a5",
    "screenshot-magenta-dress-1898x946.png":      "d08c9899c3c22a42",
    "wallpaper-dark-purple-2560x1600.jpg":        "c4e4f05879797e3e"
};
const known_b_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                "c7c2cbc2c4f4f8e0",
    "black-bg-orthocanna-500x500.jpg":            "1c1c1c1c1c181818",
    "bridge-500x320.jpg":                         "071f273ce08fc2f8",
    "imagehash-1200x600.png":                     "0000f58181cf85c7",
    "kittens-3264x2448.jpg":                      "3c9c1e63c38746e6",
    "kittens-minicrop-3258x2448.jpg":             "3c9c1e63c38746e6",
    "peppers-600x600.png":                        "1f072787e11e1f1c",
    "rabbit-320x192.png":                         "c78c8f8981e7fc04",
    "screenshot-dark-purple-flower-1353x851.png": "ff00ff006f0c9f09",
    "screenshot-magenta-dress-1898x946.png":      "1f03ef04f17006f3",
    "wallpaper-dark-purple-2560x1600.jpg":        "643e1f0e0f0f1f07"
};
for (const [filename, hash] of Object.entries(a_hashes)) {
    t({
        result: hash,
        expect: known_a_hashes[filename],
        name: "a: " + filename
    });
}
for (const [filename, hash] of Object.entries(m_hashes)) {
    t({
        result: hash,
        expect: known_m_hashes[filename],
        name: "m: " + filename
    });
}
for (const [filename, hash] of Object.entries(d_hashes)) {
    t({
        result: hash,
        expect: known_d_hashes[filename],
        name: "d: " + filename
    });
}
for (const [filename, hash] of Object.entries(b_hashes)) {
    t({
        result: hash,
        expect: known_b_hashes[filename],
        name: "b: " + filename
    });
}

