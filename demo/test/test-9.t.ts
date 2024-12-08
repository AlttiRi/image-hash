import {ANSI_BLUE, report, t} from "../tester.ts";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {Files, getImageData} from "../constants.ts";
import {ImageHash} from "@/image-hash.ts";
import {getGrayDataScaledWithSharp, getGrayDataWithSharp, resizeGrayDataScaledWithPica} from "../util.demo.ts";


console.log(ANSI_BLUE("--- Test 9 - Diffs between alt-image-hash and sharp/pica ---"));


const size = 8;
const bitCount = size * size * Object.keys(Files).length;

const a_hashes: Record<string, ImageHash> = {};
const m_hashes: Record<string, ImageHash> = {};
const d_hashes: Record<string, ImageHash> = {};
const b_hashes: Record<string, ImageHash> = {};
const b_hashes_classic: Record<string, ImageHash> = {};
const m_hashes_classic: Record<string, ImageHash> = {};
for (const filename of Object.values(Files)) {
    const iData = await getImageData(filename);
    const grayData       = getGrayData(iData);
    const grayDataScaled = scaleDownLinear(grayData);
    a_hashes[filename] = aHash(iData, {grayDataScaled});
    m_hashes[filename] = mHash(iData, {grayDataScaled});
    d_hashes[filename] = dHash(iData, {grayData});
    b_hashes[filename] = bHash(iData, {grayDataScaled});
    b_hashes_classic[filename] = bHash(iData, {grayDataScaled, classic: true});
    m_hashes_classic[filename] = mHash(iData, {grayDataScaled, classic: true});
}

{
    console.log("getGrayDataWithSharp vs alt-image-hash");

    let a_hash_diff = 0;
    let m_hash_diff = 0;
    let d_hash_diff = 0;
    let b_hash_diff = 0;
    let b_hash_classic_diff = 0;
    let m_hash_classic_diff = 0;
    for (const filename of Object.values(Files)) {
        const iData = await getImageData(filename);
        const grayData       = await getGrayDataWithSharp(iData);
        const grayDataScaled = scaleDownLinear(grayData);
        const a_hash = aHash(iData, {grayDataScaled});
        const m_hash = mHash(iData, {grayDataScaled});
        const d_hash = dHash(iData, {grayData});
        const b_hash = bHash(iData, {grayDataScaled});
        const b_hash_classic = bHash(iData, {grayDataScaled, classic: true});
        const m_hash_classic = mHash(iData, {grayDataScaled, classic: true});

        a_hash_diff += a_hash.diff(a_hashes[filename]);
        m_hash_diff += m_hash.diff(m_hashes[filename]);
        d_hash_diff += d_hash.diff(d_hashes[filename]);
        b_hash_diff += b_hash.diff(b_hashes[filename]);
        b_hash_classic_diff += b_hash_classic.diff(b_hashes_classic[filename]);
        m_hash_classic_diff += m_hash_classic.diff(m_hashes_classic[filename]);
    }

    t({
        result: a_hash_diff,
        expect: 12,
        name: `a_hash_diff (${12}) - ${a_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: m_hash_diff,
        expect: 16,
        name: `a_hash_diff (${12}) - ${m_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: d_hash_diff,
        expect: 10,
        name: `a_hash_diff (${12}) - ${d_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: b_hash_diff,
        expect: 11,
        name: `a_hash_diff (${12}) - ${b_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: b_hash_classic_diff,
        expect: 11,
        name: `a_hash_diff (${12}) - ${b_hash_classic_diff / (bitCount / 100)} %`,
    });
    t({
        result: m_hash_classic_diff,
        expect: 15,
        name: `a_hash_diff (${12}) - ${m_hash_classic_diff / (bitCount / 100)} %`,
    });
}

{
    console.log("getGrayDataScaledWithSharp vs alt-image-hash");

    let a_hash_diff = 0;
    let m_hash_diff = 0;
    let d_hash_diff = 0;
    let b_hash_diff = 0;
    let b_hash_classic_diff = 0;
    let m_hash_classic_diff = 0;
    for (const filename of Object.values(Files)) {
        const iData = await getImageData(filename);
        // const grayData        = await getGrayDataWithSharp(iData);
        const grayDataScaled     = await getGrayDataScaledWithSharp(iData, 8, 8, "lanczos3");
        const grayDataScaled_9x8 = await getGrayDataScaledWithSharp(iData, 9, 8, "lanczos3");
        const a_hash = aHash(iData, {grayDataScaled});
        const m_hash = mHash(iData, {grayDataScaled});
        const d_hash = dHash(iData, {grayDataScaled: grayDataScaled_9x8});
        const b_hash = bHash(iData, {grayDataScaled});
        const b_hash_classic = bHash(iData, {grayDataScaled, classic: true});
        const m_hash_classic = mHash(iData, {grayDataScaled, classic: true});

        a_hash_diff += a_hash.diff(a_hashes[filename]);
        m_hash_diff += m_hash.diff(m_hashes[filename]);
        d_hash_diff += d_hash.diff(d_hashes[filename]);
        b_hash_diff += b_hash.diff(b_hashes[filename]);
        b_hash_classic_diff += b_hash_classic.diff(b_hashes_classic[filename]);
        m_hash_classic_diff += m_hash_classic.diff(m_hashes_classic[filename]);
    }

    t({
        result: a_hash_diff,
        expect: 66,
        name: `a_hash_diff (${12}) - ${a_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: m_hash_diff,
        expect: 104,
        name: `a_hash_diff (${12}) - ${m_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: d_hash_diff,
        expect: 170,
        name: `a_hash_diff (${12}) - ${d_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: b_hash_diff,
        expect: 123,
        name: `a_hash_diff (${12}) - ${b_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: b_hash_classic_diff,
        expect: 123,
        name: `a_hash_diff (${12}) - ${b_hash_classic_diff / (bitCount / 100)} %`,
    });
    t({
        result: m_hash_classic_diff,
        expect: 127,
        name: `a_hash_diff (${12}) - ${m_hash_classic_diff / (bitCount / 100)} %`,
    });
}

{
    console.log("resizeGrayDataScaledWithPica (lanczos3) vs alt-image-hash");

    let a_hash_diff = 0;
    let m_hash_diff = 0;
    let d_hash_diff = 0;
    let b_hash_diff = 0;
    let b_hash_classic_diff = 0;
    let m_hash_classic_diff = 0;
    for (const filename of Object.values(Files)) {
        const iData = await getImageData(filename);
        const grayData = getGrayData(iData);
        const grayDataScaled     = await resizeGrayDataScaledWithPica(grayData, 8, 8, "lanczos3");
        const grayDataScaled_9x8 = await resizeGrayDataScaledWithPica(grayData, 9, 8, "lanczos3");
        const a_hash = aHash(iData, {grayDataScaled});
        const m_hash = mHash(iData, {grayDataScaled});
        const d_hash = dHash(iData, {grayDataScaled: grayDataScaled_9x8});
        const b_hash = bHash(iData, {grayDataScaled});
        const b_hash_classic = bHash(iData, {grayDataScaled, classic: true});
        const m_hash_classic = mHash(iData, {grayDataScaled, classic: true});

        a_hash_diff += a_hash.diff(a_hashes[filename]);
        m_hash_diff += m_hash.diff(m_hashes[filename]);
        d_hash_diff += d_hash.diff(d_hashes[filename]);
        b_hash_diff += b_hash.diff(b_hashes[filename]);
        b_hash_classic_diff += b_hash_classic.diff(b_hashes_classic[filename]);
        m_hash_classic_diff += m_hash_classic.diff(m_hashes_classic[filename]);
    }

    t({
        result: a_hash_diff,
        expect: 65,
        name: `a_hash_diff (${12}) - ${a_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: m_hash_diff,
        expect: 118,
        name: `a_hash_diff (${12}) - ${m_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: d_hash_diff,
        expect: 159,
        name: `a_hash_diff (${12}) - ${d_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: b_hash_diff,
        expect: 115,
        name: `a_hash_diff (${12}) - ${b_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: b_hash_classic_diff,
        expect: 115,
        name: `a_hash_diff (${12}) - ${b_hash_classic_diff / (bitCount / 100)} %`,
    });
    t({
        result: m_hash_classic_diff,
        expect: 138,
        name: `a_hash_diff (${12}) - ${m_hash_classic_diff / (bitCount / 100)} %`,
    });
}

{
    console.log("resizeGrayDataScaledWithPica (box) vs alt-image-hash");

    let a_hash_diff = 0;
    let m_hash_diff = 0;
    let d_hash_diff = 0;
    let b_hash_diff = 0;
    let b_hash_classic_diff = 0;
    let m_hash_classic_diff = 0;
    for (const filename of Object.values(Files)) {
        const iData = await getImageData(filename);
        const grayData = getGrayData(iData);
        const grayDataScaled     = await resizeGrayDataScaledWithPica(grayData, 8, 8, "box");
        const grayDataScaled_9x8 = await resizeGrayDataScaledWithPica(grayData, 9, 8, "box");
        const a_hash = aHash(iData, {grayDataScaled});
        const m_hash = mHash(iData, {grayDataScaled});
        const d_hash = dHash(iData, {grayDataScaled: grayDataScaled_9x8});
        const b_hash = bHash(iData, {grayDataScaled});
        const b_hash_classic = bHash(iData, {grayDataScaled, classic: true});
        const m_hash_classic = mHash(iData, {grayDataScaled, classic: true});

        a_hash_diff += a_hash.diff(a_hashes[filename]);
        m_hash_diff += m_hash.diff(m_hashes[filename]);
        d_hash_diff += d_hash.diff(d_hashes[filename]);
        b_hash_diff += b_hash.diff(b_hashes[filename]);
        b_hash_classic_diff += b_hash_classic.diff(b_hashes_classic[filename]);
        m_hash_classic_diff += m_hash_classic.diff(m_hashes_classic[filename]);
    }

    t({
        result: a_hash_diff,
        expect: 2,
        name: `a_hash_diff (${12}) - ${a_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: m_hash_diff,
        expect: 6,
        name: `a_hash_diff (${12}) - ${m_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: d_hash_diff,
        expect: 50,
        name: `a_hash_diff (${12}) - ${d_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: b_hash_diff,
        expect: 6,
        name: `a_hash_diff (${12}) - ${b_hash_diff / (bitCount / 100)} %`,
    });
    t({
        result: b_hash_classic_diff,
        expect: 6,
        name: `a_hash_diff (${12}) - ${b_hash_classic_diff / (bitCount / 100)} %`,
    });
    t({
        result: m_hash_classic_diff,
        expect: 35,
        name: `a_hash_diff (${12}) - ${m_hash_classic_diff / (bitCount / 100)} %`,
    });
}

report();
