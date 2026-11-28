// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultBlockquotePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui configs:
import {
    typoConfigVars,
}                           from '@reusable-ui/typo-config'         // Configures the typography system (font sizes, font families, font weights, line heights, and text wrapping rules) across all UI components.



// Configs:

const config = cssConfig(() => {
    /**
     * Defines static layout properties.
     */
    const staticLayoutProperties = {
        // Borders:
        
        /**
         * Defines the **left border style** for blockquotes.
         * Typically uses a **solid border** to visually distinguish quotes.
         */
        borderInlineStartStyle : 'solid'                    as CssKnownProps['borderInlineStartStyle'],
        
        /**
         * Defines the **left border width** for blockquotes.
         * Typically uses a **thick border** to visually distinguish quotes.
         */
        borderInlineStartWidth : '0.25em'                   as CssKnownProps['borderInlineStartWidth'],
        
        
        
        // Spacings:
        
        /**
         * Defines **left padding** inside blockquotes.
         * Adds breathing room between the **text and left boundary** and provides space for decorative **quote symbol**.
         */
        paddingInlineStart     : '3em'                      as CssKnownProps['paddingInlineStart'    ],
        
        /**
         * Defines **right padding** inside blockquotes.
         * Adds breathing room between the **text and right boundary**.
         */
        paddingInlineEnd       : '1em'                      as CssKnownProps['paddingInlineEnd'      ],
        
        /**
         * Defines **top padding** inside blockquotes.
         * Adds breathing room between the **text and top boundary**.
         */
        paddingBlockStart      : '1em'                      as CssKnownProps['paddingBlockStart'     ],
        
        /**
         * Defines **bottom padding** inside blockquotes.
         * Adds breathing room between the **text and bottom boundary**.
         */
        paddingBlockEnd        : '1em'                      as CssKnownProps['paddingBlockEnd'       ],
    };
    
    
    
    /**
     * Defines static spacing properties.
     */
    const staticSpacingProperties = {
        // Spacings:
        
        /**
         * Defines the **left margin** for blockquotes.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart      : '0em'                      as CssKnownProps['marginInlineStart'     ],
        
        /**
         * Defines the **right margin** for blockquotes.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd        : '0em'                      as CssKnownProps['marginInlineEnd'       ],
    };
    
    
    
    /**
     * Defines static typography properties.
     */
    const staticTypographyProperties = {
        // Typos:
        
        /**
         * Defines the **font size** for blockquotes.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize               : typoConfigVars.fontSizeLg  as CssKnownProps['fontSize'              ],
        
        /**
         * Defines the **font family** for blockquotes.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily             : undefined                  as CssKnownProps['fontFamily'            ],
        
        /**
         * Defines the **font weight** for blockquotes.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight             : undefined                  as CssKnownProps['fontWeight'            ],
        
        /**
         * Defines the **font style** for blockquotes (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle              : undefined                  as CssKnownProps['fontStyle'             ],
        
        /**
         * Defines the **text decoration** for blockquotes.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration         : undefined                  as CssKnownProps['textDecoration'        ],
        
        /**
         * Defines the **line height** for blockquotes.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight             : undefined                  as CssKnownProps['lineHeight'            ],
    };
    
    
    
    /**
     * Defines static conditional sibling adjacency properties.
     */
    const staticSiblingAdjacencyProperties = {
        // Spacings:
        
        /**
         * Defines the **top margin** when a blockquote follows another text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        prevMarginBlockStart   : '1em'                      as CssKnownProps['marginBlockStart'      ],
        
        /**
         * Defines the **bottom margin** when a blockquote precedes another text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        nextMarginBlockEnd     : '1em'                      as CssKnownProps['marginBlockEnd'        ],
    };
    
    
    
    /**
     * Defines the **styling properties** for decorative **quote symbol**.
     */
    const staticQuoteProperties = {
        // Positions:
        
        /**
         * Defines the left-position of the decorative **quote symbol** near the main text.
         */
        quoteInsetInlineStart  : '0.2em'                    as CssKnownProps['insetInlineStart'      ],
        
        /**
         * Defines the top-position of the decorative **quote symbol** near the main text.
         */
        quoteInsetBlockStart   : '-0.1em'                   as CssKnownProps['insetBlockStart'       ],
        
        
        
        // Appearances:
        
        /**
         * Defines the **quotation character** for decorative **quote symbol**.
         * Uses Unicode (`"\\201C"`, `"\\201D"`) for proper typographic quotes.
         */
        quoteContent           : '"\\201C"'                 as CssKnownProps['content'               ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for decorative **quote symbol**.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        quoteFontSize          : '3em'                      as CssKnownProps['fontSize'              ],
        
        /**
         * Defines the **font family** for decorative **quote symbol**.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        quoteFontFamily        : 'Arial'                    as CssKnownProps['fontFamily'            ],
        
        /**
         * Defines the **font weight** for decorative **quote symbol**.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        quoteFontWeight        : undefined                  as CssKnownProps['fontWeight'            ],
        
        /**
         * Defines the **font style** for decorative **quote symbol** (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        quoteFontStyle         : undefined                  as CssKnownProps['fontStyle'             ],
        
        /**
         * Defines the **text decoration** for decorative **quote symbol**.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        quoteTextDecoration    : undefined                  as CssKnownProps['textDecoration'        ],
        
        /**
         * Defines the **line height** for decorative **quote symbol**.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        quoteLineHeight        : undefined                  as CssKnownProps['lineHeight'            ],
    };
    
    
    
    // Merge all properties:
    return {
        ...staticLayoutProperties,
        ...staticSpacingProperties,
        ...staticTypographyProperties,
        ...staticSiblingAdjacencyProperties,
        ...staticQuoteProperties,
    };
}, { prefix: defaultBlockquotePrefix });

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
 * const value = blockquoteVars.prevMarginBlockStart; // Resolves to "var(--bq-prevMarginBlockStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * blockquoteVars.fontWeightCustom = 900; // Generates "--bq-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * blockquoteVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", blockquoteVars.prevMarginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--bq-boxShadow: 0px 0px 0px calc(var(--bq-prevMarginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * blockquoteVars.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --bq-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(blockquote, .blockquote) {
 *     ............
 *     opacity: var(--bq-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * blockquoteVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --bq-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete blockquoteVars.fontWeightCustom;
 * blockquoteVars.fontWeightCustom = null;
 * blockquoteVars.fontWeightCustom = undefined;
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
 *     --bq-borderInlineStartStyle: solid;
 *     --bq-borderInlineStartWidth: 0.25em;
 *     --bq-marginInlineStart: 0em;
 *     --bq-marginInlineEnd: 0em;
 *     --bq-prevMarginBlockStart: 1em;
 *     --bq-nextMarginBlockEnd: 1em;
 *     --bq-paddingInlineStart: 3em;
 *     --bq-paddingInlineEnd: 1em;
 *     --bq-paddingBlockStart: 1em;
 *     --bq-paddingBlockEnd: 1em;
 *     --bq-fontSize: var(--typ-fontSizeLg);
 *     --bq-quoteInsetInlineStart: 0.2em;
 *     --bq-quoteInsetBlockStart: -0.1em;
 *     --bq-quoteContent: "\201C";
 *     --bq-quoteFontSize: 3em;
 *     --bq-quoteFontFamily: Arial;
 *     --bq-fontWeightCustom: 900;
 *     --bq-boxShadow: 0px 0px 0px calc(var(--bq-prevMarginBlockStart) / 4) gray;
 *     --bq-opacity: 0.5;
 *     --bq-booh: 1234;
 * }
 * ```
 */
export const blockquoteVars       = config[0];

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
 * const definition = blockquoteVarDefs.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--bq-prevMarginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * blockquoteVarDefs.fontWeightCustom = 900; // Generates "--bq-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * blockquoteVarDefs.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", blockquoteVars.prevMarginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--bq-boxShadow: 0px 0px 0px calc(var(--bq-prevMarginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * blockquoteVarDefs.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --bq-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(blockquote, .blockquote) {
 *     ............
 *     opacity: var(--bq-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * blockquoteVarDefs.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --bq-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete blockquoteVarDefs.fontWeightCustom;
 * blockquoteVarDefs.fontWeightCustom = null;
 * blockquoteVarDefs.fontWeightCustom = undefined;
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
 *     --bq-borderInlineStartStyle: solid;
 *     --bq-borderInlineStartWidth: 0.25em;
 *     --bq-marginInlineStart: 0em;
 *     --bq-marginInlineEnd: 0em;
 *     --bq-prevMarginBlockStart: 1em;
 *     --bq-nextMarginBlockEnd: 1em;
 *     --bq-paddingInlineStart: 3em;
 *     --bq-paddingInlineEnd: 1em;
 *     --bq-paddingBlockStart: 1em;
 *     --bq-paddingBlockEnd: 1em;
 *     --bq-fontSize: var(--typ-fontSizeLg);
 *     --bq-quoteInsetInlineStart: 0.2em;
 *     --bq-quoteInsetBlockStart: -0.1em;
 *     --bq-quoteContent: "\201C";
 *     --bq-quoteFontSize: 3em;
 *     --bq-quoteFontFamily: Arial;
 *     --bq-fontWeightCustom: 900;
 *     --bq-boxShadow: 0px 0px 0px calc(var(--bq-prevMarginBlockStart) / 4) gray;
 *     --bq-opacity: 0.5;
 *     --bq-booh: 1234;
 * }
 * ```
 */
export const blockquoteVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * blockquoteVarOptions.prefix = 'bq';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * blockquoteVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * blockquoteVarOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Blockquote typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --bq-borderInlineStartStyle: solid;
 *     --bq-borderInlineStartWidth: 0.25em;
 *     --bq-marginInlineStart: 0em;
 *     --bq-marginInlineEnd: 0em;
 *     --bq-prevMarginBlockStart: 1em;
 *     --bq-nextMarginBlockEnd: 1em;
 *     --bq-paddingInlineStart: 3em;
 *     --bq-paddingInlineEnd: 1em;
 *     --bq-paddingBlockStart: 1em;
 *     --bq-paddingBlockEnd: 1em;
 *     --bq-fontSize: var(--typ-fontSizeLg);
 *     --bq-quoteInsetInlineStart: 0.2em;
 *     --bq-quoteInsetBlockStart: -0.1em;
 *     --bq-quoteContent: "\201C";
 *     --bq-quoteFontSize: 3em;
 *     --bq-quoteFontFamily: Arial;
 * }
 * ```
 */
export const blockquoteVarOptions = config[2];



export {
    blockquoteVars as default, // Default export for simplified imports.
}
