import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'



const createRule = ESLintUtils.RuleCreator(
    name => `css-hooks/${name}`,
);



/**
 * ESLint rule: enforce-css-hook-conventions
 * 
 * Purpose:
 * - Ensure CSS hooks (`uses*` identifiers) are functions.
 * - Ensure CSS hooks are centralized in the correct files.
 * 
 * Requirements:
 * - Must be a function declaration, function expression, or arrow function.
 * - Variables, constants, or other object exports with `uses*` names are not allowed.
 * - Must be declared only in `css-hooks.ts` or `css-internal-hooks.ts`.
 * 
 * CSS hook candidates:
 * - Identified by names that start with "uses", followed by a case boundary (next char is not lowercase).
 * - Identified as a function declaration, function expression, or arrow function.
 * 
 * Why:
 * - Prevents accidental assignment of non-function values to CSS hooks (`uses*`) identifiers.
 * - Centralizes CSS hooks for discoverability.
 */
export const enforceCssHookConventions = createRule({
    name : 'enforce-css-hook-conventions',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Require CSS hooks to be functions and declared only in `css-hooks.ts` or `css-internal-hooks.ts`.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongFile : 'CSS hooks must be declared in `css-hooks.ts` or `css-internal-hooks.ts`.',
            wrongType : 'CSS hooks must be functions (declaration, function expression, or arrow function).',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-hooks.ts', 'css-internal-hooks.ts'].includes(basename);
        
        
        
        return {
            /**
             * Inspect function declarations.
             * Handles CSS hooks as `uses*` function declarations.
             */
            FunctionDeclaration(node) {
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // CSS hook candidates:
                // - Identified by names that start with "uses", followed by a case boundary (next char is not lowercase).
                //   Requires a case boundary check after "uses" to avoid matching lowercase continuations
                //   like `usesfunnyStyle`. Ensures the next character is not lowercase.
                //   Matches names like `usesBoldStyle`, `usesBackgroundFeature`, etc.
                if (!/^uses(?![a-z])/.test(name)) return;
                
                
                
                // Enforce file location:
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
            },
            
            
            
            /**
             * Inspect variable declarations.
             * Handles CSS hooks as `uses*` function expressions or arrow functions.
             */
            VariableDeclarator(node) {
                // Ensure the variable has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the variable name for easy access:
                const name = node.id.name;
                
                
                
                // CSS hook candidates:
                // - Identified by names that start with "uses", followed by a case boundary (next char is not lowercase).
                //   Requires a case boundary check after "uses" to avoid matching lowercase continuations
                //   like `usesfunnyStyle`. Ensures the next character is not lowercase.
                //   Matches names like `usesBoldStyle`, `usesBackgroundFeature`, etc.
                if (!/^uses(?![a-z])/.test(name)) return;
                
                
                
                // Enforce function type:
                // - Must be a function expression or arrow function.
                if (
                    !node.init
                    ||
                    !(
                        node.init.type === TSESTree.AST_NODE_TYPES.FunctionExpression
                        ||
                        node.init.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
                    )
                ) {
                    context.report({ node, messageId: 'wrongType' });
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
 * ESLint rule: no-foreign-code
 * 
 * Purpose:
 * - Prevent arbitrary/foreign code inside `css-hooks.ts` and `css-internal-hooks.ts`.
 * - All supporting logic must live in separate modules and be imported.
 * 
 * Requirements:
 * - Allowed top-level statements:
 *   - Import declarations.
 *   - Exported CSS hooks (`uses*` functions).
 *   - Comments.
 * - Disallow any other top-level code.
 * 
 * CSS hook candidates:
 * - Identified by names that start with "uses", followed by a case boundary (next char is not lowercase).
 * - Identified as a function declaration, function expression, or arrow function.
 * 
 * Why:
 * - Keeps CSS hook modules clean and focused.
 * - Improves maintainability by restricting logic to proper CSS hook logics only.
 */
export const noForeignCode = createRule({
    name : 'no-foreign-code',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Disallow arbitrary code in `css-hooks.ts` and `css-internal-hooks.ts`. Only imports, CSS hook exports, and comments are allowed.',
        },
        schema   : [], // no options accepted
        messages : {
            foreignCode : 'Only imports, CSS hook exports, and comments are allowed in `css-hooks.ts` / `css-internal-hooks.ts`. Move supporting code to separate modules.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-hooks.ts', 'css-internal-hooks.ts'].includes(basename);
        
        
        
        return {
            /**
             * When visiting a Program node, validate the entire file structure
             * if it's a `css-hooks.ts` or `css-internal-hooks.ts` file.
             */
            Program(node) {
                // Only validate file structure if we're in an expected module:
                if (!isExpectedModule) return;
                
                
                
                // Validate that all top-level statements are allowed:
                for (const statement of node.body) {
                    // Allow empty statements (e.g. from semicolons or empty lines):
                    if (statement.type === TSESTree.AST_NODE_TYPES.EmptyStatement) continue;
                    
                    
                    
                    // Allow import statements:
                    if (statement.type === TSESTree.AST_NODE_TYPES.ImportDeclaration) continue;
                    
                    
                    
                    // Allow named exports of `uses*` identifiers:
                    if (statement.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration) {
                        // Hold the found exported name for validation:
                        let exportedName : string | undefined = undefined;
                        
                        
                        
                        // Function declaration export:
                        if (statement.declaration?.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration) {
                            exportedName = statement.declaration.id?.name;
                        } // if
                        
                        
                        
                        // TS declare function (overloads):
                        if (statement.declaration?.type === TSESTree.AST_NODE_TYPES.TSDeclareFunction) {
                            exportedName = statement.declaration.id?.name;
                        } // if
                        
                        
                        
                        // Variable declaration export:
                        if (statement.declaration?.type === TSESTree.AST_NODE_TYPES.VariableDeclaration) {
                            const firstDeclarator = statement.declaration.declarations[0];
                            if (firstDeclarator?.id.type === TSESTree.AST_NODE_TYPES.Identifier) {
                                exportedName = firstDeclarator.id.name;
                            } // if
                        } // if
                        
                        
                        
                        // If there's an exported name, check if it's a `uses*` identifier export:
                        if (exportedName !== undefined) {
                            // CSS hook candidates:
                            // - Identified by names that start with "uses", followed by a case boundary (next char is not lowercase).
                            //   Requires a case boundary check after "uses" to avoid matching lowercase continuations
                            //   like `usesfunnyStyle`. Ensures the next character is not lowercase.
                            //   Matches names like `usesBoldStyle`, `usesBackgroundFeature`, etc.
                            if (/^uses(?![a-z])/.test(exportedName)) continue;
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
