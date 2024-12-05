import {ANSI_BLUE, t} from "../../test/tester.ts";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {ImageHash} from "@/image-hash.ts";
import {Files, getImageData} from "../constants.ts";


console.log(ANSI_BLUE("--- Tests 4 ---"));


const a_hashes: Record<string, string> = {};
const m_hashes: Record<string, string> = {};
const d_hashes: Record<string, string> = {};
const b_hashes: Record<string, string> = {};
const b_hashes_classic: Record<string, string> = {};
const m_hashes_classic: Record<string, string> = {};
for (const filename of Object.values(Files)) {
    const iData = await getImageData(filename);
    const grayData       = getGrayData(iData);
    const grayDataScaled = scaleDownLinear(grayData);
    a_hashes[filename] = aHash(iData, {grayData, grayDataScaled}).hex;
    m_hashes[filename] = mHash(iData, {grayData, grayDataScaled}).hex;
    d_hashes[filename] = dHash(iData, {grayData, grayDataScaled, ignore: true}).hex;
    b_hashes[filename] = bHash(iData, {grayData, grayDataScaled}).hex;
    b_hashes_classic[filename] = bHash(iData, {grayData, grayDataScaled, classic: true}).hex;
    m_hashes_classic[filename] = mHash(iData, {grayData, grayDataScaled, classic: true}).hex;

    // console.log(`"${filename}":${' '.repeat(36)} "${m_hashes_classic[filename]}",`);
}

const bitsCount = 64;

const known_a_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                        "e7c7cbc2c4f4fae8",
    "black-bg-orthocanna-500x500.jpg":                    "0c0c1c1c18181810",
    "black-bg-orthocanna-500x500-reverse.jpg":            "f3f3e3e3e7e7e7ef",
    "bridge-500x320.jpg":                                 "0001063c6087fffe",
    "grey-dark-bg-600x600.png":                           "0000000070000ec0",
    "grey-dark-bg-2-600x600.png":                         "e00e0e0000000060",
    "grey-light-bg-600x600.png":                          "ff8ff1f1ffffffef",
    "grey-light-bg-2-600x600.png":                        "9f97f1fffffffefc",
    "imagehash-1200x600.png":                             "ffd7f58181c1ffff",
    "imagehash-1200x600-reverse.png":                     "0028087e7e3a0000",
    "kittens-3264x2448.jpg":                              "000000004286fefe",
    "kittens-minicrop-3258x2448.jpg":                     "000000004286fefe",
    "peppers-600x600.png":                                "9f170786e51f1e00",
    "peppers-minicrop-599x599.png":                       "9f170786e51f1e00",
    "rabbit-320x192.png":                                 "efcf8f8180427c04",
    "saint-stephen-150x200.png":                          "3c000101fbffb919",
    "screenshot-dark-purple-flower-1353x851.png":         "fff7ff000c080d01",
    "screenshot-dark-purple-flower-1353x851-reverse.png": "000800fff3f7f2fe",
    "screenshot-magenta-dress-1898x946.png":              "ffefff04706000c2",
    "wallpaper-dark-purple-2560x1600.jpg":                "003e1f0f0f0f0f00",
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        "ffc1e0f0f0f0f0ff",
} as const;
const known_m_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                        "e7c7cac0c4f4f8e0",
    "black-bg-orthocanna-500x500.jpg":                    "1c1c1c1c1c181818",
    "black-bg-orthocanna-500x500-reverse.jpg":            "e3e3e3e3e3e7e7e7",
    "bridge-500x320.jpg":                                 "0001063ce08ffffe",
    "grey-dark-bg-600x600.png":                           "0000000070700ec0",
    "grey-dark-bg-2-600x600.png":                         "e00e0e0000000060",
    "grey-light-bg-600x600.png":                          "ff8ff1f1ffffffef",
    "grey-light-bg-2-600x600.png":                        "9f97f1fffffffefc",
    "imagehash-1200x600.png":                             "ffd391818181a5e7",
    "imagehash-1200x600-reverse.png":                     "002c6e7e7e7e5a18",
    "kittens-3264x2448.jpg":                              "00980e634287fffe",
    "kittens-minicrop-3258x2448.jpg":                     "00980e634287fffe",
    "peppers-600x600.png":                                "9f1f2786e51f1e00",
    "peppers-minicrop-599x599.png":                       "9f1f2786e51f1e00",
    "rabbit-320x192.png":                                 "efcf8f818042fc04",
    "saint-stephen-150x200.png":                          "3c010101fffff919",
    "screenshot-dark-purple-flower-1353x851.png":         "ffffff000e080d01",
    "screenshot-dark-purple-flower-1353x851-reverse.png": "000000fff1f7f2fe",
    "screenshot-magenta-dress-1898x946.png":              "ffefff04706000c2",
    "wallpaper-dark-purple-2560x1600.jpg":                "643e1f1f1f0f0f02",
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        "9bc1e0e0e0f0f0fd",
} as const;
const known_m_hashes_classic: Record<string, string> = {     // todo: use it
    "alyson_hannigan_500x500.jpg":                        "e7c7ca80c4f4f8a0",
    "black-bg-orthocanna-500x500.jpg":                    "1c1c1c1c1c181818",
    "black-bg-orthocanna-500x500-reverse.jpg":            "0000000000000000",
    "bridge-500x320.jpg":                                 "0001063ce08ffffe",
    "grey-dark-bg-600x600.png":                           "0000000070700ec0",
    "grey-dark-bg-2-600x600.png":                         "e00e0e0000000060",
    "grey-light-bg-600x600.png":                          "0000000000700e00",
    "grey-light-bg-2-600x600.png":                        "0e06700000000000",
    "imagehash-1200x600.png":                             "ffd391818181a5e7",
    "imagehash-1200x600-reverse.png":                     "002c6e7e7e7e5a18",
    "kittens-3264x2448.jpg":                              "00980e634287fffe",
    "kittens-minicrop-3258x2448.jpg":                     "00980e634287fffe",
    "peppers-600x600.png":                                "9f1f2786e51f1e00",
    "peppers-minicrop-599x599.png":                       "9f170786e51f1e00",
    "rabbit-320x192.png":                                 "efcf8f818042fc04",
    "saint-stephen-150x200.png":                          "3c010101fbfff919",
    "screenshot-dark-purple-flower-1353x851.png":         "ffffff000e080d01",
    "screenshot-dark-purple-flower-1353x851-reverse.png": "000000fff1f7f2fe",
    "screenshot-magenta-dress-1898x946.png":              "ffefff04706000c2",
    "wallpaper-dark-purple-2560x1600.jpg":                "643e1f1f1f0f0f02",
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        "9bc1e0e0e0f0f0fd",
} as const;
const known_d_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                        "8f94b43434245452",
    "black-bg-orthocanna-500x500.jpg":                    "1818181030303030",
    "black-bg-orthocanna-500x500-reverse.jpg":            "0606060e0c0c0c08",
    "bridge-500x320.jpg":                                 "ffffeef0c07e96d2",
    "grey-dark-bg-600x600.png":                           "00300302c060cc00",
    "grey-dark-bg-2-600x600.png":                         "8678180000000040",
    "grey-light-bg-600x600.png":                          "0030030300c00c08",
    "grey-light-bg-2-600x600.png":                        "7c36660000000001",
    "imagehash-1200x600.png":                             "002643332b15550c",
    "imagehash-1200x600-reverse.png":                     "00d8bcccd4eaaa60",
    "kittens-3264x2448.jpg":                              "f020acce864cae8a",
    "kittens-minicrop-3258x2448.jpg":                     "f020acce864cae8a",
    "peppers-600x600.png":                                "ba7ece1cddf4fcb9",
    "peppers-minicrop-599x599.png":                       "ba7ece1cddf4fcb9",
    "rabbit-320x192.png":                                 "0c1c383b3b8c88d5",
    "saint-stephen-150x200.png":                          "6171515363e373f1",
    "screenshot-dark-purple-flower-1353x851.png":         "e8d5ddccd8dc29a5",
    "screenshot-dark-purple-flower-1353x851-reverse.png": "102a22332723d65a",
    "screenshot-magenta-dress-1898x946.png":              "d09c9899c3c22a02",
    "wallpaper-dark-purple-2560x1600.jpg":                "c4e4f05879797e3e",
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        "3b1b0f27860601c1",
} as const;
const known_b_hashes: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                        "c7c2cbc2c4f4f8e0",
    "black-bg-orthocanna-500x500.jpg":                    "1c1c1c1c1c181818",
    "black-bg-orthocanna-500x500-reverse.jpg":            "e3e3e3e3e3e7e7e7",
    "bridge-500x320.jpg":                                 "071f273ce08fc0f8",
    "grey-dark-bg-600x600.png":                           "0000000070700ec0",
    "grey-dark-bg-2-600x600.png":                         "e00e0e0000000060",
    "grey-light-bg-600x600.png":                          "ff8ff1f1ffffffef",
    "grey-light-bg-2-600x600.png":                        "9f97f1fffffffefc",
    "imagehash-1200x600.png":                             "ff81f58181cf85c7",
    "imagehash-1200x600-reverse.png":                     "007e0a7e7e307a38",
    "kittens-3264x2448.jpg":                              "3c9c1e63c38746e6",
    "kittens-minicrop-3258x2448.jpg":                     "3c9c1e63c38746e6",
    "peppers-600x600.png":                                "1f072787e11e1f1c",
    "peppers-minicrop-599x599.png":                       "1f072787e11e1f1c",
    "rabbit-320x192.png":                                 "c78c8f8981e7fc04",
    "saint-stephen-150x200.png":                          "3c3909ab3179b919",
    "screenshot-dark-purple-flower-1353x851.png":         "ff00ff006f0c9f09",
    "screenshot-dark-purple-flower-1353x851-reverse.png": "00ff00ff90f360f6",
    "screenshot-magenta-dress-1898x946.png":              "7f03ef04f17006f3",
    "wallpaper-dark-purple-2560x1600.jpg":                "643e1f0e0f0f1f07",
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        "9bc1e0f1f0f0e0f8",
} as const;
const known_b_hashes_classic: Record<string, string> = {
    "alyson_hannigan_500x500.jpg":                        "c7c2cbc2c4f4f8e0",
    "black-bg-orthocanna-500x500.jpg":                    "1c1c1c1c1c181818",
    "black-bg-orthocanna-500x500-reverse.jpg":            "e3e3e3e3e3e7e7e7",
    "bridge-500x320.jpg":                                 "071f273ce08fc0f8",
    "grey-dark-bg-600x600.png":                           "0000000070700ec0",
    "grey-dark-bg-2-600x600.png":                         "e00e0e0000000060",
    "grey-light-bg-600x600.png":                          "ff8ff1f1ffffffef",
    "grey-light-bg-2-600x600.png":                        "9f97f1fffffffefc",
    "imagehash-1200x600.png":                             "ff81f58181cf85c7",
    "imagehash-1200x600-reverse.png":                     "007e0a7e7e307a38",
    "kittens-3264x2448.jpg":                              "3c9c1e63c38746e6",
    "kittens-minicrop-3258x2448.jpg":                     "3c9c1e63c38746e6",
    "peppers-600x600.png":                                "1f072787e11e1f1c",
    "peppers-minicrop-599x599.png":                       "1f072787e11e1f1c",
    "rabbit-320x192.png":                                 "c78c8f8981e7fc04",
    "saint-stephen-150x200.png":                          "3c3909ab3179b919",
    "screenshot-dark-purple-flower-1353x851.png":         "ff00ff006f0c9f09",
    "screenshot-dark-purple-flower-1353x851-reverse.png": "00ff00ff90f360f6",
    "screenshot-magenta-dress-1898x946.png":              "7f03ef04f17006f3",
    "wallpaper-dark-purple-2560x1600.jpg":                "643e1f0e0f0f1f07",
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        "9bc1e0f1f0f0e0f8",
} as const;

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
tt(b_hashes_classic, known_b_hashes_classic, "c");
console.log("---");
t({
    result: totalDiff,
    expect: 0,
    name: "total diff"
});
console.log("---");
console.log();

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
    "alyson_hannigan_500x500.jpg":                        ["e7c7dac2c6fcfae8", 4],
    "black-bg-orthocanna-500x500.jpg":                    ["0c0c1c1c18181810", 0],
    "black-bg-orthocanna-500x500-reverse.jpg":            ["f3f3e3e3e7e7e7ef", 0],
    "bridge-500x320.jpg":                                 ["00010e3ce08ffffe", 3],
    "grey-dark-bg-2-600x600.png":                         ["e00e0e0000000060", 0],
    "grey-dark-bg-600x600.png":                           ["0000000070768ec0", 6],
    "grey-light-bg-2-600x600.png":                        ["1f13f1fffffffefc", 3],
    "grey-light-bg-600x600.png":                          ["8f8ff1d1fffbefe7", 7],
    "imagehash-1200x600.png":                             ["ffd7918181c9ffff", 4],
    "imagehash-1200x600-reverse.png":                     ["00286e7e7e360000", 6],
    "kittens-3264x2448.jpg":                              ["001000204286fffe", 3],
    "kittens-minicrop-3258x2448.jpg":                     ["001000204286fffe", 3],
    "peppers-600x600.png":                                ["9f172786e71f1e00", 2],
    "peppers-minicrop-599x599.png":                       ["9f172786e71f1e00", 2],
    "rabbit-320x192.png":                                 ["efcf8f8180c67e00", 4],
    "saint-stephen-150x200.png":                          ["3c000101fbffb919", 0],
    "screenshot-dark-purple-flower-1353x851.png":         ["ffffef000c0c0d01", 3],
    "screenshot-dark-purple-flower-1353x851-reverse.png": ["000010fff3f3f2fe", 3],
    "screenshot-magenta-dress-1898x946.png":              ["ffefef0c706006e2", 5],
    "wallpaper-dark-purple-2560x1600.jpg":                ["203e1f0f0f0f0700", 2],
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        ["dfc1e0f0f0f0f8ff", 2],
} as const;
const known_d_py_hashes: Record<string, [string, number]> = {
    "alyson_hannigan_500x500.jpg":                        ["8f94b616b4245452", 4],
    "black-bg-orthocanna-500x500.jpg":                    ["59593938b2b2b0b4", 15],
    "black-bg-orthocanna-500x500-reverse.jpg":            ["262606060d4d4c4a", 9],
    "bridge-500x320.jpg":                                 ["fdffeef0c03e96c0", 4],
    "grey-dark-bg-2-600x600.png":                         ["86383887082040d0", 11],
    "grey-dark-bg-600x600.png":                           ["80341333cacc2c23", 18],
    "grey-light-bg-2-600x600.png":                        ["7c36c76812020404", 12],
    "grey-light-bg-600x600.png":                          ["323cc333ccc20c48", 15],
    "imagehash-1200x600.png":                             ["0026273b2b19550e", 7],
    "imagehash-1200x600-reverse.png":                     ["00c8d8c4d4e6a2f0", 10],
    "kittens-3264x2448.jpg":                              ["e030b8ce864c8e8e", 6],
    "kittens-minicrop-3258x2448.jpg":                     ["e030b8ce864cae8e", 5],
    "peppers-600x600.png":                                ["3a7ece1c9df4fcb9", 2],
    "peppers-minicrop-599x599.png":                       ["3a7ece1c9df4fcb9", 2],
    "rabbit-320x192.png":                                 ["0c18383b3b8cc858", 6],
    "saint-stephen-150x200.png":                          ["6171714763e373b3", 5],
    "screenshot-dark-purple-flower-1353x851.png":         ["6a95cdccd8d839a9", 8],
    "screenshot-dark-purple-flower-1353x851-reverse.png": ["956a22332727c656", 8],
    "screenshot-magenta-dress-1898x946.png":              ["d09c9dd9c3c22a82", 4],
    "wallpaper-dark-purple-2560x1600.jpg":                ["cce4f058797b7e3e", 2],
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        ["331b0fa7860401c1", 3],
} as const;


tt_py(a_hashes, known_a_py_hashes, "a_py");
tt_py(d_hashes, known_d_py_hashes, "d_py");
const totalPyDiffExpect = 218;
const countPy = Object.keys(known_a_py_hashes).length + Object.keys(known_d_py_hashes).length;
console.log("---");
t({
    result: countPy,
    expect: 42,
});
t({
    result: totalPyDiff,
    expect: totalPyDiffExpect,
    name: `total diff_py (${totalPyDiff})`
});
t({
    result: totalPyDiff / countPy,
    expect: totalPyDiffExpect / countPy,
    name: `total diff_py (${totalPyDiff / (countPy * bitsCount / 100)} %)`
});
console.log("---");
console.log();
console.log("---");

//
// "imagehash" python library with `ANTIALIAS = Image.Resampling.BOX`
//
let totalPyBoxDiff = 0;
function tt_py_box(hashes: Record<string, string>, known_hashes: Record<string, [string, number]>, prefix: string) {
    for (const [filename, hash] of Object.entries(hashes)) {
        const diff = ImageHash.diffHex(hash, known_hashes[filename][0]);
        totalPyBoxDiff += diff;
        t({
            result: diff,
            expect: known_hashes[filename][1],
            name: `${prefix}: ` + filename + (diff ? ` (diff: ${diff})` : "")
        });
    }
}
const known_a_py_box_hashes: Record<string, [string, number]> = {
    "alyson_hannigan_500x500.jpg":                        ["e7c7cbc2c4f4f8e8", 1],
    "black-bg-orthocanna-500x500.jpg":                    ["0c0c1c1c18181810", 0],
    "black-bg-orthocanna-500x500-reverse.jpg":            ["f3f3e3e3e7e7e7ef", 0],
    "bridge-500x320.jpg":                                 ["0001063c608ffffe", 1],
    "grey-dark-bg-2-600x600.png":                         ["e00e0e0000000060", 0],
    "grey-dark-bg-600x600.png":                           ["0000000070000ec0", 0],
    "grey-light-bg-2-600x600.png":                        ["9f97f1fffffffefc", 0],
    "grey-light-bg-600x600.png":                          ["ff8ff1f1ffffffef", 0],
    "imagehash-1200x600.png":                             ["ffd7f78181c1ffff", 1],
    "imagehash-1200x600-reverse.png":                     ["0028087e7e3e0000", 1],
    "kittens-3264x2448.jpg":                              ["000000004286fefe", 0],
    "kittens-minicrop-3258x2448.jpg":                     ["000000004286fefe", 0],
    "peppers-600x600.png":                                ["9f1f0786e51f1e00", 1],
    "peppers-minicrop-599x599.png":                       ["9f170786e51f1e00", 0],
    "rabbit-320x192.png":                                 ["efcf8f8180427c04", 0],
    "saint-stephen-150x200.png":                          ["3c000101fbffb919", 0],
    "screenshot-dark-purple-flower-1353x851.png":         ["fff7ff000c080d01", 0],
    "screenshot-dark-purple-flower-1353x851-reverse.png": ["000800fff3f7f2fe", 0],
    "screenshot-magenta-dress-1898x946.png":              ["ffefff04f06000c2", 1],
    "wallpaper-dark-purple-2560x1600.jpg":                ["003e1f0f0f0f0700", 1],
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        ["ffc1e0f0f0f0f8ff", 1],
} as const;
const known_d_py_box_hashes: Record<string, [string, number]> = {
    "alyson_hannigan_500x500.jpg":                        ["8f94b43434245452", 0],
    "black-bg-orthocanna-500x500.jpg":                    ["1818181030303030", 0],
    "black-bg-orthocanna-500x500-reverse.jpg":            ["0606060e0c0c0808", 1],
    "bridge-500x320.jpg":                                 ["ffffeef0c07e96d2", 0],
    "grey-dark-bg-2-600x600.png":                         ["8678180000000040", 0],
    "grey-dark-bg-600x600.png":                           ["00300302c0604c00", 1],
    "grey-light-bg-2-600x600.png":                        ["7c36660000000001", 0],
    "grey-light-bg-600x600.png":                          ["0030030300c00c08", 0],
    "imagehash-1200x600.png":                             ["002643332b15550c", 0],
    "imagehash-1200x600-reverse.png":                     ["00d8bcc4d4eaaa60", 1],
    "kittens-3264x2448.jpg":                              ["e020acce864cae8a", 1],
    "kittens-minicrop-3258x2448.jpg":                     ["e020acce864cae8a", 1],
    "peppers-600x600.png":                                ["ba7ece1cddf4fcb9", 0],
    "peppers-minicrop-599x599.png":                       ["ba7ece1cddf4fcb9", 0],
    "rabbit-320x192.png":                                 ["0c1c383b3b8d88d5", 1],
    "saint-stephen-150x200.png":                          ["6171515363e373f1", 0],
    "screenshot-dark-purple-flower-1353x851.png":         ["e8d5ddccd8dc29a5", 0],
    "screenshot-dark-purple-flower-1353x851-reverse.png": ["102a22332723d65a", 0],
    "screenshot-magenta-dress-1898x946.png":              ["d09c9999c3c22a02", 1],
    "wallpaper-dark-purple-2560x1600.jpg":                ["c4e4f05879797e3e", 0],
    "wallpaper-dark-purple-2560x1600-reverse.jpg":        ["3b1b0f2706060181", 2],
} as const;


tt_py_box(a_hashes, known_a_py_box_hashes, "a_py_box");
tt_py_box(d_hashes, known_d_py_box_hashes, "d_py_box");

const totalPyBoxDiffExpect = 17;
const countPyBox = Object.keys(known_a_py_box_hashes).length + Object.keys(known_d_py_box_hashes).length;
console.log("---");
t({
    result: countPyBox,
    expect: 42,
});
t({
    result: totalPyBoxDiff,
    expect: totalPyBoxDiffExpect,
    name: `total diff_py_box (${totalPyBoxDiff})`
});
t({
    result: totalPyBoxDiff / countPyBox,
    expect: totalPyBoxDiffExpect / countPyBox,
    name: `total diff_py_box (${totalPyBoxDiff / (countPyBox * bitsCount / 100)} %)`
});

