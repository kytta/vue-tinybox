<template>
  <div
    :class="{'tinybox--open': open}"
    class="tinybox"

    @click="close"
    @wheel.prevent
    @touchmove.prevent
  >
    <div
      ref="content"

      class="tinybox__content"

      tabindex="0"

      @blur="focusContent"

      @touchstart="swipeStart"
      @touchmove="swipe"
      @touchend="swipeEnd"

      @keyup.left="prev"
      @keyup.right="next"
      @keyup.esc="close"
    >
      <div
        :style="`background:url('${switchFrom.src}')`"
        class="tinybox__content__current"
      >
        <img
          :class="transitionClass"
          :src="current.src"
          :alt="current.alt || ''"

          class="tinybox__content__current__image"

          @click.stop="next"

          @animationend="transitionClass = ''"
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
    <div class="tinybox__thumbs">
      <div
        v-for="(img, i) in normalizedImages"
        :key="i"
        :class="{'tinybox__thumbs__item--active': cIndex === i}"

        class="tinybox__thumbs__item"

        @click.stop="goto(i)"
      >
        <img
          :src="img.thumbnail || img.src"
          :alt="img.alt || ''"
          class="tinybox__thumbs__item__image"
        >
      </div>
    </div>
  </div>
</template>

<script>
/**
   * The Tinybox component
   *
   * @event change - the index has been changed. The current index is sent as payload
   */
export default {
  name: 'Tinybox',

  model: {
    prop: 'index',
    event: 'change',
  },
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
      default: () => [],
    },

    /**
     * The index of the image to be opened in the lightbox
     */
    index: {
      type: Number,
      default: null,
    },

    /**
     * Indicates whether the images carousel should loop around itself
     */
    loop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cIndex: null,

      swipeFinished: false,
      swipeX: null,

      switchFrom: null,
      transitionClass: '',
    };
  },
  computed: {
    normalizedImages() {
      return this.images.map((img) => ((typeof img === 'string' || img instanceof String) ? { src: img } : img));
    },
    current() {
      return this.normalizedImages[this.cIndex] || { src: '' };
    },
    open() {
      return this.index != null;
    },
    hasPrev() {
      return this.cIndex > 0 || this.loop;
    },
    hasNext() {
      return this.cIndex < this.normalizedImages.length - 1 || this.loop;
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
    close() {
      this.$emit('change', null);
    },

    prev() {
      if (this.hasPrev) {
        this.$emit('change', this.cIndex - 1);
      }
    },
    next() {
      if (this.hasNext) {
        this.$emit('change', this.cIndex + 1);
      }
    },

    goto(index) {
      this.switchFrom = this.current;
      let transition = '';

      if (index !== null) {
        let newIndex = index;

        if (newIndex >= this.normalizedImages.length) {
          newIndex = 0;
        } else if (newIndex < 0) {
          newIndex = this.normalizedImages.length - 1;
        }

        if (this.cIndex != null && this.cIndex !== newIndex) {
          transition = this.cIndex < newIndex ? 'tinybox__content__current__image--rtl' : 'tinybox__content__current__image--ltr';
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
    },
  },
};
</script>

<style scoped>
  .tinybox {
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

  .tinybox--open {
    opacity: 1;
    pointer-events: initial;
  }

  .tinybox__content {
    height: 84vh;
    position: absolute;
    width: 100vw;
  }

  .tinybox__content:focus {
    outline: none;
  }

  .tinybox__content::before {
    content: "";
    display: inline-block;
    height: 84vh;
    vertical-align: middle;
  }

  .tinybox__content__current {
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
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

    animation: 300ms ease 1 normal;
  }

  .tinybox__content__current__image--ltr {
    animation-name: ltr;
  }

  .tinybox__content__current__image--rtl {
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

  .tinybox__content__control {
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

  .tinybox__content__control:hover {
    opacity: 1;
  }

  .tinybox__content__control--prev {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 -2 28 36' width='40' height='60' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3'%3E%3Cpath d='M20 30 L8 16 20 2' /%3E%3C/svg%3E");
    bottom: 0;
    left: 0;
  }

  .tinybox__content__control--next {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 -2 28 36' width='40' height='60' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3'%3E%3Cpath d='M12 30 L24 16 12 2' /%3E%3C/svg%3E");
    bottom: 0;
    right: 0;
  }

  .tinybox__content__control--close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-5 -5 46 46' width='40' height='40' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'%3E%3Cpath d='M2 30 L30 2 M30 30 L2 2' /%3E%3C/svg%3E");
    height: 2.6em;
    right: 0;
  }

  .tinybox__thumbs {
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

  .tinybox__thumbs__item {
    background: #222;
    cursor: pointer;
    display: inline-block;
    height: 10vh;
    overflow: hidden;
    margin: 2vh 1vh;
    position: relative;
    width: 10vh;
  }

  .tinybox__thumbs__item--active .tinybox__thumbs__item__image{
    opacity: .3;
  }

  .tinybox__thumbs__item__image {
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
