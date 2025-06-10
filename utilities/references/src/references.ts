// React:
import {
    // Types:
    type Ref,
    type RefCallback,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    type Optional,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.




// Hooks:

/**
 * Merges multiple React refs into a single stable ref function.
 * 
 * - Ensures all provided refs receive the assigned value.
 * - Supports both **callback refs** (`(value) => void`) and **ref objects** (`{ current: value }`).
 * - Prevents unnecessary re-creations by maintaining a stable reference.
 * 
 * @template TValue - The type of the referenced value.
 * @param {Optional<Ref<TValue>>[]} refs - List of refs to merge.
 * @returns {RefCallback<TValue>} A stable merged ref function.
 * 
 * @example
 * ```tsx
 * const contentRef = useRef<HTMLDivElement | null>(null);
 * const thirdPartyRef = useThirdPartyLibrary();
 * <div ref={useMergeRefs(
 *     // External ref:
 *     props.ref,
 *     
 *     // Internal ref:
 *     contentRef,
 *     
 *     // Third party ref:
 *     thirdPartyRef,
 * )}>
 *     Content
 * </div>
 * ```
 */
export const useMergeRefs = <TValue>(...refs: Optional<Ref<TValue>>[]): RefCallback<TValue> => {
    // Returns a stable merged ref function:
    return useStableCallback<[value: TValue], void>((value) => {
        // Iterates through refs and sets each one if defined:
        for (const ref of refs) {
            // Ignore null or undefined refs:
            if (!ref) continue;
            
            
            
            // Update the new value:
            if (typeof ref === 'function') {
                // Invoke callback ref:
                ref(value);
            }
            else {
                // Assign value to object ref:
                ref.current = value;
            } // if
        } // for
    });
};
