import {getImageData} from "./constants.ts";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";

// --- from readme --- //

{
    const imagePath = "alyson_hannigan_500x500.jpg";
    const imageData = await getImageData(imagePath);
    const hash = dHash(imageData);
    console.log(hash.hex); // "8f94b43434245452"
}

console.log();

{
    const hash1 = dHash(await getImageData("kittens-3264x2448.jpg"));
    const hash2 = dHash(await getImageData("kittens-960x720.jpg"));

    console.log(hash1.hex); // "e020acce864cae8a"
    console.log(hash2.hex); // "e020acce864cae8a"
    console.log(hash1.diff(hash2)); // 0
}
