import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { isExported } from './scope-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `css-types/${name}`,
);



/**
 * ESLint rule: enforce-css-type-conventions
 * 
 * Purpose:
 * - Ensure CSS types are centralized in the correct files.
 * 
 * Requirements:
 * - Start with `CSS` followed by PascalCase, or end with `Vars`.
 * - Must be declared only in `css-types.ts` or `css-internal-types.ts`.
 * - Must be exported.
 * 
 * CSS type candidates:
 * - Identified by names that start with `Css` followed by a case boundary (next char is not lowercase), e.g. `CssThemeVariant`.
 * - Identified by names that end with `Vars`, e.g. `ThemeVariantVars`.
 * 
 * Examples:
 * - Type alias: `export type CssThemeName = ...`, `export type ThemeVariantVars = ...`
 * - Interface: `export interface CssThemeVariant { ... }`, `export interface ThemeVariantVars { ... }`
 * 
 * Why:
 * - Prevents scattering inconsistent CSS types across the codebase.
 * - Centralizes CSS types for discoverability.
 */
export const enforceCssTypeConventions = createRule({
    name : 'enforce-css-type-conventions',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require CSS types to be correctly named and declared only in `css-types.ts` or `css-internal-types.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile   : 'CSS types must be declared in `css-types.ts` or `css-internal-types.ts`.',
            wrongExport : 'CSS types must be exported.',
        },
    },
    
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-types.ts', 'css-internal-types.ts'].includes(basename);
        
        
        
        /**
         * Checks if a given name matches the criteria for being a CSS type candidate:
         * 
         * Requirements:
         * - Starts with `Css` followed by a case boundary (next char is not lowercase), e.g. `CssThemeVariant`.
         * - Ends with `Vars`, e.g. `ThemeVariantVars`.
         */
        const isCssNameCandidate = (name: string): boolean => {
            return (
                // Starts with `Css` followed by a case boundary:
                /^Css[A-Z]/.test(name)
                ||
                // Ends with `Vars`:
                /Vars$/.test(name)
            );
        };
        
        
        
        return {
            /**
             * Handles interface declarations starting with `Css*` or ending with `*Vars`.
             */
            TSInterfaceDeclaration(node) {
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // CSS type candidates:
                // - Identified by names that start with `Css` followed by a case boundary (next char is not lowercase), e.g. `CssThemeVariant`.
                // - Identified by names that end with `Vars`, e.g. `ThemeVariantVars`.
                if (!isCssNameCandidate(name)) return;
                
                
                
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
             * Handles type declarations starting with `Css*` or ending with `*Vars`.
             */
            TSTypeAliasDeclaration(node) {
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // CSS type candidates:
                // - Identified by names that start with `Css` followed by a case boundary (next char is not lowercase), e.g. `CssThemeVariant`.
                // - Identified by names that end with `Vars`, e.g. `ThemeVariantVars`.
                if (!isCssNameCandidate(name)) return;
                
                
                
                // Enforce exported:
                if (!isExported(node)) {
                    context.report({ node, messageId: 'wrongExport' });
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
 * - Prevent arbitrary/foreign code inside `css-types.ts` and `css-internal-types.ts`.
 * - All supporting logic must live in separate modules and be imported.
 * 
 * Requirements:
 * - Allowed top-level statements:
 *   - Import declarations.
 *   - CSS types (starting with `Css` followed by a case boundary, or ending with `Vars`).
 *   - Comments.
 * - Disallow any other top-level code.
 * 
 * CSS type candidates:
 * - Identified by names that start with `Css` followed by a case boundary (next char is not lowercase), e.g. `CssThemeVariant`.
 * - Identified by names that end with `Vars`, e.g. `ThemeVariantVars`.
 * 
 * Why:
 * - Keeps CSS type modules clean and focused.
 * - Improves maintainability by restricting logic to proper CSS-type-related logics only.
 */
export const noForeignCode = createRule({
    name : 'no-foreign-code',
    meta: {
        type: 'problem',
        docs: {
            description : 'Disallow arbitrary code in `css-types.ts` and `css-internal-types.ts`. Only imports, CSS types, and comments are allowed.',
        },
        schema: [], // no options accepted
        messages: {
            foreignCode : 'Only imports, CSS types, and comments are allowed in `css-types.ts` / `css-internal-types.ts`. Move supporting code to separate modules.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-types.ts', 'css-internal-types.ts'].includes(basename);
        
        
        
        // Helper functions:
        
        /**
         * Checks if a type candidate matches the criteria for being a CSS type:
         * 
         * Requirements:
         * - Name starts with `Css` followed by a case boundary (next char is not lowercase), e.g. `CssThemeVariant`.
         * - Name ends with `Vars`, e.g. `ThemeVariantVars`.
         */
        const isCssTypeCandidate = (typeAnn: TSESTree.Node): boolean => {
            // Ensure the node is a type, or interface declaration:
            if (!(
                typeAnn.type === TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration
                ||
                typeAnn.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration
            )) return false;
            
            
            
            // Store the type or interface name for easy access:
            const name = typeAnn.id.name;
            
            
            
            // CSS type candidates:
            // - Name starts with `Css` followed by a case boundary (next char is not lowercase), e.g. `CssThemeVariant`.
            // - Name ends with `Vars`, e.g. `ThemeVariantVars`.
            if (
                // Starts with `Css` followed by a case boundary:
                !(/^Css[A-Z]/.test(name)
                &&
                // Ends with `Vars`:
                !/Vars$/.test(name))
            ) return false;
            
            
            
            // All identification checks passed, this is a valid CSS type candidate:
            return true;
        };
        
        
        
        return {
            /**
             * When visiting a Program node, validate the entire file structure
             * if it's a `css-types.ts` or `css-internal-types.ts` file.
             */
            Program(node) {
                // Only validate file structure if we're in an expected module:
                if (!isExpectedModule) return;
                
                
                
                // Validate all top-level bindings in the file:
                for (const statement of node.body) {
                    // Allow imports:
                    if (statement.type === TSESTree.AST_NODE_TYPES.ImportDeclaration) continue;
                    
                    
                    
                    // Allow CSS types:
                    if (isCssTypeCandidate(statement)) continue;
                    
                    
                    
                    // Allow top-level comments (they don't appear as statements in AST)
                    // Comments are handled separately
                    
                    
                    
                    // Reject everything else:
                    
                    // Report the identifier node for better error highlighting:
                    // - If there's no initializer (e.g. for function declarations), report the identifier itself.
                    // - If there's an initializer, report it to indicate the problematic code.
                    context.report({ node: statement, messageId: 'foreignCode' });
                } // for
            },
        };
    },
});
