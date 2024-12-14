import {getImageDataWithSharp as _getImageData} from "@alttiri/get-image-data";
import {
    getGrayData, scaleDownLinear, scaleUpNearestNeighbor,
    aHash, bHash, dHash, mHash,
    ImageHash, BiImageData,
    Hasher, HashOpts, ImageDataLike,
} from "../index.ts";

const getImageData = (imgName: string) => _getImageData("./img/" + imgName);


// --- from readme --- //

// import {getImageDataWithSharp as getImageData} from "@alttiri/get-image-data";
// import {dHash} from "@alttiri/image-hash";

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
