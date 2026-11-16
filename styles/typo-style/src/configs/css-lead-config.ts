// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultLeadPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui configs:
import {
    typoConfigVars,
}                           from '@reusable-ui/typo-config'         // Configures the typography system (font sizes, font families, font weights, line heights, and text wrapping rules) across all UI components.

// Configs:
import {
    paragraphVars,
}                           from './css-paragraph-config.js'



// Configs:

const config = cssConfig(() => {
    return {
        // Spacings:
        
        /**
         * Defines the **left margin** for lead paragraphs.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart : paragraphVars.marginInlineStart     as CssKnownProps['marginInlineStart'],
        
        /**
         * Defines the **right margin** for lead paragraphs.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd   : paragraphVars.marginInlineEnd       as CssKnownProps['marginInlineEnd'  ],
        
        /**
         * Defines the **top margin** when a paragraph follows another text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        marginBlockStart  : paragraphVars.marginBlockStart      as CssKnownProps['marginBlockStart' ],
        
        /**
         * Defines the **bottom margin** when a paragraph precedes another text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginBlockEnd    : paragraphVars.marginBlockEnd        as CssKnownProps['marginBlockEnd'   ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for lead paragraphs.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize          : typoConfigVars.fontSizeMd           as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font family** for lead paragraphs.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily        : paragraphVars.fontFamily            as CssKnownProps['fontFamily'       ],
        
        /**
         * Defines the **font weight** for lead paragraphs.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight        : typoConfigVars.fontWeightLight      as CssKnownProps['fontWeight'       ],
        
        /**
         * Defines the **font style** for lead paragraphs (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle         : paragraphVars.fontStyle             as CssKnownProps['fontStyle'        ],
        
        /**
         * Defines the **text decoration** for lead paragraphs.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration    : paragraphVars.textDecoration        as CssKnownProps['textDecoration'   ],
        
        /**
         * Defines the **line height** for lead paragraphs.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight        : paragraphVars.lineHeight            as CssKnownProps['lineHeight'       ],
    };
}, { prefix: defaultLeadPrefix });

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
 * const value = leadVars.marginBlockStart; // Resolves to "var(--lead-marginBlockStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * leadVars.fontWeightCustom = 900; // Generates "--lead-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * leadVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", leadVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--lead-boxShadow: 0px 0px 0px calc(var(--lead-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * leadVars.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --lead-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * .lead {
 *     ............
 *     padding: var(--lead-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * leadVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --lead-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete leadVars.fontWeightCustom;
 * leadVars.fontWeightCustom = null;
 * leadVars.fontWeightCustom = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for typography-related definitions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --lead-marginInlineStart: var(--p-marginInlineStart);
 *     --lead-marginInlineEnd: var(--p-marginInlineEnd);
 *     --lead-marginBlockStart: var(--p-marginBlockStart);
 *     --lead-marginBlockEnd: var(--p-marginBlockEnd);
 *     --lead-fontSize: var(--typ-fontSizeMd);
 *     --lead-fontWeight: var(--typ-fontWeightLight);
 *     --lead-fontWeightCustom: 900;
 *     --lead-boxShadow: 0px 0px 0px calc(var(--lead-marginBlockStart) / 4) gray;
 *     --lead-padding: 1rem;
 *     --lead-booh: 1234;
 * }
 * ```
 */
export const leadVars       = config[0];

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
 * const definition = leadVarDefs.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--lead-marginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * leadVarDefs.fontWeightCustom = 900; // Generates "--lead-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * leadVarDefs.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", leadVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--lead-boxShadow: 0px 0px 0px calc(var(--lead-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * leadVarDefs.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --lead-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * .lead {
 *     ............
 *     padding: var(--lead-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * leadVarDefs.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --lead-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete leadVarDefs.fontWeightCustom;
 * leadVarDefs.fontWeightCustom = null;
 * leadVarDefs.fontWeightCustom = undefined;
 * ```
 * 
 * #### **Definition Handling**
 * The **cssfn library** processes:
 * - **Single brackets (`[...]`)** → `.join(', ')`  
 * - **Double brackets (`[[...]]`)** → `.join(' ')`  
 * 
 * In this case, we use **double brackets** for typography-related definitions.
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --lead-marginInlineStart: var(--p-marginInlineStart);
 *     --lead-marginInlineEnd: var(--p-marginInlineEnd);
 *     --lead-marginBlockStart: var(--p-marginBlockStart);
 *     --lead-marginBlockEnd: var(--p-marginBlockEnd);
 *     --lead-fontSize: var(--typ-fontSizeMd);
 *     --lead-fontWeight: var(--typ-fontWeightLight);
 *     --lead-fontWeightCustom: 900;
 *     --lead-boxShadow: 0px 0px 0px calc(var(--lead-marginBlockStart) / 4) gray;
 *     --lead-padding: 1rem;
 *     --lead-booh: 1234;
 * }
 * ```
 */
export const leadVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * leadVarOptions.prefix = 'lead';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * leadVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * leadVarOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Lead paragraph typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --lead-marginInlineStart: var(--p-marginInlineStart);
 *     --lead-marginInlineEnd: var(--p-marginInlineEnd);
 *     --lead-marginBlockStart: var(--p-marginBlockStart);
 *     --lead-marginBlockEnd: var(--p-marginBlockEnd);
 *     --lead-fontSize: var(--typ-fontSizeMd);
 *     --lead-fontWeight: var(--typ-fontWeightLight);
 * }
 * ```
 */
export const leadVarOptions = config[2];



export {
    leadVars as default, // Default export for simplified imports.
}
