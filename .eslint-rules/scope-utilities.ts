import { TSESTree } from "@typescript-eslint/utils";



/**
 * Determines whether a given AST node is a top-level declaration in the module.
 * Works for functions, variables, classes, imports, exports, etc.
 */
export const isTopLevel = (node: TSESTree.Node): boolean => {
    const parent = node.parent;
    
    if (!parent) return false;
    
    switch (node.type) {
        case TSESTree.AST_NODE_TYPES.VariableDeclarator:
            return (
                parent.type === TSESTree.AST_NODE_TYPES.VariableDeclaration &&
                (
                    parent.parent?.type === TSESTree.AST_NODE_TYPES.Program ||
                    parent.parent?.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration
                )
            );
        
        
        
        case TSESTree.AST_NODE_TYPES.FunctionDeclaration:
        case TSESTree.AST_NODE_TYPES.ClassDeclaration:
            return (
                parent.type === TSESTree.AST_NODE_TYPES.Program ||
                parent.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
                parent.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
            );
        
        
        
        case TSESTree.AST_NODE_TYPES.ImportDeclaration:
        case TSESTree.AST_NODE_TYPES.ExportNamedDeclaration:
        case TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration:
            // These are always top-level by syntax
            return parent.type === TSESTree.AST_NODE_TYPES.Program;
        
        
        
        default:
            return false;
    }
};



/**
 * Determines whether a given AST node is exported from the module.
 * Works for functions, variables, classes, etc.
 */
export const isExported = (node: TSESTree.Node): boolean => {
    const parent = node.parent;
    if (!parent) return false;
    
    switch (node.type) {
        case TSESTree.AST_NODE_TYPES.VariableDeclarator:
            return (
                parent.type === TSESTree.AST_NODE_TYPES.VariableDeclaration
                &&
                parent.parent?.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration
            );
        
        
        
        case TSESTree.AST_NODE_TYPES.FunctionDeclaration:
        case TSESTree.AST_NODE_TYPES.ClassDeclaration:
            return (
                parent.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration
                ||
                parent.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
            );
        
        
        
        default:
            return false;
    }
};
