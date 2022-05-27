module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",'prettier'
    ],
    "rules": {
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'prettier/prettier': 2, // Means error
        'no-console': 1, // Means warning
        'no-var': 'error',
        'prefer-const': 'error' 
    }
}

