// React:
import {
    // Types:
    type RefObject,
    
    
    
    // Hooks:
    type useLayoutEffect,
}                           from 'react'

// Utilities:
import {
    // Hooks:
    useIsomorphicLayoutEffect as importedUseIsomorphicLayoutEffect,
    useTriggerRender          as importedUseTriggerRender,
    useMountedFlag            as importedUseMountedFlag,
}                           from '@reusable-ui/lifecycles'      // A React utility package for managing component lifecycles, ensuring stable effects, and optimizing state updates.



/**
 * @deprecated - Use `useIsomorphicLayoutEffect` from '@reusable-ui/lifecycles' instead.
 * 
 * A React hook that intelligently switches between `useLayoutEffect` and a no-op function
 * based on the execution environment.
 * 
 * - **Client-side:** Uses `useLayoutEffect` for synchronous updates before paint.
 * - **Server-side:** Falls back to a no-op function to prevent execution during SSR.
 * - Useful for effects that **must run before visual updates** without causing hydration mismatches.
 * 
 * @example
 * ```ts
 * useIsomorphicLayoutEffect(() => {
 *     console.log('This effect runs before paint on the client.');
 * }, []);
 * ```
 */
export const useIsomorphicLayoutEffect : typeof useLayoutEffect = importedUseIsomorphicLayoutEffect;



/**
 * @deprecated - Use `useTriggerRender` from '@reusable-ui/lifecycles' instead.
 * 
 * Custom React hook to manually trigger a component re-render.
 * 
 * - Ensures the trigger function maintains a **stable reference** across renders.
 * - Useful for manually refreshing components without modifying state.
 * 
 * @returns {[DispatchWithoutAction, symbol]} A tuple containing:
 *   - A `triggerRender` function that forces a re-render while maintaining a stable reference across renders.
 *   - The latest **unique state identifier** (`Symbol`) that updates on each trigger.
 * 
 * @example
 * ```ts
 * const [triggerRender, stateStamp] = useTriggerRender();
 * 
 * // Force a re-render of the component:
 * triggerRender();
 * ```
 */
export const useTriggerRender = importedUseTriggerRender;



/**
 * @deprecated - Use `useMountedFlag` from '@reusable-ui/lifecycles' instead.
 * 
 * Tracks the mounted status of a React component.
 * 
 * - `undefined`: The component has never been mounted.
 * - `true`: The component is currently mounted.
 * - `false`: The component has been unmounted.
 *
 * @returns {RefObject<boolean | undefined>} A ref indicating the mounted status.
 * 
 * @example
 * ```ts
 * const isMounted = useMountedFlag();
 * useEffect(() => {
 *     if (isMounted.current) {
 *         console.log('Component is mounted.');
 *     }
 * }, []);
 * ```
 */
export const useMountedFlag = (): RefObject<boolean | undefined> => importedUseMountedFlag();
