import path from 'path'
import { Rule } from 'eslint'
import type { ImportDeclaration, ImportSpecifier } from 'estree'



/**
 * ESLint rule: enforceCssSelectors
 * 
 * Purpose:
 * - Enforce naming and typing conventions for CSS selector constants and functions.
 * - Variables/functions must:
 *   - Start with `is`, `not`, or `was`, followed by PascalCase, and end with `Selector`
 *   - Be typed/return `CssSelectorCollection` (imported from `@cssfn/core`)
 *   - Be declared only in `css-selectors.ts` or `css-internal-selectors.ts`
 *   - Functions must have at least 1 parameter (unparameterized functions should be constants)
 * 
 * Allowed patterns:
 *   - Constant: `export const isBareSelector: CssSelectorCollection = ".is-bare"`
 *   - Arrow function: `export const isBareOfSelector = <T>(param: T): CssSelectorCollection => ...`
 *   - Function declaration: `export function isBareOfSelector<T>(param: T): CssSelectorCollection { ... }`
 * 
 * Why:
 * - Centralizes selector definitions in one module for maintainability.
 * - Prevents scattering inconsistent selector constants across the codebase.
 * - Ensures type safety by requiring `CssSelectorCollection`.
 * - Functions allow parameterized selectors, while constants discourage unparameterized functions.
 */
export const enforceCssSelectors: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `is*Selector`, `not*Selector`, or `was*Selector` variables/functions to be `CssSelectorCollection` from `@cssfn/core` and only in `css-selectors.ts` or `css-internal-selectors.ts`',
            recommended : false, // not part of ESLint recommended set
        },
        schema: [], // no options accepted
        messages: {
            wrongFile: 'CSS selector variables/functions must be declared in `css-selectors.ts` or `css-internal-selectors.ts`.',
            wrongType: 'CSS selector variables/functions must be typed as `CssSelectorCollection` from `@cssfn/core`.',
            wrongName: 'The selector variable/function name must start with "is", "not", or "was" and followed by PascalCase.',
            noParams: 'CSS selector functions must have at least 1 parameter. Use a constant instead.',
        },
    },
    
    create(context: Rule.RuleContext): Rule.RuleListener {
        const filename = context.filename;
        
        
        
        // Flag to track whether `CssSelectorCollection` was imported from `@cssfn/core`:
        let isCssfnCssSelectorCollection = false;
        
        /**
         * Helper to validate the return type is `CssSelectorCollection`
         */
        const isValidReturnType = (typeAnn: any): boolean => {
            return (
                typeAnn
                &&
                (typeAnn.type === 'TSTypeReference')
                &&
                (typeAnn.typeName.type === 'Identifier')
                &&
                (typeAnn.typeName.name === 'CssSelectorCollection')
                &&
                isCssfnCssSelectorCollection
            );
        };
        
        /**
         * Helper to validate naming convention
         */
        const isValidName = (name: string): boolean => {
            return /^(is|not|was)(?=[A-Z]).*Selector$/.test(name);
        };
        
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
             * Inspect function declarations.
             * If the function name has "Selector" suffix, enforce:
             * - Must prefix with "is", "not", or "was", and followed by PascalCase
             * - Must be declared in `css-selectors.ts` or `css-internal-selectors.ts`
             * - Must have return type of `CssSelectorCollection`
             * - Must have at least 1 parameter
             */
            FunctionDeclaration(node: any) {
                if (!node.id || node.id.type !== 'Identifier') return;
                
                
                
                // Only check functions with "Selector" suffix to avoid false positives on unrelated variables:
                if (!/^.*Selector$/.test(node.id.name)) return;
                
                
                
                // 1. Enforce naming convention:
                if (!isValidName(node.id.name)) {
                    context.report({ node, messageId: 'wrongName' });
                } // if
                
                
                
                // 2. Enforce file location:
                if (!['css-selectors.ts', 'css-internal-selectors.ts'].includes(path.basename(filename))) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
                
                
                
                // 3. Enforce return type annotation:
                if (!isValidReturnType(node.returnType?.typeAnnotation)) {
                    context.report({ node, messageId: 'wrongType' });
                } // if
                
                
                
                // 4. Enforce at least 1 parameter:
                if (!node.params || node.params.length === 0) {
                    context.report({ node, messageId: 'noParams' });
                } // if
            },
            
            /**
             * Inspect variable declarations.
             * If the variable name has "Selector" suffix, enforce:
             * - Must prefix with "is", "not", or "was", and followed by PascalCase
             * - Must be declared in `css-selectors.ts` or `css-internal-selectors.ts`
             * - If it's a constant: must be typed as `CssSelectorCollection`
             * - If it's an arrow function: must have at least 1 parameter and return type `CssSelectorCollection`
             */
            VariableDeclarator(node: any) {
                if (!node.id || node.id.type !== 'Identifier') return;
                
                
                
                // Only check variables with "Selector" suffix to avoid false positives on unrelated variables:
                if (!/^.*Selector$/.test(node.id.name)) return;
                
                
                
                // 1. Enforce naming convention:
                if (!isValidName(node.id.name)) {
                    context.report({ node, messageId: 'wrongName' });
                } // if
                
                
                
                // 2. Enforce file location:
                if (!['css-selectors.ts', 'css-internal-selectors.ts'].includes(path.basename(filename))) {
                    context.report({ node, messageId: 'wrongFile' });
                } // if
                
                
                
                // Check if it's an arrow function
                const isArrowFunction = node.init && node.init.type === 'ArrowFunctionExpression';
                if (isArrowFunction) {
                    // 3. Enforce return type annotation:
                    if (!isValidReturnType(node.init.returnType?.typeAnnotation)) {
                        context.report({ node, messageId: 'wrongType' });
                    } // if
                    
                    
                    
                    // 4. Enforce at least 1 parameter:
                    if (!node.init.params || node.init.params.length === 0) {
                        context.report({ node, messageId: 'noParams' });
                    } // if
                }
                else {
                    // 3. Enforce return type annotation:
                    const typeAnn = (node.id as any).typeAnnotation?.typeAnnotation;
                    if (!isValidReturnType(typeAnn)) {
                        context.report({ node, messageId: 'wrongType' });
                    } // if
                } // if
            },
        };
    },
};
