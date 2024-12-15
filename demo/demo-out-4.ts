import fs     from "node:fs";
import path   from "node:path";
import crypto from "node:crypto";
import {getImageDataWithSharp} from "./util.demo.ts";
import {
    getGrayData, scaleDownLinear,
    aHash, bHash, dHash, mHash,
    Hasher, HashOpts, ImageDataLike,
} from "../index.ts";

const HashMaster = getHashMaster();
const hashMasters = [
    new HashMaster(aHash, "a"),                   // average
    new HashMaster(mHash, "m"),                   // median
    new HashMaster(mHash, "mc", {classic: true}), // median "classic"
    new HashMaster(bHash, "b"),                   // block
    new HashMaster(bHash, "bc", {classic: true}), // block "classic"
 // new HashMaster(bmvb,  "bo"),                  // block "original" // "blockhash-core" library
    new HashMaster(dHash, "d",  {ignore:  true}), // difference
];


let inputPath: string, size: number;
// --- program input parameters ---
inputPath =  "./img";
size = 8;
// ---


const copyOutPath = path.join(inputPath, `duplicates-${size}`);
await fs.promises.mkdir(copyOutPath, {recursive: true});

console.time("demo-4--find-same-hash-files");
let index = 0;
for (const dirent of fs.readdirSync(inputPath, {withFileTypes: true})) {
    if (!(dirent.name.endsWith(".jpg") || dirent.name.endsWith(".png"))) {
        continue;
    }
    index++;
    console.log(index, dirent.name);

    const imgPath = path.join(dirent.parentPath, dirent.name);
    const imageData = await getImageDataWithSharp(imgPath);

    const grayData = getGrayData(imageData);
    const grayDataScaled = scaleDownLinear(grayData, {size});

    for (const hashMaster of hashMasters) {
        hashMaster.hash({imageData, imgPath}, {size, grayData, grayDataScaled});
    }
}
console.timeEnd("demo-4--find-same-hash-files");

console.log();
const prefixDupCount:      Record<string, number> = {};
const prefixDupFilesCount: Record<string, number> = {};
console.log("total", index, "size", size);
for (const hashMaster of hashMasters) {
    prefixDupCount[hashMaster.name] = hashMaster.getDupCount();
    prefixDupFilesCount[hashMaster.name] = hashMaster.getDupFilesCount();
    console.log(
        hashMaster.name.padStart(2, " "),
        hashMaster.getUniqueCount().toString().padStart(3, " "),
    );
}

const m: Record<string, number> = {};
for (const [hash, files] of HashMaster.hashToFiles) {
    if (files.length === 1) {
        continue;
    }
    const prefix = hash.match(/[^_]+/)![0];
    if (!m[prefix]) {
        m[prefix] = 0;
    }
    m[prefix]++;
    const k = m[prefix].toString().padStart(3, "0");
    const prefixFolder = path.join(
        copyOutPath,
        prefix + "_" + prefixDupCount[prefix] + `_(${prefixDupFilesCount[prefix]})`
    );
    const hashStr = hash.length < 200 ? hash : prefix + "_" + crypto.createHash("sha1").update(hash).digest("hex");
    for (let i = 0; i < files.length; i++) {
        const imagePath = files[i];
        const ext = path.basename(imagePath).split(".").pop();
        await fs.promises.mkdir(prefixFolder, {recursive: true});
        try {
            await fs.promises.link(imagePath, path.join(prefixFolder, `${k}_(${i + 1}_of_${files.length})_${hashStr}.${ext}`));
        } catch (e) {
            console.log(ANSI_RED_BOLD((e as Error).message));
        }
    }
}


// ---

function getHashMaster() { // just for hoisting
    return class HashMaster {
        static hashToFiles = new Map<string, string[]>()
        private readonly hasher: Hasher;
        private extraOpts: { classic?: boolean, ignore?: boolean } = {};
        private readonly set: Set<string>;
        public  readonly name: string;
        public count = 0;
        hashMap = new Map<string, number>()
        constructor(hasher: Hasher, name: string, extraOpts: { classic?: boolean, ignore?: boolean } = {}) {
            this.hasher = hasher;
            this.name = name;
            this.set = new Set();
            this.extraOpts = extraOpts;
        }
        hash({imageData, imgPath}: {imageData: ImageDataLike, imgPath: string}, opts?: HashOpts) {
            const hex = this.hasher(imageData, {...opts, ...this.extraOpts}).hex;
            this.set.add(hex);
            const hash = this.name + "_" + hex;
            const files = HashMaster.hashToFiles.get(hash) || [];
            files.push(imgPath);
            HashMaster.hashToFiles.set(hash, files);
            this.count++;
            this.hashMap.set(hash, (this.hashMap.get(hash) || 0) + 1);
        }
        getUniqueCount() {
            return this.set.size;
        }
        getDupCount() {
            return [...this.hashMap.entries()].filter(([k, v]) => {
                return v > 1;
            }).length;
        }
        getDupFilesCount() {
            return [...this.hashMap.entries()].filter(([k, v]) => {
                return v > 1;
            }).flatMap(([k, v]) => v).reduce((a, b) => a + b, 0);
        }
    }
}

// ---
import {bmvbhash}      from "blockhash-core";
import {ANSI_RED_BOLD} from "@alttiri/util-node-js";
import {ImageHash}     from "../index.ts";
function bmvb(imageData: ImageDataLike, opts: HashOpts = {}) { // "Block Mean Value Based Image Perceptual Hashing"
    const size = opts.size || 8;
    const hash = bmvbhash(imageData, size);
    if (hash.includes("NaN")){ throw new Error("bmvb NaN"); } // when (size % 2 !== 0) // and not 1
    return ImageHash.fromHex(hash, size, size);
}
// ---
