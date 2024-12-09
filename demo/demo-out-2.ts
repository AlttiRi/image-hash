import {bmvbhash} from "blockhash-core";
import fs from "node:fs/promises";
import path from "node:path";
import {Files, getImageData} from "./constants.ts";
import {saveImageData} from "./util.demo.ts";
import {bHash} from "@/hashers.ts";
import {ImageHash} from "@/image-hash.ts";
import {scaleUpNearestNeighbor} from "@/resize.ts";
import {BiImageData} from "@/mono-image-data.ts";

const dirPath = "./demo-img-out/demo-2";
await fs.mkdir(dirPath, {recursive: true});

// feel free to edit //
const size = 502; // 512 // 120 // 8

// For example these images contain visual artifacts:
// "480-screenshot-dark-purple-flower-1353x851-reverse.png-1-blk-orig.png"
// "496-grey-dark-bg-2-600x600.png-1-blk-orig.png"
// "304-grey-dark-bg-600x600.png-1-blk-orig.png"
// "328-grey-dark-bg-600x600.png-1-blk-orig.png"

for (const filename of Object.values(Files)) {
    const imageData = await getImageData(filename);

    const sourceSize = size;
    let _size = size;
    if (imageData.width < _size) {  // "blockhash-core" does not support up-scaling
        _size = imageData.width;
    }
    if (imageData.height < _size) {
        _size = imageData.height;
    }
    if (_size % 8) { // "blockhash-core" returns incorrect data (with "NaN" in the hex string) when `size % 8 !== 0`
        _size = _size - (_size % 8);
    }

    {
        const size = _size;

        let upsize = (bid: BiImageData) => bid;
        if (size < sourceSize) {
            upsize = (bid: BiImageData) => scaleUpNearestNeighbor(bid, sourceSize, sourceSize, true);
        }

        // "original" from the original "blockhash-js"/"blockhash-core" library
        const b_hash_1_str = bmvbhash(imageData, size);
        const b_hash_1 = ImageHash.fromHex(b_hash_1_str);
        // "classic" alt-image-hash library with average gray-scaling (without rounding) and with 4 horizontal bands
        const b_hash_2 = bHash(imageData, {size, classic: true});
        // "default" alt-image-hash library
        const b_hash_3 = bHash(imageData, {size});

        void saveImageData(upsize(b_hash_1.getMono()), getPath({filename, size, prefix: "1-blk-orig"}));
        void saveImageData(upsize(b_hash_2.getMono()), getPath({filename, size, prefix: "2-blk-clas"}));
        void saveImageData(upsize(b_hash_3.getMono()), getPath({filename, size, prefix: "3-blk-deft"}));
    }
}

function getPath({filename, prefix, size}: {filename: string; prefix: string; size: number;}) {
    return path.join(dirPath,`${size}-${path.basename(filename)}-${prefix}.png`);
}
