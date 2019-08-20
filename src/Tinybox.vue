<template>
    <div
        class="tinybox"
        :class="{'tinybox--open': open}"
        @click="close"
    >
        <div class="tinybox__content">
            <div class="tinybox__content__current">
                <img
                    class="tinybox__content__current__image"
                    :src="current.src"
                    :alt="current.alt || ''"
                    @click.stop="next"
                >
            </div>
            <div
                v-if="hasPrev"
                class="tinybox__content__control tinybox__content__control--prev"
                @click.stop="prev"
            />
            <div
                v-if="hasNext"
                class="tinybox__content__control tinybox__content__control--next"
                @click.stop="next"
            />
            <div
                class="tinybox__content__control tinybox__content__control--close"
                @click.stop="close"
            />
        </div>
        <div class="tinybox__thumbnails">
            <div
                v-for="(img, i) in _images"
                :key="i"
                :class="{'tinybox__thumbnails__item--active': cIndex === i}"
                class="tinybox__thumbnails__item"
                @click.stop="goto(i)"
            >
                <img
                    class="tinybox__thumbnails__item__image"
                    :src="img.thumbnail || img.src"
                    :alt="img.alt || ''"
                >
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tinybox",

        props: {
            /**
             * List of images to display in the lightbox
             *
             * Any array item can be either a string containing the image URL or an object.
             * The object fields are the following:
             * - `src` - the image URL
             * - `thumbnail` - the thumbnail (a smaller version of the image) URL
             * - `alt` - the alt text to be displayed if the image failed to load (or by screenreaders)
             */
            images: {
                type: Array,
                default: () => []
            },

            /**
             * The index of the image to be opened in the lightbox
             */
            index: {
                type: Number,
                default: null
            },

            /**
             * Indicates whether the images carousel should loop around itself
             */
            loop: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                cIndex: null
            };
        },
        computed: {
            _images() {
                let result = [];

                for (let i = 0; i < this.images.length; i++) {
                    result.push(
                        typeof this.images[i] === "string"
                            ? { src: this.images[i] }
                            : this.images[i]
                    );
                }

                return result;
            },
            current() {
                return this._images[this.cIndex] || {};
            },
            open() {
                return this.index !== null;
            },
            hasPrev() {
                return this.cIndex > 0 || this.loop;
            },
            hasNext() {
                return this.cIndex < this._images.length - 1 || this.loop;
            },
        },
        watch: {
            index(value) {
                this.resetIndex(value);
            }
        },
        mounted() {
            this.resetIndex(this.index);
        },
        methods: {
            resetIndex(value) {
                this.cIndex = value;
            },
            /**
             * @event close - the close button has been pressed. The current index is sent as payload
             */
            close() {
                this.$emit("close", this.cIndex);
            },
            prev() {
                if (this.hasPrev) {
                    let newIndex = this.cIndex - 1;

                    if (newIndex < 0) {
                        newIndex = this._images.length - 1;
                    }

                    this.cIndex = newIndex;
                }
            },
            next() {
                if (this.hasNext) {
                    let newIndex = this.cIndex + 1;

                    if (newIndex === this._images.length) {
                        newIndex = 0;
                    }

                    this.cIndex = newIndex;
                }
            },
            goto(index) {
                this.cIndex = index;
            }
        }
    };
</script>

<style scoped>
    .tinybox {
        background: rgba(0, 0, 0, .9);
        bottom: 0;
        cursor: auto;
        height: 100%;
        left: 0;
        opacity: 0;
        outline: none;
        overflow: auto;
        pointer-events: none;
        position: fixed;
        right: 0;
        text-align: center;
        top: 0;
        transition: opacity 300ms ease;
        z-index: 2000;
    }

    .tinybox--open {
        opacity: 1;
        pointer-events: initial;
    }

    .tinybox__content {
        height: 84vh;
        margin-top: 2vh;
        overflow: hidden;
        position: relative;
    }

    .tinybox__content__current {
        height: 84vh;
        position: absolute;
        width: 100vw;
    }

    .tinybox__content__current__image {
        border: none;
        cursor: pointer;
        display: inline-block;
        float: none;
        height: auto;
        margin: 0;
        max-width: 82.3vw;
        max-height: 84vh;
        position: relative;
        vertical-align: middle;
        width: auto;
    }

    .tinybox__content__control {
        background-size: 24px;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        display: block;
        opacity: .5;
        position: absolute;
        top: 0;
        transition: all .3s;
        width: 4em;
    }

    .tinybox__content__control:hover {
        opacity: 1;
    }

    .tinybox__content__control--prev {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjE3LjkgMjU2IDEyNy4xLTEyN2M5LjQtOS40IDkuNC0yNC42IDAtMzMuOS05LjQtOS40LTI0LjYtOS4zLTM0IDBsLTE0NCAxNDMuOWMtOS4xIDkuMS05LjMgMjMuNy0uNyAzMy4xbDE0NC42IDE0NC45YzQuNyA0LjcgMTAuOSA3IDE3IDdzMTIuMy0yLjMgMTctN2M5LjQtOS40IDkuNC0yNC42IDAtMzMuOXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=");
        bottom: 0;
        left: 0;
    }

    .tinybox__content__control--next {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjk0LjEgMjU2LTEyNy4xLTEyN2MtOS40LTkuNC05LjQtMjQuNiAwLTMzLjlzMjQuNi05LjMgMzQgMGwxNDQgMTQzLjljOS4xIDkuMSA5LjMgMjMuNy43IDMzLjFsLTE0NC42IDE0NC45Yy00LjcgNC43LTEwLjkgNy0xNyA3cy0xMi4zLTIuMy0xNy03Yy05LjQtOS40LTkuNC0yNC42IDAtMzMuOXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=");
        bottom: 0;
        right: 0;
    }

    .tinybox__content__control--close {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNzguNiAyNTYgNjguMi02OC4yYzYuMi02LjIgNi4yLTE2LjQgMC0yMi42cy0xNi40LTYuMi0yMi42IDBsLTY4LjIgNjguMi02OC4yLTY4LjJjLTYuMi02LjItMTYuNC02LjItMjIuNiAwLTMuMSAzLjEtNC43IDcuMi00LjcgMTEuM3MxLjYgOC4yIDQuNyAxMS4zbDY4LjIgNjguMi02OC4yIDY4LjJjLTMuMSAzLjEtNC43IDcuMi00LjcgMTEuM3MxLjYgOC4yIDQuNyAxMS4zYzYuMiA2LjIgMTYuNCA2LjIgMjIuNiAwbDY4LjItNjguMiA2OC4yIDY4LjJjNi4yIDYuMiAxNi40IDYuMiAyMi42IDBzNi4yLTE2LjQgMC0yMi42eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==");
        height: 2.6em;
        right: 0;
    }

    .tinybox__thumbnails {
        bottom: 0;
        left: 0;
        line-height: 0;
        padding: 0 1vh;
        position: absolute;
        right: 0;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }

    .tinybox__thumbnails__item {
        background: #222;
        box-sizing: content-box;
        cursor: pointer;
        display: inline-block;
        height: 10vh;
        overflow: hidden;
        padding: 2vh 1vh;
        position: relative;
        width: 10vh;
    }

    .tinybox__thumbnails__item--active {
        opacity: .3;
    }

    .tinybox__thumbnails__item__image {
        border: none;
        display: inline-block;
        vertical-align: middle;
        width: auto;
        max-width: none;
        top: 0;
        height: 100%;
    }
</style>
