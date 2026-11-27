// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultKbdPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Configs:
import {
    colorConfigVars,
}                           from '@reusable-ui/color-config'        // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
import {
    markVars,
}                           from './css-mark-config.js'



// Configs:

const config = cssConfig(() => {
    /**
     * Defines static spacing properties.
     */
    const staticSpacingProperties = {
        // Spacings:
        
        /**
         * Defines the **top margin** for `<kbd>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockStart      : markVars.marginBlockStart           as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** for `<kbd>` elements.
         * Typically `0em` to maintain alignment within inline text flow.
         */
        marginBlockEnd        : markVars.marginBlockEnd             as CssKnownProps['marginBlockEnd'    ],
        
        
        /**
         * Defines **left padding** inside `<kbd>` elements.
         * Adds breathing room between the **text and left boundary**.
         */
        paddingInlineStart    : markVars.paddingInlineStart         as CssKnownProps['paddingInlineStart'],
        
        /**
         * Defines **right padding** inside `<kbd>` elements.
         * Adds breathing room between the **text and right boundary**.
         */
        paddingInlineEnd      : markVars.paddingInlineEnd           as CssKnownProps['paddingInlineEnd'  ],
        
        /**
         * Defines **top padding** inside `<kbd>` elements.
         * Adds breathing room between the **text and top boundary**.
         */
        paddingBlockStart     : markVars.paddingBlockStart          as CssKnownProps['paddingBlockStart' ],
        
        /**
         * Defines **bottom padding** inside `<kbd>` elements.
         * Adds breathing room between the **text and bottom boundary**.
         */
        paddingBlockEnd       : markVars.paddingBlockEnd            as CssKnownProps['paddingBlockEnd'   ],
    };
    
    
    
    /**
     * Defines static kbd properties such as font sizes, families, weights, and styles.
     */
    const staticKbdProperties = {
        // Backgrounds:
        
        /**
         * Defines the **background color** for `<kbd>` elements.
         * Typically uses a **primary base color** (`primaryBase`) for emphasis.
         */
        backgroundColor       : colorConfigVars.primaryBase         as CssKnownProps['backgroundColor'   ],
        
        
        
        // Foregrounds:
        
        /**
         * Defines the **text color** for `<kbd>` elements.
         * Typically uses a **primary contrasting color** (`primaryFlip`) for readability.
         */
        color                 : colorConfigVars.primaryFlip         as CssKnownProps['color'             ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for `<kbd>` elements.
         * Typically uses the default border style for consistency.
         */
        borderStyle           : markVars.borderStyle                as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for `<kbd>` elements.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth           : markVars.borderWidth                as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for `<kbd>` elements.
         * Typically uses a **primary bold color** (`primaryBold`) for subtle emphasis.
         */
        borderColor           : colorConfigVars.primaryBold         as CssKnownProps['borderColor'       ],
        
        /**
         * Defines the **border radius** for `<kbd>` elements.
         * Typically uses a **small radius** (`sm`) to create softened edges.
         */
        borderRadius          : markVars.borderRadius               as CssKnownProps['borderRadius'      ],
        
        
        
        // Typos:
        
        /**
         * Defines the **font size** for `<kbd>` elements.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize              : markVars.fontSize                   as CssKnownProps['fontSize'          ],
        
        /**
         * Defines the **font family** for `<kbd>` elements.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily            : markVars.fontFamily                 as CssKnownProps['fontFamily'        ],
        
        /**
         * Defines the **font weight** for `<kbd>` elements.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight            : markVars.fontWeight                 as CssKnownProps['fontWeight'        ],
        
        /**
         * Defines the **font style** for `<kbd>` elements (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle             : markVars.fontStyle                  as CssKnownProps['fontStyle'         ],
        
        /**
         * Defines the **text decoration** for `<kbd>` elements.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration        : markVars.textDecoration             as CssKnownProps['textDecoration'    ],
        
        /**
         * Defines the **line height** for `<kbd>` elements.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight            : markVars.lineHeight                 as CssKnownProps['lineHeight'        ],
    };
    
    
    
    /**
     * Defines static conditional sibling adjacency properties.
     */
    const staticSiblingAdjacencyProperties = {
        // Spacings:
        
        /**
         * Defines the **left margin** when a `<kbd>` element follows another highlight-based element.
         * Implemented using adjacent sibling selector.
         * Ensures structured horizontal spacing.
         */
        prevMarginInlineStart : markVars.prevMarginInlineStart      as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** when a `<kbd>` element precedes another highlight-based element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        nextMarginInlineEnd   : markVars.nextMarginInlineEnd        as CssKnownProps['marginInlineEnd'   ],
    };
    
    
    
    // Merge all properties:
    return {
        ...staticSpacingProperties,
        ...staticKbdProperties,
        ...staticSiblingAdjacencyProperties,
    };
}, { prefix: defaultKbdPrefix });

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
 * const value = kbdVars.prevMarginInlineStart; // Resolves to "var(--kbd-prevMarginInlineStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * kbdVars.fontWeightCustom = 900; // Generates "--kbd-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * kbdVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", kbdVars.prevMarginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--kbd-boxShadow: 0px 0px 0px calc(var(--kbd-prevMarginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * kbdVars.opacity = 0.5;
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
 * kbdVars.booh = 1234;
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
 * delete kbdVars.fontWeightCustom;
 * kbdVars.fontWeightCustom = null;
 * kbdVars.fontWeightCustom = undefined;
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
 *     --kbd-backgroundColor: var(--col-primaryBase);
 *     --kbd-color: var(--col-primaryFlip);
 *     --kbd-borderStyle: var(--mrk-borderStyle);
 *     --kbd-borderWidth: var(--mrk-borderWidth);
 *     --kbd-borderColor: var(--col-primaryBold);
 *     --kbd-borderRadius: var(--mrk-borderRadius);
 *     --kbd-prevMarginInlineStart: var(--mrk-prevMarginInlineStart);
 *     --kbd-nextMarginInlineEnd: var(--mrk-nextMarginInlineEnd);
 *     --kbd-marginBlockStart: var(--mrk-marginBlockStart);
 *     --kbd-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --kbd-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --kbd-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --kbd-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --kbd-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 *     --kbd-fontWeightCustom: 900;
 *     --kbd-boxShadow: 0px 0px 0px calc(var(--kbd-prevMarginInlineStart) / 4) gray;
 *     --kbd-opacity: 0.5;
 *     --kbd-booh: 1234;
 * }
 * ```
 */
export const kbdVars       = config[0];

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
 * const definition = kbdVarDefs.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--kbd-prevMarginInlineStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * kbdVarDefs.fontWeightCustom = 900; // Generates "--kbd-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * kbdVarDefs.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", kbdVars.prevMarginInlineStart, " / 4)", "gray"
 * ]]; // Generates "--kbd-boxShadow: 0px 0px 0px calc(var(--kbd-prevMarginInlineStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * kbdVarDefs.opacity = 0.5;
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
 * kbdVarDefs.booh = 1234;
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
 * delete kbdVarDefs.fontWeightCustom;
 * kbdVarDefs.fontWeightCustom = null;
 * kbdVarDefs.fontWeightCustom = undefined;
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
 *     --kbd-backgroundColor: var(--col-primaryBase);
 *     --kbd-color: var(--col-primaryFlip);
 *     --kbd-borderStyle: var(--mrk-borderStyle);
 *     --kbd-borderWidth: var(--mrk-borderWidth);
 *     --kbd-borderColor: var(--col-primaryBold);
 *     --kbd-borderRadius: var(--mrk-borderRadius);
 *     --kbd-prevMarginInlineStart: var(--mrk-prevMarginInlineStart);
 *     --kbd-nextMarginInlineEnd: var(--mrk-nextMarginInlineEnd);
 *     --kbd-marginBlockStart: var(--mrk-marginBlockStart);
 *     --kbd-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --kbd-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --kbd-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --kbd-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --kbd-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 *     --kbd-fontWeightCustom: 900;
 *     --kbd-boxShadow: 0px 0px 0px calc(var(--kbd-prevMarginInlineStart) / 4) gray;
 *     --kbd-opacity: 0.5;
 *     --kbd-booh: 1234;
 * }
 * ```
 */
export const kbdVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * kbdVarOptions.prefix = 'kbd';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * kbdVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * kbdVarOptions.onChange.subscribe({
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
 *     --kbd-prevMarginInlineStart: var(--mrk-prevMarginInlineStart);
 *     --kbd-nextMarginInlineEnd: var(--mrk-nextMarginInlineEnd);
 *     --kbd-marginBlockStart: var(--mrk-marginBlockStart);
 *     --kbd-marginBlockEnd: var(--mrk-marginBlockEnd);
 *     --kbd-paddingInlineStart: var(--mrk-paddingInlineStart);
 *     --kbd-paddingInlineEnd: var(--mrk-paddingInlineEnd);
 *     --kbd-paddingBlockStart: var(--mrk-paddingBlockStart);
 *     --kbd-paddingBlockEnd: var(--mrk-paddingBlockEnd);
 * }
 * ```
 */
export const kbdVarOptions = config[2];



export {
    kbdVars as default, // Default export for simplified imports.
}
