import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginCommonJs from 'rollup-plugin-commonjs';
import {terser as rollupPluginTerser} from 'rollup-plugin-terser';
import rollupPluginVue from 'rollup-plugin-vue';

export function babel() {
	return rollupPluginBabel();
}

export function cjs() {
    return rollupPluginCommonJs();
}

export function terser(ecma) {
    return rollupPluginTerser({
        output: {
            ecma
        }
    });
}

export function vue(isProduction) {
    return rollupPluginVue({
        css: true,
        template: {
            isProduction
        }
    });
}
