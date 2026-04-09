import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'



const createRule = ESLintUtils.RuleCreator(
    name => `css-selectors/${name}`,
);



/**
 * ESLint rule: enforce-selector-conventions
 * 
 * Purpose:
 * - Enforce naming and typing conventions for CSS selector constants and functions.
 * - Ensure selectors are centralized in the correct files.
 * 
 * Requirements:
 * - Start with `is`, `not`, or `was`, followed by PascalCase, and end with `Selector`.
 * - Must be declared only in `css-selectors.ts` or `css-internal-selectors.ts`.
 * - Selector constants:
 *   - Must be typed as `CssSelectorCollection` (imported from `@cssfn/core`).
 * - Selector functions (arrow, function expression, or declaration):
 *   - Must return `CssSelectorCollection` (imported from `@cssfn/core`).
 *   - Must have at least one parameter (unparameterized functions should be constants instead).
 * 
 * Selector candidates:
 * - Identified by names that end with "Selector".
 * 
 * Examples:
 * - Constant: `export const isBareSelector: CssSelectorCollection = ".is-bare"`
 * - Function declaration: `export function isBareOfSelector<T>(param: T): CssSelectorCollection { ... }`
 * - Function expression: `export const isBareOfSelector = function<T>(param: T): CssSelectorCollection { ... }`
 * - Arrow function: `export const isBareOfSelector = <T>(param: T): CssSelectorCollection => ...`
 * 
 * Why:
 * - Prevents scattering inconsistent selector definitions across the codebase.
 * - Ensures type safety and readability by enforcing correct imports and naming conventions.
 * - Centralizes selector definitions for discoverability.
 */
export const enforceSelectorConventions = createRule({
    name : 'enforce-selector-conventions',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require selector constants/functions to be correctly named, typed, and declared only in `css-selectors.ts` or `css-internal-selectors.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile : 'Selectors must be declared in `css-selectors.ts` or `css-internal-selectors.ts`.',
            wrongType : 'Selectors must be typed or return `CssSelectorCollection` from `@cssfn/core`.',
            wrongName : 'Selector names must start with `is`/`not`/`was` and end with `Selector`.',
            noParams  : 'Selector functions must have at least one parameter. Use a constant instead.',
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
             * Handles selector functions.
             */
            FunctionDeclaration(node) {
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // Selector function candidates:
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
             * Handles selector constants.
             */
            VariableDeclarator(node) {
                // Ensure the variable has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the variable name for easy access:
                const name = node.id.name;
                
                
                
                // Selector constant candidates:
                // - Identified by names that end with "Selector".
                // - No need for a case boundary check before "Selector":
                //   matches camelCase and PascalCase names like `isOutlinedSelector`, `flowDirectionStartSelector`,
                //   and even acronym-based names like `isSomeCSSSelector`.
                if (!/Selector$/.test(name)) return;
                
                
                
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
                    
                    
                    
                    // Enforce at least one parameter:
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
        const isCandidateIfFunction = (functionAnn:
            // Function declaration exports:
            | TSESTree.FunctionDeclaration
            
            // TypeScript declare function (overloads):
            | TSESTree.TSDeclareFunction
            
            // Variable declaration exports with function initializers:
            | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression
        ): boolean => {
            // Ensure the required imports are present:
            if (!isCssStyleCollectionImported) return false;
            if (!isCssRuleImported) return false;
            
            
            
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
                // Ensure the variable has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the variable name for easy access:
                const name = node.id.name;
                
                
                
                // Function candidates:
                // - Identified by names that start with "if", followed by a case boundary (next char is not lowercase).
                //   Requires a case boundary check after "if" to avoid matching lowercase continuations
                //   like `iffunctionSelector`. Ensures the next character is not lowercase.
                //   Matches names like `ifOutlined`, `ifFlowDirectionStart`, etc.
                // - Identified as a function expression or arrow function initializer.
                // - Identified having at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
                // - Identified having a return type of `CssRule` (from `@cssfn/core`).
                if (
                    !/^if(?![a-z])/.test(name)
                    ||
                    !node.init
                    ||
                    !((node.init.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (node.init.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))
                    ||
                    !isCandidateIfFunction(node.init)
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
 * - Prevent arbitrary/foreign code inside `css-selectors.ts` and `css-internal-selectors.ts`.
 * - All supporting logic must live in separate modules and be imported.
 * 
 * Requirements:
 * - Allowed top-level statements:
 *   - Import declarations.
 *   - Exported selector constants/functions (ending with `Selector`).
 *   - Exported `if*` functions which accept `CssStyleCollection` and return `CssRule` from `@cssfn/core`.
 *   - Comments.
 * - Disallow any other top-level code.
 * - Disallow general `if*` functions that do not match the required signature.
 * 
 * Selector candidates:
 * - Identified by names that end with "Selector".
 * 
 * `*if` Function candidates:
 * - Identified by names that start with "if", followed by a case boundary (next char is not lowercase).
 * - Identified as a function declaration, function expression, or arrow function.
 * - Identified having at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
 * - Identified having a return type of `CssRule` (from `@cssfn/core`).
 * 
 * Why:
 * - Keeps selector modules clean and focused.
 * - Improves maintainability by restricting logic to proper selector-related logics only.
 */
export const noForeignCode = createRule({
    name : 'no-foreign-code',
    meta: {
        type: 'problem',
        docs: {
            description : 'Disallow arbitrary code in `css-selectors.ts` and `css-internal-selectors.ts`. Only imports, selector exports, `if*` function exports, and comments are allowed.',
        },
        schema: [], // no options accepted
        messages: {
            foreignCode : 'Only imports, selector exports, `if*` function exports, and comments are allowed in `css-selectors.ts` / `css-internal-selectors.ts`. Move supporting code to separate modules.',
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
        const isCandidateIfFunction = (functionAnn:
            // Function declaration exports:
            | TSESTree.FunctionDeclaration
            
            // TypeScript declare function (overloads):
            | TSESTree.TSDeclareFunction
            
            // Variable declaration exports with function initializers:
            | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression
        ): boolean => {
            // Ensure the required imports are present:
            if (!isCssStyleCollectionImported) return false;
            if (!isCssRuleImported) return false;
            
            
            
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
                
                
                
                // Validate that all top-level statements are allowed:
                for (const statement of node.body) {
                    // Allow empty statements (e.g. from semicolons or empty lines):
                    if (statement.type === TSESTree.AST_NODE_TYPES.EmptyStatement) continue;
                    
                    
                    
                    // Handle import declarations directly in Program:
                    // - We set flags for imported types here so they are available
                    //   **before** validating subsequent export statements.
                    if (statement.type === TSESTree.AST_NODE_TYPES.ImportDeclaration) {
                        // Only check imports from `@cssfn/core`:
                        if (statement.source.value !== '@cssfn/core') continue;
                        
                        
                        
                        for (const specifier of statement.specifiers) {
                            // Only consider named imports with identifier references:
                            if (specifier.type !== TSESTree.AST_NODE_TYPES.ImportSpecifier) continue;
                            if (specifier.imported.type !== TSESTree.AST_NODE_TYPES.Identifier) continue;
                            
                            
                            
                            // Check if `CssStyleCollection` is imported:
                            if (specifier.imported.name === 'CssStyleCollection') {
                                isCssStyleCollectionImported = true;
                            } // if
                            
                            // Check if `CssRule` is imported:
                            if (specifier.imported.name === 'CssRule') {
                                isCssRuleImported = true;
                            } // if
                        } // for
                        
                        
                        
                        // Allow import statements:
                        continue;
                    } // if
                    
                    
                    
                    // Allow named exports of selectors or `if*` functions:
                    if (statement.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration) {
                        // Hold the found exported name for validation:
                        let exportedName : string | undefined = undefined;
                        
                        // Hold the found function annotation for later validation:
                        let functionAnn :
                            // Function declaration exports:
                            | TSESTree.FunctionDeclaration
                            
                            // TypeScript declare function (overloads):
                            | TSESTree.TSDeclareFunction
                            
                            // Variable declaration exports with function initializers:
                            | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression
                            
                            // Non-function flag:
                            | undefined
                            
                            = undefined;
                        
                        
                        
                        // Function declaration export:
                        if (statement.declaration?.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration) {
                            exportedName = statement.declaration.id?.name;
                            functionAnn  = statement.declaration;
                        } // if
                        
                        
                        
                        // TS declare function (overloads):
                        if (statement.declaration?.type === TSESTree.AST_NODE_TYPES.TSDeclareFunction) {
                            exportedName = statement.declaration.id?.name;
                            functionAnn  = statement.declaration;
                        } // if
                        
                        
                        
                        // Variable declaration export:
                        if (statement.declaration?.type === TSESTree.AST_NODE_TYPES.VariableDeclaration) {
                            const firstDeclarator = statement.declaration.declarations[0];
                            if (firstDeclarator?.id.type === TSESTree.AST_NODE_TYPES.Identifier) {
                                exportedName = firstDeclarator.id.name;
                                
                                
                                
                                // If the variable is initialized with a function expression or arrow function, store it for later checks:
                                if (
                                    firstDeclarator.init
                                    &&
                                    ((firstDeclarator.init.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (firstDeclarator.init.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))
                                ) {
                                    functionAnn = firstDeclarator.init;
                                } // if
                            } // if
                        } // if
                        
                        
                        
                        // If there's an exported name, check if it's a selector or `if*` function export:
                        if (exportedName !== undefined) {
                            // Selector constant/function candidates:
                            // - Identified by names that end with "Selector".
                            // - No need for a case boundary check before "Selector":
                            //   matches camelCase and PascalCase names like `isOutlinedSelector`, `flowDirectionStartSelector`,
                            //   and even acronym-based names like `isSomeCSSSelector`.
                            if (/Selector$/.test(exportedName)) continue;
                            
                            
                            
                            // Function candidates:
                            // - Identified by names that start with "if", followed by a case boundary (next char is not lowercase).
                            //   Requires a case boundary check after "if" to avoid matching lowercase continuations
                            //   like `iffunctionSelector`. Ensures the next character is not lowercase.
                            //   Matches names like `ifOutlined`, `ifFlowDirectionStart`, etc.
                            // - Identified having at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`).
                            // - Identified having a return type of `CssRule` (from `@cssfn/core`).
                            if (/^if(?![a-z])/.test(exportedName) && functionAnn && isCandidateIfFunction(functionAnn)) continue;
                        } // if
                    } // if
                    
                    
                    
                    // Allow top-level comments (they don't appear as statements in AST)
                    // Comments are handled separately
                    
                    
                    
                    // Reject everything else:
                    context.report({ node: statement, messageId: 'foreignCode' });
                } // for
            },
        };
    },
});
