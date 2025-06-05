// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.



// Settings:

const config = cssConfig(() => {
    return {
        // Appearances:
        
        /**
         * Controls the transparency for secondary text.
         */
        opacity        : 0.65       as CssKnownProps['opacity'       ],
        
        
        
        // Foregrounds:
        
        /**
         * Defines the foreground color for secondary text.
         */
        foreg          : undefined  as CssKnownProps['foreground'    ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for secondary text.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize       : undefined  as CssKnownProps['fontSize'      ],
        
        /**
         * Defines the **font family** for secondary text.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily     : undefined  as CssKnownProps['fontFamily'    ],
        
        /**
         * Defines the **font weight** for secondary text.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight     : undefined  as CssKnownProps['fontWeight'    ],
        
        /**
         * Defines the **font style** for secondary text (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle      : undefined  as CssKnownProps['fontStyle'     ],
        
        /**
         * Defines the **text decoration** for secondary text.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration : undefined  as CssKnownProps['textDecoration'],
        
        /**
         * Defines the **line height** for secondary text.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight     : undefined  as CssKnownProps['lineHeight'    ],
    };
}, { prefix: 'sec' });

/**
 * A `Refs<>` object represents CSS variables mapped to a **typography system**, allowing dynamic adjustments through JavaScript.
 * 
 * These values should **not be manually modified outside this system**, as they are managed by `cssConfig()`.
 * 
 * ---
 * 
 * ### **Usage**
 * #### **Retrieving a CSS Variable (Getter)**
 * Access the CSS variable reference:
 * ```ts
 * const value = secondaryVars.opacity; // Resolves to "var(--sec-opacity)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * secondaryVars.fontWeightCustom = 900; // Generates "--sec-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * secondaryVars.boxShadow = [[
 *    "0px", "0px", "0px", "5px", "oklch(from gray l c h / calc(alpha * ", secondaryVars.opacity, "))"
 * ]]; // Generates "--sec-boxShadow: 0px 0px 0px 5px oklch(from gray l c h / calc(alpha * var(--sec-opacity)));"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * secondaryVars.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --sec-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * .secondary {
 *     ............
 *     padding: var(--sec-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * secondaryVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --sec-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete secondaryVars.fontWeightCustom;
 * secondaryVars.fontWeightCustom = null;
 * secondaryVars.fontWeightCustom = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for typography-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --sec-opacity: 0.65;
 *     --sec-fontSize: inherit;
 *     --sec-fontWeightCustom: 900;
 *     --sec-boxShadow: 0px 0px 0px 5px oklch(from gray l c h / calc(alpha * var(--sec-opacity)));
 *     --sec-padding: 1rem;
 *     --sec-booh: 1234;
 * }
 * ```
 */
export const secondaryVars        = config[0];

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
 * const expression = secondaryExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "5px", "oklch(from gray l c h / calc(alpha * ", "var(--sec-opacity)", "))" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * secondaryExpressions.fontWeightCustom = 900; // Generates "--sec-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * secondaryExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "5px", "oklch(from gray l c h / calc(alpha * ", secondaryVars.opacity, "))"
 * ]]; // Generates "--sec-boxShadow: 0px 0px 0px 5px oklch(from gray l c h / calc(alpha * var(--sec-opacity)));"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * secondaryExpressions.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --sec-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * .secondary {
 *     ............
 *     padding: var(--sec-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * secondaryExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --sec-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete secondaryExpressions.fontWeightCustom;
 * secondaryExpressions.fontWeightCustom = null;
 * secondaryExpressions.fontWeightCustom = undefined;
 * ```
 * 
 * #### **Expression Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for typography-related expressions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --sec-opacity: 0.65;
 *     --sec-fontSize: inherit;
 *     --sec-fontWeightCustom: 900;
 *     --sec-boxShadow: 0px 0px 0px 5px oklch(from gray l c h / calc(alpha * var(--sec-opacity)));
 *     --sec-padding: 1rem;
 *     --sec-booh: 1234;
 * }
 * ```
 */
export const secondaryExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * secondaryConfig.prefix = 'sec';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * secondaryConfig.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * secondaryConfig.onChange.subscribe({
 *     next: () => {
 *         console.log("Secondary typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --sec-opacity: 0.65;
 *     --sec-fontSize: inherit;
 * }
 * ```
 */
export const secondaryConfig    = config[2];



export {
    secondaryVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `secondaryVars` instead.
 */
export const secondaries         = secondaryVars;

/**
 * @deprecated Use `secondaryExpressions` instead.
 */
export const secondaryValues    = secondaryExpressions;

/**
 * @deprecated Use `secondaryConfig` instead.
 */
export const cssSecondaryConfig = secondaryConfig;
