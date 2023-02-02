/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"xo/browser",
		"plugin:vue/vue3-recommended",
		"@vue/eslint-config-prettier",
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	env: {
		browser: true,
	},
};
