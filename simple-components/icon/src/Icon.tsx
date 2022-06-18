// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // css custom properties:
    CssCustomRef,
    
    
    
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'         // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    fontFace,
    
    
    
    // combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'             // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'       // writes css in react hook
import {
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
}                           from '@cssfn/css-config'        // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'      // a color management system
import {
    // styles:
    fillTextLineHeightLayout,
}                           from '@reusable-ui/layouts'     // common layouts
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'       // react helper hooks
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'     // a base component
import {
    // types:
    FeatureMixin,
    VariantMixin,
    
    
    
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
    
    
    
    // configs:
    basics as basicCssConfigs,
}                           from '@reusable-ui/basic'       // a base component

// internals:
import type {
    default as fontItems,
}                           from './icon-font-material.js'



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
                    
                    icons.color,           // default => uses config's color
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
 * @returns A `FeatureMixin<BackgVars>` represents background color definitions.
 */
export const usesBackg = (): FeatureMixin<BackgVars> => {
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
                    
                    icons.color,       // default => uses config's color
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

//#region icon
export interface IconVars {
    /**
     * Icon image url or icon name.
     */
    img   : any
    
    /**
     * Icon size.
     */
    size  : any
    
    /**
     * Icon color.
     */
    color : any
}
const [iconVars] = cssVar<IconVars>({ minify: false }); // do not minify to make sure `style={{ --img: ... }}` is the same between in server (without `useIconSheet` rendered) & client (with `useIconSheet` rendered)

/**
 * Uses icon image and icon color.
 * @returns A `FeatureMixin<IconVars>` represents icon image and icon color definitions.
 */
export const usesIcon = (): FeatureMixin<IconVars> => {
    // dependencies:
    
    // backgrounds:
    const [backgRule, backgs] = usesBackg();
    
    
    
    return [
        () => style({
            ...imports([
                // backgrounds:
                backgRule,
            ]),
            ...vars({
                // appearances:
                [iconVars.img  ] : 'initial',  // initially no image was defined
                
                // sizes:
                [iconVars.size ] : icons.size, // default => uses config's size
                
                // backgrounds:
                [iconVars.color] : fallbacks(
                    backgs.altBackgColor,      // first priority: uses nearest ancestor's alternate background theme
                    
                    icons.color,               // default => uses config's color
                ),
            }),
        }),
        iconVars,
    ];
};


const getFileNameWithoutExtension = (fileName: string): string|null => {
    if (!fileName) return null;
    
    
    
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex < 0) return fileName; // extension is not found => it's a pure fileName without extension
    return fileName.slice(0, lastDotIndex);
}
export const useIcon = <TElement extends Element = HTMLSpanElement>({ icon }: IconProps<TElement>) => {
    return useMemo(() => {
        // dependencies:
        
        // icon:
        const [, iconVars] = usesIcon();
        
        
        
        const iconImg    : string|null = (() => {
            const file = config.img.files.find((file) => getFileNameWithoutExtension(file) === icon);
            if (!file) return null;
            return concatUrl(config.img.path, file);
        })();
        
        const isIconFont : boolean = !!iconImg; // && config.font.items.includes(icon); // assumes the user use TypeScript for validating the font name
        
        
        
        return {
            class: (() => {
                if (iconImg)    return 'img';  // icon name is found in iconImg
                
                if (isIconFont) return 'font'; // icon name is found in iconFont
                
                return null; // icon name is not found in both iconImg & iconFont
            })(),
            
            style: {
                // appearances:
                [iconVars.img]: (() => {
                    if (iconImg)    return `url("${iconImg}")`; // the url of the icon's image
                    
                    if (isIconFont) return `"${icon}"`;         // the icon's name
                    
                    return undefined; // icon name is not found in both iconImg & iconFont
                })(),
            },
            
            children: (!!iconImg && (
                <img key='ico-img' src={iconImg} alt='' />
            )),
        };
    }, [icon]);
};
//#endregion icon



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
export const usesIconLayout      = () => {
    // dependencies:
    
    // icon:
    const [iconRule, iconVars] = usesIcon();
    
    
    
    return style({
        ...imports([
            // icon:
            iconRule,
        ]),
        ...style({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // center items horizontally
            alignItems     : 'center',      // center items vertically
            flexWrap       : 'nowrap',      // no wrapping
            
            
            
            // positions:
            verticalAlign  : 'baseline',    // icon's text should be aligned with sibling text, so the icon behave like <span> wrapper
            
            
            
            // sizes:
            blockSize      : iconVars.size, // set background_image's height
            
            
            
            // children:
            ...children('::before', {
                ...imports([
                    fillTextLineHeightLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(icons), // apply config's cssProps
        }),
    });
};
export const usesIconFontLayout  = (img?: CssCustomRef) => {
    // dependencies:
    
    // icon:
    const [, iconVars] = usesIcon();
    
    
    
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
                content       : img ?? iconVars.img, // put the icon's name here, the font system will replace the name to the actual image
                display       : 'inline',            // use inline, so it takes the width & height automatically
                
                
                
                // sizes:
                fontSize      : iconVars.size,       // set icon's size
                overflowY     : 'hidden',            // a hack: hides the pseudo-inherited underline
                
                
                
                // accessibilities:
                userSelect    : 'none',              // disable selecting icon's text
                
                
                
                // backgrounds:
                backg         : 'transparent',       // set background as transparent
                
                
                
                // foregrounds:
                foreg         : iconVars.color,      // set icon's color
                
                
                
                // animations:
                transition    : 'inherit',           // inherit transition for smooth sizing changes
                
                
                
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
    // dependencies:
    
    // icon:
    const [, iconVars] = usesIcon();
    
    
    
    return style({
        // appearances:
        maskSize      : 'contain',           // image's size is as big as possible without being cropped
        maskRepeat    : 'no-repeat',         // just one image, no repetition
        maskPosition  : 'center',            // place the image at the center
        maskImage     : img ?? iconVars.img, // set icon's image
        
        
        
        // sizes:
        // a dummy element, for making the image's width
        ...children('img', {
            // layouts:
            display    : 'inline-block',     // use inline-block, so it takes the width & height as we set
            
            
            
            // appearances:
            visibility : 'hidden',           // hide the element, but still consumes the dimension
            
            
            
            // sizes:
            inlineSize : 'auto',             // calculates the width by [blockSize * aspect_ratio]
            blockSize  : '100%',             // set icon's height as tall as container
            
            
            
            // accessibilities:
            userSelect : 'none',             // disable selecting icon's img
            
            
            
            // animations:
            transition : 'inherit',          // inherit transition for smooth sizing changes
        }),
        
        
        
        // backgrounds:
        backg         : iconVars.color,      // set icon's color
    });
};
export const usesIconVariants    = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule   ] = usesSizeVariant(icons);
    
    // colors:
    const [themesRule  ] = usesThemeVariant();
    const [mildRule    ] = usesMildVariant();
    
    
    
    return style({
        ...imports([
            // layouts:
            sizesRule,
            
            // colors:
            themesRule,
            mildRule,
        ]),
    });
};
export const usesIconImage       = (img: CssCustomRef, color?: CssKnownProps['backgroundColor'], size?: CssKnownProps['inlineSize']) => {
    // dependencies:
    
    // icon:
    const [iconRule, iconVars] = usesIcon();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesIconImageLayout(img),
            
            // icon:
            iconRule,
        ]),
        ...vars({
            // sizes:
            [iconVars.size ] : size,  // overwrite icon's size
            
            
            
            // backgrounds:
            [iconVars.color] : color, // overwrite icon's color
        }),
    });
};

export const useIconStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesIconLayout(),
        
        // variants:
        usesIconVariants(),
    ]),
    ...variants([
        rule('.font', {
            ...imports([
                // layouts:
                usesIconFontLayout(),
            ]),
        }),
        rule('.img', {
            ...imports([
                // layouts:
                usesIconImageLayout(),
            ]),
        }),
    ]),
}), { id: 'oqfct2z8qv' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [icons, iconValues, cssIconConfig] = cssConfig(() => {
    const basics = {
        // color:
        color  : 'currentColor'                                 as CssKnownProps['backgroundColor'],
        
        
        
        // sizes:
        sizeNm : '24px'                                         as CssKnownProps['inlineSize'],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // sizes:
        size    :            basics.sizeNm                      as CssKnownProps['inlineSize'],
        sizeSm  : [['calc(', basics.sizeNm, '*', 0.75  , ')']]  as CssKnownProps['inlineSize'],
        sizeMd  : [['calc(', basics.sizeNm, '*', 1.50  , ')']]  as CssKnownProps['inlineSize'],
        sizeLg  : [['calc(', basics.sizeNm, '*', 2.00  , ')']]  as CssKnownProps['inlineSize'],
        size1em : '1em'                                         as CssKnownProps['inlineSize'],
        
        
        
        // animations:
        transition : basicCssConfigs.transition                 as CssKnownProps['transition'],
    };
}, { prefix: 'ico' });

export const config = {
    font : {
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
        
        // /**
        //  * A list of valid icon-font's content.
        //  */
        // items : fontItems as unknown as string[],
        
        /**
         * The css style of icon-font to be loaded.
         */
        style : style({
            // typos:
            fontFamily     : '"Material Icons"',
            fontWeight     : 400,
            fontStyle      : 'normal',
            textDecoration : 'none',
        }),
    },
    img  : {
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
type CustomIconList  =
|'instagram'
|'whatsapp'
|'close'
|'busy'
|'prev'
|'next'
|'dropdown'
|'dropright'
|'dropleft';
export type IconList = CustomIconList | ((typeof fontItems)[number]) | (string & {})

export interface IconProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        GenericProps<TElement>,
        
        // span:
        Omit<React.HTMLAttributes<TElement>, 'role'>,
        
        // layouts:
        SizeVariant,
        
        // colors:
        ThemeVariant,
        MildVariant
{
    // appearances:
    icon : IconList
}
const Icon = <TElement extends Element = HTMLSpanElement>(props: IconProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet      = useIconStyleSheet();
    
    
    
    // variants:
    
    // layouts:
    const sizeVariant     = useSizeVariant(props);
    
    // colors:
    const themeVariant    = useThemeVariant(props);
    const mildVariant     = useMildVariant(props);
    
    
    
    // appearances:
    const icon            = useIcon(props);
    
    
    
    // rest props:
    const {
        // remove variant props:
        
        // layouts:
        size     : _size,
        
        // colors:
        theme    : _theme,
        mild     : _mild,
        
        
        
        // remove appearances:
        icon     : _icon,
        
        
        
        // styles:
        style,
    ...restGenericProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // layouts:
        sizeVariant.class,
        
        // colors:
        themeVariant.class,
        mildVariant.class,
    );
    const classes        = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // appearances:
        icon.class,
    );
    
    
    
    // styles:
    const mergedStyle = useMemo(() => ({
        // appearances:
        ...icon.style,
        
        
        
        // preserves the original `style` (can overwrite the `icon.style`):
        ...(style ?? {}),
    }), [style]);
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // semantics:
            tag='span'
            role='img'
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            classes={classes}
            
            
            
            // styles:
            style={mergedStyle}
        >
            { icon.children }
            { props.children }
        </Generic>
    );
};
export {
    Icon,
    Icon as default,
}
