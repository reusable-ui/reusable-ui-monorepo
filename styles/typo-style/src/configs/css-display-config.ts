// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultDisplayPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui configs:
import {
    typoConfigVars,
}                           from '@reusable-ui/typo-config'         // Configures the typography system (font sizes, font families, font weights, line heights, and text wrapping rules) across all UI components.

// Configs:
import {
    headingVars,
}                           from './css-heading-config.js'



// Configs:

const config = cssConfig(() => {
    /**
     * Defines static spacing properties.
     */
    const staticSpacingProperties = {
        // Spacings:
        
        /**
         * Defines the **left margin** for display headings.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart    : headingVars.marginInlineStart        as CssKnownProps['marginInlineStart'],
        
        /**
         * Defines the **right margin** for display headings.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd      : headingVars.marginInlineEnd          as CssKnownProps['marginInlineEnd'  ],
    };
    
    
    
    /**
     * Defines static typography properties.
     */
    const staticTypographyProperties = {
        // Typos:
        
        /**
         * Defines the **default font size** for display headings.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize             : undefined                            as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font family** for display headings.
         * Can be set to a primary typeface or a fallback stack.
         * Example: `'Arial, sans-serif'`.
         */
        fontFamily           : headingVars.fontFamily               as CssKnownProps['fontFamily'       ],
        
        /**
         * Defines the **font weight** for display headings.
         * Accepts predefined weights (`normal`, `bold`, `lighter`) or numeric values (`100-900`).
         * Typically lighter than standard headings to maintain balance.
         */
        fontWeight           : typoConfigVars.fontWeightLight       as CssKnownProps['fontWeight'       ],
        
        /**
         * Defines the **font style** for display headings (normal, italic, oblique).
         * Used to define emphasis within visual hierarchy.
         */
        fontStyle            : headingVars.fontStyle                as CssKnownProps['fontStyle'        ],
        
        /**
         * Defines the **text decoration** for display headings.
         * Controls styling such as `underline`, `line-through`, or `none`.
         * Useful for adding emphasis or distinguishing elements visually.
         */
        textDecoration       : headingVars.textDecoration           as CssKnownProps['textDecoration'   ],
        
        /**
         * Defines the **line height** for display headings.
         * Helps with text readability by adjusting vertical spacing.
         * Can be set using relative values like `1.5` or absolute units like `px`.
         */
        lineHeight           : headingVars.lineHeight               as CssKnownProps['lineHeight'       ],
    };
    
    
    
    /**
     * Defines computed typography properties.
     * Ensures scalable typography across different display heading levels.
     */
    const computedTypographyProperties = {
        // Typos:
        
        /**
         * Defines the **font size** for `.display-1` display headings.
         * Ideal for main display headings or large hero text.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize1            : '5.00rem'                            as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-2` display headings.
         * Used for prominent subheadings or large titles.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize2            : '4.50rem'                            as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-3` display headings.
         * Suitable for secondary headers or standout text sections.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize3            : '4.00rem'                            as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-4` display headings.
         * Typically used for section titles with a bold presence.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize4            : '3.50rem'                            as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-5` display headings.
         * Commonly used for subsection headings or callout titles.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize5            : '3.00rem'                            as CssKnownProps['fontSize'         ],
        
        /**
         * Defines the **font size** for `.display-6` display headings.
         * Smallest display heading size, used for structured emphasis.
         * Allows dynamic font scaling for responsive layouts.
         * Accepts absolute or relative units (`px`, `em`, `%`, etc.).
         */
        fontSize6            : '2.50rem'                            as CssKnownProps['fontSize'         ],
    };
    
    
    
    /**
     * Defines static conditional sibling adjacency properties.
     */
    const staticSiblingAdjacencyProperties = {
        // Spacings:
        
        /**
         * Defines the **top margin** when a display heading follows another non-display-text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        prevMarginBlockStart : headingVars.prevMarginBlockStart     as CssKnownProps['marginBlockStart' ],
        
        /**
         * Defines the **bottom margin** when a display heading precedes another non-display-text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        nextMarginBlockEnd   : headingVars.nextMarginBlockEnd       as CssKnownProps['marginBlockEnd'   ],
    };
    
    
    
    /**
     * Defines static sub display heading properties.
     */
    const staticSubDisplayProperties = {
        // Appearances:
        
        /**
         * Defines the **sub-opacity** for display headings.
         * Applied when a display heading follows another display-heading-like element.
         * Helps visually differentiate hierarchy within text blocks.
         */
        subOpacity           : headingVars.subOpacity               as CssKnownProps['opacity'          ],
    };
    
    
    
    // Merge all properties:
    return {
        ...staticSpacingProperties,
        ...staticTypographyProperties,
        ...computedTypographyProperties,
        ...staticSiblingAdjacencyProperties,
        ...staticSubDisplayProperties,
    };
}, { prefix: defaultDisplayPrefix });

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
 * const value = displayVars.nextMarginBlockEnd; // Resolves to "var(--d-nextMarginBlockEnd)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * displayVars.fontWeightCustom = 900; // Generates "--d-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * displayVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", displayVars.nextMarginBlockEnd, " / 4)", "gray"
 * ]]; // Generates "--d-boxShadow: 0px 0px 0px calc(var(--d-nextMarginBlockEnd) / 4) gray;"
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
 *     --d-marginInlineStart: var(--h-marginInlineStart);
 *     --d-marginInlineEnd: var(--h-marginInlineEnd);
 *     --d-prevMarginBlockStart: var(--h-prevMarginBlockStart);
 *     --d-nextMarginBlockEnd: var(--h-nextMarginBlockEnd);
 *     --d-fontWeight: var(--typ-fontWeightLight);
 *     --d-lineHeight: var(--h-lineHeight);
 *     --d-fontSize: unset;
 *     --d-fontSize1: 5.00rem;
 *     --d-fontSize2: 4.50rem;
 *     --d-fontSize3: 4.00rem;
 *     --d-fontSize4: 3.50rem;
 *     --d-fontSize5: 3.00rem;
 *     --d-fontSize6: 2.50rem;
 *     --d-subOpacity: var(--h-subOpacity);
 *     --d-fontWeightCustom: 900;
 *     --d-boxShadow: 0px 0px 0px calc(var(--d-nextMarginBlockEnd) / 4) gray;
 *     --d-padding: 1rem;
 *     --d-booh: 1234;
 * }
 * ```
 */
export const displayVars       = config[0];

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
 * const definition = displayVarDefs.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--d-nextMarginBlockEnd)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * displayVarDefs.fontWeightCustom = 900; // Generates "--d-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * displayVarDefs.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", displayVars.nextMarginBlockEnd, " / 4)", "gray"
 * ]]; // Generates "--d-boxShadow: 0px 0px 0px calc(var(--d-nextMarginBlockEnd) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * displayVarDefs.padding = '1rem';
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
 * displayVarDefs.booh = 1234;
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
 * delete displayVarDefs.fontWeightCustom;
 * displayVarDefs.fontWeightCustom = null;
 * displayVarDefs.fontWeightCustom = undefined;
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
 *     --d-marginInlineStart: var(--h-marginInlineStart);
 *     --d-marginInlineEnd: var(--h-marginInlineEnd);
 *     --d-prevMarginBlockStart: var(--h-prevMarginBlockStart);
 *     --d-nextMarginBlockEnd: var(--h-nextMarginBlockEnd);
 *     --d-fontWeight: var(--typ-fontWeightLight);
 *     --d-lineHeight: var(--h-lineHeight);
 *     --d-fontSize: unset;
 *     --d-fontSize1: 5.00rem;
 *     --d-fontSize2: 4.50rem;
 *     --d-fontSize3: 4.00rem;
 *     --d-fontSize4: 3.50rem;
 *     --d-fontSize5: 3.00rem;
 *     --d-fontSize6: 2.50rem;
 *     --d-subOpacity: var(--h-subOpacity);
 *     --d-fontWeightCustom: 900;
 *     --d-boxShadow: 0px 0px 0px calc(var(--d-nextMarginBlockEnd) / 4) gray;
 *     --d-padding: 1rem;
 *     --d-booh: 1234;
 * }
 * ```
 */
export const displayVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * displayVarOptions.prefix = 'd';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * displayVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * displayVarOptions.onChange.subscribe({
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
 *     --d-marginInlineStart: var(--h-marginInlineStart);
 *     --d-marginInlineEnd: var(--h-marginInlineEnd);
 *     --d-prevMarginBlockStart: var(--h-prevMarginBlockStart);
 *     --d-nextMarginBlockEnd: var(--h-nextMarginBlockEnd);
 *     --d-fontWeight: var(--typ-fontWeightLight);
 *     --d-lineHeight: var(--h-lineHeight);
 *     --d-fontSize: unset;
 *     --d-fontSize1: 5.00rem;
 *     --d-fontSize2: 4.50rem;
 *     --d-fontSize3: 4.00rem;
 *     --d-fontSize4: 3.50rem;
 *     --d-fontSize5: 3.00rem;
 *     --d-fontSize6: 2.50rem;
 *     --d-subOpacity: var(--h-subOpacity);
 * }
 * ```
 */
export const displayVarOptions = config[2];



export {
    displayVars as default, // Default export for simplified imports.
}
