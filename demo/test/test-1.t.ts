import {ANSI_BLUE, t} from "../../test/tester.ts";
import {readFileImageData} from "../util.ts";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {ImageHash} from "@/image-hash.ts";
import {getCalculateAverage, getGrayData} from "@/grayscale.ts";


console.log(ANSI_BLUE("--- Hash demos (hashes from articles) ---"));

// https://content-blockchain.org/research/testing-different-image-hash-functions/
{
    const iData = await readFileImageData("../img/kittens-3264x2448.jpg");

    // AVERAGE HASH
    {
        const hash = aHash(iData);
        t({
            result: hash.hex,
            expect: "000000004286fefe",
        });
        t({
            result: hash.bin,
            expect: "0000000000000000000000000000000001000010100001101111111011111110",
        });

        const averageBinFromSite = "0000000000010000000000000010000001000010100001101111111111111110";
        t({
            result: hash.diff(ImageHash.fromBin(averageBinFromSite)),
            expect: 3,
        });
        t({
            result: ImageHash.fromBin(averageBinFromSite).hex,
            expect: "001000204286fffe",
        });
    }
    // BLOCKHASH
    {
        const hash = bHash(iData);
        t({
            result: hash.hex,
            expect: "3c9c1e63c38746e6",
        });
        t({
            result: hash.bin,
            expect: "0011110010011100000111100110001111000011100001110100011011100110",
        });

        const blockBinFromSite = "0011100010011100000011100110001101000011100001110100001011100110";
        t({
            result: hash.diff(ImageHash.fromBin(blockBinFromSite)),
            expect: 4,
        });
        t({
            result: ImageHash.fromBin(blockBinFromSite).hex,
            expect: "389c0e63438742e6",
        });
    }
    // DIFFERENCE HASH
    {
        const hash = dHash(iData);
        t({
            result: hash.hex,
            expect: "e020acce864cae8a",
        });
        t({
            result: hash.bin,
            expect: "1110000000100000101011001100111010000110010011001010111010001010",
        });

        const differenceBinFromSite = "1111000000110000101110001100111010000110010011001000111010001110";
        t({
            result: hash.diff(ImageHash.fromBin(differenceBinFromSite)),
            expect: 6,
        });
        t({
            result: ImageHash.fromBin(differenceBinFromSite).hex,
            expect: "f030b8ce864c8e8e",
        });
    }
    // MEDIAN HASH
    {
        const hash = mHash(iData);
        t({
            result: hash.hex,
            expect: "00981e634287fffe",
        });
        t({
            result: hash.bin,
            expect: "0000000010011000000111100110001101000010100001111111111111111110",
        });

        const medianBinFromSite = "0000000010011100000011000110001101000010100001111111111111111111";
        t({
            result: hash.diff(ImageHash.fromBin(medianBinFromSite)),
            expect: 4,
        });
        t({
            result: ImageHash.fromBin(medianBinFromSite).hex,
            expect: "009c0c634287ffff",
        });
    }
}

// https://web.archive.org/web/20150809161817/https://www.safaribooksonline.com/blog/2013/11/26/image-hashing-with-python/
{
    const iData = await readFileImageData("../img/bridge-500x320.jpg");

    // Average Hash
    {
        const hash = aHash(iData);
        t({
            result: hash.hex,
            expect: "0001063c608ffffe",
        });
        const averageHexFromSite = "00010E3CE08FFFFE";
        t({
            result: hash.diff(ImageHash.fromHex(averageHexFromSite)),
            expect: 2,
        });
    }
}

// https://web.archive.org/web/20241119132106/https://www.hackerfactor.com/blog/index.php?/archives/529-Kind-of-Like-That.html
{
    const iData = await readFileImageData("../img/alyson_hannigan_500x500.jpg");

    {
        const hash = dHash(iData);
        t({
            result: hash.hex,
            expect: "8f94b43434245452",
        });
        const diffHexFromSite = "3a6c6565498da525";
        t({
            result: hash.diff(ImageHash.fromHex(diffHexFromSite)),
            expect: 38, // ??? // seems the article contains non-valid data
        });
    }
}

// https://github.com/jaehl/blockhash
{
    const iData = await readFileImageData("../img/rabbit-320x192.png");

    {
        const hash = bHash(iData);
        t({
            result: hash.hex,
            expect: "c78c8f8981e7fc04",
        });
        const blockhashHexFromSite = "c7c48f8989c77e0c";
        t({
            result: hash.diff(ImageHash.fromHex(blockhashHexFromSite)),
            expect: 7,
        });
    }
    {
        const grayData = getGrayData(iData, getCalculateAverage);
        const hash = bHash(iData, {grayData});
        t({
            result: hash.hex,
            expect: "c7c48f8989c77e0c",
        });
        const blockhashHexFromSite = "c7c48f8989c77e0c";
        t({
            result: hash.diff(ImageHash.fromHex(blockhashHexFromSite)),
            expect: 0,
            name: "blockhash + avg gray-scaling",
        });
    }
}

// https://github.com/commonsmachinery/blockhash-python/issues/4
{
    const iData = await readFileImageData("../img/orthocanna-500x500.jpg");
    {
        const hash = bHash(iData);
        t({
            result: hash.hex,
            expect: "1c1c1c1c1c181818",
            name: "blockhash (black)",
        });
        t({
            result: hash.bin,
            expect: `
            00011100
            00011100
            00011100
            00011100
            00011100
            00011000
            00011000
            00011000`.replaceAll(/\s+/g, ""),
        });
    }
    {
        const grayData = getGrayData(iData, getCalculateAverage);
        const hash = bHash(iData, {grayData});
        t({
            result: hash.hex,
            expect: "1c1c1c1c1c181818", // the same
        });
    }
}

// https://github.com/JohannesBuchner/imagehash/blob/master/tests/test_hash_is_constant.py
{
    const iData = await readFileImageData("../img/imagehash-1200x600.png");
    {
        const hash = aHash(iData);
        t({
            result: hash.hex,
            expect: "ffd7f58181c1ffff",
        });
        t({
            result: hash.diff(ImageHash.fromHex("ffd7918181c9ffff")),
            expect: 4,
            name: "from-site"
        });
    }
    {
        const hash = dHash(iData);
        t({
            result: hash.hex,
            expect: "002643332b15550c",
        });
        t({
            result: hash.diff(ImageHash.fromHex("0026273b2b19550e")),
            expect: 7,
            name: "from-site"
        });
    }

    {
        const hash = mHash(iData);
        t({
            result: hash.hex,
            expect: "ffd391818181a5e7",
        });
    }
    {
        const hash = bHash(iData);
        t({
            result: hash.hex,
            expect: "0000f58181cf85c7",
        });
    }
}
