// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    type CssClassName,
    
    
    
    // Writes css in javascript:
    rule,
    startsCapitalized,
}                           from '@cssfn/core'                          // Writes css in javascript.

// Reusable-ui variants:
import {
    // Types:
    type Orientation,
    type OrientationVariantProps,
    
    
    
    // Hooks:
    useOrientationVariant,
    
    
    
    // Utilities:
    orientationInlineSelector,
    orientationBlockSelector,
    
    ifOrientationInline,
    ifOrientationBlock,
}                           from '@reusable-ui/orientation-variant'     // A utility for managing orientations consistently across React components.



const orientationClassesCache       = new Map<OrientationName|OrientationWithDirectionName|undefined, CssClassName|null>();
export const createOrientationClass = (orientationName: OrientationName|OrientationWithDirectionName|undefined): CssClassName|null => {
    const cached = orientationClassesCache.get(orientationName);
    if (cached !== undefined) return cached; // null is allowed
    
    
    
    if (orientationName === undefined) {
        orientationClassesCache.set(orientationName, null);
        return null;
    } // if
    
    
    
    const orientationClass = `o${startsCapitalized(orientationName)}`;
    orientationClassesCache.set(orientationName, orientationClass);
    return orientationClass;
};



// utilities:
const fallbacks = <TValue>(value1: TValue|undefined, value2: TValue|undefined, value3: TValue): TValue => {
    if (value1 !== undefined) return value1;
    if (value2 !== undefined) return value2;
    return value3;
};



/**
 * @deprecated - Use `Orientation` instead.
 */
export type OrientationName = Orientation

/**
 * @deprecated - Use `ifOrientationInline` and `ifOrientationBlock` instead.
 */
export interface OrientationableStuff {
    defaultOrientation        : OrientationName
    
    orientationInlineSelector : CssSelectorCollection
    orientationBlockSelector  : CssSelectorCollection
    
    ifOrientationInline       : (styles: CssStyleCollection) => CssRule
    ifOrientationBlock        : (styles: CssStyleCollection) => CssRule
}

/**
 * @deprecated - Use `ifOrientationInline` and `ifOrientationBlock` instead.
 */
export type OrientationableOptions = Omit<Partial<OrientationableStuff>, 'ifOrientationInline'|'ifOrientationBlock'>

/**
 * @deprecated - Use `ifOrientationInline` and `ifOrientationBlock` instead.
 */
export const defaultInlineOrientationableOptions : OrientationableOptions = { defaultOrientation: 'inline' };

/**
 * @deprecated - Use `ifOrientationInline` and `ifOrientationBlock` instead.
 */
export const defaultBlockOrientationableOptions  : OrientationableOptions = { defaultOrientation: 'block'  };

/**
 * @deprecated - Use `ifOrientationInline` and `ifOrientationBlock` instead.
 */
export const usesOrientationable = (options?: OrientationableOptions, defaultOptions = defaultBlockOrientationableOptions): OrientationableStuff => {
    const defaultOrientation = fallbacks<OrientationName>(options?.defaultOrientation, defaultOptions.defaultOrientation, 'block');
    
    
    
    return {
        defaultOrientation,
        
        orientationInlineSelector,
        orientationBlockSelector,
        
        ifOrientationInline,
        ifOrientationBlock,
    } satisfies OrientationableStuff;
};



/**
 * @deprecated - Use `OrientationVariantProps` instead.
 */
export interface OrientationableProps extends OrientationVariantProps {}

/**
 * @deprecated - Use `useOrientationVariant` instead.
 */
export const useOrientationable = (props: OrientationableProps, defaultOptions = defaultBlockOrientationableOptions) => {
    const {
        orientationClassname,
        isOrientationBlock,
        ariaOrientation,
    } = useOrientationVariant(props);
    
    return {
        class: orientationClassname,
        
        isOrientationBlock,
        
        /*
            Assumes block === vertical, in most cases the `writing-mode` is `horizontal-tb`.
            To check for the styling on element is quite expensive (needs to get the ref of the element and then may re-render).
            For performance reason, we assume the `writing-mode = horizontal-tb`.
        */
        isOrientationVertical: isOrientationBlock,
        
        'aria-orientation': ariaOrientation,
    };
};



/**
 * @deprecated - Use combination of `Orientation` and `FlowDirection` instead.
 */
export type OrientationWithDirectionName = 'inline-start'|'inline-end'|'block-start'|'block-end'

/**
 * @deprecated - Use combination of `ifOrientationInline`, `ifOrientationBlock`, `ifFlowDirectionStart`, `ifFlowDirectionEnd` instead.
 */
export interface OrientationableWithDirectionStuff {
    defaultOrientation             : OrientationWithDirectionName
    
    orientationInlineStartSelector : CssSelectorCollection
    orientationInlineEndSelector   : CssSelectorCollection
    orientationBlockStartSelector  : CssSelectorCollection
    orientationBlockEndSelector    : CssSelectorCollection
    
    ifOrientationInlineStart       : (styles: CssStyleCollection) => CssRule
    ifOrientationInlineEnd         : (styles: CssStyleCollection) => CssRule
    ifOrientationBlockStart        : (styles: CssStyleCollection) => CssRule
    ifOrientationBlockEnd          : (styles: CssStyleCollection) => CssRule
}

/**
 * @deprecated - Use combination of `ifOrientationInline`, `ifOrientationBlock`, `ifFlowDirectionStart`, `ifFlowDirectionEnd` instead.
 */
export type OrientationableWithDirectionOptions = Omit<Partial<OrientationableWithDirectionStuff>, 'ifOrientationInlineStart'|'ifOrientationInlineEnd'|'ifOrientationBlockStart'|'ifOrientationBlockEnd'>

/**
 * @deprecated - Use combination of `ifOrientationInline`, `ifOrientationBlock`, `ifFlowDirectionStart`, `ifFlowDirectionEnd` instead.
 */
export const defaultInlineStartOrientationableWithDirectionOptions : OrientationableWithDirectionOptions = { defaultOrientation: 'inline-start' };

/**
 * @deprecated - Use combination of `ifOrientationInline`, `ifOrientationBlock`, `ifFlowDirectionStart`, `ifFlowDirectionEnd` instead.
 */
export const defaultInlineEndOrientationableWithDirectionOptions   : OrientationableWithDirectionOptions = { defaultOrientation: 'inline-end'   };

/**
 * @deprecated - Use combination of `ifOrientationInline`, `ifOrientationBlock`, `ifFlowDirectionStart`, `ifFlowDirectionEnd` instead.
 */
export const defaultBlockStartOrientationableWithDirectionOptions  : OrientationableWithDirectionOptions = { defaultOrientation: 'block-start'  };

/**
 * @deprecated - Use combination of `ifOrientationInline`, `ifOrientationBlock`, `ifFlowDirectionStart`, `ifFlowDirectionEnd` instead.
 */
export const defaultBlockEndOrientationableWithDirectionOptions    : OrientationableWithDirectionOptions = { defaultOrientation: 'block-end'    };

/**
 * @deprecated - Use combination of `ifOrientationInline`, `ifOrientationBlock`, `ifFlowDirectionStart`, `ifFlowDirectionEnd` instead.
 */
export const usesOrientationableWithDirection = (options?: OrientationableWithDirectionOptions, defaultOptions = defaultBlockEndOrientationableWithDirectionOptions): OrientationableWithDirectionStuff & Pick<OrientationableStuff, 'ifOrientationInline'|'ifOrientationBlock'> => {
    const defaultOrientation             = fallbacks<OrientationWithDirectionName>(options?.defaultOrientation             , defaultOptions.defaultOrientation             , 'block-end');
    const orientationInlineStartSelector = fallbacks<CssSelectorCollection       >(options?.orientationInlineStartSelector , defaultOptions.orientationInlineStartSelector , ((defaultOrientation === 'inline-start') ? ':not(:is(.oBlock-start, .oBlock-end, .oInline-end))'    : '.oInline-start'));
    const orientationInlineEndSelector   = fallbacks<CssSelectorCollection       >(options?.orientationInlineEndSelector   , defaultOptions.orientationInlineEndSelector   , ((defaultOrientation === 'inline-end'  ) ? ':not(:is(.oBlock-start, .oBlock-end, .oInline-start))'  : '.oInline-end'  ));
    const orientationBlockStartSelector  = fallbacks<CssSelectorCollection       >(options?.orientationBlockStartSelector  , defaultOptions.orientationBlockStartSelector  , ((defaultOrientation === 'block-start' ) ? ':not(:is(.oInline-start, .oInline-end, .oBlock-end))'   : '.oBlock-start' ));
    const orientationBlockEndSelector    = fallbacks<CssSelectorCollection       >(options?.orientationBlockEndSelector    , defaultOptions.orientationBlockEndSelector    , ((defaultOrientation === 'block-end'   ) ? ':not(:is(.oInline-start, .oInline-end, .oBlock-start))' : '.oBlock-end'   ));
    
    
    
    return {
        ...options, // preserves foreign props
        
        defaultOrientation,
        orientationInlineStartSelector,
        orientationInlineEndSelector,
        orientationBlockStartSelector,
        orientationBlockEndSelector,
        
        ifOrientationInlineStart : (styles: CssStyleCollection) => rule(orientationInlineStartSelector, styles),
        ifOrientationInlineEnd   : (styles: CssStyleCollection) => rule(orientationInlineEndSelector  , styles),
        ifOrientationBlockStart  : (styles: CssStyleCollection) => rule(orientationBlockStartSelector , styles),
        ifOrientationBlockEnd    : (styles: CssStyleCollection) => rule(orientationBlockEndSelector   , styles),
        
        ifOrientationInline      : (styles: CssStyleCollection) => rule([orientationInlineStartSelector, orientationInlineEndSelector], styles),
        ifOrientationBlock       : (styles: CssStyleCollection) => rule([orientationBlockStartSelector , orientationBlockEndSelector ], styles),
    };
};



/**
 * @deprecated - Use combination of `OrientationVariantProps` and `FlowDirectionVariantProps` instead.
 */
export interface OrientationableWithDirectionProps {
    // variants:
    orientation ?: OrientationWithDirectionName
}

/**
 * @deprecated - Use combination of `useOrientationVariant` and `useFlowDirectionVariant` instead.
 */
export const useOrientationableWithDirection = ({orientation}: OrientationableWithDirectionProps, defaultOptions = defaultBlockEndOrientationableWithDirectionOptions) => ({
    class: createOrientationClass(orientation) ?? null,
    
    get orientation(): OrientationWithDirectionName {
        return(
            orientation
            ??
            defaultOptions.defaultOrientation
            ??
            defaultBlockEndOrientationableWithDirectionOptions.defaultOrientation!
        );
    },
});
