import fs from 'fs'
import path from 'path'
import { TSESTree } from '@typescript-eslint/types'
import { ESLintUtils } from '@typescript-eslint/utils'



const createRule = ESLintUtils.RuleCreator(
    name => `index-reexports/${name}`,
);



/**
 * ESLint rule: enforce-index-reexports
 * 
 * Purpose:
 * - Ensure `index.ts` reexports all direct sibling modules.
 * - Skip siblings containing "internal" in their filename (e.g. internal.ts, css-internal-utilities.ts).
 * 
 * Why:
 * - Prevents forgotten exports.
 * - Keeps index modules consistent and discoverable.
 */
export const enforceIndexReexports = createRule({
    name : 'enforce-index-reexports',
    meta : {
        type     : 'problem',
        docs     : {
            description     : 'Require `index.ts` to reexport all sibling modules except those containing "internal".',
        },
        schema   : [], // no options accepted
        messages : {
            missingReexport : 'Missing reexport for sibling module "{{module}}". `index.ts` must reexport all siblings except internal ones.',
        },
    },
    
    create(context) {
        const filename = context.filename;
        const basename = path.basename(filename);
        
        
        
        // Only apply to index.ts files:
        if (basename !== 'index.ts')  return {};
        
        
        
        // Get the directory of the index.ts file:
        const dir = path.dirname(filename);
        
        // Collect sibling modules in the same directory
        const siblings = (
            // Read all files and directories in the same directory as index.ts:
            fs.readdirSync(dir)
            
            // Skip directories:
            .filter((fileData) => !fs.statSync(path.join(dir, fileData)).isDirectory())
            
            // Parse filenames to get name and extension:
            .map((filename) => path.parse(filename))
            
            // Filter to get only .ts files that are not index.ts and do not contain "internal":
            .filter(({ ext, name }) => {
                // Only consider .ts files:
                if (!['.ts', '.tsx'].includes(ext)) return false;
                
                // Skip index itself:
                if (name === 'index') return false;
                
                // Skip files containing "internal" in their name:
                if (name.split('-').includes('internal')) return false;
                
                // Otherwise, it's a candidate for reexport:
                return true;
            })
            
            // Extract just the module names (without extension):
            .map(({ name }) => name)
        );
        
        
        
        return {
            Program(node: TSESTree.Program) {
                // Collect all export-from declarations in index.ts:
                const exportModules = new Set<string>(
                    node.body
                    
                    // Only consider export all declarations (e.g. `export * from './module'`):
                    .filter((statement) => statement.type === TSESTree.AST_NODE_TYPES.ExportAllDeclaration)
                    
                    // Only consider relative exports (e.g. `./module`):
                    .filter((statement) => statement.source.value.startsWith('./'))
                    
                    // Extract the module name without path or extension (e.g. './module' -> 'module'):
                    .map((statement) => statement.source.value.replace(/^\.\//, '').replace(/\.[^/.]+$/, ''))
                );
                
                
                
                // Check each sibling is reexported
                for (const sibling of siblings) {
                    // Skip if this sibling is already reexported:
                    if (exportModules.has(sibling)) continue;
                    
                    
                    
                    // Report missing reexport for this sibling:
                    context.report({
                        node,
                        messageId: 'missingReexport',
                        data: { module: `${sibling}.js` }, // Report with .js extension for clarity in error message, even though we're working with .ts files
                    });
                } // for
            },
        };
    },
});
