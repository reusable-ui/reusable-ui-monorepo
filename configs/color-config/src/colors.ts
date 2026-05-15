// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultColorConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Utilities:
import {
    getDefaultAllColors,
}                           from './color-factories.js'



// Configs:

const config = cssConfig(() => {
    return getDefaultAllColors();
}, { prefix: defaultColorConfigPrefix });

/**
 * A `Refs<>` object represents CSS variables mapped to a **color system**, allowing dynamic adjustments through JavaScript.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Variable (Getter)**
 * Access the CSS variable reference:
 * ```ts
 * const value = colorConfigVars.blue; // Resolves to "var(--col-blue)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * colorConfigVars.myColor = "oklch(0.45 0.30 264)"; // Generates "--col-myColor: oklch(0.45 0.30 264);"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * colorConfigVars.myExpression = [[
 *    "oklch(from", colorConfigVars.blue, " l c h / clamp(0.05, alpha * (1 + ", colorParamConfigVars.soft, "), 1))"
 * ]]; // Generates "--col-myExpression: oklch(from var(--col-blue) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete colorConfigVars.myColor;
 * colorConfigVars.myColor = null;
 * colorConfigVars.myColor = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for color-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --col-blue: oklch(0.58 0.228 260);
 *     --col-indigo: oklch(0.49 0.278 287);
 *     --col-purple: oklch(0.50 0.188 295);
 *     --col-pink: oklch(0.60 0.209 355);
 *     ............
 *     --col-warningSoft: oklch(from var(--col-warning) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-dangerSoft: oklch(from var(--col-danger) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-lightSoft: oklch(from var(--col-light) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-darkSoft: oklch(from var(--col-dark) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-myColor: oklch(0.45 0.30 264);
 *     --col-myExpression: oklch(from var(--col-blue) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 * }
 * ```
 */
export const colorConfigVars        = config[0]; // eslint-disable-line css-variables/enforce-variable-conventions

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
 * Access the assembled CSS expression.
 * ```ts
 * const expression = colorConfigExpressions.primaryBase; // Resolves to [[ "oklch(from ", "var(--col-primary)", " calc(((1 - max(", "var(--col-p-base)", ", (0 - ", "var(--col-p-base)", "))) * l) + (1 - min(1, (1 - (", "var(--col-p-base)", " * ", "var(--col-p-mode)", "))))) calc((1 - max(", "var(--col-p-base)", ", (0 - ", "var(--col-p-base)", "))) * c) h / alpha)" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * colorConfigExpressions.myColor = "oklch(0.45 0.30 264)"; // Generates "--col-myColor: oklch(0.45 0.30 264);"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * colorConfigExpressions.myExpression = [[
 *    "oklch(from", colorConfigVars.blue, " l c h / clamp(0.05, alpha * (1 + ", colorParamConfigVars.soft, "), 1))"
 * ]]; // Generates "--col-myExpression: oklch(from var(--col-blue) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete colorConfigExpressions.myColor;
 * colorConfigExpressions.myColor = null;
 * colorConfigExpressions.myColor = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for color-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --col-blue: oklch(0.58 0.228 260);
 *     --col-indigo: oklch(0.49 0.278 287);
 *     --col-purple: oklch(0.50 0.188 295);
 *     --col-pink: oklch(0.60 0.209 355);
 *     ............
 *     --col-warningSoft: oklch(from var(--col-warning) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-dangerSoft: oklch(from var(--col-danger) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-lightSoft: oklch(from var(--col-light) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-darkSoft: oklch(from var(--col-dark) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-myColor: oklch(0.45 0.30 264);
 *     --col-myExpression: oklch(from var(--col-blue) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 * }
 * ```
 */
export const colorConfigExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for color system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all color variables.
 * ```ts
 * colorConfigOptions.prefix = 'col';
 * ```
 * - **Selector Scope:**  
 * Ensures all all color variables are declared inside `:root`.
 * ```ts
 * colorConfigOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * colorConfigOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Color system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --col-blue: oklch(0.58 0.228 260);
 *     --col-indigo: oklch(0.49 0.278 287);
 *     --col-purple: oklch(0.50 0.188 295);
 *     --col-pink: oklch(0.60 0.209 355);
 *     ............
 *     --col-warningSoft: oklch(from var(--col-warning) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-dangerSoft: oklch(from var(--col-danger) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-lightSoft: oklch(from var(--col-light) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 *     --col-darkSoft: oklch(from var(--col-dark) l c h / clamp(0.05, alpha * (1 + var(--col-p-soft)), 1));
 * }
 * ```
 */
export const colorConfigOptions     = config[2];



export {
    colorConfigVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `colorConfigVars` instead.
 */
export const colors         = colorConfigVars;

/**
 * @deprecated Use `colorConfigExpressions` instead.
 */
export const colorValues    = colorConfigExpressions;

/**
 * @deprecated Use `colorConfigOptions` instead.
 */
export const cssColorConfig = colorConfigOptions;
