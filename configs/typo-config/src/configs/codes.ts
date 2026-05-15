// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultCodeConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Configs:
import {
    colorConfigVars,
}                           from '@reusable-ui/color-config'        // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
import {
    typoConfigVars,
}                           from './typography.js'
import {
    markConfigVars,
}                           from './marks.js'



// Configs:

const config = cssConfig(() => {
    return {
        // Backgrounds:
        
        /**
         * Defines the **background color** for `<code>` elements.
         * Typically uses a **secondary mild color** (`secondaryMild`) for emphasis.
         */
        backgroundColor        : colorConfigVars.secondaryMild                              as CssKnownProps['backgroundColor'   ],
        
        
        
        // Foregrounds:
        
        /**
         * Defines the **text color** for `<code>` elements.
         * Typically uses a **secondary text color** (`secondaryText`) for readability.
         */
        color                  : colorConfigVars.secondaryText                              as CssKnownProps['color'             ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for `<code>` elements.
         * Typically uses the default border style for consistency.
         */
        borderStyle            : markConfigVars.borderStyle                                 as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for `<code>` elements.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth            : markConfigVars.borderWidth                                 as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for `<code>` elements.
         * Typically uses a **secondary thin color** (`secondaryThin`) for subtle emphasis.
         */
        borderColor            : colorConfigVars.secondaryThin                              as CssKnownProps['borderColor'       ],
        
        /**
         * Defines the **border radius** for `<code>` elements.
         * Typically uses a **small radius** (`sm`) to create softened edges.
         */
        borderRadius           : markConfigVars.borderRadius                                as CssKnownProps['borderRadius'      ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** when a `<code>` element follows another highlight-based element.
         * Implemented using adjacent sibling selector.
         * Ensures structured horizontal spacing.
         */
        marginInlineStart      : markConfigVars.marginInlineStart                           as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** when a `<code>` element precedes another highlight-based element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginInlineEnd        : markConfigVars.marginInlineEnd                             as CssKnownProps['marginInlineEnd'   ],
        
        /**
         * Defines the **top margin** for `<code>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockStart       : markConfigVars.marginBlockStart                            as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** for `<code>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockEnd         : markConfigVars.marginBlockEnd                              as CssKnownProps['marginBlockEnd'    ],
        
        
        /**
         * Defines **left padding** inside `<code>` elements.
         * Adds breathing room between the **text and left boundary**.
         */
        paddingInlineStart     : markConfigVars.paddingInlineStart                          as CssKnownProps['paddingInlineStart'],
        
        /**
         * Defines **right padding** inside `<code>` elements.
         * Adds breathing room between the **text and right boundary**.
         */
        paddingInlineEnd       : markConfigVars.paddingInlineEnd                            as CssKnownProps['paddingInlineEnd'  ],
        
        /**
         * Defines **top padding** inside `<code>` elements.
         * Adds breathing room between the **text and top boundary**.
         */
        paddingBlockStart      : markConfigVars.paddingBlockStart                           as CssKnownProps['paddingBlockStart' ],
        
        /**
         * Defines **bottom padding** inside `<code>` elements.
         * Adds breathing room between the **text and bottom boundary**.
         */
        paddingBlockEnd        : markConfigVars.paddingBlockEnd                             as CssKnownProps['paddingBlockEnd'   ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for `<code>` elements.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize               : markConfigVars.fontSize                                    as CssKnownProps['fontSize'          ],
        
        /**
         * Defines the **font family** for `<code>` elements.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily             : typoConfigVars.fontFamilyMonospace                         as CssKnownProps['fontFamily'        ],
        
        /**
         * Defines the **font weight** for `<code>` elements.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight             : markConfigVars.fontWeight                                  as CssKnownProps['fontWeight'        ],
        
        /**
         * Defines the **font style** for `<code>` elements (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle              : markConfigVars.fontStyle                                   as CssKnownProps['fontStyle'         ],
        
        /**
         * Defines the **text decoration** for `<code>` elements.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration         : markConfigVars.textDecoration                              as CssKnownProps['textDecoration'    ],
        
        /**
         * Defines the **line height** for `<code>` elements.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight             : markConfigVars.lineHeight                                  as CssKnownProps['lineHeight'        ],
    };
}, { prefix: defaultCodeConfigPrefix });

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
 * const value = codeConfigVars.marginInlineStart; // Resolves to "var(--code-marginInlineStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * codeConfigVars.fontWeightCustom = 900; // Generates "--code-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * codeConfigVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", codeConfigVars.marginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--code-boxShadow: 0px 0px 0px calc(var(--code-marginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * codeConfigVars.opacity = 0.5;
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
 * codeConfigVars.booh = 1234;
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
 * delete codeConfigVars.fontWeightCustom;
 * codeConfigVars.fontWeightCustom = null;
 * codeConfigVars.fontWeightCustom = undefined;
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
export const codeConfigVars        = config[0]; // eslint-disable-line css-variables/enforce-variable-conventions

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
 * const expression = codeConfigExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--code-marginInlineStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * codeConfigExpressions.fontWeightCustom = 900; // Generates "--code-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * codeConfigExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", codeConfigVars.marginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--code-boxShadow: 0px 0px 0px calc(var(--code-marginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * codeConfigExpressions.opacity = 0.5;
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
 * codeConfigExpressions.booh = 1234;
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
 * delete codeConfigExpressions.fontWeightCustom;
 * codeConfigExpressions.fontWeightCustom = null;
 * codeConfigExpressions.fontWeightCustom = undefined;
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
export const codeConfigExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * codeConfigOptions.prefix = 'code';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * codeConfigOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * codeConfigOptions.onChange.subscribe({
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
export const codeConfigOptions     = config[2];



export {
    codeConfigVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `codeConfigVars` instead.
 */
export const codes         = codeConfigVars;

/**
 * @deprecated Use `codeConfigExpressions` instead.
 */
export const codeValues    = codeConfigExpressions;

/**
 * @deprecated Use `codeConfigOptions` instead.
 */
export const cssCodeConfig = codeConfigOptions;
