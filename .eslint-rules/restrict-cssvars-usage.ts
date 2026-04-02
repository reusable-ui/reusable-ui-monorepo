import fs from 'fs'
import path from 'path'
import { Rule } from 'eslint'
import type { ImportDeclaration, CallExpression } from 'estree'
import { findPackageJson } from './utilities.js'



/**
 * ESLint rule: restrictCssVarsUsage
 * 
 * Purpose:
 * - Prevent accidental usage of `cssVars()` from `@cssfn/core` outside of `css-variables.ts`.
 * - Exception: if the nearest package.json marks the project as deprecated, skip checks entirely.
 * 
 * Why:
 * - Centralizes CSS variable definitions in `css-variables.ts` for maintainability.
 * - Avoids scattering `cssVars()` calls across the codebase.
 */
export const restrictCssVarsUsage: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description : 'Disallow usage of cssVars() from @cssfn/core outside css-variables.ts, unless project is marked deprecated',
            recommended : false, // not part of ESLint recommended set
        },
        schema: [], // no options accepted
        messages: {
            restricted  : 'cssVars() from @cssfn/core can only be used in css-variables.ts module',
        },
    },
    
    create(context: Rule.RuleContext): Rule.RuleListener {
        const filename = context.filename;
        
        // Step 1: Check if the nearest package.json marks this project as deprecated:
        const packagePath = findPackageJson(filename);
        let isDeprecated = false;
        
        if (packagePath) {
            try {
                // Read and parse the package.json:
                const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                
                // Check if the "keywords" array includes "deprecated":
                isDeprecated      = (packageJson.keywords as string[] | undefined)?.includes('deprecated') ?? false;
            }
            catch {
                // Ignore parse errors (invalid package.json)
            } // try
        } // if
        
        // If deprecated, skip all checks:
        if (isDeprecated) return {};
        
        
        
        // Flag to track whether `cssVars()` was imported from `@cssfn/core`:
        let isCssfnCssVars = false;
        
        return {
            /**
             * Detect imports of `cssVars` from `@cssfn/core`.
             * If found, set a flag so later call expressions can be validated.
             */
            ImportDeclaration(node: ImportDeclaration) {
                if (
                    (node.source.value === '@cssfn/core')
                    &&
                    node.specifiers.some((specifier) =>
                        ('imported' in specifier)
                        &&
                        specifier.imported
                        &&
                        (specifier.imported as any).name === 'cssVars'
                    )
                ) {
                    isCssfnCssVars = true;
                } // if
            },
            
            /**
             * Detect calls to `cssVars()`.
             * Report an error if:
             * - cssVars was imported from @cssfn/core
             * - The call occurs outside of `css-variables.ts` module
             */
            CallExpression(node: CallExpression) {
                if (
                    isCssfnCssVars
                    &&
                    (node.callee.type === 'Identifier')
                    &&
                    (node.callee.name === 'cssVars')
                    &&
                    (path.basename(filename) !== 'css-variables.ts')
                ) {
                    context.report({
                        node,
                        messageId: 'restricted',
                    });
                }
            },
        };
    },
};
