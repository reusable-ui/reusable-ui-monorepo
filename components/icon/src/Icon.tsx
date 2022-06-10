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
    
    BackgVars,
    usesBackg as basicUsesBackg,
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
export {
    BackgVars,
}



/**
 * Uses background color (icon color).
 * @returns A `VariantMixin<BackgVars>` represents background color definitions.
 */
export const usesBackg = (): VariantMixin<BackgVars> => {
    // dependencies:
    const [, backgs] = basicUsesBackg();
    const [, themes] = usesThemeVariant();
    const [, milds ] = usesMildVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [backgs.backgColorFn] : fallbacks(
                 // themes.backgImpt,  // first  priority
                    themes.backg,      // second priority
                 // themes.backgCond,  // third  priority
                    
                    icons.backg,       // default => uses config's background
                ),
                [backgs.backgColor  ] : fallbacks(
                 // outlineds.backgTg,   // toggle outlined (if `usesOutlinedVariant()` applied)
                    milds.backgTg,       // toggle mild     (if `usesMildVariant()` applied)
                    
                    backgs.backgColorFn, // default => uses our `backgColorFn`
                ),
            }),
        }),
        backgs,
    ];
};
//#endregion backg



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
