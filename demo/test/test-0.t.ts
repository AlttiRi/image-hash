import {aHash, bHash, dHash, mHash} from "@/hashers.ts";
import {t, report, ANSI_BLUE} from "../tester.ts";
import {getImageData} from "../constants.ts";


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

report();
