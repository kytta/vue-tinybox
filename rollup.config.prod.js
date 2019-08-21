import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";

export const defaultOutput = {
    name: "Tinybox",
    exports: "default"
};

export const input = "./src/index.js";

export function getPlugins(prod = true, min = false) {
    return [
        commonjs(),
        vue({
            css: true,
            compileTemplate: true,
            template: {
                compilerOptions: {
                    whitespace: "condense",
                },
                isProduction: prod
            }
        }),
        babel({
            exclude: "node_modules/**"
        }),
        min && terser()
    ];
}

export function getFilename(infix) {
    return `./dist/tinybox.${infix}.js`;
}

export default [
    {
        input,
        output: {
            ...defaultOutput,
            file: getFilename("esm"),
            format: "esm",
        },
        plugins: getPlugins()
    },
    {
        input,
        output: {
            ...defaultOutput,
            file: getFilename("umd"),
            format: "umd",
        },
        plugins: getPlugins()
    },
    {
        input,
        output: {
            ...defaultOutput,
            file: getFilename("min"),
            format: "iife",
        },
        plugins: getPlugins(true, true)
    },
];
