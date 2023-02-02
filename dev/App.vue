<script setup>
import { reactive } from "vue";
import Tinybox from "../src";

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
	thumbs: [
		"https://picsum.photos/id/13/200",
		"https://picsum.photos/id/42/200",
		"https://picsum.photos/id/256/200",
		"https://picsum.photos/id/69/200",
		"https://picsum.photos/id/420/200",
	],
	index: null,
	loopCheckbox: false,
	thumbsCheckbox: true,
});
</script>

<template>
	<main>
		<h1>vue-tinybox demo: vanilla Vue.js</h1>
		<div>
			<input id="loop" v-model="state.loopCheckbox" type="checkbox" />
			<label for="loop">Loop</label>
			<br />
			<input id="thumbs" v-model="state.thumbsCheckbox" type="checkbox" />
			<label for="thumbs">Thumbnails</label>
		</div>
		<p>Click on any image below to open <code>Tinybox</code></p>
		<Tinybox
			v-model:index="state.index"
			:images="state.images"
			:loop="state.loopCheckbox"
			:no-thumbs="!state.thumbsCheckbox"
		/>
		<img
			v-for="(img, idx) in state.thumbs"
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
