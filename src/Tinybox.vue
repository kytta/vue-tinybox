<template>
    <div
        :class="{'v-tb--open': open}"

        @click="close"

        @wheel.prevent
        @touchmove.prevent

        class="v-tb"
    >
        <div
            ref="content"

            @blur="focusContent"

            @touchstart="swipeStart"
            @touchmove="swipe"
            @touchend="swipeEnd"

            @keyup.left="prev"
            @keyup.right="next"
            @keyup.esc="close"

            class="v-tb__cont"
            tabindex="0"
        >
            <div
                :style="`background:url('${switchFrom.src}')`"
                class="v-tb__cont__cur"
            >
                <img
                    :class="transitionClass"
                    :src="current.src"
                    :alt="current.alt || ''"

                    @click.stop="next"

                    @animationend="transitionClass = ''"

                    class="v-tb__cont__cur__img"
                >
            </div>
            <div
                v-if="hasPrev"

                @click.stop="prev"

                class="v-tb__cont__ctrl v-tb__cont__ctrl--prev"
            />
            <div
                v-if="hasNext"

                @click.stop="next"

                class="v-tb__cont__ctrl v-tb__cont__ctrl--next"
            />
            <div
                @click.stop="close"

                class="v-tb__cont__ctrl v-tb__cont__ctrl--close"
            />
        </div>
        <div class="v-tb__thumbs">
            <div
                v-for="(img, i) in _images"
                :key="i"
                :class="{'v-tb__thumbs__item--active': cIndex === i}"

                @click.stop="goto(i)"

                class="v-tb__thumbs__item"
            >
                <img
                    :src="img.thumbnail || img.src"
                    :alt="img.alt || ''"
                    class="v-tb__thumbs__item__img"
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
                cIndex: null,

                swipeFinished: false,
                swipeX: null,

                switchFrom: null,
                transitionClass: ""
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
                return this._images[this.cIndex] || { src: "" };
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
            index(idx) {
                this.goto(idx);
            },
            open() {
                this.focusContent();
            },
        },
        created() {
            this.goto(this.index);
        },
        methods: {
            /**
             * @event close - the close button has been pressed. The current index is sent as payload
             */
            close() {
                this.$emit("close", this.cIndex);
            },

            prev() {
                if (this.hasPrev) {
                    this.goto(this.cIndex - 1);
                }
            },
            next() {
                if (this.hasNext) {
                    this.goto(this.cIndex + 1);
                }
            },
            goto(index) {
                this.switchFrom = this.current;
                let transition = "";

                if (index !== null) {
                    let newIndex = index;

                    if (newIndex >= this._images.length) {
                        newIndex = 0;
                    } else if (newIndex < 0) {
                        newIndex = this._images.length - 1;
                    }

                    if (this.cIndex !== null) {
                        transition = this.cIndex < newIndex ? "v-tb__cont__cur__img--rtl" : "v-tb__cont__cur__img--ltr";
                    }
                }

                this.transitionClass = transition;
                this.cIndex = index;
            },

            swipeStart(e) {
                if (e.changedTouches.length === 1) {
                    this.swipeX = e.changedTouches[0].screenX;
                }
            },
            swipe(e) {
                if (!this.swipeFinished && e.changedTouches.length === 1) {
                    const newSwipeX = e.changedTouches[0].screenX;

                    if (newSwipeX - this.swipeX >= 50) {
                        this.prev();
                        this.swipeFinished = true;
                    } else if (this.swipeX - newSwipeX >= 50) {
                        this.next();
                        this.swipeFinished = true;
                    }
                }
            },
            swipeEnd() {
                this.swipeX = null;
                this.swipeFinished = false;
            },

            focusContent() {
                if (this.open) {
                    this.$refs.content.focus();
                } else {
                    this.$refs.content.blur();
                }
            }
        }
    };
</script>

<style scoped>
    .v-tb {
        background: rgba(0, 0, 0, .9);
        height: 100%;
        left: 0;
        opacity: 0;
        outline: none;
        pointer-events: none;
        position: fixed;
        right: 0;
        text-align: center;
        top: 0;
        transition: opacity 300ms ease;
        z-index: 2000;
    }

    .v-tb--open {
        opacity: 1;
        pointer-events: initial;
    }

    .v-tb__cont {
        height: 84vh;
        position: absolute;
        width: 100vw;
    }

    .v-tb__cont:focus {
        outline: none;
    }

    .v-tb__cont::before {
        content: "";
        display: inline-block;
        height: 84vh;
        vertical-align: middle;
    }

    .v-tb__cont__cur {
        background-size: cover;
        display: inline-block;
        vertical-align: middle;
    }

    .v-tb__cont__cur__img {
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

        animation: 300ms ease 1 normal;
    }

    .v-tb__cont__cur__img--ltr {
        animation-name: ltr;
    }

    .v-tb__cont__cur__img--rtl {
        animation-name: rtl;
    }

    @keyframes ltr {
        from {
            opacity: 0;
            transform: translateX(-80px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes rtl {
        from {
            opacity: 0;
            transform: translateX(80px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .v-tb__cont__ctrl {
        background: no-repeat center/24px;

        /*background-size: 24px;*/
        /*background-repeat: no-repeat;*/
        /*background-position: center;*/
        cursor: pointer;
        opacity: .5;
        position: absolute;
        top: 0;
        transition: opacity .3s;
        width: 4em;
    }

    .v-tb__cont__ctrl:hover {
        opacity: 1;
    }

    .v-tb__cont__ctrl--prev {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjE3LjkgMjU2IDEyNy4xLTEyN2M5LjQtOS40IDkuNC0yNC42IDAtMzMuOS05LjQtOS40LTI0LjYtOS4zLTM0IDBsLTE0NCAxNDMuOWMtOS4xIDkuMS05LjMgMjMuNy0uNyAzMy4xbDE0NC42IDE0NC45YzQuNyA0LjcgMTAuOSA3IDE3IDdzMTIuMy0yLjMgMTctN2M5LjQtOS40IDkuNC0yNC42IDAtMzMuOXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=");
        bottom: 0;
        left: 0;
    }

    .v-tb__cont__ctrl--next {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjk0LjEgMjU2LTEyNy4xLTEyN2MtOS40LTkuNC05LjQtMjQuNiAwLTMzLjlzMjQuNi05LjMgMzQgMGwxNDQgMTQzLjljOS4xIDkuMSA5LjMgMjMuNy43IDMzLjFsLTE0NC42IDE0NC45Yy00LjcgNC43LTEwLjkgNy0xNyA3cy0xMi4zLTIuMy0xNy03Yy05LjQtOS40LTkuNC0yNC42IDAtMzMuOXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=");
        bottom: 0;
        right: 0;
    }

    .v-tb__cont__ctrl--close {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNzguNiAyNTYgNjguMi02OC4yYzYuMi02LjIgNi4yLTE2LjQgMC0yMi42cy0xNi40LTYuMi0yMi42IDBsLTY4LjIgNjguMi02OC4yLTY4LjJjLTYuMi02LjItMTYuNC02LjItMjIuNiAwLTMuMSAzLjEtNC43IDcuMi00LjcgMTEuM3MxLjYgOC4yIDQuNyAxMS4zbDY4LjIgNjguMi02OC4yIDY4LjJjLTMuMSAzLjEtNC43IDcuMi00LjcgMTEuM3MxLjYgOC4yIDQuNyAxMS4zYzYuMiA2LjIgMTYuNCA2LjIgMjIuNiAwbDY4LjItNjguMiA2OC4yIDY4LjJjNi4yIDYuMiAxNi40IDYuMiAyMi42IDBzNi4yLTE2LjQgMC0yMi42eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==");
        height: 2.6em;
        right: 0;
    }

    .v-tb__thumbs {
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

    .v-tb__thumbs__item {
        background: #222;
        cursor: pointer;
        display: inline-block;
        height: 10vh;
        overflow: hidden;
        margin: 2vh 1vh;
        position: relative;
        width: 10vh;
    }

    .v-tb__thumbs__item--active .v-tb__thumbs__item__img{
        opacity: .3;
    }

    .v-tb__thumbs__item__img {
        display: inline-block;
        height: 100%;
        left: 50%;
        position: absolute;
        top: 0;
        transform: translateX(-50%);
        vertical-align: middle;
        width: auto;
    }
</style>
