import { type UrlObject } from 'url';
import { type To, type Pathname } from 'history';
import { type PathMatchStrategy } from './types.js';
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
export declare const extractPathnameFromSource: (pathSource: string | UrlObject | To) => string;
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
export declare const resolveAbsolutePathFromRelative: (currentPathname: string | string[], relativePath: string) => `/${string}`;
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
export declare const resolveAbsolutePathFromSource: (currentPathname: string | string[], pathSource: string | UrlObject | To) => `/${string}`;
/**
 * @deprecated - use `resolveAbsolutePathFromSource` instead.
 */
export declare const resolvePath: (to: To, currentPathname?: Pathname) => Pathname;
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
export declare const evaluatePathMatch: (actualPathname: string, expectedPathname: string, strategy: PathMatchStrategy) => boolean;
