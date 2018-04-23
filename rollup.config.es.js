import babel from 'rollup-plugin-babel'

export default {
	input: 'src/index.js',
	output: {
		format: 'es',
		file: 'dist/axsemantics.es.js'
	},
	plugins: [babel()],
	external: ['events', 'querystring']
}
