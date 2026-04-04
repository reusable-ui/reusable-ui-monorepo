// Cssfn:
import {
    // Cssfn css specific types:
    type CssSelectorCollection,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A selector used to detect whether an element or any of its descendants
 * are currently hovered for styling purposes.
 * 
 * This includes:
 * - Native `:hover` matches
 * - No need descendant matches via `:has(...)` as nested hover is inherently handled by `:hover`
 */
export const isHoverWithinSelector : CssSelectorCollection = ':hover';
