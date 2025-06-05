// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Settings:
import {
    typoVars,
}                           from './typography.js'



// Settings:

const config = cssConfig(() => {
    // Static heading definitions:
    
    /**
     * Defines static heading properties such as font sizes, families, weights, and styles.
     */
    const staticHeadingDefinitions = {
        // Appearances:
        
        /**
         * Defines the **sub-opacity** for headings.
         * Applied when a heading follows another heading-like element.
         * Helps visually differentiate hierarchy within text blocks.
         */
        subOpacity        : 0.65                            as CssKnownProps['opacity'          ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** for headings.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart : '0em'                           as CssKnownProps['marginInlineStart'],
        
        /**
         * Defines the **right margin** for headings.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd   : '0em'                           as CssKnownProps['marginInlineEnd'  ],
        
        /**
         * Defines the **top margin** when a heading follows another non-heading-text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        marginBlockStart  : '1.5em'                         as CssKnownProps['marginBlockStart' ],
        
        /**
         * Defines the **bottom margin** when a heading precedes another non-heading-text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginBlockEnd    : '0.75em'                        as CssKnownProps['marginBlockEnd'   ],
        
        
        
        // Typos:
        
        /**
         * Defines the **default font size** for headings.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize          : 'unset'                         as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font family** for headings.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily        : undefined                       as CssKnownProps['fontFamily'       ],
        
        /**
         * Defines the **font weight** for headings.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         * Typically heavier than paragraph text.
         */
        fontWeight        : typoVars.fontWeightSemibold     as CssKnownProps['fontWeight'       ],
        
        /**
         * Defines the **font style** for headings (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle         : undefined                       as CssKnownProps['fontStyle'        ],
        
        /**
         * Defines the **text decoration** for headings.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration    : undefined                       as CssKnownProps['textDecoration'   ],
        
        /**
         * Defines the **line height** for headings.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight        : 1.25                            as CssKnownProps['lineHeight'       ],
    };
    
    
    
    // Computed typo definitions:
    
    /**
     * Defines computed heading font sizes for structured hierarchy.
     * Ensures scalable typography across different heading levels.
     */
    const computedHeadingDefinitions = {
        // Typos:
        
        /**
         * Defines the **font size** for `<h1>` headings.
         * Ideal for main headings or page titles.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize1         : '2.25rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `<h2>` headings.
         * Used for primary subheadings.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize2         : '2.00rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `<h3>` headings.
         * Suitable for secondary subheadings.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize3         : '1.75rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `<h4>` headings.
         * Typically used for section titles.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize4         : '1.50rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `<h5>` headings.
         * Commonly used for subsection headings.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize5         : '1.25rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `<h6>` headings.
         * Smallest heading size, used for minor titles.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize6         : '1.00rem'                       as CssKnownProps['fontSize'         ],
    };
    
    
    
    // Merge all heading definitions:
    return {
        ...staticHeadingDefinitions,
        ...computedHeadingDefinitions,
    };
}, { prefix: 'h' });

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
 * const value = headingVars.marginBlockEnd; // Resolves to "var(--h-marginBlockEnd)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * headingVars.fontWeightCustom = 900; // Generates "--h-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * headingVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", headingVars.marginBlockEnd, " / 4)", "gray"
 * ]]; // Generates "--h-boxShadow: 0px 0px 0px calc(var(--h-marginBlockEnd) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * headingVars.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --h-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(h1, .h1) {
 *     ............
 *     padding: var(--h-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * headingVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --h-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete headingVars.fontWeightCustom;
 * headingVars.fontWeightCustom = null;
 * headingVars.fontWeightCustom = undefined;
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
 *     --h-subOpacity: 0.65;
 *     --h-marginInlineStart: 0em;
 *     --h-marginInlineEnd: 0em;
 *     --h-marginBlockStart: 1.5em;
 *     --h-marginBlockEnd: 0.75em;
 *     --h-fontWeight: var(--typ-fontWeightSemibold);
 *     --h-lineHeight: 1.25;
 *     --h-fontSize: unset;
 *     --h-fontSize1: 2.25rem;
 *     --h-fontSize2: 2.00rem;
 *     --h-fontSize3: 1.75rem;
 *     --h-fontSize4: 1.50rem;
 *     --h-fontSize5: 1.25rem;
 *     --h-fontSize6: 1.00rem;
 *     --h-fontWeightCustom: 900;
 *     --h-boxShadow: 0px 0px 0px calc(var(--h-marginBlockEnd) / 4) gray;
 *     --h-padding: 1rem;
 *     --h-booh: 1234;
 * }
 * ```
 */
export const headingVars        = config[0];

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
 * const expression = headingExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--h-marginBlockEnd)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * headingExpressions.fontWeightCustom = 900; // Generates "--h-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * headingExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", headingVars.marginBlockEnd, " / 4)", "gray"
 * ]]; // Generates "--h-boxShadow: 0px 0px 0px calc(var(--h-marginBlockEnd) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * headingExpressions.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --h-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(h1, .h1) {
 *     ............
 *     padding: var(--h-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * headingExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --h-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete headingExpressions.fontWeightCustom;
 * headingExpressions.fontWeightCustom = null;
 * headingExpressions.fontWeightCustom = undefined;
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
 *     --h-subOpacity: 0.65;
 *     --h-marginInlineStart: 0em;
 *     --h-marginInlineEnd: 0em;
 *     --h-marginBlockStart: 1.5em;
 *     --h-marginBlockEnd: 0.75em;
 *     --h-fontWeight: var(--typ-fontWeightSemibold);
 *     --h-lineHeight: 1.25;
 *     --h-fontSize: unset;
 *     --h-fontSize1: 2.25rem;
 *     --h-fontSize2: 2.00rem;
 *     --h-fontSize3: 1.75rem;
 *     --h-fontSize4: 1.50rem;
 *     --h-fontSize5: 1.25rem;
 *     --h-fontSize6: 1.00rem;
 *     --h-fontWeightCustom: 900;
 *     --h-boxShadow: 0px 0px 0px calc(var(--h-marginBlockEnd) / 4) gray;
 *     --h-padding: 1rem;
 *     --h-booh: 1234;
 * }
 * ```
 */
export const headingExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * headingConfig.prefix = 'h';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * headingConfig.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * headingConfig.onChange.subscribe({
 *     next: () => {
 *         console.log("Heading typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --h-subOpacity: 0.65;
 *     --h-marginInlineStart: 0em;
 *     --h-marginInlineEnd: 0em;
 *     --h-marginBlockStart: 1.5em;
 *     --h-marginBlockEnd: 0.75em;
 *     --h-fontWeight: var(--typ-fontWeightSemibold);
 *     --h-lineHeight: 1.25;
 *     --h-fontSize: unset;
 *     --h-fontSize1: 2.25rem;
 *     --h-fontSize2: 2.00rem;
 *     --h-fontSize3: 1.75rem;
 *     --h-fontSize4: 1.50rem;
 *     --h-fontSize5: 1.25rem;
 *     --h-fontSize6: 1.00rem;
 * }
 * ```
 */
export const headingConfig    = config[2];



export {
    headingVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `headingVars` instead.
 */
export const headings         = headingVars;

/**
 * @deprecated Use `headingExpressions` instead.
 */
export const headingValues    = headingExpressions;

/**
 * @deprecated Use `headingConfig` instead.
 */
export const cssHeadingConfig = headingConfig;
