import {getImageDataFromFS} from "./util.demo.js";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";


const imageData = await getImageDataFromFS("./img/kittens-3264x2448.jpg");

console.log(aHash(imageData).hex); // 000000004286fefe
console.log(mHash(imageData).hex); // 00980e634287fffe
console.log(bHash(imageData).hex); // 3c9c1e63c38746e6
console.log(dHash(imageData).hex); // f020acce864cae8a

console.log(mHash(imageData, {classic: true}).hex); // 00980e634287fffe
console.log(dHash(imageData, {classic: true}).hex); // f020acce864cae8a
