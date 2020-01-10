<h1>
    vue-tinybox
    <img src="https://raw.githubusercontent.com/googlefonts/noto-emoji/master/png/128/emoji_u1f30c.png"
         align="right"
         alt="Milky Way emoji"
         width="96"
         height="96">
</h1>

A slick, yet tiny lightbox gallery for Vue.js

- **Slick.** No excessive design. Pictures, thumbnails, controls.
- **Tiny.** Dependency-free. Less than 3 KB minified and gzipped.
- **Adaptive.** Works on computers. Works on tablets. Works on phones.

## Demo

Observe the live demo at https://os.karamoff.dev/vue-tinybox

## Basic usage

```html
<Tinybox
    v-model="index"
    :images="images"
    loop
    no-thumbs
/>
```

## Install

### Browsers

1. Include the link to Tinybox in `<head>` alongside Vue.js:

   ```html
   <script src="https://unpkg.com/vue"></script>
   <script src="https://unpkg.com/vue-tinybox"></script>
   ```

   You can of course use _jsDelivr_ instead of _unpkg_.
  
2. Tinybox will auto-install upon detecting the global Vue instance. You can use
   it right away.

### Node environment

1. Install the Tinybox package:

   ```sh
   npm install vue-tinybox
   # or
   yarn add vue-tinybox
   ```

2. Register it as you usually would:

   ```js
   import Tinybox from "vue-tinybox";
   // or
   const Tinybox = require('vue-tinybox');


   Vue.component('Tinybox', Tinybox);
   //or
   Vue.use(Tinybox);
   //or
   new Vue({
       components: { Tinybox },
       // ... 
   });
   ```

## API

### Image object

An `Image` object is an object with following fields:

| Field name  | Type     | Description                                                           |
|-------------|----------|-----------------------------------------------------------------------|
| `src`       | `String` | The image URL                                                         |
| `alt`       | `String` | (optional) the alt text                                               |
| `thumbnail` | `String` | (optional) The thumbnail (a smaller, square version of the image) URL |

### Props

| Prop name   | Type      | Default | Description                                                   |
|-------------|-----------|---------|---------------------------------------------------------------|
| `images`    | `Array`   | `[]`    | List of either image URLs or [`Image`](#image-object) objects |
| `loop`      | `Boolean` | `false` | Indicates whether the images should loop                      |
| `no-thumbs` | `Boolean` | `false` | When enabled, the thumbnails are hidden                       |

### `v-model`

You can use `v-model` on a `Number` variable, which will hold the index of the
image currently open. If no image is open (i.e. Tinybox is closed), the value
becomes `null`.

Instead of `v-model` you can use the `index` prop and `change` event:

```html
<Tinybox
    v-model="index"
    :images="images"
/>

<!-- is equivalent to -->

<Tinybox
    :images="images"
    :index="index"
    @change="(i) => {index = i}"
/>
```

## Browser support

| ![Chrome][chrome] | ![Firefox][firefox] | ![Safari][safari] | ![MS Edge][edge] | ![Internet Explorer][ie] |
|:-----------------:|:-------------------:|:-----------------:|:----------------:|:------------------------:|
|      **21+**      |       **28+**       |       **7+**      |      **16+**     |          **11**          |

[chrome]:  https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_48x48.png
[firefox]: https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_48x48.png
[safari]:  https://github.com/alrra/browser-logos/raw/master/src/safari/safari_48x48.png
[edge]:    https://github.com/alrra/browser-logos/raw/master/src/edge/edge_48x48.png
[ie]:      https://github.com/alrra/browser-logos/raw/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
