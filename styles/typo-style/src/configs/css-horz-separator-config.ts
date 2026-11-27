// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultHorzSeparatorPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Configs:
import {
    borderConfigVars,
}                           from '@reusable-ui/border-config'       // A flexible and themeable border management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.



// Configs:

const config = cssConfig(() => {
    /**
     * Defines static spacing properties.
     */
    const staticSpacingProperties = {
        // Spacings:
        
        /**
         * Defines the **left margin** for horizontal separators.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineStart    : '0em'                    as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** for horizontal separators.
         * Typically `0em` to maintain alignment with text blocks.
         */
        marginInlineEnd      : '0em'                    as CssKnownProps['marginInlineEnd'   ],
    };
    
    
    
    /**
     * Defines static horz separator properties such as font sizes, families, weights, and styles.
     */
    const staticHorzSeparatorProperties = {
        // Appearances:
        
        /**
         * Defines the **transparency level** for horizontal separators.
         * Ensures subtle visual distinction without overpowering surrounding content.
         */
        opacity              : 0.25                     as CssKnownProps['opacity'           ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for horizontal separators.
         * Typically uses the default border style for consistency.
         */
        borderStyle          : borderConfigVars.style   as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for horizontal separators.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth          : borderConfigVars.width   as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for horizontal separators.
         * Typically uses the **current text color** (`currentcolor`) for subtle emphasis.
         */
        borderColor          : 'currentcolor'           as CssKnownProps['borderColor'       ],
    };
    
    
    
    /**
     * Defines static conditional sibling adjacency properties.
     */
    const staticSiblingAdjacencyProperties = {
        // Spacings:
        
        /**
         * Defines the **top margin** when a horizontal separator follows another text-block element.
         * Implemented using adjacent sibling selector.
         * Ensures structured vertical spacing.
         */
        prevMarginBlockStart : '1em'                    as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** when a horizontal separator precedes another text-block element.
         * Implemented using `:has()` selector, which may have limited browser support.
         * Check compatibility before relying on this approach.
         */
        nextMarginBlockEnd   : '1em'                    as CssKnownProps['marginBlockEnd'    ],
    };
    
    
    
    // Merge all properties:
    return {
        ...staticSpacingProperties,
        ...staticHorzSeparatorProperties,
        ...staticSiblingAdjacencyProperties,
    };
}, { prefix: defaultHorzSeparatorPrefix });

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
 * const value = horzSeparatorVars.prevMarginBlockStart; // Resolves to "var(--hr-prevMarginBlockStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * horzSeparatorVars.fontWeightCustom = 900; // Generates "--hr-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * horzSeparatorVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", horzSeparatorVars.prevMarginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--hr-boxShadow: 0px 0px 0px calc(var(--hr-prevMarginBlockStart) / 4) gray;"
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
 *     --hr-opacity: 0.25;
 *     --hr-borderStyle: var(--bor-style);
 *     --hr-borderWidth: var(--bor-defaultWidth);
 *     --hr-borderColor: currentcolor;
 *     --hr-marginInlineStart: 0em;
 *     --hr-marginInlineEnd: 0em;
 *     --hr-prevMarginBlockStart: 1em;
 *     --hr-nextMarginBlockEnd: 1em;
 *     --hr-fontWeightCustom: 900;
 *     --hr-boxShadow: 0px 0px 0px calc(var(--hr-prevMarginBlockStart) / 4) gray;
 *     --hr-visibility: visible;
 *     --hr-booh: 1234;
 * }
 * ```
 */
export const horzSeparatorVars       = config[0];

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
 * const definition = horzSeparatorVarDefs.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--hr-prevMarginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * horzSeparatorVarDefs.fontWeightCustom = 900; // Generates "--hr-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * horzSeparatorVarDefs.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", horzSeparatorVars.prevMarginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--hr-boxShadow: 0px 0px 0px calc(var(--hr-prevMarginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * horzSeparatorVarDefs.visibility = 'visible';
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
 * horzSeparatorVarDefs.booh = 1234;
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
 * delete horzSeparatorVarDefs.fontWeightCustom;
 * horzSeparatorVarDefs.fontWeightCustom = null;
 * horzSeparatorVarDefs.fontWeightCustom = undefined;
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
 *     --hr-opacity: 0.25;
 *     --hr-borderStyle: var(--bor-style);
 *     --hr-borderWidth: var(--bor-defaultWidth);
 *     --hr-borderColor: currentcolor;
 *     --hr-marginInlineStart: 0em;
 *     --hr-marginInlineEnd: 0em;
 *     --hr-prevMarginBlockStart: 1em;
 *     --hr-nextMarginBlockEnd: 1em;
 *     --hr-fontWeightCustom: 900;
 *     --hr-boxShadow: 0px 0px 0px calc(var(--hr-prevMarginBlockStart) / 4) gray;
 *     --hr-visibility: visible;
 *     --hr-booh: 1234;
 * }
 * ```
 */
export const horzSeparatorVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * horzSeparatorVarOptions.prefix = 'hr';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * horzSeparatorVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * horzSeparatorVarOptions.onChange.subscribe({
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
 *     --hr-prevMarginBlockStart: 1em;
 *     --hr-nextMarginBlockEnd: 1em;
 * }
 * ```
 */
export const horzSeparatorVarOptions = config[2];



export {
    horzSeparatorVars as default, // Default export for simplified imports.
}
