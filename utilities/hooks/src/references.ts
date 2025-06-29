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

// Utilities:
import {
    // Hooks:
    useMergeRefs as importedUseMergeRefs,
}                           from '@reusable-ui/references'      // A utility package for managing and merging React refs efficiently.



/**
 * @deprecated - Use `useMergeRefs` from '@reusable-ui/references' instead.
 * 
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
export const useMergeRefs = <TValue>(...refs: Optional<Ref<TValue>>[]): RefCallback<TValue> => importedUseMergeRefs(...refs);
