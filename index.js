const { getIgnoreExports } = require('./utils');

const isLibrary = require('mapping-tools-rn/lib/utils/is-library');

const commonPlugins = [
  'import-helpers',
  'react-perf',
];

const commonPluginsTs = [
  ...commonPlugins,
  '@typescript-eslint',
];

const commonRules = {
  'quote-props': ['error', 'as-needed'],
  indent: [
    'error',
    2,
    {
      SwitchCase: 1,
    },
  ],
  semi: ['error', 'always'],
  'arrow-parens': ['error', 'as-needed'],
  'max-len': [
    'error',
    {
      code: 120,
      ignoreStrings: true,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreRegExpLiterals: true,
      ignoreTemplateLiterals: true,
    },
  ],
  'padded-blocks': [
    'error',
    {
      classes: 'always',
    },
  ],
  'global-require': 'off',
  'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
  'no-console': [
    'error',
    {
      allow: ['warn'],
    },
  ],
  'no-underscore-dangle': 'off',
  'no-multiple-empty-lines': [
    2,
    {
      max: 1,
    },
  ],
  'no-implicit-coercion': ['error', {
    boolean: true,
    number: true,
    string: true,
    allow: [],
  }],
  'array-element-newline': ['error', {
    ArrayExpression: 'consistent',
    ArrayPattern: { minItems: 3, multiline: true },
  }],
  'arrow-body-style': ['error', 'as-needed'],
  'no-unneeded-ternary': 'off',
  'class-methods-use-this': 'off',
  'prettier/prettier': 'off',
  'import/no-extraneous-dependencies': ['error',
    {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false,
      bundledDependencies: false,
    },
  ],
  'import/no-unused-modules': ['error', {
    unusedExports: true,
    ignoreExports: getIgnoreExports(),
  }],
  'import/prefer-default-export': 'off',
  'import/no-import-module-exports': 'off',
  'import-helpers/order-imports': [
    'error',
    {
      newlinesBetween: 'always',
      groups: [
        [
          '/^react$/',
          '/^react-native$/',
        ],
        'module',
        '/^~/',
        [
          'parent',
          'sibling',
          'index',
        ],
      ],
      alphabetize: {
        order: 'asc',
        ignoreCase: true,
      },
    },
  ],
  'react/jsx-no-leaked-render': ['error', {
    validStrategies: ['ternary']
  }],
  'react/prop-types': 'off',
  'react/default-props-match-prop-types': 'off',
  'react/state-in-constructor': 'off',
  'react/no-unescaped-entities': 'off',
  'react/require-default-props': 'off',
  'react/function-component-definition': [
    'error',
    {
      namedComponents: [
        'function-declaration',
        'function-expression',
        'arrow-function',
      ],
      unnamedComponents: ['function-expression', 'arrow-function'],
    },
  ],
  'react/jsx-filename-extension': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-indent': ['error', 2],
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-curly-spacing': [
    'error',
    {
      when: 'never',
      attributes: {
        when: 'never',
      },
      children: {
        when: 'never',
      },
    },
  ],
  'react-native/no-unused-styles': 'error',
  'react-hooks/exhaustive-deps': [
    'error',
    {
      additionalHooks: '(useAsync|useStyles|useViewStyles|useTextStyles|useImageStyles)',
    },
  ],
  'jsx-a11y/anchor-is-valid': 'off',
  'testing-library/prefer-screen-queries': 'off',
  'testing-library/render-result-naming-convention': 'off',
  'testing-library/no-node-access': 'off',
  'testing-library/no-unnecessary-act': ['error', { isStrict: false }],
};

const commonRulesTs = {
  ...commonRules,
  'no-shadow': 'off',
  'no-unused-vars': 'off',
  'no-undef': 'off',
  '@typescript-eslint/no-shadow': ['error'],
  '@typescript-eslint/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
  '@typescript-eslint/default-param-last': 'off',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'variable',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
    },
    {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
  ],
  '@typescript-eslint/indent': ['error', 2],
  "@typescript-eslint/member-delimiter-style": ["error", {
    "multiline": {
      "delimiter": "semi",
      "requireLast": true
    },
    "singleline": {
      "delimiter": "semi",
      "requireLast": false
    },
    "multilineDetection": "brackets"
  }],
  '@typescript-eslint/type-annotation-spacing': [
    'error',
    {
      overrides: {
        arrow: {
          before: true,
          after: true,
        },
      },
    },
  ],
};

module.exports = {
  // javascript
  ignorePatterns: ['coverage/**/*.*', 'node_modules/**/*.*'],
  parser: '@babel/eslint-parser',
  extends: ['@react-native-community', 'airbnb', 'plugin:react-perf/recommended', 'plugin:testing-library/react'],
  plugins: commonPlugins,
  rules: commonRules,
  globals: {
    jest: false,
  },
  overrides: [
    {
      // typescript
      files: ['**/*.ts?(x)'],
      extends: ['airbnb-typescript'],
      plugins: commonPluginsTs,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: commonRulesTs,
    },
    {
      // typescript stories, mock and tests files
      files: [
        isLibrary() ? 'src/**/*.ts?(x)' : null,
        '**/*.stories.ts?(x)',
        '**/*.spec.ts?(x)',
        '**/test-utils.ts?(x)'
      ].filter(Boolean),
      extends: ['airbnb-typescript'],
      plugins: commonPluginsTs,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        ...commonRulesTs,
        'import/no-extraneous-dependencies': 'off',
        'react/no-array-index-key': 'off',
        'react-native/no-inline-styles': 'off',
        'react-perf/jsx-no-new-object-as-prop': 'off',
        'react-perf/jsx-no-new-array-as-prop': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react-perf/jsx-no-jsx-as-prop': 'off',
        'import/no-unused-modules': 'off',
      },
    },
  ],
};
