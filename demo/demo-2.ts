import path from "node:path";
import fs from "node:fs/promises";
import {saveImageDataWithSharp} from "./util.demo.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {Files, getImageData} from "./constants.ts";

const dirPath = "./demo-img-out/demo-2";
await fs.mkdir(dirPath, {recursive: true});

const size = 256;
for (const filename of Object.values(Files)) {

    const iData = await getImageData(filename);
    const grayData       = getGrayData(iData);
    const grayDataScaled = scaleDownLinear(grayData, {size, ignore: true});
    const a_hash = aHash(iData, {size, grayData, grayDataScaled});
    const m_hash = mHash(iData, {size, grayData, grayDataScaled});
    const d_hash = dHash(iData, {size, grayData, grayDataScaled, ignore: true});
    const b_hash = bHash(iData, {size, grayData, grayDataScaled});

    await saveImageDataWithSharp(a_hash.mono, getPath({filename, size, prefix: "avg"}));
    await saveImageDataWithSharp(m_hash.mono, getPath({filename, size, prefix: "med"}));
    await saveImageDataWithSharp(d_hash.mono, getPath({filename, size, prefix: "dif"}));
    await saveImageDataWithSharp(b_hash.mono, getPath({filename, size, prefix: "blk"}));
}

function getPath({filename, prefix, size}: {filename: string; prefix: string; size: number;}) {
    return path.join(dirPath,`${size}-${path.basename(filename)}-${prefix}.png`);
}
