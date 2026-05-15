// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultRadiusConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type CssBorderRadius,
}                           from './types.js'



// Configs:

const config = cssConfig(() => {
    // Fixed radiuses:
    
    /**
     * Fixed radiuses with predefined sizes.
     * Useful for maintaining consistent rounded corners across components.
     */
    const fixedRadiuses = {
        /**
         * Sharp corners (no rounding).
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
     * Relative radiuses based on dynamic scaling.
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
     * Default radiuses setting.
     */
    const defaultRadiuses = {
        /**
         * Standard radius.
         */
        default : fixedRadiuses.md  as CssBorderRadius,
    };
    
    
    
    // Merge all radius definitions:
    return {
        ...fixedRadiuses,
        ...relativeRadiuses,
        ...defaultRadiuses,
    };
}, { prefix: defaultRadiusConfigPrefix });

/**
 * A `Refs<>` object represents CSS variables mapped to a **radius system**, allowing dynamic adjustments through JavaScript.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Variable (Getter)**
 * Access the CSS variable reference:
 * ```ts
 * const value = radiusConfigVars.pill; // Resolves to "var(--r-pill)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * radiusConfigVars.myRadius = "10px"; // Generates "--r-myRadius: 10px;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * radiusConfigVars.myExpression = [[
 *    "clamp(", radiusConfigVars.sm, ", ", "0.25%", ", ", radiusConfigVars.lg, ")"
 * ]]; // Generates "--r-myExpression: clamp(var(--r-sm), 0.25%, var(--r-lg));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete radiusConfigVars.myRadius;
 * radiusConfigVars.myRadius = null;
 * radiusConfigVars.myRadius = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for radius-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --r-none: 0rem;
 *     --r-xs: 0.125rem;
 *     --r-sm: 0.25rem;
 *     --r-md: 0.375rem;
 *     ............
 *     --r-pill: 50rem;
 *     --r-circle: 50%;
 *     --r-default: var(--r-md);
 *     --r-myRadius: 10px;
 *     --r-myExpression: clamp(var(--r-sm), 0.25%, var(--r-lg));
 * }
 * ```
 */
export const radiusConfigVars        = config[0]; // eslint-disable-line css-variables/enforce-variable-conventions

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
 * const expression = radiusConfigExpressions.myExpression; // Resolves to [[ "clamp(", radiusConfigVars.sm, ", ", "0.25%", ", ", radiusConfigVars.lg, ")" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * radiusConfigExpressions.myRadius = "10px"; // Generates "--r-myRadius: 10px;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * radiusConfigExpressions.myExpression = [[
 *    "clamp(", radiusConfigVars.sm, ", ", "0.25%", ", ", radiusConfigVars.lg, ")"
 * ]]; // Generates "--r-myExpression: clamp(var(--r-sm), 0.25%, var(--r-lg));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete radiusConfigExpressions.myRadius;
 * radiusConfigExpressions.myRadius = null;
 * radiusConfigExpressions.myRadius = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for radius-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --r-none: 0rem;
 *     --r-xs: 0.125rem;
 *     --r-sm: 0.25rem;
 *     --r-md: 0.375rem;
 *     ............
 *     --r-pill: 50rem;
 *     --r-circle: 50%;
 *     --r-default: var(--r-md);
 *     --r-myRadius: 10px;
 *     --r-myExpression: clamp(var(--r-sm), 0.25%, var(--r-lg));
 * }
 * ```
 */
export const radiusConfigExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for radius system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all radius variables.
 * ```ts
 * radiusConfigOptions.prefix = 'r';
 * ```
 * - **Selector Scope:**  
 * Ensures all radius variables are declared inside `:root`.
 * ```ts
 * radiusConfigOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * radiusConfigOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Radius system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --r-none: 0rem;
 *     --r-xs: 0.125rem;
 *     --r-sm: 0.25rem;
 *     --r-md: 0.375rem;
 *     ............
 *     --r-pill: 50rem;
 *     --r-circle: 50%;
 *     --r-default: var(--r-md);
 * }
 * ```
 */
export const radiusConfigOptions     = config[2];



export {
    radiusConfigVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `radiusConfigVars` instead.
 */
export const radiuses              = radiusConfigVars;

/**
 * @deprecated Use `radiusConfigVars` instead.
 */
export const borderRadiuses        = radiusConfigVars;

/**
 * @deprecated Use `radiusConfigExpressions` instead.
 */
export const radiusValues          = radiusConfigExpressions;

/**
 * @deprecated Use `radiusConfigOptions` instead.
 */
export const cssBorderRadiusConfig = radiusConfigOptions;
