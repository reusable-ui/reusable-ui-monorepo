// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultMarkPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Configs:
import {
    colorConfigVars,
}                           from '@reusable-ui/color-config'        // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
import {
    borderConfigVars,
}                           from '@reusable-ui/border-config'       // A flexible and themeable border management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
import {
    radiusConfigVars,
}                           from '@reusable-ui/radius-config'       // A flexible rounding system for UI components, utilizing CSS custom properties to enable dynamic styling and easy customization.



// Configs:

const config = cssConfig(() => {
    /**
     * Defines static spacing properties.
     */
    const staticSpacingProperties = {
        // Spacings:
        
        /**
         * Defines the **top margin** for `<mark>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockStart      : '0em'                           as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** for `<mark>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockEnd        : '0em'                           as CssKnownProps['marginBlockEnd'    ],
        
        
        /**
         * Defines **left padding** inside `<mark>` elements.
         * Adds breathing room between the **text and left boundary**.
         */
        paddingInlineStart    : '0.125em'                       as CssKnownProps['paddingInlineStart'],
        
        /**
         * Defines **right padding** inside `<mark>` elements.
         * Adds breathing room between the **text and right boundary**.
         */
        paddingInlineEnd      : '0.125em'                       as CssKnownProps['paddingInlineEnd'  ],
        
        /**
         * Defines **top padding** inside `<mark>` elements.
         * Adds breathing room between the **text and top boundary**.
         */
        paddingBlockStart     : '0.125em'                       as CssKnownProps['paddingBlockStart' ],
        
        /**
         * Defines **bottom padding** inside `<mark>` elements.
         * Adds breathing room between the **text and bottom boundary**.
         */
        paddingBlockEnd       : '0.125em'                       as CssKnownProps['paddingBlockEnd'   ],
    };
    
    
    
    /**
     * Defines static mark properties such as font sizes, families, weights, and styles.
     */
    const staticMarkProperties = {
        // Backgrounds:
        
        /**
         * Defines the **background color** for `<mark>` elements.
         * Typically uses a **highlight mild color** (`warningMild`) for emphasis.
         */
        backgroundColor       : colorConfigVars.warningMild     as CssKnownProps['backgroundColor'   ],
        
        
        
        // Foregrounds:
        
        /**
         * Defines the **text color** for `<mark>` elements.
         * Typically uses a **highlight text color** (`warningText`) for readability.
         */
        color                 : colorConfigVars.warningText     as CssKnownProps['color'             ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for `<mark>` elements.
         * Typically uses the default border style for consistency.
         */
        borderStyle           : borderConfigVars.style          as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for `<mark>` elements.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth           : borderConfigVars.width          as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for `<mark>` elements.
         * Typically uses a **highlight thin color** (`warningThin`) for subtle emphasis.
         */
        borderColor           : colorConfigVars.warningThin     as CssKnownProps['borderColor'       ],
        
        /**
         * Defines the **border radius** for `<mark>` elements.
         * Typically uses a **small radius** (`radiusSm`) to create softened edges.
         */
        borderRadius          : radiusConfigVars.radiusSm       as CssKnownProps['borderRadius'      ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for `<mark>` elements.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize              : undefined                       as CssKnownProps['fontSize'          ],
        
        /**
         * Defines the **font family** for `<mark>` elements.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily            : undefined                       as CssKnownProps['fontFamily'        ],
        
        /**
         * Defines the **font weight** for `<mark>` elements.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight            : undefined                       as CssKnownProps['fontWeight'        ],
        
        /**
         * Defines the **font style** for `<mark>` elements (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle             : undefined                       as CssKnownProps['fontStyle'         ],
        
        /**
         * Defines the **text decoration** for `<mark>` elements.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration        : undefined                       as CssKnownProps['textDecoration'    ],
        
        /**
         * Defines the **line height** for `<mark>` elements.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight            : undefined                       as CssKnownProps['lineHeight'        ],
    };
    
    
    
    /**
     * Defines static conditional sibling adjacency properties.
     */
    const staticSiblingAdjacencyProperties = {
        // Spacings:
        
        /**
         * Defines the **left margin** when a `<mark>` element follows another highlight-based element.
         * Implemented using adjacent sibling selector.
         * Ensures structured horizontal spacing.
         */
        prevMarginInlineStart : '0.25em'                        as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** when a `<mark>` element precedes another highlight-based element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        nextMarginInlineEnd   : '0.25em'                        as CssKnownProps['marginInlineEnd'   ],
    };
    
    
    
    // Merge all properties:
    return {
        ...staticSpacingProperties,
        ...staticMarkProperties,
        ...staticSiblingAdjacencyProperties,
    };
}, { prefix: defaultMarkPrefix });

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
 * const value = markVars.prevMarginInlineStart; // Resolves to "var(--mrk-prevMarginInlineStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * markVars.fontWeightCustom = 900; // Generates "--mrk-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * markVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", markVars.prevMarginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--mrk-boxShadow: 0px 0px 0px calc(var(--mrk-prevMarginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * markVars.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --mrk-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(mark, .mark) {
 *     ............
 *     opacity: var(--mrk-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * markVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --mrk-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete markVars.fontWeightCustom;
 * markVars.fontWeightCustom = null;
 * markVars.fontWeightCustom = undefined;
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
 *     --mrk-backgroundColor: var(--col-warningMild);
 *     --mrk-color: var(--col-warningText);
 *     --mrk-borderStyle: var(--bor-style);
 *     --mrk-borderWidth: var(--bor-defaultWidth);
 *     --mrk-borderColor: var(--col-warningThin);
 *     --mrk-borderRadius: var(--bor-r-sm);
 *     --mrk-prevMarginInlineStart: 0.25em;
 *     --mrk-nextMarginInlineEnd: 0.25em;
 *     --mrk-marginBlockStart: 0em;
 *     --mrk-marginBlockEnd: 0em;
 *     --mrk-paddingInlineStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingInlineEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-fontWeightCustom: 900;
 *     --mrk-boxShadow: 0px 0px 0px calc(var(--mrk-prevMarginInlineStart) / 4) gray;
 *     --mrk-opacity: 0.5;
 *     --mrk-booh: 1234;
 * }
 * ```
 */
export const markVars       = config[0];

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
 * const definition = markVarDefs.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--mrk-prevMarginInlineStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * markVarDefs.fontWeightCustom = 900; // Generates "--mrk-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * markVarDefs.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", markVars.prevMarginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--mrk-boxShadow: 0px 0px 0px calc(var(--mrk-prevMarginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * markVarDefs.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --mrk-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(mark, .mark) {
 *     ............
 *     opacity: var(--mrk-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * markVarDefs.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --mrk-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete markVarDefs.fontWeightCustom;
 * markVarDefs.fontWeightCustom = null;
 * markVarDefs.fontWeightCustom = undefined;
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
 *     --mrk-backgroundColor: var(--col-warningMild);
 *     --mrk-color: var(--col-warningText);
 *     --mrk-borderStyle: var(--bor-style);
 *     --mrk-borderWidth: var(--bor-defaultWidth);
 *     --mrk-borderColor: var(--col-warningThin);
 *     --mrk-borderRadius: var(--bor-r-sm);
 *     --mrk-prevMarginInlineStart: 0.25em;
 *     --mrk-nextMarginInlineEnd: 0.25em;
 *     --mrk-marginBlockStart: 0em;
 *     --mrk-marginBlockEnd: 0em;
 *     --mrk-paddingInlineStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingInlineEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-fontWeightCustom: 900;
 *     --mrk-boxShadow: 0px 0px 0px calc(var(--mrk-prevMarginInlineStart) / 4) gray;
 *     --mrk-opacity: 0.5;
 *     --mrk-booh: 1234;
 * }
 * ```
 */
export const markVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * markVarOptions.prefix = 'mrk';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * markVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * markVarOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Mark typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --mrk-backgroundColor: var(--col-warningMild);
 *     --mrk-color: var(--col-warningText);
 *     --mrk-borderStyle: var(--bor-style);
 *     --mrk-borderWidth: var(--bor-defaultWidth);
 *     --mrk-borderColor: var(--col-warningThin);
 *     --mrk-borderRadius: var(--bor-r-sm);
 *     --mrk-prevMarginInlineStart: 0.25em;
 *     --mrk-nextMarginInlineEnd: 0.25em;
 *     --mrk-marginBlockStart: 0em;
 *     --mrk-marginBlockEnd: 0em;
 *     --mrk-paddingInlineStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingInlineEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 * }
 * ```
 */
export const markVarOptions = config[2];



export {
    markVars as default, // Default export for simplified imports.
}
