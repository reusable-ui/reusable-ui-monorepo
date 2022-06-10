// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// cssfn:
import type {
    // css values:
    CssComplexBaseValueOf,
    
    
    
    // css custom properties:
    CssCustomSimpleRef,
    CssCustomRef,
    CssCustomValue,
    
    
    
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'         // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    keyframes,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    pascalCase,
    solidBackg,
}                           from '@cssfn/cssfn'             // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'       // writes css in react hook
import {
    // types:
    ReadonlyCssCustomRefs,
    
    
    
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'           // strongly typed of css variables
import {
    // types:
    CssConfigProps,
    Refs,
    
    
    
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'        // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    colors,
    themes as colorThemes,
}                           from '@reusable-ui/colors'      // a color management system
import {
    // configs:
    borders as borderStrokes,
    borderRadiuses,
}                           from '@reusable-ui/borders'     // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'     // a spacer (gap) management system
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'       // a typography management system
import {
    // hooks:
    useTriggerRender,
    useEvent,
    useMergeClasses,
}                           from '@reusable-ui/hooks'       // react helper hooks
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'     // a base component
import {
    // types:
    VariantMixin,
    StateMixin,
    
    
    
    // hooks:
    SizeVars,
    ifSize          as basicIfSize,
    usesSizeVariant as basicUsesSizeVariant,
    useSizeVariant  as basicUseSizeVariant,
    
    ThemeName,
    ThemeVars,
    ifTheme,
    usesThemeVariant as basicUsesThemeVariant,
    themeOptions,
    ThemeVariant,
    useThemeVariant,
    
    MildVars,
    ifNotMild,
    ifMild,
    usesMildVariant as basicUsesMildVariant,
    MildVariant,
    useMildVariant,
}                           from '@reusable-ui/basic'       // a base component



// hooks:

// layouts:

//#region sizes
export type SizeName = 'sm'|'nm'|'md'|'lg'|'1em' | (string & {})
export type { SizeVars }



export const ifSize = (sizeName: SizeName, styles: CssStyleCollection): CssRule => basicIfSize(sizeName, styles);



/**
 * Uses icon sizes.  
 * For example: `sm`, `nm`, `md`, `lg`, `1em`.
 * @param configProps Customize the sizing definitions from configuration for each size in `options`.
 * @param options Customize the size options.
 * @returns A `VariantMixin<SizeVars>` represents sizing definitions for each size in `options`.
 */
export const usesSizeVariant = <TConfigProps extends CssConfigProps>(configProps : Refs<TConfigProps>, options = sizeOptions()): VariantMixin<SizeVars> => basicUsesSizeVariant(configProps, options);

/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'nm', 'md', 'lg', '1em'];



export interface SizeVariant {
    size ?: SizeName
}
export const useSizeVariant = (props: SizeVariant) => basicUseSizeVariant(props);
//#endregion sizes


// colors:

//#region themes
export {
    ThemeName,
    ThemeVars,
    ifTheme,
    themeOptions,
    ThemeVariant,
    useThemeVariant,
}



/**
 * Uses theme colors.  
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create theme color definitions for each theme in `options`.
 * @param options Customize the theme options.
 * @returns A `VariantMixin<ThemeVars>` represents theme color definitions for each theme in `options`.
 */
export const usesThemeVariant = (factory : ((themeName: ThemeName) => CssStyleCollection) = themeOf, options = themeOptions()): VariantMixin<ThemeVars> => {
    // dependencies:
    const [themesRule, themes] = basicUsesThemeVariant(factory, options);
    
    
    
    return [
        () => style({
            ...imports([
                themesRule,
            ]),
            ...vars({
                // prevents the theme from inheritance, so the <Icon> always use currentColor (by config's) if the theme was not set
                [themes.backg    ] : 'initial',
                [themes.backgMild] : 'initial',
            }),
        }),
        themes,
    ];
};

/**
 * Creates theme color definitions for the given `themeName`.
 * @param themeName The theme name.
 * @returns A `CssRule` represents theme color definitions for the given `themeName`.
 */
export const themeOf = (themeName: ThemeName): CssRule => {
    // dependencies:
    const [, themes] = basicUsesThemeVariant();
    
    
    
    return style({
        ...vars({
            [themes.backg    ] : colors[   themeName       as keyof typeof colors], // base color
            [themes.backgMild] : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        }),
    });
};
//#endregion themes

//#region mild
export {
    MildVars,
    ifNotMild,
    ifMild,
    MildVariant,
    useMildVariant,
}



/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `VariantMixin<MildVars>` represents toggleable mildification definitions.
 */
export const usesMildVariant = (factory : ((toggle?: (boolean|null)) => CssStyleCollection) = mildOf): VariantMixin<MildVars> => {
    // dependencies:
    const [, milds ] = basicUsesMildVariant(factory);
    const [, themes] = basicUsesThemeVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [milds.backgFn] : fallbacks(
                 // themes.backgMildImpt,  // first  priority
                    themes.backgMild,      // second priority
                 // themes.backgMildCond,  // third  priority
                    
                    icons.backg,           // default => uses config's background
                ),
                
                
                
                // delete unused imported vars:
                [milds.foregFn] : null,
            }),
        }),
        milds,
    ];
};

/**
 * Creates mildification definitions for the given `toggle`.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` for undefining the mildification.
 * @returns A `CssRule` represents mildification definitions for the given `toggle`.
 */
export const mildOf = (toggle: (boolean|null) = true): CssRule => {
    // dependencies:
    const [, milds] = basicUsesMildVariant();
    
    
    
    return style({
        ...vars({
            // *toggle on/off* the mildification props:
            [milds.backgTg] : toggle ? milds.backgFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        }),
    });
};
//#endregion mild

//#region backg
export interface BackgVars {
    /**
     * none background.
     */
    backgNone    : any
    
    
    
    /**
     * functional background color.
     */
    backgColorFn : any
    /**
     * final background color.
     */
    backgColor   : any
    
    
    
    /**
     * final background layers.
     */
    backg        : any
}
const [backgs] = cssVar<BackgVars>();

/**
 * Uses background layer(s).
 * @returns A `VariantMixin<BackgVars>` represents background layer(s) definitions.
 */
export const usesBackg = (): VariantMixin<BackgVars> => {
    // dependencies:
    const [, themes   ] = usesThemeVariant();
    const [, gradients] = usesGradientVariant();
    const [, outlineds] = usesOutlinedVariant();
    const [, milds    ] = usesMildVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [backgs.backgNone   ] : solidBackg('transparent'),
                
                
                
                [backgs.backgColorFn] : fallbacks(
                    themes.backgImpt,  // first  priority
                    themes.backg,      // second priority
                    themes.backgCond,  // third  priority
                    
                    basics.backg,      // default => uses config's background
                ),
                [backgs.backgColor  ] : fallbacks(
                    outlineds.backgTg,   // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.backgTg,       // toggle mild     (if `usesMildVariant()` applied)
                    
                    backgs.backgColorFn, // default => uses our `backgColorFn`
                ),
                
                
                
                [backgs.backg       ] : [
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // top layer:
                    fallbacks(
                        gradients.backgGradTg, // toggle gradient (if `usesGradientVariant()` applied)
                        
                        backgs.backgNone,      // default => no top layer
                    ),
                    
                    // bottom layer:
                    backgs.backgColor,
                ],
            }),
        }),
        backgs,
    ];
};
//#endregion backg

//#region foreg
export interface ForegVars {
    /**
     * functional foreground color.
     */
    foregFn     : any
    /**
     * final foreground color.
     */
    foreg       : any
}
const [foregs] = cssVar<ForegVars>();

/**
 * Uses foreground color (text color).
 * @returns A `VariantMixin<ForegVars>` represents foreground color definitions.
 */
export const usesForeg = (): VariantMixin<ForegVars> => {
    // dependencies:
    const [, themes   ] = usesThemeVariant();
    const [, outlineds] = usesOutlinedVariant();
    const [, milds    ] = usesMildVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [foregs.foregFn] : fallbacks(
                    themes.foregImpt,  // first  priority
                    themes.foreg,      // second priority
                    themes.foregCond,  // third  priority
                    
                    basics.foreg,      // default => uses config's foreground
                ),
                [foregs.foreg  ] : fallbacks(
                    outlineds.foregTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.foregTg,     // toggle mild     (if `usesMildVariant()` applied)
                    
                    foregs.foregFn,    // default => uses our `foregFn`
                ),
            }),
        }),
        foregs,
    ];
};
//#endregion foreg

//#region border
export interface BorderVars {
    /**
     * functional border color.
     */
    borderColorFn          : any
    /**
     * final border color.
     */
    borderColor            : any
    
    
    
    /**
     * final border mix (style, width, color, etc).
     */
    border                 : any
    /**
     * final border width.
     */
    borderWidth            : any
    
    
    
    /**
     * top start (left) radius.
     */
    borderStartStartRadius : any
    /**
     * top end (right) radius.
     */
    borderStartEndRadius   : any
    /**
     * bottom start (left) radius.
     */
    borderEndStartRadius   : any
    /**
     * bottom end (right) radius.
     */
    borderEndEndRadius     : any
}
const [borders] = cssVar<BorderVars>();



/**
 * Uses border (strokes, colors, radiuses).
 * @returns A `VariantMixin<BorderVars>` represents border color definitions.
 */
export const usesBorder = (): VariantMixin<BorderVars> => {
    // dependencies:
    const [, themes   ] = usesThemeVariant();
    const [, outlineds] = usesOutlinedVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [borders.borderColorFn         ] : fallbacks(
                    themes.borderImpt,     // first  priority
                    themes.border,         // second priority
                    themes.borderCond,     // third  priority
                    
                    basics.borderColor,    // default => uses config's border color
                ),
                [borders.borderColor           ] : fallbacks(
                    outlineds.foregTg,     // toggle outlined (if `usesOutlinedVariant()` applied)
                    
                    borders.borderColorFn, // default => uses our `borderColorFn`
                ),
                
                
                
                [borders.border                ] : basics.border,      // default => uses config's border
                [borders.borderWidth           ] : basics.borderWidth, // default => uses config's border width
                
                
                
                [borders.borderStartStartRadius] : basics.borderRadius, // default => uses config's border radius
                [borders.borderStartEndRadius  ] : basics.borderRadius, // default => uses config's border radius
                [borders.borderEndStartRadius  ] : basics.borderRadius, // default => uses config's border radius
                [borders.borderEndEndRadius    ] : basics.borderRadius, // default => uses config's border radius
            }),
        }),
        borders,
    ];
};



export interface CssBorderProps {
    border       ?: CssCustomSimpleRef
    borderWidth  ?: CssCustomSimpleRef
    borderRadius ?: CssCustomSimpleRef
}
export const extendsBorder = (cssBorderProps?: CssBorderProps): CssRule => {
    // dependencies:
    
    // borders:
    const [, borders] = usesBorder();
    
    
    
    return style({
        // border strokes:
        // cssBorderProps.borderStroke** => ref.borderStroke**
        ...vars({
            [borders.border     ] : cssBorderProps?.border,
            [borders.borderWidth] : cssBorderProps?.borderWidth,
        }),
        border      : borders.border,      // all border properties
        borderColor : borders.borderColor, // overwrite color prop
        borderWidth : borders.borderWidth, // overwrite width prop
        
        
        
        // border radiuses:
        // cssBorderProps.borderRadius** => ref.borderRadius**
        ...vars({
            [borders.borderStartStartRadius] : cssBorderProps?.borderRadius,
            [borders.borderStartEndRadius  ] : cssBorderProps?.borderRadius,
            [borders.borderEndStartRadius  ] : cssBorderProps?.borderRadius,
            [borders.borderEndEndRadius    ] : cssBorderProps?.borderRadius,
        }),
        borderRadius           : null,                           // `null` => delete `borderRadius` prop, `undefined` => preserves `borderRadius` prop
        borderStartStartRadius : borders.borderStartStartRadius, // overwrite radius prop
        borderStartEndRadius   : borders.borderStartEndRadius,   // overwrite radius prop
        borderEndStartRadius   : borders.borderEndStartRadius,   // overwrite radius prop
        borderEndEndRadius     : borders.borderEndEndRadius,     // overwrite radius prop
    });
};
//#endregion border


// spacings:

//#region padding
export interface PaddingVars {
    /**
     * left & right paddings.
     */
    paddingInline : any
    /**
     * top & bottom paddings.
     */
    paddingBlock  : any
}
const [paddings] = cssVar<PaddingVars>();



/**
 * Uses paddings.
 * @returns A `VariantMixin<PaddingVars>` represents paddings definitions.
 */
export const usesPadding = (): VariantMixin<PaddingVars> => {
    return [
        () => style({
            ...vars({
                [paddings.paddingInline] : basics.paddingInline, // default => uses config's padding inline
                [paddings.paddingBlock ] : basics.paddingBlock,  // default => uses config's padding block
            }),
        }),
        paddings,
    ];
};

export interface CssPaddingProps {
    paddingInline ?: CssCustomSimpleRef
    paddingBlock  ?: CssCustomSimpleRef
}
export const extendsPadding = (cssProps?: CssPaddingProps): CssRule => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        // spacings:
        // cssProps.padding** => ref.padding**
        ...vars({
            [paddings.paddingInline] : cssProps?.paddingInline,
            [paddings.paddingBlock ] : cssProps?.paddingBlock,
        }),
        padding       : null,                   // `null` => delete `padding` prop, `undefined` => preserves `padding` prop
        paddingInline : paddings.paddingInline, // overwrite padding prop
        paddingBlock  : paddings.paddingBlock,  // overwrite padding prop
    });
};
//#endregion padding


// animations:

//#region animations
export interface AnimVars {
    /**
     * none boxShadow.
     */
    boxShadowNone : any
    /**
     * final boxShadow layers.
     */
    boxShadow     : any
    
    
    
    /**
     * none filter.
     */
    filterNone    : any
    /**
     * final filter.
     */
    filter        : any
    
    
    
    /**
     * none transform.
     */
    transfNone    : any
    
    
    
    /**
     * none animation.
     */
    animNone      : any
    /**
     * final animation.
     */
    anim          : any
}
const [anims] = cssVar<AnimVars>();



const setsBoxShadow = new Set<CssCustomSimpleRef>();
const setsFilter    = new Set<CssCustomSimpleRef>();
const setsAnim      = new Set<CssCustomSimpleRef>();
const animRegistry  = {
    get boxShadows      ():    CssCustomSimpleRef[]      {
        return [
            anims.boxShadowNone, // the boxShadow collection must contain at least 1 of *none* boxShadow, so when rendered it produces a valid css value of boxShadow property
            ...Array.from(setsBoxShadow)
        ];
    },
    registerBoxShadow   (item: CssCustomSimpleRef): void { setsBoxShadow.add(item)          },
    unregisterBoxShadow (item: CssCustomSimpleRef): void { setsBoxShadow.delete(item)       },
    
    
    
    get filters         ():    CssCustomSimpleRef[]      {
        return [
            anims.filterNone, // the filter collection must contain at least 1 of *none* filter, so when rendered it produces a valid css value of filter property
            ...Array.from(setsFilter)
        ];
    },
    registerFilter      (item: CssCustomSimpleRef): void { setsFilter.add(item)             },
    unregisterFilter    (item: CssCustomSimpleRef): void { setsFilter.delete(item)          },
    
    
    
    get anims           ():    CssCustomSimpleRef[]      {
        return [
            anims.animNone, // the animation collection must contain at least 1 of *none* animation, so when rendered it produces a valid css value of animation property
            ...Array.from(setsAnim)
        ];
    },
    registerAnim        (item: CssCustomSimpleRef): void { setsAnim.add(item)               },
    unregisterAnim      (item: CssCustomSimpleRef): void { setsAnim.delete(item)            },
};
export type AnimRegistry = typeof animRegistry



export type AnimMixin = readonly [() => CssRule, ReadonlyCssCustomRefs<AnimVars>, AnimRegistry]
/**
 * Uses animation.
 * @returns A `AnimMixin` represents animation definitions.
 */
export const usesAnim = (): AnimMixin => {
    return [
        () => style({
            ...vars({
                [anims.boxShadowNone] : [[0, 0, 'transparent']],
                [anims.boxShadow    ] : [
                    // layering: boxShadow1 | boxShadow2 | boxShadow3 ...
                    
                    // layers:
                    ...animRegistry.boxShadows,
                ],
                
                
                
                [anims.filterNone   ] : 'brightness(100%)',
                [anims.filter       ] : [[
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // layers:
                    ...animRegistry.filters,
                ]],
                
                
                
                [anims.transfNone   ] : 'translate(0)',
                
                
                
                [anims.animNone     ] : 'none',
                [anims.anim         ] : [
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // layers:
                    ...animRegistry.anims,
                ],
            }),
            
            
            
            // declare default values at lowest specificity (except for **None):
            ...vars(Object.fromEntries([
                ...animRegistry.boxShadows.filter((ref) => (ref !== anims.boxShadowNone)).map((ref) => [ ref, anims.boxShadowNone ]),
                ...animRegistry.filters   .filter((ref) => (ref !== anims.filterNone   )).map((ref) => [ ref, anims.filterNone    ]),
                ...animRegistry.anims     .filter((ref) => (ref !== anims.animNone     )).map((ref) => [ ref, anims.animNone      ]),
            ])),
        }),
        anims,
        animRegistry,
    ];
};



export const isRef = (value: CssCustomValue): value is CssCustomRef => (typeof(value) === 'string') && value.startsWith('var(--');

type BaseTypeOf<TComplexValue> = TComplexValue extends CssComplexBaseValueOf<infer TValue>[][] ? (TValue|CssCustomRef) : never
export const fallbackNoneBoxShadow = (item : BaseTypeOf<CssKnownProps['boxShadow']>  ): typeof item => (isRef(item) && (item !== anims.boxShadowNone)) ? fallbacks(item, anims.boxShadowNone) : item;
export const fallbackNoneFilter    = (item : BaseTypeOf<CssKnownProps['filter'   ]>[]): typeof item => item.map((subItem) => (isRef(subItem) && (subItem !== anims.filterNone)) ? fallbacks(subItem, anims.filterNone) : subItem);
export const fallbackNoneTransf    = (item : BaseTypeOf<CssKnownProps['transf'   ]>[]): typeof item => item.map((subItem) => (isRef(subItem) && (subItem !== anims.transfNone)) ? fallbacks(subItem, anims.transfNone) : subItem);
export const fallbackNoneAnim      = (item : BaseTypeOf<CssKnownProps['anim'     ]>  ): typeof item => (isRef(item) && (item !== anims.animNone)) ? fallbacks(item, anims.animNone) : item;
//#endregion animations

//#region excited
export interface ExcitedVars {
    filter : any
    anim   : any
}
const [exciteds] = cssVar<ExcitedVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(exciteds.filter);
    animRegistry.registerAnim(exciteds.anim);
}



// parent not `.excited` -and- current not `.excited`:
export const ifNotExcited = (styles: CssStyleCollection): CssRule => rule(':not(:is(.excited&, &.excited))', styles);
// parent is  `.excited` -or-  current is  `.excited`:
export const ifExcited    = (styles: CssStyleCollection): CssRule => rule(     ':is(.excited&, &.excited)' , styles);



/**
 * Uses toggleable excited states.
 * @returns A `StateMixin<ExcitedVars>` represents excited state definitions.
 */
export const usesExcitedState = (): StateMixin<ExcitedVars> => {
    return [
        () => style({
            ...states([
                ifExcited(
                    vars({
                        [exciteds.filter] : basics.filterExcited,
                        [exciteds.anim  ] : basics.animExcited,
                    }),
                ),
            ]),
        }),
        exciteds,
    ];
};



export interface TogglerExcitedProps
{
    // accessibilities:
    excited         ?: boolean
    onExcitedChange ?: (newExcited: boolean) => void
}
export const useExcitedState = (props: TogglerExcitedProps) => {
    // props:
    const {
        // accessibilities:
        excited,
        onExcitedChange,
    } = props;
    
    
    
    /*
     * the state is excited/normal based on [controllable excited]
     */
    const excitedFn : boolean = (excited /*controllable*/ ?? false);
    
    
    
    // states:
    // local storages without causing to (re)render, we need to manual control the (re)render event:
    /**
     * `true`  => was excited  
     * `false` => was normal
     */
    const wasExcited = useRef(excitedFn);
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    
    
    if (wasExcited.current !== excitedFn) { // change detected => apply the change & start animating
        wasExcited.current = excitedFn; // remember the last change
        
        
        
        const continueToRun = excitedFn;
        if (continueToRun) {
            // wait until the non-excited `<Basic>` has been applied by browser ui, then re-render the excited `<Basic>`
            setTimeout(() => {
                triggerRender(); // re-render the excited `<Basic>`
            }, 0);
        } // if
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<Element>>((e) => {
        // conditions:
        if (e.target !== e.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(excited)|(?<=[a-z])(Excited))(?![a-z])/.test(e.animationName)) return; // ignores animation other than excited[Foo] or booExcited[Foo]
        
        
        
        // clean up finished animation
        
        const continueToRun = wasExcited.current;
        wasExcited.current = false; // mark the animation was completed (stopped)
        
        onExcitedChange?.(false); // request to stop
        if (continueToRun) {
            triggerRender(); // need to restart the animation
        } // if
    }, [onExcitedChange, triggerRender]);
    
    
    
    return {
        excited : wasExcited.current,
        
        class   : wasExcited.current ? 'excited' : null,
        
        handleAnimationEnd,
    };
};
//#endregion excited



// styles:
export const usesBasicLayout = () => {
    // dependencies:
    
    // backgrounds:
    const [backgRule   , backgs] = usesBackg();
    
    // foregrounds:
    const [foregRule   , foregs] = usesForeg();
    
    // borders:
    const [borderRule          ] = usesBorder();
    
    // animations:
    const [animRule    , anims ] = usesAnim();
    
    // spacings:
    const [paddingRule         ] = usesPadding();
    
    
    
    return style({
        ...imports([
            // colors:
            usesThemeDefault(),
            
            // backgrounds:
            backgRule,
            
            // foregrounds:
            foregRule,
            
            // borders:
            borderRule,
            
            // animations:
            animRule,
            
            // spacings:
            paddingRule,
        ]),
        ...style({
            // layouts:
            display   : 'block',
            
            
            
            // customize:
            ...usesCssProps(basics), // apply config's cssProps
            
            
            
            // backgrounds:
            backg     : backgs.backg,
            
            
            
            // foregrounds:
            foreg     : foregs.foreg,
            
            
            
            // borders:
            ...extendsBorder(basics), // extends border css vars
            
            
            
            // animations:
            boxShadow : anims.boxShadow,
            filter    : anims.filter,
            anim      : anims.anim,
            
            
            
            // spacings:
            ...extendsPadding(basics), // extends padding css vars
        }),
    });
};
export const usesBasicVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule   ] = usesSizeVariant(basics);
    const [nudeRule    ] = usesNudeVariant();
    
    // colors:
    const [themesRule  ] = usesThemeVariant();
    const [gradientRule] = usesGradientVariant();
    const [outlinedRule] = usesOutlinedVariant();
    const [mildRule    ] = usesMildVariant();
    
    
    
    return style({
        ...imports([
            // layouts:
            sizesRule,
            nudeRule,
            
            // colors:
            themesRule,
            gradientRule,
            outlinedRule,
            mildRule,
        ]),
    });
};

export const useBasicStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBasicLayout(),
        
        // variants:
        usesBasicVariants(),
    ]),
}), { id: 'rbkpy0qh2b' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [basics, cssBasicConfig] = cssConfig(() => {
    // dependencies:
    
    const [, , animRegistry] = usesAnim();
    const filters = animRegistry.filters;
    
    const [, {filter: filterExcited} ] = usesExcitedState();
    
    
    
    //#region keyframes
    const [keyframesExcitedRule, keyframesExcited] = keyframes({
        from : {
            filter: [[
                ...filters.filter((f) => (f !== filterExcited)),
                
             // filterExcited, // missing the last => let's the browser interpolated it
            ]].map(fallbackNoneFilter),
        },
        to   : {
            filter: [[
                ...filters.filter((f) => (f !== filterExcited)),
                
                filterExcited, // existing the last => let's the browser interpolated it
            ]].map(fallbackNoneFilter),
        },
    });
    keyframesExcited.value = 'excited'; // the @keyframes name should contain 'excited' in order to be recognized by `useExcitedState`
    //#endregion keyframes
    
    
    
    const transitionDuration = '300ms';
    
    return {
        // appearances:
        opacity              : 1                            as CssKnownProps['opacity'],
        
        
        
        // backgrounds:
        backg                : 'transparent'                as CssKnownProps['backg'],
        backgGrad            : [
            ['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box'],
        ]                                                   as CssKnownProps['backgroundImage'],
        
        
        
        // foregrounds:
        foreg                : 'currentColor'               as CssKnownProps['foreg'],
        
        
        
        // borders:
        border               : [
            [borderStrokes.style, borderStrokes.defaultWidth, borderStrokes.color],
        ]                                                   as CssKnownProps['border'],
        borderWidth          : borderStrokes.defaultWidth   as CssKnownProps['borderWidth'],
        borderColor          : borderStrokes.color          as CssKnownProps['borderColor'],
        
        borderRadius         : borderRadiuses.md            as CssKnownProps['borderRadius'],
        borderRadiusSm       : borderRadiuses.sm            as CssKnownProps['borderRadius'],
        borderRadiusLg       : borderRadiuses.lg            as CssKnownProps['borderRadius'],
        
        
        
        // animations:
        transitionDuration   : transitionDuration           as CssKnownProps['transitionDuration'],
        transition           : [
            // appearances:
            ['opacity'    , transitionDuration, 'ease-out'],
            
            // sizes:
            ['inline-size', transitionDuration, 'ease-out'],
            ['block-size' , transitionDuration, 'ease-out'],
            
            // backgrounds:
            ['background' , transitionDuration, 'ease-out'],
            
            // foregrounds:
            ['color'      , transitionDuration, 'ease-out'],
            
            // borders:
            ['border'     , transitionDuration, 'ease-out'],
            
            // spacings:
         // ['padding'    , transitionDuration, 'ease-out'], // beautiful but uncomfortable
            
            // typos:
            ['font-size'  , transitionDuration, 'ease-out'],
        ]                                                   as CssKnownProps['transition'],
        
        filterExcited        : [[
            'invert(80%)',
        ]]                                                  as CssKnownProps['filter'],
        
        ...keyframesExcitedRule,
        animExcited          : [
            ['150ms', 'ease', 'both', 'alternate-reverse', 5, keyframesExcited],
        ]                                                   as CssKnownProps['anim'],
        
        
        
        // spacings:
        paddingInline        : [['calc((', spacers.sm, '+', spacers.md, ')/2)']]    as CssKnownProps['paddingInline'],
        paddingBlock         : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']]    as CssKnownProps['paddingBlock' ],
        paddingInlineSm      : spacers.sm                                           as CssKnownProps['paddingInline'],
        paddingBlockSm       : spacers.xs                                           as CssKnownProps['paddingBlock' ],
        paddingInlineLg      : spacers.md                                           as CssKnownProps['paddingInline'],
        paddingBlockLg       : spacers.sm                                           as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSize             : typos.fontSizeNm                                                 as CssKnownProps['fontSize'],
        fontSizeSm           : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']]    as CssKnownProps['fontSize'],
        fontSizeLg           : typos.fontSizeMd                                                 as CssKnownProps['fontSize'],
        fontFamily           : 'inherit'    as CssKnownProps['fontFamily'],
        fontWeight           : 'inherit'    as CssKnownProps['fontWeight'],
        fontStyle            : 'inherit'    as CssKnownProps['fontStyle'],
        textDecoration       : 'inherit'    as CssKnownProps['textDecoration'],
        lineHeight           : 'inherit'    as CssKnownProps['lineHeight'],
    };
}, { prefix: 'bsc' });



// react components:
export interface BasicProps<TElement extends Element = Element>
    extends
        // bases:
        GenericProps<TElement>,
        
        // layouts:
        SizeVariant,
        // OrientationVariant, // not implemented yet
        NudeVariant,
        
        // colors:
        ThemeVariant,
        GradientVariant,
        OutlinedVariant,
        MildVariant
{
}
const Basic = <TElement extends Element = Element>(props: BasicProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet      = useBasicStyleSheet();
    
    
    
    // variants:
    
    // layouts:
    const sizeVariant     = useSizeVariant(props);
    const nudeVariant     = useNudeVariant(props);
    
    // colors:
    const themeVariant    = useThemeVariant(props);
    const gradientVariant = useGradientVariant(props);
    const outlinedVariant = useOutlinedVariant(props);
    const mildVariant     = useMildVariant(props);
    
    
    
    // rest props:
    const {
        // remove variant props:
        
        // layouts:
        size     : _size,
        nude     : _nude,
        
        // colors:
        theme    : _theme,
        gradient : _gradient,
        outlined : _outlined,
        mild     : _mild,
    ...restGenericProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // layouts:
        sizeVariant.class,
        nudeVariant.class,
        
        // colors:
        themeVariant.class,
        gradientVariant.class,
        outlinedVariant.class,
        mildVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        />
    );
};
export {
    Basic,
    Basic as default,
}
