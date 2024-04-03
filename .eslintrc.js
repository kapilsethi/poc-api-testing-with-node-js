module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    extends: [
        "plugin:@typescript-eslint/recommended" // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off"
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      }
}