import { resolve } from "node:path";

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

import autoprefixer from "autoprefixer";

export default defineConfig({
	test: {
		environment: "jsdom",
		root: "src"
	},
	root: resolve("./dev"),
	build: {
		lib: {
			entry: resolve("src/index.js"),
			name: "Tinybox",
			fileName: "vue-tinybox",
			formats: ["es", "umd", "iife"],
		},
		outDir: resolve("./dist"),
		target: "es2015",
		rollupOptions: {
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
		},
	},
	plugins: [
		vue({
			style: {
				postcssPlugins: [autoprefixer],
			},
			template: {
				compilerOptions: {
					whitespace: "condense",
				},
			},
		}),
	],
});
