import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import love from 'eslint-config-love'

export default [
  {
    ...love,
    files: ['**/*.{js,mjs,cjs,ts}']
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // 'no-console': 'off',
      // 'no-magic-numbers': 'off',
      // '@typescript-eslint/no-unsafe-assignment': 'off',
      // 'prefer-destructuring': 'off',
      // '@typescript-eslint/require-description': 'off',
    },
  }
]
