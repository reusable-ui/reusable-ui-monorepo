// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    fontFace,
    children,
    style,
    vars,
    imports,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // common layouts:
    fillTextLineHeightLayout,
    
    
    
    // react helper hooks:
    useMergeClasses,
    useMergeStyles,
    
    
    
    // size options of UI:
    usesResizable,
    ResizableProps,
    useResizable,
    
    
    
    // color options of UI:
    usesThemable,
    ThemableProps,
    useThemable,
    
    
    
    // mild (soft color) variant of UI:
    MildableProps,
    useMildable,
    
    
    
    // colorize the UI based on its theme or the background theme:
    usesColorable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

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
    return {
        iconRule: () => style({
            ...vars({
                // appearances:
                [iconVars.image] : config?.image,
                
                
                
                // sizes:
                [iconVars.size ] : config?.size,
                
                
                
                // backgrounds:
                [iconVars.color] : config?.color,
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
            const file = iconConfig.image.files.find((file) => getFileNameWithoutExtension(file) === icon);
            if (!file) return null;
            return concatUrl(iconConfig.image.path, file);
        })();
        
        const isIconFont : boolean = !iconImage; // && iconConfig.font.items.includes(icon); // assumes the user use TypeScript for validating the font name
        
        
        
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
    
    // variants:
    const {colorableVars} = usesColorable();
    
    // features:
    const {iconRule, iconVars} = usesIcon({
        size  : icons.size,
        color : colorableVars.color,
    });
    
    
    
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
                iconConfig.font.style, // define the font's properties
            ]),
            ...style({
                src: [
                    ...iconConfig.font.files
                    .map((file) => [
                        `url("${concatUrl(iconConfig.font.path, file)}")`,
                        formatOf(file) ?? '',
                    ]),
                ],
            }),
        }),
        
        
        
        // children:
        ...children('::after', {
            ...imports([
                // use the loaded custom font:
                iconConfig.font.style, // apply the defined font's properties
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
    const {colorableRule} = usesColorable(icons, /* outlinedDefinition = not_supported */null, /* mildDefinition = is_supported */undefined);
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
            themableRule,
            colorableRule,
        ]),
    });
};

export interface IconImageConfig
    extends
        Omit<IconConfig, 'image'>,
        Required<Pick<IconConfig, 'image'>>
{
}
export const usesIconImage       = (config: IconImageConfig) => {
    // dependencies:
    
    // features:
    const {iconRule} = usesIcon(config);
    
    
    
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
        color      : 'currentColor'                                 as CssKnownProps['backgroundColor'],
        altColor   : 'gray'                                         as CssKnownProps['backgroundColor'],
        
        
        // sizes:
        sizeNm     : '24px'                                         as CssKnownProps['blockSize'],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // sizes:
        size       :            basics.sizeNm                       as CssKnownProps['blockSize'],
        sizeSm     : [['calc(', basics.sizeNm, '*', 0.75  , ')']]   as CssKnownProps['blockSize'],
        sizeMd     : [['calc(', basics.sizeNm, '*', 1.50  , ')']]   as CssKnownProps['blockSize'],
        sizeLg     : [['calc(', basics.sizeNm, '*', 2.00  , ')']]   as CssKnownProps['blockSize'],
        size1em    : '1em'                                          as CssKnownProps['blockSize'],
        
        
        
        // animations:
        transition : basicCssConfigs.transition                     as CssKnownProps['transition'],
    };
}, { prefix: 'ico' });

export const iconConfig = {
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
            'dropup.svg',
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
|'dropup'
|'dropdown'
|'dropright'
|'dropleft';
export type IconList = CustomIconList | ((typeof fontItems)[number]) | (string & {})

export interface IconProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        Omit<GenericProps<TElement>,
            // children:
            |'children' // nested components are not supported
        >,
        
        // span:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
            
            // children:
            |'children' // nested components are not supported
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
