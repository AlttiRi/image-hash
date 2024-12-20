import {Files, getImageData} from "./constants.ts";
import {dHash, ImageHash} from "../index.ts";

// Supports any hash size

const imageData = await getImageData(Files._11_kittens);

console.log(dHash(imageData, {size: 8}).hex);             // e020acce864cae8a
console.log(dHash(imageData, {size: 7}).hex);             // 01c08748c3a74e
console.log(dHash(imageData, {width: 7, height: 6}).hex); // 018108d1a746
console.log(dHash(imageData, {width: 6, height: 6}).hex); // 06189e6986
console.log(ImageHash.fromHex("06189e6986", 6, 6).hex);   // 06189e6986

console.log();

console.log(ImageHash.fromHex("1122334455", 6, 6).hex);   // 0122334455
console.log(ImageHash.fromHex("0122334455", 6, 6).hex);   // 0122334455
console.log(ImageHash.fromHex( "122334455", 6, 6).hex);   // 0122334455

console.log();

console.log(dHash(imageData, {size: 3}).bin);             // 0000000110001010
console.log(dHash(imageData, {size: 2}).bin);             // 00001001
console.log(dHash(imageData, {width: 2, height: 1}).bin); // 00000001
console.log(dHash(imageData, {width: 1, height: 2}).bin); // 00000011
console.log(dHash(imageData, {size: 1}).bin);             // 00000001
