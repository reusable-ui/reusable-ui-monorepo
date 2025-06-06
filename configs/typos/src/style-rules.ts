// Cssfn:
import {
    // Cssfn properties:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    rules,
    alwaysRule,
    neverRule,
    children,
    
    
    
    // Reads/writes css variables configuration:
    type Refs,
    type CssConfigProps,
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
    
    
    
    // Manipulates css selector - parse, transform, calculate specificity, and more:
    type SelectorGroup,
    parseSelectors,
    selectorsToString,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type ElementFilter,
}                           from './style-types.js'

// Utilities:
import {
    parseRelated,
}                           from './style-utilities.js'



// Conditional rules:

/**
 * Applies the specified `styles` when the current element **follows** the given `selector`.
 *
 * ### **Usage Example**
 * ```ts
 * const myStyle = style({
 *     ............
 *     ...ifFollows('.something', {
 *         opacity: 0.5, // Applies opacity if the current element follows `.something`.
 *     }),
 * });
 * ```
 *
 * @param selector - The target selector to check.
 * @param styles - CSS styles to apply when the condition is met.
 * @returns A `CssRule` object for conditional styling.
 */
const ifFollows = (selector: string, styles: CssStyleCollection): CssRule => {
    if (!selector) return neverRule(); // No selector → Never apply the styles.
    
    
    
    return rule(`:where(${selector})+&`, styles); // Uses `:where()` for **zero specificity** to allow easy overrides.
};

/**
 * Applies the specified `styles` when the current element **precedes** the given `selector`.
 *
 * ### **Usage Example**
 * ```ts
 * const myStyle = style({
 *     ............
 *     ...ifPrecedes('.something', {
 *         opacity: 0.5, // Applies opacity if the current element precedes `.something`.
 *     }),
 * });
 * ```
 *
 * @param selector - The target selector to check.
 * @param styles - CSS styles to apply when the condition is met.
 * @returns A `CssRule` object for conditional styling.
 */
const ifPrecedes = (selector: string, styles: CssStyleCollection): CssRule => {
    if (!selector) return neverRule(); // No selector → Never apply the styles.
    
    
    
    return rule(`&:has(+:where(${selector}))`, styles); // Uses `:where()` for **zero specificity** to allow easy overrides.
};



// Generic rules:

/**
 * Configuration options for styling either inline-like or block-like elements.
 */
export interface ElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for the target elements.
     */
    elementFilter    : ElementFilter
    
    /**
     * Defines **recognized neighboring elements** that trigger automatic **margin adjustments**.
     */
    spacingFilters   : ElementFilter[]
    
    /**
     * References CSS variables for managing spacing and typography.
     */
    elementVars      : Refs<CssConfigProps>
}

/**
 * Generates a styling rule for either inline-like or block-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param isBlock - Determines whether the rule applies to inline-like (`false`) or block-like (`true`) elements.
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for the target elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * @param extendedLayoutStyles - Optional styles for additional layout-related customizations.
 * @param extendedConditionalStyles - Optional conditional styles wrapped within logic (`...ifSomething({ ... })`).
 * 
 * @returns A `CssRule` object for styling block-like or inline-like elements.
 */
const elementRule = (isBlock: boolean, options: ElementRuleOptions, extendedLayoutStyles?: CssStyleCollection, extendedConditionalStyles?: CssStyleCollection): CssRule => {
    // Extract Options:
    const {
        elementFilter : {
            selectors,
            exclusions,
        },
        spacingFilters,
        elementVars,
    } = options;
    
    
    
    // Parse spacing element selectors for easy processing:
    const parsedSpacingElements   : SelectorGroup        = parseRelated(spacingFilters);
    const spacingElements         : string               = selectorsToString(parsedSpacingElements);
    
    
    
    // Parse exclusion element selectors for easy processing:
    const parsedExclusionElements : SelectorGroup | null = parseSelectors(exclusions);
    if (process.env.NODE_ENV === 'development') {
        if (!parsedExclusionElements) throw TypeError('Invalid CSS selector in `options.elementFilter.exclusions`.');
    } // if
    const exclusionElements       : string               = parsedExclusionElements ? selectorsToString(parsedExclusionElements) : '';
    
    
    
    // Determine margin properties based on element type:
    const marginStartProp = isBlock ? 'marginBlockStart' : 'marginInlineStart';
    const marginEndProp   = isBlock ? 'marginBlockEnd'   : 'marginInlineEnd';
    
    
    
    // Generate a block-like or inline-like styling rule:
    return rule(selectors, {
        /**
         * **Exclusion Handling**
         * Ensures target elements do not inherit styles from excluded selectors.
         * 
         * Uses `:where()` for **zero specificity** to allow easy overrides.
         */
        ...rule(exclusionElements ? `:not(:where(${exclusionElements}))` : '&', {
            // Layouts:
            display : isBlock ? 'block' : 'inline',
            
            
            
            // Extended Layouts:
            ...alwaysRule(extendedLayoutStyles),
            
            
            
            // Configs:
            ...usesCssProps(elementVars),
            
            
            
            // Spacings:
            
            // Conditional start margin:
            [marginStartProp] : 0, // Resets default start margin.
            ...ifFollows(spacingElements, {
                [marginStartProp] : elementVars[marginStartProp], // Applies spacing when follows another related element.
            }),
            
            // Conditional end margin:
            [marginEndProp] : 0, // Resets default end margin.
            ...ifPrecedes(spacingElements, {
                [marginEndProp] : elementVars[marginEndProp], // Applies spacing when precedes another related element.
            }),
            
            
            
            // Extended Conditionals:
            ...alwaysRule(extendedConditionalStyles),
        }),
    });
};


/**
 * Configuration options for styling block-like elements.
 */
export interface BlockElementRuleOptions extends ElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for block-like elements.
     */
    elementFilter    : ElementFilter
    
    /**
     * Defines **recognized neighboring elements** that trigger automatic **top/bottom margin adjustments**.
     */
    spacingFilters   : ElementFilter[]
}

/**
 * Generates a styling rule for block-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for block-like elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic top/bottom margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * @param extendedLayoutStyles - Optional styles for additional layout-related customizations.
 * @param extendedConditionalStyles - Optional conditional styles wrapped within logic (`...ifSomething({ ... })`).
 * 
 * @returns A `CssRule` object for styling block-like elements.
 */
export const blockElementRule = (options: BlockElementRuleOptions, extendedLayoutStyles?: CssStyleCollection, extendedConditionalStyles?: CssStyleCollection): CssRule => {
    return elementRule(true, options, extendedLayoutStyles, extendedConditionalStyles);
};


/**
 * Configuration options for styling inline-like elements.
 */
export interface InlineElementRuleOptions extends ElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for inline-like elements.
     */
    elementFilter    : ElementFilter
    
    /**
     * Defines **recognized neighboring elements** that trigger automatic **left/right margin adjustments**.
     */
    spacingFilters   : ElementFilter[]
}

/**
 * Generates a styling rule for inline-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for inline-like elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic left/right margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * @param extendedLayoutStyles - Optional styles for additional layout-related customizations.
 * @param extendedConditionalStyles - Optional conditional styles wrapped within logic (`...ifSomething({ ... })`).
 * 
 * @returns A `CssRule` object for styling inline-like elements.
 */
export const inlineElementRule = (options: InlineElementRuleOptions, extendedLayoutStyles?: CssStyleCollection, extendedConditionalStyles?: CssStyleCollection): CssRule => {
    return elementRule(false, options, extendedLayoutStyles, extendedConditionalStyles);
};



// Style rules:

/**
 * Configuration options for styling paragraph-like elements.
 */
export interface ParagraphRuleOptions extends BlockElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for paragraph-like elements.
     */
    elementFilter    : ElementFilter
}

/**
 * Generates a styling rule for paragraph-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for paragraph-like elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic top/bottom margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * 
 * @returns A `CssRule` object for styling paragraph-like elements.
 */
export const paragraphRule = blockElementRule as (options: ParagraphRuleOptions) => CssRule;



/**
 * Configuration options for styling heading-like elements.
 */
export interface HeadingRuleOptions extends BlockElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for heading-like elements.
     */
    elementFilter    : ElementFilter
    
    /**
     * Defines **recognized companion elements** that influence stylistic adjustments  
     * (e.g., dimming opacity when a heading follows another heading or display).
     * 
     * These elements form **logical groupings** that interact visually,  
     * ensuring cohesive styling while maintaining adaptive flexibility.
     * 
     * **Current Usage**  
     * - **`headingRule`** → Recognizes `displayRule` as a companion element.  
     * - **`displayRule`** → Recognizes `headingRule` as a companion element.  
     */
    companionFilters : ElementFilter[]
}

/**
 * Generates a styling rule for heading-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for heading-like elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic top/bottom margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * 
 * @returns A `CssRule` object for styling heading-like elements.
 */
export const headingRule = (options: HeadingRuleOptions): CssRule => {
    // Extract Options:
    const {
        companionFilters,
        elementVars,
    } = options;
    
    
    
    // Render the companion elements selector for easy processing:
    const parsedCompanionElements : SelectorGroup        = parseRelated(companionFilters);
    const companionElements       : string               = selectorsToString(parsedCompanionElements);
    
    
    
    // Generate a heading-like styling rule:
    return blockElementRule(options, undefined, {
        // Appearances:
        
        // Conditional opacity:
        ...ifFollows(companionElements, {
            opacity : elementVars.subOpacity, // Applies transparency when follows another heading-like element.
        }),
    });
};


/**
 * Configuration options for resolving **heading font sizes** based on level.
 */
export interface HeadingLevelRuleOptions {
    /**
     * List of numeric heading levels to be mapped (e.g., `[1, 2, 3, 4, 5, 6]`).
     */
    levels          : number[]
    
    /**
     * Function that generates the corresponding CSS selectors for a given heading level.
     * 
     * Example:
     * ```ts
     * (level: number) => [`h${level}`, `.h${level}`]
     * ```
     */
    selectorFactory : (level: number) => CssSelectorCollection,
    
    /**
     * References CSS variables for managing spacing and typography across multiple levels.
     */
    elementVars      : Refs<CssConfigProps>,
}

/**
 * Generates styling rules for heading levels, dynamically mapping font sizes to the correct level.
 *
 * @param options - The configuration object containing:
 *   - `levels`: Array of numeric heading levels (e.g., `[1, 2, 3, 4, 5, 6]`).
 *   - `selectorFactory`: Function to generate CSS selectors based on heading level.
 *   - `elementVars`: References CSS variables for managing spacing and typography across multiple levels.
 * 
 * @returns A `CssRule` object for resolving font sizes per heading level.
 */
export const headingLevelRule = (options: HeadingLevelRuleOptions): CssRule => {
    // Extract Options:
    const {
        levels,
        selectorFactory,
        elementVars,
    } = options;
    
    
    
    // Generate rules for resolving font sizes per heading level:
    return rules(
        levels
        .map((level) =>
            rule(selectorFactory(level), {
                // Configs:
                ...overwriteProps(elementVars, usesSuffixedProps(elementVars, `${level}`)), // Apply the corresponding font size for each heading level.
                // Example: `--h-fontSize : var(--h-fontSize1);`
            }, { specificityWeight: 1 }), // One specificity to allow easy overrides and sync specificity with main styling.
        )
    );
};



/**
 * Configuration options for styling blockquote-like elements.
 */
export interface BlockquoteRuleOptions extends BlockElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for blockquote-like elements.
     */
    elementFilter    : ElementFilter
}

/**
 * Generates a styling rule for blockquote-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for blockquote-like elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic top/bottom margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * 
 * @returns A `CssRule` object for styling blockquote-like elements.
 */
export const blockquoteRule = (options: BlockquoteRuleOptions): CssRule => {
    // Extract Options:
    const {
        elementVars,
    } = options;
    
    
    
    // Dependencies:
    
    // Features:
    // const { backgroundVars } = usesBackground(); // TODO: fix this.
    // const { foregroundVars } = usesForeground(); // TODO: fix this.
    
    
    
    // Generate a blockquote-like styling rule:
    return blockElementRule(options, {
        // Positions:
        position    : 'relative', // Allows absolute positioning for decorative elements.
        
        
        
        // Borders:
        // TODO: fix this:
        // borderColor : backgroundVars.backgColorMildBase, // Use mild variant of background color.
        
        
        
        // Children:
        
        // Decorative **quote symbol** element:
        ...children('::before', {
            // Positions:
            position      : 'absolute',
            
            
            
            // Layouts:
            display       : 'inline',
            
            
            
            // Foregrounds:
            // TODO: fix this:
            // color         : backgroundVars.backgColorMildText, // Use mild variant of foreground color.
            
            
            
            // Spacings:
            paddingInline : '0.33em',
            
            
            
            // Configs:
            ...usesCssProps(usesPrefixedProps(elementVars, 'quote')), // Apply config's cssProps starting with `quote**`.
        }),
    });
};



/**
 * Configuration options for styling list-like elements.
 */
export interface PlainListRuleOptions extends BlockElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for list-like elements.
     */
    elementFilter    : ElementFilter
}

/**
 * Generates a styling rule for list-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for list-like elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic top/bottom margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * 
 * @returns A `CssRule` object for styling list-like elements.
 */
export const plainListRule = (options: PlainListRuleOptions): CssRule => {
    // Extract Options:
    const {
        elementVars,
    } = options;
    
    
    
    // Generate a list-like styling rule:
    return blockElementRule(options, {
        // Spacings:
        padding : 0, // Resets default padding.
        
        
        
        // Children:
        
        // List item elements (`<li>`, `.li`):
        ...children(':where(li, .li)', { // Zero specificity to allow easy overrides.
            // Layouts:
            display : 'list-item', // Maintains list-item behavior.
            
            
            
            // Configs:
            ...usesCssProps(usesPrefixedProps(elementVars, 'li')), // Apply config's cssProps starting with `li**`.
        }),
        
        
        
        // Configs:
        ...rule(['ul', '.ul'], {
            ...usesCssProps(usesPrefixedProps(elementVars, 'ul')), // Apply config's cssProps starting with `ul**`.
        }, { specificityWeight: 0 }), // Zero specificity to allow easy overrides.
        ...rule(['ol', '.ol'], {
            ...usesCssProps(usesPrefixedProps(elementVars, 'ol')), // Apply config's cssProps starting with `ol**`.
        }, { specificityWeight: 0 }), // Zero specificity to allow easy overrides.
    });
};



/**
 * Configuration options for styling horizontal-separator-like elements.
 */
export interface HorzSeparatorRuleOptions extends BlockElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for horizontal-separator-like elements.
     */
    elementFilter    : ElementFilter
}

/**
 * Generates a styling rule for horizontal-separator-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for horizontal-separator-like elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic top/bottom margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * 
 * @returns A `CssRule` object for styling horizontal-separator-like elements.
 */
export const horzSeparatorRule = blockElementRule as (options: HorzSeparatorRuleOptions) => CssRule;



/**
 * Configuration options for styling mark-like elements.
 */
export interface MarkRuleOptions extends InlineElementRuleOptions {
    /**
     * Defines selectors and exclusions criteria for mark-like elements.
     */
    elementFilter    : ElementFilter
}

/**
 * Generates a styling rule for mark-like elements, applying configurable exclusions, spacing logic, and CSS variables.
 *
 * @param options - Configuration object containing:
 *   - `elementFilter`: Defines selectors and exclusions criteria for mark-like elements.
 *   - `spacingFilters`: Defines neighboring elements that trigger automatic left/right margin adjustments.
 *   - `elementVars`: References CSS variables for managing spacing and typography.
 * 
 * @returns A `CssRule` object for styling mark-like elements.
 */
export const markRule = (options: MarkRuleOptions): CssRule => {
    // Generate a mark-like styling rule:
    return inlineElementRule(options, {
        // Layouts:
        display : 'inline-block', // Keeps elements inline but allows custom spacing.
        
        
        
        // Typos:
        // @ts-ignore
        textBoxTrim : 'trim-both',
        // @ts-ignore
        textBoxEdge : 'cap alphabetic',
    });
};
