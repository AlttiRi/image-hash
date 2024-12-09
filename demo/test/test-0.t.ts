import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {t, report, ANSI_BLUE} from "../tester.ts";
import {Files, getImageData} from "../constants.ts";
import {ImageHash} from "@/image-hash.ts";



console.log(ANSI_BLUE("--- Test 0 - Tests for demo 1 ---"));

const imageData = await getImageData("kittens-3264x2448.jpg");

t({
    result: aHash(imageData).hex,
    expect: "000000004286fefe"
});
t({
    result: mHash(imageData).hex,
    expect: "00980e634287fffe"
});
t({
    result: bHash(imageData).hex,
    expect: "3c9c1e63c38746e6"
});
t({
    result: dHash(imageData).hex,
    expect: "f020acce864cae8a"
});

t({
    result: mHash(imageData, {classic: true}).hex,
    expect: "00980e634287fffe"
});
t({
    result: dHash(imageData, {classic: true}).hex,
    expect: "f020acce864cae8a"
});


console.log(ANSI_BLUE("--- Test 0 - Tests for demo 5 ---"));

{

    const imageData = await getImageData(Files._11_kittens);
    t({
        result: dHash(imageData, {size: 8}).hex,
        expect: "f020acce864cae8a",
    });
    t({
        result: dHash(imageData, {size: 7}).hex,
        expect: "01c08748c3a74e",
    });
    t({
        result: dHash(imageData, {width: 7, height: 6}).hex,
        expect: "018108d1a746",
    });
    t({
        result: dHash(imageData, {width: 6, height: 6}).hex,
        expect: "06189e6986",
    });
    t({
        result: ImageHash.fromHex("06189e6986", 6, 6).hex,
        expect: "06189e6986",
    });

    t({
        result: ImageHash.fromHex("1122334455", 6, 6).hex,
        expect: "0122334455",
    });
    t({
        result: ImageHash.fromHex("0122334455", 6, 6).hex,
        expect: "0122334455",
    });
    t({
        result: ImageHash.fromHex( "122334455", 6, 6).hex,
        expect: "0122334455",
    });

    t({
        result: dHash(imageData, {size: 3}).bin,
        expect: "0000000110001010",
    });
    t({
        result: dHash(imageData, {size: 2}).bin,
        expect: "00001001",
    });
    t({
        result: dHash(imageData, {width: 2, height: 1}).bin,
        expect: "00000001",
    });
    t({
        result: dHash(imageData, {width: 1, height: 2}).bin,
        expect: "00000010",
    });
    t({
        result: dHash(imageData, {size: 1}).bin,
        expect: "00000001",
    });
}

report();
