import path from 'path'
import { Rule } from 'eslint'
import type { TSESTree } from '@typescript-eslint/utils'



/**
 * ESLint rule: enforceUsesHooks
 * 
 * Purpose:
 * - Enforce strict file structure in `css-hooks.ts` or `css-internal-hooks.ts`:
 *   - Only allows: import statements, `uses*` functions, JSDoc comments, and top-level comments
 *   - All supporting code must be in separate modules and imported
 * - Validate that `uses*` identifiers are functions
 * 
 * Why:
 * - Centralizes hook definitions in dedicated modules for maintainability.
 * - Keeps hook files clean and focused on the hook functionality.
 * - Prevents accidental assignment of non-function values to `uses*` identifiers.
 * - Prevents arbitrary/foreign code from being mixed with hook definitions.
 */
export const enforceUsesHooks: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description : 'Enforce strict file structure and `uses*` function requirements',
            recommended : false, // not part of ESLint recommended set
        },
        schema: [], // no options accepted
        messages: {
            wrongFile: '`uses*` functions must be declared in `css-hooks.ts` or `css-internal-hooks.ts`.',
            wrongValue: '`uses*` identifiers must be functions (declaration or expression).',
            foreignCodeInHooks: 'Only import statements, `uses*` functions, and comments are allowed in `css-hooks.ts` / `css-internal-hooks.ts`. Move supporting code to separate modules.',
            nonUsesExportInHooks: 'Only `uses*` functions should be in `css-hooks.ts` / `css-internal-hooks.ts`. Move other exports to separate modules.',
        },
    },
    
    create(context: Rule.RuleContext): Rule.RuleListener {
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
                    if (statement.type === 'EmptyStatement') continue;
                    
                    
                    
                    // Allow import statements:
                    if (statement.type === 'ImportDeclaration') continue;
                    
                    
                    
                    // Allow export declarations for `uses*` functions:
                    if (statement.type === 'ExportNamedDeclaration') {
                        // Check if it's exporting a function declaration:
                        if (statement.declaration?.type === 'FunctionDeclaration') {
                            const funcName = statement.declaration.id?.name;
                            if (funcName && /^uses(?=[A-Z])/.test(funcName)) continue;
                        } // if
                        
                        
                        
                        // Check if it's exporting a TypeScript declare function (overloads):
                        if (statement.declaration?.type as string === 'TSDeclareFunction') {
                            const tsDeclaration = statement.declaration as unknown as TSESTree.TSDeclareFunction;
                            const funcName = tsDeclaration.id?.name;
                            if (funcName && /^uses(?=[A-Z])/.test(funcName)) continue;
                        } // if
                        
                        
                        
                        // Check if it's exporting a variable (const/let/var):
                        if (statement.declaration?.type === 'VariableDeclaration') {
                            const firstDeclarator = statement.declaration.declarations[0];
                            if (firstDeclarator?.id.type === 'Identifier') {
                                const varName = firstDeclarator.id.name;
                                // Check if it's a `uses*` function expression
                                if (
                                    /^uses(?=[A-Z])/.test(varName)
                                    &&
                                    firstDeclarator.init
                                    &&
                                    (
                                        (firstDeclarator.init.type === 'ArrowFunctionExpression')
                                        ||
                                        (firstDeclarator.init.type === 'FunctionExpression')
                                    )
                                ) continue;
                            } // if
                        } // if
                        
                        
                        
                        // Report other exports
                        context.report({ node: statement, messageId: 'nonUsesExportInHooks' });
                        continue;
                    } // if
                    
                    
                    
                    // Allow top-level comments (they don't appear as statements in AST)
                    // Comments are handled separately
                    
                    
                    
                    // Reject all other code
                    context.report({ node: statement, messageId: 'foreignCodeInHooks' });
                } // for
            },
            
            /**
             * Inspect variable declarations like:
             *   export const usesSomething = ...
             */
            VariableDeclarator(node) {
                if (!node.id || node.id.type !== 'Identifier') return;
                
                
                
                // Only check variables with names like "usesFoo":
                if (!/^uses(?=[A-Z])/.test(node.id.name)) return;
                
                
                
                // 1. Enforce file location (only report if NOT in an expected module):
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
                
                
                
                // 2. Enforce function expression form:
                if (
                    !node.init
                    ||
                    (
                        node.init.type !== 'ArrowFunctionExpression'
                        &&
                        node.init.type !== 'FunctionExpression'
                    )
                ) {
                    context.report({ node, messageId: 'wrongValue' });
                } // if
            },
            
            /**
             * Inspect function declarations like:
             *   export function usesSomething() { ... }
             */
            FunctionDeclaration(node) {
                if (!node.id || node.id.type !== 'Identifier') return;
                
                
                
                // Only check functions with names like "usesFoo":
                if (!/^uses(?=[A-Z])/.test(node.id.name)) return;
                
                
                
                // 1. Enforce file location (only report if NOT in an expected module):
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
                
                
                
                // Function declarations are valid, so no wrongValue report here.
            },
        };
    },
};
