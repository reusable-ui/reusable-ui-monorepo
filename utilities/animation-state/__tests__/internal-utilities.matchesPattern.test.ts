import {
    matchesPattern,
} from '../dist/internal-utilities.js'



// Tests:

/**
 * Defines a single test case for evaluating animation name matches.
 */
interface PatternTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title            : string
    
    /**
     * The actual animation name to test (e.g. `fadeIn`).
     */
    animationName    : string
    
    /**
     * The expected pattern, which can be a string, array of strings, or RegExp.
     */
    animationPattern : string | string[] | RegExp
    
    
    
    // Expected Outcomes:
    
    /**
     * Whether the match is expected to succeed.
     */
    expectedResult   : boolean
}



describe('matchesPattern', () => {
    test.each<PatternTestCase>([
        // ✅ Basic string suffix matches
        {
            title            : 'Exact match with string pattern',
            animationName    : 'fade-in',
            animationPattern : 'fade-in',
            expectedResult   : true,
        },
        {
            title            : 'Suffix match with word boundary',
            animationName    : 'is-fade-in',
            animationPattern : 'fade-in',
            expectedResult   : true,
        },
        {
            title            : 'Suffix match without word boundary',
            animationName    : 'isfade-in',
            animationPattern : 'fade-in',
            expectedResult   : false,
        },
        {
            title            : 'Pattern not at end of string',
            animationName    : 'fade-in-fast',
            animationPattern : 'fade-in',
            expectedResult   : false,
        },
        
        // ✅ RegExp matches
        {
            title            : 'RegExp match at start',
            animationName    : 'bounce-in',
            animationPattern : /^bounce/,
            expectedResult   : true,
        },
        {
            title            : 'RegExp no match',
            animationName    : 'slide-out',
            animationPattern : /^bounce/,
            expectedResult   : false,
        },
        {
            title            : 'RegExp match with suffix',
            animationName    : 'fade-in',
            animationPattern : /fade-in$/,
            expectedResult   : true,
        },
        
        // ✅ Edge cases
        {
            title            : 'Empty string pattern matches any animation name',
            animationName    : 'fade-in',
            animationPattern : '',
            expectedResult   : true,
        },
        {
            title            : 'Empty animation name with empty pattern',
            animationName    : '',
            animationPattern : '',
            expectedResult   : true,
        },
        {
            title            : 'Empty animation name with non-empty pattern',
            animationName    : '',
            animationPattern : 'fade-in',
            expectedResult   : false,
        },
        
        // ✅ Word boundary punctuation
        {
            title            : 'Suffix preceded by dash (valid boundary)',
            animationName    : 'is-fade-in',
            animationPattern : 'fade-in',
            expectedResult   : true,
        },
        {
            title            : 'Suffix preceded by underscore (invalid boundary)',
            animationName    : 'is_fade-in',
            animationPattern : 'fade-in',
            expectedResult   : false,
        },
        {
            title            : 'Suffix preceded by letter (invalid boundary)',
            animationName    : 'isfade-in',
            animationPattern : 'fade-in',
            expectedResult   : false,
        },
        
        // ✅ Unicode and emoji
        {
            title            : 'Suffix match with emoji boundary',
            animationName    : '🔥fade-in',
            animationPattern : 'fade-in',
            expectedResult   : true,
        },
        {
            title            : 'Suffix match with emoji suffix',
            animationName    : 'fade🔥',
            animationPattern : '🔥',
            expectedResult   : true,
        },
        {
            title            : 'Suffix match with emoji with valid emoji boundary',
            animationName    : 'fade🔥in',
            animationPattern : 'in',
            expectedResult   : true,
        },
        
        // ✅ Single character suffixes
        {
            title            : 'Single character match with valid boundary',
            animationName    : 'x-a',
            animationPattern : 'a',
            expectedResult   : true,
        },
        {
            title            : 'Single character match without boundary',
            animationName    : 'xa',
            animationPattern : 'a',
            expectedResult   : false,
        },
        
        // ✅ Array of patterns
        {
            title            : 'Empty array pattern — should fail',
            animationName    : 'fade-in',
            animationPattern : [],
            expectedResult   : false,
        },
        {
            title            : 'Array with empty string — should match everything',
            animationName    : 'anything-goes',
            animationPattern : [''],
            expectedResult   : true,
        },
        {
            title            : 'Mixed patterns with empty string — match due to ""',
            animationName    : 'whatever',
            animationPattern : ['foo', '', 'bar'],
            expectedResult   : true,
        },
        {
            title            : 'Array of suffixes — exact match',
            animationName    : 'bounce-out',
            animationPattern : ['fade-in', 'bounce-out', 'slide-up'],
            expectedResult   : true,
        },
        {
            title            : 'Array of suffixes — boundary-safe with punctuation',
            animationName    : 'is-bounce-out',
            animationPattern : ['bounce-out', '-bounce-out'],
            expectedResult   : true,
        },
        {
            title            : 'Array of suffixes — fails due to word boundary',
            animationName    : 'isbounceout',
            animationPattern : ['bounce-out'],
            expectedResult   : false,
        },
        {
            title            : 'Emoji prefix — valid suffix match from array',
            animationName    : '💥explode',
            animationPattern : ['explode', 'fade'],
            expectedResult   : true,
        },
        {
            title            : 'Only one suffix in array matches boundary',
            animationName    : 'is-fade-in',
            animationPattern : ['fadein', 'fade-in'],
            expectedResult   : true,
        },
        {
            title            : 'No suffix in array matches animation name',
            animationName    : 'spin-left',
            animationPattern : ['right', 'out', 'fade-in'],
            expectedResult   : false,
        },
        {
            title            : 'Suffix matches but fails word boundary from array',
            animationName    : 'isfade-in',
            animationPattern : ['fade-in', 'slide'],
            expectedResult   : false,
        },
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            animationName,
            animationPattern,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            expect(matchesPattern(animationName, animationPattern)).toBe(expectedResult);
        }
    );
});
