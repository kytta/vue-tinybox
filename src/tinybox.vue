<template>
  <transition name="fade">
    <div
      v-if="open"

      class="tinybox"

      @click="close"
      @wheel.prevent
      @touchmove.prevent
    >
      <div
        class="tinybox__content"
        :class="{'tinybox__content--no-thumbs': noThumbs}"

        @touchstart="swipeStart"
        @touchmove="swipe"
      >
        <transition :name="slide">
          <img
            :key="images[index].src || images[index] || ''"
            :src="images[index].src || images[index] || ''"
            :alt="images[index].alt || ''"

            class="tinybox__content__image"

            @click.stop="next"
          >
        </transition>

        <div
          v-if="prevImage !== index"

          class="tinybox__content__control tinybox__content__control--prev"

          @click.stop="prev"
        />
        <div
          v-if="nextImage !== index"

          class="tinybox__content__control tinybox__content__control--next"

          @click.stop="next"
        />
        <div
          class="tinybox__content__control tinybox__content__control--close"

          @click.stop="close"
        />
      </div>
      <div
        v-if="!noThumbs"
        class="tinybox__thumbs"
        @touchmove.stop
        @wheel.stop
      >
        <img
          v-for="(image, idx) in images"
          :key="idx"
          :class="{'tinybox__thumbs__item--active': index === idx}"

          :src="image.thumbnail || image.src || image || ''"
          :alt="image.alt || ''"

          class="tinybox__thumbs__item"

          @click.stop="goto(idx)"
        >
      </div>
    </div>
  </transition>
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
     * - `thumbnail` - the thumbnail (a smaller, square version of the image) URL
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

    /**
     * When enabled, the thumbnails are hidden
     */
    noThumbs: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      slide: 'next',
      swipeDone: false,
      swipeX: null,
    };
  },
  computed: {
    open() {
      return this.index != null;
    },
    prevImage() {
      if (this.index > 0) {
        return this.index - 1;
      }
      if (this.loop) {
        return this.images.length - 1;
      }
      return this.index;
    },
    nextImage() {
      if (this.index < this.images.length - 1) {
        return this.index + 1;
      }
      if (this.loop) {
        return 0;
      }
      return this.index;
    },
  },
  watch: {
    open(value) {
      if (value) {
        window.addEventListener('keyup', this.keyup);
      } else {
        window.removeEventListener('keyup', this.keyup);
      }
    },
  },
  methods: {
    close() {
      this.goto(null);
    },
    prev() {
      this.goto(this.prevImage, 'prev');
    },
    next() {
      this.goto(this.nextImage, 'next');
    },
    goto(idx, slide) {
      this.slide = slide || (this.index < idx ? 'next' : 'prev');

      this.$emit('change', idx);
    },

    keyup(e) {
      if (e.code === 'ArrowRight') {
        this.next();
      } else if (e.code === 'ArrowLeft') {
        this.prev();
      } else if (e.code === 'Escape') {
        this.close();
      }
    },

    swipeStart(e) {
      this.swipeDone = false;
      if (e.changedTouches.length === 1) {
        this.swipeX = e.changedTouches[0].screenX;
      }
    },
    swipe(e) {
      if (!this.swipeDone && e.changedTouches.length === 1) {
        const swipeDistance = e.changedTouches[0].screenX - this.swipeX;

        if (swipeDistance >= 50) {
          this.prev();
          this.swipeDone = true;
        } else if (swipeDistance <= -50) {
          this.next();
          this.swipeDone = true;
        }
      }
    },
  },
};
</script>

<style scoped>
  .tinybox {
    background-color: rgba(0, 0, 0, .9);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    text-align: center;
    top: 0;
    z-index: 1000;
  }

  .tinybox__content {
    height: 85%;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tinybox__content--no-thumbs {
    height: 100%;
  }

  .tinybox__content__image {
    background-color: #222;
    cursor: pointer;
    display: inline-block;
    max-height: 90%;
    max-width: 80%;
    position: absolute;
  }

  .tinybox__content__control {
    background: no-repeat center/24px;

    cursor: pointer;
    opacity: .5;
    position: absolute;
    top: 0;
    transition: opacity 300ms ease;
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
    height: 15%;
    left: 0;
    line-height: 0;
    padding: 0 10px;
    position: absolute;
    right: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .tinybox__thumbs__item {
    cursor: pointer;
    display: inline-block;
    height: 10vh;
    margin: 2.5vh 5px;
    object-fit: cover;
    overflow: hidden;
    width: 10vh;
  }

  .tinybox__thumbs__item--active {
    opacity: .3;
  }

  /*******************/
  /*   TRANSITIONS   */
  /*******************/

  .fade-enter,
  .next-enter,
  .prev-enter,
  .fade-leave-active,
  .prev-leave-active,
  .next-leave-active {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active,
  .prev-leave-active,
  .next-leave-active {
    transition: opacity 300ms ease;
  }

  .prev-enter {
    transform: translateX(-40px);
  }

  .next-enter {
    transform: translateX(40px);
  }

  .next-enter-active,
  .prev-enter-active {
    transition: opacity 300ms ease, transform 300ms ease;
  }
</style>
