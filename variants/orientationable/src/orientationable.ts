// cssfn:
import type {
    // cssfn properties:
    CssSelectorCollection,
}                           from '@cssfn/css-types'         // cssfn css specific types



// hooks:

// variants:

//#region orientationable
export type OrientationName = 'inline'|'block'
export interface OrientationMixin {
    defaultOrientation        : OrientationName
    
    orientationInlineSelector : CssSelectorCollection,
    orientationBlockSelector  : CssSelectorCollection,
}

export interface OrientationVariantOptions extends Partial<OrientationMixin> {}
export const defaultInlineOrientationVariantOptions : OrientationVariantOptions = { defaultOrientation: 'inline' };
export const defaultBlockOrientationVariantOptions  : OrientationVariantOptions = { defaultOrientation: 'block'  };

export const usesOrientationVariant = (options?: OrientationVariantOptions, defaultOptions = defaultBlockOrientationVariantOptions): OrientationMixin => {
    const defaultOrientation        = options?.defaultOrientation        ?? defaultOptions.defaultOrientation        ?? 'block';
    const orientationInlineSelector = options?.orientationInlineSelector ?? defaultOptions.orientationInlineSelector ?? ((defaultOrientation === 'inline') ? ':not(.block)'  : '.inline');
    const orientationBlockSelector  = options?.orientationBlockSelector  ?? defaultOptions.orientationBlockSelector  ?? ((defaultOrientation === 'block' ) ? ':not(.inline)' : '.block' );
    
    
    
    return {
        ...options, // preserves foreign props
        
        defaultOrientation,
        orientationInlineSelector,
        orientationBlockSelector,
    };
};



export interface OrientationVariant {
    orientation ?: OrientationName
}
export const useOrientationVariant = ({orientation}: OrientationVariant) => ({
    class: orientation ?? null,
});



export type OrientationWithDirectionName = 'inline-start'|'inline-end'|'block-start'|'block-end'
export interface OrientationWithDirectionMixin {
    defaultOrientation             : OrientationWithDirectionName
    
    orientationInlineStartSelector : CssSelectorCollection
    orientationInlineEndSelector   : CssSelectorCollection
    orientationBlockStartSelector  : CssSelectorCollection
    orientationBlockEndSelector    : CssSelectorCollection
}

export interface OrientationWithDirectionVariantOptions extends Partial<OrientationWithDirectionMixin> {}
export const defaultInlineStartOrientationWithDirectionVariantOptions : OrientationWithDirectionVariantOptions = { defaultOrientation: 'inline-start' };
export const defaultInlineEndOrientationWithDirectionVariantOptions   : OrientationWithDirectionVariantOptions = { defaultOrientation: 'inline-end'   };
export const defaultBlockStartOrientationWithDirectionVariantOptions  : OrientationWithDirectionVariantOptions = { defaultOrientation: 'block-start'  };
export const defaultBlockEndOrientationWithDirectionVariantOptions    : OrientationWithDirectionVariantOptions = { defaultOrientation: 'block-end'    };

export const usesOrientationWithDirectionVariant = (options?: OrientationWithDirectionVariantOptions, defaultOptions = defaultBlockEndOrientationWithDirectionVariantOptions): OrientationWithDirectionMixin => {
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
    };
};



export interface OrientationWithDirectionVariant {
    orientation ?: OrientationWithDirectionName
}
export const useOrientationWithDirectionVariant = ({orientation}: OrientationWithDirectionVariant) => ({
    class: orientation ?? null,
});
//#endregion orientationable
