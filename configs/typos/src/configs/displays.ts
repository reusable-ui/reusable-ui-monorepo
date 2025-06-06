// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Configs:
import {
    typoVars,
}                           from './typography.js'
import {
    headingVars,
}                           from './headings.js'



// Configs:

const config = cssConfig(() => {
    // Static display heading definitions:
    
    /**
     * Defines static display heading properties such as font sizes, families, weights, and styles.
     */
    const staticDisplayDefinitions = {
        // Appearances:
        
        /**
         * Defines the **sub-opacity** for display headings.
         * Applied when a display heading follows another display-heading-like element.
         * Helps visually differentiate hierarchy within text blocks.
         */
        subOpacity        : headingVars.subOpacity                              as CssKnownProps['opacity'          ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** for display headings.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart : headingVars.marginInlineStart                       as CssKnownProps['marginInlineStart'],
        
        /**
         * Defines the **right margin** for display headings.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd   : headingVars.marginInlineEnd                         as CssKnownProps['marginInlineEnd'  ],
        
        /**
         * Defines the **top margin** when a display heading follows another non-display-text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        marginBlockStart  : headingVars.marginBlockStart                        as CssKnownProps['marginBlockStart' ],
        
        /**
         * Defines the **bottom margin** when a display heading precedes another non-display-text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginBlockEnd    : headingVars.marginBlockEnd                          as CssKnownProps['marginBlockEnd'   ],
        
        
        
        // Typos:
        
        /**
         * Defines the **default font size** for display headings.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize          : 'unset'                                             as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font family** for display headings.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily        : headingVars.fontFamily                              as CssKnownProps['fontFamily'       ],
        
        /**
         * Defines the **font weight** for display headings.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         * Typically lighter than standard headings to maintain balance.
         */
        fontWeight        : typoVars.fontWeightLight                            as CssKnownProps['fontWeight'       ],
        
        /**
         * Defines the **font style** for display headings (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle         : headingVars.fontStyle                               as CssKnownProps['fontStyle'        ],
        
        /**
         * Defines the **text decoration** for display headings.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration    : headingVars.textDecoration                          as CssKnownProps['textDecoration'   ],
        
        /**
         * Defines the **line height** for display headings.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight        : headingVars.lineHeight                              as CssKnownProps['lineHeight'       ],
    };
    
    
    
    // Computed typo definitions:
    
    /**
     * Defines computed display heading font sizes for structured hierarchy.
     * Ensures scalable typography across different display heading levels.
     */
    const computedDisplayDefinitions = {
        // Typos:
        
        /**
         * Defines the **font size** for `.display-1` display headings.
         * Ideal for main display headings or large hero text.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize1         : '5.00rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-2` display headings.
         * Used for prominent subheadings or large titles.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize2         : '4.50rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-3` display headings.
         * Suitable for secondary headers or standout text sections.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize3         : '4.00rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-4` display headings.
         * Typically used for section titles with a bold presence.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize4         : '3.50rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-5` display headings.
         * Commonly used for subsection headings or callout titles.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize5         : '3.00rem'                       as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-6` display headings.
         * Smallest display heading size, used for structured emphasis.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize6         : '2.50rem'                       as CssKnownProps['fontSize'         ],
    };
    
    
    
    // Merge all display definitions:
    return {
        ...staticDisplayDefinitions,
        ...computedDisplayDefinitions,
    };
}, { prefix: 'd' });

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
 * const value = displayVars.marginBlockEnd; // Resolves to "var(--d-marginBlockEnd)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * displayVars.fontWeightCustom = 900; // Generates "--d-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * displayVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", displayVars.marginBlockEnd, " / 4)", "gray"
 * ]]; // Generates "--d-boxShadow: 0px 0px 0px calc(var(--d-marginBlockEnd) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * displayVars.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --d-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * .display-1 {
 *     ............
 *     padding: var(--d-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * displayVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --d-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete displayVars.fontWeightCustom;
 * displayVars.fontWeightCustom = null;
 * displayVars.fontWeightCustom = undefined;
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
 *     --d-subOpacity: var(--h-subOpacity);
 *     --d-marginInlineStart: var(--h-marginInlineStart);
 *     --d-marginInlineEnd: var(--h-marginInlineEnd);
 *     --d-marginBlockStart: var(--h-marginBlockStart);
 *     --d-marginBlockEnd: var(--h-marginBlockEnd);
 *     --d-fontWeight: var(--typ-fontWeightLight);
 *     --d-lineHeight: var(--h-lineHeight);
 *     --d-fontSize: unset;
 *     --d-fontSize1: 5.00rem;
 *     --d-fontSize2: 4.50rem;
 *     --d-fontSize3: 4.00rem;
 *     --d-fontSize4: 3.50rem;
 *     --d-fontSize5: 3.00rem;
 *     --d-fontSize6: 2.50rem;
 *     --d-fontWeightCustom: 900;
 *     --d-boxShadow: 0px 0px 0px calc(var(--d-marginBlockEnd) / 4) gray;
 *     --d-padding: 1rem;
 *     --d-booh: 1234;
 * }
 * ```
 */
export const displayVars        = config[0];

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
 * const expression = displayExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--d-marginBlockEnd)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * displayExpressions.fontWeightCustom = 900; // Generates "--d-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * displayExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", displayVars.marginBlockEnd, " / 4)", "gray"
 * ]]; // Generates "--d-boxShadow: 0px 0px 0px calc(var(--d-marginBlockEnd) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * displayExpressions.padding = '1rem';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --d-padding: 1rem;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * .display-1 {
 *     ............
 *     padding: var(--d-padding);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * displayExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --d-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete displayExpressions.fontWeightCustom;
 * displayExpressions.fontWeightCustom = null;
 * displayExpressions.fontWeightCustom = undefined;
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
 *     --d-subOpacity: var(--h-subOpacity);
 *     --d-marginInlineStart: var(--h-marginInlineStart);
 *     --d-marginInlineEnd: var(--h-marginInlineEnd);
 *     --d-marginBlockStart: var(--h-marginBlockStart);
 *     --d-marginBlockEnd: var(--h-marginBlockEnd);
 *     --d-fontWeight: var(--typ-fontWeightLight);
 *     --d-lineHeight: var(--h-lineHeight);
 *     --d-fontSize: unset;
 *     --d-fontSize1: 5.00rem;
 *     --d-fontSize2: 4.50rem;
 *     --d-fontSize3: 4.00rem;
 *     --d-fontSize4: 3.50rem;
 *     --d-fontSize5: 3.00rem;
 *     --d-fontSize6: 2.50rem;
 *     --d-fontWeightCustom: 900;
 *     --d-boxShadow: 0px 0px 0px calc(var(--d-marginBlockEnd) / 4) gray;
 *     --d-padding: 1rem;
 *     --d-booh: 1234;
 * }
 * ```
 */
export const displayExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * displayConfig.prefix = 'd';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * displayConfig.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * displayConfig.onChange.subscribe({
 *     next: () => {
 *         console.log("Display typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --d-subOpacity: var(--h-subOpacity);
 *     --d-marginInlineStart: var(--h-marginInlineStart);
 *     --d-marginInlineEnd: var(--h-marginInlineEnd);
 *     --d-marginBlockStart: var(--h-marginBlockStart);
 *     --d-marginBlockEnd: var(--h-marginBlockEnd);
 *     --d-fontWeight: var(--typ-fontWeightLight);
 *     --d-lineHeight: var(--h-lineHeight);
 *     --d-fontSize: unset;
 *     --d-fontSize1: 5.00rem;
 *     --d-fontSize2: 4.50rem;
 *     --d-fontSize3: 4.00rem;
 *     --d-fontSize4: 3.50rem;
 *     --d-fontSize5: 3.00rem;
 *     --d-fontSize6: 2.50rem;
 * }
 * ```
 */
export const displayConfig      = config[2];



export {
    displayVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `displayVars` instead.
 */
export const displays         = displayVars;

/**
 * @deprecated Use `displayExpressions` instead.
 */
export const displayValues    = displayExpressions;

/**
 * @deprecated Use `displayConfig` instead.
 */
export const cssDisplayConfig = displayConfig;
