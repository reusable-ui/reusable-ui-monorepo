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
}                           from './css-types.js'



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
        radiusNone   : '0rem'       as CssBorderRadius,
        
        /**
         * Extra small radius.
         */
        radiusXs     : '0.125rem'   as CssBorderRadius,
        
        /**
         * Small radius.
         */
        radiusSm     : '0.25rem'    as CssBorderRadius,
        
        /**
         * Medium radius.
         */
        radiusMd     : '0.375rem'   as CssBorderRadius,
        
        /**
         * Large radius.
         */
        radiusLg     : '0.5rem'     as CssBorderRadius,
        
        /**
         * Extra large radius.
         */
        radiusXl     : '1rem'       as CssBorderRadius,
        
        /**
         * Extra extra large radius.
         */
        radiusXxl    : '2rem'       as CssBorderRadius,
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
        radiusPill   : '50rem'      as CssBorderRadius,
        
        /**
         * Circle/oval shape (percentage-based rounding).
         */
        radiusCircle : '50%'        as CssBorderRadius,
    };
    
    
    
    // Default radiuses:
    
    /**
     * Default radiuses applied across components.
     */
    const defaultRadiuses = {
        /**
         * Standard radius.
         */
        radius       : fixedRadiuses.radiusMd   as CssBorderRadius,
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
 * const value = radiusConfigVars.radiusPill; // Resolves to "var(--r-radiusPill)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * radiusConfigVars.myRadius = "10px"; // Generates "--r-myRadius: 10px;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * radiusConfigVars.myDefinition = [[
 *    "clamp(", radiusConfigVars.radiusSm, ", ", "0.25%", ", ", radiusConfigVars.radiusLg, ")"
 * ]]; // Generates "--r-myDefinition: clamp(var(--r-radiusSm), 0.25%, var(--r-radiusLg));"
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
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for radius-related definitions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --r-radius: var(--r-radiusMd);
 *     --r-radiusNone: 0rem;
 *     --r-radiusXs: 0.125rem;
 *     --r-radiusSm: 0.25rem;
 *     --r-radiusMd: 0.375rem;
 *     ............
 *     --r-radiusPill: 50rem;
 *     --r-radiusCircle: 50%;
 *     --r-myRadius: 10px;
 *     --r-myDefinition: clamp(var(--r-radiusSm), 0.25%, var(--r-radiusLg));
 * }
 * ```
 */
export const radiusConfigVars       = config[0];

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
 * const definition = radiusConfigVarDefs.myDefinition; // Resolves to [[ "clamp(", radiusConfigVars.radiusSm, ", ", "0.25%", ", ", radiusConfigVars.radiusLg, ")" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * radiusConfigVarDefs.myRadius = "10px"; // Generates "--r-myRadius: 10px;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * radiusConfigVarDefs.myDefinition = [[
 *    "clamp(", radiusConfigVars.radiusSm, ", ", "0.25%", ", ", radiusConfigVars.radiusLg, ")"
 * ]]; // Generates "--r-myDefinition: clamp(var(--r-radiusSm), 0.25%, var(--r-radiusLg));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete radiusConfigVarDefs.myRadius;
 * radiusConfigVarDefs.myRadius = null;
 * radiusConfigVarDefs.myRadius = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for radius-related definitions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --r-radius: var(--r-radiusMd);
 *     --r-radiusNone: 0rem;
 *     --r-radiusXs: 0.125rem;
 *     --r-radiusSm: 0.25rem;
 *     --r-radiusMd: 0.375rem;
 *     ............
 *     --r-radiusPill: 50rem;
 *     --r-radiusCircle: 50%;
 *     --r-myRadius: 10px;
 *     --r-myDefinition: clamp(var(--r-radiusSm), 0.25%, var(--r-radiusLg));
 * }
 * ```
 */
export const radiusConfigVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for radius system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all radius variables.
 * ```ts
 * radiusConfigVarOptions.prefix = 'r';
 * ```
 * - **Selector Scope:**  
 * Ensures all radius variables are declared inside `:root`.
 * ```ts
 * radiusConfigVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * radiusConfigVarOptions.onChange.subscribe({
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
 *     --r-radius: var(--r-radiusMd);
 *     --r-radiusNone: 0rem;
 *     --r-radiusXs: 0.125rem;
 *     --r-radiusSm: 0.25rem;
 *     --r-radiusMd: 0.375rem;
 *     ............
 *     --r-radiusPill: 50rem;
 *     --r-radiusCircle: 50%;
 * }
 * ```
 */
export const radiusConfigVarOptions = config[2];



export {
    radiusConfigVars as default, // Default export for simplified imports.
}
