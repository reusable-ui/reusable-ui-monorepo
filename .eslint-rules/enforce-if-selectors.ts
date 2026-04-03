import path from 'path'
import { Rule } from 'eslint'
import type { ImportDeclaration, ImportSpecifier, FunctionDeclaration, FunctionExpression, ArrowFunctionExpression } from 'estree'



/**
 * ESLint rule: enforceIfSelectors
 * 
 * Purpose:
 * - Identify `if*` functions that:
 *   - Have at least one parameter typed as `CssStyleCollection` (imported from `@cssfn/core`)
 *   - Have a return type of `CssRule` (imported from `@cssfn/core`)
 * - For those functions only, enforce that they are declared in `css-selectors.ts` or `css-internal-selectors.ts`.
 * 
 * Why:
 * - Centralizes conditional selector helpers in one module for maintainability.
 * - Ensures consistent typing and location for selector helpers.
 */
export const enforceIfSelectors: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `if*` functions (with `CssStyleCollection` param and `CssRule` return from `@cssfn/core`) to be declared only in `css-selectors.ts` or `css-internal-selectors.ts`',
            recommended : false, // not part of ESLint recommended set
        },
        schema: [], // no options accepted
        messages: {
            wrongFile: 'CSS `if*` functions must be declared in `css-selectors.ts` or `css-internal-selectors.ts`.',
        },
    },
    
    create(context: Rule.RuleContext): Rule.RuleListener {
        const filename = context.filename;
        
        
        
        // Flag to track whether `CssStyleCollection` was imported from `@cssfn/core`:
        let isCssfnCssStyleCollection = false;
        
        // Flag to track whether `CssRule` was imported from `@cssfn/core`:
        let isCssfnCssRule = false;
        
        return {
            /**
             * Detect imports of `CssStyleCollection` and `CssRule` from `@cssfn/core`.
             * Set the flags so later checks know these identifiers are the correct ones.
             */
            ImportDeclaration(node: ImportDeclaration) {
                if (node.source.value !== '@cssfn/core') return;
                
                
                
                const importedSpecifiers = node.specifiers.filter((specifier): specifier is ImportSpecifier =>
                    ('imported' in specifier)
                    &&
                    !!specifier.imported
                );
                
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported as any).name === 'CssStyleCollection')) {
                    isCssfnCssStyleCollection = true;
                } // if
                
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported as any).name === 'CssRule')) {
                    isCssfnCssRule = true;
                } // if
            },
            
            /**
             * Inspect function declarations.
             * If the function name matches `/^if/`, enforce:
             * - Must be declared in `css-selectors.ts` or `css-internal-selectors.ts`
             */
            FunctionDeclaration(node) {
                checkFunction(node, filename, context, isCssfnCssStyleCollection, isCssfnCssRule);
            },
            
            /**
             * Inspect variable declarations.
             * If the arrow function (variable) name matches `/^if/`, enforce:
             * - Must be declared in `css-selectors.ts` or `css-internal-selectors.ts`
             */
            VariableDeclarator(node) {
                if (node.id.type !== 'Identifier') return;
                
                
                
                // Only check variables with names like "ifFoo"
                if (!/^if/.test(node.id.name)) return;
                
                
                
                // Ensure the variable holds a function expression:
                if (!node.init || !((node.init.type === 'FunctionExpression') || (node.init.type === 'ArrowFunctionExpression'))) return;
                
                
                
                // Handle arrow functions assigned to consts:
                checkFunction(node.init, filename, context, isCssfnCssStyleCollection, isCssfnCssRule, node.id.name);
            },
        };
    },
};

/**
 * Helper: filter functions by signature, then enforce file location.
 */
const checkFunction = (
    node: (FunctionDeclaration & Rule.NodeParentExtension) | FunctionExpression | ArrowFunctionExpression,
    filename: string,
    context: Rule.RuleContext,
    isCssfnCssStyleCollection: boolean,
    isCssfnCssRule: boolean,
    nameOverride?: string
) => {
    const name = nameOverride ?? (node as any).id?.name;
    if (!name || !/^if/.test(name)) return;
    
    // Filter 1: must have at least one parameter typed as `CssStyleCollection` (from `@cssfn/core`)
    const hasCssStyleParam = node.params.some((param: any) => {
        if (param.type === 'Identifier' && param.typeAnnotation) {
            const typeAnn = param.typeAnnotation.typeAnnotation;
            return (
                (typeAnn.type === 'TSTypeReference')
                &&
                (typeAnn.typeName.type === 'Identifier')
                &&
                (typeAnn.typeName.name === 'CssStyleCollection')
                &&
                isCssfnCssStyleCollection // ensure imported from `@cssfn/core`
            );
        }
        return false;
    });
    if (!hasCssStyleParam) return; // skip enforcement if filter not met
    
    // Filter 2: must have return type `CssRule` (from `@cssfn/core`)
    const returnAnn = (node as any).returnType?.typeAnnotation;
    const isCssRuleReturn = (
        returnAnn
        &&
        returnAnn.type === 'TSTypeReference'
        &&
        returnAnn.typeName.type === 'Identifier'
        &&
        returnAnn.typeName.name === 'CssRule'
        &&
        isCssfnCssRule // ensure imported from `@cssfn/core`
    );
    if (!isCssRuleReturn) return; // skip enforcement if filter not met
    
    // Enforcement: must be in `css-selectors.ts` or `css-internal-selectors.ts`
    if (!['css-selectors.ts', 'css-internal-selectors.ts'].includes(path.basename(filename))) {
        context.report({ node, messageId: 'wrongFile' });
    }
};
