import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'

export default {
	moduleName: 'AxSemanticsClient',
	entry: 'src/index.js',
	format: 'iife',
	plugins: [babel(), builtins()],
	dest: 'dist/axsemantics.browser.js'
}
