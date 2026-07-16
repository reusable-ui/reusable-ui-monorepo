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
 * - Supports **React 19+ cleanup functions** returned by callback refs.
 * - **Backward Compatibility**: If the callback ref does not return a cleanup function,
 *   it falls back to calling `ref(null)` upon unmounting.
 * - Prevents unnecessary re-creations by maintaining a stable reference.
 * 
 * @template TValue The type of the referenced value.
 * @param refs List of refs to merge.
 * @returns A stable merged ref function supporting React 19+ cleanups and fallback rules.
 * 
 * @example
 * ```tsx
 * const contentRef = useRef<HTMLDivElement | null>(null);
 * const thirdPartyRef = useThirdPartyLibrary();
 * <div ref={useMergedRefs(
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
export const useMergedRefs = <TValue>(...refs: Optional<Ref<TValue>>[]): RefCallback<TValue> => {
    // Return a stable callback ref that can return a cleanup function:
    return useStableCallback</* paramTypes: */ [value: TValue | null], /* returnType: */ void | (() => void)>((value) => {
        // Collect individual cleanup routines to be run upon unmount:
        const scheduledCleanups: (() => void)[] = [];
        
        
        
        // Iterates through refs and sets each one if defined:
        for (const ref of refs) {
            // Ignore null or undefined refs:
            if (!ref) continue;
            
            
            
            // Update the new value:
            if (typeof ref === 'function') {
                // Invoke callback ref and capture any returned cleanup function:
                // - React 19+ allows callback refs to return a cleanup function.
                const maybeCleanup = ref(value);
                
                
                
                if (typeof maybeCleanup === 'function') {
                    // Modern React 19+ Cleanup Behavior:
                    scheduledCleanups.push(maybeCleanup);
                }
                else {
                    // Legacy Fallback Behavior (React 17/18):
                    // - Ensure ref(null) is called on unmount.
                    scheduledCleanups.push(() => {
                        ref(null);
                    });
                } // if
            }
            else {
                // Assign value to mutable object ref:
                ref.current = value;
                
                
                
                // Wipes out mutable object ref values on unmount:
                scheduledCleanups.push(() => {
                    ref.current = null;
                });
            } // if
        } // for
        
        
        
        // Return a master cleanup if any were collected:
        if (scheduledCleanups.length > 0) {
            return () => {
                for (const cleanup of scheduledCleanups) {
                    cleanup();
                } // for
            };
        } // if
    });
};
