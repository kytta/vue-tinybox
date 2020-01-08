<template>
  <div>
    <h2>vue-tinybox demo: Nuxt.js</h2>
    <p>Click on any image below to open <code>Tinybox</code></p>

    <client-only>
      <Tinybox
        v-model="index"
        :images="images"
        no-thumbs
      />
    </client-only>
    <img
      v-for="(img, idx) in thumbs"
      class="open-tinybox"
      width="100"
      :src="img"
      @click="index = idx"
    >
  </div>
</template>

<script>

import Tinybox from '../components/tinybox';

export default {
  components: {
    Tinybox,
  },
  data() {
    return {
      images: [
        {
          src: 'https://picsum.photos/id/13/500/1000',
          alt: 'An empty beach',
          thumbnail: 'https://picsum.photos/id/13/200',
        },
        {
          src: 'https://picsum.photos/id/42/1500/600',
          alt: 'A café desk',
        },
        'https://picsum.photos/id/256/800/800',
        'https://picsum.photos/id/69/800/600',
        'https://picsum.photos/id/420/800/600',
      ],
      thumbs: [
        'https://picsum.photos/id/13/200',
        'https://picsum.photos/id/42/200',
        'https://picsum.photos/id/256/200',
        'https://picsum.photos/id/69/200',
        'https://picsum.photos/id/420/200',
      ],
      index: null,
    };
  },
};
</script>

<style scoped>
  .open-tinybox {
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
  }
</style>
