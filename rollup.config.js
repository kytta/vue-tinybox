import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";

const exports = "named";
const input = "./src/index.js";
const name = "Tinybox";

const plugins = [
    commonjs(),
    vue({
        compileTemplate: true,
        css: true
    }),
    babel()
];

function getFilename(infix) {
    return `./dist/tinybox.${infix}.js`;
}

export default [
    {
        input,
        output: {
            exports,
            file: getFilename("esm"),
            format: "esm",
            name
        },
        plugins
    },
    {
        input,
        output: {
            exports,
            file: getFilename("umd"),
            format: "umd",
            name
        },
        plugins
    },
    {
        input,
        output: {
            exports,
            file: getFilename("min"),
            format: "iife",
            name
        },
        plugins: [
            ...plugins,
            terser()
        ]
    }
];
