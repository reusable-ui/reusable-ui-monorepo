// cssfn:
import {
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    CssSelectorCollection,
    
    
    
    // writes css in javascript:
    rule,
}                           from '@cssfn/core'                  // writes css in javascript



// hooks:

// variants:

//#region orientationable
//#region caches
let defaultInlineOrientationableStuffsCache : WeakRef<OrientationableStuff>|undefined = undefined;
let defaultBlockOrientationableStuffsCache  : WeakRef<OrientationableStuff>|undefined = undefined;

// rarely used:
// let defaultInlineStartOrientationableWithDirectionStuffsCache : WeakRef<OrientationableWithDirectionStuff>|undefined = undefined;
// let defaultInlineEndOrientationableWithDirectionStuffsCache   : WeakRef<OrientationableWithDirectionStuff>|undefined = undefined;
// let defaultBlockStartOrientationableWithDirectionStuffsCache  : WeakRef<OrientationableWithDirectionStuff>|undefined = undefined;
// let defaultBlockEndOrientationableWithDirectionStuffsCache    : WeakRef<OrientationableWithDirectionStuff>|undefined = undefined;
//#endregion caches



// utilities:
const fallbacks = <TValue>(value1: TValue|undefined, value2: TValue|undefined, value3: TValue): TValue => {
    if (value1 !== undefined) return value1;
    if (value2 !== undefined) return value2;
    return value3;
};



export type OrientationName = 'inline'|'block'
export interface OrientationableStuff {
    defaultOrientation        : OrientationName
    
    orientationInlineSelector : CssSelectorCollection
    orientationBlockSelector  : CssSelectorCollection
    
    ifOrientationInline       : (styles: CssStyleCollection) => CssRule
    ifOrientationBlock        : (styles: CssStyleCollection) => CssRule
}

export type OrientationableOptions = Omit<Partial<OrientationableStuff>, 'ifOrientationInline'|'ifOrientationBlock'>
export const defaultInlineOrientationableOptions : OrientationableOptions = { defaultOrientation: 'inline' };
export const defaultBlockOrientationableOptions  : OrientationableOptions = { defaultOrientation: 'block'  };

export const usesOrientationable = (options?: OrientationableOptions, defaultOptions = defaultBlockOrientationableOptions): OrientationableStuff => {
    const isDefaultBlock  = (
        (defaultOptions === defaultBlockOrientationableOptions)
        &&
        (
            (options === undefined)
            ||
            (options === defaultOptions)
            ||
            (
                (options.defaultOrientation        === defaultOptions.defaultOrientation       )
                &&
                (options.orientationInlineSelector === defaultOptions.orientationInlineSelector)
                &&
                (options.orientationBlockSelector  === defaultOptions.orientationBlockSelector )
            )
        )
    );
    const isDefaultInline = !isDefaultBlock && (
        (defaultOptions === defaultInlineOrientationableOptions)
        &&
        (
            (options === undefined)
            ||
            (options === defaultOptions)
            ||
            (
                (options.defaultOrientation        === defaultOptions.defaultOrientation       )
                &&
                (options.orientationInlineSelector === defaultOptions.orientationInlineSelector)
                &&
                (options.orientationBlockSelector  === defaultOptions.orientationBlockSelector )
            )
        )
    );
    if (isDefaultBlock) {
        const cached = defaultBlockOrientationableStuffsCache?.deref();
        if (cached) return cached;
    }
    else if (isDefaultInline) {
        const cached = defaultInlineOrientationableStuffsCache?.deref();
        if (cached) return cached;
    } // if
    
    
    
    const defaultOrientation        = fallbacks<OrientationName      >(options?.defaultOrientation        , defaultOptions.defaultOrientation        , 'block');
    const orientationInlineSelector = fallbacks<CssSelectorCollection>(options?.orientationInlineSelector , defaultOptions.orientationInlineSelector , ((defaultOrientation === 'inline') ? ':not(:is(.oBlock, .oBlock-start, .oBlock-end))'    : ':is(.oInline, .oInline-start, .oInline-end)'));
    const orientationBlockSelector  = fallbacks<CssSelectorCollection>(options?.orientationBlockSelector  , defaultOptions.orientationBlockSelector  , ((defaultOrientation === 'block' ) ? ':not(:is(.oInline, .oInline-start, .oInline-end))' : ':is(.oBlock, .oBlock-start, .oBlock-end)' ));
    
    
    
    const result : OrientationableStuff = {
        ...options, // preserves foreign props
        
        defaultOrientation,
        orientationInlineSelector,
        orientationBlockSelector,
        
        ifOrientationInline : (styles: CssStyleCollection) => rule(orientationInlineSelector, styles),
        ifOrientationBlock  : (styles: CssStyleCollection) => rule(orientationBlockSelector , styles),
    };
    if (isDefaultBlock) {
        defaultBlockOrientationableStuffsCache = new WeakRef<OrientationableStuff>(result);
    }
    else if (isDefaultInline) {
        defaultInlineOrientationableStuffsCache = new WeakRef<OrientationableStuff>(result);
    } // if
    return result;
};



export interface OrientationableProps {
    // variants:
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
        /*
            Assumes block === vertical, in most cases the `writing-mode` is `horizontal-tb`.
            To check for the styling on element is quite expensive (needs to get the ref of the element and then may re-render).
            For performance reason, we assume the `writing-mode = horizontal-tb`.
        */
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

export type OrientationableWithDirectionOptions = Omit<Partial<OrientationableWithDirectionStuff>, 'ifOrientationInlineStart'|'ifOrientationInlineEnd'|'ifOrientationBlockStart'|'ifOrientationBlockEnd'>
export const defaultInlineStartOrientationableWithDirectionOptions : OrientationableWithDirectionOptions = { defaultOrientation: 'inline-start' };
export const defaultInlineEndOrientationableWithDirectionOptions   : OrientationableWithDirectionOptions = { defaultOrientation: 'inline-end'   };
export const defaultBlockStartOrientationableWithDirectionOptions  : OrientationableWithDirectionOptions = { defaultOrientation: 'block-start'  };
export const defaultBlockEndOrientationableWithDirectionOptions    : OrientationableWithDirectionOptions = { defaultOrientation: 'block-end'    };

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



export interface OrientationableWithDirectionProps {
    // variants:
    orientation ?: OrientationWithDirectionName
}
export const useOrientationableWithDirection = ({orientation}: OrientationableWithDirectionProps, defaultOptions = defaultBlockEndOrientationableWithDirectionOptions) => ({
    class: orientation ?? null,
    
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
//#endregion orientationable
