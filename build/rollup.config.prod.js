import {babel, cjs, terser, vue} from './plugins';
import {defaultOutput, getFilename, input} from './defaults';

export default [
	{
		input,
		output: {
			file: getFilename('esm'),
			format: 'esm',
			...defaultOutput
		},
		plugins: [
			cjs(),
			vue(true),
			babel(),
			terser(6)
		]
	},
	{
		input,
		output: {
			file: getFilename('umd'),
			format: 'umd',
			...defaultOutput
		},
		plugins: [
			cjs(),
			vue(true),
			babel(),
			terser(5)
		]
	}
];
