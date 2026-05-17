// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultParagraphConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.



// Configs:

const config = cssConfig(() => {
    return {
        // Spacings:
        
        /**
         * Defines the **left margin** for paragraphs.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart : '0em'       as CssKnownProps['marginInlineStart'],
        
        /**
         * Defines the **right margin** for paragraphs.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd   : '0em'       as CssKnownProps['marginInlineEnd'  ],
        
        /**
         * Defines the **top margin** when a paragraph follows another text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        marginBlockStart  : '1em'       as CssKnownProps['marginBlockStart' ],
        
        /**
         * Defines the **bottom margin** when a paragraph precedes another text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginBlockEnd    : '1em'       as CssKnownProps['marginBlockEnd'   ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for paragraphs.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize          : undefined   as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font family** for paragraphs.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily        : undefined   as CssKnownProps['fontFamily'       ],
        
        /**
         * Defines the **font weight** for paragraphs.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight        : undefined   as CssKnownProps['fontWeight'       ],
        
        /**
         * Defines the **font style** for paragraphs (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle         : undefined   as CssKnownProps['fontStyle'        ],
        
        /**
         * Defines the **text decoration** for paragraphs.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration    : undefined   as CssKnownProps['textDecoration'   ],
        
        /**
         * Defines the **line height** for paragraphs.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight        : undefined   as CssKnownProps['lineHeight'       ],
    };
}, { prefix: defaultParagraphConfigPrefix });

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
 * const value = paragraphConfigVars.marginBlockStart; // Resolves to "var(--p-marginBlockStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * paragraphConfigVars.fontWeightCustom = 900; // Generates "--p-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * paragraphConfigVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", paragraphConfigVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--p-boxShadow: 0px 0px 0px calc(var(--p-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * paragraphConfigVars.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --p-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(p, .p) {
 *     ............
 *     padding: var(--p-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * paragraphConfigVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --p-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete paragraphConfigVars.fontWeightCustom;
 * paragraphConfigVars.fontWeightCustom = null;
 * paragraphConfigVars.fontWeightCustom = undefined;
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
 *     --p-marginInlineStart: 0em;
 *     --p-marginInlineEnd: 0em;
 *     --p-marginBlockStart: 1em;
 *     --p-marginBlockEnd: 1em;
 *     --p-fontWeightCustom: 900;
 *     --p-boxShadow: 0px 0px 0px calc(var(--p-marginBlockStart) / 4) gray;
 *     --p-padding: 1rem;
 *     --p-booh: 1234;
 * }
 * ```
 */
export const paragraphConfigVars        = config[0];

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
 * const expression = paragraphConfigExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--p-marginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * paragraphConfigExpressions.fontWeightCustom = 900; // Generates "--p-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * paragraphConfigExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", paragraphConfigVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--p-boxShadow: 0px 0px 0px calc(var(--p-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * paragraphConfigExpressions.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --p-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(p, .p) {
 *     ............
 *     padding: var(--p-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * paragraphConfigExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --p-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete paragraphConfigExpressions.fontWeightCustom;
 * paragraphConfigExpressions.fontWeightCustom = null;
 * paragraphConfigExpressions.fontWeightCustom = undefined;
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
 *     --p-marginInlineStart: 0em;
 *     --p-marginInlineEnd: 0em;
 *     --p-marginBlockStart: 1em;
 *     --p-marginBlockEnd: 1em;
 *     --p-fontWeightCustom: 900;
 *     --p-boxShadow: 0px 0px 0px calc(var(--p-marginBlockStart) / 4) gray;
 *     --p-padding: 1rem;
 *     --p-booh: 1234;
 * }
 * ```
 */
export const paragraphConfigExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * paragraphConfigOptions.prefix = 'p';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * paragraphConfigOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * paragraphConfigOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Paragraph typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --p-marginInlineStart: 0em;
 *     --p-marginInlineEnd: 0em;
 *     --p-marginBlockStart: 1em;
 *     --p-marginBlockEnd: 1em;
 * }
 * ```
 */
export const paragraphConfigOptions     = config[2];



export {
    paragraphConfigVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `paragraphConfigVars` instead.
 */
export const paragraphs         = paragraphConfigVars;

/**
 * @deprecated Use `paragraphConfigExpressions` instead.
 */
export const paragraphValues    = paragraphConfigExpressions;

/**
 * @deprecated Use `paragraphConfigOptions` instead.
 */
export const cssParagraphConfig = paragraphConfigOptions;
