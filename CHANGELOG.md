# CHANGELOG

## 1.1.0

### New & Improved

- you can now caption your images using the `caption` prop

## 1.0.1

### New & Improved

- switched from NPM to Yarn for development
- updated dependencies

## 1.0.0

### 🛑 BREAKING

- Node 8 is not supported anymore as it's reached the end of its support lifecycle
- `close` event has been removed. The optimal way to use the component is now via `v-model` or `change` event (#14)

### New & Improved

- `v-model` support; an index of the image needs to be passed (#14)
- ability to hide thumbnails with `no-thumbs` prop (#18)
- previous icons have been replaced in favor of smaller [bytesize-icons](https://github.com/danklammer/bytesize-icons) (#7)
- Tinybox will now auto-install if it detects Vue in `global` or `window` scope
- node structure is now simpler and more optimized
- package size went down significantly to below 3 KB
- keyboard detection moved to `window`, no more focus hacks needed
- source code readability improved further

### Fixed

- thumbnails had wrong aspect ration if they weren't square (#19)
- flashing images on navigation due to them not loading (#22)
- a bug on touch devices that prevented "chained" swiping (multiple swipe gestures in a row)
- when looping around images the wrong animation was playing

## 0.3.0

### 🛑 BREAKING

- ".min.js" version is removed in favor of ".umd.js"

### New & Improved

- package size went down ~170 bytes
- build configs are more readable now
- source code is more readable now

## 0.2.0

### New & Improved

- slide animation when navigating through photos (#3)
- on mobile devices images can now be navigated via swiping (#4)
    - this feature has limited support in MS Edge
- on computers images can now be navigated with arrow keys (#9)

### Fixed

- images weren't aligned vertically under some conditions (#8)
- user was able to scroll the content behind the lightbox (#11)

## 0.1.0

The initial version of the package.

Basic functionality includes:

- loading the lightbox with images and optional thumbnails
- on-screen controls
- ability to loop images

