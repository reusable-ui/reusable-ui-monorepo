// Cssfn:
import {
    // Cssfn properties:
    type CssSelectorCollection,
}                           from '@cssfn/core'          // Writes css in javascript.



// Types:

/**
 * Defines filtering rules for selecting and excluding specific HTML elements
 * such as headings, displays, paragraphs, and leads.
 */
export interface ElementFilter {
    /**
     * Collection of CSS selectors for targeting relevant text elements 
     * (e.g., headings, displays, paragraphs, and leads).
     */
    selectors  : CssSelectorCollection
    
    /**
     * Collection of class names to be excluded using `:not(:where(...))`,
     * preventing specific elements from being selected.
     */
    exclusions : CssSelectorCollection
}
