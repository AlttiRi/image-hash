import {ANSI_BLUE, t} from "../tester.ts";
import {binaryToUi8a, hexToUi8a, MonoImageData} from "@/util.ts";


console.log(ANSI_BLUE("--- MonoImageData (extra) ---"));
// todo: seems it's always % 8... need to use the size
{
    const x = hexToUi8a("0xFF");
    const b = binaryToUi8a("0b1111_1111");
    // console.log({x, b}); // { x: Uint8Array(1) [ 255 ], b: Uint8Array(1) [ 255 ] }
    t({
        result: x[0] === 255,
        expect: true,
    });
    t({
        result: x.toString() === b.toString(),
        expect: true,
    });
}
{
    const mid = new MonoImageData(new Uint8Array([255,255,255,255, 255,255,255,255]));
    t({
        result: mid.data.toString(),
        expect: "255,255,255,255,255,255,255,255",
    });
    t({
        result: mid.width,
        expect: 0,
    });
    t({
        result: mid.height,
        expect: 0,
    });
}
{
    const mid = new MonoImageData(hexToUi8a("FFFF FFFF FFFF FFFF"));
    t({
        result: mid.data.toString(),
        expect: "255,255,255,255,255,255,255,255",
    });
    t({
        result: mid.width,
        expect: 0,
    });
    t({
        result: mid.height,
        expect: 0,
    });
}



console.log(ANSI_BLUE("--- MonoImageData ---"));

{
    const mid = new MonoImageData(new Uint8Array([255, 255, 255, 255]));
    t({
        result: mid.data.toString(),
        expect: "255,255,255,255",
    });
    t({
        result: mid.width,
        expect: 2,
    });
    t({
        result: mid.height,
        expect: 2,
    });
}
{
    const mid = new MonoImageData(new Uint8Array([0, 1, 2, 3]));
    t({
        result: mid.data.toString(),
        expect: "0,1,2,3",
    });
    t({
        result: mid.width,
        expect: 2,
    });
    t({
        result: mid.height,
        expect: 2,
    });
}
{
    const mid = new MonoImageData(new Uint8Array([0, 1, 2, 3,  4]));
    t({
        result: mid.data.toString(),
        expect: "0,1,2,3,4",
    });
    t({
        result: mid.width,
        expect: 0,
    });
    t({
        result: mid.height,
        expect: 0,
    });
}
{
    const mid = new MonoImageData(new Uint8Array([1,2,3,4, 5,6]));
    t({
        result: mid.data.toString(),
        expect: "1,2,3,4,5,6",
    });
    t({
        result: mid.width,
        expect: 3,
    });
    t({
        result: mid.height,
        expect: 2,
    });
}
{
    const mid = new MonoImageData(new Uint8Array([
        128, 128, 3, 4,
        5,   255, 0, 8,  9,
    ]));
    t({
        result: mid.data.toString(),
        expect: "128,128,3,4,5,255,0,8,9",
    });
    t({
        result: mid.width,
        expect: 3,
    });
    t({
        result: mid.height,
        expect: 3,
    });
}
{
    const mid = new MonoImageData(new Uint8Array([1,2]));
    t({
        result: mid.data.toString(),
        expect: "1,2",
    });
    t({
        result: mid.width,
        expect: 2,
    });
    t({
        result: mid.height,
        expect: 1,
    });
}
{
    const mid = new MonoImageData(new Uint8Array([1, 2, 3, 4]));
    t({
        result: mid.data.toString(),
        expect: "1,2,3,4",
    });
    t({
        result: mid.width,
        expect: 2,
    });
    t({
        result: mid.height,
        expect: 2,
    });
}

