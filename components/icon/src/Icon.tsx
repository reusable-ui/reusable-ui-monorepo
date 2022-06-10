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
    fontFace,
    
    
    
    // combinators:
    children,
    
    
    
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
    // styles:
    fillTextLineHeightLayout,
}                           from '@reusable-ui/layouts'     // common layouts
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
    
    usesOutlinedVariant,
    
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

//#region iconForeg
export interface IconForegVars {
    /**
     * toggles_on icon foreground color - at mild variant.
     */
    mildForegTg : any
    /**
     * final icon foreground color.
     */
    foreg       : any
}
const [iconForegs] = cssVar<IconForegVars>();

/**
 * Uses icon foreground color.
 * @returns A `VariantMixin<IconForegVars>` represents icon foreground color definitions.
 */
export const usesIconForeg = (): VariantMixin<IconForegVars> => {
    // dependencies:
    const [, outlineds] = usesOutlinedVariant();
    const [, backgs   ] = usesBackg();
    
    
    
    return [
        () => style({
            ...vars({
                [iconForegs.foreg] : fallbacks(
                    outlineds.foregTg,      // toggle outlined (if `usesOutlinedVariant()` applied)
                    iconForegs.mildForegTg, // toggle mild     (if `usesMildVariant()` applied)
                    
                    backgs.backgColorFn,    // default => uses our `backgColorFn`
                ),
            }),
            ...variants([
                ifNotMild({
                    ...vars({
                        [iconForegs.mildForegTg] : 'initial',
                    }),
                }),
                ifMild({
                    ...vars({
                        [iconForegs.mildForegTg] : outlineds.foregFn,
                    }),
                }),
            ]),
        }),
        iconForegs,
    ];
};
//#endregion iconForeg



// utilities:
/**
 * Merges two specified url to final url.
 * @param base The relative or absolute base url.
 * @param target The relative or absolute target url.
 * @returns A final url.  
 * If `target` is an absolute url, the `base` discarded.  
 * Otherwise, the combination of `base` url followed by `target` url.
 */
export const concatUrl = (base: string, target: string): string => {
    const dummyUrl  = new URL('http://dummy');
    if (!base.endsWith('/') || !base.endsWith('\\')) base += '/';
    const baseUrl   = new URL(base, dummyUrl);
    const targetUrl = new URL(target, baseUrl);
    
    const result = targetUrl.href;
    if (result.startsWith(dummyUrl.origin)) return result.slice(dummyUrl.origin.length);
    return result;
};

/**
 * Gets a file format based on the extension of the specified `fileName`.
 * @param fileName The name of the file to retrieve.
 * @returns  
 * A `string` represents a file format.  
 * -or-  
 * `null` if the format file is unknown.
 */
export const formatOf = (fileName: string): string|null => {
    if (!fileName) return null;
    
    
    
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex < 0) return null; // extension is not found
    const extension = fileName.slice(lastDotIndex + 1).toLowerCase();
    switch (extension) {
        case 'ttf': return 'format("truetype")';
        default   : return  `format("${extension}")`;
    } // case
};



// styles:
export interface IconVars {
    /**
     * Icon's image url or icon's name.
     */
    img : any
}
const [iconVars] = cssVar<IconVars>({ minify: false }); // do not minify to make sure `style={{ --img: ... }}` is the same between in server (without `useIconSheet` rendered) & client (with `useIconSheet` rendered)

export const usesIconLayout = () => {
    // dependencies:
    
    // backgrounds:
    const [backgRule, backgs] = usesBackg();
    
    
    
    return style({
        ...imports([
            // backgrounds:
            backgRule,
        ]),
        ...style({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // center items horizontally
            alignItems     : 'center',      // center items vertically
            flexWrap       : 'nowrap',      // no wrapping
            
            
            
            // positions:
            verticalAlign  : 'baseline', // icon's text should be aligned with sibling text, so the icon behave like <span> wrapper
            
            
            
            // sizes:
            blockSize      : icons.size, // set background_image's height
            
            
            
            // children:
            ...children('::before', {
                ...imports([
                    fillTextLineHeightLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(icons), // apply config's cssProps
            
            
            
            // backgrounds:
            backg          : backgs.backg,
        }),
    });
};
export const usesIconFontLayout  = (img?: CssCustomRef) => {
    return style({
        // load a custom font:
        ...fontFace({
            ...imports([
                config.font.style, // define the font's properties
            ]),
            ...style({
                src: [
                    config.font.files
                    .map((file) =>
                        `url("${concatUrl(config.font.path, file)}") ${formatOf(file)}`
                    )
                ],
            }),
        }),
        
        
        
        // children:
        ...children('::after', {
            ...imports([
                // use the loaded custom font:
                config.font.style, // apply the defined font's properties
            ]),
            ...style({
                // layouts:
                content       : img ?? icons.img, // put the icon's name here, the font system will replace the name to the actual image
                display       : 'inline',         // use inline, so it takes the width & height automatically
                
                
                
                // appearances:
                transition    : 'inherit', // inherit transition for smooth sizing changes
                
                
                
                // sizes:
                fontSize      : icons.size,       // set icon's size
                overflowY     : 'hidden',         // a hack: hides the pseudo-inherited underline
                
                
                
                // accessibilities:
                userSelect    : 'none',           // disable selecting icon's text
                
                
                
                // backgrounds:
                backg         : 'transparent',    // set background as transparent
                
                
                
                // foregrounds:
                foreg         : 'currentColor',   // set foreground as icon's color
                
                
                
                // typos:
                lineHeight    : 1,
                textTransform : 'none',
                letterSpacing : 'normal',
                overflowWrap  : 'normal',
                whiteSpace    : 'nowrap',
                direction     : 'ltr',
                
                //#region turn on available browser features
                WebkitFontSmoothing : 'antialiased',        // support for all WebKit browsers
                textRendering       : 'optimizeLegibility', // support for Safari and Chrome
                MozOsxFontSmoothing : 'grayscale',          // support for Firefox
                fontFeatureSettings : 'liga',               // support for IE
                //#endregion turn on available browser features
            }),
        }),
    });
};
export const usesIconImageLayout = (img?: CssCustomRef) => {
    return style({
        // appearances:
        maskSize      : 'contain',           // image's size is as big as possible without being cropped
        maskRepeat    : 'no-repeat',         // just one image, no repetition
        maskPosition  : 'center',            // place the image at the center
        maskImage     : img ?? iconRefs.img, // set icon's image
        
        
        
        // sizes:
        // a dummy element, for making the image's width
        ...children('img', {
            // layouts:
            display    : 'inline-block', // use inline-block, so it takes the width & height as we set
            
            
            
            // appearances:
            transition : 'inherit', // inherit transition for smooth sizing changes
            visibility : 'hidden', // hide the element, but still consumes the dimension
            
            
            
            // sizes:
            inlineSize : 'auto', // calculates the width by [blockSize * aspect_ratio]
            blockSize  : '100%', // set icon's height as tall as container
            
            
            
            // accessibilities:
            userSelect : 'none', // disable selecting icon's img
        }),
        
        
        
        // backgrounds:
        backg         : 'currentColor', // set background as icon's color
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

export const config = {
    font: {
        /**
         * A `url directory` pointing to the collection of the icon's fonts.  
         * It's the `front-end url`, not the physical path on the server.
         */
        path  : '/fonts',
        
        /**
         * A list of icon's fonts with extensions.  
         * The order does matter. Place the most preferred file on the first.
         */
        files : [
            'MaterialIcons-Regular.woff2',
            'MaterialIcons-Regular.woff',
            'MaterialIcons-Regular.ttf',
        ],
        
        /**
         * A list of valid icon-font's content.
         */
        items : fontItems as unknown as string[],
        
        /**
         * The css style of icon-font to be loaded.
         */
        style : style({
            fontFamily     : '"Material Icons"',
            fontWeight     : 400,
            fontStyle      : 'normal',
            textDecoration : 'none',
        }),
    },
    img: {
        /**
         * A `url directory` pointing to the collection of the icon's images.  
         * It's the `front-end url`, not the physical path on the server.
         */
        path  : '/icons',
        
        /**
         * A list of icon's images with extensions.  
         * The order doesn't matter, but if there are any files with the same name but different extensions, the first one will be used.
         */
        files : [
            'instagram.svg',
            'whatsapp.svg',
            'close.svg',
            'busy.svg',
            'prev.svg',
            'next.svg',
            'dropdown.svg',
            'dropright.svg',
            'dropleft.svg',
        ],
    },
};



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
