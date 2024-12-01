import {ANSI_BLUE, t} from "../tester.ts";
import {_mHashCore} from "@/hashers-core.ts";


console.log(ANSI_BLUE("--- _mHashCore ---"));

{
    const data = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
    const w = 5;
    const h = 5;
    const result = _mHashCore(data, w, h).toString();
    t({
        result,
        expect: "0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255",
    });
    t({
        result: result,
        expect: "0,".repeat(13) + "255,".repeat(12).slice(0, -1),
    });
}
{
    const data = new Uint8Array([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,1,2,3,4]);
    const w = 5;
    const h = 5;
    const result = _mHashCore(data, w, h).toString();
    t({
        result,
        expect: "0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,0,0,0,0",
    });
}

{
    const data = new Uint8Array([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0]);
    const w = 5;
    const h = 5;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,0,0,0,0",
    });
    t({
        result: data.length,
        expect: 25,
    });
    t({
        result: hash.length,
        expect: 25,
    });
}

{
    const data = new Uint8Array([1,2,3,4,5,6,7,8,9]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,0,0,0,0,255,255,255,255",
    });
    t({
        result: data.length,
        expect: 9,
    });
    t({
        result: hash.length,
        expect: 9,
    });
}

{
    const data = new Uint8Array([0, 0,0,0,0, 0,0,0,0]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,0,0,0,0,0,0,0,0",
    });
}
{
    const data = new Uint8Array([1, 0,0,0,0, 0,0,0,0]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,0,0,0,0,0,0,0,0",
    });
}
{
    const data = new Uint8Array([0, 1,1,1,1, 1,1,1,1]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,0,0,0,0,0,0,0,0",
    });
}
{
    const data = new Uint8Array([2, 1,1,1,1, 1,1,1,1]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,0,0,0,0,0,0,0,0",
    });
}


{
    const data = new Uint8Array([255, 255,255,255,255, 255,255,255,255,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,255,255,255,255,255,255,255,255",
    });
}
{
    const data = new Uint8Array([255, 0,0,0,0, 0,0,0,0]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,0,0,0,0,0,0,0,0",
    });
}
{
    const data = new Uint8Array([0, 255,255,255,255, 255,255,255,255,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,255,255,255,255,255,255,255,255",
    });
}
{
    const data = new Uint8Array([255, 250,250,250,250, 250,250,250,250,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,255,255,255,255,255,255,255,255",
    });
}
{
    const data = new Uint8Array([245, 250,250,250,250, 250,250,250,250,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,255,255,255,255,255,255,255,255",
    });
}
{
    const data = new Uint8Array([0, 250,250,250,250, 250,250,250,250,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,255,255,255,255,255,255,255,255",
    });
}

{
    const data = new Uint8Array([127, 128,128,128,128, 128,128,128,128,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,255,255,255,255,255,255,255,255",
    });
}
{
    const data = new Uint8Array([128, 128,128,128,128, 128,128,128,128,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,255,255,255,255,255,255,255,255",
    });
}
{
    const data = new Uint8Array([129, 128,128,128,128, 128,128,128,128,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,255,255,255,255,255,255,255,255",
    });
}

{
    const data = new Uint8Array([255, 128,128,128,128, 128,128,128,128,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,255,255,255,255,255,255,255,255",
    });
}


{
    const data = new Uint8Array([126, 127,127,127,127, 127,127,127,127,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,0,0,0,0,0,0,0,0",
    });
}{
    const data = new Uint8Array([127, 127,127,127,127, 127,127,127,127,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,0,0,0,0,0,0,0,0",
    });
}
{
    const data = new Uint8Array([128, 127,127,127,127, 127,127,127,127,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "255,0,0,0,0,0,0,0,0",
    });
}
{
    const data = new Uint8Array([0, 127,127,127,127, 127,127,127,127,]);
    const w = 3;
    const h = 3;
    const hash = _mHashCore(data, w, h);
    t({
        result: hash.toString(),
        expect: "0,0,0,0,0,0,0,0,0",
    });
}
