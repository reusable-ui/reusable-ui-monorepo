import fs from 'fs'
import path from 'path'



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
