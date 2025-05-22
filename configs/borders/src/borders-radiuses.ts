// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssBorderRadius,
}                           from './types.js'



// Configs:

const config = cssConfig(() => {
    // Fixed radiuses:
    
    /**
     * Fixed border radiuses with predefined sizes.
     * Useful for creating consistent rounded corners across components.
     */
    const fixedRadiuses = {
        /**
         * Square corners (no rounding).
         */
        none    : '0rem'            as CssBorderRadius,
        
        /**
         * Extra small radius.
         */
        xs      : '0.125rem'        as CssBorderRadius,
        
        /**
         * Small radius.
         */
        sm      : '0.25rem'         as CssBorderRadius,
        
        /**
         * Medium radius.
         */
        md      : '0.375rem'        as CssBorderRadius,
        
        /**
         * Large radius.
         */
        lg      : '0.5rem'          as CssBorderRadius,
        
        /**
         * Extra large radius.
         */
        xl      : '1rem'            as CssBorderRadius,
        
        /**
         * Extra extra large radius.
         */
        xxl     : '2rem'            as CssBorderRadius,
    };
    
    
    
    // Relative radiuses:
    
    /**
     * Relative border radiuses based on dynamic scaling.
     * Ideal for pill-shaped or circular components.
     */
    const relativeRadiuses = {
        /**
         * Pill shape (maximum rounding).
         */
        pill    : '50rem'           as CssBorderRadius,
        
        /**
         * Circle/oval shape (percentage-based rounding).
         */
        circle  : '50%'             as CssBorderRadius,
    };
    
    
    
    // Default radiuses:
    
    /**
     * Default border radiuses setting.
     */
    const defaultRadiuses = {
        /**
         * Standard border radius.
         */
        default : fixedRadiuses.md  as CssBorderRadius,
    };
    
    
    
    // Merge all radiuses definitions:
    return {
        ...fixedRadiuses,
        ...relativeRadiuses,
        ...defaultRadiuses,
    };
}, { prefix: 'bor-r' });

/**
 * A `Refs<>` object represents CSS variables mapped to a **border radius system**, allowing dynamic adjustments through JavaScript.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Variable (Getter)**
 * Access the CSS variable reference:
 * ```ts
 * const value = borderRadiusVars.blue; // Resolves to "var(--bor-r-blue)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * borderRadiusVars.myRadius = "10px"; // Generates "--bor-r-myRadius: 10px;"
 * ```
 * **Expression Assignment:**
 * ```ts
 * borderRadiusVars.myExpression = [[
 *    "clamp(", borderRadiusVars.sm, ", ", "0.25%", ", ", borderRadiusVars.lg, ")"
 * ]]; // Generates "--bor-r-myExpression: clamp(var(--bor-r-sm), 0.25%, var(--bor-r-lg));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete borderRadiusVars.myRadius;
 * borderRadiusVars.myRadius = null;
 * borderRadiusVars.myRadius = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for border-radius-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --bor-r-none: 0rem;
 *     --bor-r-xs: 0.125rem;
 *     --bor-r-sm: 0.25rem;
 *     --bor-r-md: 0.375rem;
 *     ............
 *     --bor-r-pill: 50rem;
 *     --bor-r-circle: 50%;
 *     --bor-r-default: var(--bor-r-md);
 *     --bor-r-myRadius: 10px;
 *     --bor-r-myExpression: clamp(var(--bor-r-sm), 0.25%, var(--bor-r-lg));
 * }
 * ```
 */
export const borderRadiusVars        = config[0];

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
 * const expression = borderRadiusExpressions.myExpression; // Resolves to [[ "clamp(", borderRadiusVars.sm, ", ", "0.25%", ", ", borderRadiusVars.lg, ")" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * borderRadiusExpressions.myRadius = "10px"; // Generates "--bor-r-myRadius: 10px;"
 * ```
 * **Expression Assignment:**
 * ```ts
 * borderRadiusExpressions.myExpression = [[
 *    "clamp(", borderRadiusVars.sm, ", ", "0.25%", ", ", borderRadiusVars.lg, ")"
 * ]]; // Generates "--bor-r-myExpression: clamp(var(--bor-r-sm), 0.25%, var(--bor-r-lg));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete borderRadiusExpressions.myRadius;
 * borderRadiusExpressions.myRadius = null;
 * borderRadiusExpressions.myRadius = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for border-radius-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --bor-r-none: 0rem;
 *     --bor-r-xs: 0.125rem;
 *     --bor-r-sm: 0.25rem;
 *     --bor-r-md: 0.375rem;
 *     ............
 *     --bor-r-pill: 50rem;
 *     --bor-r-circle: 50%;
 *     --bor-r-default: var(--bor-r-md);
 *     --bor-r-myRadius: 10px;
 *     --bor-r-myExpression: clamp(var(--bor-r-sm), 0.25%, var(--bor-r-lg));
 * }
 * ```
 */
export const borderRadiusExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages settings related to **CSS variables for border radius system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all border radius variables.
 * ```ts
 * borderRadiusSettings.prefix = 'bor-r';
 * ```
 * - **Selector Scope:**  
 * Ensures all border radius variables are declared inside `:root`.
 * ```ts
 * borderRadiusSettings.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * borderRadiusSettings.onChange.subscribe({
 *     next: () => {
 *         console.log("Border radius system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --bor-r-none: 0rem;
 *     --bor-r-xs: 0.125rem;
 *     --bor-r-sm: 0.25rem;
 *     --bor-r-md: 0.375rem;
 *     ............
 *     --bor-r-pill: 50rem;
 *     --bor-r-circle: 50%;
 *     --bor-r-default: var(--bor-r-md);
 * }
 * ```
 */
export const borderRadiusSettings    = config[2];



export {
    borderRadiusVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `borderRadiusVars` instead.
 */
export const radiuses              = borderRadiusVars;

/**
 * @deprecated Use `borderRadiusExpressions` instead.
 */
export const radiusValues          = borderRadiusExpressions;

/**
 * @deprecated Use `borderRadiusSettings` instead.
 */
export const borderRadiusConfig    = borderRadiusSettings;

/**
 * @deprecated Use `borderRadiusSettings` instead.
 */
export const cssBorderRadiusConfig = borderRadiusSettings;
