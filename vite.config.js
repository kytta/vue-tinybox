import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
	const build = {
		target: "es2015",
	};

	if (mode === "docs") {
		// Documentation website mode
		build.outDir = resolve("./_site"); // For later GitHub pages deployment
	} else {
		// Normal library / dev build mode
		build.outDir = resolve("./dist");
		build.lib = {
			entry: resolve("src/index.js"),
			name: "TinyboxGallery",
			fileName: "vue-tinybox",
			formats: ["es", "umd", "iife"],
		};
		build.rollupOptions = {
			external: ["vue"],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: "Vue",
				},
				// Workaround for a correct file name
				// See: https://github.com/vitejs/vite/issues/4863
				assetFileNames(assetInfo) {
					if (assetInfo.name === "style.css") return "vue-tinybox.css";
					return assetInfo.name;
				},
			},
		};
	}

	return {
		root: resolve("./demo"),
		build,
		css: {
			postcss: {
				plugins: [autoprefixer],
			},
		},
		plugins: [vue()],
	};
});
