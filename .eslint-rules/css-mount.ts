import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers } from './binding-initializers.js'
import { isTopLevel, isExported } from './scope-utilities.js'
import { getDomainMetadata, getExpectedCSSMountModules } from './domain-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `css-mount/${name}`,
);



/**
 * ESLint rule: enforce-css-mount-conventions
 * 
 * Purpose:
 * - Enforce naming conventions for CSS mount functions.
 * - Ensure CSS mount functions are centralized in the correct files.
 * 
 * Requirements:
 * - Cannot be a function (function declaration, function expression, or arrow function).
 * - Must be declared only in:
 *   • `css-mount.ts`
 *   • `css-internal-mount.ts`
 *   • `css-<subdomain>-mount.ts`
 *   • `css-internal-<subdomain>-mount.ts`
 * - Must be exported.
 * 
 * CSS mount function candidates:
 * - All functions and variables starting with `mount*`.
 * 
 * Examples:
 * - `export const mountTypography = ...`
 * - `export function mountSecondary(...) { ... }`
 * - `export const mountParagraph = function(...) { ... }`
 * 
 * Why:
 * - Prevents scattering inconsistent CSS mount functions across the codebase.
 * - Ensures type safety and readability by enforcing correct imports and naming conventions.
 * - Centralizes CSS mount functions for discoverability.
 */
export const enforceCssMountConventions = createRule({
    name : 'enforce-css-mount-conventions',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require CSS mount functions to be correctly named, typed, and declared only in `css-mount.ts` or `css-internal-mount.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile    : 'CSS mount functions must be declared in the expected module file (e.g. `css-mount.ts`, `css-internal-mount.ts`, or their sub-domain variants).',
            wrongExport  : 'CSS mount functions must be exported.',
            wrongType    : 'CSS mount functions must be functions.',
            wrongName    : 'CSS mount function names must follow `mount<Domain>Style` naming convention.',
        },
    },
    
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = path.relative(process.cwd(), filename);
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative filename:
        const domainMetadata = getDomainMetadata(relativeFilename);
        
        
        
        // Determine if the CSS mount function is declared within the expected module:
        const expectedModules  = getExpectedCSSMountModules(domainMetadata);
        const isExpectedModule = expectedModules.includes(basename) && !basename.split('-').includes('deprecated');
        
        
        
        // Helper functions:
        
        /**
         * Validates naming convention for CSS mount functions.
         * 
         * Requirements:
         * - Must follow `mount<Domain>Style` naming convention.
         * - Must be camelCase.
         * - The optional `subdomainIdentifier` is appended directly after the domain base (PascalCase).
         * 
         * Examples:
         * - ✅ `mountTypography` → domain=`Typo`
         * - ✅ `mountSecondary`  → domain=`Secondary`
         * - ❌ `typographyMount` (wrong order)
         * - ❌ `mountsecondary`  (missing case boundary)
         */
        const isValidMountFunctionName = (name: string): boolean => {
            // Loose validation (no domain context available):
            if (!domainMetadata)  return /^mount([A-Z][a-z]*)Style$/.test(name);
            
            
            
            // Tight validation (domain context available):
            
            // Build expected name: mount<domain><subdomain?>:
            const expectedName      = `mount${domainMetadata.domainPrefix}${domainMetadata.subdomain ?? ''}Style`;
            
            return (name === expectedName);
        };
        
        
        
        return {
            /**
             * Inspect function declarations.
             * Handles CSS mount functions
             */
            FunctionDeclaration(node) {
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // CSS mount function candidates:
                // - Identified by names that start with "mount", followed by a case boundary (next char is not lowercase).
                //   Requires a case boundary check after "mount" to avoid matching lowercase continuations
                //   like `mountingFoo`. Ensures the next character is not lowercase.
                // - Excludes 'mountMany'.
                if (!/^mount(?![a-z])/.test(name)) return;
                if (name === 'mountMany') return;
                
                
                
                // Enforce naming convention:
                if (!isValidMountFunctionName(name)) {
                    context.report({ node, messageId: 'wrongName' });
                } // if
                
                
                
                // Enforce being a function:
                // context.report({ node, messageId: 'wrongType' }); // Always a function → no need to validate.
                
                
                
                // Enforce exported:
                if (!isExported(node)) {
                    context.report({ node, messageId: 'wrongExport' });
                } // if
                
                
                
                // Enforce file location:
                if (!isExpectedModule) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
            },
            
            
            
            /**
             * Inspect variable declarations.
             * Handles CSS mount function constants (the constants are should never be non-functions).
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
                    
                    
                    
                    // CSS mount function candidates:
                    // - Identified by names that start with "mount", followed by a case boundary (next char is not lowercase).
                    //   Requires a case boundary check after "mount" to avoid matching lowercase continuations
                    //   like `mountingFoo`. Ensures the next character is not lowercase.
                    // - Excludes 'mountMany'.
                    if (!/^mount(?![a-z])/.test(bindingName)) continue;
                    if (bindingName === 'mountMany') continue;
                    
                    
                    
                    // Enforce naming convention:
                    if (!isValidMountFunctionName(bindingName)) {
                        context.report({ node: id, messageId: 'wrongName' });
                    } // if
                    
                    
                    
                    // Case 1: Function initializer (either arrow or function expression):
                    if (value && ((value.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))) {
                        // Enforce being a function:
                        // context.report({ node, messageId: 'wrongType' }); // Always a function → no need to validate.
                    } // if
                    
                    
                    
                    // Case 2: Constant initializer (string literal, etc.):
                    // - Example: `export const mountTypography: SomeType = ...`
                    else {
                        // Enforce implicit type annotation from `createTypographyMount()`'s return type:
                        if (!node.init || (node.init.type !== TSESTree.AST_NODE_TYPES.CallExpression) || (node.init.callee.type !== TSESTree.AST_NODE_TYPES.Identifier) || (node.init.callee.name !== 'createTypographyMount')) {
                            context.report({ node: id, messageId: 'wrongType' });
                        } // if
                    } // if
                    
                    
                    
                    // Enforce exported:
                    if (!isExported(node)) {
                        context.report({ node: id, messageId: 'wrongExport' });
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
