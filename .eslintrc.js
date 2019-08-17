module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended"
    ],
    plugins: ["vue"],

    rules: {
        "semi": [2, "always"],
        "brace-style": 0,
        "no-trailing-spaces": 0,
        "curly": [0, "multi"],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/max-attributes-per-line": ["error", {
            "singleline": 1,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/script-indent": ["error", 4, { "baseIndent": 1 }],
        "vue/require-default-prop": "off",
        "vue/singleline-html-element-content-newline": "off",
        "indent": "off"
    }
};
