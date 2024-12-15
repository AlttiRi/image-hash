# Alt-Image-Hash

Alternative JavaScript image hashing library.

```bash
npm i @alttiri/image-hash
```

The library to generate a perceptual hash for `ImageData` input.

Supported perceptual hashes:
- `dHash` (difference hash)
- `aHash` (average hash)
- `mHash` (median hash)
- `bHash` (block hash)

### Basic examples

```ts
import {dHash} from "@alttiri/image-hash";

const imagePath = "alyson_hannigan_500x500.jpg";
const imageData = await getImageData(imagePath);
const hash = dHash(imageData);
console.log(hash.hex); // "8f94b43434245452"
```

```ts
const hash1 = dHash(await getImageData("kittens-3264x2448.jpg"));
const hash2 = dHash(await getImageData("kittens-960x720.jpg"));

console.log(hash1.hex); // "e020acce864cae8a"
console.log(hash2.hex); // "e020acce864cae8a"
console.log(hash1.diff(hash2)); // 0
```

### How to get `ImageData`?

The reasonable question is how to get [`ImageData`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).

On Node.js I recommend to use [`sharp`](https://www.npmjs.com/package/sharp) library.
On browsers get `ImageData` with [`OffscreenCanvas`](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas).

It's only ~20 lines of code ([node](https://github.com/AlttiRi/get-image-data/blob/master/src/get-with-sharp.ts), [browser](https://github.com/AlttiRi/get-image-data/blob/master/src/get-with-canvas.ts)). 

But for convenience I created a library [`@alttiri/get-image-data`](https://www.npmjs.com/package/@alttiri/get-image-data):
```bash
npm i @alttiri/get-image-data
```
Also, for Node.js application do not forget to install `sharp` dependency:
```bash
npm i sharp
```

Then just import it:
- For a Node.js app:
    ```ts
    import {getImageDataWithSharp as getImageData} from "@alttiri/get-image-data";
    ```
- Fow a web app:
    ```ts
    import {getImageDataWithCanvas as getImageData} from "@alttiri/get-image-data";
    ```

---

### Full Node.js example

```bash
npm i @alttiri/image-hash @alttiri/get-image-data sharp
```
```ts
import {getImageDataWithSharp as getImageData} from "@alttiri/get-image-data";
import {dHash} from "@alttiri/image-hash";

const imagePath = "alyson_hannigan_500x500.jpg";
const imageData = await getImageData(imagePath);
const hash = dHash(imageData);
console.log(hash.hex); // "8f94b43434245452"
```

---
