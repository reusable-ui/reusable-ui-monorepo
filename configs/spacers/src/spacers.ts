// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssLength,
}                           from './types.js'



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
        none    : '0rem'    as CssLength,
        
        /**
         * Medium spacing.
         */
        md      : '1rem'    as CssLength,
    };
    
    
    
    // Computed spacer widths:
    
    /**
     * Dynamically calculated spacer widths based on `md` size.
     * Provides scaling options for finer control over spacing.
     */
    const computedSpacerWidths = {
        // Smaller than `md`:
        
        /**
         * Extra extra small spacing.
         */
        xxs     : [[ 'calc(', staticSpacerWidths.md, '/', 8  , ')' ]]       as CssLength,
        
        /**
         * Extra small spacing.
         */
        xs      : [[ 'calc(', staticSpacerWidths.md, '/', 4  , ')' ]]       as CssLength,
        
        /**
         * Semi extra small spacing.
         */
        semiXs  : [[ 'calc(', staticSpacerWidths.md, '/', 3  , ')' ]]       as CssLength,
        
        /**
         * Small spacing.
         */
        sm      : [[ 'calc(', staticSpacerWidths.md, '/', 2  , ')' ]]       as CssLength,
        
        /**
         * Semi small spacing.
         */
        semiSm  : [[ 'calc(', staticSpacerWidths.md, '/', 1.5, ')' ]]       as CssLength,
        
        
        
        // Bigger than `md`:
        
        /**
         * Large spacing.
         */
        lg      : [[ 'calc(', staticSpacerWidths.md, '*', 1.5, ')' ]]       as CssLength,
        
        /**
         * Extra large spacing.
         */
        xl      : [[ 'calc(', staticSpacerWidths.md, '*', 3  , ')' ]]       as CssLength,
    };
    
    
    
    // Default spacers:
    
    /**
     * Default spacing applied across components.
     */
    const defaultSpacers = {
        /**
         * Standard spacing.
         */
        default : staticSpacerWidths.md       as CssLength,
    };
    
    
    
    // Merge all spacer definitions:
    return {
        ...staticSpacerWidths,
        ...computedSpacerWidths,
        ...defaultSpacers,
    };
}, { prefix: 'spc' });

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
 * const value = spacerVars.lg; // Resolves to "var(--spc-lg)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * spacerVars.customSpacer = "50px"; // Generates "--spc-customSpacer: 50px;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * spacerVars.myExpression = [[
 *    "clamp(", spacerVars.xs, ", ", "0.25%", ", ", spacerVars.xl, ")"
 * ]]; // Generates "--spc-myExpression: clamp(var(--spc-xs), 0.25%, var(--spc-xl));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete spacerVars.customSpacer;
 * spacerVars.customSpacer = null;
 * spacerVars.customSpacer = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for spacer-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --spc-none: 0rem;
 *     --spc-md: 1rem;
 *     --spc-xxs: calc(var(--spc-md) / 8);
 *     --spc-xs: calc(var(--spc-md) / 4);
 *     --spc-semiXs: calc(var(--spc-md) / 3);
 *     --spc-sm: calc(var(--spc-md) / 2);
 *     --spc-semiSm: calc(var(--spc-md) / 1.5);
 *     --spc-lg: calc(var(--spc-md) * 1.5);
 *     --spc-xl: calc(var(--spc-md) * 3);
 *     --spc-default: var(--spc-md);
 *     --spc-customSpacer: 50px;
 *     --spc-myExpression: clamp(var(--spc-xs), 0.25%, var(--spc-xl));
 * }
 * ```
 */
export const spacerVars        = config[0];

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
 * const expression = spacerExpressions.lg; // Resolves to [[ "calc(", spacerVars.md, " * 1.5)" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * spacerExpressions.customSpacer = "50px"; // Generates "--spc-customSpacer: 50px;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * spacerExpressions.myExpression = [[
 *    "clamp(", spacerVars.xs, ", ", "0.25%", ", ", spacerVars.xl, ")"
 * ]]; // Generates "--spc-myExpression: clamp(var(--spc-xs), 0.25%, var(--spc-xl));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete spacerExpressions.customSpacer;
 * spacerExpressions.customSpacer = null;
 * spacerExpressions.customSpacer = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for spacer-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --spc-none: 0rem;
 *     --spc-md: 1rem;
 *     --spc-xxs: calc(var(--spc-md) / 8);
 *     --spc-xs: calc(var(--spc-md) / 4);
 *     --spc-semiXs: calc(var(--spc-md) / 3);
 *     --spc-sm: calc(var(--spc-md) / 2);
 *     --spc-semiSm: calc(var(--spc-md) / 1.5);
 *     --spc-lg: calc(var(--spc-md) * 1.5);
 *     --spc-xl: calc(var(--spc-md) * 3);
 *     --spc-default: var(--spc-md);
 *     --spc-customSpacer: 50px;
 *     --spc-myExpression: clamp(var(--spc-xs), 0.25%, var(--spc-xl));
 * }
 * ```
 */
export const spacerExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages settings related to **CSS variables for spacer system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all spacer variables.
 * ```ts
 * spacerSettings.prefix = 'spc';
 * ```
 * - **Selector Scope:**  
 * Ensures all spacer variables are declared inside `:root`.
 * ```ts
 * spacerSettings.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * spacerSettings.onChange.subscribe({
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
 *     --spc-none: 0rem;
 *     --spc-md: 1rem;
 *     --spc-xxs: calc(var(--spc-md) / 8);
 *     --spc-xs: calc(var(--spc-md) / 4);
 *     --spc-semiXs: calc(var(--spc-md) / 3);
 *     --spc-sm: calc(var(--spc-md) / 2);
 *     --spc-semiSm: calc(var(--spc-md) / 1.5);
 *     --spc-lg: calc(var(--spc-md) * 1.5);
 *     --spc-xl: calc(var(--spc-md) * 3);
 *     --spc-default: var(--spc-md);
 * }
 * ```
 */
export const spacerSettings    = config[2];



export {
    spacerVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `spacerVars` instead.
 */
export const spacers         = spacerVars;

/**
 * @deprecated Use `spacerExpressions` instead.
 */
export const spacerValues    = spacerExpressions;

/**
 * @deprecated Use `spacerSettings` instead.
 */
export const spacerConfig    = spacerSettings;

/**
 * @deprecated Use `spacerSettings` instead.
 */
export const cssSpacerConfig = spacerSettings;
