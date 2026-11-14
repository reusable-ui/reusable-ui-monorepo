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
}                           from './css-types.js'



// Configs:

const config = cssConfig(() => {
    return {
        breakpointXs   :    '0px'   as CssBreakpoint,
        breakpointSm   :  '576px'   as CssBreakpoint,
        breakpointMd   :  '768px'   as CssBreakpoint,
        breakpointLg   :  '992px'   as CssBreakpoint,
        breakpointXl   : '1200px'   as CssBreakpoint,
        breakpointXxl  : '1400px'   as CssBreakpoint,
        breakpointXxxl : '1600px'   as CssBreakpoint,
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
 * const value = breakpointConfigVars.breakpointLg; // Resolves to "var(--brp-breakpointLg)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * breakpointConfigVars.breakpointUltrawide = "2560px"; // Generates "--brp-breakpointUltrawide: 2560px;"
 * ```
 * 
 * **Definition Assignment:**
 * ❌ **Not supported** for breakpoint values.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete breakpointConfigVars.breakpointUltrawide;
 * breakpointConfigVars.breakpointUltrawide = null;
 * breakpointConfigVars.breakpointUltrawide = undefined;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --brp-breakpointXs: 0px;
 *     --brp-breakpointSm: 576px;
 *     --brp-breakpointMd: 768px;
 *     --brp-breakpointLg: 992px;
 *     --brp-breakpointXl: 1200px;
 *     --brp-breakpointXxl: 1400px;
 *     --brp-breakpointXxxl: 1600px;
 *     --brp-breakpointUltrawide: 2560px;
 * }
 * ```
 */
export const breakpointConfigVars       = config[0];

/**
 * A `Vals<>` object represents **structured CSS definitions**, allowing direct retrieval and modification.
 * These values are **not precomputed** but instead represent formula-driven definitions.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Definition (Getter)**
 * Access the assembled CSS definition:  
 * ```ts
 * const definition = breakpointConfigVarDefs.breakpointLg; // Resolves to "992px"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * breakpointConfigVarDefs.breakpointUltrawide = "2560px"; // Generates "--brp-breakpointUltrawide: 2560px;"
 * ```
 * 
 * **Definition Assignment:**
 * ❌ **Not supported** for breakpoint values.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete breakpointConfigVarDefs.breakpointUltrawide;
 * breakpointConfigVarDefs.breakpointUltrawide = null;
 * breakpointConfigVarDefs.breakpointUltrawide = undefined;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --brp-breakpointXs: 0px;
 *     --brp-breakpointSm: 576px;
 *     --brp-breakpointMd: 768px;
 *     --brp-breakpointLg: 992px;
 *     --brp-breakpointXl: 1200px;
 *     --brp-breakpointXxl: 1400px;
 *     --brp-breakpointXxxl: 1600px;
 *     --brp-breakpointUltrawide: 2560px;
 * }
 * ```
 */
export const breakpointConfigVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for breakpoint system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all breakpoint variables.
 * ```ts
 * breakpointConfigVarOptions.prefix = 'brp';
 * ```
 * - **Selector Scope:**  
 * Ensures all breakpoint variables are declared inside `:root`.
 * ```ts
 * breakpointConfigVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * breakpointConfigVarOptions.onChange.subscribe({
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
 *     --brp-breakpointXs: 0px;
 *     --brp-breakpointSm: 576px;
 *     --brp-breakpointMd: 768px;
 *     --brp-breakpointLg: 992px;
 *     --brp-breakpointXl: 1200px;
 *     --brp-breakpointXxl: 1400px;
 *     --brp-breakpointXxxl: 1600px;
 * }
 * ```
 */
export const breakpointConfigVarOptions = config[2];



export {
    breakpointConfigVars as default, // Default export for simplified imports.
}
