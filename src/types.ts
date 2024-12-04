import {BiImageData, GrayImageData} from "./mono-image-data.js";
import {ImageHash} from "./image-hash.js";

export type ImageDataLike = {
    data:   Uint8ClampedArray
    width:  number
    height: number
 // colorSpace: "srgb" // todo?: add it
};
export type ImageDataLikeEx = {
    data:   Uint8ClampedArray | Uint8Array
    width:  number
    height: number
    channels?: 4 | 1 | 2 | 3
};
export type GrayScalerGetter = (dw: DataView) => (i: number) => number;


export type ScaleOpts = {
    median?: boolean
    ignore?: boolean
} & ({
    width?:  number
    height?: number
    size?:   void
} | {
    width?:  void
    height?: void
    size?:   number
});

export type GrayScalingType = "bt601" | "average" | "bt709";
export type GrayScalingOpt = GrayScalingType | GrayScalerGetter;

export type HashOpts = ScaleOpts & {
    grayData?:       GrayImageData
    grayDataScaled?: GrayImageData
    grayScaler?:     GrayScalingOpt
    classic?: boolean
};
export type Hasher     = (imageData: ImageDataLike, opts?: HashOpts) => ImageHash;
export type HasherCore = (grayImageData: GrayImageData) => BiImageData;
