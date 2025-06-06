// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.



// Configs:

const config = cssConfig(() => {
    // Static list definitions:
    
    /**
     * Base List Definitions.
     */
    const staticListDefinitions = {
        // Appearances:
        
        /**
         * Defines the **list style position**.
         * Typically `inside` to maintain alignment with text blocks.
         */
        listStylePosition  : 'inside'   as CssKnownProps['listStylePosition' ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** for lists.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart  : '0em'      as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** for lists.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd    : '0em'      as CssKnownProps['marginInlineEnd'   ],
        
        /**
         * Defines the **top margin** when a list follows another text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        marginBlockStart   : '1em'      as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** when a list precedes another text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginBlockEnd     : '1em'      as CssKnownProps['marginBlockEnd'    ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for lists.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize           : undefined  as CssKnownProps['fontSize'          ],
        
        /**
         * Defines the **font family** for lists.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily         : undefined  as CssKnownProps['fontFamily'        ],
        
        /**
         * Defines the **font weight** for lists.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight         : undefined  as CssKnownProps['fontWeight'        ],
        
        /**
         * Defines the **font style** for lists (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle          : undefined  as CssKnownProps['fontStyle'         ],
        
        /**
         * Defines the **text decoration** for lists.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration     : undefined  as CssKnownProps['textDecoration'    ],
        
        /**
         * Defines the **line height** for lists.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight         : undefined  as CssKnownProps['lineHeight'        ],
    };
    
    /**
     * Unordered List (`<ul>`) Specific Definitions.
     */
    const staticUnorderedListDefinitions = {
        // Appearances:
        
        /**
         * Defines the **marker style** for unordered lists (`<ul>`).
         * Uses `disc` by default.
         */
        ulListStyleType    : 'disc'     as CssKnownProps['listStyleType'     ],
    };
    
    /**
     * Ordered List (`<ol>`) Specific Definitions.
     */
    const staticOrderedListDefinitions = {
        // Appearances:
        
        /**
         * Defines the **marker style** for ordered lists (`<ol>`).
         * Uses `decimal` numbering by default.
         */
        olListStyleType    : 'decimal'  as CssKnownProps['listStyleType'     ],
    };
    
    /**
     * List Item (`<li>`) Specific Definitions.
     */
    const staticListItemDefinitions = {
        // Typos:
        
        /**
         * Defines the **text alignment** for `<li>` elements.
         * Uses `start` for natural reading flow.
         */
        liTextAlign        : 'start'    as CssKnownProps['textAlign'         ],
    };
    
    
    
    // Merge all list definitions:
    return {
        ...staticListDefinitions,
        ...staticUnorderedListDefinitions,
        ...staticOrderedListDefinitions,
        ...staticListItemDefinitions,
    };
}, { prefix: 'plist' });

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
 * const value = plainListVars.marginBlockStart; // Resolves to "var(--plist-marginBlockStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * plainListVars.fontWeightCustom = 900; // Generates "--plist-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * plainListVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", plainListVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--plist-boxShadow: 0px 0px 0px calc(var(--plist-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * plainListVars.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --plist-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * .plainList {
 *     ............
 *     opacity: var(--plist-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * plainListVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --plist-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete plainListVars.fontWeightCustom;
 * plainListVars.fontWeightCustom = null;
 * plainListVars.fontWeightCustom = undefined;
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
 *     --plist-listStylePosition: inside;
 *     --plist-marginInlineStart: 0em;
 *     --plist-marginInlineEnd: 0em;
 *     --plist-marginBlockStart: 1em;
 *     --plist-marginBlockEnd: 1em;
 *     --plist-ulListStyleType: disc;
 *     --plist-olListStyleType: decimal;
 *     --plist-liTextAlign: start;
 *     --plist-fontWeightCustom: 900;
 *     --plist-boxShadow: 0px 0px 0px calc(var(--plist-marginBlockStart) / 4) gray;
 *     --plist-opacity: 0.5;
 *     --plist-booh: 1234;
 * }
 * ```
 */
export const plainListVars        = config[0];

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
 * const expression = plainListExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--plist-marginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * plainListExpressions.fontWeightCustom = 900; // Generates "--plist-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * plainListExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", plainListVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--plist-boxShadow: 0px 0px 0px calc(var(--plist-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * plainListExpressions.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --plist-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * .plainList {
 *     ............
 *     opacity: var(--plist-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * plainListExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --plist-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete plainListExpressions.fontWeightCustom;
 * plainListExpressions.fontWeightCustom = null;
 * plainListExpressions.fontWeightCustom = undefined;
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
 *     --plist-listStylePosition: inside;
 *     --plist-marginInlineStart: 0em;
 *     --plist-marginInlineEnd: 0em;
 *     --plist-marginBlockStart: 1em;
 *     --plist-marginBlockEnd: 1em;
 *     --plist-ulListStyleType: disc;
 *     --plist-olListStyleType: decimal;
 *     --plist-liTextAlign: start;
 *     --plist-fontWeightCustom: 900;
 *     --plist-boxShadow: 0px 0px 0px calc(var(--plist-marginBlockStart) / 4) gray;
 *     --plist-opacity: 0.5;
 *     --plist-booh: 1234;
 * }
 * ```
 */
export const plainListExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * plainListConfig.prefix = 'plist';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * plainListConfig.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * plainListConfig.onChange.subscribe({
 *     next: () => {
 *         console.log("List typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --plist-listStylePosition: inside;
 *     --plist-marginInlineStart: 0em;
 *     --plist-marginInlineEnd: 0em;
 *     --plist-marginBlockStart: 1em;
 *     --plist-marginBlockEnd: 1em;
 *     --plist-ulListStyleType: disc;
 *     --plist-olListStyleType: decimal;
 *     --plist-liTextAlign: start;
 * }
 * ```
 */
export const plainListConfig    = config[2];



export {
    plainListVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `plainListVars` instead.
 */
export const plainLists         = plainListVars;

/**
 * @deprecated Use `plainListExpressions` instead.
 */
export const plainListValues    = plainListExpressions;

/**
 * @deprecated Use `plainListConfig` instead.
 */
export const cssPlainListConfig = plainListConfig;
