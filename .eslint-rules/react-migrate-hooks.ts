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
 * ESLint rule: migrate-use-resolved-prefix
 * 
 * Purpose:
 * - Enforce migration of legacy hooks from `use<Domain><Group>` to `useResolved<Domain><Group>`.
 * - Ensure consistent state-resolving nomenclature throughout the monorepo.
 * 
 * Detection Criteria:
 * - Identified by names that match `use<Domain><Group>`.
 * 
 * Why:
 * - Standardize React hook naming for clarity and consistency.
 */
export const migrateUseResolvedPrefix = createRule({
    name : 'migrate-use-resolved-prefix',
    meta : {
        type     : 'suggestion',
        fixable  : 'code',
        docs     : {
            description : 'Enforce React hooks to follow the declarative `useResolved<Domain><Group>` naming convention.',
        },
        schema   : [], // no options accepted
        messages : {
            wrongName : 'React hook "{{currentName}}" should be renamed to "{{expectedName}}" to match the resolved naming strategy.',
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
        if (domainMetadata.group === 'Variant') return {};
        
        
        
        const legacyTargetName = `use${domainMetadata.domain}${domainMetadata.group}`;
        const expectedName     = `useResolved${domainMetadata.domain}${domainMetadata.group}`;
        
        
        
        // Excludes:
        if ([
            'useAnimationState',
            'useObserverState',
        ].includes(legacyTargetName)) return {};
        
        
        
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
                // - Identified by names that match `use<Domain><Group>`.
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
                    // - Identified by names that match `use<Domain><Group>`.
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
