// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Configs:
import {
    colorVars,
}                           from '@reusable-ui/colors'  // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
import {
    typoVars,
}                           from './typography.js'
import {
    markVars,
}                           from './marks.js'



// Configs:

const config = cssConfig(() => {
    return {
        // Backgrounds:
        
        /**
         * Defines the **background color** for `<code>` elements.
         * Typically uses a **secondary mild color** (`secondaryMild`) for emphasis.
         */
        backgroundColor        : colorVars.secondaryMild                                    as CssKnownProps['backgroundColor'   ],
        
        
        
        // Foregrounds:
        
        /**
         * Defines the **text color** for `<code>` elements.
         * Typically uses a **secondary text color** (`secondaryText`) for readability.
         */
        color                  : colorVars.secondaryText                                    as CssKnownProps['color'             ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for `<code>` elements.
         * Typically uses the default border style for consistency.
         */
        borderStyle            : markVars.borderStyle                                       as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for `<code>` elements.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth            : markVars.borderWidth                                       as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for `<code>` elements.
         * Typically uses a **secondary thin color** (`secondaryThin`) for subtle emphasis.
         */
        borderColor            : colorVars.secondaryThin                                    as CssKnownProps['borderColor'       ],
        
        /**
         * Defines the **border radius** for `<code>` elements.
         * Typically uses a **small radius** (`sm`) to create softened edges.
         */
        borderRadius           : markVars.borderRadius                                      as CssKnownProps['borderRadius'      ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** when a `<code>` element follows another highlight-based element.
         * Implemented using adjacent sibling selector.
         * Ensures structured horizontal spacing.
         */
        marginInlineStart      : markVars.marginInlineStart                                 as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** when a `<code>` element precedes another highlight-based element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginInlineEnd        : markVars.marginInlineEnd                                   as CssKnownProps['marginInlineEnd'   ],
        
        /**
         * Defines the **top margin** for `<code>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockStart       : markVars.marginBlockStart                                  as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** for `<code>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockEnd         : markVars.marginBlockEnd                                    as CssKnownProps['marginBlockEnd'    ],
        
        
        /**
         * Defines **left padding** inside `<code>` elements.
         * Adds breathing room between the **text and left boundary**.
         */
        paddingInlineStart     : markVars.paddingInlineStart                                as CssKnownProps['paddingInlineStart'],
        
        /**
         * Defines **right padding** inside `<code>` elements.
         * Adds breathing room between the **text and right boundary**.
         */
        paddingInlineEnd       : markVars.paddingInlineEnd                                  as CssKnownProps['paddingInlineEnd'  ],
        
        /**
         * Defines **top padding** inside `<code>` elements.
         * Adds breathing room between the **text and top boundary**.
         */
        paddingBlockStart      : markVars.paddingBlockStart                                 as CssKnownProps['paddingBlockStart' ],
        
        /**
         * Defines **bottom padding** inside `<code>` elements.
         * Adds breathing room between the **text and bottom boundary**.
         */
        paddingBlockEnd        : markVars.paddingBlockEnd                                   as CssKnownProps['paddingBlockEnd'   ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for `<code>` elements.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize               : markVars.fontSize                                          as CssKnownProps['fontSize'          ],
        
        /**
         * Defines the **font family** for `<code>` elements.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily             : typoVars.fontFamilyMonospace                               as CssKnownProps['fontFamily'        ],
        
        /**
         * Defines the **font weight** for `<code>` elements.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight             : markVars.fontWeight                                        as CssKnownProps['fontWeight'        ],
        
        /**
         * Defines the **font style** for `<code>` elements (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle              : markVars.fontStyle                                         as CssKnownProps['fontStyle'         ],
        
        /**
         * Defines the **text decoration** for `<code>` elements.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration         : markVars.textDecoration                                    as CssKnownProps['textDecoration'    ],
        
        /**
         * Defines the **line height** for `<code>` elements.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight             : markVars.lineHeight                                        as CssKnownProps['lineHeight'        ],
    };
}, { prefix: 'code' });

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
 * const value = codeVars.marginInlineStart; // Resolves to "var(--code-marginInlineStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * codeVars.fontWeightCustom = 900; // Generates "--code-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * codeVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", codeVars.marginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--code-boxShadow: 0px 0px 0px calc(var(--code-marginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * codeVars.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --code-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(code, .code) {
 *     ............
 *     opacity: var(--code-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * codeVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --code-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete codeVars.fontWeightCustom;
 * codeVars.fontWeightCustom = null;
 * codeVars.fontWeightCustom = undefined;
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
 *     --code-backgroundColor: var(--col-secondaryMild);
 *     --code-color: var(--col-secondaryText);
 *     --code-borderStyle: var(--mrk-borderStyle);
 *     --code-borderWidth: var(--mrk-borderWidth);
 *     --code-borderColor: var(--col-secondaryThin);
 *     --code-borderRadius: var(--mrk-borderRadius);
 *     --code-marginInlineStart: var(--mrk-marginInlineStart);
 *     --code-marginInlineEnd: var(--mrk-marginInlineEnd);
 *     --code-marginBlockStart: var(--mrk-marginBlockStart);
 *     --code-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --code-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --code-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --code-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --code-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 *     --code-fontFamily: var(--typ-fontFamilyMonospace);
 *     --code-fontWeightCustom: 900;
 *     --code-boxShadow: 0px 0px 0px calc(var(--code-marginInlineStart) / 4) gray;
 *     --code-opacity: 0.5;
 *     --code-booh: 1234;
 * }
 * ```
 */
export const codeVars        = config[0];

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
 * const expression = codeExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--code-marginInlineStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * codeExpressions.fontWeightCustom = 900; // Generates "--code-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * codeExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", codeVars.marginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--code-boxShadow: 0px 0px 0px calc(var(--code-marginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * codeExpressions.opacity = 0.5;
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --code-opacity: 0.5;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(code, .code) {
 *     ............
 *     opacity: var(--code-opacity);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * codeExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --code-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete codeExpressions.fontWeightCustom;
 * codeExpressions.fontWeightCustom = null;
 * codeExpressions.fontWeightCustom = undefined;
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
 *     --code-backgroundColor: var(--col-secondaryMild);
 *     --code-color: var(--col-secondaryText);
 *     --code-borderStyle: var(--mrk-borderStyle);
 *     --code-borderWidth: var(--mrk-borderWidth);
 *     --code-borderColor: var(--col-secondaryThin);
 *     --code-borderRadius: var(--mrk-borderRadius);
 *     --code-marginInlineStart: var(--mrk-marginInlineStart);
 *     --code-marginInlineEnd: var(--mrk-marginInlineEnd);
 *     --code-marginBlockStart: var(--mrk-marginBlockStart);
 *     --code-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --code-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --code-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --code-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --code-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 *     --code-fontFamily: var(--typ-fontFamilyMonospace);
 *     --code-fontWeightCustom: 900;
 *     --code-boxShadow: 0px 0px 0px calc(var(--code-marginInlineStart) / 4) gray;
 *     --code-opacity: 0.5;
 *     --code-booh: 1234;
 * }
 * ```
 */
export const codeExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * codeConfig.prefix = 'code';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * codeConfig.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * codeConfig.onChange.subscribe({
 *     next: () => {
 *         console.log("Code typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --code-backgroundColor: var(--col-secondaryMild);
 *     --code-color: var(--col-secondaryText);
 *     --code-borderStyle: var(--mrk-borderStyle);
 *     --code-borderWidth: var(--mrk-borderWidth);
 *     --code-borderColor: var(--col-secondaryThin);
 *     --code-borderRadius: var(--mrk-borderRadius);
 *     --code-marginInlineStart: var(--mrk-marginInlineStart);
 *     --code-marginInlineEnd: var(--mrk-marginInlineEnd);
 *     --code-marginBlockStart: var(--mrk-marginBlockStart);
 *     --code-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --code-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --code-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --code-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --code-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 *     --code-fontFamily: var(--typ-fontFamilyMonospace);
 * }
 * ```
 */
export const codeConfig      = config[2];



export {
    codeVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `codeVars` instead.
 */
export const codes         = codeVars;

/**
 * @deprecated Use `codeExpressions` instead.
 */
export const codeValues    = codeExpressions;

/**
 * @deprecated Use `codeConfig` instead.
 */
export const cssCodeConfig = codeConfig;
