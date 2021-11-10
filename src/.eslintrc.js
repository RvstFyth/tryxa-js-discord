module.exports = {
    "env": {
        "node": true,
        "browser": false,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13
    },
    "rules": {
        "no-unreachable": "error",
        "no-unreachable-loop": "warn",
        "no-unused-vars": "error",
        "no-use-before-define": "error"
    }
};
