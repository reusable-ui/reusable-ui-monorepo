// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssBorderWidth,
    type CssBorderColor,
    type CssBorderStyle,
    type CssBorder,
}                           from './types.js'



// Configs:

const config = cssConfig(() => {
    // Border widths:
    
    /**
     * Predefined border widths for consistent styling.
     * Used to define thickness levels across components.
     */
    const borderWidths = {
        /**
         * No border.
         */
        none    : '0px'             as CssBorderWidth,
        
        /**
         * Ultra-thin border.
         */
        hair    : '1px'             as CssBorderWidth,
        
        /**
         * Thin border.
         */
        thin    : '2px'             as CssBorderWidth,
        
        /**
         * Bold border.
         */
        bold    : '4px'             as CssBorderWidth,
    };
    
    
    
    // Border styles:
    
    /**
     * Border styling properties.
     * Defines color and type of border rendering.
     */
    const borderStyles = {
        /**
         * The color of border.
         */
        color   : 'currentColor'    as CssBorderColor,
        
        /**
         * The styling of border.
         */
        style   : 'solid'           as CssBorderStyle,
    };
    
    
    
    // Default borders:
    
    /**
     * Default border settings applied across components.
     */
    const defaultBorders = {
        /**
         * Standard border width.
         */
        defaultWidth : borderWidths.hair                                                as CssBorderWidth,
        
        /**
         * Full default border definition.
         */
        default      : [[ borderStyles.style, borderWidths.hair, borderStyles.color ]]  as CssBorder,
    };
    
    
    
    // Merge all border definitions:
    return {
        ...borderWidths,
        ...borderStyles,
        ...defaultBorders,
    };
}, { prefix: 'bor' });

/**
 * A `Refs<>` object represents CSS variables mapped to a **border system**, allowing dynamic adjustments through JavaScript.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Variable (Getter)**
 * Access the CSS variable reference:
 * ```ts
 * const value = borderVars.default; // Resolves to "var(--bor-style) var(--bor-hair) var(--bor-color)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * borderVars.myBorder = "10px"; // Generates "--bor-myBorder: 10px;"
 * ```
 * **Expression Assignment:**
 * ```ts
 * borderVars.myExpression = [[
 *    "clamp(", borderVars.sm, ", ", "0.25%", ", ", borderVars.lg, ")"
 * ]]; // Generates "--bor-myExpression: clamp(var(--bor-sm), 0.25%, var(--bor-lg));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete borderVars.myBorder;
 * borderVars.myBorder = null;
 * borderVars.myBorder = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for border-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --bor-none: 0px;
 *     --bor-hair: 1px;
 *     --bor-thin: 2px;
 *     --bor-bold: 4px;
 *     --bor-color: currentColor;
 *     --bor-style: solid;
 *     --bor-defaultWidth: var(--bor-hair);
 *     --bor-default: var(--bor-style) var(--bor-hair) var(--bor-color);
 *     --bor-myBorder: 10px;
 *     --bor-myExpression: clamp(var(--bor-sm), 0.25%, var(--bor-lg));
 * }
 * ```
 */
export const borderVars        = config[0];

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
 * const expression = borderExpressions.myExpression; // Resolves to [[ "clamp(", borderVars.sm, ", ", "0.25%", ", ", borderVars.lg, ")" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * borderExpressions.myBorder = "10px"; // Generates "--bor-myBorder: 10px;"
 * ```
 * **Expression Assignment:**
 * ```ts
 * borderExpressions.myExpression = [[
 *    "clamp(", borderVars.sm, ", ", "0.25%", ", ", borderVars.lg, ")"
 * ]]; // Generates "--bor-myExpression: clamp(var(--bor-sm), 0.25%, var(--bor-lg));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete borderExpressions.myBorder;
 * borderExpressions.myBorder = null;
 * borderExpressions.myBorder = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for border-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --bor-none: 0px;
 *     --bor-hair: 1px;
 *     --bor-thin: 2px;
 *     --bor-bold: 4px;
 *     --bor-color: currentColor;
 *     --bor-style: solid;
 *     --bor-defaultWidth: var(--bor-hair);
 *     --bor-default: var(--bor-style) var(--bor-hair) var(--bor-color);
 *     --bor-myBorder: 10px;
 *     --bor-myExpression: clamp(var(--bor-sm), 0.25%, var(--bor-lg));
 * }
 * ```
 */
export const borderExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages settings related to **CSS variables for border system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all border variables.
 * ```ts
 * borderSettings.prefix = 'bor';
 * ```
 * - **Selector Scope:**  
 * Ensures all border variables are declared inside `:root`.
 * ```ts
 * borderSettings.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * borderSettings.onChange.subscribe({
 *     next: () => {
 *         console.log("Border system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --bor-none: 0px;
 *     --bor-hair: 1px;
 *     --bor-thin: 2px;
 *     --bor-bold: 4px;
 *     --bor-color: currentColor;
 *     --bor-style: solid;
 *     --bor-defaultWidth: var(--bor-hair);
 *     --bor-default: var(--bor-style) var(--bor-hair) var(--bor-color);
 * }
 * ```
 */
export const borderSettings    = config[2];



export {
    borderVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `borderVars` instead.
 */
export const borders         = borderVars;

/**
 * @deprecated Use `borderExpressions` instead.
 */
export const borderValues    = borderExpressions;

/**
 * @deprecated Use `borderSettings` instead.
 */
export const borderConfig    = borderSettings;

/**
 * @deprecated Use `borderSettings` instead.
 */
export const cssBorderConfig = borderSettings;
