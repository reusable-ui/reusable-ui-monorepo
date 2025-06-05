// Utilities:
import {
    // Regular paragraphs:
    getTagParagraphSelectors,
    getClassParagraphSelectors,
    
    // Lead paragraphs:
    getTagLeadSelectors,
    getClassLeadSelectors,
    
    // Regular headings:
    getTagHeadingSelectors,
    getClassHeadingSelectors,
    
    // Display headings:
    getTagDisplaySelectors,
    getClassDisplaySelectors,
    
    
    
    // Regular blockquotes:
    getTagBlockquoteSelectors,
    getClassBlockquoteSelectors,
    
    
    
    // Regular lists:
    getTagPlainListSelectors,
    getClassPlainListSelectors,
    
    
    
    // Regular horizontal separators:
    getTagHorzSeparatorSelectors,
    getClassHorzSeparatorSelectors,
    
    
    
    // Regular marks:
    getTagMarkSelectors,
    getClassMarkSelectors,
    
    // Regular kbds:
    getTagKbdSelectors,
    getClassKbdSelectors,
    
    // Regular codes:
    getTagCodeSelectors,
    getClassCodeSelectors,
}                           from './style-selectors.js'

// Types:
import {
    type ElementFilter,
}                           from './style-types.js'



/**
 * Generates filtering rules for selecting paragraphs and excluding headings, displays, and leads.
 */
export const getParagraphFilter : () => ElementFilter = () => ({
    selectors   : [
        // Include regular paragraphs:
        getTagParagraphSelectors(),
        getClassParagraphSelectors(),
    ],
    exclusions  : [
        /*
         * **Exclusion Explanation**
         * Regular headings, display headings, regular paragraphs, and lead paragraphs
         * are **competing for typographical hierarchy** within a document.
         * 
         * - **Regular headings (`.h1` - `.h6`)** → Section titles with distinct fonts.
         * - **Display headings (`.display-1` - `.display-6`)** → Large, prominent text blocks.
         * - **Regular paragraphs (`p`, `.p`)** → Default body text with structured spacing.
         * - **Lead paragraphs (`.lead`)** → Introductory text with enhanced styling.
         * 
         * To maintain consistency, **the competing styles (headings, displays, leads) should be excluded**
         * when applying paragraph-specific rules.
         */
        
        // Exclude regular headings:
        // getTagHeadingSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassHeadingSelectors(),
        
        // Exclude display headings:
        // getTagDisplaySelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassDisplaySelectors(),
        
        // Exclude lead paragraphs:
        // getTagLeadSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassLeadSelectors(),
    ],
});

/**
 * Generates filtering rules for selecting leads and excluding headings, displays, and paragraphs.
 */
export const getLeadFilter      : () => ElementFilter = () => ({
    selectors   : [
        // Include lead paragraphs:
        getTagLeadSelectors(),
        getClassLeadSelectors(),
    ],
    exclusions  : [
        /*
         * **Exclusion Explanation**
         * Regular headings, display headings, regular paragraphs, and lead paragraphs
         * are **competing for typographical hierarchy** within a document.
         * 
         * - **Regular headings (`.h1` - `.h6`)** → Section titles with distinct fonts.
         * - **Display headings (`.display-1` - `.display-6`)** → Large, prominent text blocks.
         * - **Regular paragraphs (`p`, `.p`)** → Default body text with structured spacing.
         * - **Lead paragraphs (`.lead`)** → Introductory text with enhanced styling.
         * 
         * To maintain consistency, **the competing styles (headings, displays, paragraphs) should be excluded**
         * when applying lead-specific rules.
         */
        
        // Exclude regular headings:
        // getTagHeadingSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassHeadingSelectors(),
        
        // Exclude display headings:
        // getTagDisplaySelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassDisplaySelectors(),
        
        // Exclude regular paragraphs:
        // getTagParagraphSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassParagraphSelectors(),
    ],
});

/**
 * Generates filtering rules for selecting headings and excluding displays, paragraphs, and leads.
 */
export const getHeadingFilter   : () => ElementFilter = () => ({
    selectors   : [
        // Include regular headings:
        getTagHeadingSelectors(),
        getClassHeadingSelectors(),
    ],
    exclusions  : [
        /*
         * **Exclusion Explanation**
         * Regular headings, display headings, regular paragraphs, and lead paragraphs
         * are **competing for typographical hierarchy** within a document.
         * 
         * - **Regular headings (`.h1` - `.h6`)** → Section titles with distinct fonts.
         * - **Display headings (`.display-1` - `.display-6`)** → Large, prominent text blocks.
         * - **Regular paragraphs (`p`, `.p`)** → Default body text with structured spacing.
         * - **Lead paragraphs (`.lead`)** → Introductory text with enhanced styling.
         * 
         * To maintain consistency, **the competing styles (displays, paragraphs, leads) should be excluded**
         * when applying heading-specific rules.
         */
        
        // Exclude display headings:
        // getTagDisplaySelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassDisplaySelectors(),
        
        // Exclude regular paragraphs:
        // getTagParagraphSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassParagraphSelectors(),
        
        // Exclude lead paragraphs:
        // getTagLeadSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassLeadSelectors(),
    ],
});

/**
 * Generates filtering rules for selecting displays and excluding headings, paragraphs, and leads.
 */
export const getDisplayFilter   : () => ElementFilter = () => ({
    selectors   : [
        // Include display headings:
        getTagDisplaySelectors(),
        getClassDisplaySelectors(),
    ],
    exclusions  : [
        /*
         * **Exclusion Explanation**
         * Regular headings, display headings, regular paragraphs, and lead paragraphs
         * are **competing for typographical hierarchy** within a document.
         * 
         * - **Regular headings (`.h1` - `.h6`)** → Section titles with distinct fonts.
         * - **Display headings (`.display-1` - `.display-6`)** → Large, prominent text blocks.
         * - **Regular paragraphs (`p`, `.p`)** → Default body text with structured spacing.
         * - **Lead paragraphs (`.lead`)** → Introductory text with enhanced styling.
         * 
         * To maintain consistency, **the competing styles (headings, paragraphs, leads) should be excluded**
         * when applying display-specific rules.
         */
        
        // Exclude regular headings:
        // getTagHeadingSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassHeadingSelectors(),
        
        // Exclude regular paragraphs:
        // getTagParagraphSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassParagraphSelectors(),
        
        // Exclude lead paragraphs:
        // getTagLeadSelectors(), // ❌ Removed tag selectors, because class-based styling takes precedence over tag-based.
        getClassLeadSelectors(),
    ],
});



/**
 * Generates filtering rules for selecting blockquotes.
 */
export const getBlockquoteFilter : () => ElementFilter = () => ({
    selectors   : [
        // Include regular blockquotes:
        getTagBlockquoteSelectors(),
        getClassBlockquoteSelectors(),
    ],
    exclusions  : [
        // Not yet implemented.
    ],
});



/**
 * Generates filtering rules for selecting lists.
 */
export const getPlainListFilter : () => ElementFilter = () => ({
    selectors   : [
        // Include regular lists:
        getTagPlainListSelectors(),
        getClassPlainListSelectors(),
    ],
    exclusions  : [
        // Not yet implemented.
    ],
});



/**
 * Generates filtering rules for selecting horizontal separators.
 */
export const getHorzSeparatorFilter : () => ElementFilter = () => ({
    selectors   : [
        // Include regular horizontal separators:
        getTagHorzSeparatorSelectors(),
        getClassHorzSeparatorSelectors(),
    ],
    exclusions  : [
        // Not yet implemented.
    ],
});



/**
 * Generates filtering rules for selecting marks.
 */
export const getMarkFilter : () => ElementFilter = () => ({
    selectors   : [
        // Include regular marks:
        getTagMarkSelectors(),
        getClassMarkSelectors(),
    ],
    exclusions  : [
        // Not yet implemented.
    ],
});

/**
 * Generates filtering rules for selecting kbds.
 */
export const getKbdFilter : () => ElementFilter = () => ({
    selectors   : [
        // Include regular kbds:
        getTagKbdSelectors(),
        getClassKbdSelectors(),
    ],
    exclusions  : [
        // Not yet implemented.
    ],
});

/**
 * Generates filtering rules for selecting codes.
 */
export const getCodeFilter : () => ElementFilter = () => ({
    selectors   : [
        // Include regular codes:
        getTagCodeSelectors(),
        getClassCodeSelectors(),
    ],
    exclusions  : [
        // Not yet implemented.
    ],
});



/**
 * Generates filtering rules for selecting text-block elements.
 */
export const getTextBlockFilter : () => ElementFilter[] = () => [
    getParagraphFilter(),
    getLeadFilter(),
    getHeadingFilter(),
    getDisplayFilter(),
    
    
    
    getBlockquoteFilter(),
    
    
    
    getPlainListFilter(),
    
    
    
    getHorzSeparatorFilter(),
];

/**
 * Generates filtering rules for selecting text-block elements except heading ones.
 */
export const getNonHeadingTextBlockFilter : () => ElementFilter[] = () => [
    getParagraphFilter(),
    getLeadFilter(),
    // getHeadingFilter(), // Except Heading-like.
    // getDisplayFilter(), // Except Heading-like.
    
    
    
    getBlockquoteFilter(),
    
    
    
    getPlainListFilter(),
    
    
    
    getHorzSeparatorFilter(),
];

/**
 * Generates filtering rules for selecting text-inline elements.
 */
export const getTextInlineFilter : () => ElementFilter[] = () => [
    getMarkFilter(),
    getKbdFilter(),
    getCodeFilter(),
];

/**
 * Generates filtering rules for selecting heading-companion elements.
 */
export const getHeadingCompanionFilter : () => ElementFilter[] = () => [
    getHeadingFilter(),
    getDisplayFilter(),
];
