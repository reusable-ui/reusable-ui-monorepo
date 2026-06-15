import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers } from './binding-initializers.js'
import { isTopLevel, /* isExported */ } from './scope-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `react-hooks/${name}`,
);



/**
 * Checks if a given name matches the criteria for being a React hook candidate:
 * 
 * Requirements:
 * - Starts with `use` followed by a case boundary (next char is not lowercase), e.g. `useThemeVariant`.
 */
const isHookNameCandidate = (name: string): boolean => {
    return /^use[A-Z]/.test(name);
};



/**
 * ESLint rule: enforce-hook-file-location
 * 
 * Purpose:
 * - Ensure React hooks (`use<PascalCase>`) are declared only in hook-specific files.
 * 
 * Requirements:
 * - Hook names must start with `use` followed by PascalCase (e.g. `useDragObserver`, `useThemeVariant`).
 * - Must be a function declaration, function expression, or arrow function.
 * - Must be declared in one of:
 *   - `hook.ts`
 *   - `hooks.ts`
 *   - `*-hook.ts`
 *   - `*-hooks.ts`
 * - Must be exported.
 * 
 * React hook candidates:
 * - Identified by names that start with "use", followed by a case boundary (next char is not lowercase).
 * 
 * Why:
 * - Prevents scattering hooks across unrelated modules.
 * - Centralizes React hooks for discoverability.
 */
export const enforceHookFileLocation = createRule({
    name : 'enforce-hook-file-location',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Require React hook declarations (`use<PascalCase>`) only in hook.ts, hooks.ts, *-hook.ts, or *-hooks.ts.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongFile   : 'React hooks must be declared in hook.ts, hooks.ts, *-hook.ts, or *-hooks.ts.',
            // wrongExport : 'React hooks must be exported.',
            // wrongType   : 'React hooks must be functions (function declaration, function expression, or arrow function).',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        
        // Match:
        // - hook.ts, *-hook-*.ts, and *-hook.ts
        // - hooks.ts, *-hooks-*.ts, and *-hooks.ts
        const isExpectedModule = /(^|-)hooks?$/.test(path.parse(basename).name);
        
        
        
        return {
            /**
             * Inspect function declarations.
             * Handles React hooks as `use*` function declarations.
             */
            FunctionDeclaration(node) {
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // React type candidates:
                // - Identified by names that start with `use` followed by a case boundary (next char is not lowercase), e.g. `useThemeVariant`.
                if (!isHookNameCandidate(name)) return; // exit function
                
                
                
                // // Enforce exported:
                // if (!isExported(node)) {
                //     context.report({ node, messageId: 'wrongExport' });
                // } // if
                
                
                
                // Enforce file location:
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
            },
            
            
            
            /**
             * Inspect variable declarations.
             * Handles React hooks as function expressions or arrow functions.
             */
            VariableDeclarator(node) {
                // Only validate top-level variable declarations:
                // - Prevents false positives from nested variables inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Collect all binding identifiers and their initializers for validation:
                const bindingInitializerList = collectBindingInitializers(node);
                
                
                
                // Validate each binding item:
                for (const { id, /* value */ } of bindingInitializerList) {
                    // If there's no identifier (shouldn't happen for valid exports), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Store the variable name for easy access:
                    const bindingName = id.name;
                    
                    
                    
                    // React type candidates:
                    // - Identified by names that start with `use` followed by a case boundary (next char is not lowercase), e.g. `useThemeVariant`.
                    if (!isHookNameCandidate(bindingName)) continue; // exit for
                    
                    
                    
                    // // Enforce function type:
                    // // - Must be a function expression or arrow function.
                    // if (
                    //     !value
                    //     ||
                    //     !(
                    //         value.type === TSESTree.AST_NODE_TYPES.FunctionExpression
                    //         ||
                    //         value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
                    //     )
                    // ) {
                    //     context.report({ node: id, messageId: 'wrongType' });
                    // } // if
                    
                    
                    
                    // // Enforce exported:
                    // if (!isExported(node)) {
                    //     context.report({ node: id, messageId: 'wrongExport' });
                    // } // if
                    
                    
                    
                    // Enforce file location:
                    if (!isExpectedModule) {
                        context.report({ node: id, messageId: 'wrongFile' });
                    } // if
                } // for
            },
        };
    },
});
