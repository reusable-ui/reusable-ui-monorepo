import {
    type NavigationPathMatchProps,
    useNavigationPathMatch,
} from '../dist/index.js'
import {
    // Types:
    type To,
}                           from 'history'
import { renderHook } from '@testing-library/react'



// Tests:

/**
 * Defines a single test case for evaluating path match.
 */
interface NavigationPathMatchTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title          : string
    
    /**
     * The input properties for the `useNavigationPathMatch` hook.
     */
    props          : NavigationPathMatchProps
    
    
    
    // Expected Outcomes:
    
    /**
     * Whether the match is expected to succeed.
     */
    expectedResult : boolean
}



describe('useNavigationPathMatch', () => {
    test.each<NavigationPathMatchTestCase>([
        {
            title          : 'Exact match with full path (string)',
            props          : {
                currentPathname   : '/about',
                actualPathname    : '/about',
                expectedPathname  : '/about',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Exact match with trailing slash mismatch',
            props          : {
                currentPathname   : '/about',
                actualPathname    : '/about/',
                expectedPathname  : '/about',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // paths match when normalized
        },
        {
            title          : 'Partial match with nested path',
            props          : {
                currentPathname   : '/about',
                actualPathname    : '/about/team',
                expectedPathname  : '/about',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'No match with partial strategy (wrong branch)',
            props          : {
                currentPathname   : '/about',
                actualPathname    : '/contact',
                expectedPathname  : '/about',
                pathMatchStrategy : 'partial',
            },
            expectedResult : false,
        },
        {
            title          : 'Segment unit basePathname match',
            props          : {
                currentPathname   : ['', 'users', 'profile'],
                actualPathname    : '/users/profile/settings',
                expectedPathname  : 'settings',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Segment unit basePathname match',
            props          : {
                currentPathname   : ['', 'users', 'profile'],
                actualPathname    : '/users/profile/settings',
                expectedPathname  : 'settings',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Missing actualPathname → skip match, return false',
            props          : {
                currentPathname   : '/about',
                actualPathname    : null,
                expectedPathname  : '/about',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Missing expectedPathname → skip match, return false',
            props          : {
                currentPathname   : '/blog',
                actualPathname    : '/blog/posts',
                expectedPathname  : null,
                pathMatchStrategy : 'partial',
            },
            expectedResult : false,
        },
        {
            title          : 'Partial match with missing slash',
            props          : {
                currentPathname   : '/about',
                actualPathname    : '/aboutteam',
                expectedPathname  : '/about',
                pathMatchStrategy : 'partial',
            },
            expectedResult : false, // not a segment match
        },
        {
            title          : 'Partial match with segment-unit base',
            props          : {
                currentPathname   : ['', 'about', 'team'],
                actualPathname    : '/about/team/lead',
                expectedPathname  : '../team/lead',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'expected path is empty string',
            props          : {
                currentPathname   : ['', 'products', 'laptops'],
                actualPathname    : '/products/laptops',
                expectedPathname  : '', // equivalent to '.'
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // resolves to /products/laptops, which exact matches actual
        },
        {
            title          : 'Actual path is empty string',
            props          : {
                currentPathname   : '/home',
                actualPathname    : '', // equivalent to '.'
                expectedPathname  : '/home',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // resolves to /home, which exact matches expected
        },
        {
            title          : 'Malformed currentPathname (empty string)',
            props          : {
                currentPathname   : '',
                actualPathname    : '/',
                expectedPathname  : '/',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // '' treated as invalid input
        },
        {
            title          : 'Malformed currentPathname (empty array)',
            props          : {
                currentPathname   : [],
                actualPathname    : '/',
                expectedPathname  : '/',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // [] treated as invalid input
        },
        {
            title          : 'Relative path with traversal dots',
            props          : {
                currentPathname   : '/products/laptops',
                actualPathname    : '/products/laptops/accessories',
                expectedPathname  : '../laptops',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Match with UrlObject format',
            props          : {
                currentPathname   : '/dashboard',
                actualPathname    : { pathname: '/dashboard' } satisfies To,
                expectedPathname  : '/dashboard',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Match with UrlObject format',
            props          : {
                currentPathname   : '/blog',
                actualPathname    : { pathname: '/blog/posts' } satisfies To,
                expectedPathname  : '/blog',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Actual pathname as relative (resolved)',
            props          : {
                currentPathname   : '/profile',
                actualPathname    : '../settings',
                expectedPathname  : '/profile/settings',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Base and expected both use relative segments',
            props          : {
                currentPathname   : ['admin', 'logs'],
                actualPathname    : '../metrics',
                expectedPathname  : '../metrics',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Expected path includes leading dot segments',
            props          : {
                currentPathname   : '/docs/components',
                actualPathname    : '/docs/components/button',
                expectedPathname  : './button',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Actual and expected resolve to different paths',
            props          : {
                currentPathname   : '/settings/profile',
                actualPathname    : '../security',
                expectedPathname  : '../profile',
                pathMatchStrategy : 'partial',
            },
            expectedResult : false,
        },
        {
            title          : 'Unicode character matching',
            props          : {
                currentPathname   : '/café',
                actualPathname    : '/café',
                expectedPathname  : '/café',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Redundant slashes treated as invalid',
            props          : {
                currentPathname   : '/blog/posts/latest',
                actualPathname    : '/blog//posts///latest',
                expectedPathname  : '/blog/posts/latest',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Trailing index normalization',
            props          : {
                currentPathname   : '/docs',
                actualPathname    : '/docs/index',
                expectedPathname  : '/docs',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Leading traversal segments clamped at root',
            props          : {
                currentPathname   : '/',
                actualPathname    : '../../../../admin',
                expectedPathname  : '/admin',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'ActualPathname from external URL object',
            props          : {
                currentPathname   : '/external',
                actualPathname    : new URL('https://example.com/external').pathname,
                expectedPathname  : '/external',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            props,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            const { result } = renderHook(() => useNavigationPathMatch(props));
            expect(result.current).toEqual(expectedResult);
        }
    );
});
