import path from "node:path";
import fs from "node:fs/promises";
import {getImageDataFromFS, saveImageData} from "./util.demo.ts";
import {getGrayData} from "@/grayscale.ts";
import {scaleDownLinear, scaleUpNearestNeighbor} from "@/resize.ts";


const dirPath = "./demo-img-out/demo-3";
await fs.mkdir(dirPath, {recursive: true});


const filename = "./img/extra/chess-10x10.png";
const iData = await getImageDataFromFS(filename);
const grayData = getGrayData(iData);
for (let size = 1; size < 10; size++) {
    const grayDataScaled = scaleDownLinear(grayData, {size});
    const to = size * (320 / size << 0);
    const upScaled = scaleUpNearestNeighbor(grayDataScaled, to, to);
    await saveImageData(upScaled, path.join(dirPath, `from-10x10-to-${size}x${size}.png`));
}

