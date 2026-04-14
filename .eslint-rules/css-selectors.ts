import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers, collectTopLevelBindings } from './binding-initializers.js'
import { isTopLevel } from './scope-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `css-selectors/${name}`,
);



/**
 * ESLint rule: enforce-selector-conventions
 * 
 * Purpose:
 * - Enforce naming and typing conventions for CSS selector constants and functions.
 * - Ensure CSS selectors are centralized in the correct files.
 * 
 * Requirements:
 * - Start with `is`, `not`, or `was`, followed by PascalCase, and end with `Selector`.
 * - Must be declared only in `css-selectors.ts` or `css-internal-selectors.ts`.
 * - Selector constants:
 *   - Must be typed as `CssSelectorCollection` (imported from `@cssfn/core`).
 * - Selector functions (function declaration, function expression, or arrow function):
 *   - Must return `CssSelectorCollection` (imported from `@cssfn/core`).
 *   - Must have at least one parameter (unparameterized functions should be constants instead).
 * 
 * CSS selector candidates:
 * - Identified by names that end with "Selector".
 * 
 * Examples:
 * - Constant: `export const isBareSelector: CssSelectorCollection = ".is-bare"`
 * - Function declaration: `export function isBareOfSelector<T>(param: T): CssSelectorCollection { ... }`
 * - Function expression: `export const isBareOfSelector = function<T>(param: T): CssSelectorCollection { ... }`
 * - Arrow function: `export const isBareOfSelector = <T>(param: T): CssSelectorCollection => ...`
 * 
 * Why:
 * - Prevents scattering inconsistent CSS selector definitions across the codebase.
 * - Ensures type safety and readability by enforcing correct imports and naming conventions.
 * - Centralizes CSS selector definitions for discoverability.
 */
export const enforceSelectorConventions = createRule({
    name : 'enforce-selector-conventions',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require CSS selector constants/functions to be correctly named, typed, and declared only in `css-selectors.ts` or `css-internal-selectors.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile : 'CSS selectors must be declared in `css-selectors.ts` or `css-internal-selectors.ts`.',
            wrongType : 'CSS selectors must be typed or return `CssSelectorCollection` from `@cssfn/core`.',
            wrongName : 'CSS selector names must start with `is`/`not`/`was` and end with `Selector`.',
            noParams  : 'CSS selector functions must have at least one parameter. Use a constant instead.',
        },
    },
    
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-selectors.ts', 'css-internal-selectors.ts'].includes(basename);
        
        
        
        // Flags to track whether types were imported from `@cssfn/core`:
        let isCssSelectorCollectionImported = false;
        // let isFutureTypeImported         = false;
        
        
        
        // Helper functions:
        
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
         * Validates naming convention for CSS selectors.
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
        
        
        
        return {
            /**
             * Detect import of `CssSelectorCollection` from `@cssfn/core`.
             * Set the flag so later checks know this identifier is the correct one.
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
            },
            
            
            
            /**
             * Inspect function declarations.
             * Handles CSS selector functions.
             */
            FunctionDeclaration(node) {
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // CSS selector candidates:
                // - Identified by names that end with "Selector".
                // - No need for a case boundary check before "Selector":
                //   matches camelCase and PascalCase names like `isOutlinedSelector`, `flowDirectionStartSelector`,
                //   and even acronym-based names like `isSomeCSSSelector`.
                if (!/Selector$/.test(name)) return;
                
                
                
                // Enforce naming convention:
                if (!isValidSelectorName(name)) {
                    context.report({ node, messageId: 'wrongName' });
                } // if
                
                
                
                // Enforce return type annotation on the function itself:
                if (!isValidReturnType(node.returnType?.typeAnnotation)) {
                    context.report({ node, messageId: 'wrongType' });
                } // if
                
                
                
                // Enforce at least one parameter:
                if (node.params.length === 0) {
                    context.report({ node, messageId: 'noParams' });
                } // if
                
                
                
                // Enforce file location:
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
            },
            
            
            
            /**
             * Inspect variable declarations.
             * Handles CSS selector as constants, function expressions, or arrow functions.
             */
            VariableDeclarator(node) {
                // Only validate top-level variable declarations:
                // - Prevents false positives from nested variables inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Collect all binding identifiers and their initializers for validation:
                const bindingInitializerList = collectBindingInitializers(node);
                
                
                
                // Validate each binding item:
                for (const { id, value } of bindingInitializerList) {
                    // If there's no identifier (shouldn't happen for valid exports), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Store the variable name for easy access:
                    const bindingName = id.name;
                    
                    
                    
                    // CSS selector candidates:
                    // - Identified by names that end with "Selector".
                    // - No need for a case boundary check before "Selector":
                    //   matches camelCase and PascalCase names like `isOutlinedSelector`, `flowDirectionStartSelector`,
                    //   and even acronym-based names like `isSomeCSSSelector`.
                    if (!/Selector$/.test(bindingName)) return;
                    
                    
                    
                    // Enforce naming convention:
                    if (!isValidSelectorName(bindingName)) {
                        context.report({ node: id, messageId: 'wrongName' });
                    } // if
                    
                    
                    
                    // Case 1: Function initializer (either arrow or function expression):
                    // - Example function expression : `export const isBareOfSelector = function<T>(param: T): CssSelectorCollection { ... }`
                    // - Example arrow function      : `export const isBareOfSelector = <T>(param: T): CssSelectorCollection => ...`
                    if (value && ((value.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))) {
                        // Enforce return type annotation on the function itself:
                        if (!isValidReturnType(value.returnType?.typeAnnotation)) {
                            context.report({ node: id, messageId: 'wrongType' });
                        } // if
                        
                        
                        
                        // Enforce at least one parameter:
                        if (value.params.length === 0) {
                            context.report({ node: id, messageId: 'noParams' });
                        } // if
                    } // if
                    
                    
                    
                    // Case 2: Constant initializer (string literal, etc.):
                    // - Example: `export const isBareSelector: CssSelectorCollection = '.is-bare'`
                    else {
                        // Enforce type annotation on the variable identifier:
                        if (!isValidReturnType(id.typeAnnotation?.typeAnnotation)) {
                            context.report({ node: id, messageId: 'wrongType' });
                        } // if
                    } // if
                    
                    
                    
                    // Enforce file location:
                    if (!isExpectedModule) {
                        context.report({ node: id, messageId: 'wrongFile' });
                    } // if
                } // for
            },
        };
    },
});



/**
 * ESLint rule: enforce-if-function-conventions
 * 
 * Purpose:
 * - Ensure `if*` functions are centralized in the correct files.
 * 
 * Requirements:
 * - Must be declared only in `css-selectors.ts` or `css-internal-selectors.ts`.
 * 
 * Function candidates:
 * - Identified by names that start with "if", followed by a case boundary (next char is not lowercase).
 * - Identified as a function declaration, function expression, or arrow function.
 * - Identified having at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
 * - Identified having a return type of `CssRule` (from `@cssfn/core`).
 * 
 * Examples:
 * - Function declaration: `export function ifActive(param: CssStyleCollection): CssRule { ... }`
 * - Function expression: `export const ifActive = function(param: CssStyleCollection): CssRule { ... }`
 * - Arrow function: `export const ifActive = (param: CssStyleCollection): CssRule => ...`
 * 
 * Why:
 * - Centralizes `if*` functions for discoverability.
 */
export const enforceIfFunctionConventions = createRule({
    name : 'enforce-if-function-conventions',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `if*` functions to be correctly named, typed, and declared only in `css-selectors.ts` or `css-internal-selectors.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile : '`if*` functions must be declared in `css-selectors.ts` or `css-internal-selectors.ts`.',
            wrongType : '`if*` functions must accept `CssStyleCollection` and return `CssRule` from `@cssfn/core`.',
            wrongName : '`if*` functions names must start with `if`.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-selectors.ts', 'css-internal-selectors.ts'].includes(basename);
        
        
        
        // Flags to track whether types were imported from `@cssfn/core`:
        let isCssStyleCollectionImported = false;
        let isCssRuleImported            = false;
        
        
        
        // Helper functions:
        
        /**
         * Checks if a function candidate matches the `if*` function shape.
         * 
         * Requirements:
         * - At least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
         * - Return type must be `CssRule` (from `@cssfn/core`).
         */
        const isCandidateIfFunction = (functionAnn: TSESTree.Node): boolean => {
            // Ensure the required imports are present:
            if (!isCssStyleCollectionImported) return false;
            if (!isCssRuleImported) return false;
            
            
            
            // Ensure the node is a function declaration, function overload, function expression, or arrow function:
            if (!(
                functionAnn.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration
                ||
                functionAnn.type === TSESTree.AST_NODE_TYPES.TSDeclareFunction
                ||
                functionAnn.type === TSESTree.AST_NODE_TYPES.FunctionExpression
                ||
                functionAnn.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
            )) return false;
            
            
            
            // Identified having a parameter typed as `CssStyleCollection`:
            if (!functionAnn.params.some((param): boolean => {
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
            
            
            
            // Identified having return type `CssRule`:
            const returnAnn = functionAnn.returnType?.typeAnnotation;
            if (
                !returnAnn
                ||
                (returnAnn.type !== TSESTree.AST_NODE_TYPES.TSTypeReference)
                ||
                (returnAnn.typeName.type !== TSESTree.AST_NODE_TYPES.Identifier)
                ||
                (returnAnn.typeName.name !== 'CssRule')
            ) return false;
            
            
            
            // All identification checks passed, this is a valid `if*` function candidate:
            return true;
        };
        
        
        
        return {
            /**
             * Detect imports of `CssStyleCollection` and `CssRule` from `@cssfn/core`.
             * Set the flags so later checks know these identifiers are the correct ones.
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
             * Handles `if*` functions.
             */
            FunctionDeclaration(node) {
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // Function candidates:
                // - Identified by names that start with "if", followed by a case boundary (next char is not lowercase).
                //   Requires a case boundary check after "if" to avoid matching lowercase continuations
                //   like `iffunctionSelector`. Ensures the next character is not lowercase.
                //   Matches names like `ifOutlined`, `ifFlowDirectionStart`, etc.
                // - Identified having at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
                // - Identified having a return type of `CssRule` (from `@cssfn/core`).
                if (
                    !/^if(?![a-z])/.test(name)
                    ||
                    !isCandidateIfFunction(node)
                ) return;
                
                
                
                // Enforce file location:
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
            },
            
            
            
            /**
             * Inspect variable declarations.
             * Handles `if*` functions.
             */
            VariableDeclarator(node) {
                // Only validate top-level variable declarations:
                // - Prevents false positives from nested variables inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Collect all binding identifiers and their initializers for validation:
                const bindingInitializerList = collectBindingInitializers(node);
                
                
                
                // Validate each binding item:
                for (const { id, value } of bindingInitializerList) {
                    // If there's no identifier (shouldn't happen for valid exports), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Store the variable name for easy access:
                    const bindingName = id.name;
                    
                    
                    
                    // Function candidates:
                    // - Identified by names that start with "if", followed by a case boundary (next char is not lowercase).
                    //   Requires a case boundary check after "if" to avoid matching lowercase continuations
                    //   like `iffunctionSelector`. Ensures the next character is not lowercase.
                    //   Matches names like `ifOutlined`, `ifFlowDirectionStart`, etc.
                    // - Identified as a function expression or arrow function initializer.
                    // - Identified having at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
                    // - Identified having a return type of `CssRule` (from `@cssfn/core`).
                    if (
                        !/^if(?![a-z])/.test(bindingName)
                        ||
                        !value
                        ||
                        !((value.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))
                        ||
                        !isCandidateIfFunction(value)
                    ) return;
                    
                    
                    
                    // Enforce file location:
                    if (!isExpectedModule) {
                        context.report({ node: id, messageId: 'wrongFile' });
                    } // if
                } // for
            },
        };
    },
});



/**
 * ESLint rule: no-foreign-code
 * 
 * Purpose:
 * - Prevent arbitrary/foreign code inside `css-selectors.ts` and `css-internal-selectors.ts`.
 * - All supporting logic must live in separate modules and be imported.
 * 
 * Requirements:
 * - Allowed top-level statements:
 *   - Import declarations.
 *   - Exported CSS selector constants/functions (ending with `Selector`).
 *   - Exported `if*` functions which accept `CssStyleCollection` and return `CssRule` from `@cssfn/core`.
 *   - Comments.
 * - Disallow any other top-level code.
 * - Disallow general `if*` functions that do not match the required signature.
 * 
 * CSS selector candidates:
 * - Identified by names that end with "Selector".
 * 
 * `if*` function candidates:
 * - Identified by names that start with "if", followed by a case boundary (next char is not lowercase).
 * - Identified as a function declaration, function expression, or arrow function.
 * - Identified having at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
 * - Identified having a return type of `CssRule` (from `@cssfn/core`).
 * 
 * Why:
 * - Keeps CSS selector modules clean and focused.
 * - Improves maintainability by restricting logic to proper CSS-selector-related logics only.
 */
export const noForeignCode = createRule({
    name : 'no-foreign-code',
    meta: {
        type: 'problem',
        docs: {
            description : 'Disallow arbitrary code in `css-selectors.ts` and `css-internal-selectors.ts`. Only imports, CSS selector exports, `if*` function exports, and comments are allowed.',
        },
        schema: [], // no options accepted
        messages: {
            foreignCode : 'Only imports, CSS selector exports, `if*` function exports, and comments are allowed in `css-selectors.ts` / `css-internal-selectors.ts`. Move supporting code to separate modules.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-selectors.ts', 'css-internal-selectors.ts'].includes(basename);
        
        
        
        // Flags to track whether types were imported from `@cssfn/core`:
        let isCssStyleCollectionImported = false;
        let isCssRuleImported            = false;
        
        
        
        // Helper functions:
        
        /**
         * Checks if a function candidate matches the `if*` function shape.
         * 
         * Requirements:
         * - At least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
         * - Return type must be `CssRule` (from `@cssfn/core`).
         */
        const isCandidateIfFunction = (functionAnn: TSESTree.Node): boolean => {
            // Ensure the required imports are present:
            if (!isCssStyleCollectionImported) return false;
            if (!isCssRuleImported) return false;
            
            
            
            // Ensure the node is a function declaration, function overload, function expression, or arrow function:
            if (!(
                functionAnn.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration
                ||
                functionAnn.type === TSESTree.AST_NODE_TYPES.TSDeclareFunction
                ||
                functionAnn.type === TSESTree.AST_NODE_TYPES.FunctionExpression
                ||
                functionAnn.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
            )) return false;
            
            
            
            // Identified having a parameter typed as `CssStyleCollection`:
            if (!functionAnn.params.some((param): boolean => {
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
            
            
            
            // Identified having return type `CssRule`:
            const returnAnn = functionAnn.returnType?.typeAnnotation;
            if (
                !returnAnn
                ||
                (returnAnn.type !== TSESTree.AST_NODE_TYPES.TSTypeReference)
                ||
                (returnAnn.typeName.type !== TSESTree.AST_NODE_TYPES.Identifier)
                ||
                (returnAnn.typeName.name !== 'CssRule')
            ) return false;
            
            
            
            // All identification checks passed, this is a valid `if*` function candidate:
            return true;
        };
        
        
        
        return {
            /**
             * When visiting a Program node, validate the entire file structure
             * if it's a `css-selectors.ts` or `css-internal-selectors.ts` file.
             */
            Program(node) {
                // Only validate file structure if we're in an expected module:
                if (!isExpectedModule) return;
                
                
                
                // Validate all top-level bindings in the file:
                for (const { id, value } of collectTopLevelBindings(node)) {
                    // If there's no identifier (shouldn't happen for named bindings), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Get the binding name for easy access:
                    const bindingName = id.name;
                    
                    
                    
                    // CSS selector candidates:
                    // - Identified by names that end with "Selector".
                    // - No need for a case boundary check before "Selector":
                    //   matches camelCase and PascalCase names like `isOutlinedSelector`, `flowDirectionStartSelector`,
                    //   and even acronym-based names like `isSomeCSSSelector`.
                    if (/Selector$/.test(bindingName)) continue;
                    
                    
                    
                    // `if*` function candidates:
                    // - Identified by names that start with "if", followed by a case boundary (next char is not lowercase).
                    //   Requires a case boundary check after "if" to avoid matching lowercase continuations
                    //   like `iffunctionSelector`. Ensures the next character is not lowercase.
                    //   Matches names like `ifOutlined`, `ifFlowDirectionStart`, etc.
                    // - Identified having at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
                    // - Identified having a return type of `CssRule` (from `@cssfn/core`).
                    if (/^if(?![a-z])/.test(bindingName) && value && isCandidateIfFunction(value)) continue;
                    
                    
                    
                    // Allow top-level comments (they don't appear as statements in AST)
                    // Comments are handled separately
                    
                    
                    
                    // Reject everything else:
                    
                    // Report the identifier node for better error highlighting:
                    // - If there's no initializer (e.g. for function declarations), report the identifier itself.
                    // - If there's an initializer, report it to indicate the problematic code.
                    context.report({ node: id, messageId: 'foreignCode' });
                } // for
            },
        };
    },
});
