/**
 * Represents a matched route object from React Router.
 */
export interface MatchedRoute {
    /**
     * The absolute pathname of the matched route.
     */
    pathname: string;
}
/**
 * A React Router helper to extract segment-based pathnames from `useMatches()`.
 *
 * Returns the full route stack as a pathname segment — ideal for comparisons and breadcrumb logic.
 *
 * Example:
 * Input:
 *   ['/', '/users', '/users/matt', '/users/matt/settings/profile']
 * Output:
 *   ['', 'users', 'matt', 'settings/profile']
 *
 * Note: Each returned string may contain zero or more concrete segments
 * delimited by '/' — depending on how the route was defined.
 *
 * @param matchedRoutes - An array of matched route objects.
 * @returns An array of segment units representing the path structure.
 */
export declare const extractRouteSegmentUnits: (matchedRoutes: MatchedRoute[]) => string[];
