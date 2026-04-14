import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers, collectTopLevelBindings } from './binding-initializers.js'
import { isTopLevel } from './scope-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `css-variables/${name}`,
);



/**
 * ESLint rule: enforce-variable-conventions
 * 
 * Purpose:
 * - Enforce naming and typing conventions for CSS variable constants.
 * - Ensure CSS variables are centralized in the correct files.
 * 
 * Requirements:
 * - Must be a variable typed as `CssVars` (imported from `@cssfn/core`).
 * - Cannot be a function (function declaration, function expression, or arrow function).
 * - Must be declared only in `css-variables.ts` or `css-internal-variables.ts`.
 * 
 * CSS variable candidates:
 * - Identified by names that end with "Vars".
 * 
 * Examples:
 * - `export const activeStateVars: CssVars = ...`
 * - `export const [activeStateVars] = cssVars<ActiveStateVars>(...)`
 * 
 * Why:
 * - Prevents scattering inconsistent CSS variable definitions across the codebase.
 * - Ensures type safety and readability by enforcing correct imports and naming conventions.
 * - Centralizes CSS variable definitions for discoverability.
 */
export const enforceVariableConventions = createRule({
    name : 'enforce-variable-conventions',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require CSS variables to be correctly named, typed, and declared only in `css-variables.ts` or `css-internal-variables.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile : 'CSS variables must be declared in `css-variables.ts` or `css-internal-variables.ts`.',
            wrongType : 'CSS variables must be typed `CssVars` from `@cssfn/core`.',
        },
    },
    
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-variables.ts', 'css-internal-variables.ts'].includes(basename);
        
        
        
        // Flags to track whether types were imported from `@cssfn/core`:
        let isCssVarsImported       = false;
        // let isFutureTypeImported = false;
        
        
        
        // Flags to track whether functions were imported from `@cssfn/core`:
        let isCssVarsFunctionImported = false;
        // let isFutureFunctionImported = false;
        
        
        
        // Helper functions:
        
        /**
         * Validates the type is `CssVars` (from `@cssfn/core`).
         */
        const isValidType = (returnAnn: TSESTree.TypeNode | undefined): boolean => {
            // Ensure the required import is present:
            if (!isCssVarsImported) return false;
            
            
            
            // Must be a type reference to `CssVars`:
            return (
                !!returnAnn
                &&
                (returnAnn.type === TSESTree.AST_NODE_TYPES.TSTypeReference)
                &&
                (returnAnn.typeName.type === TSESTree.AST_NODE_TYPES.Identifier)
                &&
                (returnAnn.typeName.name === 'CssVars')
            );
        };
        
        
        
        return {
            /**
             * Detect import of `CssVars` from `@cssfn/core`.
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
                
                // Check if `CssVars` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'CssVars'))) {
                    isCssVarsImported = true;
                } // if
                
                // Check if `cssVars()` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'cssVars'))) {
                    isCssVarsFunctionImported = true;
                } // if
            },
            
            
            
            /**
             * Inspect function declarations.
             * Handles CSS variable functions (the CSS variables are should never be functions).
             */
            FunctionDeclaration(node) {
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // CSS variable candidates:
                // - Identified by names that end with "Vars".
                // - No need for a case boundary check before "Vars":
                //   matches camelCase and PascalCase names like `outlineVars`, `flowDirectionVars`,
                //   and even acronym-based names like `someCSSVars`.
                if (!/Vars$/.test(name)) return;
                
                
                
                // Enforce not being a function:
                context.report({ node, messageId: 'wrongType' });
                
                
                
                // Enforce file location:
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
            },
            
            
            
            /**
             * Inspect variable declarations.
             * Handles CSS variable constants.
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
                    
                    
                    
                    // Get the binding name for easy access:
                    const bindingName = id.name;
                    
                    
                    
                    // CSS variable candidates:
                    // - Identified by names that end with "Vars".
                    // - No need for a case boundary check before "Vars":
                    //   matches camelCase and PascalCase names like `outlineVars`, `flowDirectionVars`,
                    //   and even acronym-based names like `someCSSVars`.
                    if (!/Vars$/.test(bindingName)) return;
                    
                    
                    
                    // Case 1: Function initializer (either arrow or function expression):
                    if (value && ((value.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))) {
                        // Enforce implicit type annotation from `cssVars()`'s return type:
                        context.report({ node: id, messageId: 'wrongType' });
                    } // if
                    
                    
                    
                    // Case 2: Constant initializer (string literal, etc.):
                    // - Example: `export const bareVars: CssVars = ...`
                    else {
                        if (id.typeAnnotation) {
                            // Enforce explicit type annotation on the variable identifier:
                            if (!isValidType(id.typeAnnotation.typeAnnotation)) {
                                context.report({ node: id, messageId: 'wrongType' });
                            } // if
                        }
                        else {
                            // Enforce implicit type annotation from `cssVars()`'s return type:
                            if (!isCssVarsFunctionImported || !node.init || (node.init.type !== TSESTree.AST_NODE_TYPES.CallExpression) || (node.init.callee.type !== TSESTree.AST_NODE_TYPES.Identifier) || (node.init.callee.name !== 'cssVars')) {
                                context.report({ node: id, messageId: 'wrongType' });
                            } // if
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
 * ESLint rule: enforce-cssvars-function-usage
 * 
 * Purpose:
 * - Ensure `cssVars` function usages are centralized in the correct files.
 * 
 * Requirements:
 * - Must be used only in `css-variables.ts` or `css-internal-variables.ts`.
 * 
 * Function candidates:
 * - Identified by names that exactly match "cssVars".
 * - Identified as a function declaration, function expression, or arrow function.
 * - Identified imported from `@cssfn/core`.
 * 
 * Why:
 * - Centralizes `cssVars` function usages for discoverability.
 */
export const enforceCssVarsFunctionUsage = createRule({
    name : 'enforce-cssvars-function-usage',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `cssVars` function usages only in `css-variables.ts` or `css-internal-variables.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile : '`cssVars` function usages must be in `css-variables.ts` or `css-internal-variables.ts`.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-variables.ts', 'css-internal-variables.ts'].includes(basename);
        
        
        
        // Flags to track whether functions were imported from `@cssfn/core`:
        let isCssVarsFunctionImported = false;
        // let isFutureFunctionImported = false;
        
        
        
        return {
            /**
             * Detect imports of `cssVars()` from `@cssfn/core`.
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
                
                // Check if `cssVars()` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'cssVars'))) {
                    isCssVarsFunctionImported = true;
                } // if
            },
            
            
            
            /**
             * Detects function usages.
             * Handles `cssVars()` usages.
             */
            CallExpression(node) {
                // Ensure the function has an identifier name:
                if ((node.callee.type !== 'Identifier') || (node.callee.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.callee.name;
                
                
                
                // Function candidates:
                // - Identified by names that exactly match "cssVars".
                // - Identified imported from `@cssfn/core`.
                if (
                    (name === 'cssVars')
                    ||
                    !isCssVarsFunctionImported
                ) return;
                
                
                
                // Enforce file location:
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
            },
        };
    },
});



/**
 * ESLint rule: no-foreign-code
 * 
 * Purpose:
 * - Prevent arbitrary/foreign code inside `css-variables.ts` and `css-internal-variables.ts`.
 * - All supporting logic must live in separate modules and be imported.
 * 
 * Requirements:
 * - Allowed top-level statements:
 *   - Import declarations.
 *   - CSS variables (ending with `Vars`).
 *   - Comments.
 * - Disallow any other top-level code.
 * 
 * CSS variable candidates:
 * - Identified by names that end with "Vars".
 * 
 * Why:
 * - Keeps CSS variable modules clean and focused.
 * - Improves maintainability by restricting logic to proper CSS-variable-related logics only.
 */
export const noForeignCode = createRule({
    name : 'no-foreign-code',
    meta: {
        type: 'problem',
        docs: {
            description : 'Disallow arbitrary code in `css-variables.ts` and `css-internal-variables.ts`. Only imports, CSS variables, and comments are allowed.',
        },
        schema: [], // no options accepted
        messages: {
            foreignCode : 'Only imports, CSS variables, and comments are allowed in `css-variables.ts` / `css-internal-variables.ts`. Move supporting code to separate modules.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-variables.ts', 'css-internal-variables.ts'].includes(basename);
        
        
        
        return {
            /**
             * When visiting a Program node, validate the entire file structure
             * if it's a `css-variables.ts` or `css-internal-variables.ts` file.
             */
            Program(node) {
                // Only validate file structure if we're in an expected module:
                if (!isExpectedModule) return;
                
                
                
                // Validate all top-level bindings in the file:
                for (const { id } of collectTopLevelBindings(node)) {
                    // If there's no identifier (shouldn't happen for named bindings), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Get the binding name for easy access:
                    const bindingName = id.name;
                    
                    
                    
                    // CSS variable candidates:
                    // - Identified by names that end with "Vars".
                    // - No need for a case boundary check before "Vars":
                    //   matches camelCase and PascalCase names like `outlineVars`, `flowDirectionVars`,
                    //   and even acronym-based names like `someCSSVars`.
                    // - CSS variables should never be functions,
                    //   the `enforce-variable-conventions` rule will handle that check separately.
                    if (/Vars$/.test(bindingName)) continue;
                    
                    
                    
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
