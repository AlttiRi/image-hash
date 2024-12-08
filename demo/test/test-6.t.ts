import {bmvbhash} from "blockhash-core";
import {ANSI_BLUE, report, t} from "../tester.ts";
import {bHash} from "@/hashers.ts";
import {Files, FilesArg, getImageData} from "../constants.ts";


console.log(ANSI_BLUE("--- Test 5 --- Different sizes blockhash hashes ---"));

let size = 0;
let testCount = 0;
let totalDiffClassic = 0;
let totalDiffAlttiri = 0;
let totalDiffNonOrig = 0;

const log = false;
async function getValue(image: FilesArg) {
    let iData = await getImageData(image);

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
        expect: 25,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.8601190476190477,
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
        expect: 31,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 2.306547619047619,
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
        expect: 87,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.6183035714285714,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 573,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 10.658482142857144,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 520,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 9.672619047619047,
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
        expect: 248,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.1532738095238095,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 1936,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 9.002976190476192,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 1818,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 8.454241071428571,
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
        expect: 986,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.1462983630952381,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 7806,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 9.075055803571429,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 7356,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 8.551897321428571,
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
        expect: 13384,
    });
    t({
        result: totalDiffClassic / onePercent,
        expect: 1.0748612253289473,
        name: "totalDiffClassic",
    });

    t({
        result: totalDiffAlttiri,
        expect: 92567,
    });
    t({
        result: totalDiffAlttiri / onePercent,
        expect: 7.434001721833882,
        name: "totalDiffAlttiri",
    });

    t({
        result: totalDiffNonOrig,
        expect: 86423,
    });
    t({
        result: totalDiffNonOrig / onePercent,
        expect: 6.940580669202302,
        name: "totalDiffNonOrig",
    });
}

report();
