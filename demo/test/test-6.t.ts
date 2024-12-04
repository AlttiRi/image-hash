import {bmvbhash} from "blockhash-core";
import path from "node:path";
import {ANSI_BLUE, t} from "../../test/tester.ts";
import {getImageDataFromFS,} from "../util.demo.ts";
import {bHash} from "@/hashers.ts";
import {Files} from "../constants.ts";
import {ImageDataLike} from "@/types.ts";
function resolve(...strs: string[]) {
    return path.resolve(import.meta.dirname, ...strs);
}


console.log(ANSI_BLUE("--- Tests 5 --- different sizes blockhash hashes ---"));

let size = 0;
let testCount = 0;
let totalDiffClassic = 0;
let totalDiffAlttiri = 0;
let totalDiffNonOrig = 0;

const log = false;
const cache = new Map();
async function getValue(image: string) {
    let iData: ImageDataLike;
    if (cache.has(image)) {
        iData = cache.get(image);
    } else {
        iData = await getImageDataFromFS(resolve("../img", image));
        cache.set(image, iData);
    }
    if (iData.height < size || iData.height < size) {
        return null;
    }
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
    log && console.log(image, totalDiffClassic);

    return {hash_orig, hash_classic, hash_alttiri, diff_c, diff_a, diff_n};
}

{
    size = 8;
    testCount = 0;
    totalDiffClassic = 0;
    totalDiffAlttiri = 0;
    totalDiffNonOrig = 0;
    for (const [_key, file] of Object.entries(Files)) {
        await getValue(file);
    }

    const allHashesBitsCount = testCount * size * size;
    const onePercent = allHashesBitsCount / 100;
    t({
        result: testCount,
        expect: 21,
    });
    t({
        result: allHashesBitsCount,
        expect: 1344,
        name: `all hashes bits (size: ${size})`,
    });

    t({
        result: totalDiffClassic,
        expect: 22,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.6369047619047619,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 52,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 3.869047619047619,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 34,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 2.5297619047619047,
        name: "totalDiffNonOrig",
    });
}



{
    size = 16;
    testCount = 0;
    totalDiffClassic = 0;
    totalDiffAlttiri = 0;
    totalDiffNonOrig = 0;
    for (const [_key, file] of Object.entries(Files)) {
        await getValue(file);
    }

    const allHashesBitsCount = testCount * size * size;
    const onePercent = allHashesBitsCount / 100;
    t({
        result: testCount,
        expect: 21,
    });
    t({
        result: allHashesBitsCount,
        expect: 5376,
        name: `all hashes bits (size: ${size})`,
    });

    t({
        result: totalDiffClassic,
        expect: 86,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.599702380952381,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 579,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 10.770089285714286,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 529,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 9.840029761904763,
        name: "totalDiffNonOrig",
    });
}


{
    size = 32;
    testCount = 0;
    totalDiffClassic = 0;
    totalDiffAlttiri = 0;
    totalDiffNonOrig = 0;

    for (const [_key, file] of Object.entries(Files)) {
        await getValue(file);
    }

    const allHashesBitsCount = testCount * size * size;
    const onePercent = allHashesBitsCount / 100;
    t({
        result: testCount,
        expect: 21,
    });
    t({
        result: allHashesBitsCount,
        expect: 21504,
        name: `all hashes bits (size: ${size})`,
    });

    t({
        result: totalDiffClassic,
        expect: 274,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.2741815476190477,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 1913,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 8.896019345238095,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 1781,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 8.28218005952381,
        name: "totalDiffNonOrig",
    });
}

{
    size = 64;
    testCount = 0;
    totalDiffClassic = 0;
    totalDiffAlttiri = 0;
    totalDiffNonOrig = 0;

    for (const [_key, file] of Object.entries(Files)) {
        await getValue(file);
    }

    const allHashesBitsCount = testCount * size * size;
    const onePercent = allHashesBitsCount / 100;
    t({
        result: testCount,
        expect: 21,
    });
    t({
        result: allHashesBitsCount,
        expect: 86016,
        name: `all hashes bits (size: ${size})`,
    });

    t({
        result: totalDiffClassic,
        expect: 1229,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.428803943452381,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 7816,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 9.086681547619047,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 7289,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 8.474004836309524,
        name: "totalDiffNonOrig",
    });
}

{
    size = 256;
    testCount = 0;
    totalDiffClassic = 0;
    totalDiffAlttiri = 0;
    totalDiffNonOrig = 0;

    for (const [_key, file] of Object.entries(Files)) {
        await getValue(file);
    }

    const allHashesBitsCount = testCount * size * size;
    const onePercent = allHashesBitsCount / 100;
    t({
        result: testCount,
        expect: 19,
    });
    t({
        result: allHashesBitsCount,
        expect: 1245184,
        name: `all hashes bits (size: ${size})`,
    });

    t({
        result: totalDiffClassic,
        expect: 17999,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.4454891807154606,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 93511,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 7.509813810649671,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 86936,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 6.981779399671052,
        name: "totalDiffNonOrig",
    });
}
