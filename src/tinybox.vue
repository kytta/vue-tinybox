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

<style scoped src="./tinybox.css" />
