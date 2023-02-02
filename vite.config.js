import { resolve } from "node:path";

import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import vue from "@vitejs/plugin-vue";

import autoprefixer from "autoprefixer";

export default defineConfig({
	resolve: {
		alias: {
			vue: "@vue/compat",
		},
	},
	root: resolve("./dev"),
	build: {
		lib: {
			entry: resolve("src/index.js"),
			name: "Tinybox",
			formats: ["es", "umd"],
			// Workaround to keep the old file names
			fileName: (format) =>
				format === "es" ? "tinybox.esm.js" : "tinybox.umd.js",
		},
		minify: "terser",
		terserOptions: {
			output: {
				ecma: 6,
			},
		},
	},
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
	plugins: [
		vue({
			style: {
				postcssPlugins: [autoprefixer],
			},
			template: {
				compilerOptions: {
					compatConfig: {
						MODE: 3,
					},
					whitespace: "condense",
				},
			},
		}),
		cssInjectedByJsPlugin(),
	],
});
