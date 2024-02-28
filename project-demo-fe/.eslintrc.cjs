/* eslint-env node */

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	ignorePatterns: ["*/**.scss"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:react-hooks/recommended",
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react-refresh", "@typescript-eslint"],
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/await-thenable": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-misused-promises": [
			2,
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-floating-promises": "error",
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
	],
};
