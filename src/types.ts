import {GrayImageData} from "./mono-image-data.js";
import {ImageHash} from "./image-hash.js";

export type ImageDataLike = {
    data:   Uint8ClampedArray
    width:  number
    height: number
    colorSpace: "srgb" | "display-p3"
};
export type ImageDataLikeEx = {
    data:   Uint8ClampedArray | Uint8Array
    width:  number
    height: number
    channels?: 4 | 1 | 2 | 3
};
export type GrayScalerGetter = (dw: DataView) => (i: number) => number;


export type Round = "round" | "trunc" | "ceil" | "floor";

export type ScaleOpts = {
    median?: boolean
    ignore?: boolean
    round?:  Round
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
    // todo?: pass `imageData: grayImageData`
};
export type Hasher = (imageData: ImageDataLike, opts?: HashOpts) => ImageHash;
