import {
    type CurrentPathMatchProps,
    useCurrentPathMatch,
} from '../dist/index.js'
import {
    // Types:
    type To,
}                           from 'history'
import { renderHook } from '@testing-library/react'



// Tests:

/**
 * Defines a single test case for evaluating current path match.
 */
interface CurrentPathMatchTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title          : string
    
    /**
     * The input properties for the `useCurrentPathMatch` hook.
     */
    props          : CurrentPathMatchProps
    
    
    
    // Expected Outcomes:
    
    /**
     * Whether the match is expected to succeed.
     */
    expectedResult : boolean
}



describe('useCurrentPathMatch', () => {
    test.each<CurrentPathMatchTestCase>([
        {
            title          : 'Exact match to current route',
            props          : {
                currentPathname   : '/settings',
                actualPathname    : '/settings',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Exact match fails with nested actual path',
            props          : {
                currentPathname   : '/settings',
                actualPathname    : '/settings/preferences',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Partial match succeeds with nested actual path',
            props          : {
                currentPathname   : '/settings',
                actualPathname    : '/settings/preferences',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Segment-unit base resolves correctly',
            props          : {
                currentPathname   : ['', 'profile', 'edit'],
                actualPathname    : '/profile/edit',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Partial match fails with unrelated path',
            props          : {
                currentPathname   : '/users',
                actualPathname    : '/dashboard',
                pathMatchStrategy : 'partial',
            },
            expectedResult : false,
        },
        {
            title          : 'Relative actual path resolved correctly',
            props          : {
                currentPathname   : '/admin/tools',
                actualPathname    : '../settings',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // resolves to /admin/settings, which doesn’t match current
        },
        {
            title          : 'Relative actual path resolved correctly',
            props          : {
                currentPathname   : '/admin/tools',
                actualPathname    : '../tools',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // resolves to /admin/tools, which matches current
        },
        {
            title          : 'Actual path with dot segments',
            props          : {
                currentPathname   : '/products/books',
                actualPathname    : './fiction/../fiction',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true, // resolves to /products/books/fiction, which partially matches current
        },
        {
            title          : 'Actual path is empty string',
            props          : {
                currentPathname   : '/dashboard',
                actualPathname    : '', // equivalent to '.'
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // resolves to /dashboard, which exact matches current
        },
        {
            title          : 'Actual path is invalid traversal beyond root',
            props          : {
                currentPathname   : '/settings',
                actualPathname    : '../../../../../settings',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // assuming traversal is clamped to root
        },
        {
            title          : 'Multiple slashes in actual path',
            props          : {
                currentPathname   : '/blog/posts',
                actualPathname    : '/blog//posts///',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // malformed paths are treated as-is and causes unmatch
        },
        {
            title          : 'Match with UrlObject format',
            props          : {
                currentPathname   : '/account',
                actualPathname    : { pathname: '/account' } satisfies To,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Match with UrlObject format',
            props          : {
                currentPathname   : '/blog',
                actualPathname    : { pathname: '/blog/posts' } satisfies To,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Segment-unit base with partial match',
            props          : {
                currentPathname   : ['admin', 'metrics'],
                actualPathname    : '/admin/metrics/daily',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Actual path as segment-unit traversal',
            props          : {
                currentPathname   : ['/docs', 'intro'],
                actualPathname    : '../getting-started',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // resolves to /docs/getting-started — not equal to /docs/intro
        },
        {
            title          : 'Actual path is a segment-unit array with extra segment',
            props          : {
                currentPathname   : '/store/products',
                actualPathname    : ['store', 'products', 'featured'].join('/'),
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Actual path with trailing slash (tolerant match)',
            props          : {
                currentPathname   : '/team',
                actualPathname    : '/team/',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // matcher treats trailing slash as normalized
        },
        {
            title          : 'Current path with numeric segments',
            props          : {
                currentPathname   : '/users/0',
                actualPathname    : '/users/0/profile',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Actual path includes query string (query ignored)',
            props          : {
                currentPathname   : '/search',
                actualPathname    : '/search?term=docs',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // query string is ignored during matching
        },
        {
            title          : 'Current path is root, actual is root',
            props          : {
                currentPathname   : '/',
                actualPathname    : '/',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Actual path includes deeply nested traversal',
            props          : {
                currentPathname   : '/projects',
                actualPathname    : './2025/../archive',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true, // resolves to /projects/archive
        },
        {
            title          : 'Actual path has uppercase mismatch',
            props          : {
                currentPathname   : '/Docs/API',
                actualPathname    : '/docs/api',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // Assuming case sensitivity unless explicitly normalized
        },
        {
            title          : 'Current path has redundant segments',
            props          : {
                currentPathname   : '/shop/products///featured',
                actualPathname    : '/shop/products/featured',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // Invalid input treated as failed match
        },
        {
            title          : 'Invalid current pathname format',
            props          : {
                currentPathname   : ['/admin/', 'panel'],
                actualPathname    : '../tools',
                pathMatchStrategy : 'partial',
            },
            expectedResult : false,
        },
        {
            title          : 'Current path as array with empty segments',
            props          : {
                currentPathname   : ['', 'dashboard', '', 'analytics'],
                actualPathname    : '/dashboard/analytics',
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // assuming normalization removes empty strings
        },
        {
            title          : 'Actual path starts with multiple slashes',
            props          : {
                currentPathname   : '/explore',
                actualPathname    : '///explore',
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // malformed input rejected per your rule
        },
        {
            title          : 'Actual path matches deeply nested current',
            props          : {
                currentPathname   : '/users/42',
                actualPathname    : '/users/42/activity/logs',
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Actual path with dot segments resolving to parent',
            props          : {
                currentPathname   : '/users/settings',
                actualPathname    : './profile/../settings', // resolved to /users/settings/settings
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
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
            const { result } = renderHook(() => useCurrentPathMatch(props));
            expect(result.current).toEqual(expectedResult);
        }
    );
});
