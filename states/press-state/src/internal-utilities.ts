// Types:
import {
    type PressPhase,
}                           from './types.js'



/**
 * Resolves the current press/release lifecycle phase based on press state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'pressing'` or `'releasing'`
 * - Otherwise, returns the settled phase:
 *   - `'pressed'` or `'released'`
 * 
 * @param settledPressed - The currently settled (laggy) press state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `PressPhase` value.
 */
export const resolvePressPhase = (settledPressed: boolean, isTransitioning: boolean): PressPhase => {
    if (isTransitioning) {
        return settledPressed ? 'pressing' : 'releasing';
    } // if
    
    
    
    return settledPressed ? 'pressed' : 'released';
};



/**
 * Resolves the CSS class name for the given press/release lifecycle phase.
 * 
 * Maps each `pressPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'pressed'`   → `'is-pressed'`
 *   - `'released'`  → `'is-released'`
 * 
 * - Transitioning phases:
 *   - `'pressing'`  → `'is-pressing'`
 *   - `'releasing'` → `'is-releasing'`
 * 
 * @param pressPhase - The current lifecycle phase of the component.
 * @returns A CSS class name reflecting the phase.
 */
export const getPressClassname = (pressPhase: PressPhase): `is-${PressPhase}` => {
    // Return the corresponding class name:
    return `is-${pressPhase}`;
};



/**
 * Determines whether a given keyCode matches the expected keyCode(s).
 * 
 * @param actualKey - The keyCode received from a keyboard event (e.g. event.code)
 * @param expectedKeys - A string or array of strings representing the keyCode(s) to match against
 * @returns `true` if the actual keyCode matches any of the expected keyCode(s); otherwise `false`
 */
export const matchesKey = (actualKey: string | undefined, expectedKeys: string | string[] | null): boolean => {
    if (!actualKey) return false;
    if (!expectedKeys) return false;
    
    
    
    if (typeof expectedKeys === 'string') return actualKey === expectedKeys;
    return expectedKeys.includes(actualKey);
};

/**
 * Determines whether the given pointer button matches the expected button(s).
 * 
 * @param actualButton - The button value received from a pointer event (e.g. `event.button`)
 * @param expectedButtons - A number or array of numbers representing the buttons to match against
 * @returns `true` if the actual button matches any of the expected buttons; otherwise `false`
 */
export const matchesButton = (actualButton: number, expectedButtons: number | number[] | null): boolean => {
    // Validate parameters:
    if (expectedButtons === null) return false;
    
    
    
    // Test matches:
    if (Array.isArray(expectedButtons)) return expectedButtons.includes(actualButton);
    return (actualButton === expectedButtons);
};
