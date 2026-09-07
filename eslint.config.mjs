import neostandard from 'neostandard'

export default [
	...neostandard({ semi: false }),
	{
		languageOptions: {
			sourceType: 'module',
			globals: { localStorage: false }
		},
		rules: {
			// preserved from the previous .eslintrc.js
			curly: 0,
			'no-return-assign': 0,
			'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
			'@stylistic/indent': [2, 'tab'],
			'@stylistic/no-tabs': 0,
			'@stylistic/comma-dangle': 0,
			'@stylistic/object-curly-spacing': 0,
			'@stylistic/quotes': [2, 'single', { allowTemplateLiterals: true }],
			'@stylistic/arrow-parens': 0,
			'@stylistic/generator-star-spacing': 0
		}
	}
]
