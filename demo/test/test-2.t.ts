import path from "node:path";
import {ANSI_BLUE, report, t} from "../tester.ts";
import {getImageDataFromFS}   from "../util.demo.ts";
import {ImageHash} from "@/image-hash.ts";
import {dHash}     from "@/hashers.ts";
import {getCalculateAverage, getCalculateBT601, getCalculateBT709} from "@/grayscale.ts";
function resolve(...strs: string[]) {
    return path.resolve(import.meta.dirname, ...strs);
}

console.log(ANSI_BLUE("--- Test 1 - `grayScaler`s ---"));

const iData = await getImageDataFromFS(resolve(`../img/wallpaper-dark-purple-2560x1600.jpg`));
const hex1_c4e4f05879797e3e = "c4e4f05879797e3e";
const hex2_c4e4f05879797e3e = "c4e4f05879797e3e";
const hex3_c4e4f058b9797e3e = "c4e4f058b9797e3e";

{
    const hash = dHash(iData);
    t({
        result: hash.hex,
        expect: hex1_c4e4f05879797e3e,
    });
}
{
    const hash = dHash(iData, {grayScaler: getCalculateBT601});
    t({
        result: hash.hex,
        expect: hex1_c4e4f05879797e3e,
    });
}

{
    const hash = dHash(iData, {grayScaler: getCalculateAverage});
    t({
        result: hash.hex,
        expect: hex2_c4e4f05879797e3e,
    });
    t({
        result: hash.diff(ImageHash.fromHex(hex1_c4e4f05879797e3e)),
        expect: 0,
    });
}

{
    const hash = dHash(iData, {grayScaler: getCalculateBT709});
    t({
        result: hash.hex,
        expect: hex3_c4e4f058b9797e3e,
    });
    t({
        result: hash.diff(ImageHash.fromHex(hex1_c4e4f05879797e3e)),
        expect: 2,
    });
    t({
        result: hash.diff(ImageHash.fromHex(hex2_c4e4f05879797e3e)),
        expect: 2,
    });
}

report();
