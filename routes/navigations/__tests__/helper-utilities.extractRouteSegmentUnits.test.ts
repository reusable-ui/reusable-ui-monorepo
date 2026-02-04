import {
    type MatchedRoute,
    extractRouteSegmentUnits,
} from '../dist/helper-utilities.js'



// Tests:

/**
 * Defines a single test case for extracting route segments from matched routes.
 */
interface ExtractRouteSegmentTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title          : string
    
    /**
     * Simulates React Router’s matched routes.
     */
    matchedRoutes  : MatchedRoute[];
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected array of segment units extracted from the matched routes.
     */
    expectedResult : string[]
}



describe('extractRouteSegmentUnits', () => {
    test.each<ExtractRouteSegmentTestCase>([
        {
            title          : 'Root only',
            matchedRoutes  : [
                { pathname : '/' },
            ],
            expectedResult : [''],
        },
        {
            title          : 'Single static segment',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/about' },
            ],
            expectedResult : ['', 'about'],
        },
        {
            title          : 'Nested dynamic segment',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/users' },
                { pathname : '/users/matt' },
            ],
            expectedResult : ['', 'users', 'matt'],
        },
        {
            title          : 'Pathless layout segment (no contribution)',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/' }, // pathless route
                { pathname : '/dashboard' },
            ],
            expectedResult : ['', '', 'dashboard'],
        },
        {
            title          : 'Flat route contributing multiple segments',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/settings/profile' },
            ],
            expectedResult : ['', 'settings/profile'],
        },
        {
            title          : 'Deep nesting with mixed segments',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/blog' },
                { pathname : '/blog/react-hooks' },
                { pathname : '/blog/react-hooks/comments' },
            ],
            expectedResult : ['', 'blog', 'react-hooks', 'comments'],
        },
        {
            title          : 'Optional segment resolved',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/blog' },
                { pathname : '/blog' }, // optional segment not present
            ],
            expectedResult : ['', 'blog', ''],
        },
        {
            title          : 'Optional segment present',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/blog' },
                { pathname : '/blog/featured' }, // optional segment is present
            ],
            expectedResult : ['', 'blog', 'featured'],
        },
        {
            title          : 'Wildcard route resolved',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/docs' },
                { pathname : '/docs/getting-started/setup' },
            ],
            expectedResult : ['', 'docs', 'getting-started/setup'],
        },
        {
            title          : 'Dynamic param nested in wildcard',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/product' },
                { pathname : '/product/123/specs/features' },
            ],
            expectedResult : ['', 'product', '123/specs/features'],
        },
        {
            title          : 'Repeated path segments',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/settings' },
                { pathname : '/settings/settings' },
            ],
            expectedResult : ['', 'settings', 'settings'],
        },
        {
            title          : 'Empty route group followed by index route',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/' }, // layout group with no path
                { pathname : '/' }, // index route — no segment added
            ],
            expectedResult : ['', '', ''],
        },
        {
            title          : 'Deep layout nesting with no segment contribution',
            matchedRoutes  : [
                { pathname : '/' },
                { pathname : '/' }, // layout 1
                { pathname : '/' }, // layout 2
                { pathname : '/dashboard' },
            ],
            expectedResult : ['', '', '', 'dashboard'],
        },
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            matchedRoutes,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            expect(extractRouteSegmentUnits(matchedRoutes)).toEqual(expectedResult);
        }
    );
});
