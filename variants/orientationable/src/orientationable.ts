// cssfn:
import type {
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
}                           from '@cssfn/cssfn'                 // writes css in javascript



// hooks:

// variants:

//#region orientationable
export type OrientationName = 'inline'|'block'
export interface OrientationableRules {
    defaultOrientation        : OrientationName
    
    orientationInlineSelector : CssSelectorCollection
    orientationBlockSelector  : CssSelectorCollection
    
    ifOrientationInline       : (styles: CssStyleCollection) => CssRule
    ifOrientationBlock        : (styles: CssStyleCollection) => CssRule
}

export type OrientationableOptions = Omit<Partial<OrientationableRules>, 'ifOrientationInline'|'ifOrientationBlock'>
export const defaultInlineOrientationableOptions : OrientationableOptions = { defaultOrientation: 'inline' };
export const defaultBlockOrientationableOptions  : OrientationableOptions = { defaultOrientation: 'block'  };

export const usesOrientationable = (options?: OrientationableOptions, defaultOptions = defaultBlockOrientationableOptions): OrientationableRules => {
    const defaultOrientation        = options?.defaultOrientation        ?? defaultOptions.defaultOrientation        ?? 'block';
    const orientationInlineSelector = options?.orientationInlineSelector ?? defaultOptions.orientationInlineSelector ?? ((defaultOrientation === 'inline') ? ':not(:is(.block, .block-start, .block-end))'    : ':is(.inline, .inline-start, .inline-end)');
    const orientationBlockSelector  = options?.orientationBlockSelector  ?? defaultOptions.orientationBlockSelector  ?? ((defaultOrientation === 'block' ) ? ':not(:is(.inline, .inline-start, .inline-end))' : ':is(.block, .block-start, .block-end)' );
    
    
    
    return {
        ...options, // preserves foreign props
        
        defaultOrientation,
        orientationInlineSelector,
        orientationBlockSelector,
        
        ifOrientationInline : (styles: CssStyleCollection) => rule(orientationInlineSelector, styles),
        ifOrientationBlock  : (styles: CssStyleCollection) => rule(orientationBlockSelector , styles),
    };
};



export interface OrientationableProps {
    orientation ?: OrientationName
}
export const useOrientationable = ({orientation}: OrientationableProps, defaultOptions = defaultBlockOrientationableOptions) => ({
    class: orientation ?? null,
    
    get isOrientationBlock(): boolean {
        return(
            (
                orientation
                ??
                defaultOptions.defaultOrientation
            )?.startsWith('block')
            ??
            false
        );
    },
    get isOrientationVertical(): boolean {
        return this.isOrientationBlock;
    },
    get 'aria-orientation'() {
        return (
            this.isOrientationVertical
            ?
            'vertical'
            :
            'horizontal'
        );
    }
});



export type OrientationWithDirectionName = 'inline-start'|'inline-end'|'block-start'|'block-end'
export interface OrientationableWithDirectionRules {
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

export type OrientationableWithDirectionOptions = Omit<Partial<OrientationableWithDirectionRules>, 'ifOrientationInlineStart'|'ifOrientationInlineEnd'|'ifOrientationBlockStart'|'ifOrientationBlockEnd'>
export const defaultInlineStartOrientationableWithDirectionOptions : OrientationableWithDirectionOptions = { defaultOrientation: 'inline-start' };
export const defaultInlineEndOrientationableWithDirectionOptions   : OrientationableWithDirectionOptions = { defaultOrientation: 'inline-end'   };
export const defaultBlockStartOrientationableWithDirectionOptions  : OrientationableWithDirectionOptions = { defaultOrientation: 'block-start'  };
export const defaultBlockEndOrientationableWithDirectionOptions    : OrientationableWithDirectionOptions = { defaultOrientation: 'block-end'    };

export const usesOrientationableWithDirection = (options?: OrientationableWithDirectionOptions, defaultOptions = defaultBlockEndOrientationableWithDirectionOptions): OrientationableWithDirectionRules & Pick<OrientationableRules, 'ifOrientationInline'|'ifOrientationBlock'> => {
    const defaultOrientation             = options?.defaultOrientation             ?? defaultOptions.defaultOrientation             ?? 'block-end';
    const orientationInlineStartSelector = options?.orientationInlineStartSelector ?? defaultOptions.orientationInlineStartSelector ?? ((defaultOrientation === 'inline-start') ? ':not(:is(.block-start, .block-end, .inline-end))'    : '.inline-start');
    const orientationInlineEndSelector   = options?.orientationInlineEndSelector   ?? defaultOptions.orientationInlineEndSelector   ?? ((defaultOrientation === 'inline-end'  ) ? ':not(:is(.block-start, .block-end, .inline-start))'  : '.inline-end'  );
    const orientationBlockStartSelector  = options?.orientationBlockStartSelector  ?? defaultOptions.orientationBlockStartSelector  ?? ((defaultOrientation === 'block-start' ) ? ':not(:is(.inline-start, .inline-end, .block-end))'   : '.block-start' );
    const orientationBlockEndSelector    = options?.orientationBlockEndSelector    ?? defaultOptions.orientationBlockEndSelector    ?? ((defaultOrientation === 'block-end'   ) ? ':not(:is(.inline-start, .inline-end, .block-start))' : '.block-end'   );
    
    
    
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



export interface OrientationableWithDirectionProps {
    orientation ?: OrientationWithDirectionName
}
export const useOrientationableWithDirection = ({orientation}: OrientationableWithDirectionProps) => ({
    class: orientation ?? null,
});
//#endregion orientationable
