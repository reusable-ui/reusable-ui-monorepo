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
export const extractRouteSegmentUnits = (matchedRoutes) => {
    // Collect the resulting segment units:
    const segmentUnits = [];
    // Track previous accumulated pathname length:
    let prevPathnameLength = 0;
    // Loop through each matched route:
    for (const { pathname } of matchedRoutes) {
        // Get the difference between current and previous pathname:
        const segmentDelta = pathname.slice(prevPathnameLength).replace(/^\/+/, '');
        // Update the previous pathname length:
        prevPathnameLength = pathname.length;
        // Add the segment(s) to the result list:
        segmentUnits.push(segmentDelta); // May be '' (root) or multi-segment like 'settings/profile'.
    } // for
    // Return the accumulated segment units:
    return segmentUnits;
};
