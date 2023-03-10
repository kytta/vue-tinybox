<script setup>
import { reactive } from "vue";
import TinyboxGallery from "../src";

const state = reactive({
	images: [
		{
			src: "https://picsum.photos/id/13/500/1000",
			alt: "An empty beach",
			thumbnail: "https://picsum.photos/id/13/200",
			caption: "Beach",
		},
		{
			src: "https://picsum.photos/id/42/1500/600",
			alt: "A café desk",
			caption: "Café",
		},
		{
			src: "https://picsum.photos/id/256/800/800",
			thumbnail: "https://picsum.photos/id/256/200",
			caption: "Mountain range",
		},
		"https://picsum.photos/id/69/800/600",
		"https://picsum.photos/id/420/800/600",
	],
	thumbs: [],
	index: null,
	loopCheckbox: false,
	thumbsCheckbox: true,
});
</script>

<template>
	<main>
		<h1>vue-tinybox demo: vanilla Vue.js</h1>
		<p>Click on any image below to open <code>TinyboxGallery</code></p>
		<TinyboxGallery
			v-model:index="state.index"
			:images="state.images"
			:loop="state.loopCheckbox"
			:no-thumbs="!state.thumbsCheckbox"
		/>
		<img
			v-for="(img, idx) in state.thumbs"
			:key="img"
			class="open-tinybox"
			width="100"
			:src="img"
			@click="state.index = idx"
		/>
	</main>
</template>

<style scoped>
.open-tinybox {
	display: inline-block;
	cursor: pointer;
	margin-right: 10px;
}
</style>
