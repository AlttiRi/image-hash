import {ANSI_BLUE, t} from "../../test/tester.ts";
import {ImageHash} from "@/image-hash.ts";
import {dHash} from "@/hashers.ts";
import {getImageDataFromFS} from "../util.demo.ts";
import path from "node:path";
import {getCalculateAverage, getCalculateBT601, getCalculateBT709} from "@/grayscale.ts";
function resolve(...strs: string[]) {
    return path.resolve(import.meta.dirname, ...strs);
}

console.log(ANSI_BLUE("--- Tests `grayScaler`s ---"));

const iData = await getImageDataFromFS(resolve(`../img/wallpaper-dark-purple-2560x1600.jpg`));
const hex1_c4e4f05879797e3e = "c4e4f05879797e3e";
const hex2_c4e4f15879797e3e = "c4e4f15879797e3e";
const hex3_c4e4f05879793e3a = "c4e4f05879793e3a";

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
        expect: hex2_c4e4f15879797e3e,
    });
    t({
        result: hash.diff(ImageHash.fromHex(hex1_c4e4f05879797e3e)),
        expect: 1,
    });
}

{
    const hash = dHash(iData, {grayScaler: getCalculateBT709});
    t({
        result: hash.hex,
        expect: hex3_c4e4f05879793e3a,
    });
    t({
        result: hash.diff(ImageHash.fromHex(hex1_c4e4f05879797e3e)),
        expect: 2,
    });
    t({
        result: hash.diff(ImageHash.fromHex(hex2_c4e4f15879797e3e)),
        expect: 3,
    });
}
