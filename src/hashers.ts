import {ImageHash} from "./image-hash.js";
import {BiImageData, GrayImageData} from "./mono-image-data.js";
import {GrayScalerGetter, ImageDataLike} from "./types.js";
import {getGrayData} from "./grayscale.js";
import {scaleDownLinear, scaleUpNearestNeighbor} from "./resize.js";
import {aHashCore, bHashCore, dHashCore, mHashCore} from "./hashers-core.js";

type HashOpts = {
    width?:  number
    height?: number
    grayData?: GrayImageData
    grayDataScaled?: GrayImageData
    ignore?: boolean
 // grayScaler?: GrayScalerGetter // todo: use it
};
type HashOptsPrivate = {
    scaleWidth?:  number
    scaleHeight?: number
}
type Hasher     = (imageData: ImageDataLike, opts?: HashOpts) => ImageHash;
type HasherCore = (grayImageData: GrayImageData) => BiImageData;

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

/**
 * When the input is lower than 8x8 (9x8) it uses a simple integer upscaler.
 * @see `scaleUpIntegerTwice`
 */
function hash(hash: HasherCore, imageData: ImageDataLike, opts: HashOpts & HashOptsPrivate = {}): ImageHash {
    const hashWidth  = opts.width  || defaultSize;
    const hashHeight = opts.height || defaultSize;
    let scaleWidth  = opts.scaleWidth  || hashWidth;
    let scaleHeight = opts.scaleHeight || hashHeight;

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
                grayData = getGrayData(imageData);
            } else {
                grayData = _grayData;
            }
        } else {
            grayData = getGrayData(imageData);
            // console.log("getGrayData..."); // todo: add tests and delete
        }
        grayDataScaled = scaleDownLinear(grayData, {...opts, width: scaleWidth, height: scaleHeight});
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
