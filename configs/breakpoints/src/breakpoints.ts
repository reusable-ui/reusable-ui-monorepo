// Cssfn:
import {
    // Reads/writes css variables configuration:
    type CssConfigProps,
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssBreakpoint,
}                           from './types.js'



// Configs:

interface BreakpointConfig extends CssConfigProps {}
const config = cssConfig<BreakpointConfig>(() => {
    return {
        xs   :    '0px'     as CssBreakpoint,
        sm   :  '576px'     as CssBreakpoint,
        md   :  '768px'     as CssBreakpoint,
        lg   :  '992px'     as CssBreakpoint,
        xl   : '1200px'     as CssBreakpoint,
        xxl  : '1400px'     as CssBreakpoint,
        xxxl : '1600px'     as CssBreakpoint,
    };
}, { prefix: 'brp' });

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
 * const value = breakpointVars.lg; // Resolves to "var(--brp-lg)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * breakpointVars.customBreakpoint = "2560px"; // Generates "--brp-customBreakpoint: 2560px;"
 * ```
 * 
 * **Expression Assignment:**
 * ❌ **Not supported** for breakpoint values.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete breakpointVars.customBreakpoint;
 * breakpointVars.customBreakpoint = null;
 * breakpointVars.customBreakpoint = undefined;
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
export const breakpointVars        = config[0];

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
 * const expression = breakpointExpressions.lg; // Resolves to "992px"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * breakpointExpressions.customBreakpoint = "2560px"; // Generates "--brp-customBreakpoint: 2560px;"
 * ```
 * 
 * **Expression Assignment:**
 * ❌ **Not supported** for breakpoint values.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete breakpointExpressions.customBreakpoint;
 * breakpointExpressions.customBreakpoint = null;
 * breakpointExpressions.customBreakpoint = undefined;
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
export const breakpointExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for breakpoint system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all breakpoint variables.
 * ```ts
 * breakpointConfig.prefix = 'brp';
 * ```
 * - **Selector Scope:**  
 * Ensures all breakpoint variables are declared inside `:root`.
 * ```ts
 * breakpointConfig.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * breakpointConfig.onChange.subscribe({
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
export const breakpointConfig    = config[2];



export {
    breakpointVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `breakpointVars` instead.
 */
export const breakpoints         = breakpointVars;

/**
 * @deprecated Use `breakpointExpressions` instead.
 */
export const breakpointValues    = breakpointExpressions;

/**
 * @deprecated Use `breakpointConfig` instead.
 */
export const cssBreakpointConfig = breakpointConfig;
