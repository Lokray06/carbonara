{
  "env": { "node": true, "es2021": true },
  "plugins": ["security"],
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "no-unsafe-regex/no-unsafe-regex": "error",
    "security/detect-unsafe-regex": "warn"
  }
}
