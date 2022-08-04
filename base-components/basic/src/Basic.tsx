// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
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
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    states,
    keyframes,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // types:
    CssVars,
    
    
    
    // utilities:
    cssVars,
    fallbacks,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'          // a color management system
import {
    // configs:
    borders as borderStrokes,
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // hooks:
    useTriggerRender,
    useEvent,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui features:
import {
    // hooks:
    usesBackground,
}                           from '@reusable-ui/background'      // background stuff of UI
import {
    // hooks:
    usesForeground,
}                           from '@reusable-ui/foreground'      // foreground (text color) stuff of UI
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI
import {
    // hooks:
    usesRing,
}                           from '@reusable-ui/ring'            // ring (focus indicator) color of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
    ResizableProps,
    useResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    usesThemable,
    ThemableProps,
    useThemable,
}                           from '@reusable-ui/themable'        // color options of UI
import {
    // hooks:
    usesGradientable,
    GradientableProps,
    useGradientable,
}                           from '@reusable-ui/gradientable'    // gradient variant of UI
import {
    // hooks:
    usesOutlineable,
    OutlineableProps,
    useOutlineable,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    usesMildable,
    MildableProps,
    useMildable,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI
import {
    // hooks:
    usesNudible,
    NudibleProps,
    useNudible,
}                           from '@reusable-ui/nudible'         // nude variant of UI

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component



// types:
export type FeatureMixin<TCssCustomProps extends {}> = readonly [() => CssRule, CssVars<TCssCustomProps>]
export type VariantMixin<TCssCustomProps extends {}> = readonly [() => CssRule, CssVars<TCssCustomProps>]
export type StateMixin  <TCssCustomProps extends {}> = readonly [() => CssRule, CssVars<TCssCustomProps>]



// hooks:

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
const [paddings] = cssVars<PaddingVars>();



/**
 * Uses paddings.
 * @returns A `FeatureMixin<PaddingVars>` represents paddings definitions.
 */
export const usesPadding = (): FeatureMixin<PaddingVars> => {
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
const [anims] = cssVars<AnimVars>();



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
    registerBoxShadow   (item: CssCustomSimpleRef): void { setsBoxShadow.add(item)    },
    unregisterBoxShadow (item: CssCustomSimpleRef): void { setsBoxShadow.delete(item) },
    
    
    
    get filters         ():    CssCustomSimpleRef[]      {
        return [
            anims.filterNone, // the filter collection must contain at least 1 of *none* filter, so when rendered it produces a valid css value of filter property
            ...Array.from(setsFilter)
        ];
    },
    registerFilter      (item: CssCustomSimpleRef): void { setsFilter.add(item)       },
    unregisterFilter    (item: CssCustomSimpleRef): void { setsFilter.delete(item)    },
    
    
    
    get anims           ():    CssCustomSimpleRef[]      {
        return [
            anims.animNone, // the animation collection must contain at least 1 of *none* animation, so when rendered it produces a valid css value of animation property
            ...Array.from(setsAnim)
        ];
    },
    registerAnim        (item: CssCustomSimpleRef): void { setsAnim.add(item)         },
    unregisterAnim      (item: CssCustomSimpleRef): void { setsAnim.delete(item)      },
};
export type AnimRegistry = typeof animRegistry



export type AnimMixin = readonly [() => CssRule, CssVars<AnimVars>, AnimRegistry]
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
const [exciteds] = cssVars<ExcitedVars>();

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



export interface ToggleExcitedProps
{
    // accessibilities:
    excited         ?: boolean
    onExcitedChange ?: (newExcited: boolean) => void
}
export const useExcitedState = <TElement extends Element = HTMLElement>(props: ToggleExcitedProps) => {
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
    const wasExcited = useRef<boolean|null>(excitedFn);
    
    // manually controls the (re)render event:
    const [triggerRender] = useTriggerRender();
    
    
    
    const asyncTriggerRender = useRef<ReturnType<typeof requestIdleCallback>|undefined>(undefined);
    useEffect(() => {
        // cleanups:
        return () => {
            // cancel out previously asyncTriggerRender (if any):
            if (asyncTriggerRender.current) cancelIdleCallback(asyncTriggerRender.current);
        };
    }, []); // runs once on startup
    
    
    
    if (wasExcited.current !== excitedFn) { // change detected => apply the change & start animating
        const continueToRun = excitedFn && (wasExcited.current === null);
        if (continueToRun) {
            // cancel out previously asyncTriggerRender (if any):
            if (asyncTriggerRender.current) cancelIdleCallback(asyncTriggerRender.current);
            
            
            
            // wait until the non-excited `<Basic>` has been applied by browser ui, then re-render the excited `<Basic>`
            asyncTriggerRender.current = requestIdleCallback(() => {
                wasExcited.current = excitedFn; // remember the last change
                triggerRender(); // re-render the excited `<Basic>`
            });
        }
        else {
            wasExcited.current = excitedFn; // remember the last change
        } // if
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(excited)|(?<=[a-z])(Excited))(?![a-z])/.test(event.animationName)) return; // ignores animation other than excited[Foo] or booExcited[Foo]
        
        
        
        // clean up finished animation
        
        const continueToRun = wasExcited.current;
        wasExcited.current = null; // mark the animation need to restart
        
        Promise.resolve().then(() => { // trigger the event after the <Basic> has finished rendering (for controllable <Basic>)
            onExcitedChange?.(false); // request to stop
        });
        if (continueToRun) {
            triggerRender(); // need to restart the animation
        } // if
    }, [onExcitedChange]);
    
    
    
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
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground(basics);
    const {foregroundRule, foregroundVars} = usesForeground(basics);
    const {borderRule    , borderVars    } = usesBorder(basics);
    const {ringRule                      } = usesRing(basics);
    
    // animations:
    const [animRule    , anims ] = usesAnim();
    
    // spacings:
    const [paddingRule         ] = usesPadding();
    
    
    
    return style({
        ...imports([
            // features:
            backgroundRule,
            foregroundRule,
            borderRule,
            ringRule,
            
            // animations:
            animRule,
            
            // spacings:
            paddingRule,
        ]),
        ...style({
            // layouts:
            display      : 'block',
            
            
            
            // customize:
            ...usesCssProps(basics), // apply config's cssProps
            
            
            
            // accessibilities:
            ...rule(['&::selection', '& ::selection'], { // ::selection on self and descendants
                    // backgrounds:
                backg    : backgroundVars.altBackgColor,
                
                
                
                // foregrounds:
                foreg    : foregroundVars.altForeg,
            }),
            
            
            
            // backgrounds:
            backg        : backgroundVars.backg,
            
            
            
            // foregrounds:
            foreg        : foregroundVars.foreg,
            
            
            
            // borders:
            border       : borderVars.border,
            borderRadius : borderVars.borderRadius,
            
            
            
            // animations:
            boxShadow    : anims.boxShadow,
            filter       : anims.filter,
            anim         : anims.anim,
            
            
            
            // spacings:
            
            // let's Reusable-UI system to manage paddingInline & paddingBlock:
            ...extendsPadding(basics),
        }),
    });
};
export const usesBasicVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule   } = usesResizable(basics);
    const {themableRule    } = usesThemable();
    const {gradientableRule} = usesGradientable(basics);
    const {outlineableRule } = usesOutlineable(basics);
    const {mildableRule    } = usesMildable(basics);
    const {nudibleRule     } = usesNudible();
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
            themableRule,
            gradientableRule,
            outlineableRule,
            mildableRule,
            nudibleRule,
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
export const [basics, basicValues, cssBasicConfig] = cssConfig(() => {
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
        // backgrounds:
        backg                : 'transparent'                as CssKnownProps['backg'],
        altBackg             : colors.primary               as CssKnownProps['backg'],
        backgGrad            : [
            ['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box'],
        ]                                                   as CssKnownProps['backgroundImage'],
        
        
        
        // foregrounds:
        foreg                : 'currentColor'               as CssKnownProps['foreg'],
        altForeg             : colors.primaryText           as CssKnownProps['foreg'],
        
        
        
        // borders:
        borderStyle          : borderStrokes.style          as CssKnownProps['borderStyle'],
        borderWidth          : borderStrokes.defaultWidth   as CssKnownProps['borderWidth'],
        borderColor          : borderStrokes.color          as CssKnownProps['borderColor'],
        
        borderRadius         : borderRadiuses.md            as CssKnownProps['borderRadius'],
        borderRadiusSm       : borderRadiuses.sm            as CssKnownProps['borderRadius'],
        borderRadiusLg       : borderRadiuses.lg            as CssKnownProps['borderRadius'],
        
        
        
        // rings:
        ring                 : colors.secondaryThin         as CssKnownProps['color'],
        
        
        
        // animations:
        transitionDuration   : transitionDuration           as CssKnownProps['transitionDuration'],
        transition           : [
            // appearances:
            ['opacity'      , transitionDuration, 'ease-out'],
            
            // sizes:
            ['inline-size'  , transitionDuration, 'ease-out'],
            ['block-size'   , transitionDuration, 'ease-out'],
            
            // backgrounds:
            ['background'   , transitionDuration, 'ease-out'],
            
            // foregrounds:
            ['color'        , transitionDuration, 'ease-out'],
            
            // borders:
            ['border'       , transitionDuration, 'ease-out'],
            ['border-radius', transitionDuration, 'ease-out'],
            
            // spacings:
         // ['padding'      , transitionDuration, 'ease-out'], // beautiful but uncomfortable
            
            // typos:
            ['font-size'    , transitionDuration, 'ease-out'],
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
export interface BasicProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>,
        
        // variants:
        ResizableProps,
        ThemableProps,
        GradientableProps,
        OutlineableProps,
        MildableProps,
        NudibleProps
{
}
const Basic = <TElement extends Element = HTMLElement>(props: BasicProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet          = useBasicStyleSheet();
    
    
    
    // variants:
    const resizableVariant    = useResizable(props);
    const themableVariant     = useThemable(props);
    const gradientableVariant = useGradientable(props);
    const outlineableVariant  = useOutlineable(props);
    const mildableVariant     = useMildable(props);
    const nudibleVariant      = useNudible(props);
    
    
    
    // rest props:
    const {
        // variants:
        size     : _size,     // remove
        theme    : _theme,    // remove
        gradient : _gradient, // remove
        outlined : _outlined, // remove
        mild     : _mild,     // remove
        nude     : _nude,     // remove
    ...restGenericProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        resizableVariant.class,
        themableVariant.class,
        gradientableVariant.class,
        outlineableVariant.class,
        mildableVariant.class,
        nudibleVariant.class,
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
