import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers, collectTopLevelBindings } from './binding-initializers.js'
import { isTopLevel, isExported } from './scope-utilities.js'
import { getDomainMetadata, getExpectedCSSVariableModules } from './domain-utilities.js'
import { resolveGroupPackageRelativePath, findPackageJson } from './utilities.js'
import fs from 'fs'



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
 * - Must be a variable typed as `CssVars` (imported from `@cssfn/core`) or typed as `Refs` (taken from `config[0]`) - for configuration module.
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
 * - Must be exported for non-tuple bindings, or must not be exported for tuple bindings.
 * 
 * CSS variable candidates:
 * - Identified by names that end with "Vars".
 * 
 * Examples:
 * - `export const activeStateVars: CssVars = ...`
 * - `export const [activeStateVars] = cssVars<ActiveStateVars>(...)`
 * - `export const colorConfigVars = config[0]`
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
            wrongFile      : 'CSS variables must be declared in the expected module file (e.g. `css-config.ts`, `css-internal-config.ts`, `css-variables.ts`, or their sub-domain variants).',
            wrongExport    : 'CSS variables must be exported.',
            wrongNonExport : 'CSS variable tuple helpers must not be exported.',
            wrongType      : 'CSS variables must be typed `CssVars` from `@cssfn/core` or from `*Tuple[0-1]`.',
            wrongTypeRef   : 'CSS variables must be typed `Refs` from `config[0]`.',
            wrongName      : 'CSS variable names must follow `<Domain><Group>Vars` naming convention.',
        },
    },
    
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative filename:
        const domainMetadata = getDomainMetadata(relativeFilename);
        
        
        
        // Determine if the CSS variable is declared within the expected module:
        const expectedModules  = getExpectedCSSVariableModules(domainMetadata);
        const isExpectedModule = expectedModules.includes(basename);
        
        
        
        // Flags to track whether types were imported from `@cssfn/core`:
        let isCssVarsImported       = false;
        // let isFutureTypeImported = false;
        
        
        
        // Flags to track whether functions were imported from `@cssfn/core`:
        let isCssVarsFunctionImported = false;
        // let isFutureFunctionImported = false;
        
        
        
        // Tracks `*Tuple` helper declarations that are paired with the exported `*Vars` binding.
        // Example: `disabledStateTuple` → `disabledStateVars`.
        const tupleBindings = new Set<string>();
        
        
        
        // Helper functions:
        
        /**
         * Validates the initializer is a `tuple[0]` for `*Vars` or `tuple[1]` for `*Expressions`.
         */
        const isValidVarsFromTuple = (bindingName: string, value: TSESTree.Node | null): boolean => {
            if (!value || (value.type !== TSESTree.AST_NODE_TYPES.MemberExpression)) return false;
            if (value.object.type !== TSESTree.AST_NODE_TYPES.Identifier) return false;
            if (value.property.type !== TSESTree.AST_NODE_TYPES.Literal) return false;
            if (bindingName.endsWith('Vars')) {
                if (value.property.value !== 0) return false;
            }
            else if (bindingName.endsWith('Expressions')) {
                if (value.property.value !== 1) return false;
            }
            else {
                return false;
            } // if
            
            
            
            const tupleName = value.object.name;
            return tupleBindings.has(tupleName);
        };
        
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
         * Validates the initializer is a `cssVars()` function call.
         * 
         * @param node The variable declarator node to validate.
         * @returns True if the initializer is a valid `cssVars()` function call, false otherwise.
         */
        const isValidCssVarsFunctionCall = (node: TSESTree.VariableDeclarator): boolean => {
            // Ensure the required import is present:
            if (!isCssVarsFunctionImported) return false;
            
            // Ensure the initializer is a `cssVars()` function call:
            if (!node.init || (node.init.type !== TSESTree.AST_NODE_TYPES.CallExpression)) return false;
            if (node.init.callee.type !== TSESTree.AST_NODE_TYPES.Identifier) return false;
            if (node.init.callee.name !== 'cssVars') return false;
            
            
            
            // All conditions satisfied, it's a valid `cssVars()` function call:
            return true;
        };
        
        /**
         * Validates naming convention for CSS variable groups.
         * 
         * Requirements:
         * - Must follow `<Domain><Group>Vars` naming convention.
         * - Must be camelCase.
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
            if (!domainMetadata)  return /^[a-z]+([A-Z][a-z]*)?(Config|Variant|Feature|State|Effect|Layout)(Tuple|Vars|Expressions|Options)$/.test(name);
            
            
            
            // Tight validation (domain context available):
            
            // Build expected name: <domain><subdomain?><group>Vars:
            const variableSuffix    = name.match(/(Tuple|Vars|Expressions|Options)$/)?.[1] ?? ''
            const expectedName      = `${domainMetadata.fullIdentifier}${variableSuffix}`;
            
            // Convert expected name to camelCase (first letter lowercase):
            const expectedNameCamel = expectedName[0].toLowerCase() + expectedName.slice(1);
            
            return (name === expectedNameCamel);
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
                // - Identified by names that end with "Vars", "Expressions", or "Options".
                // - No need for a case boundary check before the suffix:
                //   matches camelCase and PascalCase names like `outlinedVariantVars`, `flowDirectionVariantVars`,
                //   and even acronym-based names like `someCSSVars`.
                if (!/(Tuple|Vars|Expressions|Options)$/.test(name)) return; // exit function
                
                
                
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
                    
                    
                    
                    // Recognize the tuple helper pattern before the regular variable-candidate filter:
                    // `const disabledStateTuple = cssVars<...>(...)`
                    // `export const disabledStateVars = disabledStateTuple[0]`
                    if (bindingName.endsWith('Tuple') && value && (value.type === TSESTree.AST_NODE_TYPES.CallExpression) && (value.callee.type === TSESTree.AST_NODE_TYPES.Identifier) && (value.callee.name === 'cssVars')) {
                        tupleBindings.add(bindingName);
                    } // if
                    
                    
                    
                    // CSS variable candidates:
                    // - Identified by names that end with "Vars", "Expressions", or "Options".
                    // - No need for a case boundary check before the suffix:
                    //   matches camelCase and PascalCase names like `outlinedVariantVars`, `flowDirectionVariantVars`,
                    //   and even acronym-based names like `someCSSVars`.
                    if (!/(Tuple|Vars|Expressions|Options)$/.test(bindingName)) continue; // exit for
                    
                    
                    
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
                    // - Example: `export const strippedVars: CssVars = ...`
                    else {
                        if (bindingName.endsWith('Tuple')) {
                            // Enforce implicit type annotation from `cssVars()`'s return type:
                            if (!isValidCssVarsFunctionCall(node)) {
                                context.report({ node: id, messageId: 'wrongType' });
                            } // if
                        }
                        else if (id.typeAnnotation) {
                            // Enforce explicit type annotation on the variable identifier:
                            if (!isValidType(id.typeAnnotation.typeAnnotation)) {
                                context.report({ node: id, messageId: 'wrongType' });
                            } // if
                        }
                        else {
                            if (domainMetadata?.group === 'Config') {
                                // Enforce implicit type annotation from `config[0-2]`:
                                let expectedIndex = NaN;
                                switch (bindingName.match(/(Vars|Expressions|Options)$/)?.[1]) {
                                    case 'Vars'        : expectedIndex = 0; break
                                    case 'Expressions' : expectedIndex = 1; break
                                    case 'Options'     : expectedIndex = 2; break
                                } // switch
                                if (!node.init || (node.init.type !== TSESTree.AST_NODE_TYPES.MemberExpression) || (node.init.object.type !== TSESTree.AST_NODE_TYPES.Identifier) || (node.init.object.name !== 'config') || (node.init.property.type !== TSESTree.AST_NODE_TYPES.Literal) || (node.init.property.value !== expectedIndex)) {
                                    context.report({ node: id, messageId: 'wrongTypeRef' });
                                } // if
                            }
                            else {
                                // Enforce:
                                // - Implicit type annotation from `cssVars()`'s return type, or
                                // - Extracted from the corresponding tuple helper (e.g., `disabledStateTuple[0]` for `disabledStateVars`).
                                if (!isValidCssVarsFunctionCall(node) && !isValidVarsFromTuple(bindingName, value)) {
                                    context.report({ node: id, messageId: 'wrongType' });
                                } // if
                            } // if
                        } // if
                    } // if
                    
                    
                    
                    // Enforce exported for non-tuple bindings, or enforce non-exported for tuple bindings:
                    if (!bindingName.endsWith('Tuple')) {
                        if (!isExported(node)) {
                            context.report({ node: id, messageId: 'wrongExport' });
                        } // if
                    }
                    else {
                        if (isExported(node)) {
                            context.report({ node: id, messageId: 'wrongNonExport' });
                        } // if
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
 * - Must be used only in `css-internal-variables.ts`.
 * - The `prefix` option must be assigned from a constant imported from `@reusable-ui/css-prefix-default`.
 * 
 * Function candidates:
 * - Identified by names that exactly match "cssVars".
 * - Identified as a function declaration, function expression, or arrow function.
 * - Identified imported from `@cssfn/core`.
 * 
 * Why:
 * - Centralizes `cssVars` function usages for discoverability.
 * - The CSS variables are should be indirectly exposed by CSS hooks, so they should always be declared in `css-internal-variables.ts` only.
 */
export const enforceCssVarsFunctionUsage = createRule({
    name : 'enforce-cssvars-function-usage',
    meta: {
        type: 'problem',
        docs: {
            description : 'Require `cssVars` function usages only in `css-internal-variables.ts`.',
        },
        schema: [], // no options accepted
        messages: {
            missingPrefix : 'The `prefix` option must be provided.',
            wrongPrefix   : 'The `prefix` option must be assigned from `{{expectedConstantName}}` constant imported from `@reusable-ui/css-prefix-default`.',
            wrongFile     : '`cssVars` function usages must be in `css-internal-variables.ts` (will be indirectly exposed by CSS hooks).',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative filename:
        const domainMetadata = getDomainMetadata(relativeFilename);
        
        
        
        // Determine if the CSS variable is declared within the expected module:
        const expectedModules  = ['css-internal-variables.ts'];
        const isExpectedModule = expectedModules.includes(basename);
        
        
        
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
                if ((name !== 'cssVars') || !isCssVarsFunctionImported) return; // exit function
                
                
                
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
                        // Build expected prefix name: <domain><subdomain?><group>Prefix:
                        const expectedConstantName = domainMetadata ? `default${domainMetadata.fullIdentifier}Prefix` : 'N/A';
                        
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
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        
        
        
        // Get domain metadata from a relative filename:
        const domainMetadata = getDomainMetadata(relativeFilename);
        
        
        
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
                if ((name !== 'cssConfig') || !isCssConfigFunctionImported) return; // exit function
                
                
                
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
                        // Build expected prefix name: <domain><subdomain?><group>Prefix:
                        const expectedConstantName = domainMetadata ? `default${domainMetadata.fullIdentifier}Prefix` : 'N/A';
                        
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
 *   - Tuple helpers (ending with `Tuple`), for serving the `*Vars` and `*Options` variables (from `tuple[0-1]`).
 *   - CSS variables (ending with `Vars`).
 *   - For config modules, these are also allowed:
 *     - `config` tuple variable, for serving the `*Vars`, `*Expressions`, and `*Options` variables (from `config[0-2]`).
 *     - `*Expressions` variable (from `config[1]`).
 *     - `*Options` variable (from `config[2]`).
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
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative filename:
        const domainMetadata = getDomainMetadata(relativeFilename);
        
        
        
        // Determine if the CSS variable is declared within the expected module:
        const expectedModules  = getExpectedCSSVariableModules(domainMetadata);
        const isExpectedModule = expectedModules.includes(basename);
        
        
        
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
                    
                    
                    
                    // `*Tuple` helper declarations are part of the `*Tuple[0-1]` idiom for `*Vars` and `*Options` variables.
                    // They are intermediate storage for `cssVars<...>()`, so they should not be rejected as foreign code.
                    if (/Tuple$/.test(bindingName)) continue; // exit for
                    
                    
                    
                    // CSS variable candidates:
                    // - Identified by names that end with "Vars".
                    // - No need for a case boundary check before "Vars":
                    //   matches camelCase and PascalCase names like `outlinedVariantVars`, `flowDirectionVariantVars`,
                    //   and even acronym-based names like `someCSSVars`.
                    // - CSS variables should never be functions,
                    //   the `enforce-variable-conventions` rule will handle that check separately.
                    if (/Vars$/.test(bindingName)) continue; // exit for
                    
                    
                    
                    if (domainMetadata?.group === 'Config') {
                        // CSS config variable candidates:
                        // - Identified by names that match "config".
                        // - CSS config variables should never be functions,
                        //   the `enforce-variable-conventions` rule will handle that check separately.
                        if (bindingName === 'config') continue; // exit for
                        
                        
                        
                        // CSS config expression variable candidates:
                        // - Identified by names that end with "Expressions".
                        // - No need for a case boundary check before "Expressions":
                        //   matches camelCase and PascalCase names like `borderConfigExpressions`, `spacerConfigExpressions`,
                        //   and even acronym-based names like `someCSSExpressions`.
                        // - CSS config expression variables should never be functions,
                        //   the `enforce-variable-conventions` rule will handle that check separately.
                        if (/Expressions$/.test(bindingName)) continue; // exit for
                        
                        
                        
                        // CSS config option variable candidates:
                        // - Identified by names that end with "Options".
                        // - No need for a case boundary check before "Options":
                        //   matches camelCase and PascalCase names like `borderConfigOptions`, `spacerConfigOptions`,
                        //   and even acronym-based names like `someCSSOptions`.
                        // - CSS config option variables should never be functions,
                        //   the `enforce-variable-conventions` rule will handle that check separately.
                        if (/Options$/.test(bindingName)) continue; // exit for
                    } // if
                    
                    
                    
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



/**
 * ESLint rule: require-sideeffects-for-registry
 * 
 * Purpose:
 * - Ensure that any `xxxRegistry.registerXXX(...)` calls are properly marked as sideEffects in the package.json.
 * 
 * Requirements:
 * - If a registry call is found, the corresponding built file (`dist/css-internal-variables.js`) must be listed in `package.json.sideEffects`.
 * 
 * Function candidates:
 * - Any code that registers something into a global registry, for example:
 *   - `animationRegistry.registerAnimation(...)`
 *   - `filterRegistry.registerFilter(...)`
 *   - `boxShadowRegistry.registerBoxShadow(...)`
 * - In other words: whenever a registry object is used to "register" an item, that file is considered side-effectful.
 * 
 * Why:
 * - Registry calls mutate global registries (animations, filters, box shadows).
 * - These mutations are runtime side effects and must be preserved by bundlers.
 * - Without marking them, tree-shaking may drop the module, breaking unified stacks.
 */
export const requireSideeffectsForRegistry = createRule({
    name : 'require-sideeffects-for-registry',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Ensure registry calls are marked as sideEffects in package.json',
        },
        schema   : [], // no options accepted
        messages : {
            missingSideEffect : 'Registry call detected in `{{file}}`, but `{{distFile}}` is not listed in `package.json.sideEffects`.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        if (basename !== 'css-internal-variables.ts') return {};
        
        
        
        // Normalize by dropping everything before "src/":
        const packageRelativeFilename = relativeFilename.replace(/^.*[\\/](?=src[\\/])/, '');
        
        
        
        return {
            CallExpression(node: TSESTree.CallExpression) {
                // Look for `xxxRegistry.registerXXX(...)`:
                if (
                    (node.callee.type !== TSESTree.AST_NODE_TYPES.MemberExpression)
                    ||
                    (node.callee.object.type !== TSESTree.AST_NODE_TYPES.Identifier)
                    ||
                    (node.callee.property.type !== TSESTree.AST_NODE_TYPES.Identifier)
                    ||
                    !node.callee.property.name.startsWith('register')
                ) return;
                
                
                
                // Locate `package.json` at project root:
                const pkgPath = findPackageJson(filename);
                if (!pkgPath || !fs.existsSync(pkgPath)) return;
                
                
                
                // Read package.json's content:
                const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
                const sideEffects: string[] = pkg.sideEffects ?? [];
                
                // Normalize entries to array:
                const sideEffectsArr = Array.isArray(sideEffects) ? sideEffects : [];
                
                
                
                // Map `src` file to `dist` file:
                // - Also replace backslashes (\) with forward slashes (/).
                const relativeDistFile = (
                    packageRelativeFilename
                    .replace(/^src(?=[\\/])/, 'dist')
                    .replace(/\.ts$/, '.js')
                    .replace(/\\/g, '/')
                );
                
                // Check if distFile is listed:
                const isListed = sideEffectsArr.includes(relativeDistFile);
                if (isListed) return;
                
                
                
                // Enforce listed in sideEffects:
                context.report({
                    node,
                    messageId    : 'missingSideEffect',
                    data: {
                        file     : packageRelativeFilename,
                        distFile : relativeDistFile,
                    },
                });
            },
        };
    },
});



/**
 * ESLint rule: migrate-cssvars-tuple-style
 * 
 * Purpose:
 * - Migrate legacy destructured export style:
 *   `export const [fooVars] = cssVars<...>(...)`
 * - Into the tuple-alias style:
 *   `const fooTuple = cssVars<...>(...)`
 *   `export const fooVars = fooTuple[0]`
 * 
 * Why:
 * - Keeps the JSDoc attached to the exported variable binding.
 * - Preserves the tuple helper pattern that newer CSS-variable conventions rely on.
 */
export const migrateCssVarsTupleStyle = createRule({
    name : 'migrate-cssvars-tuple-style',
    meta : {
        type     : 'suggestion',
        fixable  : 'code',
        docs     : {
            description : 'Migrate legacy `export const [fooVars] = cssVars<...>(...)` declarations to the tuple helper style.',
        },
        schema   : [], // no options accepted
        messages : {
            migrateTupleStyle : 'Use the tuple helper form: `const {{tupleName}} = cssVars<...>(...)` and `export const {{bindingName}} = {{tupleName}}[0]`.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        if (basename !== 'css-internal-variables.ts') return {};
        
        
        
        const sourceCode = context.sourceCode;
        
        
        
        return {
            ExportNamedDeclaration(node) {
                if (!node.declaration || (node.declaration.type !== TSESTree.AST_NODE_TYPES.VariableDeclaration)) return;
                if (node.declaration.declarations.length !== 1) return;
                
                
                
                const declarator = node.declaration.declarations[0];
                if (!declarator.id || (declarator.id.type !== TSESTree.AST_NODE_TYPES.ArrayPattern)) return;
                if (declarator.id.elements.length !== 1) return;
                
                
                
                const element = declarator.id.elements[0];
                if (!element || (element.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                const bindingName = element.name;
                if (!/Vars$/.test(bindingName)) return;
                
                
                
                const init = declarator.init;
                if (!init || (init.type !== TSESTree.AST_NODE_TYPES.CallExpression)) return;
                if ((init.callee.type !== TSESTree.AST_NODE_TYPES.Identifier) || (init.callee.name !== 'cssVars')) return;
                
                
                
                const tupleName = bindingName.replace(/Vars$/, 'Tuple');
                
                // Preserve nearest JSDoc comment:
                const comments  = (
                    // Get all comments before the node, then filter for JSDoc comments:
                    sourceCode.getCommentsBefore(node)
                    
                    // JSDoc comments are block comments starting with '*':
                    .filter((comment) => (comment.type === 'Block') && comment.value.startsWith('*'))
                    
                    // Take the last JSDoc comment before the node, if any:
                    .slice(-1)
                );
                
                const selectionStart = comments.length > 0 ? comments[0].range[0] : node.range[0];
                const selectionEnd   = node.range[1];
                
                
                
                context.report({
                    node,
                    messageId : 'migrateTupleStyle',
                    data: {
                        bindingName,
                        tupleName,
                    },
                    fix(fixer) {
                        const replacement = [
                            `const ${tupleName} = ${sourceCode.getText(init)};`,
                            '',
                            comments.map((comment) => sourceCode.getText(comment)).join('\n'),
                            `export const ${bindingName} = ${tupleName}[0];`,
                        ].join('\n');
                        
                        
                        
                        return fixer.replaceTextRange([selectionStart, selectionEnd], replacement);
                    },
                });
            },
        };
    },
});
