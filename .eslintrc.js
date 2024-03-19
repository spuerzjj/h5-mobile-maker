module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:vue/vue3-essential', 'prettier'],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['vue', 'prettier'],
	rules: {
		'vue/multi-word-component-names': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		]
	}
}
