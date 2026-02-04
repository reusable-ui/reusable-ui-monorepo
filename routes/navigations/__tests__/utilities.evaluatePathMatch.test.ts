import {
    type PathMatchStrategy,
} from '../dist/types.js'
import {
    evaluatePathMatch,
} from '../dist/utilities.js'



// Tests:

/**
 * Defines a single test case for evaluating path matches.
 */
interface EvaluatePathMatchTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title            : string
    
    /**
     * The absolute pathname to test (e.g. `/about/team`).
     */
    actualPathname   : string
    
    /**
     * The expected absolute pathname to match against (e.g. `/about`).
     */
    expectedPathname : string
    
    /**
     * Defines how strictly paths are compared.
     */
    strategy         : PathMatchStrategy
    
    
    
    // Expected Outcomes:
    
    /**
     * Whether the match is expected to succeed.
     */
    expectedResult   : boolean
}



describe('evaluatePathMatch', () => {
    test.each<EvaluatePathMatchTestCase>([
        // 🎯 Exact matches
        {
            title            : 'Exact match — identical paths',
            actualPathname   : '/about',
            expectedPathname : '/about',
            strategy         : 'exact',
            expectedResult   : true, // Paths are fully equal, matches by strict equality.
        },
        {
            title            : 'Exact match — identical paths with extra trailing slash',
            actualPathname   : '/about/',
            expectedPathname : '/about/',
            strategy         : 'exact',
            expectedResult   : true, // Paths are fully equal, matches by strict equality.
        },
        {
            title            : 'Exact match — different casing',
            actualPathname   : '/About',
            expectedPathname : '/about',
            strategy         : 'exact',
            expectedResult   : false, // Path casing differs; matching is case-sensitive.
        },
        
        // 🔗 Exact-like match (off by one trailing slash)
        {
            title            : 'Exact-like match — extra trailing slash in current',
            actualPathname   : '/about/',
            expectedPathname : '/about',
            strategy         : 'exact',
            expectedResult   : true, // Allowed by trailing-slash tolerance; semantically same location.
        },
        {
            title            : 'Exact-like match — extra trailing slash in expected',
            actualPathname   : '/about',
            expectedPathname : '/about/',
            strategy         : 'exact',
            expectedResult   : true, // Allowed by trailing-slash tolerance; semantically same location.
        },
        {
            title            : 'Exact-like match — extra trailing slash in current',
            actualPathname   : '/users/matt/',
            expectedPathname : '/users/matt',
            strategy         : 'exact',
            expectedResult   : true, // Allowed by trailing-slash tolerance; semantically same location.
        },
        {
            title            : 'Exact-like match — extra trailing slash in expected',
            actualPathname   : '/users/matt',
            expectedPathname : '/users/matt/',
            strategy         : 'exact',
            expectedResult   : true, // Allowed by trailing-slash tolerance; semantically same location.
        },
        {
            title            : 'Exact-like mismatch — wrong character, not a slash',
            actualPathname   : '/users/mattx',
            expectedPathname : '/users/matt',
            strategy         : 'exact',
            expectedResult   : false, // One-character difference is not a slash; not equal.
        },
        
        // 🧭 Root path matching
        {
            title            : 'Partial match — root path expected',
            actualPathname   : '/dashboard',
            expectedPathname : '/',
            strategy         : 'partial',
            expectedResult   : true, // Root matches all locations under it by definition.
        },
        {
            title            : 'Partial match — root path both',
            actualPathname   : '/',
            expectedPathname : '/',
            strategy         : 'partial',
            expectedResult   : true, // Root matches all locations under it by definition.
        },
        {
            title            : 'Partial match — root path current',
            actualPathname   : '/',
            expectedPathname : '/dashboard',
            strategy         : 'partial',
            expectedResult   : false, // Expected path isn't a prefix of the current; match fails.
        },
        {
            title            : 'Exact match — root path only',
            actualPathname   : '/',
            expectedPathname : '/',
            strategy         : 'exact',
            expectedResult   : true, // Both are root; strict equality satisfied.
        },
        
        // 🚧 Partial matches at segment boundary
        {
            title            : 'Partial match — nested segment',
            actualPathname   : '/blog/posts',
            expectedPathname : '/blog',
            strategy         : 'partial',
            expectedResult   : true, // Current starts with expected and continues at segment boundary.
        },
        {
            title            : 'Partial match — expected with trailing slash',
            actualPathname   : '/blog/posts',
            expectedPathname : '/blog/',
            strategy         : 'partial',
            expectedResult   : true, // Segment boundary respected after trailing slash.
        },
        {
            title            : 'Partial match — exact character but not at segment boundary',
            actualPathname   : '/bloggy',
            expectedPathname : '/blog',
            strategy         : 'partial',
            expectedResult   : false, // StartsWith match exists but next char is not a segment boundary.
        },
        {
            title            : 'Partial match — startsWith match but not a new segment',
            actualPathname   : '/products-view',
            expectedPathname : '/products',
            strategy         : 'partial',
            expectedResult   : false, // StartsWith match exists but next char is not a segment boundary.
        },
        {
            title            : 'Partial match — exact match with no trailing slash',
            actualPathname   : '/products',
            expectedPathname : '/products',
            strategy         : 'partial',
            expectedResult   : true, // Exact match qualifies as partial; no extra segment needed.
        },
        
        // 🧪 Edge case: one-character difference
        {
            title            : 'Edge case — one-character difference, trailing slash mismatch in current',
            actualPathname   : '/abc/',
            expectedPathname : '/abc',
            strategy         : 'exact',
            expectedResult   : true, // Allowed by trailing-slash tolerance; semantically same location.
        },
        {
            title            : 'Edge case — one-character difference, trailing slash mismatch in expected',
            actualPathname   : '/abc',
            expectedPathname : '/abc/',
            strategy         : 'exact',
            expectedResult   : true, // Allowed by trailing-slash tolerance; semantically same location.
        },
        {
            title            : 'Edge case — path too short to compare',
            actualPathname   : '/a',
            expectedPathname : '/abc',
            strategy         : 'partial',
            expectedResult   : false, // Expected path isn't a prefix of the current; match fails.
        },
        
        // 🧩 Corner cases
        {
            title            : 'Exact match — both paths empty',
            actualPathname   : '',
            expectedPathname : '',
            strategy         : 'partial',
            expectedResult   : false, // Empty paths aren't valid navigable locations.
        },
        {
            title            : 'Exact match — both paths empty',
            actualPathname   : '',
            expectedPathname : '',
            strategy         : 'exact',
            expectedResult   : false, // Empty paths aren't valid navigable locations.
        },
        {
            title            : 'Partial match — expected is empty string',
            actualPathname   : '/anything',
            expectedPathname : '',
            strategy         : 'partial',
            expectedResult   : false, // Empty expected path is considered invalid.
        },
        {
            title            : 'Partial match — current is empty string',
            actualPathname   : '',
            expectedPathname : '/anything',
            strategy         : 'partial',
            expectedResult   : false, // Empty current path can't match any prefix.
        },
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            actualPathname,
            expectedPathname,
            strategy,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            expect(evaluatePathMatch(actualPathname, expectedPathname, strategy)).toBe(expectedResult);
        }
    );
});
