import {
    // React:
    default as React,
} from 'react'
import {
    type LinkPathMatchProps,
    useLinkPathMatch,
} from '../dist/index.js'
import { renderHook } from '@testing-library/react'
import { NextLinkCompat } from '@reusable-ui/next-link-compat'
import { RouterLinkCompat } from '@reusable-ui/router-link-compat'



// Tests:

/**
 * Defines a single test case for evaluating link path match.
 */
interface LinkPathMatchTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title          : string
    
    /**
     * The input properties for the `useLinkPathMatch` hook.
     */
    props          : LinkPathMatchProps
    
    
    
    // Expected Outcomes:
    
    /**
     * Whether the match is expected to succeed.
     */
    expectedResult : boolean
}



describe('useLinkPathMatch - Next.js <Link>', () => {
    test.each<LinkPathMatchTestCase>([
        {
            title          : 'Exact match from Link href',
            props          : {
                currentPathname   : '/dashboard',
                children          : <NextLinkCompat href="/dashboard">Go to dashboard</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Partial match with nested href',
            props          : {
                currentPathname   : '/dashboard',
                children          : <NextLinkCompat href="/dashboard/analytics">View analytics</NextLinkCompat>,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Exact match fails on nested href',
            props          : {
                currentPathname   : '/dashboard',
                children          : <NextLinkCompat href="/dashboard/settings">Settings</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Link inside fragment is ignored (only direct link supported)',
            props          : {
                currentPathname   : '/shop',
                children          : (
                    <>
                        <span>🛍️</span>
                        <NextLinkCompat href="/shop">Shop now</NextLinkCompat>
                    </>
                ),
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // Fragment-wrapped link is not detected
        },
        {
            title          : 'Link deeply nested in children is ignored (only direct supported)',
            props          : {
                currentPathname   : '/support',
                children          : (
                    <div>
                        <footer>
                            <NextLinkCompat href="/support/contact">Contact us</NextLinkCompat>
                        </footer>
                    </div>
                ),
                pathMatchStrategy : 'partial',
            },
            expectedResult : false, // Nested link is not detected
        },
        {
            title          : 'Link missing href',
            props          : {
                currentPathname   : '/about',
                // @ts-ignore
                children          : <NextLinkCompat>About</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Current path is segment-unit array',
            props          : {
                currentPathname   : ['profile', 'edit'],
                children          : <NextLinkCompat href="/profile/edit">Edit profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with query string (exact match)',
            props          : {
                currentPathname   : '/products',
                children          : <NextLinkCompat href="/products?category=books">Books</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with hash fragment (exact match)',
            props          : {
                currentPathname   : '/faq',
                children          : <NextLinkCompat href="/faq#shipping">Shipping FAQ</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with trailing slash normalizes to match',
            props          : {
                currentPathname   : '/blog',
                children          : <NextLinkCompat href="/blog/">Blog</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with partial match and hash fragment',
            props          : {
                currentPathname   : '/faq',
                children          : <NextLinkCompat href="/faq/shipping#returns">Returns</NextLinkCompat>,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with deeply nested path (partial match)',
            props          : {
                currentPathname   : '/docs',
                children          : <NextLinkCompat href="/docs/guides/components">Components</NextLinkCompat>,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with invalid href format',
            props          : {
                currentPathname   : '/home',
                children          : <NextLinkCompat href="ftp://example.com/home">Home FTP</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Direct link with malformed href',
            props          : {
                currentPathname   : '/info',
                children          : <NextLinkCompat href="//info">Malformed</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Direct link with dynamic href prop',
            props          : {
                currentPathname   : '/profile',
                children          : <NextLinkCompat href={`/profile`}>Profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with href generated via template literal mismatch',
            props          : {
                currentPathname   : '/profile/edit',
                children          : <NextLinkCompat href={`/profile/${'edit'}`}>View Profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with number-encoded segment',
            props          : {
                currentPathname   : '/product/0',
                children          : <NextLinkCompat href="/product/0">Product Detail</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with mismatched casing',
            props          : {
                currentPathname   : '/HELP',
                children          : <NextLinkCompat href="/help">Help</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Direct link with multiple query params',
            props          : {
                currentPathname   : '/search',
                children          : <NextLinkCompat href="/search?term=css&sort=asc">Search</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with search only (no pathname)',
            props          : {
                currentPathname   : '/dashboard',
                children          : <NextLinkCompat href="?tab=settings">Settings Profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Treated as linking to the current pathname
        },
        {
            title          : 'Direct link with hash-only href matches current',
            props          : {
                currentPathname   : '/index',
                children          : <NextLinkCompat href="#profile">Profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Treated as linking to the current pathname
        },
        {
            title          : 'Direct link with search and hash only (no pathname)',
            props          : {
                currentPathname   : '/dashboard',
                children          : <NextLinkCompat href="?tab=settings#profile">Settings Profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Treated as linking to the current pathname
        },
        {
            title          : 'Direct link with relative href resolves to current path',
            props          : {
                currentPathname   : '/dashboard',
                children          : <NextLinkCompat href="./settings">Settings</NextLinkCompat>,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true, // './settings' resolves to '/dashboard/settings'
        },
        {
            title          : 'Direct link with relative href that does not match',
            props          : {
                currentPathname   : '/dashboard',
                children          : <NextLinkCompat href="./profile">Profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // '/dashboard' !== '/dashboard/profile' (exact)
        },
        {
            title          : 'Direct link with level-up href does not match (href unresolved)',
            props          : {
                currentPathname   : '/dashboard/settings',
                children          : <NextLinkCompat href="../profile">Go to Profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // '/dashboard/settings' !== '/dashboard/profile' (exact)
        },
        {
            title          : 'Direct link with double level-up href',
            props          : {
                currentPathname   : '/dashboard/settings/advanced',
                children          : <NextLinkCompat href="../../home">Home</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // resolves to /dashboard/home — not equal to /dashboard/settings/advanced
        },
        {
            title          : 'Direct link with single level-up not matching',
            props          : {
                currentPathname   : '/admin/users',
                children          : <NextLinkCompat href="../settings">Settings</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // resolves to /admin/settings !== /admin/users (exact)
        },
        {
            title          : 'Direct link with level-up href resolving to current',
            props          : {
                currentPathname   : '/profile',
                children          : <NextLinkCompat href="../../profile">Profile</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // resolves to /profile and matches
        },
        {
            title          : 'Direct link with relative "." path',
            props          : {
                currentPathname   : '/profile',
                children          : <NextLinkCompat href="./">Current</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // resolves to /profile
        },
        {
            title          : 'Matches with underline-encoded route',
            props          : {
                currentPathname   : '/_hello', // The directory name is `%5Fhello` but `usePathname()` reported as `/_hello`
                children          : <NextLinkCompat href="/_hello">Underline</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with well-formed-space link',
            props          : {
                currentPathname   : '/search/hello%20world', // well-formed-space route path
                children          : <NextLinkCompat href="/search/hello%20world">Space</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // well-formed-space link path === well-formed-space route path
        },
        {
            title          : 'Fails with mal-formed-space link',
            props          : {
                currentPathname   : '/search/hello%20world', // well-formed-space route path
                children          : <NextLinkCompat href="/search/hello world">Space</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // mal-formed-space link path !== well-formed-space route path
        },
        {
            title          : 'Matches with space-encoded route',
            props          : {
                currentPathname   : '/search/hello%20world',
                children          : <NextLinkCompat href="/search/hello%20world">Space</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to decoded route path
        },
        {
            title          : 'Matches with non-dash-encoded route',
            props          : {
                currentPathname   : '/search/hello-world',
                children          : <NextLinkCompat href="/search/hello-world">Dash</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with dash-encoded route',
            props          : {
                currentPathname   : '/search/hello%2Dworld',
                children          : <NextLinkCompat href="/search/hello%2Dworld">Dash</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-tilde-encoded route',
            props          : {
                currentPathname   : '/search/hello~world',
                children          : <NextLinkCompat href="/search/hello~world">Tilde</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with tilde-encoded route',
            props          : {
                currentPathname   : '/search/hello%7Eworld',
                children          : <NextLinkCompat href="/search/hello%7Eworld">Tilde</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-exclamation-encoded route',
            props          : {
                currentPathname   : '/search/hello!world',
                children          : <NextLinkCompat href="/search/hello!world">Exclamation</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with exclamation-encoded route',
            props          : {
                currentPathname   : '/search/hello%21world',
                children          : <NextLinkCompat href="/search/hello%21world">Exclamation</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-apostrophe-encoded route',
            props          : {
                currentPathname   : "/search/rock'n'roll",
                children          : <NextLinkCompat href="/search/rock'n'roll">Apostrophe</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with apostrophe-encoded route',
            props          : {
                currentPathname   : "/search/rock%27n%27roll",
                children          : <NextLinkCompat href="/search/rock%27n%27roll">Apostrophe</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-parentheses-encoded route',
            props          : {
                currentPathname   : '/search/hello(world)',
                children          : <NextLinkCompat href="/search/hello(world)">Parentheses</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with parentheses-encoded route',
            props          : {
                currentPathname   : '/search/hello%28world%29',
                children          : <NextLinkCompat href="/search/hello%28world%29">Parentheses</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-slash-encoded route',
            props          : {
                currentPathname   : '/search/hello/world',
                children          : <NextLinkCompat href="/search/hello/world">Slash</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with slash-encoded route',
            props          : {
                currentPathname   : '/search/hello%2Fworld',
                children          : <NextLinkCompat href="/search/hello%2Fworld">Slash</NextLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
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
            const { result } = renderHook(() => useLinkPathMatch(props));
            expect(result.current).toEqual(expectedResult);
        }
    );
});

describe('useLinkPathMatch - React Router <Link>', () => {
    test.each<LinkPathMatchTestCase>([
        {
            title          : 'Exact match from Link href',
            props          : {
                currentPathname   : '/dashboard',
                children          : <RouterLinkCompat to="/dashboard">Go to dashboard</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Partial match with nested href',
            props          : {
                currentPathname   : '/dashboard',
                children          : <RouterLinkCompat to="/dashboard/analytics">View analytics</RouterLinkCompat>,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Exact match fails on nested href',
            props          : {
                currentPathname   : '/dashboard',
                children          : <RouterLinkCompat to="/dashboard/settings">Settings</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Link inside fragment is ignored (only direct link supported)',
            props          : {
                currentPathname   : '/shop',
                children          : (
                    <>
                        <span>🛍️</span>
                        <RouterLinkCompat to="/shop">Shop now</RouterLinkCompat>
                    </>
                ),
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // Fragment-wrapped link is not detected
        },
        {
            title          : 'Link deeply nested in children is ignored (only direct supported)',
            props          : {
                currentPathname   : '/support',
                children          : (
                    <div>
                        <footer>
                            <RouterLinkCompat to="/support/contact">Contact us</RouterLinkCompat>
                        </footer>
                    </div>
                ),
                pathMatchStrategy : 'partial',
            },
            expectedResult : false, // Nested link is not detected
        },
        {
            title          : 'Link missing href',
            props          : {
                currentPathname   : '/about',
                // @ts-ignore
                children          : <RouterLinkCompat>About</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Current path is segment-unit array',
            props          : {
                currentPathname   : ['profile', 'edit'],
                children          : <RouterLinkCompat to="/profile/edit">Edit profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with query string (exact match)',
            props          : {
                currentPathname   : '/products',
                children          : <RouterLinkCompat to="/products?category=books">Books</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with hash fragment (exact match)',
            props          : {
                currentPathname   : '/faq',
                children          : <RouterLinkCompat to="/faq#shipping">Shipping FAQ</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with trailing slash normalizes to match',
            props          : {
                currentPathname   : '/blog',
                children          : <RouterLinkCompat to="/blog/">Blog</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with partial match and hash fragment',
            props          : {
                currentPathname   : '/faq',
                children          : <RouterLinkCompat to="/faq/shipping#returns">Returns</RouterLinkCompat>,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with deeply nested path (partial match)',
            props          : {
                currentPathname   : '/docs',
                children          : <RouterLinkCompat to="/docs/guides/components">Components</RouterLinkCompat>,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with invalid href format',
            props          : {
                currentPathname   : '/home',
                children          : <RouterLinkCompat to="ftp://example.com/home">Home FTP</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Direct link with malformed href',
            props          : {
                currentPathname   : '/info',
                children          : <RouterLinkCompat to="//info">Malformed</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Direct link with dynamic href prop',
            props          : {
                currentPathname   : '/profile',
                children          : <RouterLinkCompat to={`/profile`}>Profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with href generated via template literal mismatch',
            props          : {
                currentPathname   : '/profile/edit',
                children          : <RouterLinkCompat to={`/profile/${'edit'}`}>View Profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with number-encoded segment',
            props          : {
                currentPathname   : '/product/0',
                children          : <RouterLinkCompat to="/product/0">Product Detail</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with mismatched casing',
            props          : {
                currentPathname   : '/HELP',
                children          : <RouterLinkCompat to="/help">Help</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false,
        },
        {
            title          : 'Direct link with multiple query params',
            props          : {
                currentPathname   : '/search',
                children          : <RouterLinkCompat to="/search?term=css&sort=asc">Search</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true,
        },
        {
            title          : 'Direct link with search only (no pathname)',
            props          : {
                currentPathname   : '/dashboard',
                children          : <RouterLinkCompat to="?tab=settings">Settings Profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Treated as linking to the current pathname
        },
        {
            title          : 'Direct link with hash-only href matches current',
            props          : {
                currentPathname   : '/index',
                children          : <RouterLinkCompat to="#profile">Profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Treated as linking to the current pathname
        },
        {
            title          : 'Direct link with search and hash only (no pathname)',
            props          : {
                currentPathname   : '/dashboard',
                children          : <RouterLinkCompat to="?tab=settings#profile">Settings Profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Treated as linking to the current pathname
        },
        {
            title          : 'Direct link with relative href resolves to current path',
            props          : {
                currentPathname   : '/dashboard',
                children          : <RouterLinkCompat to="./settings">Settings</RouterLinkCompat>,
                pathMatchStrategy : 'partial',
            },
            expectedResult : true, // './settings' resolves to '/dashboard/settings'
        },
        {
            title          : 'Direct link with relative href that does not match',
            props          : {
                currentPathname   : '/dashboard',
                children          : <RouterLinkCompat to="./profile">Profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // '/dashboard' !== '/dashboard/profile' (exact)
        },
        {
            title          : 'Direct link with level-up href does not match (href unresolved)',
            props          : {
                currentPathname   : '/dashboard/settings',
                children          : <RouterLinkCompat to="../profile">Go to Profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // '/dashboard/settings' !== '/dashboard/profile' (exact)
        },
        {
            title          : 'Direct link with double level-up href',
            props          : {
                currentPathname   : '/dashboard/settings/advanced',
                children          : <RouterLinkCompat to="../../home">Home</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // resolves to /dashboard/home — not equal to /dashboard/settings/advanced
        },
        {
            title          : 'Direct link with single level-up not matching',
            props          : {
                currentPathname   : '/admin/users',
                children          : <RouterLinkCompat to="../settings">Settings</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // resolves to /admin/settings !== /admin/users (exact)
        },
        {
            title          : 'Direct link with level-up href resolving to current',
            props          : {
                currentPathname   : '/profile',
                children          : <RouterLinkCompat to="../../profile">Profile</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // resolves to /profile and matches
        },
        {
            title          : 'Direct link with relative "." path',
            props          : {
                currentPathname   : '/profile',
                children          : <RouterLinkCompat to="./">Current</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // resolves to /profile
        },
        {
            title          : 'Matches with underline-encoded route',
            props          : {
                currentPathname   : '/_hello', // The directory name is `%5Fhello` but `usePathname()` reported as `/_hello`
                children          : <RouterLinkCompat to="/_hello">Underline</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with well-formed-space link',
            props          : {
                currentPathname   : '/search/hello%20world', // well-formed-space route path
                children          : <RouterLinkCompat to="/search/hello%20world">Space</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // well-formed-space link path === well-formed-space route path
        },
        {
            title          : 'Fails with mal-formed-space link',
            props          : {
                currentPathname   : '/search/hello%20world', // well-formed-space route path
                children          : <RouterLinkCompat to="/search/hello world">Space</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : false, // mal-formed-space link path !== well-formed-space route path
        },
        {
            title          : 'Matches with space-encoded route',
            props          : {
                currentPathname   : '/search/hello%20world',
                children          : <RouterLinkCompat to="/search/hello%20world">Space</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to decoded route path
        },
        {
            title          : 'Matches with non-dash-encoded route',
            props          : {
                currentPathname   : '/search/hello-world',
                children          : <RouterLinkCompat to="/search/hello-world">Dash</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with dash-encoded route',
            props          : {
                currentPathname   : '/search/hello%2Dworld',
                children          : <RouterLinkCompat to="/search/hello%2Dworld">Dash</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-tilde-encoded route',
            props          : {
                currentPathname   : '/search/hello~world',
                children          : <RouterLinkCompat to="/search/hello~world">Tilde</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with tilde-encoded route',
            props          : {
                currentPathname   : '/search/hello%7Eworld',
                children          : <RouterLinkCompat to="/search/hello%7Eworld">Tilde</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-exclamation-encoded route',
            props          : {
                currentPathname   : '/search/hello!world',
                children          : <RouterLinkCompat to="/search/hello!world">Exclamation</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with exclamation-encoded route',
            props          : {
                currentPathname   : '/search/hello%21world',
                children          : <RouterLinkCompat to="/search/hello%21world">Exclamation</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-apostrophe-encoded route',
            props          : {
                currentPathname   : "/search/rock'n'roll",
                children          : <RouterLinkCompat to="/search/rock'n'roll">Apostrophe</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with apostrophe-encoded route',
            props          : {
                currentPathname   : "/search/rock%27n%27roll",
                children          : <RouterLinkCompat to="/search/rock%27n%27roll">Apostrophe</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-parentheses-encoded route',
            props          : {
                currentPathname   : '/search/hello(world)',
                children          : <RouterLinkCompat to="/search/hello(world)">Parentheses</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with parentheses-encoded route',
            props          : {
                currentPathname   : '/search/hello%28world%29',
                children          : <RouterLinkCompat to="/search/hello%28world%29">Parentheses</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with non-slash-encoded route',
            props          : {
                currentPathname   : '/search/hello/world',
                children          : <RouterLinkCompat to="/search/hello/world">Slash</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
        },
        {
            title          : 'Matches with slash-encoded route',
            props          : {
                currentPathname   : '/search/hello%2Fworld',
                children          : <RouterLinkCompat to="/search/hello%2Fworld">Slash</RouterLinkCompat>,
                pathMatchStrategy : 'exact',
            },
            expectedResult : true, // Matches to as-is route path
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
            const { result } = renderHook(() => useLinkPathMatch(props));
            expect(result.current).toEqual(expectedResult);
        }
    );
});
