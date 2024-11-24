export type ImageDataLike = {
    data:   Uint8ClampedArray
    width:  number
    height: number
};

export type GrayScalerGetter = (dw: DataView) => (i: number) => number;
