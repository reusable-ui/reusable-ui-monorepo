// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.



// Configs:

const config = cssConfig(() => {
    // Static typo definitions:
    
    /**
     * Defines static typography properties such as font sizes, families, weights, and styles.
     */
    const staticTypoDefinitions = {
        /**
         * The default font size for medium-sized text.
         * Do not use `rem`, because this applies to `:root`.
         */
        fontSizeMd           : '16px'           as CssKnownProps['fontSize'      ],
        
        
        /**
         * The default sans-serif font stack, optimized for cross-platform compatibility.
         */
        fontFamilySansSerief : [
            'system-ui',
            '-apple-system',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            '"Noto Sans"',
            '"Liberation Sans"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ]                                       as CssKnownProps['fontFamily'    ],
        
        /**
         * The default monospace font stack, optimized for readability in code or terminal interfaces.
         */
        fontFamilyMonospace  : [
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
        ]                                       as CssKnownProps['fontFamily'    ],
        
        
        /**
         * The lightest possible font weight.
         */
        fontWeightLighter    : 'lighter'        as CssKnownProps['fontWeight'    ],
        
        /**
         * A light font weight used for subtle emphasis.
         */
        fontWeightLight      : 300              as CssKnownProps['fontWeight'    ],
        
        /**
         * The default normal font weight for body text.
         */
        fontWeightNormal     : 400              as CssKnownProps['fontWeight'    ],
        
        /**
         * A semi-bold font weight for slight emphasis.
         */
        fontWeightSemibold   : 600              as CssKnownProps['fontWeight'    ],
        
        /**
         * A bold font weight for strong emphasis.
         */
        fontWeightBold       : 700              as CssKnownProps['fontWeight'    ],
        
        /**
         * The boldest possible font weight.
         */
        fontWeightBolder     : 'bolder'         as CssKnownProps['fontWeight'    ],
        
        
        /**
         * Defines the **font style** applied globally (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle            : 'normal'         as CssKnownProps['fontStyle'     ],
        
        /**
         * Defines the **text decoration** applied globally.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration       : 'none'           as CssKnownProps['textDecoration'],
        
        
        /**
         * A small line height for compact text presentation.
         */
        lineHeightSm         : 1.25             as CssKnownProps['lineHeight'    ],
        
        /**
         * The default line height for standard readability.
         */
        lineHeightMd         : 1.50             as CssKnownProps['lineHeight'    ],
        
        /**
         * A large line height for spacious text readability.
         */
        lineHeightLg         : 2.00             as CssKnownProps['lineHeight'    ],
        
        
        /**
         * Controls word wrapping behavior to prevent overflow.
         */
        overflowWrap         : 'break-word'     as CssKnownProps['overflowWrap'  ],
    };
    
    
    
    // Computed typo definitions:
    
    /**
     * Defines computed typography properties based on `fontSizeMd`.
     */
    const computedTypoDefinitions = {
        // Smaller than `fontSizeMd`:
        
        /**
         * An extra-small font size, typically used for fine print or secondary text.
         */
        fontSizeXs           : [[ 'calc(', staticTypoDefinitions.fontSizeMd, '*', 0.50  , ')' ]]    as CssKnownProps['fontSize'      ],
        
        /**
         * A small font size, commonly used for captions or minor text elements.
         */
        fontSizeSm           : [[ 'calc(', staticTypoDefinitions.fontSizeMd, '*', 0.75  , ')' ]]    as CssKnownProps['fontSize'      ],
        
        
        
        // Bigger than `fontSizeMd`:
        
        /**
         * A large font size, ideal for section headings or emphasized content.
         */
        fontSizeLg           : [[ 'calc(', staticTypoDefinitions.fontSizeMd, '*', 1.25  , ')' ]]    as CssKnownProps['fontSize'      ],
        
        /**
         * An extra-large font size, often suitable for titles or main headings.
         */
        fontSizeXl           : [[ 'calc(', staticTypoDefinitions.fontSizeMd, '*', 1.50  , ')' ]]    as CssKnownProps['fontSize'      ],
        
        /**
         * A significantly large font size, useful for prominent headings.
         */
        fontSizeXxl          : [[ 'calc(', staticTypoDefinitions.fontSizeMd, '*', 1.75  , ')' ]]    as CssKnownProps['fontSize'      ],
        
        /**
         * A maximum-level font size, usually reserved for display text or hero sections.
         */
        fontSizeXxxl         : [[ 'calc(', staticTypoDefinitions.fontSizeMd, '*', 2.00  , ')' ]]    as CssKnownProps['fontSize'      ],
    };
    
    
    
    // Default typo definitions:
    
    /**
     * Defines default typography properties applied globally.
     */
    const defaultTypoDefinitions = {
        /**
         * Defines the **font size** applied globally.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize             : staticTypoDefinitions.fontSizeMd                                     as CssKnownProps['fontSize'      ],
        
        /**
         * Defines the **font family** applied globally.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily           : staticTypoDefinitions.fontFamilySansSerief                           as CssKnownProps['fontFamily'    ],
        
        /**
         * Defines the **font weight** applied globally.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         */
        fontWeight           : staticTypoDefinitions.fontWeightNormal                               as CssKnownProps['fontWeight'    ],
        
        /**
         * Defines the **line height** applied globally.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight           : staticTypoDefinitions.lineHeightMd                                   as CssKnownProps['lineHeight'    ],
    };
    
    
    
    // Merge all typo definitions:
    return {
        ...staticTypoDefinitions,
        ...computedTypoDefinitions,
        ...defaultTypoDefinitions,
    };
}, { prefix: 'typ' });

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
 * const value = typoVars.fontSizeLg; // Resolves to "var(--typ-fontSizeLg)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * typoVars.fontWeightCustom = 900; // Generates "--typ-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * typoVars.myExpression = [[
 *    "calc(", typoVars.lineHeightMd, " * 2)"
 * ]]; // Generates "--typ-myExpression: calc(var(--typ-lineHeightMd) * 2);"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * typoVars.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --typ-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :root {
 *     ............
 *     padding: var(--typ-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * typoVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --typ-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete typoVars.fontWeightCustom;
 * typoVars.fontWeightCustom = null;
 * typoVars.fontWeightCustom = undefined;
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
 *     --typ-fontSizeMd: 16px;
 *     --typ-fontFamilySansSerief: system-ui, ..., "Noto Color Emoji";
 *     --typ-fontFamilyMonospace: SFMono-Regular, ..., monospace;
 *     ............
 *     --typ-fontSize: var(--typ-fontSizeMd);
 *     --typ-fontSizeXs: calc(var(--typ-fontSize) * 0.50);
 *     --typ-fontSizeSm: calc(var(--typ-fontSize) * 0.75);
 *     --typ-fontFamily: var(--typ-fontFamilySansSerief);
 *     --typ-fontWeight: var(--typ-fontWeightNormal);
 *     --typ-lineHeight: var(--typ-lineHeightMd);
 *     --typ-fontWeightCustom: 900;
 *     --typ-myExpression: calc(var(--typ-lineHeightMd) * 2);
 *     --typ-padding: 1rem;
 *     --typ-booh: 1234;
 * }
 * ```
 */
export const typoVars        = config[0];

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
 * const expression = typoExpressions.fontSizeLg; // Resolves to [[ "calc(", "var(--typ-fontSize)", " * 1.25)" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * typoExpressions.fontWeightCustom = 900; // Generates "--typ-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * typoExpressions.myExpression = [[
 *    "calc(", typoVars.lineHeightMd, " * 2)"
 * ]]; // Generates "--typ-myExpression: calc(var(--typ-lineHeightMd) * 2);"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * typoExpressions.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --typ-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :root {
 *     ............
 *     padding: var(--typ-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * typoExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --typ-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete typoExpressions.fontWeightCustom;
 * typoExpressions.fontWeightCustom = null;
 * typoExpressions.fontWeightCustom = undefined;
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
 *     --typ-fontSizeMd: 16px;
 *     --typ-fontFamilySansSerief: system-ui, ..., "Noto Color Emoji";
 *     --typ-fontFamilyMonospace: SFMono-Regular, ..., monospace;
 *     ............
 *     --typ-fontSize: var(--typ-fontSizeMd);
 *     --typ-fontSizeXs: calc(var(--typ-fontSize) * 0.50);
 *     --typ-fontSizeSm: calc(var(--typ-fontSize) * 0.75);
 *     --typ-fontFamily: var(--typ-fontFamilySansSerief);
 *     --typ-fontWeight: var(--typ-fontWeightNormal);
 *     --typ-lineHeight: var(--typ-lineHeightMd);
 *     --typ-fontWeightCustom: 900;
 *     --typ-myExpression: calc(var(--typ-lineHeightMd) * 2);
 *     --typ-padding: 1rem;
 *     --typ-booh: 1234;
 * }
 * ```
 */
export const typoExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * typoConfig.prefix = 'typ';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * typoConfig.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * typoConfig.onChange.subscribe({
 *     next: () => {
 *         console.log("Typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --typ-fontSizeMd: 16px;
 *     --typ-fontFamilySansSerief: system-ui, ..., "Noto Color Emoji";
 *     --typ-fontFamilyMonospace: SFMono-Regular, ..., monospace;
 *     ............
 *     --typ-fontSize: var(--typ-fontSizeMd);
 *     --typ-fontSizeXs: calc(var(--typ-fontSize) * 0.50);
 *     --typ-fontSizeSm: calc(var(--typ-fontSize) * 0.75);
 *     --typ-fontFamily: var(--typ-fontFamilySansSerief);
 *     --typ-fontWeight: var(--typ-fontWeightNormal);
 *     --typ-lineHeight: var(--typ-lineHeightMd);
 * }
 * ```
 */
export const typoConfig    = config[2];



export {
    typoVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `typoVars` instead.
 */
export const typos         = typoVars;

/**
 * @deprecated Use `typoExpressions` instead.
 */
export const typoValues    = typoExpressions;

/**
 * @deprecated Use `typoConfig` instead.
 */
export const cssTypoConfig = typoConfig;
