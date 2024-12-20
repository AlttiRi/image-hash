import path from "node:path";
import {getImageDataFromFS} from "./util.demo.ts";
import {ImageDataLike} from "@/types.ts";


export const Files = {
    _1_alyson:        "alyson_hannigan_500x500.jpg",
    _2_orthocanna:    "black-bg-orthocanna-500x500.jpg",
    _3_orthocanna_r:  "black-bg-orthocanna-500x500-reverse.jpg",
    _4_bridge:        "bridge-500x320.jpg",
    _5_grey_1:        "grey-dark-bg-600x600.png",
    _6_grey:          "grey-dark-bg-2-600x600.png",
    _7_grey_light:    "grey-light-bg-600x600.png",
    _8_grey_light_2:  "grey-light-bg-2-600x600.png",
    _9_imagehash:     "imagehash-1200x600.png",
    _10_imagehash_r:  "imagehash-1200x600-reverse.png",
    _11_kittens:      "kittens-3264x2448.jpg",
    _12_kittens_2:    "kittens-minicrop-3258x2448.jpg",
    _13_peppers:      "peppers-600x600.png",
    _14_peppers_2:    "peppers-minicrop-599x599.png",
    _15_rabbit:       "rabbit-320x192.png",
    _16_stephen:      "saint-stephen-150x200.png",
    _17_flower:       "screenshot-dark-purple-flower-1353x851.png",
    _18_flower_:      "screenshot-dark-purple-flower-1353x851-reverse.png",
    _19_dress:        "screenshot-magenta-dress-1898x946.png",
    _20_wallpaper:    "wallpaper-dark-purple-2560x1600.jpg",
    _21_wallpaper_2:  "wallpaper-dark-purple-2560x1600-reverse.jpg",
} as const;
export const FilesNew = {
    _22_kittens:      "kittens-160x120.jpg",
    _23_kittens:      "kittens-960x720.jpg",
    _24_heels:        "DR94LKg-1923x2533.jpg",
} as const;

function resolve(...strs: string[]) {
    return path.resolve(import.meta.dirname, ...strs);
}

const cache = new Map();
export type FilesArg1 = typeof Files[keyof typeof Files];
export type FilesArg2 = typeof FilesNew[keyof typeof FilesNew];
export type FilesArg = FilesArg1 | FilesArg2;
export async function getImageData(image: FilesArg): Promise<ImageDataLike> {
    let iData: ImageDataLike;
    if (cache.has(image)) {
        iData = cache.get(image);
    } else {
        iData = await getImageDataFromFS(resolve("./img", image));
        cache.set(image, iData);
    }
    return iData;
}
