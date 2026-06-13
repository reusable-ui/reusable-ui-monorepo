import fs from 'fs'
import path from 'path'



/**
 * Resolves an absolute file path into a "group-and-package-aware" relative path.
 * 
 * Behavior:
 * - Normally returns the path relative to the current working directory.
 * - If the relative path starts with `src/`, it prepends the group and package
 *   directory names (the last two segments of `process.cwd()`), while keeping
 *   the `src/` segment intact.
 * 
 * Why:
 * - Utilities like `getDomainIdentifier` rely on the relative path containing
 *   both the group and package directory segments to correctly determine the domain.
 * - When ESLint runs inside a package, `path.relative(process.cwd(), file)` may
 *   drop those segments. This helper ensures they are always present.
 * 
 * Examples:
 * - CWD = `/repo/components/button`
 *   absolutePath = `/repo/components/button/src/types.ts`
 *   → returns `components/button/src/types.ts`
 * 
 * - CWD = `/repo`
 *   absolutePath = `/repo/components/button/src/types.ts`
 *   → returns `components/button/src/types.ts`
 */
export const resolveGroupPackageRelativePath = (absolutePath: string): string => {
    const basePath = process.cwd();
    const relativePath = path.relative(basePath, absolutePath);
    
    
    
    // Normalize separators for cross-platform safety:
    const normalized = relativePath.replace(/\\/g, '/');
    
    
    
    // If the relative path is missing the group/package segments (i.e., starts with 'src/'), prepend them back:
    if (normalized.startsWith('src/')) {
        // Capture the last two segments of the base path: group + package:
        const parts = basePath.split(path.sep);
        const groupAndPackage = parts.slice(-2).join('/');
        
        
        
        // Prepend the group/package back to the normalized path:
        return path.join(groupAndPackage, normalized);
    } // if
    // 
    
    
    
    // Otherwise, return the normalized relative path as is:
    return normalized;
};




/**
 * Recursively searches upward from a given path to locate the nearest `package.json`.
 * 
 * Usage:
 * - Pass in a file or directory path.
 * - The function will walk up the directory tree until it finds a `package.json`.
 * - Returns the absolute path to the file, or `null` if none is found.
 * 
 * @param startPath Absolute path to begin searching from.
 * @returns Absolute path to the nearest `package.json`, or `null` if not found.
 */
export const findPackageJson = (startPath: string): string | null => {
    // Start from the directory containing the given path:
    let dir = path.dirname(startPath);
    
    // Root directory (e.g., "/" on Unix, "C:\" on Windows):
    const root = path.parse(dir).root;
    
    
    
    // Traverse upward until reaching the filesystem root:
    while (dir !== root) {
        const packagePath = path.join(dir, 'package.json');
        
        // If a package.json exists here, return its path immediately:
        if (fs.existsSync(packagePath)) return packagePath;
        
        // Move one level up and continue searching:
        dir = path.dirname(dir);
    } // while
    
    
    
    // No package.json found in any parent directory
    return null;
};
