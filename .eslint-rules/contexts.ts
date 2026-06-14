import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { isExported } from './scope-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `react-contexts/${name}`,
);



/**
 * ESLint rule: enforce-context-creation
 * 
 * Purpose:
 * - Ensure React contexts are centralized in `internal-contexts.ts`.
 * - Prevent contexts from being declared in arbitrary files.
 * 
 * Requirements:
 * - Must be declared only in `internal-contexts.ts`.
 * - Must be created via `createContext()` imported from `react`.
 * - Must be exported (so internal consumers can import them).
 * 
 * Why:
 * - Keeps context creation consistent and discoverable.
 * - Prevents accidental reexports in public `index.ts`.
 */
export const enforceContextCreation = createRule({
    name : 'enforce-context-creation',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Require React context creation (`createContext`) only in `internal-contexts.ts`.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongFile   : 'React contexts must be declared in `internal-contexts.ts`.',
            wrongExport : 'React contexts must be exported so they can be imported internally.',
            wrongImport : '`createContext` must be imported from `react`.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = (basename === 'internal-contexts.ts');
        
        
        
        // A flag to track whether createContext is imported from react:
        let isCreateContextImported = false;
        
        
        
        return {
            /**
             * Detect import of `createContext` from `react`.
             * Set the flag so later checks know this identifier is the correct one.
             */
            ImportDeclaration(node: TSESTree.ImportDeclaration) {
                // Only check imports from `react`:
                if (node.source.value !== 'react') return;
                
                
                
                // Determine which relevant types are imported:
                const importedSpecifiers = node.specifiers.filter((specifier): specifier is TSESTree.ImportSpecifier & { imported: TSESTree.Identifier } =>
                    ('imported' in specifier)
                    &&
                    specifier.imported instanceof Object
                );
                
                // Check if `createContext` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'createContext'))) {
                    isCreateContextImported = true;
                } // if
            },
            
            
            
            /**
             * Inspect function declarations.
             * Handles context creations.
             */
            CallExpression(node: TSESTree.CallExpression) {
                // Ensure the function has an identifier name:
                if ((node.callee.type !== 'Identifier') || (node.callee.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.callee.name;
                
                
                
                // `createContext()` function candidates:
                // - Identified by names that exactly match "createContext".
                // - Identified imported from `react`.
                if ((name !== 'createContext') || !isCreateContextImported) return; // exit function
                
                
                
                // Enforce exported:
                if (!isExported(node.parent)) {
                    context.report({ node: node.parent, messageId: 'wrongExport' });
                } // if
                
                
                
                // Enforce file location:
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
            },
        };
    },
});
