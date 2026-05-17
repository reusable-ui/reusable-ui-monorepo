// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultBreakpointConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type CssBreakpoint,
}                           from './types.js'



// Configs:

const config = cssConfig(() => {
    return {
        xs   :    '0px'     as CssBreakpoint,
        sm   :  '576px'     as CssBreakpoint,
        md   :  '768px'     as CssBreakpoint,
        lg   :  '992px'     as CssBreakpoint,
        xl   : '1200px'     as CssBreakpoint,
        xxl  : '1400px'     as CssBreakpoint,
        xxxl : '1600px'     as CssBreakpoint,
    };
}, { prefix: defaultBreakpointConfigPrefix });

/**
 * A `Refs<>` object represents CSS variables mapped to a **breakpoint system**, allowing dynamic adjustments through JavaScript.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Variable (Getter)**
 * Access the CSS variable reference:
 * ```ts
 * const value = breakpointConfigVars.lg; // Resolves to "var(--brp-lg)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * breakpointConfigVars.customBreakpoint = "2560px"; // Generates "--brp-customBreakpoint: 2560px;"
 * ```
 * 
 * **Expression Assignment:**
 * ❌ **Not supported** for breakpoint values.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete breakpointConfigVars.customBreakpoint;
 * breakpointConfigVars.customBreakpoint = null;
 * breakpointConfigVars.customBreakpoint = undefined;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --brp-xs: 0px;
 *     --brp-sm: 576px;
 *     --brp-md: 768px;
 *     --brp-lg: 992px;
 *     --brp-xl: 1200px;
 *     --brp-xxl: 1400px;
 *     --brp-xxxl: 1600px;
 *     --brp-customBreakpoint: 2560px;
 * }
 * ```
 */
export const breakpointConfigVars        = config[0];

/**
 * A `Vals<>` object represents **structured CSS expressions**, allowing direct retrieval and modification.
 * These values are **not precomputed** but instead represent formula-driven expressions.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Expression (Getter)**
 * Access the assembled CSS expression:  
 * ```ts
 * const expression = breakpointConfigExpressions.lg; // Resolves to "992px"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * breakpointConfigExpressions.customBreakpoint = "2560px"; // Generates "--brp-customBreakpoint: 2560px;"
 * ```
 * 
 * **Expression Assignment:**
 * ❌ **Not supported** for breakpoint values.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete breakpointConfigExpressions.customBreakpoint;
 * breakpointConfigExpressions.customBreakpoint = null;
 * breakpointConfigExpressions.customBreakpoint = undefined;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --brp-xs: 0px;
 *     --brp-sm: 576px;
 *     --brp-md: 768px;
 *     --brp-lg: 992px;
 *     --brp-xl: 1200px;
 *     --brp-xxl: 1400px;
 *     --brp-xxxl: 1600px;
 *     --brp-customBreakpoint: 2560px;
 * }
 * ```
 */
export const breakpointConfigExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for breakpoint system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all breakpoint variables.
 * ```ts
 * breakpointConfigOptions.prefix = 'brp';
 * ```
 * - **Selector Scope:**  
 * Ensures all breakpoint variables are declared inside `:root`.
 * ```ts
 * breakpointConfigOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * breakpointConfigOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Breakpoint system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --brp-xs: 0px;
 *     --brp-sm: 576px;
 *     --brp-md: 768px;
 *     --brp-lg: 992px;
 *     --brp-xl: 1200px;
 *     --brp-xxl: 1400px;
 *     --brp-xxxl: 1600px;
 * }
 * ```
 */
export const breakpointConfigOptions     = config[2];



export {
    breakpointConfigVars as default, // Default export for simplified imports.
}
