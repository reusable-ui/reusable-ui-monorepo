import {
    resolveAbsolutePathFromRelative,
} from '../dist/utilities.js'



// Tests:

/**
 * Defines a single test case for resolving relative paths against a current pathname.
 */
interface ResolveAbsolutePathFromRelativeTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title                : string
    
    /**
     * The reference point to resolve from.
     */
    currentPathname      : string | string[]
    
    /**
     * The relative path to resolve.
     */
    relativePath         : string
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected absolute path after resolution.
     */
    expectedAbsolutePath : `/${string}`
}



describe('resolveAbsolutePathFromRelative', () => {
    test.each<ResolveAbsolutePathFromRelativeTestCase>([
        // Test cases with currentPathname as pathname strings, simulating relative to absolute paths:
        {
            title                : 'Root with direct child',
            currentPathname      : '/',
            relativePath         : 'about',
            expectedAbsolutePath : '/about',
        },
        {
            title                : 'One-level descent',
            currentPathname      : '/users',
            relativePath         : 'profile',
            expectedAbsolutePath : '/users/profile',
        },
        {
            title                : 'One-level ascent',
            currentPathname      : '/users/matt',
            relativePath         : '..',
            expectedAbsolutePath : '/users',
        },
        {
            title                : 'Multi-level ascent',
            currentPathname      : '/users/matt/settings',
            relativePath         : '../../edit',
            expectedAbsolutePath : '/users/edit',
        },
        {
            title                : 'Staying at same level',
            currentPathname      : '/blog/react',
            relativePath         : './comments',
            expectedAbsolutePath : '/blog/react/comments',
        },
        {
            title                : 'Empty relative path',
            currentPathname      : '/dashboard',
            relativePath         : '',
            expectedAbsolutePath : '/dashboard',
        },
        {
            title                : 'Relative path with nested segments and redundant slashes',
            currentPathname      : '/docs',
            relativePath         : 'getting-started/',
            expectedAbsolutePath : '/docs/getting-started',
        },
        {
            title                : 'Complex mix of ., .., and nested segments',
            currentPathname      : '/account/settings/profile',
            relativePath         : './../notifications/./email',
            expectedAbsolutePath : '/account/settings/notifications/email',
        },
        {
            title                : 'Absolute override',
            currentPathname      : '/admin/tools',
            relativePath         : '/support/faq',
            expectedAbsolutePath : '/support/faq',
        },
        {
            title                : 'Trailing slash in base',
            currentPathname      : '/projects/',
            relativePath         : '../archive',
            expectedAbsolutePath : '/archive',
        },
        {
            title                : 'Too many upward traversals from shallow path',
            currentPathname      : '/settings',
            relativePath         : '../../../profile',
            expectedAbsolutePath : '/profile' // Pops beyond root — should clamp at root
        },
        {
            title                : 'Double slashes in relative path (redundant)',
            currentPathname      : '/users',
            relativePath         : 'profile//info',
            expectedAbsolutePath : '/users/profile/info' // Should skip empty segment
        },
        {
            title                : 'Leading slash on relative path (absolute override)',
            currentPathname      : '/users/matt',
            relativePath         : '/admin/dashboard',
            expectedAbsolutePath : '/admin/dashboard' // Should override base
        },
        {
            title                : 'Trailing slash on base and relative path',
            currentPathname      : '/users/matt/',
            relativePath         : 'settings/',
            expectedAbsolutePath : '/users/matt/settings' // Should normalize both ends
        },
        {
            title                : 'Mix of . and .. with extra slashes',
            currentPathname      : '/projects/2025',
            relativePath         : './.././../archive//deep',
            expectedAbsolutePath : '/archive/deep' // Should walk up twice, skip dot, normalize path
        },
        {
            title                : 'Relative path is just .',
            currentPathname      : '/blog/react',
            relativePath         : '.',
            expectedAbsolutePath : '/blog/react' // Stay at current path
        },
        {
            title                : 'Base is root, single segment',
            currentPathname      : '/',
            relativePath         : 'settings',
            expectedAbsolutePath : '/settings' // Clean append from root
        },
        {
            title                : 'Base is deeply nested, relative is empty',
            currentPathname      : '/a/b/c/d/e',
            relativePath         : '',
            expectedAbsolutePath : '/a/b/c/d/e' // Stay put
        },
        {
            title                : 'Base with trailing slashes, empty relative',
            currentPathname      : '/x/y/z///',
            relativePath         : '',
            expectedAbsolutePath : '/x/y/z' // Normalize trailing slashes
        },
        {
            title                : 'All dot segments and empty strings',
            currentPathname      : '/alpha/beta',
            relativePath         : './././',
            expectedAbsolutePath : '/alpha/beta' // Skip all
        },
        {
            title                : 'Segment with accidental leading slash',
            currentPathname      : '/team',
            relativePath         : '/members', // Absolute path by accident
            expectedAbsolutePath : '/members' // Should override completely
        },
        
        
        
        // Test cases with currentPathname as route segment units, simulating relative to route segments:
        {
            title                : 'Root with direct child segment',
            currentPathname      : [''],
            relativePath         : 'about',
            expectedAbsolutePath : '/about',
        },
        {
            title                : 'Multi-level base with single descent',
            currentPathname      : ['', 'users', 'matt'],
            relativePath         : 'settings',
            expectedAbsolutePath : '/users/matt/settings',
        },
        {
            title                : 'Multi-level base with single ascent',
            currentPathname      : ['', 'users', 'matt'],
            relativePath         : '..',
            expectedAbsolutePath : '/users',
        },
        {
            title                : 'Ascent from deep flat segment unit',
            currentPathname      : ['', 'admin/settings'],
            relativePath         : '..',
            expectedAbsolutePath : '/',
        },
        {
            title                : 'Complex descent after upward traversal',
            currentPathname      : ['', 'product', '123/specs'],
            relativePath         : '../details/full',
            expectedAbsolutePath : '/product/details/full',
        },
        {
            title                : 'Dot and empty segments ignored',
            currentPathname      : ['', 'blog', 'react'],
            relativePath         : '././comments//',
            expectedAbsolutePath : '/blog/react/comments',
        },
        {
            title                : 'Too many upward steps',
            currentPathname      : ['', 'users', 'matt'],
            relativePath         : '../../../../../settings',
            expectedAbsolutePath : '/settings' // clamps at root,
        },
        {
            title                : 'Segment unit contributes multiple segments',
            currentPathname      : ['', 'blog/react'],
            relativePath         : 'comments',
            expectedAbsolutePath : '/blog/react/comments',
        },
        {
            title                : 'Absolute override from segment base',
            currentPathname      : ['', 'alpha/beta'],
            relativePath         : '/support/faq',
            expectedAbsolutePath : '/support/faq' // absolute path triggers early return,
        },
        {
            title                : 'Stay in same segment unit',
            currentPathname      : ['', 'account/settings'],
            relativePath         : '.',
            expectedAbsolutePath : '/account/settings',
        },
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            currentPathname,
            relativePath,
            
            
            
            // Expects:
            expectedAbsolutePath,
        }) => {
            expect(resolveAbsolutePathFromRelative(currentPathname, relativePath)).toEqual(expectedAbsolutePath);
        }
    );
});
