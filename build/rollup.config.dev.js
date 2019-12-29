import {defaultOutput, getFilename, input} from './defaults';
import {cjs, vue} from './plugins';

export default {
	input,
	output: {
		...defaultOutput,
		file: getFilename('dev'),
		format: 'umd'
	},
	plugins: [
		cjs(),
		vue(false)
	]
};
