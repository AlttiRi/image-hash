import {ANSI_BLUE, t} from "../../test/tester.ts";
import path from "node:path";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {getImageDataFromFS} from "../util.demo.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {ImageHash} from "@/image-hash.ts";
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
    "wallpaper-dark-purple-2560x1600.jpg":        "003e1f0f0f0f0f00",
};
const known_m_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                "e7c7ca80c4f4f8a0",
    "black-bg-orthocanna-500x500.jpg":            "1c1c1c1c1c181818",
    "bridge-500x320.jpg":                         "0001273ce08ffffe",
    "imagehash-1200x600.png":                     "ffd391818181a5e7",
    "kittens-3264x2448.jpg":                      "00980e634287fffe",
    "kittens-minicrop-3258x2448.jpg":             "00980e634287fffe",
    "peppers-600x600.png":                        "9f1f2786e51f1e00",
    "rabbit-320x192.png":                         "efcf8f818042fc04",
    "screenshot-dark-purple-flower-1353x851.png": "ffffff000e080d01",
    "screenshot-magenta-dress-1898x946.png":      "ffefff04706000c2",
    "wallpaper-dark-purple-2560x1600.jpg":        "643e1f1f1f0f0f02"
};
const known_d_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                "8f94b43434245452",
    "black-bg-orthocanna-500x500.jpg":            "1818181030303030",
    "bridge-500x320.jpg":                         "ffffeef0c07e96d2",
    "imagehash-1200x600.png":                     "002643332b15550c",
    "kittens-3264x2448.jpg":                      "f020acce864cae8a",
    "kittens-minicrop-3258x2448.jpg":             "f020acce864cae8a",
    "peppers-600x600.png":                        "ba7ece1cddf4fcb9",
    "rabbit-320x192.png":                         "0c1c383b3b8c88d5",
    "screenshot-dark-purple-flower-1353x851.png": "68d5ddccd8dc29a5",
    "screenshot-magenta-dress-1898x946.png":      "d08c9899c3c22a42",
    "wallpaper-dark-purple-2560x1600.jpg":        "c4e4f05879797e3e"
};
const known_b_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                "c7c2cbc2c4f4f8e0",
    "black-bg-orthocanna-500x500.jpg":            "1c1c1c1c1c181818",
    "bridge-500x320.jpg":                         "031f273ce08fc2f8",
    "imagehash-1200x600.png":                     "0000f58181cf85c7",
    "kittens-3264x2448.jpg":                      "3c9c1e63c38746e6",
    "kittens-minicrop-3258x2448.jpg":             "3c9c1e63c38746e6",
    "peppers-600x600.png":                        "1f072787e11e1f1c",
    "rabbit-320x192.png":                         "c78c8f8981e7fc04",
    "screenshot-dark-purple-flower-1353x851.png": "ff00ff006f0c9f09",
    "screenshot-magenta-dress-1898x946.png":      "1f03ef04f17006f3",
    "wallpaper-dark-purple-2560x1600.jpg":        "643e1f0e0f0f1f07"
};
let totalDiff = 0;
function tt(hashes: Record<string, string>,known_hashes: Record<string, string>, prefix: string) {
    for (const [filename, hash] of Object.entries(hashes)) {
        let diff = 0 ;
        if (hash !== known_hashes[filename]) {
            diff = ImageHash.diffHex(hash, known_hashes[filename]);
            totalDiff += diff;
        }
        t({
            result: hash,
            expect: known_hashes[filename],
            name: `${prefix}: ` + filename + (diff ? ` (diff: ${diff})` : "")
        });
    }
}

tt(a_hashes, known_a_hashes, "a");
tt(m_hashes, known_m_hashes, "m");
tt(d_hashes, known_d_hashes, "d");
tt(b_hashes, known_b_hashes, "b");
t({
    result: totalDiff,
    expect: 0,
    name: "total diff"
});
console.log("---");

//
// "imagehash" python library with `ANTIALIAS = Image.Resampling.LANCZOS` (default)
//
let totalPyDiff = 0;
function tt_py(hashes: Record<string, string>, known_hashes: Record<string, [string, number]>, prefix: string) {
    for (const [filename, hash] of Object.entries(hashes)) {
        const diff = ImageHash.diffHex(hash, known_hashes[filename][0]);
        totalPyDiff += diff;
        t({
            result: diff,
            expect: known_hashes[filename][1],
            name: `${prefix}: ` + filename + (diff ? ` (diff: ${diff})` : "")
        });
    }
}
const known_a_py_hashes: Record<string, [string, number]> = {
    "alyson_hannigan_500x500.jpg":                ["e7c7dac2c6fcfae8", 4],
    "black-bg-orthocanna-500x500.jpg":            ["0c0c1c1c18181810", 0],
    "bridge-500x320.jpg":                         ["00010e3ce08ffffe", 2],
    "imagehash-1200x600.png":                     ["ffd7918181c9ffff", 4],
    "kittens-3264x2448.jpg":                      ["001000204286fffe", 3],
    "kittens-minicrop-3258x2448.jpg":             ["001000204286fffe", 3],
    "peppers-600x600.png":                        ["9f172786e71f1e00", 2],
    "rabbit-320x192.png":                         ["efcf8f8180c67e00", 4],
    "screenshot-dark-purple-flower-1353x851.png": ["ffffef000c0c0d01", 3],
    "screenshot-magenta-dress-1898x946.png":      ["ffefef0c706006e2", 5],
    "wallpaper-dark-purple-2560x1600.jpg":        ["203e1f0f0f0f0700", 2]
};
const known_d_py_hashes: Record<string, [string, number]> = {
    "alyson_hannigan_500x500.jpg":                ["8f94b616b4245452", 4],
    "black-bg-orthocanna-500x500.jpg":            ["59593938b2b2b0b4", 15],
    "bridge-500x320.jpg":                         ["fdffeef0c03e96c0", 4],
    "imagehash-1200x600.png":                     ["0026273b2b19550e", 7],
    "kittens-3264x2448.jpg":                      ["e030b8ce864c8e8e", 6],
    "kittens-minicrop-3258x2448.jpg":             ["e030b8ce864cae8e", 5],
    "peppers-600x600.png":                        ["3a7ece1c9df4fcb9", 2],
    "rabbit-320x192.png":                         ["0c18383b3b8cc858", 6],
    "screenshot-dark-purple-flower-1353x851.png": ["6a95cdccd8d839a9", 7],
    "screenshot-magenta-dress-1898x946.png":      ["d09c9dd9c3c22a82", 6],
    "wallpaper-dark-purple-2560x1600.jpg":        ["cce4f058797b7e3e", 2]
}


tt_py(a_hashes, known_a_py_hashes, "a_py");
tt_py(d_hashes, known_d_py_hashes, "d_py");
const totalPyDiffExpect = 96;
const countPy = Object.keys(known_a_py_hashes).length + Object.keys(known_d_py_hashes).length;
t({
    result: countPy,
    expect: 22,
});
t({
    result: totalPyDiff,
    expect: totalPyDiffExpect,
    name: `total diff_py (${totalPyDiffExpect})`
});
t({
    result: totalPyDiff / countPy,
    expect: totalPyDiffExpect / countPy,
    name: `total diff_py avg (${totalPyDiffExpect / countPy})`
});

//
// "imagehash" python library with `ANTIALIAS = Image.Resampling.BOX`
//
let totalPyDiffBox = 0;
function tt_py_box(hashes: Record<string, string>, known_hashes: Record<string, [string, number]>, prefix: string) {
    for (const [filename, hash] of Object.entries(hashes)) {
        const diff = ImageHash.diffHex(hash, known_hashes[filename][0]);
        totalPyDiffBox += diff;
        t({
            result: diff,
            expect: known_hashes[filename][1],
            name: `${prefix}: ` + filename + (diff ? ` (diff: ${diff})` : "")
        });
    }
}
const known_a_py_box_hashes: Record<string, [string, number]> = {
    "alyson_hannigan_500x500.jpg":                ["e7c7cbc2c4f4f8e8", 1],
    "black-bg-orthocanna-500x500.jpg":            ["0c0c1c1c18181810", 0],
    "bridge-500x320.jpg":                         ["0001063c608ffffe", 0],
    "imagehash-1200x600.png":                     ["ffd7f78181c1ffff", 1],
    "kittens-3264x2448.jpg":                      ["000000004286fefe", 0],
    "kittens-minicrop-3258x2448.jpg":             ["000000004286fefe", 0],
    "peppers-600x600.png":                        ["9f1f0786e51f1e00", 1],
    "rabbit-320x192.png":                         ["efcf8f8180427c04", 0],
    "screenshot-dark-purple-flower-1353x851.png": ["fff7ff000c080d01", 0],
    "screenshot-magenta-dress-1898x946.png":      ["ffefff04f06000c2", 1],
    "wallpaper-dark-purple-2560x1600.jpg":        ["003e1f0f0f0f0700", 1]
};
const known_d_py_box_hashes: Record<string, [string, number]> = {
    "alyson_hannigan_500x500.jpg":                ["8f94b43434245452", 0],
    "black-bg-orthocanna-500x500.jpg":            ["1818181030303030", 0],
    "bridge-500x320.jpg":                         ["ffffeef0c07e96d2", 0],
    "imagehash-1200x600.png":                     ["002643332b15550c", 0],
    "kittens-3264x2448.jpg":                      ["e020acce864cae8a", 1],
    "kittens-minicrop-3258x2448.jpg":             ["e020acce864cae8a", 1],
    "peppers-600x600.png":                        ["ba7ece1cddf4fcb9", 0],
    "rabbit-320x192.png":                         ["0c1c383b3b8d88d5", 1],
    "screenshot-dark-purple-flower-1353x851.png": ["e8d5ddccd8dc29a5", 1],
    "screenshot-magenta-dress-1898x946.png":      ["d09c9999c3c22a02", 3],
    "wallpaper-dark-purple-2560x1600.jpg":        ["c4e4f05879797e3e", 0]
};


tt_py_box(a_hashes, known_a_py_box_hashes, "a_py_box");
tt_py_box(d_hashes, known_d_py_box_hashes, "d_py_box");

const totalPyDiffExpectBox = 12;
const countPyBox = Object.keys(known_a_py_box_hashes).length + Object.keys(known_d_py_box_hashes).length;
t({
    result: countPyBox,
    expect: 22,
});
t({
    result: totalPyDiffBox,
    expect: totalPyDiffExpectBox,
    name: `total diff_py_box (${totalPyDiffExpectBox})`
});
t({
    result: totalPyDiffBox / countPyBox,
    expect: totalPyDiffExpectBox / countPyBox,
    name: `total diff_py_box avg (${totalPyDiffExpectBox / countPyBox})`
});

