import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'

export default {
	input: 'src/index.js',
	output: {
		name: 'AxSemanticsClient',
		format: 'iife',
		file: 'dist/axsemantics.browser.js'
	},
	plugins: [babel(), builtins()]
}
