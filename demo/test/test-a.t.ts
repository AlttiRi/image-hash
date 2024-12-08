import {ANSI_BLUE, t} from "../tester.ts";
import {Files, getImageData} from "../constants.ts";
import {aHash} from "@/hashers.ts";
import {ImageHash} from "@/image-hash.ts";


console.log(ANSI_BLUE("--- Test 10 - Different hash sizes ---"));

{
    const size = 8;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {size});
    t({
        result: a_hash.hex,
        expect: "ffd7f58181c1ffff",
    });
    t({
        result: a_hash.hex.length,
        expect: 16,
    });
    t({
        result: ImageHash.fromHex(a_hash.hex).hex,
        expect: a_hash.hex,
    });
}
{
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width: 8, height: 7}).hex;
    t({
        result: a_hash,
        expect: "ffd7818181ffff",
    });
    t({
        result: a_hash.length,
        expect: 14,
    });
    t({
        result: ImageHash.fromHex(a_hash, 8, 7).hex,
        expect: a_hash,
    });
    t({
        result: ImageHash.fromHex(a_hash, 7, 8).hex, // well, it also works
        expect: a_hash,
    });
}
{
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width: 8 * 7, height: 1}).hex;
    t({
        result: a_hash,
        expect: "ff0004201402ff",
    });
    t({
        result: a_hash.length,
        expect: 14,
    });
    t({
        result: ImageHash.fromHex(a_hash, 8 * 7, 1).hex,
        expect: a_hash,
    });
    t({
        result: ImageHash.fromHex(a_hash, 7, 8).hex,
        expect: a_hash,
    });
    t({
        result: a_hash !== aHash(imageData, {width: 8, height: 7}).hex,
        expect: true,
    });
}
{
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash_1 = aHash(imageData, {width: 8 * 7, height: 1});
    const a_hash_2 = aHash(imageData, {width: 1, height: 8 * 7});
    t({
        result: a_hash_1.hex,
        expect: "ff0004201402ff",
    });
    t({
        result: a_hash_2.hex,
        expect: "ffefd80007ffff",
    });
    t({
        result: a_hash_1.diff(a_hash_2),
        expect: 23,
    });
    t({
        result: ImageHash.fromHex(a_hash_1.hex, 7, 8).hex,
        expect: a_hash_1.hex,
    });
    t({
        result: ImageHash.fromHex(a_hash_1.hex, 1, 7 * 8).hex,
        expect: a_hash_1.hex,
    });
    t({
        result: ImageHash.fromHex(a_hash_2.hex, 1, 7 * 8).hex,
        expect: a_hash_2.hex,
    });
}

{
    const size = 7;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {size}).hex;
    t({
        result: a_hash,
        expect: "01ff7c18307fff",
    });
    t({
        result: a_hash.length,
        expect: 14,
    });
    t({
        result: ImageHash.fromHex(a_hash, size, size).hex,
        expect: a_hash,
    });
}
{
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width: 7, height: 6}).hex;
    t({
        result: a_hash,
        expect: "03fc383077ff",
    });
    t({
        result: a_hash.length,
        expect: 12,
    });
    t({
        result: ImageHash.fromHex(a_hash, 7, 6).hex,
        expect: a_hash,
    });
}
{
    const size = 6;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {size}).hex;
    t({
        result: a_hash,
        expect: "0feb861dff",
    });
    t({
        result: a_hash.length,
        expect: 10,
    });
    t({
        result: ImageHash.fromHex(a_hash, size, size).hex,
        expect: a_hash,
    });
}
{
    const width = 6, height = 5;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "3fa61c7f",
    });
    t({
        result: a_hash.length,
        expect: 8,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 5, height = 5;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "01f8823f",
    });
    t({
        result: a_hash.length,
        expect: 8,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 5, height = 4;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "0fc61f",
    });
    t({
        result: a_hash.length,
        expect: 6,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 4, height = 4;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "f00f",
    });
    t({
        result: a_hash.length,
        expect: 4,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 4, height = 3;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "0f0f",
    });
    t({
        result: a_hash.length,
        expect: 4,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 4, height = 3;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "0f0f",
    });
    t({
        result: a_hash.length,
        expect: 4,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 3, height = 3;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "01c7",
    });
    t({
        result: a_hash.length,
        expect: 4,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 3, height = 2;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "2d",
    });
    t({
        result: a_hash.length,
        expect: 2,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 2, height = 2;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "0c",
    });
    t({
        result: a_hash.length,
        expect: 2,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}

{
    const width = 2, height = 1;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "00",
    });
    t({
        result: a_hash.length,
        expect: 2,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 1, height = 2;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "02",
    });
    t({
        result: a_hash.length,
        expect: 2,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}
{
    const width = 1, height = 1;
    const imageData = await getImageData(Files._9_imagehash);
    const a_hash = aHash(imageData, {width, height}).hex;
    t({
        result: a_hash,
        expect: "00",
    });
    t({
        result: a_hash.length,
        expect: 2,
    });
    t({
        result: ImageHash.fromHex(a_hash, width, height).hex,
        expect: a_hash,
    });
}

{
    t({
        result: ImageHash.fromHex("ff", 1, 1).hex,
        expect: "01",
    });
    t({
        result: ImageHash.fromHex("ff", 2, 1).hex,
        expect: "03",
    });
    t({
        result: ImageHash.fromHex("ff", 1, 2).hex,
        expect: "03",
    });
    t({
        result: ImageHash.fromHex("ff", 2, 2).hex,
        expect: "0f",
    });
    t({
        result: ImageHash.fromHex("ff", 2, 3).hex,
        expect: "3f",
    });
    t({
        result: ImageHash.fromHex("ffff", 3, 3).hex,
        expect: "01ff",
    });
    t({
        result: ImageHash.fromHex("ffff", 3, 4).hex,
        expect: "0fff",
    });
    t({
        result: ImageHash.fromHex("ffff", 4, 4).hex,
        expect: "ffff",
    });
}

{
    const imageData = await getImageData(Files._9_imagehash);
    t({
        result: (function() {
            try {
                const a_hash = aHash(imageData, {width: 0, height: 1}).hex;
            } catch {
                return "error";
            }
        })(),
        expect: "error",
    });
    t({
        result: (function() {
            try {
                const a_hash = aHash(imageData, {width: 1, height: 0}).hex;
            } catch {
                return "error";
            }
        })(),
        expect: "error",
    });
    t({
        result: (function() {
            try {
                const a_hash = aHash(imageData, {width: 0, height: 0}).hex;
            } catch {
                return "error";
            }
        })(),
        expect: "error",
    });
    t({
        result: (function() {
            try {
                const a_hash = aHash(imageData, {width: -1, height: 0}).hex;
            } catch {
                return "error";
            }
        })(),
        expect: "error",
    });
    t({
        result: (function() {
            try {
                const a_hash = aHash(imageData, {width: -1, height: -1}).hex;
            } catch {
                return "error";
            }
        })(),
        expect: "error",
    });
    t({
        result: (function() {
            try {
                const a_hash = aHash(imageData, {size: 0}).hex;
            } catch {
                return "error";
            }
        })(),
        expect: "error",
    });
    t({
        result: (function() {
            try {
                const a_hash = aHash(imageData, {size: -8}).hex;
            } catch {
                return "error";
            }
        })(),
        expect: "error",
    });
}
