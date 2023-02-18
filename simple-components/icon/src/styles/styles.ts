// cssfn:
import {
    // writes css in javascript:
    rule,
    fontFace,
    children,
    style,
    
    
    
    // strongly typed of css variables:
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // common layouts:
    fillTextLineHeightLayout,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // color options of UI:
    usesThemable,
    
    
    
    // colorize the UI based on its theme or the background theme:
    usesColorable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // configs:
    icons,
    cssIconConfig,
}                           from './config.js'
import {
    // configs:
    iconConfig,
}                           from '../config.js'
import {
    // features:
    IconConfig,
    usesIcon,
}                           from '../features/icon.js'
import {
    // variants:
    SizeName,
    sizeOptions,
}                           from '../variants/resizable.js'
import {
    // utilities:
    concatUrl,
    formatOf,
}                           from '../utilities.js'



// styles:
export const onIconStylesChange  = watchChanges(cssIconConfig.onChange);

export const usesIconLayout      = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {colorableVars} = usesColorable();
    
    // features:
    const {iconRule, iconVars} = usesIcon({
        size  : icons.size,
        color : colorableVars.color,
    });
    
    
    
    return style({
        // features:
        ...iconRule(),
        
        
        
        // layouts:
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
            aspectRatio    : switchOf(      // set background_image's aspect_ratio
                iconVars.ratio,
                'initial',                  // protect from inheritance, if the ratio is not defined
            ),
            
            
            
            // children:
            ...children('::before', {
                // layouts:
                ...fillTextLineHeightLayout(),
            }),
            
            
            
            // customize:
            ...usesCssProps(icons), // apply config's cssProps
            color : null, // delete color prop from config, we use color prop in special way
        }),
    });
}, onIconStylesChange);

export const usesIconFontLayout  = () => {
    // dependencies:
    
    // features:
    const {iconVars} = usesIcon();
    
    
    
    return style({
        // load a custom_font:
        ...fontFace({
            // fonts:
            ...iconConfig.font.style, // define the font's properties
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
            // fonts:
            // use the loaded custom_font:
            ...iconConfig.font.style, // apply the defined font's properties
            
            
            
            // layouts:
            ...style({
                // layouts:
                content       : iconVars.image, // put the icon's name here, the custom_font will replace the name to the actual image
                display       : 'inline',       // use inline, so it takes the width & height automatically
                
                
                
                // sizes:
                fontSize      : iconVars.size,  // set icon's size
             // overflowY     : 'hidden',       // a hack: hides the pseudo-inherited underline
                overflow      : 'hidden',       // we need to squash the text both vertically and horizontally when the custom_font is not yet loaded
                blockSize     : 'inherit',      // follows <parent>'s height
                aspectRatio   : 'inherit',      // follows <parent>'s aspect_ratio
                
                
                
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

export const usesIconImageLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {iconVars} = usesIcon();
    
    
    
    // layouts:
    return style({
        // appearances:
        maskSize           : 'contain',       // image's size is as big as possible without being cropped
        WebkitMaskSize     : 'contain',       // supports for Chrome, WebKit browsers, & Opera
        maskRepeat         : 'no-repeat',     // just one image, no repetition
        WebkitMaskRepeat   : 'no-repeat',     // supports for Chrome, WebKit browsers, & Opera
        maskPosition       : 'center',        // place the image at the center
        WebkitMaskPosition : 'center',        // supports for Chrome, WebKit browsers, & Opera
        maskImage          : iconVars.image,  // set icon's image
        WebkitMaskImage    : iconVars.image,  // supports for Chrome, WebKit browsers, & Opera
        
        
        
        // backgrounds:
        backg              : iconVars.color,  // set icon's color
    });
});

export const usesIconVariants    = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable<SizeName>(icons, sizeOptions());
    const {themableRule } = usesThemable();
    const {colorableRule} = usesColorable(icons, /* outlinedDefinition = not_supported */null, /* mildDefinition = is_supported */undefined);
    
    
    
    return style({
        // variants:
        ...resizableRule(),
        ...themableRule(),
        ...colorableRule(),
    });
}, onIconStylesChange);

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
        // features:
        ...iconRule(),
        
        
        
        // layouts:
        ...usesIconImageLayout(),
    });
};

export default memoizeStyle(() => style({
    // layouts:
    ...usesIconLayout(),
    ...rule('.font', {
        // layouts:
        ...usesIconFontLayout(),
    }),
    ...rule('.image', {
        // layouts:
        ...usesIconImageLayout(),
    }),
    
    // variants:
    ...usesIconVariants(),
}), onIconStylesChange);
