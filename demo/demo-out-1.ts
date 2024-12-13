import path from "node:path";
import fs from "node:fs/promises";
import {saveImageData} from "./util.demo.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {Files, getImageData} from "./constants.ts";

const dirPath = "./demo-img-out/demo-1";
await fs.mkdir(dirPath, {recursive: true});

const size = 256;
for (const filename of Object.values(Files)) {

    const imageData = await getImageData(filename);
    const grayData       = getGrayData(imageData);
    const grayDataScaled = scaleDownLinear(grayData, {size, ignore: true});
    const a_hash = aHash(imageData, {size, grayData, grayDataScaled});
    const m_hash = mHash(imageData, {size, grayData, grayDataScaled});
    const d_hash = dHash(imageData, {size, grayData, grayDataScaled, ignore: true});
    const b_hash = bHash(imageData, {size, grayData, grayDataScaled});

    await saveImageData(a_hash.mono, getPath({filename, size, prefix: "avg"}));
    await saveImageData(m_hash.mono, getPath({filename, size, prefix: "med"}));
    await saveImageData(d_hash.mono, getPath({filename, size, prefix: "dif"}));
    await saveImageData(b_hash.mono, getPath({filename, size, prefix: "blk"}));
}

function getPath({filename, prefix, size}: {filename: string; prefix: string; size: number;}) {
    return path.join(dirPath,`${size}-${path.basename(filename)}-${prefix}.png`);
}
