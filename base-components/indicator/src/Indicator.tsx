// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useCallback,
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
}                           from '@cssfn/css-types'             // cssfn css specific types
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
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // types:
    ReadonlyCssCustomRefs,
    
    
    
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    usePropEnabled,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import type {
    // types:
    SemanticProps,
}                           from '@reusable-ui/generic'         // a base component
import {
    // types:
    VariantMixin,
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeCond,
    outlinedOf,
    mildOf,
    usesAnim,
    fallbackNoneFilter,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'       // a base component



// hooks:

// states:

//#region enableDisable
export interface EnableDisableVars {
    filter : any
    anim   : any
}
const [enables] = cssVar<EnableDisableVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(enables.filter);
    animRegistry.registerAnim(enables.anim);
}



// if all below are not set => enabled:
const selectorIfEnabled   = ':not(:is(.enabling, :disabled, [aria-disabled], .disabled))'
// .enabling will be added after loosing disable and will be removed after enabling-animation done:
const selectorIfEnabling  = '.enabling'
// :disabled = real disable, [aria-disabled] = styled disable:
const selectorIfDisabling = ':is(:disabled, [aria-disabled]):not(.disabled)'
// .disabled will be added after disabling-animation done:
const selectorIfDisabled  = '.disabled'

export const ifEnabled         = (styles: CssStyleCollection): CssRule => rule(selectorIfEnabled  , styles);
export const ifEnabling        = (styles: CssStyleCollection): CssRule => rule(selectorIfEnabling , styles);
export const ifDisabling       = (styles: CssStyleCollection): CssRule => rule(selectorIfDisabling, styles);
export const ifDisabled        = (styles: CssStyleCollection): CssRule => rule(selectorIfDisabled , styles);

export const ifEnable          = (styles: CssStyleCollection): CssRule => rule([selectorIfEnabling, selectorIfEnabled                      ], styles);
export const ifDisable         = (styles: CssStyleCollection): CssRule => rule([                    selectorIfDisabling, selectorIfDisabled], styles);
export const ifEnablingDisable = (styles: CssStyleCollection): CssRule => rule([selectorIfEnabling, selectorIfDisabling, selectorIfDisabled], styles);



/**
 * Uses enable & disable states.
 * @returns A `StateMixin<EnableDisableVars>` represents enable & disable state definitions.
 */
export const usesEnableDisableState = (): StateMixin<EnableDisableVars> => {
    return [
        () => style({
            ...states([
                ifEnabling({
                    ...vars({
                        [enables.filter] : indicators.filterDisable,
                        [enables.anim  ] : indicators.animEnable,
                    }),
                }),
                ifDisabling({
                    ...vars({
                        [enables.filter] : indicators.filterDisable,
                        [enables.anim  ] : indicators.animDisable,
                    }),
                }),
                ifDisabled({
                    ...vars({
                        [enables.filter] : indicators.filterDisable,
                    }),
                }),
            ]),
        }),
        enables,
    ];
};



const htmlCtrls   = [
    'button',
    'fieldset',
    'input',
    'select',
    'optgroup',
    'option',
    'textarea',
];
const isCtrlElm = ({tag}: SemanticProps) => tag && htmlCtrls.includes(tag as string);

export const useEnableDisableState = (props: IndicationProps & SemanticProps) => {
    // fn props:
    const propEnabled = usePropEnabled(props);
    
    
    
    // states:
    const [enabled,   setEnabled  ] = useState<boolean>(propEnabled); // true => enabled, false => disabled
    const [animating, setAnimating] = useState<boolean|null>(null);   // null => no-animation, true => enabling-animation, false => disabling-animation
    
    
    
    /*
     * state is enabled/disabled based on [controllable enabled]
     * [uncontrollable enabled] is not supported
     */
    const enabledFn: boolean = propEnabled /*controllable*/;
    
    if (enabled !== enabledFn) { // change detected => apply the change & start animating
        setEnabled(enabledFn);   // remember the last change
        setAnimating(enabledFn); // start enabling-animation/disabling-animation
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useCallback((e: React.AnimationEvent<Element>): void => {
        // conditions:
        if (e.target !== e.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/.test(e.animationName)) return; // ignores animation other than (enable|disable)[Foo] or boo(Enable|Disable)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop enabling-animation/disabling-animation
    }, []);
    
    
    
    return {
        enabled  : enabled,
        disabled : !enabled,
        
        class    : ((): string|null => {
            // enabling:
            if (animating === true)  return 'enabling';
            
            // disabling:
            if (animating === false) return null; // uses :disabled or [aria-disabled]
            
            // fully disabled:
            if (!enabled) return 'disabled';
            
            // fully enabled:
            return null;
        })(),
        
        props : (
            isCtrlElm(props)
            ?
            {
                // a control_element uses pseudo :disabled for disabling
                disabled        : !enabled,
            }
            :
            {
                'aria-disabled' : !enabled ? true : undefined,
            }
        ),
        
        handleAnimationEnd,
    };
};
//#endregion enableDisable

//#region activePassive
export interface ActivePassiveVars {
    filter : any
    anim   : any
}
const [actives] = cssVar<ActivePassiveVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(actives.filter);
    animRegistry.registerAnim(actives.anim);
}



// .actived will be added after activating-animation done:
const selectorIfActived     = '.actived'
// :checked = real active, .active = styled active:
const selectorIfActivating  = ':is(:checked, .active):not(.actived)'
// .passivating will be added after loosing active and will be removed after deactivating-animation done:
const selectorIfPassivating = '.passivating'
// if all above are not set => passived:
const selectorIfPassived    = ':not(:is(.actived, :checked, .active, .passivating))'



export const ifActived           = (styles: CssStyleCollection): CssRule => rule(selectorIfActived    , styles);
export const ifActivating        = (styles: CssStyleCollection): CssRule => rule(selectorIfActivating , styles);
export const ifPassivating       = (styles: CssStyleCollection): CssRule => rule(selectorIfPassivating, styles);
export const ifPassived          = (styles: CssStyleCollection): CssRule => rule(selectorIfPassived   , styles);

export const ifActive            = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActived                                           ], styles);
export const ifPassive           = (styles: CssStyleCollection): CssRule => rule([                                         selectorIfPassivating, selectorIfPassived], styles);
export const ifActivePassivating = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActived, selectorIfPassivating                    ], styles);
//#endregion activePassive



// styles:
export const usesIndicatorLayout = () => {
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
export const usesIndicatorVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule   ] = usesSizeVariant();
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

export const useIndicatorStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesIndicatorLayout(),
        
        // variants:
        usesIndicatorVariants(),
    ]),
}), { id: '9i8stbnt0e' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [indicators, cssIndicatorConfig] = cssConfig(() => {
    // dependencies:
    
    const [, , animRegistry] = usesAnim();
    const filters = animRegistry.filters;
    
    const [, {filter: filterExcited} ] = usesExcitedState();
    
    
    
    // keyframes:
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
}, { prefix: 'indi' });



// react components:
export interface IndicatorProps<TElement extends Element = Element>
    extends
        // bases:
        BasicProps<TElement>
{
}
const Indicator = <TElement extends Element = Element>(props: IndicatorProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet      = useIndicatorStyleSheet();
    
    
    
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
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                // layouts:
                sizeVariant.class,
                nudeVariant.class,
                
                // colors:
                themeVariant.class,
                gradientVariant.class,
                outlinedVariant.class,
                mildVariant.class,
            ]}
        />
    );
};
export {
    Indicator,
    Indicator as default,
}
