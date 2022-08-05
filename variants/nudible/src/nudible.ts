// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    
    
    
    // styles:
    style,
}                           from '@cssfn/cssfn'                 // writes css in javascript

// reusable-ui features:
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'         // padding (inner spacing) stuff of UI



// hooks:

// variants:

//#region nudible
// by design: grandpa's `.nude` does not affect current `.nude`
// parent not `.nude` -and- current not `.nude`:
export const ifNotNude = (styles: CssStyleCollection): CssRule => rule(':not(.nude)&:where(:not(.nude))', styles);
// parent is  `.nude` -or-  current is  `.nude`:
export const ifNude    = (styles: CssStyleCollection): CssRule => rule(':is(.nude&, &.nude)'            , styles);



export interface NudibleRules { nudibleRule: Factory<CssRule> }
/**
 * Uses a toggleable nudeification (removes background, border & padding).
 * @returns A `NudibleRules` represents the nudeification rules.
 */
export const usesNudible = (): NudibleRules => {
    // dependencies:
    
    // features:
    const {borderVars } = usesBorder();
    const {paddingVars} = usesPadding();
    
    
    
    return {
        nudibleRule: () => style({
            ...variants([
                ifNude({
                    // backgrounds:
                    backg : [['none'], '!important'], // discard background, no valid/invalid animation
                    
                    
                    
                    // borders:
                    [borderVars.borderWidth           ] : '0px', // discard border stroke
                    
                    // remove rounded corners on top:
                    [borderVars.borderStartStartRadius] : '0px', // discard borderRadius
                    [borderVars.borderStartEndRadius  ] : '0px', // discard borderRadius
                    // remove rounded corners on bottom:
                    [borderVars.borderEndStartRadius  ] : '0px', // discard borderRadius
                    [borderVars.borderEndEndRadius    ] : '0px', // discard borderRadius
                    
                    boxShadow : ['none', '!important'],          // no shadow & no focus animation
                    
                    
                    
                    // spacings:
                    [paddingVars.paddingInline] : '0px',         // discard padding
                    [paddingVars.paddingBlock ] : '0px',         // discard padding
                }),
            ]),
        }),
    };
};



export interface NudibleProps {
    nude ?: boolean
}
export const useNudible = ({nude}: NudibleProps) => ({
    class: nude ? 'nude' : null,
});
//#endregion nudible
