import {ANSI_BLUE, report, t} from "../tester.ts";
import {scaleDownLinearAverage} from "@/resize.ts";
import {GrayImageData}          from "@/mono-image-data.ts";


console.log(ANSI_BLUE("--- Test 8 - PIL box down-sampling compare ---"));

/*
from PIL import Image

pixel_values = [255, 0, 255, 0]
image = Image.new("L", (len(pixel_values), 1))
image.putdata(pixel_values)
image = image.resize((3, 1), Image.Resampling.BOX)
# noinspection PyTypeChecker
print(",".join(map(str, image.getdata())))
# image.save("output_image.png")
# image.show()
*/

{
    const data = [255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "255,128,0"
    });
}
{
    const data = [255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "ceil");
    t({
        result: ui8a.toString(),
        expect: "128,255,0",
    });
}
{
    const data = [255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "floor");
    t({
        result: ui8a.toString(),
        expect: "255,0,128",
    });
}
{
    const data = [255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "trunc");
    t({
        result: ui8a.toString(),
        expect: "255,0,128",
    });
}

{
    const data = [255, 0, 255, 0, 255];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,255,128"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,128,128"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,170,128"
    });
}
{
    const data = [255, 0, 255, 0, 255];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "255,128,0,255"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,255,128,0"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,128,255,128"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,128,128,128"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255, 0, 255];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,170,128,128"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "170,128,85,128"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "170,85,170,85"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "170,128,85,170"
    });
}

{
    const data = [255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,170,128,85"
    });
}

{
    const data = [255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,128,170,128"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,128,128,128"
    });
}
{
    const data = [255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "128,153,128,128"
    });
}
// 4
{
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "0,26,0,0",
        name: ui8a.toString() + " (PIL result is 0,25,0,0)" // !!!
    });
}
{
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "0,23,0,23"
    });
}
{
    const data = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "23,23,0,23"
    });
}
{
    const data = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,255,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 4, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "23,21,0,46"
    });
}
// 3
{
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "0,18,0"
    });
}
{
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "0,17,18"
    });
}
{
    const data = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "17,18,17"
    });
}
{
    const data = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,255,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 3, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "17,17,34"
    });
}
// 5
{
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 5, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "0,28,0,0,0"
    });
}
{
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 5, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "0,32,0,0,28"
    });
}
{
    const data = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 5, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "28,28,0,0,28"
    });
}
{
    const data = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,255,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 5, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "28,28,0,0,57"
    });
}
// 6
{
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 6, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "0,0,36,0,0,0"
    });
}
{
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 6, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "0,0,32,0,0,36"
    });
}
{
    const data = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 6, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "36,0,36,0,0,36"
    });
}
{
    const data = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,255,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 6, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "32,0,32,0,0,73"
    });
}
//
{
    const data = [0,0,0,0,255,0,0,0,0,0];
    const ui8a = scaleDownLinearAverage(new GrayImageData(new Uint8Array(data), data.length, 1), 1, 1, "round");
    t({
        result: ui8a.toString(),
        expect: "26",
        name: ui8a.toString() + " (PIL result is 25)"
    });
}
//

report();
