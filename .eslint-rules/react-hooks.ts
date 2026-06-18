import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers } from './binding-initializers.js'
import { isTopLevel, /* isExported */ } from './scope-utilities.js'
import { isClientOnlyHook, hasClientOnlyHook } from './hook-utilities.js'



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



/**
 * ESLint rule: enforce-client-hook-modules
 * 
 * Purpose:
 * - Enforce correct usage of hook modules that include the `'use client'` directive.
 * 
 * Requirements:
 * - Applies only to hook modules (`hook.ts`, `hooks.ts`, `*-hook.ts`, `*-hooks.ts`).
 * - Skips CSS hook modules (`css-hook.ts`, `css-hooks.ts`, `*-css-*-hook.ts`, `*-css-*-hooks.ts`).
 * - The module must contain a `'use client'` directive.
 * - The filename must include "client" (separated by a dash).
 * - The filename must not include "general" (separated by a dash).
 * - The module must declare only client-side hooks (detected via `isClientOnlyHook`).
 *   Any general hooks must be moved to a general module.
 * 
 * Why:
 * - Ensures that client-side hooks are grouped in explicitly named client modules.
 * - Prevents accidental use of client-side hooks in server components.
 */
export const enforceClientHookModules = createRule({
    name : 'enforce-client-hook-modules',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Require hook modules with "use client" directive to be named with "client-" and contain only client-side hooks.',
        },
        schema   : [], // no options accepted
        messages : {
            missingClientPrefix : 'Hook module with "use client" directive must have "client-" in its filename.',
            hasGeneralPrefix    : 'Hook module with "use client" directive must not include "general-" in its filename.',
            
            wrongFile           : 'General hook `{{hookName}}` is not allowed in a hook module with "use client" directive. Move it to a general module.',
            
            wrongRegistered     : 'Client-side hook `{{hookName}}` is wrongly registered in `serverSafeHooks`. Remove it to the list.'
        },
    },
    create(context) {
        const filename = context.filename;
        const basename = path.basename(filename);
        
        // Match only hook module filenames:
        // - hook.ts, *-hook.ts, *-hook-*.ts
        // - hooks.ts, *-hooks.ts, *-hooks-*.ts
        if (!/(^|-)hooks?$/.test(path.parse(basename).name)) return {};
        
        // Skip CSS hook modules:
        if (/(^|-)css(-|$)/.test(path.parse(basename).name)) return {};
        
        
        
        let isClientModule = false;
        
        
        
        return {
            /**
             * Detects the existance of 'use client' directive.
             * 
             * If found, this module is treated as a client module.
             */
            ExpressionStatement(node: TSESTree.ExpressionStatement) {
                // Skip check if the directive is already detected:
                if (isClientModule) return;
                
                
                
                // Only look for 'use client' directive:
                if (node.expression.type !== TSESTree.AST_NODE_TYPES.Literal) return;
                if (node.expression.value !== 'use client') return;
                
                
                
                // Mark as already have 'use client' directive:
                isClientModule = true;
            },
            
            
            
            /**
             * Validates top-level function declarations in client modules.
             */
            FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
                // Only validate client-side hook modules:
                if (!isClientModule) return;
                
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // React hook candidates:
                // - Identified by names that start with `use` followed by a case boundary (next char is not lowercase), e.g. `useThemeVariant`.
                if (!isHookNameCandidate(name)) return; // exit function
                
                
                
                // Enforce file location:
                // - If the body does not contain any client-only hook calls,
                //   this is a general hook incorrectly placed in a client module.
                if (!hasClientOnlyHook(node.body)) {
                    context.report({ node, messageId: 'wrongFile', data: { hookName: name } });
                }
                
                // Enforce NOT registered on server-safe hook list:
                else if (!isClientOnlyHook(name)) {
                    context.report({ node, messageId: 'wrongRegistered', data: { hookName: name } });
                } // if
            },
            
            /**
             * Validates top-level variable declarators (arrow functions or function expressions).
             */
            VariableDeclarator(node: TSESTree.VariableDeclarator) {
                // Only validate client-side hook modules:
                if (!isClientModule) return;
                
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
                    
                    
                    
                    // React hook candidates:
                    // - Identified by names that start with `use` followed by a case boundary (next char is not lowercase), e.g. `useThemeVariant`.
                    if (!isHookNameCandidate(bindingName)) continue; // exit for
                    
                    
                    
                    // Enforce file location:
                    // - If the body does not contain any client-only hook calls,
                    //   this is a general hook incorrectly placed in a client module.
                    if (!(
                        value
                        &&
                        (
                            value.type === TSESTree.AST_NODE_TYPES.FunctionExpression
                            ||
                            value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
                        )
                        &&
                        hasClientOnlyHook(value.body)
                    )) {
                        context.report({ node: id, messageId: 'wrongFile', data: { hookName: bindingName } });
                    }
                    
                    // Enforce NOT registered on server-safe hook list:
                    else if (!isClientOnlyHook(bindingName)) {
                        context.report({ node, messageId: 'wrongRegistered', data: { hookName: bindingName } });
                    } // if
                } // for
            },
            
            
            
            /**
             * Enforces filename conventions at the end of traversal.
             */
            'Program:exit'() {
                // Only validate client-side hook modules:
                if (!isClientModule) return;
                
                
                
                // Enforce file naming convention:
                
                // Enforce having "client" prefix:
                if (!basename.includes('client')) context.report({ loc: { line: 1, column: 0 }, messageId: 'missingClientPrefix' });
                
                // Prevent having "general" prefix:
                if (basename.includes('general')) context.report({ loc: { line: 1, column: 0 }, messageId: 'hasGeneralPrefix' });
            },
        };
    },
});



/**
 * ESLint rule: enforce-general-hook-modules
 * 
 * Purpose:
 * - Enforce correct usage of hook modules that do not include the `'use client'` directive.
 * 
 * Requirements:
 * - Applies only to hook modules (`hook.ts`, `hooks.ts`, `*-hook.ts`, `*-hooks.ts`).
 * - Skips CSS hook modules (`css-hook.ts`, `css-hooks.ts`, `*-css-*-hook.ts`, `*-css-*-hooks.ts`).
 * - The module must not contain a `'use client'` directive.
 * - The filename must include "general" (separated by a dash).
 * - The filename must not include "client" (separated by a dash).
 * - The module must declare only general hooks (those for which `isClientOnlyHook` returns `false`).
 *   Any client-side hooks must be moved to a client module.
 * - Must be registered in server-safe hook list.
 * 
 * Why:
 * - Ensures that general hooks are grouped in explicitly named general modules.
 * - Guarantees that general hooks remain safe for use in both server and client components.
 */
export const enforceGeneralHookModules = createRule({
    name : 'enforce-general-hook-modules',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Require hook modules without "use client" directive to be named with "general-" and contain only general hooks.',
        },
        schema   : [], // no options accepted
        messages : {
            missingGeneralPrefix : 'Hook module without "use client" directive must have "general-" in its filename.',
            hasClientPrefix      : 'Hook module without "use client" directive must not include "client-" in its filename.',
            
            wrongFile            : 'Client-side hook `{{hookName}}` is not allowed in a hook module without "use client" directive. Move it to a client module.',
            
            notRegistered        : 'General hook `{{hookName}}` is not registered in `serverSafeHooks`. Add it to the list.'
        },
    },
    create(context) {
        const filename = context.filename;
        const basename = path.basename(filename);
        
        // Match only hook module filenames:
        // - hook.ts, *-hook.ts, *-hook-*.ts
        // - hooks.ts, *-hooks.ts, *-hooks-*.ts
        if (!/(^|-)hooks?$/.test(path.parse(basename).name)) return {};
        
        // Skip CSS hook modules:
        if (/(^|-)css(-|$)/.test(path.parse(basename).name)) return {};
        
        
        
        let isClientModule = false;
        
        
        
        return {
            /**
             * Detects the existance of 'use client' directive.
             * 
             * If found, this module is treated as a client module.
             */
            ExpressionStatement(node: TSESTree.ExpressionStatement) {
                // Skip check if the directive is already detected:
                if (isClientModule) return;
                
                
                
                // Only look for 'use client' directive:
                if (node.expression.type !== TSESTree.AST_NODE_TYPES.Literal) return;
                if (node.expression.value !== 'use client') return;
                
                
                
                // Mark as already have 'use client' directive:
                isClientModule = true;
            },
            
            
            
            /**
             * Validates top-level function declarations in general modules.
             */
            FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
                // Only validate general hook modules:
                if (isClientModule) return;
                
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // React hook candidates:
                // - Identified by names that start with `use` followed by a case boundary (next char is not lowercase), e.g. `useThemeVariant`.
                if (!isHookNameCandidate(name)) return; // exit function
                
                
                
                // Enforce file location:
                // - If the body contains any client-only hook calls,
                //   this is a client hook incorrectly placed in a general module.
                if (hasClientOnlyHook(node.body)) {
                    context.report({ node, messageId: 'wrongFile', data: { hookName: name } });
                }
                
                // Enforce registered on server-safe hook list:
                else if (isClientOnlyHook(name)) {
                    context.report({ node, messageId: 'notRegistered', data: { hookName: name } });
                } // if
            },
            
            /**
             * Validates top-level variable declarators (arrow functions or function expressions).
             */
            VariableDeclarator(node: TSESTree.VariableDeclarator) {
                // Only validate general hook modules:
                if (isClientModule) return;
                
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
                    
                    
                    
                    // React hook candidates:
                    // - Identified by names that start with `use` followed by a case boundary (next char is not lowercase), e.g. `useThemeVariant`.
                    if (!isHookNameCandidate(bindingName)) continue; // exit for
                    
                    
                    
                    // Enforce file location:
                    // - If the body contains any client-only hook calls,
                    //   this is a client hook incorrectly placed in a general module.
                    if (
                        value
                        &&
                        (
                            value.type === TSESTree.AST_NODE_TYPES.FunctionExpression
                            ||
                            value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
                        )
                        &&
                        hasClientOnlyHook(value.body)
                    ) {
                        context.report({ node: id, messageId: 'wrongFile', data: { hookName: bindingName } });
                    }
                    
                    // Enforce registered on server-safe hook list:
                    else if (isClientOnlyHook(bindingName)) {
                        context.report({ node, messageId: 'notRegistered', data: { hookName: bindingName } });
                    } // if
                } // for
            },
            
            
            
            /**
             * Enforces filename conventions at the end of traversal.
             */
            'Program:exit'() {
                // Only validate general hook modules:
                if (isClientModule) return;
                
                
                
                // Enforce file naming convention:
                
                // Enforce having "general" prefix:
                if (!basename.includes('general')) context.report({ loc: { line: 1, column: 0 }, messageId: 'missingGeneralPrefix' });
                
                // Prevent having "client" prefix:
                if (basename.includes('client')) context.report({ loc: { line: 1, column: 0 }, messageId: 'hasClientPrefix' });
            },
        };
    },
});
