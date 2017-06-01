import babel from 'rollup-plugin-babel'
import inject from 'rollup-plugin-inject'

export default {
	entry: 'src/index.js',
	format: 'cjs',
	plugins: [
		babel(),
		inject({
			include: 'src/index.js',
			fetch: 'node-fetch',
			FormData: 'form-data'
		})
	],
	dest: 'dist/axsemantics.js',
	external: ['events', 'querystring', 'node-fetch', 'form-data']
}
