<script setup>
import { computed, nextTick, reactive, ref, watch } from "vue";

const props = defineProps({
	/**
	 * List of images to display in the lightbox
	 *
	 * Any array item can be either a string containing the image URL or an object.
	 * The object fields are the following:
	 * - `src` - image URL
	 * - `thumbnail` - thumbnail URL. If omitted, the image URL will be used
	 * - `caption` - caption text to be overlayed on the image
	 * - `alt` - alt text. If omitted, the caption will be used
	 */
	images: {
		type: Array,
		required: true,
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
});

const index = computed({
	get() {
		return props.index;
	},
	set(newIndex) {
		emit("update:index", newIndex);
		nextTick(alignThumbnails);
	},
});

const state = reactive({
	transitionName: "next",
	swipeDone: false,
	swipeX: null,
});

const emit = defineEmits(["close", "prev", "next", "update:index"]);

const open = computed(() => index.value !== null);
const prevImage = computed(() => {
	if (index.value > 0) {
		return index.value - 1;
	}

	if (props.loop) {
		return props.images.length - 1;
	}

	return index.value;
});
const nextImage = computed(() => {
	if (index.value < props.images.length - 1) {
		return index.value + 1;
	}

	if (props.loop) {
		return 0;
	}

	return index.value;
});

/**
 * Navigates to the image with a specific index
 * @param {null|number} index image index
 * @param {string} [transitionName] name of the transition to be used
 */
function goToImage(newIndex, transitionName) {
	state.transitionName =
		transitionName || (index.value < newIndex ? "next" : "prev");

	index.value = newIndex;
}

/**
 * Navigates to the previous image
 */
function goToPrevious() {
	emit("prev", prevImage.value);
	goToImage(prevImage.value, "prev");
}

/**
 * Navigates to the next image
 */
function goToNext() {
	emit("next", nextImage.value);
	goToImage(nextImage.value, "next");
}

/**
 * Closes the Tinybox
 */
function close() {
	const oldIndex = index.value;
	goToImage(null);
	emit("close", oldIndex);
}

const thumbs = ref(null);
const thumbItems = ref(null);
function alignThumbnails() {
	if (props.noThumbs || index.value === null) return;

	const curThumb = thumbItems.value[index.value];
	// If the thumbnail's center X position is bigger than the half of the screen
	// then scroll the thumbs scrollbar to center the image
	if (curThumb.offsetLeft + curThumb.clientWidth / 2 > window.innerWidth / 2) {
		const distance = curThumb.offsetLeft - window.innerWidth / 2;
		// If there's space to scroll to center the image, then center it
		// otherwise use the maximum scroll width
		if (distance < thumbs.value.scrollWidth) {
			thumbs.value.scrollLeft = distance + curThumb.clientWidth / 2;
		} else {
			thumbs.value.scrollLeft = thumbs.value.scrollWidth;
		}
	} else {
		thumbs.value.scrollLeft = 0;
	}
}

/**
 * Handles the `keyup` event.
 *
 * If right arrow was pressed, switches to the next image.
 * If left arrow was pressed, switches to the previous image.
 * If Escape was pressed, closes the lightbox.
 *
 * @param {KeyboardEvent} event keyboard event
 */
function keyUpHandler(event) {
	if (event.code === "ArrowRight") {
		goToNext();
	} else if (event.code === "ArrowLeft") {
		goToPrevious();
	} else if (event.code === "Escape") {
		close();
	}
}

/**
 * Handles the `touchstart` event
 *
 * The `touchstart` event on the image indicates the beginning of the swipe action.
 *
 * @param {TouchEvent} e event
 */
function handleTouchStart(e) {
	this.swipeDone = false;
	if (e.changedTouches.length === 1) {
		this.swipeX = e.changedTouches[0].screenX;
	}
}

/**
 * Handles the `touch` event
 *
 * The `touch` event registered after the `touchstart` event indicates the swipe being in action
 *
 * @param {TouchEvent} e event
 */
function handleTouchMove(e) {
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
}

watch(open, (newState) => {
	if (newState) {
		window.addEventListener("keyup", keyUpHandler);
	} else {
		window.removeEventListener("keyup", keyUpHandler);
	}
});
</script>

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
				:class="{ 'tinybox__content--no-thumbs': noThumbs }"
				@touchstart="handleTouchStart"
				@touchmove="handleTouchMove"
			>
				<transition :name="state.transitionName">
					<img
						:key="images[index].src || images[index] || ''"
						:src="images[index].src || images[index] || ''"
						:alt="images[index].alt || images[index].caption || ''"
						class="tinybox__content__image"
						@click.stop="goToNext"
					/>
				</transition>

				<span
					v-if="images[index].caption"
					class="tinybox__content__image__caption"
					v-text="images[index].caption"
				/>

				<div
					v-if="prevImage !== index"
					class="tinybox__content__control tinybox__content__control--prev"
					@click.stop="goToPrevious"
				/>
				<div
					v-if="nextImage !== index"
					class="tinybox__content__control tinybox__content__control--next"
					@click.stop="goToNext"
				/>
				<div
					class="tinybox__content__control tinybox__content__control--close"
					@click.stop="close"
				/>
			</div>
			<div
				v-if="!noThumbs"
				ref="thumbs"
				class="tinybox__thumbs"
				@touchmove.stop
				@wheel.stop
			>
				<img
					v-for="(image, idx) in images"
					:key="idx"
					ref="thumbItems"
					:class="{ 'tinybox__thumbs__item--active': index === idx }"
					:src="image.thumbnail || image.src || image || ''"
					:alt="images[index].alt || images[index].caption || ''"
					class="tinybox__thumbs__item"
					@click.stop="goToImage(idx)"
				/>
			</div>
		</div>
	</transition>
</template>

<style scoped>
.tinybox {
	background-color: rgba(0, 0, 0, 0.9);
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

.tinybox__content__image__caption {
	position: absolute;
	bottom: 0;
	padding: 0.5rem 0.75rem;
	border-radius: 5px;
	color: white;
	background-color: rgba(0, 0, 0, 0.9);
	opacity: 0.75;
	font-family: sans-serif;
	font-weight: lighter;
	font-size: 1.2rem;
}

.tinybox__content__control {
	background: no-repeat center/24px;

	cursor: pointer;
	opacity: 0.5;
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
	scroll-behavior: smooth;
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
	opacity: 0.3;
}

/*******************/
/*   TRANSITIONS   */
/*******************/

.fade-enter-from,
.next-enter-from,
.prev-enter-from,
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

.prev-enter-from {
	transform: translateX(-40px);
}

.next-enter-from {
	transform: translateX(40px);
}

.next-enter-active,
.prev-enter-active {
	transition: opacity 300ms ease, transform 300ms ease;
}
</style>
