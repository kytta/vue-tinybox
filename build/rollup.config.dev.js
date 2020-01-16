import { defaultOutput, input } from './defaults';
import { resolve, vue } from './plugins';

export default [
  {
    input,
    output: {
      ...defaultOutput,
      file: './dev/tinybox.js',
      format: 'umd',
    },
    plugins: [
      resolve(),
      vue(false),
    ],
  },
];
