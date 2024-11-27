export type ImageDataLike = {
    data:   Uint8ClampedArray
    width:  number
    height: number
};
export type ImageDataLikeEx = {
    data:   Uint8ClampedArray | Uint8Array
    width:  number
    height: number,
    channels?: 4 | 1 | 2 | 3,
};
export type GrayScalerGetter = (dw: DataView) => (i: number) => number;
