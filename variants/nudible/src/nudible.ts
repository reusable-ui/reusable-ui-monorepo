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
    vars,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui features:
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'         // padding (inner spacing) stuff of UI



// defaults:
const _defaultNude : Required<NudibleProps>['nude'] = false



// hooks:

// variants:

//#region nudible
export interface NudibleVars {
    /**
     * the nude switching function.
     */
    nudeSw : any
}
const [nudibleVars] = cssVars<NudibleVars>();



// parent is     `.nude` -or-  current is     `.nude`:
export const ifNude    = (styles: CssStyleCollection): CssRule => rule(              ':is(.nude&, &.nude)' , styles); // specificityWeight = 1 + (parent's specificityWeight)
// parent is not `.nude` -and- current is not `.nude`:
export const ifNotNude = (styles: CssStyleCollection): CssRule => rule(':where(&):not(:is(.nude&, &.nude))', styles); // specificityWeight = 1 + (parent's specificityWeight)



export interface NudibleStuff { nudibleRule: Factory<CssRule>, nudibleVars: CssVars<NudibleVars> }
/**
 * Uses a toggleable nudeification (removes background, border & padding).
 * @param factory A callback to create a nudeification rules for each toggle state.
 * @returns A `NudibleStuff` represents the nudeification rules.
 */
export const usesNudible = (factory : ((toggle: boolean|null) => CssStyleCollection) = nudeOf): NudibleStuff => {
    // dependencies:
    
    // features:
    const {borderVars } = usesBorder();
    const {paddingVars} = usesPadding();
    
    
    
    return {
        nudibleRule: () => style({
            // toggling props:
            ...variants([
                ifNude({
                    // backgrounds:
                    // discard background, no valid/invalid animation:
                    backg : [['none'], '!important'],
                    
                    
                    
                    // borders:
                    // discard border stroke:
                    [borderVars.borderWidth           ] : '0px',
                    
                    // discard borderRadius:
                    // remove rounded corners on top:
                    [borderVars.borderStartStartRadius] : '0px',
                    [borderVars.borderStartEndRadius  ] : '0px',
                    // remove rounded corners on bottom:
                    [borderVars.borderEndStartRadius  ] : '0px',
                    [borderVars.borderEndEndRadius    ] : '0px',
                    
                    // no shadow & no focus animation:
                    boxShadow : [['none'], '!important'],
                    
                    
                    
                    // spacings:
                    // discard padding:
                    [paddingVars.paddingInline] : '0px',
                    [paddingVars.paddingBlock ] : '0px',
                }),
            ]),
            
            
            
            // toggling conditions:
            ...variants([
                ifNude(factory(true)),
                ifNotNude(factory(false)),
            ]),
        }),
        nudibleVars,
    };
};

/**
 * Creates an nudeification rules for the given `toggle` state.
 * @param toggle `true` to activate the nudeification -or- `false` to deactivate -or- `null` to remove previously declared `nudeOf`.
 * @returns A `CssRule` represents an nudeification rules for the given `toggle` state.
 */
export const nudeOf = (toggle: boolean|null): CssRule => style({
    ...vars({
        /*
            *switch on/off* the `**Tg` prop.
            toggle:
                true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                null    => null              => remove the prev declaration
        */
        [nudibleVars.nudeSw] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
    }),
});



export interface NudibleProps {
    // variants:
    nude ?: boolean
}
export const useNudible = ({nude = _defaultNude}: NudibleProps) => ({
    class: (nude || null) && 'nude',
});
//#endregion nudible
