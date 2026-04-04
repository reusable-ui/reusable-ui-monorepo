// Cssfn:
import {
    // Cssfn css specific types:
    type CssSelectorCollection,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A selector used to detect whether an element or any of its descendants
 * are currently visibly focused for styling purposes.
 * 
 * This includes:
 * - Native `:focus-visible` matches
 * - Polyfilled input-like focus via `.input-like-focus:focus`
 * - Descendant matches via `:has(...)`, mimicking `:focus-within`
 */
export const isFocusVisibleWithinSelector : CssSelectorCollection = ':is(:focus-visible, .input-like-focus:focus, :has(:focus-visible, .input-like-focus:focus))';
