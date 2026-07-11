import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { collectBindingInitializers } from './binding-initializers.js'
import { isTopLevel, /* isExported */ } from './scope-utilities.js'
import { getDomainMetadata } from './domain-utilities.js'
import { resolveGroupPackageRelativePath } from './utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `react-migrate-hooks/${name}`,
);



/**
 * ESLint rule: migrate-use-domain-group-suffix
 * 
 * Purpose:
 * - Enforce migration of legacy hooks from `use<Domain>Behavior<Group>` to `use<Domain><Group>`.
 * - Ensure consistent behavioral-state nomenclature throughout the monorepo.
 * 
 * Detection Criteria:
 * - Identified by names that match `use<Domain>Behavior<Group>`.
 * 
 * Why:
 * - Standardize React hook naming for clarity and consistency.
 */
export const migrateUseDomainGroupSuffix = createRule({
    name : 'migrate-use-domain-group-suffix',
    meta : {
        type     : 'suggestion',
        fixable  : 'code',
        docs     : {
            description : 'Enforce React hooks to follow the declarative `use<Domain><Group>` naming convention.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongName : 'React hook "{{currentName}}" should be renamed to "{{expectedName}}" to match the behavioral naming strategy.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        
        
        
        // Skip files that are explicitly designated as deprecated:
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative module locations:
        const domainMetadata = getDomainMetadata(relativeFilename);
        if (!domainMetadata) return {};
        // if (domainMetadata.group === 'Variant') return {};
        
        
        
        const legacyTargetName = `use${domainMetadata.domain}Behavior${domainMetadata.group}`;
        const expectedName     = `use${domainMetadata.domain}${domainMetadata.group}`;
        
        
        
        // // Excludes:
        // if ([
        //     'useAnimationState',
        //     'useObserverState',
        // ].includes(legacyTargetName)) return {};
        
        
        
        return {
            /**
             * Inspect standard function declarations:
             * e.g., function useThemeVariant() {}
             */
            FunctionDeclaration(node) {
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const currentName = node.id.name;
                
                
                
                // React hook candidates:
                // - Identified by names that match `use<Domain>Behavior<Group>`.
                if (currentName !== legacyTargetName) return; // exit function
                
                
                
                // Enforce naming migration:
                const id = node.id;
                context.report({
                    node      : id,
                    messageId : 'wrongName',
                    data      : {
                        currentName,
                        expectedName,
                    },
                    fix(fixer) {
                        return fixer.replaceText(id, expectedName);
                    },
                });
            },
            
            
            
            /**
             * Inspect functions in variable declarators:
             * e.g., const useThemeVariant = () => {}
             */
            VariableDeclarator(node) {
                // Only validate top-level variable declarations:
                // - Prevents false positives from nested variables inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Collect all binding identifiers and their initializers for validation:
                const bindingInitializerList = collectBindingInitializers(node);
                
                
                
                // Validate each binding item:
                for (const { id } of bindingInitializerList) {
                    // If there's no identifier (shouldn't happen for valid exports), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Store the variable name for easy access:
                    const currentName = id.name;
                    
                    
                    
                    // React hook candidates:
                    // - Identified by names that match `use<Domain>Behavior<Group>`.
                    if (currentName !== legacyTargetName) continue; // exit for
                    
                    
                    
                    // Enforce naming migration:
                    context.report({
                        node      : id,
                        messageId : 'wrongName',
                        data      : {
                            currentName,
                            expectedName,
                        },
                        fix(fixer) {
                            return fixer.replaceText(id, expectedName);
                        },
                    });
                } // for
            },
        };
    },
});



/**
 * Explicit overrides for irregular domain names.
 * These are cases where the resolved form does not follow
 * the normal adjective/verb → past participle pattern.
 */
const irregularMap: Record<string, string> = {
    View     : 'ViewIndex', // Clarify numeric return type.
    
    Collapse : 'Expanded',  // Use positive form instead of negative one.
};

/**
 * Explicit overrides for regular domain names.
 * These are verbs that should be converted into their
 * past participle form for clarity as a status.
 */
const regularMap: Record<string, string> = {
    Focus    : 'Focused',
    Hover    : 'Hovered',
    Press    : 'Pressed',
    
    Drag     : 'Dragged',
};

/**
 * Resolve a domain word into its standardized "resolved" form.
 * - First check irregular overrides.
 * - Then check regular overrides.
 * - Otherwise, return the base form unchanged (adjective/noun).
 * 
 * @param base The domain word (e.g. "Focus", "Active", "View").
 * @returns The standardized resolved form (e.g. "Focused", "Active", "ViewIndex").
 */
const resolveDomainWord = (base: string): string => {
    if (irregularMap[base]) return irregularMap[base];
    if (regularMap[base]) return regularMap[base];
    
    // Default:
    // - Keep the base form (adjective/noun).
    return base;
};



/**
 * ESLint rule: migrate-use-resolved-domain-group-suffix
 * 
 * Purpose:
 * - Enforce migration of legacy hooks from `useResolved<Domain><Group>` to `useResolved<Domain-ed>`.
 * - Ensure consistent resolver-state nomenclature throughout the monorepo.
 * 
 * Detection Criteria:
 * - Identified by names that match `useResolved<Domain><Group>`.
 * 
 * Why:
 * - Standardize React hook naming for clarity and consistency.
 */
export const migrateUseResolvedDomainGroupSuffix = createRule({
    name : 'migrate-use-resolved-domain-group-suffix',
    meta : {
        type     : 'suggestion',
        fixable  : 'code',
        docs     : {
            description : 'Enforce React hooks to follow the declarative `useResolved<Domain-ed>` naming convention.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongName : 'React hook "{{currentName}}" should be renamed to "{{expectedName}}" to match the resolver naming strategy.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        
        
        
        // Skip files that are explicitly designated as deprecated:
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative module locations:
        const domainMetadata = getDomainMetadata(relativeFilename);
        if (!domainMetadata) return {};
        // if (domainMetadata.group === 'Variant') return {};
        
        
        
        const legacyTargetName = `useResolved${domainMetadata.domain}${domainMetadata.group}`;
        const expectedName     = `useResolved${resolveDomainWord(domainMetadata.domain)}`;
        
        
        
        // // Excludes:
        // if ([
        //     'useAnimationState',
        //     'useObserverState',
        // ].includes(legacyTargetName)) return {};
        
        
        
        return {
            /**
             * Inspect standard function declarations:
             * e.g., function useThemeVariant() {}
             */
            FunctionDeclaration(node) {
                // Only validate top-level function declarations:
                // - Prevents false positives from nested functions inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Ensure the function has an identifier name:
                if (!node.id || (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)) return;
                
                
                
                // Store the function name for easy access:
                const currentName = node.id.name;
                
                
                
                // React hook candidates:
                // - Identified by names that match `useResolved<Domain><Group>`.
                if (currentName !== legacyTargetName) return; // exit function
                
                
                
                // Enforce naming migration:
                const id = node.id;
                context.report({
                    node      : id,
                    messageId : 'wrongName',
                    data      : {
                        currentName,
                        expectedName,
                    },
                    fix(fixer) {
                        return fixer.replaceText(id, expectedName);
                    },
                });
            },
            
            
            
            /**
             * Inspect functions in variable declarators:
             * e.g., const useThemeVariant = () => {}
             */
            VariableDeclarator(node) {
                // Only validate top-level variable declarations:
                // - Prevents false positives from nested variables inside functions, etc.
                if (!isTopLevel(node)) return;
                
                
                
                // Collect all binding identifiers and their initializers for validation:
                const bindingInitializerList = collectBindingInitializers(node);
                
                
                
                // Validate each binding item:
                for (const { id } of bindingInitializerList) {
                    // If there's no identifier (shouldn't happen for valid exports), skip it:
                    if (!id) continue;
                    
                    
                    
                    // Store the variable name for easy access:
                    const currentName = id.name;
                    
                    
                    
                    // React hook candidates:
                    // - Identified by names that match `useResolved<Domain><Group>`.
                    if (currentName !== legacyTargetName) continue; // exit for
                    
                    
                    
                    // Enforce naming migration:
                    context.report({
                        node      : id,
                        messageId : 'wrongName',
                        data      : {
                            currentName,
                            expectedName,
                        },
                        fix(fixer) {
                            return fixer.replaceText(id, expectedName);
                        },
                    });
                } // for
            },
        };
    },
});



/**
 * ESLint rule: migrate-type-domain-group
 * 
 * Purpose:
 * - Enforce migration of legacy types from `<Domain>Behavior<Group>` to `<Domain><Group>`.
 * - Ensure consistent behavioral-state nomenclature throughout the monorepo.
 * 
 * Detection Criteria:
 * - Identified by names that match `<Domain>Behavior<Group>`.
 * 
 * Why:
 * - Standardize hook's type naming for clarity and consistency.
 */
export const migrateTypeDomainGroup = createRule({
    name : 'migrate-type-domain-group',
    meta : {
        type     : 'suggestion',
        fixable  : 'code',
        docs     : {
            description : 'Enforce hook\'s types to follow the declarative `<Domain><Group>` naming convention.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongName : 'Hook\'s type "{{currentName}}" should be renamed to "{{expectedName}}" to match the behavioral naming strategy.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        
        
        
        // Skip files that are explicitly designated as deprecated:
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative module locations:
        const domainMetadata = getDomainMetadata(relativeFilename);
        if (!domainMetadata) return {};
        // if (domainMetadata.group === 'Variant') return {};
        
        
        
        const legacyTargetName = `${domainMetadata.domain}Behavior${domainMetadata.group}`;
        const expectedName     = `${domainMetadata.domain}${domainMetadata.group}`;
        
        
        
        // // Excludes:
        // if ([
        //     'useAnimationState',
        //     'useObserverState',
        // ].includes(legacyTargetName)) return {};
        
        
        
        return {
            /**
             * Inspect interface declarations:
             * e.g., interface ThemeVariant {}
             */
            TSInterfaceDeclaration(node) {
                // Store the function name for easy access:
                const currentName = node.id.name;
                
                
                
                // Hook's type candidates:
                // - Identified by names that match `<Domain>Behavior<Group>`.
                if (currentName !== legacyTargetName) return; // exit function
                
                
                
                // Enforce naming migration:
                const id = node.id;
                context.report({
                    node      : id,
                    messageId : 'wrongName',
                    data      : {
                        currentName,
                        expectedName,
                    },
                    fix(fixer) {
                        return fixer.replaceText(id, expectedName);
                    },
                });
            },
        };
    },
});



/**
 * ESLint rule: migrate-type-domain-group-definition
 * 
 * Purpose:
 * - Enforce migration of legacy types from `<Domain>Behavior<Group>Definition` to `<Domain><Group>Definition`.
 * - Ensure consistent behavioral-state nomenclature throughout the monorepo.
 * 
 * Detection Criteria:
 * - Identified by names that match `<Domain>Behavior<Group>Definition`.
 * 
 * Why:
 * - Standardize hook's type naming for clarity and consistency.
 */
export const migrateTypeDomainGroupDefinition = createRule({
    name : 'migrate-type-domain-group-definition',
    meta : {
        type     : 'suggestion',
        fixable  : 'code',
        docs     : {
            description : 'Enforce hook\'s types to follow the declarative `<Domain><Group>Definition` naming convention.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongName : 'Hook\'s type "{{currentName}}" should be renamed to "{{expectedName}}" to match the behavioral naming strategy.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        const relativeFilename = resolveGroupPackageRelativePath(filename);
        
        
        
        // Skip files that are explicitly designated as deprecated:
        if (basename.split('-').includes('deprecated')) return {};
        
        
        
        // Get domain metadata from a relative module locations:
        const domainMetadata = getDomainMetadata(relativeFilename);
        if (!domainMetadata) return {};
        // if (domainMetadata.group === 'Variant') return {};
        
        
        
        const legacyTargetName = `${domainMetadata.domain}Behavior${domainMetadata.group}Definition`;
        const expectedName     = `${domainMetadata.domain}${domainMetadata.group}Definition`;
        
        
        
        // // Excludes:
        // if ([
        //     'useAnimationState',
        //     'useObserverState',
        // ].includes(legacyTargetName)) return {};
        
        
        
        return {
            /**
             * Inspect interface declarations:
             * e.g., interface ThemeVariant {}
             */
            TSInterfaceDeclaration(node) {
                // Store the function name for easy access:
                const currentName = node.id.name;
                
                
                
                // Hook's type candidates:
                // - Identified by names that match `<Domain>Behavior<Group>Definition`.
                if (currentName !== legacyTargetName) return; // exit function
                
                
                
                // Enforce naming migration:
                const id = node.id;
                context.report({
                    node      : id,
                    messageId : 'wrongName',
                    data      : {
                        currentName,
                        expectedName,
                    },
                    fix(fixer) {
                        return fixer.replaceText(id, expectedName);
                    },
                });
            },
        };
    },
});
