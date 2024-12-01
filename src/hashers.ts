import {ImageHash} from "./image-hash.js";
import {BiImageData, GrayImageData} from "./mono-image-data.js";
import {Hasher, HasherCore, HashOpts, ImageDataLike} from "./types.js";
import {getCalculateAverage, getCalculateBT601, getGrayData} from "./grayscale.js";
import {scaleDownLinear, scaleUpNearestNeighbor} from "./resize.js";
import {aHashCore, bHashCore, dHashCore, mHashCore} from "./hashers-core.js";


type HashOptsPrivate = {
    scaleWidth?:  number
    scaleHeight?: number
};

const defaultSize = 8;

/** difference hash */
export const dHash: Hasher = (imageData: ImageDataLike, opts: HashOpts = {}) => {
    const width = opts.width || opts.size || defaultSize;
    return hash(dHashCore, imageData, {...opts, scaleWidth: width + 1});
};

/** average hash */
export const aHash: Hasher = (imageData: ImageDataLike, opts?: HashOpts) => hash(aHashCore, imageData, opts);

/** median hash */
export const mHash: Hasher = (imageData: ImageDataLike, opts?: HashOpts) => hash(mHashCore, imageData, opts);

/** block hash (uses "BT601" for gray-scaling, and uses horizontal bands with 2 pixels height.) */
export const bHash: Hasher = (imageData: ImageDataLike, opts?: HashOpts) => hash(bHashCore, imageData, opts);

/** block hash "original-like" (uses "average" for gray-scaling, and uses 4 horizontal bands total) */
export const bHashClassic: Hasher = (imageData: ImageDataLike, opts: HashOpts = {}) => {
    opts.grayScaler = getCalculateAverage;
    const bHashCoreWrapped = (gid: GrayImageData) => bHashCore(gid, /* bandCount */ 4);
    return hash(bHashCoreWrapped, imageData, opts);
};

/**
 * When the input is lower than 8x8 (9x8) it uses a simple integer upscaler.
 * @see `scaleUpIntegerTwice`
 */
function hash(hash: HasherCore, imageData: ImageDataLike, opts: HashOpts & HashOptsPrivate = {}): ImageHash {
    const hashWidth  = opts.size || opts.width  || defaultSize;
    const hashHeight = opts.size || opts.height || defaultSize;
    let scaleWidth  = opts.scaleWidth  || hashWidth;
    let scaleHeight = opts.scaleHeight || hashHeight;
    let grayScaler  = opts.grayScaler || getCalculateBT601;

    const upScale: boolean = imageData.width < scaleWidth || imageData.height < scaleHeight;
    let origScales;
    if (upScale) {
        origScales = {scaleWidth, scaleHeight};
        scaleWidth  = imageData.width;
        scaleHeight = imageData.height;
    }

    let grayData:       GrayImageData;
    let grayDataScaled: GrayImageData;
    let ready = false;

    if ("grayDataScaled" in opts) {
        grayDataScaled = opts.grayDataScaled!; // ts! // wtf is wrong with ts?
        if (grayDataScaled.width === scaleWidth && grayDataScaled.height === scaleHeight) {
            ready = true;
        } else {
            if (!opts.ignore) {
                throw new Error("Wrong grayDataScaled input");
            }
        }
    }
    if (!ready) {
        if ("grayData" in opts) {
            const _grayData = opts.grayData!; // ts!
            if (_grayData.height !== imageData.height || _grayData.width !== imageData.width) {
                if (!opts.ignore) {
                    throw new Error("Wrong grayData input");
                }
                grayData = getGrayData(imageData, grayScaler);
            } else {
                grayData = _grayData;
            }
        } else {
            grayData = getGrayData(imageData, grayScaler);
            // console.log("getGrayData..."); // todo: add tests and delete
        }
        grayDataScaled = scaleDownLinear(grayData, {
            width:  scaleWidth,
            height: scaleHeight,
            median: opts.median,
            ignore: opts.ignore,
        });
        // console.log("scaleDownLinear...");
    }

    const biImageData = hash(grayDataScaled!); // ts! // stupid af
    if (upScale && origScales) {
        const {scaleWidth, scaleHeight} = origScales;
        const hashUpScaled: BiImageData = scaleUpNearestNeighbor(biImageData, scaleWidth, scaleHeight);
        return ImageHash.fromMono(hashUpScaled);
    }
    return ImageHash.fromMono(biImageData);
}
