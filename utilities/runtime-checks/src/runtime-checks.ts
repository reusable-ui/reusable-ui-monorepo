// Other libs:
import {
    // Flags:
    isBrowser,
    isJsDom,
}                           from 'is-in-browser'        // Detects browser and JSDOM environment



// Flags:

/**
 * Determines whether the code is running on the client side.
 * 
 * - Checks if execution is in a browser (`window` exists).
 * - Detects JSDOM (used in testing environments).
 * - Ensures correct runtime determination, beyond simple `typeof window !== 'undefined'`.
 */
export const isClientSide : boolean = isBrowser || isJsDom;
