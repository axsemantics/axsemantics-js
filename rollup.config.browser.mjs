import babel from '@rollup/plugin-babel'
import node from 'rollup-plugin-polyfill-node'

export default {
	input: 'src/index.js',
	output: {
		format: 'cjs',
		file: 'dist/axsemantics.browser.js',
		exports: 'default'
	},
	plugins: [
		babel({
			babelHelpers: 'bundled'
		}),
		node()
	]
}
