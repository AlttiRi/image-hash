import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {Files, getImageData} from "./constants.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear} from "@/resize.ts";


for (const filename of Object.values(Files)) {
    const iData = await getImageData(filename);
    const grayData       = getGrayData(iData);
    const grayDataScaled = scaleDownLinear(grayData);
    let hash: string;

    // hash = aHash(iData, {grayData, grayDataScaled}).hex;
    // hash = mHash(iData, {grayData, grayDataScaled}).hex;
    // hash = dHash(iData, {grayData, grayDataScaled, ignore: true}).hex;
    // hash = bHash(iData, {grayData, grayDataScaled}).hex;
    hash = bHash(iData, {grayData, grayDataScaled, classic: true}).hex;
    // hash = mHash(iData, {grayData, grayDataScaled, classic: true}).hex;

    console.log(`"${filename}":${' '.repeat(36)} "${hash}",`);
}
