import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

import autoprefixer from "autoprefixer";

export default defineConfig({
	build: {
		lib: {
			entry: resolve("src/index.js"),
			name: "Tinybox",
			formats: ["es", "umd"],
			// Workaround to keep the old file names
			fileName: (format) =>
				format == "es" ? "tinybox.esm.js" : "tinybox.umd.js",
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
					whitespace: "condense",
				},
			},
		}),
	],
});
