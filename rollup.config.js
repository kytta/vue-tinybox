import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from '@rollup/plugin-terser';
import vue from 'rollup-plugin-vue';

import autoprefixer from 'autoprefixer';

const name = 'Tinybox';
const outFilename = (infix) => `./dist/tinybox.${infix}.js`;

const production = process.env.NODE_ENV === 'production' && !process.env.ROLLUP_WATCH;

const output = [];
const plugins = [
  resolve(),
  vue({
    css: true,
    style: {
      postcssPlugins: [
        autoprefixer,
      ],
    },
    template: {
      isProduction: production,
      compilerOptions: {
        whitespace: 'condense',
      },
    },
  }),
  production && babel({
    presets: [
      '@babel/env',
    ],
  }),
];

if (production) {
  output.push(
    {
      file: outFilename('esm'),
      format: 'esm',
      name,
      plugins: [terser({ output: { ecma: 6 } })],
    },
    {
      file: outFilename('umd'),
      format: 'umd',
      name,
      plugins: [terser({ output: { ecma: 5 } })],
    },
  );
  plugins.push();
} else {
  output.push({
    file: './dev/tinybox.js',
    format: 'umd',
    name,
  });
}

export default {
  input: './src/index.js',
  output,
  plugins,
};
