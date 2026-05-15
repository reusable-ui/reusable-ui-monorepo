// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultKbdConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Configs:
import {
    colorConfigVars,
}                           from '@reusable-ui/color-config'        // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
import {
    markConfigVars,
}                           from './marks.js'



// Configs:

const config = cssConfig(() => {
    return {
        // Backgrounds:
        
        /**
         * Defines the **background color** for `<kbd>` elements.
         * Typically uses a **primary base color** (`primaryBase`) for emphasis.
         */
        backgroundColor        : colorConfigVars.primaryBase                                as CssKnownProps['backgroundColor'   ],
        
        
        
        // Foregrounds:
        
        /**
         * Defines the **text color** for `<kbd>` elements.
         * Typically uses a **primary contrasting color** (`primaryFlip`) for readability.
         */
        color                  : colorConfigVars.primaryFlip                                as CssKnownProps['color'             ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for `<kbd>` elements.
         * Typically uses the default border style for consistency.
         */
        borderStyle            : markConfigVars.borderStyle                                 as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for `<kbd>` elements.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth            : markConfigVars.borderWidth                                 as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for `<kbd>` elements.
         * Typically uses a **primary bold color** (`primaryBold`) for subtle emphasis.
         */
        borderColor            : colorConfigVars.primaryBold                                as CssKnownProps['borderColor'       ],
        
        /**
         * Defines the **border radius** for `<kbd>` elements.
         * Typically uses a **small radius** (`sm`) to create softened edges.
         */
        borderRadius           : markConfigVars.borderRadius                                as CssKnownProps['borderRadius'      ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** when a `<kbd>` element follows another highlight-based element.
         * Implemented using adjacent sibling selector.
         * Ensures structured horizontal spacing.
         */
        marginInlineStart      : markConfigVars.marginInlineStart                           as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** when a `<kbd>` element precedes another highlight-based element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginInlineEnd        : markConfigVars.marginInlineEnd                             as CssKnownProps['marginInlineEnd'   ],
        
        /**
         * Defines the **top margin** for `<kbd>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockStart       : markConfigVars.marginBlockStart                            as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** for `<kbd>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockEnd         : markConfigVars.marginBlockEnd                              as CssKnownProps['marginBlockEnd'    ],
        
        
        /**
         * Defines **left padding** inside `<kbd>` elements.
         * Adds breathing room between the **text and left boundary**.
         */
        paddingInlineStart     : markConfigVars.paddingInlineStart                          as CssKnownProps['paddingInlineStart'],
        
        /**
         * Defines **right padding** inside `<kbd>` elements.
         * Adds breathing room between the **text and right boundary**.
         */
        paddingInlineEnd       : markConfigVars.paddingInlineEnd                            as CssKnownProps['paddingInlineEnd'  ],
        
        /**
         * Defines **top padding** inside `<kbd>` elements.
         * Adds breathing room between the **text and top boundary**.
         */
        paddingBlockStart      : markConfigVars.paddingBlockStart                           as CssKnownProps['paddingBlockStart' ],
        
        /**
         * Defines **bottom padding** inside `<kbd>` elements.
         * Adds breathing room between the **text and bottom boundary**.
         */
        paddingBlockEnd        : markConfigVars.paddingBlockEnd                             as CssKnownProps['paddingBlockEnd'   ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for `<kbd>` elements.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize               : markConfigVars.fontSize                                    as CssKnownProps['fontSize'          ],
        
        /**
         * Defines the **font family** for `<kbd>` elements.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily             : markConfigVars.fontFamily                                  as CssKnownProps['fontFamily'        ],
        
        /**
         * Defines the **font weight** for `<kbd>` elements.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight             : markConfigVars.fontWeight                                  as CssKnownProps['fontWeight'        ],
        
        /**
         * Defines the **font style** for `<kbd>` elements (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle              : markConfigVars.fontStyle                                   as CssKnownProps['fontStyle'         ],
        
        /**
         * Defines the **text decoration** for `<kbd>` elements.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration         : markConfigVars.textDecoration                              as CssKnownProps['textDecoration'    ],
        
        /**
         * Defines the **line height** for `<kbd>` elements.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight             : markConfigVars.lineHeight                                  as CssKnownProps['lineHeight'        ],
    };
}, { prefix: defaultKbdConfigPrefix });

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
 * const value = kbdConfigVars.marginInlineStart; // Resolves to "var(--kbd-marginInlineStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * kbdConfigVars.fontWeightCustom = 900; // Generates "--kbd-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * kbdConfigVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", kbdConfigVars.marginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--kbd-boxShadow: 0px 0px 0px calc(var(--kbd-marginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * kbdConfigVars.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --kbd-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(kbd, .kbd) {
 *     ............
 *     opacity: var(--kbd-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * kbdConfigVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --kbd-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete kbdConfigVars.fontWeightCustom;
 * kbdConfigVars.fontWeightCustom = null;
 * kbdConfigVars.fontWeightCustom = undefined;
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
 *     --kbd-backgroundColor: var(--col-primaryBase);
 *     --kbd-color: var(--col-primaryFlip);
 *     --kbd-borderStyle: var(--mrk-borderStyle);
 *     --kbd-borderWidth: var(--mrk-borderWidth);
 *     --kbd-borderColor: var(--col-primaryBold);
 *     --kbd-borderRadius: var(--mrk-borderRadius);
 *     --kbd-marginInlineStart: var(--mrk-marginInlineStart);
 *     --kbd-marginInlineEnd: var(--mrk-marginInlineEnd);
 *     --kbd-marginBlockStart: var(--mrk-marginBlockStart);
 *     --kbd-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --kbd-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --kbd-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --kbd-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --kbd-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 *     --kbd-fontWeightCustom: 900;
 *     --kbd-boxShadow: 0px 0px 0px calc(var(--kbd-marginInlineStart) / 4) gray;
 *     --kbd-opacity: 0.5;
 *     --kbd-booh: 1234;
 * }
 * ```
 */
export const kbdConfigVars        = config[0]; // eslint-disable-line css-variables/enforce-variable-conventions

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
 * const expression = kbdConfigExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--kbd-marginInlineStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * kbdConfigExpressions.fontWeightCustom = 900; // Generates "--kbd-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * kbdConfigExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", kbdConfigVars.marginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--kbd-boxShadow: 0px 0px 0px calc(var(--kbd-marginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * kbdConfigExpressions.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --kbd-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(kbd, .kbd) {
 *     ............
 *     opacity: var(--kbd-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * kbdConfigExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --kbd-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete kbdConfigExpressions.fontWeightCustom;
 * kbdConfigExpressions.fontWeightCustom = null;
 * kbdConfigExpressions.fontWeightCustom = undefined;
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
 *     --kbd-backgroundColor: var(--col-primaryBase);
 *     --kbd-color: var(--col-primaryFlip);
 *     --kbd-borderStyle: var(--mrk-borderStyle);
 *     --kbd-borderWidth: var(--mrk-borderWidth);
 *     --kbd-borderColor: var(--col-primaryBold);
 *     --kbd-borderRadius: var(--mrk-borderRadius);
 *     --kbd-marginInlineStart: var(--mrk-marginInlineStart);
 *     --kbd-marginInlineEnd: var(--mrk-marginInlineEnd);
 *     --kbd-marginBlockStart: var(--mrk-marginBlockStart);
 *     --kbd-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --kbd-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --kbd-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --kbd-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --kbd-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 *     --kbd-fontWeightCustom: 900;
 *     --kbd-boxShadow: 0px 0px 0px calc(var(--kbd-marginInlineStart) / 4) gray;
 *     --kbd-opacity: 0.5;
 *     --kbd-booh: 1234;
 * }
 * ```
 */
export const kbdConfigExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * kbdConfigOptions.prefix = 'kbd';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * kbdConfigOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * kbdConfigOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Kbd typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --kbd-backgroundColor: var(--col-primaryBase);
 *     --kbd-color: var(--col-primaryFlip);
 *     --kbd-borderStyle: var(--mrk-borderStyle);
 *     --kbd-borderWidth: var(--mrk-borderWidth);
 *     --kbd-borderColor: var(--col-primaryBold);
 *     --kbd-borderRadius: var(--mrk-borderRadius);
 *     --kbd-marginInlineStart: var(--mrk-marginInlineStart);
 *     --kbd-marginInlineEnd: var(--mrk-marginInlineEnd);
 *     --kbd-marginBlockStart: var(--mrk-marginBlockStart);
 *     --kbd-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --kbd-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --kbd-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --kbd-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --kbd-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 * }
 * ```
 */
export const kbdConfigOptions     = config[2];



export {
    kbdConfigVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `kbdConfigVars` instead.
 */
export const kbds         = kbdConfigVars;

/**
 * @deprecated Use `kbdConfigExpressions` instead.
 */
export const kbdValues    = kbdConfigExpressions;

/**
 * @deprecated Use `kbdConfigOptions` instead.
 */
export const cssKbdConfig = kbdConfigOptions;
