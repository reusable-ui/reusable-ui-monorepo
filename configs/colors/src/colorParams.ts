// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.



// Configs:

const config = cssConfig(() => {
    return {
        // Color mode:
        
        /**
         * Defines the color mode.
         * `1`  → Light mode.
         * `-1` → Dark mode.
         */
        mode            : 1         as -1 | 1,
        
        
        
        // Background colors:
        
        /**
         * Adjusts the brightness of regular background colors (**Base Colors**).
         * 
         * **Base Colors** serve as the **standard UI backgrounds**, providing **moderate tones**  
         * ensuring **optimal contrast in light and dark modes**.
         * 
         * Typically used for **regular UI surfaces**, such as **buttons and standard panels**.
         * 
         * - **Light mode:** Positive values lighten, negative values darken.
         * - **Dark mode:** Positive values darken, negative values lighten.
         */
        base            : -0.05     as number,
        
        /**
         * Adjusts the brightness of content-heavy background colors (**Mild Colors**).
         * 
         * **Mild Colors** are designed for **comfortable readability**, being **soft and bright in light mode**  
         * and **deep and muted in dark mode**  
         * enhancing **visual comfort and reduces eye strain**.
         * 
         * Typically used for **content-heavy surfaces**, such as **articles and textboxes**.
         * 
         * - **Light mode:** Positive values lighten, negative values darken.
         * - **Dark mode:** Positive values darken, negative values lighten.
         */
        mild            : 0.7       as number,
        
        
        
        // Foreground colors:
        
        /**
         * Adjusts the brightness of regular text colors (**Flip Colors**).
         * 
         * **Flip Colors** dynamically adapt to **background brightness**,  
         * ensuring **strong contrast against `baseColors` backgrounds**.  
         * They maintain **readability** across themes by automatically switching between light and dark tones.
         * 
         * Typically used for **regular UI texts**, such as **buttons and standard panels**.
         * 
         * The brightness **is measured** by extracting the lightness (`L`) element in OKLCH  
         * and comparing it against `flipThreshold`.
         * 
         * - **Positive values:** Ensure correct contrast (dark text on light backgrounds, light text on dark backgrounds).
         * - **Negative values:** Cause incorrect flipping (light text on light backgrounds, dark text on dark backgrounds)—rarely used.
         */
        flip            : 0.9       as number,
        
        /**
         * Adjusts the brightness threshold at which text colors flip (switch between dark and light)  
         * based on the background color's **OKLCH lightness (`L`)**.
         * 
         * - **If background lightness (`L`) is below this threshold**, the text color **lightens**.
         * - **If background lightness (`L`) is above this threshold**, the text color **darkens**.
         * - Works **independently** from the mode (`light` or `dark`).
         */
        flipThreshold   : 0.75      as number,
        
        /**
         * Adjusts the brightness of content-heavy text colors (**Text Colors**).
         * 
         * **Text Colors** are optimized for extended reading,  
         * ensuring **comfortable contrast against `mildColors` backgrounds**.  
         * They remain **gentle on the eyes**, reducing strain while maintaining readability.
         * 
         * Typically used for **content-heavy texts**, such as **articles and textboxes**.
         * 
         * - **Light mode:** Positive values lighten, negative values darken.
         * - **Dark mode:** Positive values darken, negative values lighten.
         */
        text            : -0.9      as number,
        
        /**
         * Adjusts the brightness of backgroundless text colors (**Face Colors**).
         * 
         * **Face Colors** define the foreground appearance of texts and icons in **transparent UI elements**,  
         * ensuring **clear visibility while preserving background transparency**.
         * 
         * Typically used for **backgroundless texts**, such as **outlined UI texts and icons**.
         * 
         * - **Light mode:** Positive values lighten, negative values darken.
         * - **Dark mode:** Positive values darken, negative values lighten.
         */
        face            : -0.05     as number,
        
        
        
        // Border colors:
        
        /**
         * Adjusts the brightness of regular border colors (**Bold Colors**).
         * 
         * **Bold Colors** define **high-contrast borders**,  
         * ensuring **strong visual separation between UI elements**.
         * 
         * Typically used for **regular UI borders**, such as **buttons and standard panels**.
         * 
         * - **Light mode:** Positive values lighten, negative values darken.
         * - **Dark mode:** Positive values darken, negative values lighten.
         */
        bold            : -0.6      as number,
        
        /**
         * Adjusts the brightness of content-heavy border colors (**Thin Colors**).
         * 
         * **Thin Colors** provide **soft contrast borders**,  
         * ensuring **gentle visual separation between UI elements**.
         * 
         * Typically used for **content-heavy borders**, such as **articles and textboxes**.
         * 
         * - **Light mode:** Positive values lighten, negative values darken.
         * - **Dark mode:** Positive values darken, negative values lighten.
         */
        thin            : -0.5      as number,
        
        /**
         * Adjusts the brightness of backgroundless border colors (**Edge Colors**).
         * 
         * **Edge Colors** enhance **outline visibility**,  
         * ensuring **clear outlines while preserving background transparency**.
         * 
         * Typically used for **backgroundless borders**, such as **outlined UI texts and floating elements**.
         * 
         * - **Light mode:** Positive values lighten, negative values darken.
         * - **Dark mode:** Positive values darken, negative values lighten.
         */
        edge            : -0.05     as number,
        
        
        
        // Effect colors (shadows, rings, focus indicators):
        
        /**
         * Adjusts the opacity level of effect colors (**Soft Colors**).
         * 
         * **Soft Colors** create subtle emphasis,  
         * providing **visual focus and draws attention to surrounding elements**.
         * 
         * Typically used for **ring-focus indicators**, background glows, or subtle overlays.
         * 
         * - **Positive values:** Increase opacity, making the effect more prominent.
         * - **Negative values:** Decrease opacity, making the effect more transparent.
         */
        soft            : -0.5      as number,
    };
}, { prefix: 'col-p' });

/**
 * A `Refs<>` object represents CSS variables mapped to **color parameters**, allowing dynamic adjustments through JavaScript.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Variable (Getter)**
 * Access the CSS variable reference:
 * ```ts
 * const value = colorParamVars.mild; // Resolves to "var(--col-p-mild)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * colorParamVars.myParam = "3rem"; // Generates "--col-p-myParam: 3rem;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * colorParamVars.myExpression = [[
 *    "calc(", colorParamVars.mild, " * 2)"
 * ]]; // Generates "--col-p-myExpression: calc(var(--col-p-mild) * 2);"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete colorParamVars.myParam;
 * colorParamVars.myParam = null;
 * colorParamVars.myParam = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for color-param-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --col-p-mode: 1;
 *     --col-p-base: -0.05;
 *     --col-p-mild: 0.7;
 *     --col-p-flip: 0.9;
 *     --col-p-flipThreshold: 0.75;
 *     --col-p-text: -0.9;
 *     --col-p-face: -0.05;
 *     --col-p-bold: -0.6;
 *     --col-p-thin: -0.5;
 *     --col-p-edge: -0.05;
 *     --col-p-soft: -0.5;
 *     --col-p-myParam: 3rem;
 *     --col-p-myExpression: calc(var(--col-p-mild) * 2);
 * }
 * ```
 */
export const colorParamVars        = config[0];

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
 * const expression = colorParamExpressions.mild; // Resolves to 0.7
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * colorParamExpressions.myParam = "3rem"; // Generates "--col-p-myParam: 3rem;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * colorParamExpressions.myExpression = [[
 *    "calc(", colorParamVars.mild, " * 2)"
 * ]]; // Generates "--col-p-myExpression: calc(var(--col-p-mild) * 2);"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete colorParamExpressions.myParam;
 * colorParamExpressions.myParam = null;
 * colorParamExpressions.myParam = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for color-param-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --col-p-mode: 1;
 *     --col-p-base: -0.05;
 *     --col-p-mild: 0.7;
 *     --col-p-flip: 0.9;
 *     --col-p-flipThreshold: 0.75;
 *     --col-p-text: -0.9;
 *     --col-p-face: -0.05;
 *     --col-p-bold: -0.6;
 *     --col-p-thin: -0.5;
 *     --col-p-edge: -0.05;
 *     --col-p-soft: -0.5;
 *     --col-p-myParam: 3rem;
 *     --col-p-myExpression: calc(var(--col-p-mild) * 2);
 * }
 * ```
 */
export const colorParamExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages settings related to **CSS variables for color parameters**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all color parameter variables.
 * ```ts
 * colorParamSettings.prefix = 'col-p';
 * ```
 * - **Selector Scope:**  
 * Ensures all color parameter variables are declared inside `:root`.
 * ```ts
 * colorParamSettings.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * colorParamSettings.onChange.subscribe({
 *     next: () => {
 *         console.log("Color parameters updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --col-p-mode: 1;
 *     --col-p-base: -0.05;
 *     --col-p-mild: 0.6;
 *     --col-p-flip: 0.9;
 *     --col-p-text: -0.9;
 *     --col-p-bold: -0.8;
 *     --col-p-thin: -0.6;
 *     --col-p-edge: -0.05;
 *     --col-p-soft: -0.5;
 * }
 * ```
 */
export const colorParamSettings    = config[2];



export {
    colorParamVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `colorParamVars` instead.
 */
export const colorParams         = colorParamVars;

/**
 * @deprecated Use `colorParamExpressions` instead.
 */
export const colorParamValues    = colorParamExpressions;

/**
 * @deprecated Use `colorParamSettings` instead.
 */
export const colorParamConfig    = colorParamSettings;

/**
 * @deprecated Use `colorParamSettings` instead.
 */
export const cssColorParamConfig = colorParamSettings;
