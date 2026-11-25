// Cssfn:
import {
    // Cssfn css specific types:
    type CssKnownProps,
    
    
    
    // Reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultVertSeparatorPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Configs:
import {
    horzSeparatorVars,
}                           from './css-horz-separator-config.js'



// Configs:

const config = cssConfig(() => {
    return {
        // Appearances:
        
        /**
         * Defines the **transparency level** for vertical separators.
         * Ensures subtle visual distinction without overpowering surrounding content.
         */
        opacity                : horzSeparatorVars.opacity              as CssKnownProps['opacity'           ],
        
        
        
        // Borders:
        
        /**
         * Defines the **border style** for vertical separators.
         * Typically uses the default border style for consistency.
         */
        borderStyle            : horzSeparatorVars.borderStyle          as CssKnownProps['borderStyle'       ],
        
        /**
         * Defines the **border width** for vertical separators.
         * Typically uses the default border width for visual clarity.
         */
        borderWidth            : horzSeparatorVars.borderWidth          as CssKnownProps['borderWidth'       ],
        
        /**
         * Defines the **border color** for vertical separators.
         * Typically uses the **current text color** (`currentcolor`) for subtle emphasis.
         */
        borderColor            : horzSeparatorVars.borderColor          as CssKnownProps['borderColor'       ],
        
        
        
        // Spacings:
        
        /**
         * Defines the **left margin** for vertical separators.
         * Ensures structured horizontal spacing before the separator.
         */
        marginInlineStart      : '0em'                                  as CssKnownProps['marginInlineStart' ],
        
        /**
         * Defines the **right margin** for vertical separators.
         * Ensures structured horizontal spacing after the separator.
         */
        marginInlineEnd        : '0em'                                  as CssKnownProps['marginInlineEnd'   ],
        
        /**
         * Defines the **top margin** for vertical separators.
         * Typically `0em` to maintain alignment across side-by-side sections.
         */
        marginBlockStart       : '0em'                                  as CssKnownProps['marginBlockStart'  ],
        
        /**
         * Defines the **bottom margin** for vertical separators.
         * Typically `0em` to maintain alignment across side-by-side sections.
         */
        marginBlockEnd         : '0em'                                  as CssKnownProps['marginBlockEnd'    ],
    };
}, { prefix: defaultVertSeparatorPrefix });

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
 * const value = vertSeparatorVars.marginBlockStart; // Resolves to "var(--hr-marginBlockStart)"
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * vertSeparatorVars.fontWeightCustom = 900; // Generates "--hr-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * vertSeparatorVars.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", vertSeparatorVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * vertSeparatorVars.visibility = 'visible';
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
 * vertSeparatorVars.booh = 1234;
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
 * delete vertSeparatorVars.fontWeightCustom;
 * vertSeparatorVars.fontWeightCustom = null;
 * vertSeparatorVars.fontWeightCustom = undefined;
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
 *     --hr-marginBlockStart: 1em;
 *     --hr-marginBlockEnd: 1em;
 *     --hr-fontWeightCustom: 900;
 *     --hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;
 *     --hr-visibility: visible;
 *     --hr-booh: 1234;
 * }
 * ```
 */
export const vertSeparatorVars       = config[0];

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
 * const definition = vertSeparatorVarDefs.boxShadow; // Resolves to [[ "0px", "0px", "0px", "calc(", "var(--hr-marginBlockStart)", " / 4)", "gray" ]]
 * ```
 * 
 * #### **Assigning a Custom Value (Setter)**
 * **Direct Assignment:**
 * ```ts
 * vertSeparatorVarDefs.fontWeightCustom = 900; // Generates "--hr-fontWeightCustom: 900;"
 * ```
 * 
 * **Definition Assignment:**
 * ```ts
 * vertSeparatorVarDefs.boxShadow = [[
 *    "0px", "0px", "0px", "calc(", vertSeparatorVars.marginBlockStart, " / 4)", "gray"
 * ]]; // Generates "--hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;"
 * ```
 * 
 * #### **Automatic Application of Valid CSS Properties**
 * When a custom value is assigned using a **valid CSS property name**, it is automatically applied within the styling stylesheet:
 * ```ts
 * vertSeparatorVarDefs.visibility = 'visible';
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
 * vertSeparatorVarDefs.booh = 1234;
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
 * delete vertSeparatorVarDefs.fontWeightCustom;
 * vertSeparatorVarDefs.fontWeightCustom = null;
 * vertSeparatorVarDefs.fontWeightCustom = undefined;
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
 *     --hr-marginBlockStart: 1em;
 *     --hr-marginBlockEnd: 1em;
 *     --hr-fontWeightCustom: 900;
 *     --hr-boxShadow: 0px 0px 0px calc(var(--hr-marginBlockStart) / 4) gray;
 *     --hr-visibility: visible;
 *     --hr-booh: 1234;
 * }
 * ```
 */
export const vertSeparatorVarDefs    = config[1];

/**
 * A `LiveCssConfigOptions` object manages configuration related to **CSS variables for typography system**.
 * It provides control over prefixes, selectors, and dynamic updates.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all typography variables.
 * ```ts
 * vertSeparatorVarOptions.prefix = 'hr';
 * ```
 * - **Selector Scope:**  
 * Ensures all typography variables are declared inside `:root`.
 * ```ts
 * vertSeparatorVarOptions.selector = ':root';
 * ```
 * - **Change Listener:**  
 * Detects updates and responds dynamically.
 * ```ts
 * vertSeparatorVarOptions.onChange.subscribe({
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
export const vertSeparatorVarOptions = config[2];



export {
    vertSeparatorVars as default, // Default export for simplified imports.
}
