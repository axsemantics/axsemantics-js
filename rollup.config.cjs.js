import babel from 'rollup-plugin-babel'
import inject from 'rollup-plugin-inject'

export default {
	input: 'src/index.js',
	output: {
		format: 'cjs',
		file: 'dist/axsemantics.js'
	},
	plugins: [
		babel(),
		inject({
			include: 'src/*.js',
			fetch: 'node-fetch',
			FormData: 'form-data',
			URLSearchParams: ['url', 'URLSearchParams']
		})
	],
	external: ['events', 'node-fetch', 'form-data', 'url']
}
