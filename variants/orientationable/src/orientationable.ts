// cssfn:
import type {
    // cssfn properties:
    CssSelectorCollection,
}                           from '@cssfn/css-types'         // cssfn css specific types



// hooks:

// variants:

//#region orientationable
export type OrientationName = 'inline'|'block'
export interface OrientationableRules {
    defaultOrientation        : OrientationName
    
    orientationInlineSelector : CssSelectorCollection
    orientationBlockSelector  : CssSelectorCollection
}

export interface OrientationableOptions extends Partial<OrientationableRules> {}
export const defaultInlineOrientationableOptions : OrientationableOptions = { defaultOrientation: 'inline' };
export const defaultBlockOrientationableOptions  : OrientationableOptions = { defaultOrientation: 'block'  };

export const usesOrientationable = (options?: OrientationableOptions, defaultOptions = defaultBlockOrientationableOptions): OrientationableRules => {
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



export interface OrientationableProps {
    orientation ?: OrientationName
}
export const useOrientationable = ({orientation}: OrientationableProps) => ({
    class: orientation ?? null,
});



export type OrientationWithDirectionName = 'inline-start'|'inline-end'|'block-start'|'block-end'
export interface OrientationableWithDirectionRules {
    defaultOrientation             : OrientationWithDirectionName
    
    orientationInlineStartSelector : CssSelectorCollection
    orientationInlineEndSelector   : CssSelectorCollection
    orientationBlockStartSelector  : CssSelectorCollection
    orientationBlockEndSelector    : CssSelectorCollection
}

export interface OrientationableWithDirectionOptions extends Partial<OrientationableWithDirectionRules> {}
export const defaultInlineStartOrientationableWithDirectionOptions : OrientationableWithDirectionOptions = { defaultOrientation: 'inline-start' };
export const defaultInlineEndOrientationableWithDirectionOptions   : OrientationableWithDirectionOptions = { defaultOrientation: 'inline-end'   };
export const defaultBlockStartOrientationableWithDirectionOptions  : OrientationableWithDirectionOptions = { defaultOrientation: 'block-start'  };
export const defaultBlockEndOrientationableWithDirectionOptions    : OrientationableWithDirectionOptions = { defaultOrientation: 'block-end'    };

export const usesOrientationableWithDirection = (options?: OrientationableWithDirectionOptions, defaultOptions = defaultBlockEndOrientationableWithDirectionOptions): OrientationableWithDirectionRules => {
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



export interface OrientationableWithDirectionProps {
    orientation ?: OrientationWithDirectionName
}
export const useOrientationableWithDirection = ({orientation}: OrientationableWithDirectionProps) => ({
    class: orientation ?? null,
});
//#endregion orientationable
