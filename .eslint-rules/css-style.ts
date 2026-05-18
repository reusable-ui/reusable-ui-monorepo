import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectTopLevelBindings } from './binding-initializers.js'
import { getDomainMetadata, getExpectedCSSStyleModules } from './domain-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `css-style/${name}`,
);



/**
 * ESLint rule: enforce-scope-function-usage
 * 
 * Purpose:
 * - Ensure `scope`, `mainScope`, and `globalScope` function usages are centralized in the correct files.
 * 
 * Requirements:
 * - Must be declared only in:
 *   • `css-style.ts`
 *   • `css-internal-style.ts`
 *   • `css-<subdomain>-style.ts`
 *   • `css-internal-<subdomain>-style.ts`
 * 
 * Function candidates:
 * - Identified by names that exactly match "scope".
 * - Identified as a function declaration, function expression, or arrow function.
 * - Identified imported from `@cssfn/core`.
 * 
 * Why:
 * - Centralizes `scope`, `mainScope`, and `globalScope` function usages for discoverability.
 */
export const enforceScopeFunctionUsage = createRule({
    name : 'enforce-scope-function-usage',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `scope`, `mainScope`, and `globalScope` usages only in the expected module file (e.g. `css-style.ts`, `css-internal-style.ts`, or their sub-domain variants).',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile     : '`scope`, `mainScope`, and `globalScope` usages must be in the expected module file (e.g. `css-style.ts`, `css-internal-style.ts`, or their sub-domain variants).',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = path.relative(process.cwd(), filename);
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative filename:
        const domainMetadata = getDomainMetadata(relativeFilename);
        
        
        
        // Determine if the CSS scope is declared within the expected module:
        const expectedModules  = getExpectedCSSStyleModules(domainMetadata);
        const isExpectedModule = expectedModules.includes(basename);
        
        
        
        // Flags to track whether functions were imported from `@cssfn/core`:
        let isScopeFunctionImported       = false;
        let isMainScopeFunctionImported   = false;
        let isGlobalScopeFunctionImported = false;
        
        
        
        return {
            /**
             * Detect imports of `scope()`, `mainScope()`, and `globalScope()` from `@cssfn/core`.
             * Set the flags so later checks know these identifiers are the correct ones.
             */
            ImportDeclaration(node) {
                // Handle imports from `@cssfn/core`:
                if (node.source.value === '@cssfn/core') {
                    // Determine which relevant types are imported:
                    const importedSpecifiers = node.specifiers.filter((specifier): specifier is TSESTree.ImportSpecifier & { imported: TSESTree.Identifier } =>
                        ('imported' in specifier)
                        &&
                        specifier.imported instanceof Object
                    );
                    
                    // Check if `scope()` is imported:
                    if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'scope'))) {
                        isScopeFunctionImported = true;
                    } // if
                    
                    // Check if `mainScope()` is imported:
                    if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'mainScope'))) {
                        isMainScopeFunctionImported = true;
                    } // if
                    
                    // Check if `globalScope()` is imported:
                    if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'globalScope'))) {
                        isGlobalScopeFunctionImported = true;
                    } // if
                } // if
            },
            
            
            
            /**
             * Detects function usages.
             * Handles `scope()`, `mainScope()`, and `globalScope()` usages.
             */
            CallExpression(node) {
                // Ensure the function has an identifier name:
                if ((node.callee.type !== 'Identifier') || (node.callee.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.callee.name;
                
                
                
                // `scope()`, `mainScope()`, and `globalScope()` function candidates:
                // - Identified by names that exactly match "scope", "mainScope", or "globalScope".
                // - Identified imported from `@cssfn/core`.
                if (
                    !((name === 'scope') && isScopeFunctionImported)
                    &&
                    !((name === 'mainScope') && isMainScopeFunctionImported)
                    &&
                    !((name === 'globalScope') && isGlobalScopeFunctionImported)
                ) return; // exit function
                
                
                
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
 * - Prevent arbitrary/foreign code inside `css-style.ts` and `css-internal-style.ts`.
 * - All supporting logic must live in separate modules and be imported.
 * 
 * Requirements:
 * - Allowed top-level statements:
 *   - Import declarations.
 *   - Default scope export.
 *   - Comments.
 * - Disallow any other top-level code.
 * 
 * CSS scope candidates:
 * - Identified by default export.
 * 
 * Why:
 * - Keeps CSS style modules clean and focused.
 * - Improves maintainability by restricting logic to proper CSS-style-related logics only.
 */
export const noForeignCode = createRule({
    name : 'no-foreign-code',
    meta: {
        type: 'problem',
        docs: {
            description : 'Disallow arbitrary code in `css-style.ts` and `css-internal-style.ts`. Only imports, default scope export, and comments are allowed.',
        },
        schema: [], // no options accepted
        messages: {
            foreignCode : 'Only imports, default scope export, and comments are allowed in `css-style.ts` / `css-internal-style.ts`. Move supporting code to separate modules.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = path.relative(process.cwd(), filename);
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative filename:
        const domainMetadata = getDomainMetadata(relativeFilename);
        
        
        
        // Determine if the CSS scope is declared within the expected module:
        const expectedModules  = getExpectedCSSStyleModules(domainMetadata);
        const isExpectedModule = expectedModules.includes(basename);
        
        
        
        return {
            /**
             * When visiting a Program node, validate the entire file structure
             * if it's a `css-style.ts`, `css-internal-style.ts`, or their sub-domain variants file.
             */
            Program(node) {
                // Only validate file structure if we're in an expected module:
                if (!isExpectedModule) return;
                
                
                
                // Validate all top-level bindings in the file:
                for (const { id } of collectTopLevelBindings(node)) {
                    // If there's no identifier (shouldn't happen for named bindings), skip it:
                    if (!id) continue;
                    
                    
                    
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
