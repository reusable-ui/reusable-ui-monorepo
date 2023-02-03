// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

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
export type ToggleNude = boolean|null
export interface NudibleVars {
    /**
     * the nudible preference.
     */
    nudePr : any
    /**
     * the nude switching function.
     */
    nudeSw : any
}
const [nudibleVars] = cssVars<NudibleVars>({ prefix: 'nu', minify: false });



//#region caches
const nudeDefinitionsCache  = new Map<ToggleNude, CssRule>();
let defaultNudibleRuleCache : WeakRef<CssRule> | undefined = undefined;
//#endregion caches



// parent is     `.nude` -or-  current is     `.nude`:
export const ifNude    = (styles: CssStyleCollection): CssRule => rule(              ':is(.nude&, &.nude)' , styles); // specificityWeight = 1 + (parent's specificityWeight)
// parent is not `.nude` -and- current is not `.nude`:
export const ifNotNude = (styles: CssStyleCollection): CssRule => rule(':where(&):not(:is(.nude&, &.nude))', styles); // specificityWeight = 1 + (parent's specificityWeight)



export interface NudibleStuff { nudibleRule: Factory<CssRule>, nudibleVars: CssVars<NudibleVars> }
const createNudibleRule = (nudeDefinition : null|((toggle: ToggleNude) => CssStyleCollection) = defineNude): CssRule => {
    // dependencies:
    
    // features:
    const {borderVars } = usesBorder();
    const {paddingVars} = usesPadding();
    
    
    
    return style({
        // configs:
        ...vars({
            /*
                supports for `usesColorable()`:
                only reset `nudibleVars.nudeSw = nudibleVars.nudePr` if `nudeDefinition` provided,
                so the *modified* `nudibleVars.nudeSw` by `setNude()` still *preserved*,
                thus the `usesColorable()` can see the <parent>'s actual [nude] status.
            */
            [nudibleVars.nudeSw] : (nudeDefinition || undefined) && nudibleVars.nudePr,
        }),
        
        
        
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
            nudeDefinition && ifNude(nudeDefinition(true)),
            nudeDefinition && ifNotNude(nudeDefinition(false)),
        ]),
    });
};
const getDefaultNudibleRule = (): CssRule => {
    const cached = defaultNudibleRuleCache?.deref();
    if (cached) return cached;
    
    
    
    const defaultNudibleRule = createNudibleRule();
    defaultNudibleRuleCache = new WeakRef<CssRule>(defaultNudibleRule);
    return defaultNudibleRule;
};
/**
 * Uses a toggleable nudeification (removes background, border & padding).
 * @param nudeDefinition A callback to create a nudeification rules for each toggle state.
 * @returns A `NudibleStuff` represents the nudeification rules.
 */
export const usesNudible = (nudeDefinition : null|((toggle: ToggleNude) => CssStyleCollection) = defineNude): NudibleStuff => {
    return {
        nudibleRule: (
            (nudeDefinition === defineNude)
            ?
            getDefaultNudibleRule
            :
            () => createNudibleRule(nudeDefinition)
        ),
        nudibleVars,
    };
};

/**
 * Defines a nudeification preference rules for the given `toggle` state.
 * @param toggle `true` to activate the nudeification -or- `false` to deactivate -or- `null` to remove previously declared `defineNude`.
 * @returns A `CssRule` represents a nudeification rules for the given `toggle` state.
 */
export const defineNude = (toggle: ToggleNude): CssRule => {
    const cached = nudeDefinitionsCache.get(toggle);
    if (cached) return cached;
    
    
    
    const nudeDef = style({
        ...vars({
            /*
                *switch on/off* the `**Tg` prop.
                toggle:
                    true    => empty string      => do not alter the `**Tg`'s value => activates   `**Tg` variable.
                    false   => initial (invalid) => destroy      the `**Tg`'s value => deactivates `**Tg` variable.
                    null    => null              => remove the prev declaration
            */
            [nudibleVars.nudePr] : (typeof(toggle) === 'boolean') ? (toggle ? '' : 'initial') : toggle,
        }),
    });
    nudeDefinitionsCache.set(toggle, nudeDef);
    return nudeDef;
};
/**
 * Sets the current nudeification state by the given `toggle` state.
 * @param toggle `true` to activate the nudeification -or- `false` to deactivate -or- `null` to remove previously declared `setNude`.
 * @returns A `CssRule` represents a nudeification rules for the given `toggle` state.
 */
export const setNude = (toggle: ToggleNude): CssRule => style({
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
