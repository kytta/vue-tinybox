import {
  babel, resolve, terser, vue,
} from './plugins';
import { defaultOutput, getFilename, input } from './defaults';

export default {
  input,
  output: [
    {
      file: getFilename('esm'),
      format: 'esm',
      ...defaultOutput,
      plugins: [terser(6)],
    },
    {
      file: getFilename('umd'),
      format: 'umd',
      ...defaultOutput,
      plugins: [terser(5)],
    },
  ],
  plugins: [
    resolve(),
    vue(true),
    babel(),
  ],
};
