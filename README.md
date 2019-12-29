# vue-tinybox

A slick, yet tiny lightbox gallery component for Vue.js

- **Slick.** Nothing excessive. Image, controls and thumbnails.
- **Small.** Dependency-free and less than 3 KB minified and gzipped.
- **Adaptive.** Works great on both desktop and mobile.

## Demo

The live demo can be found at https://os.karamoff.ru/vue-tinybox

## Install

### Node.js

Install the module as you normally would via npm or yarn:

```sh
npm install vue-tinybox
# or
yarn add vue-tinybox
```

### Browsers

Just include the link to the Tinybox in your `<head>`:

```html
<script src="path/to/vue.js"></script>
<script src="path/to/tinybox.umd.js"></script>
```

## Usage

If you're using the Tinybox not from the browser, you'll have to import it:

```js
import Tinybox from "vue-tinybox";
```

Then you include it your usual way:

```js
Vue.component('tinybox', Tinybox);

// or

Vue.use(Tinybox);

// or, inside a Vue instance or SFC

{
    components: { Tinybox }
}
```

Then you can use the `Tinybox` component:

```vue
<Tinybox
    :images="images"
    :index="idx"
    @close="idx = null"
/>
```

The `Tinybox` component accepts these props:

| Prop name | Type              | Default | Description                                                                    |
|-----------|-------------------|---------|--------------------------------------------------------------------------------|
| `images`  | `Array`           | `[]`    | The array of either image URLs or `Image` objects                              |
| `index`   | `Number` / `null` | `null`  | The index of the image that has to be shown. If `null`, the lightbox is closed |
| `loop`    | `Boolean`         | `false` | Indicates whether the images should loop                                       |

The `Image` object is an object with following fields:

| Field name  | Type     | Description                                                                               |
|-------------|----------|-------------------------------------------------------------------------------------------|
| `src`       | `String` | The URL of the image                                                                      |
| `alt`       | `String` | (optional) The text to be set inside `alt` attribute, e.g. a caption                      |
| `thumbnail` | `String` | (optional) The URL of the smaller version of the image to be shown in the thumbnail strip |
