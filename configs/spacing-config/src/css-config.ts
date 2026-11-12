// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultSpacingConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type CssLength,
}                           from './css-types.js'



// Configs:

const config = cssConfig(() => {
    // Static spacer widths:
    
    /**
     * Predefined spacer widths for consistent spacing across components.
     * Used to define margins, paddings, and gaps.
     */
    const staticSpacerWidths = {
        /**
         * No spacing.
         */
        spacingNone   : '0rem'  as CssLength,
        
        /**
         * Medium spacing.
         */
        spacingMd     : '1rem'  as CssLength,
    };
    
    
    
    // Computed spacer widths:
    
    /**
     * Dynamically calculated spacer widths based on `spacingMd` size.
     * Provides scaling options for finer control over spacing.
     */
    const computedSpacerWidths = {
        // Smaller than `spacingMd`:
        
        /**
         * Extra extra small spacing.
         */
        spacingXxs    : [[ 'calc(', staticSpacerWidths.spacingMd, '/', 8  , ')' ]]      as CssLength,
        
        /**
         * Extra small spacing.
         */
        spacingXs     : [[ 'calc(', staticSpacerWidths.spacingMd, '/', 4  , ')' ]]      as CssLength,
        
        /**
         * Semi extra small spacing.
         */
        spacingSemiXs : [[ 'calc(', staticSpacerWidths.spacingMd, '/', 3  , ')' ]]      as CssLength,
        
        /**
         * Small spacing.
         */
        spacingSm     : [[ 'calc(', staticSpacerWidths.spacingMd, '/', 2  , ')' ]]      as CssLength,
        
        /**
         * Semi small spacing.
         */
        spacingSemiSm : [[ 'calc(', staticSpacerWidths.spacingMd, '/', 1.5, ')' ]]      as CssLength,
        
        
        
        // Bigger than `spacingMd`:
        
        /**
         * Large spacing.
         */
        spacingLg     : [[ 'calc(', staticSpacerWidths.spacingMd, '*', 1.5, ')' ]]      as CssLength,
        
        /**
         * Extra large spacing.
         */
        spacingXl     : [[ 'calc(', staticSpacerWidths.spacingMd, '*', 3  , ')' ]]      as CssLength,
    };
    
    
    
    // Default spacers:
    
    /**
     * Default spacing applied across components.
     */
    const defaultSpacers = {
        /**
         * Standard spacing.
         */
        spacing       : staticSpacerWidths.spacingMd    as CssLength,
    };
    
    
    
    // Merge all spacer definitions:
    return {
        ...staticSpacerWidths,
        ...computedSpacerWidths,
        ...defaultSpacers,
    };
}, { prefix: defaultSpacingConfigPrefix });

/**
 * A `Refs<>` object represents CSS variables mapped to a **spacer system**, allowing dynamic adjustments through JavaScript.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Variable (Getter)**
 * Access the CSS variable reference:
 * ```ts
 * const value = spacingConfigVars.spacingLg; // Resolves to "var(--spc-spacingLg)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * spacingConfigVars.spacingCustom = "50px"; // Generates "--spc-spacingCustom: 50px;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * spacingConfigVars.myDefinition = [[
 *    "clamp(", spacingConfigVars.spacingXs, ", ", "0.25%", ", ", spacingConfigVars.spacingXl, ")"
 * ]]; // Generates "--spc-myDefinition: clamp(var(--spc-spacingXs), 0.25%, var(--spc-spacingXl));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete spacingConfigVars.spacingCustom;
 * spacingConfigVars.spacingCustom = null;
 * spacingConfigVars.spacingCustom = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for spacer-related definitions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --spc-spacing: var(--spc-spacingMd);
 *     --spc-spacingNone: 0rem;
 *     --spc-spacingXxs: calc(var(--spc-spacingMd) / 8);
 *     --spc-spacingXs: calc(var(--spc-spacingMd) / 4);
 *     --spc-spacingSemiXs: calc(var(--spc-spacingMd) / 3);
 *     --spc-spacingSm: calc(var(--spc-spacingMd) / 2);
 *     --spc-spacingSemiSm: calc(var(--spc-spacingMd) / 1.5);
 *     --spc-spacingMd: 1rem;
 *     --spc-spacingLg: calc(var(--spc-spacingMd) * 1.5);
 *     --spc-spacingXl: calc(var(--spc-spacingMd) * 3);
 *     --spc-spacingCustom: 50px;
 *     --spc-myDefinition: clamp(var(--spc-spacingXs), 0.25%, var(--spc-spacingXl));
 * }
 * ```
 */
export const spacingConfigVars       = config[0];

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
 * const definition = spacingConfigVarDefs.spacingLg; // Resolves to [[ "calc(", spacingConfigVars.spacingMd, " * 1.5)" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * spacingConfigVarDefs.spacingCustom = "50px"; // Generates "--spc-spacingCustom: 50px;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * spacingConfigVarDefs.myDefinition = [[
 *    "clamp(", spacingConfigVars.spacingXs, ", ", "0.25%", ", ", spacingConfigVars.spacingXl, ")"
 * ]]; // Generates "--spc-myDefinition: clamp(var(--spc-spacingXs), 0.25%, var(--spc-spacingXl));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete spacingConfigVarDefs.spacingCustom;
 * spacingConfigVarDefs.spacingCustom = null;
 * spacingConfigVarDefs.spacingCustom = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for spacer-related definitions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --spc-spacing: var(--spc-spacingMd);
 *     --spc-spacingNone: 0rem;
 *     --spc-spacingXxs: calc(var(--spc-spacingMd) / 8);
 *     --spc-spacingXs: calc(var(--spc-spacingMd) / 4);
 *     --spc-spacingSemiXs: calc(var(--spc-spacingMd) / 3);
 *     --spc-spacingSm: calc(var(--spc-spacingMd) / 2);
 *     --spc-spacingSemiSm: calc(var(--spc-spacingMd) / 1.5);
 *     --spc-spacingMd: 1rem;
 *     --spc-spacingLg: calc(var(--spc-spacingMd) * 1.5);
 *     --spc-spacingXl: calc(var(--spc-spacingMd) * 3);
 *     --spc-spacingCustom: 50px;
 *     --spc-myDefinition: clamp(var(--spc-spacingXs), 0.25%, var(--spc-spacingXl));
 * }
 * ```
 */
export const spacingConfigVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for spacer system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all spacer variables.
 * ```ts
 * spacingConfigVarOptions.prefix = 'spc';
 * ```
 * - **Selector Scope:**  
 * Ensures all spacer variables are declared inside `:root`.
 * ```ts
 * spacingConfigVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * spacingConfigVarOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Spacer system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --spc-spacing: var(--spc-spacingMd);
 *     --spc-spacingNone: 0rem;
 *     --spc-spacingXxs: calc(var(--spc-spacingMd) / 8);
 *     --spc-spacingXs: calc(var(--spc-spacingMd) / 4);
 *     --spc-spacingSemiXs: calc(var(--spc-spacingMd) / 3);
 *     --spc-spacingSm: calc(var(--spc-spacingMd) / 2);
 *     --spc-spacingSemiSm: calc(var(--spc-spacingMd) / 1.5);
 *     --spc-spacingMd: 1rem;
 *     --spc-spacingLg: calc(var(--spc-spacingMd) * 1.5);
 *     --spc-spacingXl: calc(var(--spc-spacingMd) * 3);
 * }
 * ```
 */
export const spacingConfigVarOptions = config[2];



export {
    spacingConfigVars as default, // Default export for simplified imports.
}
