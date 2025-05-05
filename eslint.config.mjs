import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	prettierConfig,
	{
		// config with just ignores is the replacement for `.eslintignore`
		ignores: ['**/build/**', '**/dist/**'],
	},
	{
		plugins: {
			prettier: prettierPlugin,
			'@next/next': nextPlugin,
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'on',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
			'react-hooks/exhaustive-deps': 'off',
			'no-console': ['error'],
			'no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'all',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_',
				},
			],
			eqeqeq: 'error',
			curly: 'error',
			'no-duplicate-imports': 'error',
		},
	}
);
