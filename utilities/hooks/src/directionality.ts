// React:
import {
    // Types:
    type RefCallback,
}                           from 'react'

// Utilities:
import {
    // Hooks:
    useIsRtl as importedUseIsRtl,
}                           from '@reusable-ui/directionality'  // A React utility for handling directionality (RTL/LTR) in UI components.



/**
 * @deprecated - Use `useIsRtl` from '@reusable-ui/directionality' instead.
 * 
 * Determines if an element uses **right-to-left (RTL)** direction.
 * 
 * - Attaches a ref to the target element.
 * - Tracks RTL status and updates when the component re-renders.
 * - Defaults to `false` unless specified otherwise.
 *
 * @param {boolean} [defaultRtl=false] - The initial RTL state before detecting computed styles.
 * @returns {[boolean, RefCallback<TElement | null>]} A tuple containing the RTL status and a ref callback.
 */
export const useIsRtl = <TElement extends Element = HTMLElement>(defaultRtl: boolean = false): readonly [boolean, RefCallback<TElement | null>] => importedUseIsRtl(defaultRtl);
