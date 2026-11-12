// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultBorderConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type CssBorderWidth,
    type CssBorderColor,
    type CssBorderStyle,
    type CssBorder,
}                           from './css-types.js'



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
         * Hairline border.
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
    
    
    
    // Default borders:
    
    /**
     * Default border applied across components.
     */
    const defaultBorders = {
        /**
         * Default border width.
         */
        defaultWidth : borderWidths.hair    as CssBorderWidth,
        
        /**
         * Default border style.
         */
        defaultStyle : 'solid'              as CssBorderStyle,
        
        /**
         * Default border color.
         */
        defaultColor : 'currentColor'       as CssBorderColor,
    };
    
    /**
     * Default border shorthands.
     */
    const defaultBorderShorthands = {
        /**
         * Default border (width + style + color).
         */
        default      : [[ defaultBorders.defaultWidth, defaultBorders.defaultStyle, defaultBorders.defaultColor ]]   as CssBorder,
    };
    
    
    
    // Merge all border definitions:
    return {
        ...borderWidths,
        ...defaultBorders,
        ...defaultBorderShorthands,
    };
}, { prefix: defaultBorderConfigPrefix });

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
 * const value = borderConfigVars.default; // Resolves to "var(--bor-default)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * borderConfigVars.myBorder = "10px"; // Generates "--bor-myBorder: 10px;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * borderConfigVars.myDefinition = [[
 *    "clamp(", borderConfigVars.thin, ", ", "0.25%", ", ", borderConfigVars.bold, ")"
 * ]]; // Generates "--bor-myDefinition: clamp(var(--bor-thin), 0.25%, var(--bor-bold));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete borderConfigVars.myBorder;
 * borderConfigVars.myBorder = null;
 * borderConfigVars.myBorder = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for border-related definitions.
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
 *     --bor-myDefinition: clamp(var(--bor-thin), 0.25%, var(--bor-bold));
 * }
 * ```
 */
export const borderConfigVars       = config[0];

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
 * const definition = borderConfigVarDefs.myDefinition; // Resolves to [[ "clamp(", borderConfigVars.thin, ", ", "0.25%", ", ", borderConfigVars.bold, ")" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * borderConfigVarDefs.myBorder = "10px"; // Generates "--bor-myBorder: 10px;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * borderConfigVarDefs.myDefinition = [[
 *    "clamp(", borderConfigVars.thin, ", ", "0.25%", ", ", borderConfigVars.bold, ")"
 * ]]; // Generates "--bor-myDefinition: clamp(var(--bor-thin), 0.25%, var(--bor-bold));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete borderConfigVarDefs.myBorder;
 * borderConfigVarDefs.myBorder = null;
 * borderConfigVarDefs.myBorder = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for border-related definitions.
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
 *     --bor-myDefinition: clamp(var(--bor-thin), 0.25%, var(--bor-bold));
 * }
 * ```
 */
export const borderConfigVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for border system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all border variables.
 * ```ts
 * borderConfigVarOptions.prefix = 'bor';
 * ```
 * - **Selector Scope:**  
 * Ensures all border variables are declared inside `:root`.
 * ```ts
 * borderConfigVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * borderConfigVarOptions.onChange.subscribe({
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
export const borderConfigVarOptions = config[2];



export {
    borderConfigVars as default, // Default export for simplified imports.
}
