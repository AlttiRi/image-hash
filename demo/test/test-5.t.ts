import {bmvbhash} from "blockhash-core";
import {ANSI_BLUE, report, t} from "../tester.ts";
import {bHash} from "@/hashers.ts";
import {Files, FilesArg, getImageData} from "../constants.ts";


console.log(ANSI_BLUE("--- Test 5 --- 8 bytes blockhash hashes ---"));

const size = 8;
let testCount = 0;
let totalDiffClassic = 0;
let totalDiffAlttiri = 0;
let totalDiffNonOrig = 0;

async function getValue(image: FilesArg) {
    const iData = await getImageData(image);
    const hash_orig    = bmvbhash(iData, size);
    const hash_classic = bHash(iData, {size, classic: true});
    const hash_alttiri = bHash(iData, {size});

    const diff_c = hash_classic.diffHex(hash_orig);
    const diff_a = hash_alttiri.diffHex(hash_orig);
    const diff_n = hash_alttiri.diff(hash_classic);

    totalDiffClassic += diff_c;
    totalDiffAlttiri += diff_a;
    totalDiffNonOrig += diff_n;
    testCount++;

    return {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n};
}

{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._1_alyson);
    t({
        result: hash_orig,
        expect: "c7c2cbc2c4f4f8e0",
    });
    t({
        result: hash_classic.hex,
        expect: "c7c2cbc2c4f4f8e0",
    });
    t({
        result: hash_alttiri.hex,
        expect: "c7c2cbc2c4f4f8e0",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._2_orthocanna);
    t({
        result: hash_orig,
        expect: "3e1c1e1c1cdc9d1a",
    });
    t({
        result: hash_classic.hex,
        expect: "1c1c1c1c1c181818",
    });
    t({
        result: hash_alttiri.hex,
        expect: "1c1c1c1c1c181818",
    });
    t({
        result: diff_c,
        expect: 10,
    });
    t({
        result: diff_a,
        expect: 10,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._3_orthocanna_r);
    t({
        result: hash_orig,
        expect: "c1e3e1e3e32362e7",
    });
    t({
        result: hash_classic.hex,
        expect: "e3e3e3e3e3e7e7e7",
    });
    t({
        result: hash_alttiri.hex,
        expect: "e3e3e3e3e3e7e7e7",
    });
    t({
        result: diff_c,
        expect: 9,
    });
    t({
        result: diff_a,
        expect: 9,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._4_bridge);
    t({
        result: hash_orig,
        expect: "071f2e3ce08fc2f8",
    });
    t({
        result: hash_classic.hex,
        expect: "071f2e3ce08fc0f8",
    });
    t({
        result: hash_alttiri.hex,
        expect: "071f273ce08fc0f8",
    });
    t({
        result: diff_c,
        expect: 1,
    });
    t({
        result: diff_a,
        expect: 3,
    });
    t({
        result: diff_n,
        expect: 2,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._5_grey_1);
    t({
        result: hash_orig,
        expect: "0000000070700ec0",
    });
    t({
        result: hash_classic.hex,
        expect: "0000000070700ec0",
    });
    t({
        result: hash_alttiri.hex,
        expect: "0000000070700ec0",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._6_grey);
    t({
        result: hash_orig,
        expect: "e00e0e0000000060",
    });
    t({
        result: hash_classic.hex,
        expect: "e00e0e0000000060",
    });
    t({
        result: hash_alttiri.hex,
        expect: "e00e0e0000000060",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._7_grey_light);
    t({
        result: hash_orig,
        expect: "ff8ff1f1ffffffef",
    });
    t({
        result: hash_classic.hex,
        expect: "ff8ff1f1ffffffef",
    });
    t({
        result: hash_alttiri.hex,
        expect: "ff8ff1f1ffffffef",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._8_grey_light_2);
    t({
        result: hash_orig,
        expect: "9f97f1fffffffcfc",
    });
    t({
        result: hash_classic.hex,
        expect: "9f97f1fffffffefc",
    });
    t({
        result: hash_alttiri.hex,
        expect: "9f97f1fffffffefc",
    });
    t({
        result: diff_c,
        expect: 1,
    });
    t({
        result: diff_a,
        expect: 1,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._9_imagehash);
    t({
        result: hash_orig,
        expect: "ff81f58181cf85c7",
    });
    t({
        result: hash_classic.hex,
        expect: "ff81f58181ef85c7",
    });
    t({
        result: hash_alttiri.hex,
        expect: "ff81f58181cf85c7",
    });
    t({
        result: diff_c,
        expect: 1,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 1,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._10_imagehash_r);
    t({
        result: hash_orig,
        expect: "007e0a7e7e307a38",
    });
    t({
        result: hash_classic.hex,
        expect: "007e0a7e7e107a38",
    });
    t({
        result: hash_alttiri.hex,
        expect: "007e0a7e7e307a38",
    });
    t({
        result: diff_c,
        expect: 1,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 1,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._11_kittens);
    t({
        result: hash_orig,
        expect: "3c9c1e63c38746e6",
    });
    t({
        result: hash_classic.hex,
        expect: "3c9c1e63c38746e6",
    });
    t({
        result: hash_alttiri.hex,
        expect: "3c9c1e63c38746e6",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._12_kittens_2);
    t({
        result: hash_orig,
        expect: "3c9c1e63c38746e6",
    });
    t({
        result: hash_classic.hex,
        expect: "3c9c1e63c38746e6",
    });
    t({
        result: hash_alttiri.hex,
        expect: "3c9c1e63c38746e6",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._13_peppers);
    t({
        result: hash_orig,
        expect: "9a1727c6e11e3f0c",
    });
    t({
        result: hash_classic.hex,
        expect: "9a1727c6e11e3f0c",
    });
    t({
        result: hash_alttiri.hex,
        expect: "1f072787e11e1f1c",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 8,
    });
    t({
        result: diff_n,
        expect: 8,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._14_peppers_2);
    t({
        result: hash_orig,
        expect: "9a1727c6e11e3f0c",
    });
    t({
        result: hash_classic.hex,
        expect: "9a1727c6e11e3f0c",
    });
    t({
        result: hash_alttiri.hex,
        expect: "1f072787e11e1f1c",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 8,
    });
    t({
        result: diff_n,
        expect: 8,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._15_rabbit);
    t({
        result: hash_orig,
        expect: "c7c48f8989c77e0c",
    });
    t({
        result: hash_classic.hex,
        expect: "c7c48f8989c77e0c",
    });
    t({
        result: hash_alttiri.hex,
        expect: "c78c8f8981e7fc04",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 7,
    });
    t({
        result: diff_n,
        expect: 7,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._16_stephen);
    t({
        result: hash_orig,
        expect: "3c3929ab3179b919",
    });
    t({
        result: hash_classic.hex,
        expect: "3c3909ab3179b919",
    });
    t({
        result: hash_alttiri.hex,
        expect: "3c3929ab3179b919",
    });
    t({
        result: diff_c,
        expect: 1,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 1,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._17_flower);
    t({
        result: hash_orig,
        expect: "ff00ff002f0e9f09",
    });
    t({
        result: hash_classic.hex,
        expect: "ff00ff002f0e9f09",
    });
    t({
        result: hash_alttiri.hex,
        expect: "ff00ff006f0c9f09",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 2,
    });
    t({
        result: diff_n,
        expect: 2,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._18_flower_);
    t({
        result: hash_orig,
        expect: "00ff00ffd0f160f6",
    });
    t({
        result: hash_classic.hex,
        expect: "00ff00ffd0f160f6",
    });
    t({
        result: hash_alttiri.hex,
        expect: "00ff00ff90f360f6",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 2,
    });
    t({
        result: diff_n,
        expect: 2,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._19_dress);
    t({
        result: hash_orig,
        expect: "3f03ef04f17006f3",
    });
    t({
        result: hash_classic.hex,
        expect: "7f03ef04f17006f3",
    });
    t({
        result: hash_alttiri.hex,
        expect: "7f03ef04f17006f3",
    });
    t({
        result: diff_c,
        expect: 1,
    });
    t({
        result: diff_a,
        expect: 1,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._20_wallpaper);
    t({
        result: hash_orig,
        expect: "643e1f0e0f0f1f07",
    });
    t({
        result: hash_classic.hex,
        expect: "643e1f0e0f0f1f07",
    });
    t({
        result: hash_alttiri.hex,
        expect: "643e1f0e0f0f1f07",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}
{
    const {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n} = await getValue(Files._21_wallpaper_2);
    t({
        result: hash_orig,
        expect: "9bc1e0f1f0f0e0f8",
    });
    t({
        result: hash_classic.hex,
        expect: "9bc1e0f1f0f0e0f8",
    });
    t({
        result: hash_alttiri.hex,
        expect: "9bc1e0f1f0f0e0f8",
    });
    t({
        result: diff_c,
        expect: 0,
    });
    t({
        result: diff_a,
        expect: 0,
    });
    t({
        result: diff_n,
        expect: 0,
    });
}

{
    const allHashesBitsCount = testCount * size * size;
    const onePercent = allHashesBitsCount / 100;
    t({
        result: testCount,
        expect: 21,
    });
    t({
        result: allHashesBitsCount,
        expect: 1344,
        name: "all hashes bits"
    });

    t({
        result: totalDiffClassic,
        expect: 25,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.8601190476190477,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 51,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 3.794642857142857,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 32,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 2.380952380952381,
        name: "totalDiffNonOrig",
    });
}

report();
