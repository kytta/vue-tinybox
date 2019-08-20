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
        css: true,
        compileTemplate: true,
        template: {
            compilerOptions: {
                preserveWhitespace: false,
                whitespace: "condense",
            },
            isProduction: true
        }
    }),
    babel({
        exclude: "node_modules/**"
    })
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
