import path from 'path'
import { Rule } from 'eslint'



/**
 * ESLint rule: enforceUsesHooks
 * 
 * Purpose:
 * - Identify identifiers starting with `uses` followed by uppercase letter.
 * - Enforce that they:
 *   - Are declared as functions (declaration or expression).
 *   - Are declared in `css-hooks.ts` or `css-internal-hooks.ts`.
 * 
 * Why:
 * - Centralizes hook helpers in dedicated modules for maintainability.
 * - Prevents accidental assignment of non-function values to `uses*` identifiers.
 */
export const enforceUsesHooks: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `uses*` functions to be declared only in `css-hooks.ts` or `css-internal-hooks.ts`',
            recommended : false, // not part of ESLint recommended set
        },
        schema: [], // no options accepted
        messages: {
            wrongFile: '`uses*` functions must be declared in `css-hooks.ts` or `css-internal-hooks.ts`.',
            wrongValue: '`uses*` identifiers must be functions (declaration or expression).',
        },
    },
    
    create(context: Rule.RuleContext): Rule.RuleListener {
        const filename = context.filename;
        
        
        
        return {
            /**
             * Inspect variable declarations like:
             *   export const usesSomething = ...
             */
            VariableDeclarator(node) {
                if (!node.id || node.id.type !== 'Identifier') return;
                
                
                
                // Only check variables with names like "usesFoo":
                if (!/^uses(?=[A-Z])/.test(node.id.name)) return;
                
                
                
                // 1. Enforce file location:
                if (!['css-hooks.ts', 'css-internal-hooks.ts'].includes(path.basename(filename))) {
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
                
                
                
                // Only check variables with names like "usesFoo":
                if (!/^uses(?=[A-Z])/.test(node.id.name)) return;
                
                
                
                // 1. Enforce file location:
                if (!['css-hooks.ts', 'css-internal-hooks.ts'].includes(path.basename(filename))) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
                
                
                
                // Function declarations are valid, so no wrongValue report here.
            },
        };
    },
};
