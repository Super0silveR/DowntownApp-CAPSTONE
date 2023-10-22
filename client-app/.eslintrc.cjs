module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        // TODO: uncomment following 2 lines and update code to abide by modern linting rules
        // 'eslint:recommended',
        // 'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
        'off',
        { allowConstantExport: true },
        ],
    },
}