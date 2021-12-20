import babel from '@rollup/plugin-babel'
import node from 'rollup-plugin-polyfill-node'

export default {
	input: 'src/index.js',
	output: {
		name: 'AxSemanticsClient',
		format: 'iife',
		file: 'dist/axsemantics.iife.js'
	},
	plugins: [
		babel({
			babelHelpers: 'bundled'
		}),
		node()
	]
}
