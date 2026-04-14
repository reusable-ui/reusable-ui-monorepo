import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers, collectTopLevelBindings } from './binding-initializers.js'
import { isTopLevel } from './scope-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `css-hooks/${name}`,
);



/**
 * ESLint rule: enforce-hook-conventions
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
export const enforceHookConventions = createRule({
    name : 'enforce-hook-conventions',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Require CSS hooks to be functions and declared only in `css-hooks.ts` or `css-internal-hooks.ts`.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongFile : 'CSS hooks must be declared in `css-hooks.ts` or `css-internal-hooks.ts`.',
            wrongType : 'CSS hooks must be functions (function declaration, function expression, or arrow function).',
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
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
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
             * Handles CSS hooks as function expressions or arrow functions.
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
                    
                    
                    
                    // CSS hook candidates:
                    // - Identified by names that start with "uses", followed by a case boundary (next char is not lowercase).
                    //   Requires a case boundary check after "uses" to avoid matching lowercase continuations
                    //   like `usesfunnyStyle`. Ensures the next character is not lowercase.
                    //   Matches names like `usesBoldStyle`, `usesBackgroundFeature`, etc.
                    if (!/^uses(?![a-z])/.test(bindingName)) return;
                    
                    
                    
                    // Enforce function type:
                    // - Must be a function expression or arrow function.
                    if (
                        !value
                        ||
                        !(
                            value.type === TSESTree.AST_NODE_TYPES.FunctionExpression
                            ||
                            value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
                        )
                    ) {
                        context.report({ node: id, messageId: 'wrongType' });
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
                
                
                
                // Validate all top-level bindings in the file:
                for (const { id } of collectTopLevelBindings(node)) {
                    // If there's no identifier (shouldn't happen for named bindings), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Get the binding name for easy access:
                    const bindingName = id.name;
                    
                    
                    
                    // CSS hook candidates:
                    // - Identified by names that start with "uses", followed by a case boundary (next char is not lowercase).
                    //   Requires a case boundary check after "uses" to avoid matching lowercase continuations
                    //   like `usesfunnyStyle`. Ensures the next character is not lowercase.
                    //   Matches names like `usesBoldStyle`, `usesBackgroundFeature`, etc.
                    if (/^uses(?![a-z])/.test(bindingName)) continue;
                    
                    
                    
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
