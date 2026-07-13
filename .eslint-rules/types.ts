import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'



const createRule = ESLintUtils.RuleCreator(
    name => `types/${name}`,
);



/**
 * ESLint rule: no-foreign-code-in-types
 * 
 * Purpose:
 * - Prevent arbitrary/foreign code inside `types.ts`, `*-types-*.ts`, and `*-types.ts`.
 * - Keep these modules clean and focused on type declarations only.
 * 
 * Requirements:
 * - Allowed top-level statements:
 *   - Import declarations.
 *   - Type alias declarations.
 *   - Interface declarations.
 *   - Const enum declarations.
 *   - Comments / whitespace.
 * - Disallow everything else (functions, variables, classes, runtime logic).
 * 
 * Why:
 * - Ensures type modules remain declarative and free of runtime code.
 * - Improves maintainability and consistency across the codebase.
 */
export const noForeignCodeInTypes = createRule({
    name : 'no-foreign-code-in-types',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Disallow arbitrary code in types modules. Only imports, types, interfaces, const enums, and comments are allowed.',
        },
        schema   : [], // no options accepted
        messages : {
            foreignCode : 'Only imports, type/interface declarations, const enums, and comments are allowed in types modules. Move other code to separate files.',
        },
    },
    create(context) {
        const filename         = context.filename;
        const basename         = path.basename(filename);
        
        // Match types.ts, *-types-*.ts, and *-types.ts:
        const isExpectedModule = path.parse(basename).name.split('-').includes('types');
        
        
        
        return {
            /**
             * When visiting a Program node, validate the entire file structure
             * if it's a `types.ts`, `*-types-*.ts`, or `*-types.ts` file.
             */
            Program(node: TSESTree.Program) {
                // Only validate file structure if we're in an expected module:
                if (!isExpectedModule) return;
                
                
                
                // Validate all top-level bindings in the file:
                let statement : TSESTree.ProgramStatement | TSESTree.NamedExportDeclarations;
                for (statement of node.body) {
                    // Allow imports:
                    if (statement.type === TSESTree.AST_NODE_TYPES.ImportDeclaration) continue;
                    
                    
                    
                    // Unwrap export named declarations to check the inner statement:
                    if (statement.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration) {
                        const nestedStatement = statement.declaration;
                        if (!nestedStatement) continue;
                        statement = nestedStatement;
                    } // if
                    
                    
                    
                    // CSS type candidates:
                    // - Identified by kind of type/interface declaration.
                    if (
                        statement.type === TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration
                        ||
                        statement.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration
                        ||
                        statement.type === TSESTree.AST_NODE_TYPES.TSEnumDeclaration
                    ) continue;
                    
                    
                    
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



/**
 * ESLint rule: ban-variance-annotations
 * 
 * Purpose:
 * - Disallow explicit variance annotations (`in`, `out`, `in out`) in generic type parameters.
 * - Encourage relying on TypeScript's implicit variance inference.
 * 
 * Detection Criteria:
 * - Matches type parameter declarations containing `in: true` or `out: true`.
 * 
 * Why:
 * - Simplifies code, avoids redundancy, and keeps naming consistent.
 */
export const banVarianceAnnotations = createRule({
    name : 'ban-variance-annotations',
    meta : {
        type     : 'problem',
        docs     : {
            description : 'Disallow explicit variance annotations (`in`, `out`, `in out`) in generic type parameters.',
        },
        schema   : [], // no options accepted
        messages : {
            noVariance : 'Variance annotation "{{annotation}}" is not allowed. Remove it and rely on TypeScript\'s implicit inference.',
        },
        fixable: 'code',
    },
    create(context) {
        return {
            TSTypeParameter(node: any) {
                // The parser exposes `node.in` and `node.out` as booleans
                if (node.in) {
                    context.report({
                        node,
                        messageId: 'noVariance',
                        data: { annotation: 'in' },
                        fix(fixer) {
                            const sourceCode = context.sourceCode;
                            const text = sourceCode.getText(node);
                            const cleaned = text.replace(/\bin\b\s+/g, '');
                            return fixer.replaceText(node, cleaned);
                        },
                    });
                }
                if (node.out) {
                    context.report({
                        node,
                        messageId: 'noVariance',
                        data: { annotation: 'out' },
                        fix(fixer) {
                            const sourceCode = context.sourceCode;
                            const text = sourceCode.getText(node);
                            const cleaned = text.replace(/\bout\b\s+/g, '');
                            return fixer.replaceText(node, cleaned);
                        },
                    });
                }
            },
        };
    },
});

