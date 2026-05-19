// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultVertSeparatorConfigPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Configs:
import {
    horzSeparatorConfigVars,
}                           from './css-horz-separator-config.js'



// Configs:

const config = cssConfig(() => {
    return {
        // Appearances:
        
        /**
         * Defines the **transparency level** for vertical separators.
         * Ensures subtle visual distinction without overpowering surrounding content.
         */
        opacity                : horzSeparatorConfigVars.opacity            as CssKnownProps['opacity'           ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for vertical separators.
         * Typically uses the default border style for consistency.
         */
        borderStyle            : horzSeparatorConfigVars.borderStyle        as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for vertical separators.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth            : horzSeparatorConfigVars.borderWidth        as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for vertical separators.
         * Typically uses the **current text color** (`currentcolor`) for subtle emphasis.
         */
        borderColor            : horzSeparatorConfigVars.borderColor        as CssKnownProps['borderColor'       ],
        
        
        
        // Spacings:
        // - Swaps the inline ↔ block for forming the vertical version of horizontal separator.
        
        /**
         * Defines the **left margin** for vertical separators.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart      : horzSeparatorConfigVars.marginBlockStart   as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** for vertical separators.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd        : horzSeparatorConfigVars.marginBlockEnd     as CssKnownProps['marginInlineEnd'   ],
        
        /**
         * Defines the **top margin** when a vertical separator follows another text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        marginBlockStart       : horzSeparatorConfigVars.marginInlineStart  as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** when a vertical separator precedes another text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        marginBlockEnd         : horzSeparatorConfigVars.marginInlineEnd    as CssKnownProps['marginBlockEnd'    ],
    };
}, { prefix: defaultVertSeparatorConfigPrefix });

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
 * const value = vertSeparatorConfigVars.marginBlockStart; // Resolves to "var(--hr-marginBlockStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * vertSeparatorConfigVars.fontWeightCustom = 900; // Generates "--hr-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * vertSeparatorConfigVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", vertSeparatorConfigVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * vertSeparatorConfigVars.visibility = 'visible';
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
 * vertSeparatorConfigVars.booh = 1234;
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
 * delete vertSeparatorConfigVars.fontWeightCustom;
 * vertSeparatorConfigVars.fontWeightCustom = null;
 * vertSeparatorConfigVars.fontWeightCustom = undefined;
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
export const vertSeparatorConfigVars        = config[0];

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
 * const expression = vertSeparatorConfigExpressions.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--hr-marginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * vertSeparatorConfigExpressions.fontWeightCustom = 900; // Generates "--hr-fontWeightCustom: 900;"
 * ```
 * 
 * **Expression Assignment:**
 * ```ts
 * vertSeparatorConfigExpressions.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", vertSeparatorConfigVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * vertSeparatorConfigExpressions.visibility = 'visible';
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
 * vertSeparatorConfigExpressions.booh = 1234;
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
 * delete vertSeparatorConfigExpressions.fontWeightCustom;
 * vertSeparatorConfigExpressions.fontWeightCustom = null;
 * vertSeparatorConfigExpressions.fontWeightCustom = undefined;
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
export const vertSeparatorConfigExpressions = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * vertSeparatorConfigOptions.prefix = 'hr';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * vertSeparatorConfigOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * vertSeparatorConfigOptions.onChange.subscribe({
 *     next: () => {
 *         console.log("Vertical separator typography system updated!");
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
export const vertSeparatorConfigOptions     = config[2];



export {
    vertSeparatorConfigVars as default, // Default export for simplified imports.
}
