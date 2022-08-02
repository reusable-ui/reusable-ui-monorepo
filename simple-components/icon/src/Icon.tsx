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
}                           from '@cssfn/css-types'             // cssfn css specific types
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
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
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
    // styles:
    fillTextLineHeightLayout,
}                           from '@reusable-ui/layouts'         // common layouts
import {
    // hooks:
    useMergeClasses,
    useMergeStyles,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
    ResizableProps,
    useResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    ThemeName,
    ifHasTheme,
    usesThemable as baseUsesThemable,
    themeOptions,
    ThemableProps,
    useThemable,
}                           from '@reusable-ui/themable'        // color options of UI
import {
    // hooks:
    ifNotMild,
    ifMild,
    MildableRules,
    MildableConfig,
    usesMildable as baseUsesMildable,
    MildableProps,
    useMildable,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // types:
    FeatureMixin,
    
    
    
    // hooks:
    usesOutlinedVariant,
    BackgVars,
    usesBackg as basicUsesBackg,
    
    
    
    // configs:
    basics as basicCssConfigs,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import type {
    default as fontItems,
}                           from './icon-font-material.js'



// hooks:

// variants:

//#region resizable
export type SizeName = 'sm'|'nm'|'md'|'lg'|'1em'



/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'nm', 'md', 'lg', '1em'];
//#endregion resizable

//#region themable
/**
 * Uses theme (color) options.  
 * For example: `primary`, `success`, `danger`.
 * @param factory A callback to create a theme rules for each theme color in `options`.
 * @param options Defines all available theme color options.
 * @returns A `ThemableRules` represents the theme rules for each theme color in `options`.
 */
export const usesThemable = (factory : ((themeName: ThemeName) => CssStyleCollection) = themeOf, options : ThemeName[] = themeOptions()) => baseUsesThemable(factory, options);

/**
 * Creates a theme rules for the given `themeName`.
 * @param themeName The theme name.
 * @returns A `CssRule` represents a theme rules for the given `themeName`.
 */
export const themeOf = (themeName: ThemeName): CssRule => {
    // dependencies:
    const {themableVars} = usesThemable();
    
    
    
    return style({
        ...vars({
            [themableVars.altBackg    ] : colors[   themeName       as keyof typeof colors], // base color
            [themableVars.altBackgMild] : colors[`${themeName}Mild` as keyof typeof colors], // 20% base color + 80% page's background
        }),
    });
};
//#endregion themable

//#region mildable
/**
 * Uses a toggleable mildification.  
 * @param config  A configuration of `mildableRule`.
 * @param factory A callback to create a mildification rules for each toggle state.
 * @returns A `MildableRules` represents the mildification rules for each toggle state.
 */
export const usesMildable = (config?: MildableConfig, factory : ((toggle: boolean|null) => CssStyleCollection) = mildOf): MildableRules => {
    // dependencies:
    const {themableRule, themableVars} = usesThemable();
    const {              mildableVars} = baseUsesMildable(config, factory);
    
    
    
    return {
        mildableRule: () => style({
            ...imports([
                // makes   `usesMildable()` implicitly `usesThemable()`
                // because `usesMildable()` requires   `usesThemable()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themableRule,
            ]),
            ...vars({
                [mildableVars.altBackgFn] : fallbacks(
                    themableVars.altBackgMildImpt, // first  priority // supports for validation on ancestor
                    themableVars.altBackgMild,     // second priority
                    themableVars.altBackgMildCond, // third  priority // supports for active state on ancestor
                    
                    ...(config?.defaultAltBackg ? [config.defaultAltBackg] : []), // default => uses config's alternate background
                ),
            }),
            ...variants([
                ifNotMild(factory(false)),
                ifMild(factory(true)),
            ]),
        }),
        mildableVars,
    };
};

/**
 * Creates a mildification rules for the given `toggle` state.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` for undefining the mildification.
 * @returns A `CssRule` represents a mildification rules for the given `toggle` state.
 */
export const mildOf = (toggle: boolean|null = true): CssRule => {
    // dependencies:
    const {mildableVars} = baseUsesMildable();
    
    
    
    return style({
        ...vars({
            // *toggle on/off* the mildification prop:
            [mildableVars.altBackgTg] : toggle ? mildableVars.altBackgFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        }),
    });
};
//#endregion mildable

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
    const {themableVars} = usesThemable();
    const [, backgs    ] = basicUsesBackg();
    const [, outlineds ] = usesOutlinedVariant();
    const {mildableVars} = usesMildable();
    
    
    
    return [
        () => style({
            // color functions:
            ...vars({
                [backgs.altBackgColorFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Icon> has a dedicated theme:
                ...vars({
                    [backgs.altBackgColorFn] : fallbacks(
                        themableVars.altBackgImpt,    // first  priority // supports for validation on ancestor
                        themableVars.altBackg,        // second priority
                        themableVars.altBackgCond,    // third  priority // supports for active state on ancestor
                        
                        icons.color,                  // default => uses config's color
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [backgs.altBackgColor  ] : fallbacks(
                    outlineds.altBackgTg,    // toggle outlined (if `usesOutlinedVariant()` applied) // supports for outlined ancestor
                    mildableVars.altBackgTg, // toggle mild     (if `usesMildable()` applied)
                    
                    backgs.altBackgColorFn,  // default => uses our `backgColorFn`
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
const [iconVars] = cssVar<IconVars>({ minify: false, prefix: 'icon' }); // do not minify to make sure `style={{ --icon-img: ... }}` is the same between in server (without `useIconStyleSheet` rendered) & client (with `useIconStyleSheet` rendered)

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
                [iconVars.img  ] : 'initial',            // initially no image was defined
                
                
                
                // sizes:
                [iconVars.size ] : icons.size,           // default => uses config's size
                
                
                
                // backgrounds:
                [iconVars.color] : fallbacks(
                    backgs.altBackgColor, // first  priority // uses theme color (if any)
                    icons.color,          // default => uses config's color
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
        
        const isIconFont : boolean = !iconImg; // && config.font.items.includes(icon); // assumes the user use TypeScript for validating the font name
        
        
        
        // memorized a whole object:
        return {
            class: (() => {
                if (iconImg)    return 'img';  // icon name is found in iconImg
                
                if (isIconFont) return 'font'; // icon name is found in iconFont
                
                return null; // icon name is not found in both iconImg & iconFont
            })(),
            
            style: {
                // appearances:
                [
                    iconVars.img
                    .slice(4, -1) // fix: var(--customProp) => --customProp
                ]: (() => {
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
            verticalAlign  : 'baseline',    // <Icon>'s text should be aligned with sibling text, so the <Icon> behave like <span> wrapper
            
            
            
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
            color : null, // delete color prop from config, we use color prop in special way
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
                    ...config.font.files
                    .map((file) => [
                        `url("${concatUrl(config.font.path, file)}")`,
                        formatOf(file) ?? '',
                    ]),
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
    
    // variants:
    const {resizableRule} = usesResizable<SizeName>(icons);
    const {themableRule } = usesThemable();
    const {mildableRule } = usesMildable({
        defaultAltBackg : icons.color, // default => uses config's foreground
    });
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
            themableRule,
            mildableRule,
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
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        ResizableProps<SizeName>,
        ThemableProps,
        MildableProps
{
    // appearances:
    icon : IconList
}
const Icon = <TElement extends Element = HTMLSpanElement>(props: IconProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = useIconStyleSheet();
    
    
    
    // variants:
    const resizableVariant = useResizable<SizeName>(props);
    const themableVariant  = useThemable(props);
    const mildableVariant  = useMildable(props);
    
    
    
    // appearances:
    const icon             = useIcon(props);
    
    
    
    // rest props:
    const {
        // appearances:
        icon     : _icon,  // remove
        
        
        
        // variants:
        size     : _size,  // remove
        
        // colors:
        theme    : _theme, // remove
        mild     : _mild,  // remove
    ...restGenericProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        resizableVariant.class,
        themableVariant.class,
        mildableVariant.class,
    );
    const classes        = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // appearances:
        icon.class,
    );
    
    
    
    // styles:
    const mergedStyle = useMergeStyles(
        // appearances:
        icon.style,
        
        
        
        // preserves the original `style` (can overwrite the `icon.style`):
        props.style,
    );
    
    
    
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



export interface IconComponentProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        Partial<Pick<IconProps<TElement>, 'icon'>>
{
    // components:
    iconComponent ?: React.ReactComponentElement<any, IconProps<TElement>>
}
