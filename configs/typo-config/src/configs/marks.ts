// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Configs:
import {
    colorConfigVars,
}                           from '@reusable-ui/color-config'    // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
import {
    borderConfigVars,
    borderRadiusConfigVars,
}                           from '@reusable-ui/border-config'   // A flexible and themeable border management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.



// Configs:

const config = cssConfig(() => {
    return {
        // Backgrounds:
        
        /**
         * Defines the **background color** for `<mark>` elements.
         * Typically uses a **highlight mild color** (`warningMild`) for emphasis.
         */
        backgroundColor        : colorConfigVars.warningMild                                    as CssKnownProps['backgroundColor'   ],
        
        
        
        // Foregrounds:
        
        /**
         * Defines the **text color** for `<mark>` elements.
         * Typically uses a **highlight text color** (`warningText`) for readability.
         */
        color                  : colorConfigVars.warningText                                    as CssKnownProps['color'             ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for `<mark>` elements.
         * Typically uses the default border style for consistency.
         */
        borderStyle            : borderConfigVars.style                                         as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for `<mark>` elements.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth            : borderConfigVars.defaultWidth                                  as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for `<mark>` elements.
         * Typically uses a **highlight thin color** (`warningThin`) for subtle emphasis.
         */
        borderColor            : colorConfigVars.warningThin                                    as CssKnownProps['borderColor'       ],
        
        /**
         * Defines the **border radius** for `<mark>` elements.
         * Typically uses a **small radius** (`sm`) to create softened edges.
         */
        borderRadius           : borderRadiusConfigVars.sm                                      as CssKnownProps['borderRadius'      ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** when a `<mark>` element follows another highlight-based element.
         * Implemented using adjacent sibling selector.
         * Ensures structured horizontal spacing.
         */
        marginInlineStart      : '0.25em'                                                       as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** when a `<mark>` element precedes another highlight-based element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginInlineEnd        : '0.25em'                                                       as CssKnownProps['marginInlineEnd'   ],
        
        /**
         * Defines the **top margin** for `<mark>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockStart       : '0em'                                                          as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** for `<mark>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockEnd         : '0em'                                                          as CssKnownProps['marginBlockEnd'    ],
        
        
        /**
         * Defines **left padding** inside `<mark>` elements.
         * Adds breathing room between the **text and left boundary**.
         */
        paddingInlineStart     : `calc(((1lh - 1em) / 2) - ${borderConfigVars.defaultWidth})`   as CssKnownProps['paddingInlineStart'],
        
        /**
         * Defines **right padding** inside `<mark>` elements.
         * Adds breathing room between the **text and right boundary**.
         */
        paddingInlineEnd       : `calc(((1lh - 1em) / 2) - ${borderConfigVars.defaultWidth})`   as CssKnownProps['paddingInlineEnd'  ],
        
        /**
         * Defines **top padding** inside `<mark>` elements.
         * Adds breathing room between the **text and top boundary**.
         */
        paddingBlockStart      : `calc(((1lh - 1em) / 2) - ${borderConfigVars.defaultWidth})`   as CssKnownProps['paddingBlockStart' ],
        
        /**
         * Defines **bottom padding** inside `<mark>` elements.
         * Adds breathing room between the **text and bottom boundary**.
         */
        paddingBlockEnd        : `calc(((1lh - 1em) / 2) - ${borderConfigVars.defaultWidth})`   as CssKnownProps['paddingBlockEnd'   ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for `<mark>` elements.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize               : undefined                                                      as CssKnownProps['fontSize'          ],
        
        /**
         * Defines the **font family** for `<mark>` elements.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily             : undefined                                                      as CssKnownProps['fontFamily'        ],
        
        /**
         * Defines the **font weight** for `<mark>` elements.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight             : undefined                                                      as CssKnownProps['fontWeight'        ],
        
        /**
         * Defines the **font style** for `<mark>` elements (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle              : undefined                                                      as CssKnownProps['fontStyle'         ],
        
        /**
         * Defines the **text decoration** for `<mark>` elements.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration         : undefined                                                      as CssKnownProps['textDecoration'    ],
        
        /**
         * Defines the **line height** for `<mark>` elements.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight             : undefined                                                      as CssKnownProps['lineHeight'        ],
    };
}, { prefix: 'mrk' });

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
 * const value = markConfigVars.marginInlineStart; // Resolves to "var(--mrk-marginInlineStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * markConfigVars.fontWeightCustom = 900; // Generates "--mrk-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * markConfigVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", markConfigVars.marginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--mrk-boxShadow: 0px 0px 0px calc(var(--mrk-marginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * markConfigVars.opacity = 0.5;
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
 * markConfigVars.booh = 1234;
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
 * delete markConfigVars.fontWeightCustom;
 * markConfigVars.fontWeightCustom = null;
 * markConfigVars.fontWeightCustom = undefined;
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
 *     --mrk-backgroundColor: var(--col-warningMild);
 *     --mrk-color: var(--col-warningText);
 *     --mrk-borderStyle: var(--bor-style);
 *     --mrk-borderWidth: var(--bor-defaultWidth);
 *     --mrk-borderColor: var(--col-warningThin);
 *     --mrk-borderRadius: var(--bor-r-sm);
 *     --mrk-marginInlineStart: 0.25em;
 *     --mrk-marginInlineEnd: 0.25em;
 *     --mrk-marginBlockStart: 0em;
 *     --mrk-marginBlockEnd: 0em;
 *     --mrk-paddingInlineStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingInlineEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-fontWeightCustom: 900;
 *     --mrk-boxShadow: 0px 0px 0px calc(var(--mrk-marginInlineStart) / 4) gray;
 *     --mrk-opacity: 0.5;
 *     --mrk-booh: 1234;
 * }
 * ```
 */
export const markConfigVars        = config[0]; // eslint-disable-line css-variables/enforce-variable-conventions

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
 * const expression = markConfigExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--mrk-marginInlineStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * markConfigExpressions.fontWeightCustom = 900; // Generates "--mrk-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * markConfigExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", markConfigVars.marginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--mrk-boxShadow: 0px 0px 0px calc(var(--mrk-marginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * markConfigExpressions.opacity = 0.5;
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
 * markConfigExpressions.booh = 1234;
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
 * delete markConfigExpressions.fontWeightCustom;
 * markConfigExpressions.fontWeightCustom = null;
 * markConfigExpressions.fontWeightCustom = undefined;
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
 *     --mrk-backgroundColor: var(--col-warningMild);
 *     --mrk-color: var(--col-warningText);
 *     --mrk-borderStyle: var(--bor-style);
 *     --mrk-borderWidth: var(--bor-defaultWidth);
 *     --mrk-borderColor: var(--col-warningThin);
 *     --mrk-borderRadius: var(--bor-r-sm);
 *     --mrk-marginInlineStart: 0.25em;
 *     --mrk-marginInlineEnd: 0.25em;
 *     --mrk-marginBlockStart: 0em;
 *     --mrk-marginBlockEnd: 0em;
 *     --mrk-paddingInlineStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingInlineEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-fontWeightCustom: 900;
 *     --mrk-boxShadow: 0px 0px 0px calc(var(--mrk-marginInlineStart) / 4) gray;
 *     --mrk-opacity: 0.5;
 *     --mrk-booh: 1234;
 * }
 * ```
 */
export const markConfigExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * markConfigOptions.prefix = 'mrk';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * markConfigOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * markConfigOptions.onChange.subscribe({
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
 *     --mrk-marginInlineStart: 0.25em;
 *     --mrk-marginInlineEnd: 0.25em;
 *     --mrk-marginBlockStart: 0em;
 *     --mrk-marginBlockEnd: 0em;
 *     --mrk-paddingInlineStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingInlineEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockStart: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 *     --mrk-paddingBlockEnd: calc(((1lh - 1em) / 2) - var(--bor-defaultWidth));
 * }
 * ```
 */
export const markConfigOptions     = config[2];



export {
    markConfigVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `markConfigVars` instead.
 */
export const marks         = markConfigVars;

/**
 * @deprecated Use `markConfigExpressions` instead.
 */
export const markValues    = markConfigExpressions;

/**
 * @deprecated Use `markConfigOptions` instead.
 */
export const cssMarkConfig = markConfigOptions;
