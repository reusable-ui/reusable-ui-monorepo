import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'



const createRule = ESLintUtils.RuleCreator(
    name => `eslint-rules/${name}`,
);

/**
 * ESLint rule: enforceCssSelectors
 * 
 * Purpose:
 * - Enforce naming and typing conventions for CSS selector constants and functions.
 * - Enforce conventions for conditional `if*` helpers.
 * 
 * Selectors:
 * - Variables/functions must:
 *   - Start with `is`, `not`, or `was`, followed by PascalCase, and end with `Selector`
 *   - Selector constants must be typed `CssSelectorCollection` (imported from `@cssfn/core`)
 *   - Selector functions must return `CssSelectorCollection` (imported from `@cssfn/core`)
 *   - Selector functions must have at least 1 parameter (unparameterized functions should be constants instead)
 *   - Be declared only in `css-selectors.ts` or `css-internal-selectors.ts`
 * 
 * Selector pattern examples:
 *   - Constant: `export const isBareSelector: CssSelectorCollection = ".is-bare"`
 *   - Function declaration: `export function isBareOfSelector<T>(param: T): CssSelectorCollection { ... }`
 *   - Function expression: `export const isBareOfSelector = function<T>(param: T): CssSelectorCollection { ... }`
 *   - Arrow function: `export const isBareOfSelector = <T>(param: T): CssSelectorCollection => ...`
 * 
 * If* helpers:
 * - Functions must:
 *   - Start with `if`
 *   - Have at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`)
 *   - Have a return type of `CssRule` (from `@cssfn/core`)
 *   - Be declared only in `css-selectors.ts` or `css-internal-selectors.ts`
 * 
 * If* helper pattern examples:
 *   - Function declaration: `export function ifActive(param: CssStyleCollection): CssRule { ... }`
 *   - Function expression: `export const ifActive = function(param: CssStyleCollection): CssRule { ... }`
 *   - Arrow function: `export const ifActive = (param: CssStyleCollection): CssRule => ...`
 * 
 * Why:
 * - Centralizes selector definitions and conditional helpers in one module for maintainability.
 * - Prevents scattering inconsistent selector constants and helpers across the codebase.
 * - Ensures type safety by requiring correct imports from `@cssfn/core`.
 * - Ensures correct location and naming conventions for selectors and helpers for better readability and discoverability.
 */
export const enforceCssSelectors = createRule({
    name : 'enforce-css-selectors',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require selector variables/functions and if* helpers to be correctly typed and declared only in `css-selectors.ts` or `css-internal-selectors.ts`',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile : 'Selectors and if* helpers must be declared in `css-selectors.ts` or `css-internal-selectors.ts`.',
            wrongType : 'Selectors must be typed as `CssSelectorCollection` from `@cssfn/core`.',
            wrongName : 'Selector names must start with `is`/`not`/`was` and end with `Selector`.',
            noParams  : 'Selector functions must have at least 1 parameter. Use a constant instead.',
        },
    },
    
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-selectors.ts', 'css-internal-selectors.ts'].includes(basename);
        
        
        
        // Flags to track whether types were imported from `@cssfn/core`:
        let isCssSelectorCollectionImported = false;
        let isCssStyleCollectionImported    = false;
        let isCssRuleImported               = false;
        
        
        
        /**
         * Validates the return type is `CssSelectorCollection` (from `@cssfn/core`).
         */
        const isValidReturnType = (returnAnn: TSESTree.TypeNode | undefined): boolean => {
            // Ensure the required import is present:
            if (!isCssSelectorCollectionImported) return false;
            
            
            
            // Must have return type `CssSelectorCollection`:
            return (
                !!returnAnn
                &&
                (returnAnn.type === TSESTree.AST_NODE_TYPES.TSTypeReference)
                &&
                (returnAnn.typeName.type === TSESTree.AST_NODE_TYPES.Identifier)
                &&
                (returnAnn.typeName.name === 'CssSelectorCollection')
            );
        };
        
        /**
         * Validates naming convention for selectors.
         * 
         * Requirements:
         * - Must start with one of: `is`, `not`, or `was`.
         * - The next character must be uppercase (PascalCase boundary).
         * - Must end with `Selector`.
         * 
         * Examples:
         * - ✅ `isOutlinedSelector`
         * - ✅ `notActiveSelector`
         * - ✅ `wasHoveredSelector`
         * - ❌ `selectorIsOutlined` (wrong order)
         * - ❌ `isoutlinedSelector` (missing case boundary)
         */
        const isValidSelectorName = (name: string): boolean => {
            return /^(is|not|was)(?=[A-Z]).*Selector$/.test(name);
        };
        
        /**
         * Checks if a function candidate matches the "if* helper" shape.
         * 
         * Requirements:
         * - At least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
         * - Return type must be `CssRule` (from `@cssfn/core`).
         * - Both types must be imported from `@cssfn/core`.
         */
        const isCandidateIfFunction = (node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression): boolean => {
            // Ensure the required imports are present:
            if (!isCssStyleCollectionImported) return false;
            if (!isCssRuleImported) return false;
            
            
            
            // Must have a parameter typed as `CssStyleCollection`:
            if (!node.params.some((param): boolean => {
                if (param.type !== TSESTree.AST_NODE_TYPES.Identifier) return false;
                
                
                
                const paramAnn = param.typeAnnotation?.typeAnnotation;
                if (
                    !paramAnn
                    ||
                    (paramAnn.type !== TSESTree.AST_NODE_TYPES.TSTypeReference)
                    ||
                    (paramAnn.typeName.type !== TSESTree.AST_NODE_TYPES.Identifier)
                    ||
                    (paramAnn.typeName.name !== 'CssStyleCollection')
                ) return false;
                
                
                
                // All checks passed, this parameter is valid:
                return true;
            })) return false;
            
            
            
            // Must have return type `CssRule`:
            const returnAnn = node.returnType?.typeAnnotation;
            if (
                !returnAnn
                ||
                (returnAnn.type !== TSESTree.AST_NODE_TYPES.TSTypeReference)
                ||
                (returnAnn.typeName.type !== TSESTree.AST_NODE_TYPES.Identifier)
                ||
                (returnAnn.typeName.name !== 'CssRule')
            ) return false;
            
            
            
            // All checks passed, this if* helper function is valid:
            return true;
        };
        
        
        
        return {
            /**
             * Detect imports of `CssSelectorCollection`, `CssStyleCollection`, and `CssRule` from `@cssfn/core`.
             * Set flags so later checks know these identifiers are the correct ones.
             */
            ImportDeclaration(node) {
                // Only check imports from `@cssfn/core`:
                if (node.source.value !== '@cssfn/core') return;
                
                
                
                // Determine which relevant types are imported:
                const importedSpecifiers = node.specifiers.filter((specifier): specifier is TSESTree.ImportSpecifier & { imported: TSESTree.Identifier } =>
                    ('imported' in specifier)
                    &&
                    specifier.imported instanceof Object
                );
                
                // Check if `CssSelectorCollection` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'CssSelectorCollection'))) {
                    isCssSelectorCollectionImported = true;
                } // if
                
                // Check if `CssStyleCollection` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'CssStyleCollection'))) {
                    isCssStyleCollectionImported = true;
                } // if
                
                // Check if `CssRule` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'CssRule'))) {
                    isCssRuleImported = true;
                } // if
            },
            
            
            
            /**
             * Inspect function declarations.
             * Handle both selector functions and if* helpers.
             */
            FunctionDeclaration(node) {
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // Selector functions:
                // - Identified by names that end with "Selector".
                // - Avoid conflicts with if* helpers that start with "if".
                // - No need for a case boundary check before "Selector":
                //   matches camelCase and PascalCase names like `isOutlinedSelector`, `flowDirectionStartSelector`,
                //   and even acronym-based names like `isSomeCSSSelector`.
                if (/Selector$/.test(name)) {
                    // Enforce naming convention:
                    if (!isValidSelectorName(name)) {
                        context.report({ node, messageId: 'wrongName' });
                    } // if
                    
                    
                    
                    // Enforce return type annotation on the function itself:
                    if (!isValidReturnType(node.returnType?.typeAnnotation)) {
                        context.report({ node, messageId: 'wrongType' });
                    } // if
                    
                    
                    
                    // Enforce at least 1 parameter:
                    if (node.params.length === 0) {
                        context.report({ node, messageId: 'noParams' });
                    } // if
                    
                    
                    
                    // Enforce file location:
                    if (!isExpectedModule) {
                        context.report({ node, messageId: 'wrongFile' });
                    } // if
                } // if
                
                
                
                // If* helpers:
                // - Identified by names that start with "if".
                // - Avoids conflicts with selector functions that end with "Selector".
                // - Requires a case boundary check after "if" to avoid matching lowercase continuations
                //   like `iffunctionSelector`. Ensures the next character is not lowercase.
                //   Matches names like `ifOutlined`, `ifFlowDirectionStart`, etc.
                else if (
                    /^if(?![a-z])/.test(name)
                    &&
                    isCandidateIfFunction(node)
                ) {
                    // Enforce file location:
                    if (!isExpectedModule) {
                        context.report({ node, messageId: 'wrongFile' });
                    } // if
                } // if
            },
            
            
            
            /**
             * Inspect variable declarations.
             * Handle both selector variables and if* helpers.
             */
            VariableDeclarator(node) {
                // Ensure the variable has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the variable name for easy access:
                const name = node.id.name;
                
                
                
                // Selector variables:
                // - Identified by names that end with "Selector".
                // - Avoid conflicts with if* helpers that start with "if".
                // - No need for a case boundary check before "Selector":
                //   matches camelCase and PascalCase names like `isOutlinedSelector`, `flowDirectionStartSelector`,
                //   and even acronym-based names like `isSomeCSSSelector`.
                if (/Selector$/.test(name)) {
                    // Enforce naming convention:
                    if (!isValidSelectorName(name)) {
                        context.report({ node, messageId: 'wrongName' });
                    } // if
                    
                    
                    
                    // Case 1: Function initializer (either arrow or function expression):
                    // - Example function expression : `export const isBareOfSelector = function<T>(param: T): CssSelectorCollection { ... }`
                    // - Example arrow function      : `export const isBareOfSelector = <T>(param: T): CssSelectorCollection => ...`
                    if (node.init && ((node.init.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (node.init.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))) {
                        // Enforce return type annotation on the function itself:
                        if (!isValidReturnType(node.init.returnType?.typeAnnotation)) {
                            context.report({ node, messageId: 'wrongType' });
                        } // if
                        
                        
                        
                        // Enforce at least 1 parameter:
                        if (node.init.params.length === 0) {
                            context.report({ node, messageId: 'noParams' });
                        } // if
                    } // if
                    
                    
                    
                    // Case 2: Constant initializer (string literal, etc.):
                    // - Example: `export const isBareSelector: CssSelectorCollection = '.is-bare'`
                    else {
                        // Enforce type annotation on the variable identifier:
                        if (!isValidReturnType(node.id.typeAnnotation?.typeAnnotation)) {
                            context.report({ node, messageId: 'wrongType' });
                        } // if
                    } // if
                    
                    
                    
                    // Enforce file location:
                    if (!isExpectedModule) {
                        context.report({ node, messageId: 'wrongFile' });
                    } // if
                } // if
                
                
                
                // If* helpers:
                // - Identified by names that start with "if".
                // - Avoids conflicts with selector functions that end with "Selector".
                // - Requires a case boundary check after "if" to avoid matching lowercase continuations
                //   like `iffunctionSelector`. Ensures the next character is not lowercase.
                //   Matches names like `ifOutlined`, `ifFlowDirectionStart`, etc.
                else if (
                    /^if(?![a-z])/.test(name)
                    &&
                    node.init && ((node.init.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (node.init.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))
                    &&
                    isCandidateIfFunction(node.init)
                ) {
                    // Enforce file location:
                    if (!isExpectedModule) {
                        context.report({ node, messageId: 'wrongFile' });
                    } // if
                } // if
            },
        };
    },
});
