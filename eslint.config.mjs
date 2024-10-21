import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';



import expo from 'eslint-config-expo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            '**/.eslintrc.js',
            '**/reports',
            '**/node_modules',
        ]
    },
    ...compat.extends(
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'prettier'
    ),
    {
        plugins: {
            'unused-imports': unusedImports,
            '@typescript-eslint': typescriptEslintPlugin,
            'prettier': prettier,
            'react': react,
            'expo': expo
        },
        languageOptions:{
            globals:{
                ...globals.node,
                ...globals.jest,
            },
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: 'module',
            parserOptions:{
                project: 'tsconfig.json',
                tsconfigRootDir: './',
            },
        },
        settings: {
            react: {
                version: 'detect', // Adiciona a versão do React
            },
        },
        rules:{
            '@typescript-eslint/interface-name-prefix':'off',
            '@typescript-eslint/no-explicit-any':'off',
            '@typescript-eslint/no-unused-vars':'off',
            '@typescript-eslint/explicit-function-return-type':'off',
            '@typescript-eslint/no-empty-functions':'off',
            '@typescript-eslint/explicit-module-boundary-types':'off',
            "@typescript-eslint/no-empty-object-type": "off",
            'unused-imports/no-unused-imports':'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                }
            ],
            'prettier/prettier': ['error', {
                'tabWidth': 2,
                'useTabs': false,
                'singleQuote': true,
                'trailingComma': 'es5',
                'bracketSpacing': true,
                'jsxBracketSameLine': false,
                'semi': true,
                'printWidth': 80,
                'endOfLine': 'lf',
            }],
            'react/jsx-indent': ['error', 2],
            'react/jsx-indent-props': ['error', 2],
            'react/react-in-jsx-scope': 'off',          
        }
    }
];
