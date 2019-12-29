import {defaultOutput, getFilename, input} from './defaults';
import {resolve, vue} from './plugins';

export default {
	input,
	output: {
		...defaultOutput,
		file: getFilename('dev'),
		format: 'umd'
	},
	plugins: [
		resolve(),
		vue(false)
	]
};
