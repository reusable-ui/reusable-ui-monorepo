// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // Writes css in javascript.

// Configs:
import {
    borderVars,
}                           from '@reusable-ui/borders' // A flexible and themeable border management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.



// Configs:

const config = cssConfig(() => {
    return {
        // Appearances:
        
        /**
         * Defines the **transparency level** for horizontal separators.
         * Ensures subtle visual distinction without overpowering surrounding content.
         */
        opacity                : 0.25                       as CssKnownProps['opacity'           ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for horizontal separators.
         * Typically uses the default border style for consistency.
         */
        borderStyle            : borderVars.style           as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for horizontal separators.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth            : borderVars.defaultWidth    as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for horizontal separators.
         * Typically uses the **current text color** (`currentcolor`) for subtle emphasis.
         */
        borderColor            : 'currentcolor'             as CssKnownProps['borderColor'       ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** for horizontal separators.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart      : '0em'                      as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** for horizontal separators.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd        : '0em'                      as CssKnownProps['marginInlineEnd'   ],
        
        /**
         * Defines the **top margin** when a horizontal separator follows another text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        marginBlockStart       : '1em'                      as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** when a horizontal separator precedes another text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginBlockEnd         : '1em'                      as CssKnownProps['marginBlockEnd'    ],
    };
}, { prefix: 'hr' });

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
 * const value = horzSeparatorVars.marginBlockStart; // Resolves to "var(--hr-marginBlockStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * horzSeparatorVars.fontWeightCustom = 900; // Generates "--hr-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * horzSeparatorVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", horzSeparatorVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * horzSeparatorVars.visibility = 'visible';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --hr-visibility: visible;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(hr, .hr) {
 *     ............
 *     visibility: var(--hr-visibility);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * horzSeparatorVars.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --hr-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete horzSeparatorVars.fontWeightCustom;
 * horzSeparatorVars.fontWeightCustom = null;
 * horzSeparatorVars.fontWeightCustom = undefined;
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
 *     --hr-opacity: 0.25;
 *     --hr-borderStyle: var(--bor-style);
 *     --hr-borderWidth: var(--bor-defaultWidth);
 *     --hr-borderColor: currentcolor;
 *     --hr-marginInlineStart: 0em;
 *     --hr-marginInlineEnd: 0em;
 *     --hr-marginBlockStart: 1em;
 *     --hr-marginBlockEnd: 1em;
 *     --hr-fontWeightCustom: 900;
 *     --hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;
 *     --hr-visibility: visible;
 *     --hr-booh: 1234;
 * }
 * ```
 */
export const horzSeparatorVars        = config[0];

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
 * const expression = horzSeparatorExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--hr-marginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * horzSeparatorExpressions.fontWeightCustom = 900; // Generates "--hr-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * horzSeparatorExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", horzSeparatorVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * horzSeparatorExpressions.visibility = 'visible';
 * ```
 * This generates the following styles:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --hr-visibility: visible;
 * }
 * ```
 * 
 * **Styling stylesheet:**
 * ```css
 * :is(hr, .hr) {
 *     ............
 *     visibility: var(--hr-visibility);
 * }
 * ```
 *  
 * However, if the property name **is not a recognized CSS property**, it still generates a CSS variable but does not apply automatically:
 * ```ts
 * horzSeparatorExpressions.booh = 1234;
 * ```
 * This generates:
 * 
 * **Variables stylesheet:**
 * ```css
 * :root {
 *     ............
 *     --hr-booh: 1234;
 * }
 * ```
 * 
 * However, `"booh"` is **not a valid CSS property**, so it won't be used in styling.
 * 
 * #### **Removing a CSS Variable**
 * A variable can be removed using any of the following:
 * ```ts
 * delete horzSeparatorExpressions.fontWeightCustom;
 * horzSeparatorExpressions.fontWeightCustom = null;
 * horzSeparatorExpressions.fontWeightCustom = undefined;
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
 *     --hr-opacity: 0.25;
 *     --hr-borderStyle: var(--bor-style);
 *     --hr-borderWidth: var(--bor-defaultWidth);
 *     --hr-borderColor: currentcolor;
 *     --hr-marginInlineStart: 0em;
 *     --hr-marginInlineEnd: 0em;
 *     --hr-marginBlockStart: 1em;
 *     --hr-marginBlockEnd: 1em;
 *     --hr-fontWeightCustom: 900;
 *     --hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;
 *     --hr-visibility: visible;
 *     --hr-booh: 1234;
 * }
 * ```
 */
export const horzSeparatorExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * horzSeparatorConfig.prefix = 'hr';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * horzSeparatorConfig.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * horzSeparatorConfig.onChange.subscribe({
 *     next: () => {
 *         console.log("Horizontal separator typography system updated!");
 *     },
 * });
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * Example of CSS variables generated:
 * ```css
 * :root {
 *     --hr-opacity: 0.25;
 *     --hr-borderStyle: var(--bor-style);
 *     --hr-borderWidth: var(--bor-defaultWidth);
 *     --hr-borderColor: currentcolor;
 *     --hr-marginInlineStart: 0em;
 *     --hr-marginInlineEnd: 0em;
 *     --hr-marginBlockStart: 1em;
 *     --hr-marginBlockEnd: 1em;
 * }
 * ```
 */
export const horzSeparatorConfig    = config[2];



export {
    horzSeparatorVars as default, // Default export for simplified imports.
}

/**
 * @deprecated Use `horzSeparatorVars` instead.
 */
export const horzRules         = horzSeparatorVars;

/**
 * @deprecated Use `horzSeparatorExpressions` instead.
 */
export const horzRuleValues    = horzSeparatorExpressions;

/**
 * @deprecated Use `horzSeparatorConfig` instead.
 */
export const horzRuleConfig    = horzSeparatorConfig;

/**
 * @deprecated Use `horzSeparatorConfig` instead.
 */
export const cssHorzRuleConfig = horzSeparatorConfig;
