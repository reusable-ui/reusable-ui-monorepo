// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultPlainListPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.



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
         * Typically `outside` to maintain alignment with text blocks.
         */
        listStylePosition      : 'outside'  as CssKnownProps['listStylePosition'],
        
        /**
         * Defines the **marker style** for unordered lists (`<ul>`).
         * Uses `disc` by default.
         */
        listStyleTypeUnordered : 'disc'     as CssKnownProps['listStyleType'    ],
        
        /**
         * Defines the **marker style** for ordered lists (`<ol>`).
         * Uses `decimal` numbering by default.
         */
        listStyleTypeOrdered   : 'decimal'  as CssKnownProps['listStyleType'    ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** for lists.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart      : '0em'      as CssKnownProps['marginInlineStart'],
        
        /**
         * Defines the **right margin** for lists.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd        : '0em'      as CssKnownProps['marginInlineEnd'  ],
        
        /**
         * Defines the **top margin** when a list follows another text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        marginBlockStart       : '1em'      as CssKnownProps['marginBlockStart' ],
        
        /**
         * Defines the **bottom margin** when a list precedes another text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginBlockEnd         : '1em'      as CssKnownProps['marginBlockEnd'   ],
        
        
        /**
         * Defines **left padding** for list indentation.
         * Provides space for list markers and indentation of list items.
         */
        paddingInlineStart     : '1.5em'    as CssKnownProps['paddingInlineStart'],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for lists.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize               : undefined  as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font family** for lists.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily             : undefined  as CssKnownProps['fontFamily'       ],
        
        /**
         * Defines the **font weight** for lists.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight             : undefined  as CssKnownProps['fontWeight'       ],
        
        /**
         * Defines the **font style** for lists (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle              : undefined  as CssKnownProps['fontStyle'        ],
        
        /**
         * Defines the **text decoration** for lists.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration         : undefined  as CssKnownProps['textDecoration'   ],
        
        /**
         * Defines the **line height** for lists.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight             : undefined  as CssKnownProps['lineHeight'       ],
    };
    
    /**
     * List Item (`<li>`) Specific Definitions.
     */
    const staticListItemDefinitions = {
        // Spacings:
        
        /**
         * Defines the **top margin** when an item follows another item.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        itemMarginBlockStart   : '0.25em'   as CssKnownProps['marginBlockStart' ],
        
        /**
         * Defines the **bottom margin** when an item precedes another item.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        itemMarginBlockEnd     : '0.25em'   as CssKnownProps['marginBlockEnd'   ],
    };
    
    
    
    // Merge all list definitions:
    return {
        ...staticListDefinitions,
        ...staticListItemDefinitions,
    };
}, { prefix: defaultPlainListPrefix });

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
 * **Definition Assignment:**
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
 * .plain-list {
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
 *     --plist-listStylePosition: outside;
 *     --plist-listStyleTypeUnordered: disc;
 *     --plist-listStyleTypeOrdered: decimal;
 *     --plist-marginInlineStart: 0em;
 *     --plist-marginInlineEnd: 0em;
 *     --plist-marginBlockStart: 1em;
 *     --plist-marginBlockEnd: 1em;
 *     --plist-paddingInlineStart: 1.5em;
 *     --plist-itemMarginBlockStart: 0.25em;
 *     --plist-itemMarginBlockEnd: 0.25em;
 *     --plist-fontWeightCustom: 900;
 *     --plist-boxShadow: 0px 0px 0px calc(var(--plist-marginBlockStart) / 4) gray;
 *     --plist-opacity: 0.5;
 *     --plist-booh: 1234;
 * }
 * ```
 */
export const plainListVars       = config[0];

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
 * const definition = plainListVarDefs.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--plist-marginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * plainListVarDefs.fontWeightCustom = 900; // Generates "--plist-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * plainListVarDefs.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", plainListVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--plist-boxShadow: 0px 0px 0px calc(var(--plist-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * plainListVarDefs.opacity = 0.5;
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
 * .plain-list {
 *     ............
 *     opacity: var(--plist-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * plainListVarDefs.booh = 1234;
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
 * delete plainListVarDefs.fontWeightCustom;
 * plainListVarDefs.fontWeightCustom = null;
 * plainListVarDefs.fontWeightCustom = undefined;
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
 *     --plist-listStylePosition: outside;
 *     --plist-listStyleTypeUnordered: disc;
 *     --plist-listStyleTypeOrdered: decimal;
 *     --plist-marginInlineStart: 0em;
 *     --plist-marginInlineEnd: 0em;
 *     --plist-marginBlockStart: 1em;
 *     --plist-marginBlockEnd: 1em;
 *     --plist-paddingInlineStart: 1.5em;
 *     --plist-itemMarginBlockStart: 0.25em;
 *     --plist-itemMarginBlockEnd: 0.25em;
 *     --plist-fontWeightCustom: 900;
 *     --plist-boxShadow: 0px 0px 0px calc(var(--plist-marginBlockStart) / 4) gray;
 *     --plist-opacity: 0.5;
 *     --plist-booh: 1234;
 * }
 * ```
 */
export const plainListVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * plainListVarOptions.prefix = 'plist';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * plainListVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * plainListVarOptions.onChange.subscribe({
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
 *     --plist-listStylePosition: outside;
 *     --plist-listStyleTypeUnordered: disc;
 *     --plist-listStyleTypeOrdered: decimal;
 *     --plist-marginInlineStart: 0em;
 *     --plist-marginInlineEnd: 0em;
 *     --plist-marginBlockStart: 1em;
 *     --plist-marginBlockEnd: 1em;
 *     --plist-paddingInlineStart: 1.5em;
 *     --plist-itemMarginBlockStart: 0.25em;
 *     --plist-itemMarginBlockEnd: 0.25em;
 * }
 * ```
 */
export const plainListVarOptions = config[2];



export {
    plainListVars as default, // Default export for simplified imports.
}
