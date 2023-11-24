module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "react-app"
    ],
    "settings": {
        "react": {
          "version": "detect", // Automatically detect the React version
        },
      },

    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "react/react-in-jsx-scope": "off",
        "no-whitespace-before-property": "off",
        "array-callback-return": "off"
        // indent: ['warn', 4]
    }
}
