import {getImageDataFromFS} from "./util.demo.js";
import {aHash, bHash, dHash, mHash} from "@/hashers.ts";


const iData = await getImageDataFromFS("./img/kittens-3264x2448.jpg");

console.log(aHash(iData).hex); // 000000004286fefe
console.log(mHash(iData).hex); // 00981e634287fffe
console.log(bHash(iData).hex); // 3c9c1e63c38746e6
console.log(dHash(iData).hex); // e020acce864cae8a
