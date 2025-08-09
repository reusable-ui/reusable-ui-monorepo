// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    
    
    
    // Writes css in javascript:
    variants,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
    cssVars,
    
    
    
    // Writes complex stylesheets in simpler way:
    memoizeStyle,
    memoizeStyleWithVariants,
}                           from '@cssfn/core'                  // Writes css in javascript

// Reusable-ui variants:
import {
    // Hooks:
    useBareVariant,
    
    
    
    // Utilities:
    ifBare,
    ifNotBare,
}                           from '@reusable-ui/bare-variant'    // A utility for managing bare styling (frameless, minimal layout) consistently across React components.



/**
 * @deprecated - No longer needed.
 */
export type ToggleNude = boolean|null

/**
 * @deprecated - Use `BareVariantVars` instead.
 */
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

const [nudibleVars] = cssVars<NudibleVars>({ prefix: 'nu', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated - Use `ifBare` instead.
 */
export const ifNude    = ifBare;

/**
 * @deprecated - Use `ifNotBare` instead.
 */
export const ifNotNude = ifNotBare;



/**
 * @deprecated - Use `CssBareVariant` instead.
 */
export interface NudibleStuff { nudibleRule: Lazy<CssRule>, nudibleVars: CssVars<NudibleVars> }

const createNudibleRule = (nudeDefinition : null|((toggle: ToggleNude) => CssStyleCollection) = defineNude): CssRule => {
    // dependencies:
    
    // // features:
    // const {borderVars } = usesBorder();
    // const {paddingVars} = usesPadding();
    
    
    
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
                
                
                
                // // borders:
                // // discard border stroke:
                // [borderVars.borderWidth           ] : '0px',
                // 
                // // discard borderRadius:
                // // remove rounded corners on top:
                // [borderVars.borderStartStartRadius] : '0px',
                // [borderVars.borderStartEndRadius  ] : '0px',
                // // remove rounded corners on bottom:
                // [borderVars.borderEndStartRadius  ] : '0px',
                // [borderVars.borderEndEndRadius    ] : '0px',
                
                // no shadow & no focus animation:
                boxShadow : [['none'], '!important'],
                
                
                
                // // spacings:
                // // discard padding:
                // [paddingVars.paddingInline] : '0px',
                // [paddingVars.paddingBlock ] : '0px',
            }),
        ]),
        
        
        
        // toggling conditions:
        ...variants([
            nudeDefinition && ifNude(nudeDefinition(true)),
            nudeDefinition && ifNotNude(nudeDefinition(false)),
        ]),
    });
};
const getDefaultNudibleRule = memoizeStyle(() => createNudibleRule());

/**
 * @deprecated - Use `usesBareVariant` instead.
 * Use `bareVariantVars.isBare` and `bareVariantVars.notBare` to conditionally styling your background, border and padding.
 * 
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
 * @deprecated - No longer needed.
 * 
 * Defines a nudeification preference rules for the given `toggle` state.
 * @param toggle `true` to activate the nudeification -or- `false` to deactivate -or- `null` to remove previously declared `defineNude`.
 * @returns A `CssRule` represents a nudeification rules for the given `toggle` state.
 */
export const defineNude = memoizeStyleWithVariants((toggle: ToggleNude): CssRule => {
    return style({
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
});

/**
 * @deprecated - No longer needed.
 * 
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



/**
 * @deprecated - Use `BareVariantProps` instead.
 */
export interface NudibleProps {
    // variants:
    nude ?: boolean
}

/**
 * @deprecated - Use `useBareVariant` instead.
 */
export const useNudible = ({ nude }: NudibleProps) => {
    const {
        bareClassname,
    } = useBareVariant({
        bare : nude,
    });
    
    return {
        class: bareClassname,
    };
};
