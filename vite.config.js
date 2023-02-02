import { resolve } from "node:path";

import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import vue from "@vitejs/plugin-vue";

import autoprefixer from "autoprefixer";

export default defineConfig({
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
		cssInjectedByJsPlugin(),
	],
});
