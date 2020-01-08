/* eslint-disable import/no-extraneous-dependencies */ // `build` folder does not have project files

import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';
import rollupPluginVue from 'rollup-plugin-vue';

import autoprefixer from 'autoprefixer';

export function babel() {
  return rollupPluginBabel();
}

export function resolve() {
  return rollupPluginNodeResolve();
}

export function terser(ecma) {
  return rollupPluginTerser({
    output: {
      ecma,
    },
  });
}

export function vue(isProduction) {
  return rollupPluginVue({
    css: true,
    style: {
      postcssPlugins: [
        autoprefixer,
      ],
    },
    template: {
      isProduction,
      compilerOptions: {
        whitespace: 'condense',
      },
    },
  });
}
