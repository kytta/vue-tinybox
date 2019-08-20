import { getFilename, input, defaultOutput, getPlugins } from "./rollup.config.prod.js";

export default {
    input,
    output: {
        ...defaultOutput,
        file: getFilename("dev"),
        format: "iife",
    },
    plugins: getPlugins(false)
};
