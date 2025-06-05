// Cssfn:
import {
    // Cssfn properties:
    type CssSelectorCollection,
}                           from '@cssfn/core'          // Writes css in javascript.



// Regular paragraphs:

/**
 * Generates **tag-based paragraph selectors** (`<p>`).
 */
export const getTagParagraphSelectors    : () => CssSelectorCollection = () => ['p'];

/**
 * Generates **class-based paragraph selectors** (`.p`).
 */
export const getClassParagraphSelectors  : () => CssSelectorCollection = () => ['.p'];


// Lead paragraphs:

/**
 * Generates **tag-based lead paragraph selectors** (Not yet implemented).
 */
export const getTagLeadSelectors         : () => CssSelectorCollection = () => [/* not yet implemented */];

/**
 * Generates **class-based lead paragraph selectors** (`.lead`).
 */
export const getClassLeadSelectors       : () => CssSelectorCollection = () => ['.lead'];



// Regular headings:

/**
 * Generates an array of heading levels (1-6).
 */
export const getDefaultLevels = (): number[] => Array.from({ length: 6 }, (_, level) => level + 1);

/**
 * Generates **tag-based heading selectors** (`<h1> - <h6>`).
 */
export const getTagHeadingSelectors      : (levels?: number[]) => CssSelectorCollection = (levels = getDefaultLevels()) => levels.map((level) =>  `h${level}`);

/**
 * Generates **class-based heading selectors** (`.h1 - .h6`).
 */
export const getClassHeadingSelectors    : (levels?: number[]) => CssSelectorCollection = (levels = getDefaultLevels()) => levels.map((level) => `.h${level}`);


// Display headings:

/**
 * Generates **tag-based display heading selectors** (Not yet implemented).
 */
export const getTagDisplaySelectors      : (levels?: number[]) => CssSelectorCollection = (levels = getDefaultLevels()) => [/* not yet implemented */];

/**
 * Generates **class-based display heading selectors** (`.display-1 - .display-6`).
 */
export const getClassDisplaySelectors    : (levels?: number[]) => CssSelectorCollection = (levels = getDefaultLevels()) => levels.map((level) => `.display-${level}`);



// Regular blockquotes:

/**
 * Generates **tag-based blockquote selectors** (`<blockquote>`).
 */
export const getTagBlockquoteSelectors   : () => CssSelectorCollection = () => ['blockquote'];

/**
 * Generates **class-based blockquote selectors** (`.blockquote`).
 */
export const getClassBlockquoteSelectors : () => CssSelectorCollection = () => ['.blockquote'];



// Regular lists:

/**
 * Generates **tag-based list selectors** (`<list>`).
 */
export const getTagPlainListSelectors   : () => CssSelectorCollection = () => [/* not yet implemented */];

/**
 * Generates **class-based list selectors** (`.plainList`).
 */
export const getClassPlainListSelectors : () => CssSelectorCollection = () => ['.plainList'];



// Regular horizontal separators:

/**
 * Generates **tag-based horizontal separator selectors** (`<hr>`).
 */
export const getTagHorzSeparatorSelectors   : () => CssSelectorCollection = () => ['hr'];

/**
 * Generates **class-based horizontal separator selectors** (`.hr`).
 */
export const getClassHorzSeparatorSelectors : () => CssSelectorCollection = () => ['.hr'];



// Regular marks:

/**
 * Generates **tag-based mark selectors** (`<mark>`).
 */
export const getTagMarkSelectors   : () => CssSelectorCollection = () => ['mark'];

/**
 * Generates **class-based mark selectors** (`.mark`).
 */
export const getClassMarkSelectors : () => CssSelectorCollection = () => ['.mark'];


// Regular kbds:

/**
 * Generates **tag-based kbd selectors** (`<kbd>`).
 */
export const getTagKbdSelectors   : () => CssSelectorCollection = () => ['kbd'];

/**
 * Generates **class-based kbd selectors** (`.kbd`).
 */
export const getClassKbdSelectors : () => CssSelectorCollection = () => ['.kbd'];


// Regular codes:

/**
 * Generates **tag-based code selectors** (`<code>`, `<var>`, and `<samp>`),
 * excluding preformatted blocks (`<pre>` and `.pre`).
 */
export const getTagCodeSelectors   : () => CssSelectorCollection = () => [':not(:where(pre, .pre))>:is(code, var, samp)'];

/**
 * Generates **class-based code selectors** (`.code`, `.var`, and `.samp`),
 * excluding preformatted blocks (`<pre>` and `.pre`).
 */
export const getClassCodeSelectors : () => CssSelectorCollection = () => [':not(:where(pre, .pre))>:is(.code, .var, .samp)'];
