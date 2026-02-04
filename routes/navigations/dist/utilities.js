import { 
// Utilities:
parsePath, } from 'history';
/**
 * Extracts a pathname (can be absolute or relative) from any path-like source (relative path, absolute path, `UrlObject` object, or `To` object).
 *
 * If you need a guaranteed absolute path, use `resolveAbsolutePathFromSource()`.
 *
 * @param pathSource - The source path to extract.
 * Accepts:
 *   - A pathname string (e.g. `/about/team?query=1#hash`)
 *   - A `UrlObject` with a `pathname` property (e.g. `{ pathname: '/about/team' }`)
 *   - A `To` object with a `pathname` property (e.g. `{ pathname: '/about/team' }`)
 *
 * @returns The extracted pathname string (can be absolute or relative).
 */
export const extractPathnameFromSource = (pathSource) => {
    // Extract pathname from a string URL, remove the query and hash parts:
    if (typeof pathSource === 'string')
        return parsePath(pathSource).pathname ?? '';
    // Handle UrlObject or To as an object with a pathname:
    return pathSource.pathname ?? '';
};
/**
 * Resolves an absolute path from a relative path (e.g. `'../profile'`, `'./settings'`) against a current absolute pathname (e.g. `'/dashboard/settings'`).
 *
 * @param currentPathname - The current page pathname, used for resolving relative paths,
 * and as a reference point for semantic path matching.
 *
 * Must be explicitly provided for SSR compatibility.
 * Accepts:
 *   - A pathname string (e.g. '/users/matt')
 *   - An array of segment units (e.g. ['', 'users', 'matt']), where:
 *       - Each string represents the segment(s) contributed by one route level
 *       - Units may contain multiple segments delimited by '/'
 *       - Examples:
 *           - ['', 'users', 'matt'] → resolves from '/users/matt'
 *           - ['', 'admin/settings'] → represents one route contributing two segments
 *
 * @param relativePath - A relative path to apply (e.g. '..', './profile', 'dashboard')
 *   Supports standard navigation symbols:
 *     - '..' → go up one route level
 *     - '.' or '' → stay at current level
 *     - absolute or nested segments → descend into deeper levels
 *
 * @returns The resolved absolute pathname string (always starting with '/').
 */
export const resolveAbsolutePathFromRelative = (currentPathname, relativePath) => {
    // Handle absolute path:
    if (relativePath.startsWith('/'))
        return relativePath.replace(/\/+$/, '') || '/'; // Remove one or more trailing slashes at the end.
    // Extract segments from the given current pathname:
    const segments = ((typeof currentPathname === 'string')
        // If `currentPathname` is a string, split it into segments:
        ? (currentPathname
            .replace(/\/+$/, '') // Remove one or more trailing slashes at the end.
            .split('/') // Split by `/` to get segments.
        )
        // If `currentPathname` is an array, use it directly:
        : currentPathname);
    // Handle relative path segments:
    for (const relativeSegment of relativePath.split('/')) {
        switch (relativeSegment) {
            case '': // Skip redundant slashes like `/path//to`.
            case '.': // Stay at current segment.
                break;
            case '..': // Go up one level.
                segments.pop();
                break;
            default: // Add new segment.
                segments.push(relativeSegment);
                break;
        } // switch
    } // for
    // Merge segments into a final absolute pathname, excluding empty ones:
    const concreteSegments = segments.filter(Boolean);
    return `/${concreteSegments.join('/')}`; // Always start with '/' to ensure absolute path.
};
/**
 * Extracts a guaranteed absolute pathname from any path-like source (relative path, absolute path, `UrlObject` object, or `To` object).
 *
 * @param currentPathname - The current page pathname, used for resolving relative paths,
 * and as a reference point for semantic path matching.
 *
 * Must be explicitly provided for SSR compatibility.
 * Accepts:
 *   - A pathname string (e.g. '/users/matt')
 *   - An array of segment units (e.g. ['', 'users', 'matt']), where:
 *       - Each string represents the segment(s) contributed by one route level
 *       - Units may contain multiple segments delimited by '/'
 *       - Examples:
 *           - ['', 'users', 'matt'] → resolves from '/users/matt'
 *           - ['', 'admin/settings'] → represents one route contributing two segments
 *
 * @param pathSource - The source path to resolve.
 * Accepts:
 *   - A pathname string (e.g. `/about/team`)
 *   - A `UrlObject` with a `pathname` property (e.g. `{ pathname: '/about/team' }`)
 *   - A `To` object with a `pathname` property (e.g. `{ pathname: '/about/team' }`)
 *
 * @returns The resolved absolute pathname string (always starting with '/').
 */
export const resolveAbsolutePathFromSource = (currentPathname, pathSource) => {
    // Extract a pathname (can be absolute or relative) from the given pathSource:
    const absoluteOrRelativePath = extractPathnameFromSource(pathSource);
    // Resolve an absolute path from the extracted pathname and the given current pathname:
    return resolveAbsolutePathFromRelative(currentPathname, absoluteOrRelativePath);
};
/**
 * @deprecated - use `resolveAbsolutePathFromSource` instead.
 */
export const resolvePath = (to, currentPathname = '/') => {
    return resolveAbsolutePathFromSource(currentPathname, to);
};
/**
 * Lowest-level comparator for determining if two pathnames match under a given strategy.
 *
 * Requires both inputs to be **absolute paths** (i.e., start with `/`).
 * Always returns `false` if either input is non-absolute.
 *
 * Use `resolveAbsolutePathFromRelative()` to convert relative path to absolute one.
 *
 * @param actualPathname - The absolute pathname to test against the expected location (e.g. `/about/team`).
 * @param expectedPathname - The absolute pathname to match against (e.g. `/about`).
 * @param strategy - Defines how strictly paths are compared.
 * Accepts:
 *   - `'exact'`: Full pathname equality.
 *   - `'partial'`: `startsWith()` match with segment boundary awareness.
 *
 * @returns `true` if the actual pathname matches the expected target; otherwise `false`.
 * Returns `false` if either input is not an absolute path.
 */
export const evaluatePathMatch = (actualPathname, expectedPathname, strategy) => {
    // Handle non-absolute path:
    if (!actualPathname.startsWith('/') || !expectedPathname.startsWith('/'))
        return false;
    // Handle exact match:
    if (actualPathname === expectedPathname)
        return true; // Always match for all strategies.
    // Handle exact-like match (trailing slash difference only):
    const lengthDiff = actualPathname.length - expectedPathname.length;
    if (Math.abs(lengthDiff) === 1) {
        const shorterPath = (lengthDiff < 0) ? actualPathname : expectedPathname;
        const longerPath = (lengthDiff > 0) ? actualPathname : expectedPathname;
        // Ensure the longer path only differs by a trailing slash and is otherwise identical:
        if (longerPath.endsWith('/') && longerPath.startsWith(shorterPath))
            return true;
    } // if
    // Handle partial match:
    if (strategy === 'partial') {
        // Handle root match → always matches any segment:
        if (expectedPathname === '/')
            return true;
        // Ensure the actual path starts with the expected location:
        if (!actualPathname.startsWith(expectedPathname))
            return false;
        // Ensure the remainder is chopped at segment boundary:
        const boundaryIndex = (expectedPathname.endsWith('/')
            ? expectedPathname.length - 1
            : expectedPathname.length);
        return (actualPathname.charAt(boundaryIndex) === '/');
    } // if
    // Unhandled in all other cases:
    return false;
};
