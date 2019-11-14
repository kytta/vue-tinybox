import { buble, cjs, terser, vue } from "./config/build/plugins";
import { defaultOutput, getFilename, input } from "./config/build/defaults";


export default [
    {
        input,
        output: {
            file: getFilename("esm"),
            format: "esm",
            ...defaultOutput
        },
        plugins: [
            cjs(),
            vue(true),
            buble(),
            terser(6)
        ]
    },
    {
        input,
        output: {
            file: getFilename("umd"),
            format: "umd",
            ...defaultOutput
        },
        plugins: [
            cjs(),
            vue(true),
            buble(),
            terser(5)
        ]
    }
];
