# vue-tinybox

<img src="https://raw.githubusercontent.com/googlefonts/noto-emoji/master/png/128/emoji_u1f30c.png" align="right" alt="Milky Way emoji" width="96" height="96">

A slick, yet tiny lightbox gallery for Vue 3.

- **Slick.** No excessive design. Pictures, thumbnails, controls.
- **Tiny.** Dependency-free. 3 KB minified and gzipped.
- **Adaptive.** Works on computers. Works on tablets. Works on phones.

## Demo

Observe the live demo here: [os.kytta.dev/vue-tinybox](https://os.kytta.dev/vue-tinybox)

## Basic usage

```html
<TinyboxGallery v-model:index="index" :images="images" loop no-thumbs />
```

## Install

- **In modern browsers**, you can import Tinybox from a CDN URL along with the
  Vue import:

  ```html
  <script type="module">
  	import { createApp } from "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js";
  	import TinyboxGallery from "https://cdn.jsdelivr.net/npm/vue-tinybox@2/dist/vue-tinybox.js";

  	// ...
  </script>
  ```

  You'll also need the CSS file:

  ```html
  <link
  	href="https://cdn.jsdelivr.net/npm/vue-tinybox@2/dist/vue-tinybox.css"
  	rel="stylesheet"
  />
  ```

- **In Node**, install the `vue-tinybox` package:

  ```sh
   pnpm add vue-tinybox
  ```

  ```sh
  npm install vue-tinybox
  ```

  ```sh
  yarn add vue-tinybox
  ```

  ...and then import Tinybox like you usually would:

  ```js
  import TinyboxGallery from "vue-tinybox";
  import "vue-tinybox/css";
  // or const TinyboxGallery = require("vue-tinybox");
  ```

After you have imported Tinybox, you can bind it to your application instance
like you usually do:

```js
const app = createApp({
	components: {
		TinyboxGallery,
	},
});

// or app.component("TinyboxGallery", TinyboxGallery);

// or app.use(TinyboxGallery);
```

<details>
<summary>For older browsers</summary>

If you need to use the component in a browser without ESM support, include the
IIFE version:

```html
<link
	href="https://cdn.jsdelivr.net/npm/vue-tinybox@2/dist/vue-tinybox.css"
	rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/vue-tinybox@2/dist/vue-tinybox.iife.js"></script>
```

This exposes the `TinyboxGallery` component in the global scope. Include it in your app:

```html
<script>
	app = createApp({
		// ...
	});

	app.component("TinyboxGallery", TinyboxGallery);
</script>
```

</details>

## API

### Image object

An `Image` object is an object with following fields:

| Field name  | Type     | Description                                                      |
| ----------- | -------- | ---------------------------------------------------------------- |
| `src`       | `String` | Image URL                                                        |
| `thumbnail` | `String` | (optional) Thumbnail URL. If omitted, the image URL will be used |
| `caption`   | `String` | (optional) Caption text to be overlayed on the image             |
| `alt`       | `String` | (optional) Alt text. If omitted, the caption will be used        |

### Props

| Prop name   | Type      | Default | Description                                                   |
| ----------- | --------- | ------- | ------------------------------------------------------------- |
| `images`    | `Array`   | `[]`    | List of either image URLs or [`Image`](#image-object) objects |
| `loop`      | `Boolean` | `false` | Indicates whether the images should loop                      |
| `no-thumbs` | `Boolean` | `false` | When enabled, the thumbnails are hidden                       |

### `v-model`

You can use `v-model` on a `Number` variable, which will hold the index of the
image currently open. If no image is open (i.e. Tinybox is closed), the value
becomes `null`.

Instead of `v-model` you can use the `index` prop and `change` event:

```html
<TinyboxGallery v-model:index="index" :images="images" />

<!-- is equivalent to -->

<TinyboxGallery
	:images="images"
	:index="index"
	@update:index="(i) => {index = i}"
/>
```

### Events

| Event name    | Payload                                  | Description                                                                                |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| `change`      | index of the image changed to            | Is emitted on any image change (thumbnail navigation, prev/next, close)                    |
| `prev`/`next` | index of the image changed to            | Is emitted specifically when the user clicks "Prev"/"Next" or presses Left/Right arrow key |
| `close`       | index of the image Tinybox was closed at | Is emitted specifically when the user clicks "Close" or presses the Esc key                |

Events can come in handy for business logic cases:

```html
<TinyboxGallery
	:images="images"
	v-model:index="index"
	@update:index="onChange"
	@prev="onPrevious"
	@next="onNext"
	@close="onClose"
/>
```

```js
export default {
	// ...
	methods: {
		onChange(index) {
			console.log("User navigated to the photo: ", index);
		},
		onPrevious(index) {
			console.log("User clicked 'previous' to switch to: ", index);
		},
		onNext(index) {
			console.log("User clicked 'previous' to switch to: ", index);
		},
		onClose(index) {
			console.log("User closed TinyBox on this photo: ", index);
		},
	},
};
```

## Browser support

| ![Chrome][chrome] | ![Firefox][firefox] | ![Safari][safari] | ![Edge][edge] |
| :---------------: | :-----------------: | :---------------: | :-----------: |
|      **51+**      |       **28+**       |      **10+**      |    **16+**    |

[chrome]: https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png
[firefox]: https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png
[safari]: https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png
[edge]: https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png
