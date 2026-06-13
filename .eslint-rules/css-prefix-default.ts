import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'
import { typescriptReservedWords } from './typescript-reserved-words.js'
import { englishTwoLetterWords } from './english-two-letter-words.js'
import { englishThreeLetterWords } from './english-three-letter-words.js'
import { domainOrder } from './domain-order.js'
import { resolveGroupPackageRelativePath } from './utilities.js'



const createRule = ESLintUtils.RuleCreator(
    name => `css-prefix-default/${name}`,
);



/**
 * Options for the `enforce-css-prefix-defaults` rule.
 */
interface CssPrefixDefaultsOptions {
    /**
     * Minimum length for prefix values (inclusive).
     * 
     * Defaults to `2`.
     */
    minLength ?: number
    
    /**
     * Maximum length for prefix values (inclusive).
     * 
     * Defaults to `4`.
     */
    maxLength ?: number
}



/**
 * ESLint rule: enforce-css-prefix-defaults
 * 
 * Purpose:
 * - Ensure constants in `**-defaults.ts` in the `css-prefix-default` package follow naming and value conventions.
 * - Naming must be `default<Domain><Group>Prefix` (camelCase with domain/group boundaries).
 * - Values must be unique across all constants.
 * - Values must satisfy configurable min/max length constraints.
 * - Values must not be reserved words in TypeScript or common English.
 * - Constants must be declared in the order of domains defined in `domainOrder`.
 * 
 * Constraint candidates:
 * - Only apply to `**-defaults.ts` in the `css-prefix-default` package.
 */
export const enforceCssPrefixDefaults = createRule<[CssPrefixDefaultsOptions], 'wrongName' | 'wrongLength' | 'reservedWord' | 'wrongOrder' | 'wrongValue' | 'duplicateValue'>({
    name : 'enforce-css-prefix-defaults',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Require default prefix constants in `defaults.ts` to follow naming and uniqueness conventions.',
        },
        schema   : [
            {
                type: 'object',
                properties: {
                    minLength: { type: 'number' },
                    maxLength: { type: 'number' },
                },
                additionalProperties: false,
            },
        ],
        messages : {
            wrongName      : 'Constant name must follow the pattern `default<Domain><Group>Prefix`.',
            wrongLength    : 'Prefix value "{{value}}" must have length between {{min}} and {{max}}.',
            reservedWord   : 'Domain or group segment "{{segment}}" is a reserved word and cannot be used.',
            wrongOrder     : 'Constant "{{name}}" is out of order. Expected "{{expectedName}}" next based on domain grouping.',
            wrongValue     : 'Prefix value "{{value}}" is expected to be "{{expectedValue}}"',
            duplicateValue : 'Prefix value "{{value}}" is duplicated across multiple constants.',
        },
    },
    create(context) {
        // Only apply this rule to the specific `defaults.ts` module of the `css-prefix-default` package:
        const filename          = context.filename;
        const basename          = path.basename(filename);
        const relativeFilename  = resolveGroupPackageRelativePath(filename);
        const isCandidateModule = (
            /([a-zA-Z_-])*defaults\.ts/.test(basename)
            &&
            (relativeFilename === path.join('defaults', 'css-prefix-default', 'src', basename))
        );
        if (!isCandidateModule) return {};
        
        
        
        const {
            minLength = 2,
            maxLength = 4,
        } = context.options[0] ?? {};
        
        
        
        // Map of value => set of nodes:
        const valueMap = new Map<string, Set<TSESTree.Node>>();
        
        // Map of name => value:
        const nameMap  = new Map<string, string>();
        
        // Create a mutable copy of the expected domain order for enforcing declaration order:
        const expectedNextOrder = Array.from(domainOrder);
        
        
        
        return {
            /**
             * Inspect variable declarations.
             * Handles only top-level exported constants with string literal values.
             */
            VariableDeclarator(node) {
                // We are only interested in top-level exported constants with string literal values:
                if (
                    !node.id
                    ||
                    (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier)
                    ||
                    !node.init
                    ||
                    (node.init.type !== TSESTree.AST_NODE_TYPES.Literal)
                    ||
                    (typeof node.init.value !== 'string')
                ) return;
                
                
                
                // Extract name and value:
                const name  = node.id.name;
                const value = node.init.value;
                
                
                
                // Enforce naming convention `default<Domain><Group>Prefix`:
                if (!/^default([A-Z][a-z]*){1,2}[A-Z][a-z]*Prefix$/.test(name)) {
                    context.report({ node: node.id, messageId: 'wrongName' });
                } // if
                
                
                
                // Enforce domain order based on the predefined order:
                const expectedDomain = expectedNextOrder.shift();
                const expectedName   = expectedDomain ? `default${expectedDomain[0].toUpperCase() + expectedDomain.slice(1)}Prefix` : null;
                if (!expectedName || (name !== expectedName)) {
                    context.report({ node: node.id, messageId: 'wrongOrder', data: { name, expectedName: expectedName ?? 'N/A' } });
                } // if
                
                
                
                const isEffectPrefix = name.endsWith('EffectPrefix');
                
                
                
                // Enforce predictable value for effects:
                // - Append 'e' to the corresponding state prefix (e.g., 'dis' → 'dise', 'foc' → 'foce').
                if (isEffectPrefix) {
                    const correspondingStateName  = name.slice(0, -'EffectPrefix'.length) + 'StatePrefix';
                    const correspondingStateValue = nameMap.get(correspondingStateName);
                    const expectedValue           = correspondingStateValue ? (correspondingStateValue + 'e') : null;
                    if (!expectedValue || (value !== expectedValue)) {
                        context.report({ node: node.init, messageId: 'wrongValue', data: { value, expectedValue: expectedValue ?? 'N/A' } });
                    } // if
                } // if
                
                
                
                // Enforce length constraint:
                // - Effects are allowed to exceed max length for better predictability.
                if ((value.length < minLength || value.length > maxLength) && !isEffectPrefix) {
                    context.report({
                        node: node.init,
                        messageId: 'wrongLength',
                        data: { value, min: minLength, max: maxLength },
                    });
                } // if
                
                
                
                // Enforce reserved word restriction on the VALUE:
                const valueLowercase = value.toLowerCase();
                if (typescriptReservedWords.has(valueLowercase) || englishTwoLetterWords.has(valueLowercase) || englishThreeLetterWords.has(valueLowercase)) {
                    context.report({
                        node: node.init,
                        messageId: 'reservedWord',
                        data: { segment: value },
                    });
                } // if
                
                
                
                // Collect values for enforcing uniqueness check:
                if (!valueMap.has(value)) {
                    valueMap.set(value, new Set([node.init]));
                }
                else {
                    valueMap.get(value)!.add(node.init);
                } // if
                
                
                
                // Collect name-value mapping for potential future use (e.g., cross-checking predictable values):
                nameMap.set(name, value);
            },
            
            
            
            /**
             * After traversing the entire file, check for duplicate values and report them.
             */
            'Program:exit'() {
                // After traversing, enforce uniqueness of values:
                for (const [value, nodes] of valueMap.entries()) {
                    // Skip unique values:
                    if (nodes.size <= 1)  continue;
                    
                    
                    
                    // Report all nodes that share the same value:
                    for (const node of nodes) {
                        context.report({
                            node,
                            messageId: 'duplicateValue',
                            data: { value },
                        });
                    } // for
                }
            },
        };
    },
});
