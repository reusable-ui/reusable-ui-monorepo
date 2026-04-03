import path from 'path'
import { Rule } from 'eslint'
import type { ImportDeclaration, ImportSpecifier } from 'estree'



/**
 * ESLint rule: enforceCssSelectors
 * 
 * Purpose:
 * - Enforce naming and typing conventions for CSS selector constants.
 * - Variables must:
 *   - Start with `is`, `not`, or `was`, followed by PascalCase, and end with `Selector`
 *   - Be typed as `CssSelectorCollection` (imported from `@cssfn/core`)
 *   - Be declared only in `css-selectors.ts`
 * 
 * Why:
 * - Centralizes selector definitions in one module for maintainability.
 * - Prevents scattering inconsistent selector constants across the codebase.
 * - Ensures type safety by requiring `CssSelectorCollection`.
 */
export const enforceCssSelectors: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `is*Selector`, `not*Selector`, or `was*Selector` variables to be `CssSelectorCollection` from `@cssfn/core` and only in `css-selectors.ts`',
            recommended : false, // not part of ESLint recommended set
        },
        schema: [], // no options accepted
        messages: {
            wrongFile: 'CSS selector variables must be declared in `css-selectors.ts`.',
            wrongType: 'CSS selector variables must be typed as `CssSelectorCollection` from `@cssfn/core`.',
            wrongName: 'The selector variable name must start with "is", "not", or "was" and followed by PascalCase.',
        },
    },
    
    create(context: Rule.RuleContext): Rule.RuleListener {
        const filename = context.filename;
        
        
        
        // Flag to track whether `CssSelectorCollection` was imported from `@cssfn/core`:
        let isCssfnCssSelectorCollection = false;
        
        return {
            /**
             * Detect imports of `CssSelectorCollection` from `@cssfn/core`.
             * Set the flag so later checks know this identifier is the correct one.
             */
            ImportDeclaration(node: ImportDeclaration) {
                if (node.source.value !== '@cssfn/core') return;
                
                
                
                const importedSpecifiers = node.specifiers.filter((specifier): specifier is ImportSpecifier =>
                    ('imported' in specifier)
                    &&
                    !!specifier.imported
                );
                
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported as any).name === 'CssSelectorCollection')) {
                    isCssfnCssSelectorCollection = true;
                } // if
            },
            
            /**
             * Inspect variable declarations.
             * If the variable name having "Selector" suffix, enforce:
             * - Must prefix with "is", "not", or "was", and followed by PascalCase
             * - Must be declared in `css-selectors.ts`
             * - Must be typed as `CssSelectorCollection`
             */
            VariableDeclarator(node) {
                if (node.id.type !== 'Identifier') return;
                
                
                
                // Only check variables with "Selector" suffix to avoid false positives on unrelated variables:
                if (!/^.*Selector$/.test(node.id.name)) return;
                
                
                
                // 1. Enforce naming convention: must start with "is", "not", or "was":
                if (!/^(is|not|was)(?=[A-Z]).*Selector$/.test(node.id.name)) {
                    context.report({ node, messageId: 'wrongName' });
                } // if
                
                
                
                // 2. Enforce file location
                if (path.basename(filename) !== 'css-selectors.ts') {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
                
                
                
                // 3. Enforce type annotation
                // In TypeScript AST, type annotations are nested:
                // node.id.typeAnnotation?.typeAnnotation
                const typeAnn = (node.id as any).typeAnnotation?.typeAnnotation;
                if (
                    !typeAnn
                    ||
                    (typeAnn.type !== 'TSTypeReference')
                    ||
                    (typeAnn.typeName.type !== 'Identifier')
                    ||
                    (typeAnn.typeName.name !== 'CssSelectorCollection')
                    ||
                    !isCssfnCssSelectorCollection
                ) {
                    context.report({ node, messageId: 'wrongType' });
                } // if
            },
        };
    },
};
