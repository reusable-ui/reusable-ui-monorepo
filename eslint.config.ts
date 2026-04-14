import type { Rule } from 'eslint'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import { enforceSelectorConventions, enforceIfFunctionConventions, noForeignCode as noForeignCodeInCssSelectors } from './.eslint-rules/css-selectors.js'
import { enforceHookConventions, noForeignCode as noForeignCodeInCssHooks } from './.eslint-rules/css-hooks.js'
import { enforceVariableConventions, enforceCssVarsFunctionUsage, noForeignCode as noForeignCodeInCssVars } from './.eslint-rules/css-variables.js'



/**
 * Root ESLint configuration for the monorepo.
 * 
 * Structure:
 * 1. Base configs (TypeScript + React recommended)
 * 2. Project-specific overrides (rules, plugins, ignores)
 * 
 * Notes:
 * - Always place overrides *after* recommended configs so they take precedence.
 * - Disable base JS rules that conflict with TypeScript constructs (overloads, generics).
 * - Custom internal rules live in `.eslint-rules/`.
 */
export default defineConfig(
    // 1. Base recommended configs:
    js.configs.recommended,               // Base JS rules
    tseslint.configs.recommended,         // TypeScript rules
    pluginReact.configs.flat.recommended, // React rules
    importPlugin.flatConfigs.recommended, // Import rules
    
    // 2. Global ignores (applies to all files)
    {
        ignores : [
            // Ignore external dependencies:
            '**/node_modules/**',
            
            // Ignore test-related directories:
            '**/__tests__/**',
            '**/playwright/**',
            '**/playwright-report/**',
            '**/test-results/**',
            
            // Ignore generated build artifacts:
            '**/dist/**',
            
            // Ignore hidden directories (dot-prefixed):
            '**/.*/**',
            
            // Ignore deprecated packages:
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
    
    // 3. Rules for TypeScript files (only applied if not ignored above)
    {
        languageOptions: {
            globals: {
                ...globals.browser, // Browser globals (window, document, etc.)
                ...globals.node,    // Node.js globals (process, __dirname, etc.)
                
                // Built-in types without need for importing:
                DOMHighResTimeStamp: 'readonly',
            },
        },
        files: [
            // Apply rules only to TypeScript source files:
            '**/*.{ts,tsx}',
        ],
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
            js, // Core JS plugin
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
            'import/no-extraneous-dependencies': ['error', {
                peerDependencies     : true,  // Allow peer deps imports in source files.
                devDependencies      : false, // Disallow dev deps imports in source files.
                optionalDependencies : false, // Disallow optional deps imports in source files.
                bundledDependencies  : false, // Disallow bundled deps imports in source files.
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
);
