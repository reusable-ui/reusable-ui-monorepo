// Cssfn:
import {
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultColorParamConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.



// Configs:

const config = cssConfig(() => {
    return {
        // Color mode:
        
        /**
         * Changes the active color mode context.
         * 
         * - `1`  → Light mode.
         * - `-1` → Dark mode.
         * 
         * Values between `-1` and `+1` (e.g., `0.75`) are supported to proportionally blend
         * between light and dark modes, enabling smooth mode transitions in animations.
         * Underflow/overflow values (e.g., `-1.25`, `+1.25`) produce underbright/overbright effects.
         */
        mode            : 1         as -1 | 1,
        
        
        
        // Background colors:
        
        /**
         * Adjusts the lightness for regular background colors (**`Base`**).
         * 
         * **Base Colors** fill the entire regular background surfaces (such as standard buttons and panels).
         * 
         * - **Typical Value Range:** Small ratios (e.g., `-0.05`) to preserve rich color saturation.
         * - **Light Mode (`mode = 1`)**: Positive values lighten, negative values darken.
         * - **Dark Mode (`mode = -1`)**: Positive values darken, negative values lighten.
         */
        base            : -0.05     as number,
        
        /**
         * Adjusts the lightness for content-heavy background colors (**`Mild`**).
         * 
         * **Mild Colors** fill the entire content-heavy background surfaces (such as articles and textboxes).
         * 
         * - **Typical Value Range:** Moderate-to-high positive ratios (e.g., `0.7`), making them nearly white in light mode or nearly black in dark mode to enhance visual comfort and reduce eye strain.
         * - **Light Mode (`mode = 1`)**: Positive values lighten, negative values darken.
         * - **Dark Mode (`mode = -1`)**: Positive values darken, negative values lighten.
         */
        mild            : 0.7       as number,
        
        
        
        // Foreground colors:
        
        /**
         * Adjusts the contrast scaling for regular text colors (**`Flip`**).
         * 
         * **Flip Colors** ensure readability against regular backgrounds (such as standard buttons and panels), while still retaining a subtle trace of the original color.
         * 
         * - **Typical Value Range:** Recommended near `0.9` (keeping ratio under `1` retains a subtle trace of color; setting it to `1` forces pure black or white).
         * - **Behavior:** Automatically inverts tone based on background luminance and the configured `flipThreshold`.
         */
        flip            : 0.9       as number,
        
        /**
         * Adjusts the luminance threshold at which text colors flip (switch between dark and light).
         * 
         * Measured against the background color's brightness level:
         * - If the background lightness is **below** this threshold, the flip color lightens.
         * - If the background lightness is **above** this threshold, the flip color darkens.
         * - Operates independently of active light/dark mode settings.
         */
        flipThreshold   : 0.75      as number,
        
        /**
         * Adjusts the lightness for content-heavy text colors (**`Text`**).
         * 
         * **Text Colors** ensure readability against mild backgrounds (such as articles and textboxes), while still retaining a subtle trace of the original color.
         * 
         * - **Typical Value Range:** Strong negative ratios near `-0.9` (keeping ratio above `-1` retains a subtle trace of color; setting it to `-1` forces pure black or white).
         * - **Light Mode (`mode = 1`)**: Positive values lighten, negative values darken.
         * - **Dark Mode (`mode = -1`)**: Positive values darken, negative values lighten.
         */
        text            : -0.9      as number,
        
        /**
         * Adjusts the lightness for graphic and icon colors (**`Face`**).
         * 
         * **Face Colors** preserve the authentic, high-saturation visual expression of graphic art.
         * 
         * Special cases:
         * - **Regular Variant:**  : Graphics and icons fall back to `Flip` as the `Face` can be too close in tone to the `Base` background.
         * - **Outlined Variant:** : All surfaces (text, graphics, icons, and borders) fall back to `Face` to act as a unified piece of art floating over transparent backgrounds.
         * 
         * - **Typical Value Range:** Small ratios (e.g., `-0.05`) to preserve rich color saturation.
         * - **Light Mode (`mode = 1`)**: Positive values lighten, negative values darken.
         * - **Dark Mode (`mode = -1`)**: Positive values darken, negative values lighten.
         */
        face            : -0.05     as number,
        
        
        
        // Border colors:
        
        /**
         * Adjusts the lightness for regular borders and separators (**`Bold`**).
         * 
         * **Bold Colors** provide high-contrast framing that wraps securely around regular `Base` backgrounds.
         * 
         * - **Typical Value Range:** Moderate negative ratios (e.g., `-0.6`) to establish distinct visual separation.
         * - **Light Mode (`mode = 1`)**: Positive values lighten, negative values darken.
         * - **Dark Mode (`mode = -1`)**: Positive values darken, negative values lighten.
         */
        bold            : -0.6      as number,
        
        /**
         * Adjusts the lightness for content-heavy borders and separators (**`Thin`**).
         * 
         * **Thin Colors** provide softer contrast framing that wraps gently around content-heavy `Mild` backgrounds.
         * Using `Bold` against mild backgrounds creates excessive, harsh contrast, making `Thin` necessary for hierarchical balance.
         * 
         * - **Typical Value Range:** Moderate negative ratios (e.g., `-0.5`) to establish gentle visual separation.
         * - **Light Mode (`mode = 1`)**: Positive values lighten, negative values darken.
         * - **Dark Mode (`mode = -1`)**: Positive values darken, negative values lighten.
         */
        thin            : -0.5      as number,
        
        /**
         * Adjusts the lightness for outlined borders and separators (**`Edge`**).
         * 
         * **Edge Colors** provide colorful, high-saturation framing for outlined (transparent) backgrounds.
         * To maintain a cohesive single-unit aesthetic, `Edge` typically mirrors the `Face` color.
         * 
         * - **Typical Value Range:** Small ratios (e.g., `-0.05`) matching `Face` to maintain rich color saturation.
         * - **Light Mode (`mode = 1`)**: Positive values lighten, negative values darken.
         * - **Dark Mode (`mode = -1`)**: Positive values darken, negative values lighten.
         */
        edge            : -0.05     as number,
        
        
        
        // Effect colors (shadows, rings, focus indicators):
        
        /**
         * Adjusts the opacity level for effect colors (**`Soft`**).
         * 
         * **Soft Colors** create visual focus and draw attention to interactive elements without overwhelming the overall design.
         * 
         * - **Typical Value Range:** Moderate negative ratios (e.g., `-0.5`) for subtle focus rings, glows, and box shadows.
         * - **Positive values:** Increases opacity (makes the color more solid).
         * - **Negative values:** Decreases opacity (makes the color more transparent/blended).
         */
        soft            : -0.5      as number,
    };
}, { prefix: defaultColorParamConfigPrefix });

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
 * const value = colorParamConfigVars.mild; // Resolves to "var(--col-p-mild)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * colorParamConfigVars.myParam = "3rem"; // Generates "--col-p-myParam: 3rem;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * colorParamConfigVars.myDefinition = [[
 *    "calc(", colorParamConfigVars.mild, " * 2)"
 * ]]; // Generates "--col-p-myDefinition: calc(var(--col-p-mild) * 2);"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete colorParamConfigVars.myParam;
 * colorParamConfigVars.myParam = null;
 * colorParamConfigVars.myParam = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for color-param-related definitions.
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
 *     --col-p-myDefinition: calc(var(--col-p-mild) * 2);
 * }
 * ```
 */
export const colorParamConfigVars       = config[0];

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
 * Access the assembled CSS definition.
 * ```ts
 * const definition = colorParamConfigVarDefs.mild; // Resolves to 0.7
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * colorParamConfigVarDefs.myParam = "3rem"; // Generates "--col-p-myParam: 3rem;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * colorParamConfigVarDefs.myDefinition = [[
 *    "calc(", colorParamConfigVars.mild, " * 2)"
 * ]]; // Generates "--col-p-myDefinition: calc(var(--col-p-mild) * 2);"
 * ```
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete colorParamConfigVarDefs.myParam;
 * colorParamConfigVarDefs.myParam = null;
 * colorParamConfigVarDefs.myParam = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for color-param-related definitions.
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
 *     --col-p-myDefinition: calc(var(--col-p-mild) * 2);
 * }
 * ```
 */
export const colorParamConfigVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for color parameters**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all color parameter variables.
 * ```ts
 * colorParamConfigVarOptions.prefix = 'col-p';
 * ```
 * - **Selector Scope:**  
 * Ensures all color parameter variables are declared inside `:root`.
 * ```ts
 * colorParamConfigVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * colorParamConfigVarOptions.onChange.subscribe({
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
export const colorParamConfigVarOptions = config[2];



export {
    colorParamConfigVars as default, // Default export for simplified imports.
}
