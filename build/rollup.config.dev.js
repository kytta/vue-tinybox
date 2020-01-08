import { defaultOutput, input } from './defaults';
import { resolve, vue } from './plugins';

export default [
  {
    input,
    output: {
      ...defaultOutput,
      file: './dev/nuxt/components/tinybox.js',
      format: 'esm',
    },
    plugins: [
      resolve(),
      vue(false),
    ],
  },
  {
    input,
    output: {
      ...defaultOutput,
      file: './dev/basic/tinybox.js',
      format: 'umd',
    },
    plugins: [
      resolve(),
      vue(false),
    ],
  },
];
