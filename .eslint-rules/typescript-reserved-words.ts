export const typescriptReservedWords = new Set<string>([
    // JavaScript Keywords:
    'break', 'case', 'catch', 'class', 'const', 'continue',
    'debugger', 'default', 'delete', 'do', 'else', 'enum',
    'export', 'extends', 'finally', 'for', 'function', 'if',
    'import', 'in', 'instanceof', 'new', 'return', 'super',
    'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void',
    'while', 'with', 'yield',
    
    // Strict Mode / Future Reserved:
    'implements', 'interface', 'let', 'package', 'private',
    'protected', 'public', 'static', 'await',
    
    // TypeScript-specific Keywords:
    'type', 'readonly', 'abstract', 'declare', 'module',
    'namespace', 'require', 'from', 'of', 'any', 'unknown',
    'never',
    
    // Deprecated / Reserved but not used:
    'boolean', 'byte', 'char', 'double', 'final', 'float',
    'goto', 'int', 'long', 'native', 'short', 'synchronized',
    'throws', 'transient', 'volatile',
    
    // Literals (reserved identifiers):
    'true', 'false', 'null',
]);
