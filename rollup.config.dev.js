import { defaultOutput, getFilename, input } from "./config/build/defaults";
import { buble, cjs, vue } from "./config/build/plugins";

export default {
    input,
    output: {
        ...defaultOutput,
        file: getFilename("dev"),
        format: "iife",
    },
    plugins: [
        cjs(),
        vue(false),
        buble()
    ]
};
