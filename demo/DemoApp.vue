<script setup>
import { ref } from "vue";
import TinyboxGallery from "../src";

const isDev = import.meta.env.DEV;

const images = [
	{
		src: "https://picsum.photos/id/13/600/1000",
		alt: "Empty beach",
		caption: "Beach",
		thumbnail: "https://picsum.photos/id/13/200",
	},
	{
		src: "https://picsum.photos/id/42/800/600",
		alt: "Desk in a café",
		caption: "Café",
		thumbnail: "https://picsum.photos/id/42/200",
	},
	{
		src: "https://picsum.photos/id/256/1500/600",
		alt: "Mountains range",
		caption: "Mountains",
		thumbnail: "https://picsum.photos/id/256/200",
	},
	{
		src: "https://picsum.photos/id/666/800/600",
		alt: "Green trees in forest",
		caption: "Forest",
		thumbnail: "https://picsum.photos/id/666/200",
	},
];

const index = ref(null);

const loopCheckbox = ref(false);
const thumbsCheckbox = ref(true);

if (isDev) {
	images.push(
		"https://picsum.photos/id/69/800/600",
		"https://picsum.photos/id/420/800/600",
	);
}
</script>

<template>
	<TinyboxGallery
		v-model:index="index"
		:images="images"
		:loop="loopCheckbox"
		:no-thumbs="!thumbsCheckbox"
	></TinyboxGallery>

	<img
		v-for="(img, idx) in images"
		:key="idx"
		:src="img.thumbnail || img"
		:alt="img.alt"
		class="open-tinybox"
		@click="index = idx"
	/>
	<div v-if="isDev">
		<input id="loop" v-model="loopCheckbox" type="checkbox" />
		<label for="loop">Loop</label>
		<br />
		<input id="thumbs" v-model="thumbsCheckbox" type="checkbox" />
		<label for="thumbs">Thumbnails</label>
	</div>
</template>
