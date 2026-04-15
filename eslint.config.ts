import type { Rule } from 'eslint'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import jsPlugin from '@eslint/js'
import tsPlugin from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import { enforceSelectorConventions, enforceIfFunctionConventions, noForeignCode as noForeignCodeInCssSelectors } from './.eslint-rules/css-selectors.js'
import { enforceHookConventions, noForeignCode as noForeignCodeInCssHooks } from './.eslint-rules/css-hooks.js'
import { enforceVariableConventions, enforceCssVarsFunctionUsage, noForeignCode as noForeignCodeInCssVars } from './.eslint-rules/css-variables.js'



const testDirectories = [
    '**/__tests__/**',
];

const benchmarkDirectories = [
    '**/__benchmarks__/**',
];



/**
 * Root ESLint configuration for the monorepo.
 * 
 * Structure:
 * 1. Global ignores (node_modules, test files, build artifacts, etc.)
 * 2. Base recommended configs (recommended rules for JS, TypeScript, React, etc.)
 * 3. Project-specific and test-specific configs (with custom rules, settings, and globals)
 * 4. Project-specific configs (for the main source files, with custom rules and settings)
 * 5. Test-specific configs (for test files, with custom rules and testing globals)
 * 
 * Notes:
 * - Always place overrides *after* recommended configs so they take precedence.
 * - Disable base JS rules that conflict with TypeScript constructs (overloads, generics).
 * - Custom internal rules live in `.eslint-rules/`.
 */
export default defineConfig(
    // 1. Global ignores (applies to all configs below):
    {
        ignores : [
            // Ignore external artifacts:
            '**/node_modules/**',
            
            // Ignore generated build artifacts:
            '**/dist/**',
            
            // Ignore generated test artifacts:
            '**/playwright/**',
            '**/playwright-report/**',
            '**/test-results/**',
            
            
            
            // Ignore eslint configs:
            '**/eslint.config.ts',
            
            // Ignore test configs:
            '**/jest.setup.js',
            '**/playwright.config.ts',
            '**/playwright.react.config.ts',
            
            
            
            // Ignore build scripts:
            '**/check.mjs',
            '**/build.mjs',
            
            
            
            // Ignore hidden directories:
            '**/.*/**',
            
            // Ignore test project directories (not `__tests__`):
            '**/tests/**',
            
            // Ignore not yet refactored project directories:
            '**/capabilities/**',
            '**/components/**',
            '**/*-components/**',
            '**/barrels/**',
            
            // Ignore deprecated package directories:
            '**/utilities/stripouts/**',
            '**/utilities/layouts/**',
            '**/utilities/hooks/**',
            
            '**/variants/orientationable/**',
            '**/variants/resizable/**',
            '**/variants/themeable/**',
            '**/variants/gradientable/**',
            '**/variants/outlineable/**',
            '**/variants/mildable/**',
            '**/variants/nudible/**',
            '**/variants/basic-variants/**',
            
            '**/features/background/**',
            '**/features/foreground/**',
            '**/features/colorable/**',
            '**/features/border/**',
            '**/features/ring/**',
            '**/features/padding/**',
            '**/features/animation/**',
            
            '**/states/animating-state/**',
            '**/states/excitable/**',
            '**/states/collapsible/**',
            '**/states/scrollable/**',
            '**/states/disableable/**',
            '**/states/activatable/**',
            '**/states/focusable/**',
            '**/states/interactable/**',
            '**/states/clickable/**',
            '**/states/invalidable/**',
            '**/states/checkable/**',
            '**/states/validation-icon/**',
            '**/states/accessibilities/**',
            '**/states/validations/**',
            
            '**/effects/active-as-click/**',
            
            // '**/capabilities/floatable/**',
            // '**/capabilities/global-stackable/**',
            // '**/capabilities/auto-focusable/**',
            // '**/capabilities/groupable/**',
            // '**/capabilities/pointer-capturable/**',
            
            '**/routes/client-sides/**',
        ],
    },
    
    
    
    // 2. Base recommended configs:
    ...[
        reactPlugin.configs.flat.recommended, // React rules
    ].flat().map((config) => ({
        ignores : [
            // ...(('ignores' in config) ? (config.ignores ?? []) : []),
            
            // Ignore test directories:
            ...testDirectories,
            
            // Ignore benchmark directories:
            ...benchmarkDirectories,
        ],
        ...config,
    })),
    
    ...[
        jsPlugin.configs.recommended,         // Base JS rules
        tsPlugin.configs.recommended,         // TypeScript rules
        importPlugin.flatConfigs.recommended, // Import rules
    ].flat().map((config) => ({
        ignores : [
            ...(('ignores' in config) ? (config.ignores ?? []) : []),
            
            // Ignore benchmark directories:
            ...benchmarkDirectories,
        ],
        ...config,
    })),
    
    
    
    // 3. Project-specific and test-specific configs:
    {
        files: [
            '**/src/**/*.{ts,tsx}',
            '**/__tests__/**/*.{js,jsx,ts,tsx}',
        ],
        languageOptions: {
            globals: {
                ...globals.browser, // Browser globals (window, document, etc.)
                ...globals.node,    // Node.js globals (process, __dirname, etc.)
                
                globalThis: 'readonly', // Standard global object across environments
                
                // Built-in types without need for importing:
                DOMHighResTimeStamp: 'readonly',
            },
        },
        settings: {
            react: {
                version: '19.0', // Explicit React version for linting
            },
            'import/resolver': {
                'typescript': {
                    'alwaysTryTypes': true,
                },
            },
        },
        plugins: {
            js: jsPlugin, // Core JS plugin
        },
        extends: [
            'js/recommended', // Base JS recommended rules
        ],
        rules: {
            /**
             * Disable base JS rules that conflict with TypeScript features:
             * - Overloads trigger false positives in `no-redeclare`
             * - Generic/unused type params trigger false positives in `no-unused-vars`
             */
            'no-redeclare': 'off',
            'no-unused-vars': 'off',
            
            'import/extensions': ['error', 'always', {
                js  : 'always',
                ts  : 'never',
                tsx : 'never',
            }],
            
            /**
             * Enable TypeScript-aware equivalents:
             * - Correctly handle overloads, generics, type imports
             * - Allow unused args/vars prefixed with `_` (common convention)
             */
            '@typescript-eslint/no-redeclare': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_', // Ignore unused function args starting with `_`
                    varsIgnorePattern: '^_', // Ignore unused variables starting with `_`
                },
            ],
            
            // Allow empty object types (useful for placeholders or generic constraints):
            '@typescript-eslint/no-empty-object-type': 'off',
            
            // Allow unnecessary type constraints in generics (e.g. `<T extends unknown>`):
            '@typescript-eslint/no-unnecessary-type-constraint': 'off',
            
            '@typescript-eslint/ban-ts-comment': [
                'error',
                {
                    // Allow `@ts-ignore` without restrictions:
                    'ts-ignore': false,
                    
                    // Allow `@ts-nocheck` if it includes a justification comment:
                    'ts-nocheck': 'allow-with-description',
                    
                    // Allow `@ts-check` without restrictions:
                    'ts-check': false,
                    
                    // Allow `@ts-expect-error` without restrictions:
                    'ts-expect-error': false,
                },
            ],
            
            // Allow `any` type for flexibility in certain cases (e.g. third-party integrations, complex types):
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    
    
    
    // 4. Project-specific configs:
    {
        files: [
            '**/src/**/*.{ts,tsx}',
        ],
        ignores: [
            // Ignore test directories:
            ...testDirectories,
            
            // Ignore benchmark directories:
            ...benchmarkDirectories,
        ],
        plugins: {
            'css-selectors': {
                rules: {
                    'enforce-selector-conventions'    : enforceSelectorConventions   as unknown as Rule.RuleModule,
                    'enforce-if-function-conventions' : enforceIfFunctionConventions as unknown as Rule.RuleModule,
                    'no-foreign-code'                 : noForeignCodeInCssSelectors  as unknown as Rule.RuleModule,
                },
            },
            'css-hooks': {
                rules: {
                    'enforce-hook-conventions'        : enforceHookConventions       as unknown as Rule.RuleModule,
                    'no-foreign-code'                 : noForeignCodeInCssHooks      as unknown as Rule.RuleModule,
                },
            },
            'css-variables': {
                rules: {
                    'enforce-variable-conventions'    : enforceVariableConventions    as unknown as Rule.RuleModule,
                    'enforce-cssvars-function-usage'  : enforceCssVarsFunctionUsage   as unknown as Rule.RuleModule,
                    'no-foreign-code'                 : noForeignCodeInCssVars        as unknown as Rule.RuleModule,
                },
            },
        },
        rules: {
            'import/no-extraneous-dependencies': ['error', {
                peerDependencies     : true,  // Allow peer deps imports in source files.
                devDependencies      : false, // Disallow dev deps imports in source files.
                optionalDependencies : false, // Disallow optional deps imports in source files.
                bundledDependencies  : false, // Disallow bundled deps imports in source files.
            }],
            
            // Enforce custom internal rule for CSS variable usage:
            'css-selectors/enforce-selector-conventions'    : 'error',
            'css-selectors/enforce-if-function-conventions' : 'error',
            'css-selectors/no-foreign-code'                 : 'error',
            'css-hooks/enforce-hook-conventions'            : 'error',
            'css-hooks/no-foreign-code'                     : 'error',
            'css-variables/enforce-variable-conventions'    : 'error',
            'css-variables/enforce-cssvars-function-usage'  : 'error',
            'css-variables/no-foreign-code'                 : 'error',
        },
    },
    
    
    
    // 5. Test-specific configs:
    {
        files: [
            '**/__tests__/**/*.{js,jsx,ts,tsx}',
        ],
        ignores: [
            // Ignore benchmark directories:
            ...benchmarkDirectories,
        ],
        languageOptions: {
            globals: {
                ...jestPlugin.environments.globals.globals,
            },
        },
        plugins: {
            'jest': jestPlugin,
        },
        rules: {
            'prefer-const': 'off',
            
            // 'import/no-extraneous-dependencies': ['error', {
            //     peerDependencies     : true,  // Allow peer deps imports in source files.
            //     devDependencies      : true,  // Allow dev deps imports in source files.
            //     optionalDependencies : false, // Disallow optional deps imports in source files.
            //     bundledDependencies  : false, // Disallow bundled deps imports in source files.
            // }],
            'import/no-extraneous-dependencies': 'off',
            'import/no-duplicates': 'off',
            
            '@typescript-eslint/no-unused-vars': 'off',
            
            '@typescript-eslint/no-unsafe-function-type': 'off',
        },
    },
);
