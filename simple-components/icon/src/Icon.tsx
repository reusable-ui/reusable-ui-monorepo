// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
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
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    CssVars,
    cssVars,
    switchOf,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // styles:
    fillTextLineHeightLayout,
}                           from '@reusable-ui/layouts'         // common layouts
import {
    // hooks:
    useMergeClasses,
    useMergeStyles,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui features:
import {
    // hooks:
    usesBackground,
}                           from '@reusable-ui/background'      // background stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
    ResizableProps,
    useResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    ifHasTheme,
    ifNoTheme,
    usesThemable,
    ThemableProps,
    useThemable,
}                           from '@reusable-ui/themable'        // color options of UI
import {
    // hooks:
    usesOutlineable,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    usesMildable,
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
    // configs:
    basics as basicCssConfigs,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import type {
    default as fontItems,
}                           from './icon-font-material.js'



// hooks:

// features:

//#region iconColor
export interface IconColorVars {
    /**
     * functional conditional Icon color based on its background color.
     */
    autoBoldColorFn : any
    
    /**
     * functional conditional Icon color based on its background color - at mild variant.
     */
    autoMildColorFn : any
    /**
     * toggles_on conditional Icon color based on its background color - at mild variant.
     */
    autoMildColorTg : any
    
    /**
     * Conditional Icon color based on its background color.
     */
    autoColorFn     : any
    /**
     * toggles_on conditional Icon color based on its background color.
     */
    autoColorTg     : any
    
    
    
    /**
     * final Icon color.
     */
    color           : any
}
const [iconColorVars] = cssVars<IconColorVars>();



export interface IconColorStuff { iconColorRule: Factory<CssRule>, iconColorVars: CssVars<IconColorVars> }
export interface IconColorConfig {
    altColor ?: CssKnownProps['backgroundColor']
}
/**
 * Uses icon color.
 * @param config  A configuration of `iconColorRule`.
 * @param mildFactory A callback to create a mildification rules for each toggle state.
 * @returns A `IconColorStuff` represents the icon color rules.
 */
export const usesIconColor = (config?: IconColorConfig, mildFactory : ((toggle: boolean|null) => CssStyleCollection) = mildOf): IconColorStuff => {
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground({ altBackg : config?.altColor });
    
    // variants:
    const {themableVars   } = usesThemable();
    const {outlineableVars} = usesOutlineable();
    const {mildableVars   } = usesMildable();
    
    
    
    return {
        iconColorRule: () => style({
            ...imports([
                // features:
                backgroundRule,
            ]),
            ...ifHasTheme({
                // conditional color functions:
                // ...vars({
                //     [iconColorVars.autoColor] : themableVars.altBackgCond,
                // }),
                // ...ifSelfMildOrOutlined({
                //     ...vars({
                //         [iconColorVars.autoColor] : themableVars.backgCond,
                //     }),
                // }),
                // ...ifAncestorMildOrOutlined({
                //     ...vars({
                //         [iconColorVars.autoColor] : themableVars.backgCond,
                //     }),
                //     ...ifSelfMildOrOutlined({
                //         ...vars({
                //             [iconColorVars.autoColor] : themableVars.altBackgCond,
                //         }),
                //     }),
                // }),
            }),
            ...vars({
                // conditional color functions:
                [iconColorVars.autoBoldColorFn] : switchOf(
                    outlineableVars.altBackgTg,     // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.altBackgTg,        // toggle mild     (if `usesMildable()` applied)
                    
                    backgroundVars.altBackgColorFn, // default => uses our `altBackgColorFn`
                ),
                [iconColorVars.autoMildColorFn] : switchOf(
                    outlineableVars.backgTg,        // toggle outlined (if `usesOutlineable()` applied)
                    mildableVars.backgTg,           // toggle mild     (if `usesMildable()` applied)
                    
                    backgroundVars.backgColorFn,    // default => uses our `backgColorFn`
                ),
                [iconColorVars.autoColorFn    ] : switchOf(
                    iconColorVars.autoMildColorTg,  // toggle mild
                    
                    iconColorVars.autoBoldColorFn,  // default => uses our `autoBoldColorFn`
                ),
                
                
                
                // final color functions:
                [iconColorVars.color] : switchOf(
                    iconColorVars.autoColorTg, // first  priority
                    backgroundVars.backgColor, // second priority
                ),
            }),
            ...variants([
                ifNoTheme({
                    ...vars({
                        [iconColorVars.autoColorTg] : iconColorVars.autoColorFn,
                    }),
                }),
                rule('&:not(.mild)', mildFactory(false)),
                rule('&.mild'      , mildFactory(true )),
            ]),
        }),
        iconColorVars,
    };
};

/**
 * Creates a mildification rules for the given `toggle` state.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` for undefining the mildification.
 * @returns A `CssRule` represents a mildification rules for the given `toggle` state.
 */
export const mildOf = (toggle: boolean|null = true): CssRule => style({
    ...vars({
        // *toggle on/off* the mildification prop:
        [iconColorVars.autoMildColorTg] : toggle ? iconColorVars.autoMildColorFn : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
    }),
});
//#endregion iconColor

//#region icon
export interface IconVars {
    /**
     * Icon image url or icon name.
     */
    image : any
    
    /**
     * Icon size.
     */
    size  : any
    
    /**
     * Icon color.
     */
    color : any
}
const [iconVars] = cssVars<IconVars>({ minify: false, prefix: 'icon' }); // do not minify to make sure `style={{ --icon-image: ... }}` is the same between in server



export interface IconStuff { iconRule: Factory<CssRule>, iconVars: CssVars<IconVars> }
export interface IconConfig {
    image ?: CssKnownProps['content'        ]
    size  ?: CssKnownProps['blockSize'      ]
    color ?: CssKnownProps['backgroundColor']
}
/**
 * Uses icon image and icon color.
 * @param config  A configuration of `iconRule`.
 * @returns A `IconStuff` represents the icon rules.
 */
export const usesIcon = (config?: IconConfig): IconStuff => {
    // dependencies:
    
    // variants:
    const {iconColorVars} = usesIconColor();
    
    
    
    return {
        iconRule: () => style({
            ...vars({
                // appearances:
                [iconVars.image] : config?.image,
                
                
                
                // sizes:
                [iconVars.size ] : config?.size,
                
                
                
                // backgrounds:
                [iconVars.color] : config?.color ?? iconColorVars.color,
            }),
        }),
        iconVars,
    };
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
        
        // features:
        const {iconVars} = usesIcon();
        
        
        
        const iconImage    : string|null = (() => {
            const file = config.image.files.find((file) => getFileNameWithoutExtension(file) === icon);
            if (!file) return null;
            return concatUrl(config.image.path, file);
        })();
        
        const isIconFont : boolean = !iconImage; // && config.font.items.includes(icon); // assumes the user use TypeScript for validating the font name
        
        
        
        // memorized a whole object:
        return {
            class: (() => {
                if (iconImage)  return 'image'; // icon name is found in iconImage
                
                if (isIconFont) return 'font';  // icon name is found in iconFont
                
                return null; // icon name is not found in both iconImage & iconFont
            })(),
            
            style: {
                // appearances:
                [
                    iconVars.image
                    .slice(4, -1) // fix: var(--customProp) => --customProp
                ]: (() => {
                    if (iconImage)  return `url("${iconImage}")`; // the url of the icon's image
                    
                    if (isIconFont) return `"${icon}"`;         // the icon's name
                    
                    return undefined; // icon name is not found in both iconImage & iconFont
                })(),
            },
            
            children: (!!iconImage && (
                <img key='icon-image' src={iconImage} alt='' />
            )),
        };
    }, [icon]);
};
//#endregion icon


// variants:

//#region resizable
export type SizeName = 'sm'|'nm'|'md'|'lg'|'1em'



/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'nm', 'md', 'lg', '1em'];
//#endregion resizable

//#region mildable
// current is  `.mild`:
const ifSelfMildOrOutlined     = (styles: CssStyleCollection): CssRule => rule('&:is(.mild, .outlined)' , styles);


// grandpa is  `.mild`:
const ifAncestorMildOrOutlined = (styles: CssStyleCollection): CssRule => rule(':is(.mild, .outlined) &', styles);
//#endregion mildable



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
    
    // features:
    const {iconRule, iconVars} = usesIcon({size: icons.size});
    
    
    
    return style({
        ...imports([
            // features:
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
export const usesIconFontLayout  = () => {
    // dependencies:
    
    // features:
    const {iconVars} = usesIcon();
    
    
    
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
                content       : iconVars.image, // put the icon's name here, the font system will replace the name to the actual image
                display       : 'inline',       // use inline, so it takes the width & height automatically
                
                
                
                // sizes:
                fontSize      : iconVars.size,  // set icon's size
                overflowY     : 'hidden',       // a hack: hides the pseudo-inherited underline
                
                
                
                // accessibilities:
                userSelect    : 'none',         // disable selecting icon's text
                
                
                
                // backgrounds:
                backg         : 'transparent',  // set background as transparent
                
                
                
                // foregrounds:
                foreg         : iconVars.color, // set icon's color
                
                
                
                // animations:
                transition    : 'inherit',      // inherit transition for smooth sizing changes
                
                
                
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
export const usesIconImageLayout = () => {
    // dependencies:
    
    // features:
    const {iconVars} = usesIcon();
    
    
    
    return style({
        // appearances:
        maskSize      : 'contain',       // image's size is as big as possible without being cropped
        maskRepeat    : 'no-repeat',     // just one image, no repetition
        maskPosition  : 'center',        // place the image at the center
        maskImage     : iconVars.image,  // set icon's image
        
        
        
        // sizes:
        // a dummy element, for making the image's width
        ...children('img', {
            // layouts:
            display    : 'inline-block', // use inline-block, so it takes the width & height as we set
            
            
            
            // appearances:
            visibility : 'hidden',       // hide the element, but still consumes the dimension
            
            
            
            // sizes:
            inlineSize : 'auto',         // calculates the width by [blockSize * aspect_ratio]
            blockSize  : '100%',         // set icon's height as tall as container
            
            
            
            // accessibilities:
            userSelect : 'none',         // disable selecting icon's image
            
            
            
            // animations:
            transition : 'inherit',      // inherit transition for smooth sizing changes
        }),
        
        
        
        // backgrounds:
        backg         : iconVars.color,  // set icon's color
    });
};
export const usesIconVariants    = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable<SizeName>(icons, sizeOptions());
    const {themableRule } = usesThemable();
    const {iconColorRule} = usesIconColor({ altColor : icons.color });
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
            themableRule,
            iconColorRule,
        ]),
    });
};
export const usesIconImage       = (image: CssKnownProps['content'], color?: CssKnownProps['backgroundColor'], size?: CssKnownProps['blockSize']) => {
    // dependencies:
    
    // features:
    const {iconRule} = usesIcon({ image, size, color });
    
    
    
    return style({
        ...imports([
            // layouts:
            usesIconImageLayout(),
            
            // features:
            iconRule,
        ]),
    });
};

export const useIconStyleSheet = dynamicStyleSheet(() => ({
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
        rule('.image', {
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
        sizeNm : '24px'                                         as CssKnownProps['blockSize'],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // sizes:
        size    :            basics.sizeNm                      as CssKnownProps['blockSize'],
        sizeSm  : [['calc(', basics.sizeNm, '*', 0.75  , ')']]  as CssKnownProps['blockSize'],
        sizeMd  : [['calc(', basics.sizeNm, '*', 1.50  , ')']]  as CssKnownProps['blockSize'],
        sizeLg  : [['calc(', basics.sizeNm, '*', 2.00  , ')']]  as CssKnownProps['blockSize'],
        size1em : '1em'                                         as CssKnownProps['blockSize'],
        
        
        
        // animations:
        transition : basicCssConfigs.transition                 as CssKnownProps['transition'],
    };
}, { prefix: 'ico' });

export const config = {
    font  : {
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
    image : {
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
    
    
    
    // features:
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
