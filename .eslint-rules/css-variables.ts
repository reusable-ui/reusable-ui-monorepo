import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers, collectTopLevelBindings } from './binding-initializers.js'
import { isTopLevel, isExported } from './scope-utilities.js'
import { getDomainIdentifier, getSubDomainIdentifier } from './domain-utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `css-variables/${name}`,
);



/**
 * ESLint rule: enforce-variable-conventions
 * 
 * Purpose:
 * - Enforce naming and typing conventions for CSS variable constants.
 * - Ensure CSS variables are centralized in the correct files.
 * 
 * Requirements:
 * - Must be a variable typed as `CssVars` (imported from `@cssfn/core`).
 * - Cannot be a function (function declaration, function expression, or arrow function).
 * - Must be declared only in:
 *   - For general‑purpose variables → must be declared only in:
 *     • `css-variables.ts`
 *     • `css-internal-variables.ts`
 *     • `css-<subdomain>-variables.ts`
 *     • `css-internal-<subdomain>-variables.ts`
 *   - For config‑specific variables → must be declared only in:
 *     • `css-config.ts`
 *     • `css-internal-config.ts`
 *     • `css-<subdomain>-config.ts`
 *     • `css-internal-<subdomain>-config.ts`
 * - Must be exported.
 * 
 * CSS variable candidates:
 * - Identified by names that end with "Vars".
 * 
 * Examples:
 * - `export const activeStateVars: CssVars = ...`
 * - `export const [activeStateVars] = cssVars<ActiveStateVars>(...)`
 * 
 * Why:
 * - Prevents scattering inconsistent CSS variable definitions across the codebase.
 * - Ensures type safety and readability by enforcing correct imports and naming conventions.
 * - Centralizes CSS variable definitions for discoverability.
 */
export const enforceVariableConventions = createRule({
    name : 'enforce-variable-conventions',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require CSS variables to be correctly named, typed, and declared only in `css-variables.ts` or `css-internal-variables.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            wrongFile   : 'CSS variables must be declared in the expected module file (e.g. `css-config.ts`, `css-internal-config.ts`, `css-variables.ts`, or their sub-domain variants).',
            wrongExport : 'CSS variables must be exported.',
            wrongType   : 'CSS variables must be typed `CssVars` from `@cssfn/core`.',
            wrongName   : 'CSS variable names must follow `<Domain><Group>Vars` naming convention.',
        },
    },
    
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = path.relative(process.cwd(), filename);
        
        
        
        // Get domain identifier from a relative filename:
        const domainIdentifier    = getDomainIdentifier(relativeFilename);
        const subdomainIdentifier = getSubDomainIdentifier(relativeFilename);
        
        
        
        // Determine if the CSS variable is declared within the expected module:
        //
        // Rules:
        // - Config‑related variables → must be inside one of:
        //   • `css-config.ts`
        //   • `css-internal-config.ts`
        //   • `css-<subdomain>-config.ts`
        //   • `css-internal-<subdomain>-config.ts`
        // - General‑purpose variables → must be inside one of:
        //   • `css-variables.ts`
        //   • `css-internal-variables.ts`
        //   • `css-<subdomain>-variables.ts`
        //   • `css-internal-<subdomain>-variables.ts`
        const subdomainSuffix = subdomainIdentifier ? `-${subdomainIdentifier[0].toLowerCase() + subdomainIdentifier.slice(1)}` : '';
        const isExpectedModule = (
            // Config‑related variables:
            domainIdentifier?.endsWith('Config')
            ? [
                `css${subdomainSuffix}-config.ts`,
                `css-internal${subdomainSuffix}-config.ts`,
            ]
            
            // General‑purpose variables:
            : [
                `css${subdomainSuffix}-variables.ts`,
                `css-internal${subdomainSuffix}-variables.ts`,
            ]
        ).includes(basename);
        
        
        
        // Flags to track whether types were imported from `@cssfn/core`:
        let isCssVarsImported       = false;
        // let isFutureTypeImported = false;
        
        
        
        // Flags to track whether functions were imported from `@cssfn/core`:
        let isCssVarsFunctionImported = false;
        // let isFutureFunctionImported = false;
        
        
        
        // Helper functions:
        
        /**
         * Validates the type is `CssVars` (from `@cssfn/core`).
         */
        const isValidType = (returnAnn: TSESTree.TypeNode | undefined): boolean => {
            // Ensure the required import is present:
            if (!isCssVarsImported) return false;
            
            
            
            // Must be a type reference to `CssVars`:
            return (
                !!returnAnn
                &&
                (returnAnn.type === TSESTree.AST_NODE_TYPES.TSTypeReference)
                &&
                (returnAnn.typeName.type === TSESTree.AST_NODE_TYPES.Identifier)
                &&
                (returnAnn.typeName.name === 'CssVars')
            );
        };
        
        /**
         * Validates naming convention for CSS variable groups.
         * 
         * Requirements:
         * - Must follow `<Domain><Group>Vars` naming convention.
         * - Must be camelCase.
         * - The `domainIdentifier` is PascalCase (e.g. `ColorConfig`, `BorderFeature`).
         *   • The trailing part (`Config`, `Feature`, `Variant`, `State`, `Effect`) is the **group name**.
         *   • The leading part (`Color`, `Border`, `FlowDirection`) is the **domain base**.
         * - The optional `subdomainIdentifier` is appended directly after the domain base (PascalCase).
         * 
         * Examples:
         * - ✅ `colorConfigVars`          → domain=`Color`, group=`Config`
         * - ✅ `borderFeatureVars`        → domain=`Border`, group=`Feature`
         * - ✅ `flowDirectionVariantVars` → domain=`FlowDirection`, group=`Variant`
         * - ✅ `colorParamConfigVars`     → domain=`Color`, subdomain=`Param`, group=`Config`
         * - ❌ `colorVarsConfig`          (wrong order)
         * - ❌ `disabledstateVars`        (missing case boundary)
         */
        const isValidVariableGroupName = (name: string): boolean => {
            // Loose validation (no domain context available):
            if (!domainIdentifier)  return /^[a-z]+([A-Z][a-z]*)?(Config|Variant|Feature|State|Effect)Vars$/.test(name);
            
            
            
            // Tight validation (domain context available):
            
            // Extract group name from the domainIdentifier (e.g. "ColorConfig" → "Config"):
            const groupName    = domainIdentifier.match(/(Config|Variant|Feature|State|Effect)$/)?.[1] ?? '';
            
            // Extract domain base (remove the group suffix):
            const domainBase   = domainIdentifier.slice(0, -groupName.length);
            
            // Convert domain base to camelCase (first letter lowercase):
            const domainCamel  = domainBase[0].toLowerCase() + domainBase.slice(1);
            
            // Build expected name: <domain><subdomain?><group>Vars:
            const expectedName = `${domainCamel}${subdomainIdentifier ?? ''}${groupName}Vars`;
            
            return (name === expectedName);
        };
        
        
        
        return {
            /**
             * Detect import of `CssVars` from `@cssfn/core`.
             * Set the flag so later checks know this identifier is the correct one.
             */
            ImportDeclaration(node) {
                // Only check imports from `@cssfn/core`:
                if (node.source.value !== '@cssfn/core') return;
                
                
                
                // Determine which relevant types are imported:
                const importedSpecifiers = node.specifiers.filter((specifier): specifier is TSESTree.ImportSpecifier & { imported: TSESTree.Identifier } =>
                    ('imported' in specifier)
                    &&
                    specifier.imported instanceof Object
                );
                
                // Check if `CssVars` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'CssVars'))) {
                    isCssVarsImported = true;
                } // if
                
                // Check if `cssVars()` is imported:
                if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'cssVars'))) {
                    isCssVarsFunctionImported = true;
                } // if
            },
            
            
            
            /**
             * Inspect function declarations.
             * Handles CSS variable functions (the CSS variables are should never be functions).
             */
            FunctionDeclaration(node) {
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.id.name;
                
                
                
                // CSS variable candidates:
                // - Identified by names that end with "Vars".
                // - No need for a case boundary check before "Vars":
                //   matches camelCase and PascalCase names like `outlineVars`, `flowDirectionVars`,
                //   and even acronym-based names like `someCSSVars`.
                if (!/Vars$/.test(name)) return;
                
                
                
                // Enforce naming convention:
                if (!isValidVariableGroupName(name)) {
                    context.report({ node, messageId: 'wrongName' });
                } // if
                
                
                
                // Enforce not being a function:
                context.report({ node, messageId: 'wrongType' });
                
                
                
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
             * Handles CSS variable constants.
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
                    
                    
                    
                    // CSS variable candidates:
                    // - Identified by names that end with "Vars".
                    // - No need for a case boundary check before "Vars":
                    //   matches camelCase and PascalCase names like `outlineVars`, `flowDirectionVars`,
                    //   and even acronym-based names like `someCSSVars`.
                    if (!/Vars$/.test(bindingName)) return;
                    
                    
                    
                    // Enforce naming convention:
                    if (!isValidVariableGroupName(bindingName)) {
                        context.report({ node: id, messageId: 'wrongName' });
                    } // if
                    
                    
                    
                    // Case 1: Function initializer (either arrow or function expression):
                    if (value && ((value.type === TSESTree.AST_NODE_TYPES.FunctionExpression) || (value.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression))) {
                        // Enforce implicit type annotation from `cssVars()`'s return type:
                        context.report({ node: id, messageId: 'wrongType' });
                    } // if
                    
                    
                    
                    // Case 2: Constant initializer (string literal, etc.):
                    // - Example: `export const bareVars: CssVars = ...`
                    else {
                        if (id.typeAnnotation) {
                            // Enforce explicit type annotation on the variable identifier:
                            if (!isValidType(id.typeAnnotation.typeAnnotation)) {
                                context.report({ node: id, messageId: 'wrongType' });
                            } // if
                        }
                        else {
                            // Enforce implicit type annotation from `cssVars()`'s return type:
                            if (!isCssVarsFunctionImported || !node.init || (node.init.type !== TSESTree.AST_NODE_TYPES.CallExpression) || (node.init.callee.type !== TSESTree.AST_NODE_TYPES.Identifier) || (node.init.callee.name !== 'cssVars')) {
                                context.report({ node: id, messageId: 'wrongType' });
                            } // if
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



/**
 * ESLint rule: enforce-cssvars-function-usage
 * 
 * Purpose:
 * - Ensure `cssVars` function usages are centralized in the correct files.
 * 
 * Requirements:
 * - Must be used only in `css-variables.ts` or `css-internal-variables.ts`.
 * - The `prefix` option must be assigned from a constant imported from `@reusable-ui/css-prefix-default`.
 * 
 * Function candidates:
 * - Identified by names that exactly match "cssVars".
 * - Identified as a function declaration, function expression, or arrow function.
 * - Identified imported from `@cssfn/core`.
 * 
 * Why:
 * - Centralizes `cssVars` function usages for discoverability.
 */
export const enforceCssVarsFunctionUsage = createRule({
    name : 'enforce-cssvars-function-usage',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `cssVars` function usages only in `css-variables.ts` or `css-internal-variables.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            missingPrefix : 'The `prefix` option must be provided.',
            wrongPrefix   : 'The `prefix` option must be assigned from `{{expectedConstantName}}` constant imported from `@reusable-ui/css-prefix-default`.',
            wrongFile     : '`cssVars` function usages must be in `css-variables.ts` or `css-internal-variables.ts`.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = path.relative(process.cwd(), filename);
        
        
        
        // Get domain identifier from a relative filename:
        const domainIdentifier = getDomainIdentifier(relativeFilename);
        
        
        
        // Flags to track whether functions were imported from `@cssfn/core`:
        let isCssVarsFunctionImported   = false;
        const prefixesImported          = new Set<string>();
        
        
        
        return {
            /**
             * Detect imports of `cssVars()` from `@cssfn/core`.
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
                    
                    // Check if `cssVars()` is imported:
                    if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'cssVars'))) {
                        isCssVarsFunctionImported = true;
                    } // if
                } // if
                
                
                
                // Handle imports from `@reusable-ui/css-prefix-default`:
                else if (node.source.value === '@reusable-ui/css-prefix-default') {
                    // Determine which relevant types are imported:
                    const importedSpecifiers = node.specifiers.filter((specifier): specifier is TSESTree.ImportSpecifier & { imported: TSESTree.Identifier } =>
                        ('imported' in specifier)
                        &&
                        specifier.imported instanceof Object
                    );
                    
                    // Collect imported prefixes from `@reusable-ui/css-prefix-default`:
                    for (const importedPrefix of importedSpecifiers.map((importedSpecifier) => importedSpecifier.imported.name).filter((importedName) => /^default([A-Z][a-z]*){1,2}[A-Z][a-z]*Prefix$/.test(importedName))) {
                        prefixesImported.add(importedPrefix);
                    } // if
                } // if
            },
            
            
            
            /**
             * Detects function usages.
             * Handles `cssVars()` usages.
             */
            CallExpression(node) {
                // Ensure the function has an identifier name:
                if ((node.callee.type !== 'Identifier') || (node.callee.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.callee.name;
                
                
                
                // `cssVars()` function candidates:
                // - Identified by names that exactly match "cssVars".
                // - Identified imported from `@cssfn/core`.
                if ((name !== 'cssVars') || !isCssVarsFunctionImported) return;
                
                
                
                const isExpectedModule = ['css-variables.ts', 'css-internal-variables.ts'].includes(basename);
                
                
                
                // Enforce `prefix` option assignment:
                const options = node.arguments[0];
                if (!options || (options.type !== TSESTree.AST_NODE_TYPES.ObjectExpression)) {
                    context.report({ node, messageId: 'missingPrefix' });
                }
                else {
                    const prefixAnn = options.properties.find((property): property is TSESTree.Property => (property.type === TSESTree.AST_NODE_TYPES.Property) && (property.key.type === TSESTree.AST_NODE_TYPES.Identifier) && (property.key.name === 'prefix'))
                    if (!prefixAnn) {
                        context.report({ node, messageId: 'missingPrefix' });
                    }
                    else {
                        const expectedConstantName = (domainIdentifier !== undefined) ? `default${domainIdentifier}Prefix` : 'N/A';
                        
                        if ((prefixAnn.value.type !== TSESTree.AST_NODE_TYPES.Identifier) || !prefixesImported.has(prefixAnn.value.name)) {
                            context.report({ node: prefixAnn.value, messageId: 'wrongPrefix', data: { expectedConstantName } });
                        }
                        else if (prefixAnn.value.name !== expectedConstantName) {
                            context.report({ node: prefixAnn.value, messageId: 'wrongPrefix', data: { expectedConstantName } });
                        } // if
                    } // if
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
 * ESLint rule: enforce-cssconfig-function-usage
 * 
 * Purpose:
 * - Ensure `cssConfig` function usages are centralized in the correct files.
 * 
 * Requirements:
 * - The `prefix` option must be assigned from a constant imported from `@reusable-ui/css-prefix-default`.
 * 
 * Function candidates:
 * - Identified by names that exactly match "cssConfig".
 * - Identified as a function declaration, function expression, or arrow function.
 * - Identified imported from `@cssfn/core`.
 * 
 * Why:
 * - Centralizes `cssConfig` function usages for discoverability.
 */
export const enforceCssConfigFunctionUsage = createRule({
    name : 'enforce-cssconfig-function-usage',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `cssConfig` function usages only in `css-variables.ts` or `css-internal-variables.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            missingPrefix : 'The `prefix` option must be provided.',
            wrongPrefix   : 'The `prefix` option must be assigned from `{{expectedConstantName}}` constant imported from `@reusable-ui/css-prefix-default`.',
            wrongFile     : '`cssConfig` function usages must be in `css-variables.ts` or `css-internal-variables.ts`.',
        },
    },
    create(context) {
        const filename         = context.filename;
        // const basename         = path.basename(filename);
        const relativeFilename = path.relative(process.cwd(), filename);
        
        
        
        // Get domain identifier from a relative filename:
        const domainIdentifier = getDomainIdentifier(relativeFilename);
        
        
        
        // Flags to track whether functions were imported from `@cssfn/core`:
        let isCssConfigFunctionImported = false;
        const prefixesImported          = new Set<string>();
        
        
        
        return {
            /**
             * Detect imports of `cssConfig()` from `@cssfn/core`.
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
                    
                    // Check if `cssConfig()` is imported:
                    if (importedSpecifiers.some((importedSpecifier) => (importedSpecifier.imported.name === 'cssConfig'))) {
                        isCssConfigFunctionImported = true;
                    } // if
                } // if
                
                
                
                // Handle imports from `@reusable-ui/css-prefix-default`:
                else if (node.source.value === '@reusable-ui/css-prefix-default') {
                    // Determine which relevant types are imported:
                    const importedSpecifiers = node.specifiers.filter((specifier): specifier is TSESTree.ImportSpecifier & { imported: TSESTree.Identifier } =>
                        ('imported' in specifier)
                        &&
                        specifier.imported instanceof Object
                    );
                    
                    // Collect imported prefixes from `@reusable-ui/css-prefix-default`:
                    for (const importedPrefix of importedSpecifiers.map((importedSpecifier) => importedSpecifier.imported.name).filter((importedName) => /^default([A-Z][a-z]*){1,2}[A-Z][a-z]*Prefix$/.test(importedName))) {
                        prefixesImported.add(importedPrefix);
                    } // if
                } // if
            },
            
            
            
            /**
             * Detects function usages.
             * Handles `cssConfig()` usages.
             */
            CallExpression(node) {
                // Ensure the function has an identifier name:
                if ((node.callee.type !== 'Identifier') || (node.callee.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const name = node.callee.name;
                
                
                
                // `cssConfig()` function candidates:
                // - Identified by names that exactly match "cssConfig".
                // - Identified imported from `@cssfn/core`.
                if ((name !== 'cssConfig') || !isCssConfigFunctionImported) return;
                
                
                
                // Enforce `prefix` option assignment:
                const options = node.arguments[1];
                if (!options || (options.type !== TSESTree.AST_NODE_TYPES.ObjectExpression)) {
                    context.report({ node, messageId: 'missingPrefix' });
                }
                else {
                    const prefixAnn = options.properties.find((property): property is TSESTree.Property => (property.type === TSESTree.AST_NODE_TYPES.Property) && (property.key.type === TSESTree.AST_NODE_TYPES.Identifier) && (property.key.name === 'prefix'))
                    if (!prefixAnn) {
                        context.report({ node, messageId: 'missingPrefix' });
                    }
                    else {
                        const expectedConstantName = (domainIdentifier !== undefined) ? `default${domainIdentifier}Prefix` : 'N/A';
                        
                        if ((prefixAnn.value.type !== TSESTree.AST_NODE_TYPES.Identifier) || !prefixesImported.has(prefixAnn.value.name)) {
                            context.report({ node: prefixAnn.value, messageId: 'wrongPrefix', data: { expectedConstantName } });
                        }
                        else if (prefixAnn.value.name !== expectedConstantName) {
                            context.report({ node: prefixAnn.value, messageId: 'wrongPrefix', data: { expectedConstantName } });
                        } // if
                    } // if
                } // if
            },
        };
    },
});



/**
 * ESLint rule: no-foreign-code
 * 
 * Purpose:
 * - Prevent arbitrary/foreign code inside `css-variables.ts` and `css-internal-variables.ts`.
 * - All supporting logic must live in separate modules and be imported.
 * 
 * Requirements:
 * - Allowed top-level statements:
 *   - Import declarations.
 *   - CSS variables (ending with `Vars`).
 *   - Comments.
 * - Disallow any other top-level code.
 * 
 * CSS variable candidates:
 * - Identified by names that end with "Vars".
 * 
 * Why:
 * - Keeps CSS variable modules clean and focused.
 * - Improves maintainability by restricting logic to proper CSS-variable-related logics only.
 */
export const noForeignCode = createRule({
    name : 'no-foreign-code',
    meta: {
        type: 'problem',
        docs: {
            description : 'Disallow arbitrary code in `css-variables.ts` and `css-internal-variables.ts`. Only imports, CSS variables, and comments are allowed.',
        },
        schema: [], // no options accepted
        messages: {
            foreignCode : 'Only imports, CSS variables, and comments are allowed in `css-variables.ts` / `css-internal-variables.ts`. Move supporting code to separate modules.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const isExpectedModule = ['css-variables.ts', 'css-internal-variables.ts'].includes(basename);
        
        
        
        return {
            /**
             * When visiting a Program node, validate the entire file structure
             * if it's a `css-variables.ts` or `css-internal-variables.ts` file.
             */
            Program(node) {
                // Only validate file structure if we're in an expected module:
                if (!isExpectedModule) return;
                
                
                
                // Validate all top-level bindings in the file:
                for (const { id } of collectTopLevelBindings(node)) {
                    // If there's no identifier (shouldn't happen for named bindings), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Get the binding name for easy access:
                    const bindingName = id.name;
                    
                    
                    
                    // CSS variable candidates:
                    // - Identified by names that end with "Vars".
                    // - No need for a case boundary check before "Vars":
                    //   matches camelCase and PascalCase names like `outlineVars`, `flowDirectionVars`,
                    //   and even acronym-based names like `someCSSVars`.
                    // - CSS variables should never be functions,
                    //   the `enforce-variable-conventions` rule will handle that check separately.
                    if (/Vars$/.test(bindingName)) continue;
                    
                    
                    
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
