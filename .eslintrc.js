module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended"
    ],
    parser: "vue-eslint-parser",
    plugins: ["vue"],
    root: true,

    rules: {
        "array-bracket-spacing": 2,
        "brace-style": [2, "1tbs"],
        "camelcase": 2,
        "comma-spacing": 2,
        "comma-style": 2,
        "computed-property-spacing": 2,
        "consistent-return": 2,
        "curly": 2,
        "dot-location": [2, "property"],
        "eqeqeq": [2, "smart"],
        "func-call-spacing": 2,
        "func-names": [2, "as-needed"],
        "func-style": [2, "declaration"],
        "guard-for-in": 1,
        "indent": 0, // else .vue files are formatted badly
        "key-spacing": 2,
        "keyword-spacing": 2,
        "linebreak-style": [1, "unix"],
        "no-console": 0,
        "no-delete-var": 2,
        "no-else-return": 2,
        "no-empty": 2,
        "no-mixed-operators": 2,
        "no-multi-spaces": 2,
        "no-trailing-spaces": 0,
        "no-var": 2,
        "object-curly-spacing": [2, "always"],
        "operator-linebreak": [2, "before", { overrides: { "=": "after" } }],
        "quote-props": [2, "consistent-as-needed"],
        "quotes": [2, "double", { allowTemplateLiterals: true }],
        "semi": [2, "always"],
        "semi-spacing": 2,
        "sort-keys": [2, "asc", { natural: true }],
        "space-before-blocks": 2,
        "space-in-parens": 2,
        "spaced-comment": 2,
        "vue/component-name-in-template-casing": 2,
        "vue/html-indent": [2, 4],
        "vue/match-component-file-name": [2, {
            extensions: ["vue"],
            shouldMatchCase: true
        }],
        "vue/no-boolean-default": [2, "default-false"],
        "vue/require-default-prop": 2,
        "vue/script-indent": [2, 4, { baseIndent: 1 }],
        "vue/singleline-html-element-content-newline": 0,
        "yoda": 2
    }
};
