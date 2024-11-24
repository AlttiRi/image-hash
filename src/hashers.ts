import {ImageHash} from "./image-hash.js";
import {BiImageData, GrayImageData} from "./mono-image-data.js";
import {GrayScalerGetter, ImageDataLike} from "./types.js";
import {getGrayData} from "./grayscale.js";
import {scaleDownLinear} from "./resize.js";
import {aHashCore, bHashCore, dHashCore, mHashCore} from "./hashers-core.js";

type HashOpts = {
    width?:  number
    height?: number
    median?: boolean
    grayData?: GrayImageData
    grayDataScaled?: GrayImageData
 // grayScaler?: GrayScalerGetter // todo: use it
};
type HashOptsPrivate = {
    scaleWidth?:  number
    scaleHeight?: number
}
type Hasher     = (imageData: ImageDataLike, opts?: HashOpts) => ImageHash;
type HasherCore = (grayImageData: GrayImageData) => Uint8Array;

const defaultSize = 8;

/** difference hash */
export const dHash: Hasher = (imageData: ImageDataLike, opts: HashOpts = {}) => {
    const {width = defaultSize} = opts;
    return hash(dHashCore, imageData, {...opts, scaleWidth: width + 1});
};

/** average hash */
export const aHash: Hasher = (imageData: ImageDataLike, opts?: HashOpts) => hash(aHashCore, imageData, opts);

/** median hash */
export const mHash: Hasher = (imageData: ImageDataLike, opts?: HashOpts) => hash(mHashCore, imageData, opts);

/** block hash */
export const bHash: Hasher = (imageData: ImageDataLike, opts?: HashOpts) => hash(bHashCore, imageData, opts);


function hash(hash: HasherCore, imageData: ImageDataLike, opts: HashOpts & HashOptsPrivate = {}): ImageHash {
    const {
        width  = defaultSize,
        height = defaultSize,
        scaleWidth  = (opts.width  || defaultSize),
        scaleHeight = (opts.height || defaultSize),
    } = opts;

    if (imageData.width < scaleWidth || imageData.height < scaleHeight) {
        // when the input is lower than 8x8 (9x8)
        // todo: add simple integer up-scaling
        throw new Error("Up-scaling is not supported");
    }

    let grayData:       GrayImageData;
    let grayDataScaled: GrayImageData;
    let ready = false;

    if ("grayDataScaled" in opts) {
        grayDataScaled = opts.grayDataScaled!; // ts! // wtf is wrong with ts?
        if (grayDataScaled.width === scaleWidth && grayDataScaled.height === scaleHeight) {
            ready = true;
        }
    }
    if (!ready) {
        if ("grayData" in opts) {
            grayData = opts.grayData!; // ts!
        } else {
            grayData = getGrayData(imageData);
        }
        grayDataScaled = scaleDownLinear(grayData, {...opts, width: scaleWidth, height: scaleHeight});
    }

    const hashRaw = hash(grayDataScaled!); // ts! // stupid af
    const biImageData = new BiImageData(hashRaw, width, height);
    return ImageHash.fromMono(biImageData);
}
