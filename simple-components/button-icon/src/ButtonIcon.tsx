// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
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
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    // types:
    CssConfigProps,
    Refs,
    
    
    
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // types:
    VariantMixin,
    
    
    
    // hooks:
    SizeVars,
    ifSize          as basicIfSize,
    usesSizeVariant as basicUsesSizeVariant,
    useSizeVariant  as basicUseSizeVariant,
    
    OrientationName,
    OrientationVariantOptions,
    OrientationVariant,
    
    usesBackg,
    
    extendsBorder,
    extendsPadding,
    
    
    
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    
    
    
    // styles:
    usesButtonLayout,
    usesButtonVariants,
    usesButtonStates,
    
    
    
    // configs:
    buttons,
    
    
    
    // react components:
    ButtonProps,
    Button,
}                           from '@reusable-ui/button'          // a base component
import {
    // hooks:
    usesIcon,
    
    
    
    // configs:
    icons,
    
    
    
    // react components:
    Icon,
    
    IconComponentProps,
}                           from '@reusable-ui/icon'            // an icon set



// hooks:

// layouts:

//#region sizes
export type SizeName = 'xs'|'sm'|'lg'|'xl' | (string & {})
export type { SizeVars }



export const ifSize = (sizeName: SizeName, styles: CssStyleCollection): CssRule => basicIfSize(sizeName, styles);



/**
 * Uses button icon sizes.  
 * For example: `xs`, `sm`, `lg`, `xl`.
 * @param configProps Customize the sizing definitions from configuration for each size in `options`.
 * @param options Customize the size options.
 * @returns A `VariantMixin<SizeVars>` represents sizing definitions for each size in `options`.
 */
export const usesSizeVariant = <TConfigProps extends CssConfigProps>(configProps : Refs<TConfigProps>, options = sizeOptions()): VariantMixin<SizeVars> => basicUsesSizeVariant(configProps, options);

/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['xs', 'sm', 'lg', 'xl'];



export interface SizeVariant {
    size ?: SizeName
}
export const useSizeVariant = (props: SizeVariant) => basicUseSizeVariant(props);
//#endregion sizes



// styles:
export const usesButtonIconLayout = (options?: OrientationVariantOptions) => {
    // dependencies:
    
    // icon:
    const [, iconVars] = usesIcon();
    
    // backgrounds:
    const [, backgs  ] = usesBackg();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesButtonLayout(options),
        ]),
        ...style({
            // children:
            ...children(':nth-child(n):not(_)', { // increase specificity by 1.1 to win with <Icon>
                ...vars({
                    //#region <Icon>
                    // sizes:
                    // fills the entire parent text's height:
                    [iconVars.size       ] : `calc(1em * ${fallbacks(basics.lineHeight, typos.lineHeight)})`,
                    
                    
                    
                    // backgrounds:
                    // a fix for mild+(active|focus|arrive):
                    [backgs.altBackgColor] : 'inherit',
                    [iconVars.color      ] : backgs.altBackgColor,
                    
                    
                    
                    // animations:
                    [icons.transition    ] : [
                        [icons.transition],
                        
                        // sizes:
                        // fix the resizing transition to sync with <Button>
                        ['inline-size', 0],
                        ['block-size' , 0],
                    ],
                    //#endregion <Icon>
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(buttonIcons), // apply config's cssProps
            
            
            
            // borders:
            
            // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
            ...extendsBorder(buttonIcons),
            
            
            
            // spacings:
            
            // let's Reusable-UI system to manage paddingInline & paddingBlock:
            ...extendsPadding(buttonIcons),
        }),
    });
};
export const usesButtonIconVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(buttonIcons);
    
    
    
    return style({
        ...imports([
            // variants:
            usesButtonVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesButtonIconStates = () => {
    return style({
        ...imports([
            // states:
            usesButtonStates(),
        ]),
    });
};

export const useButtonIconStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesButtonIconLayout(),
        
        // variants:
        usesButtonIconVariants(),
        
        // states:
        usesButtonIconStates(),
    ]),
}), { id: 'x6fgydkqor' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [buttonIcons, buttonIconValues, cssButtonIconConfig] = cssConfig(() => {
    return {
        // borders:
        borderRadius      : basics.borderRadius     as CssKnownProps['borderRadius'],
        borderRadiusXs    : basics.borderRadiusSm   as CssKnownProps['borderRadius'],
        borderRadiusSm    : basics.borderRadiusSm   as CssKnownProps['borderRadius'],
        borderRadiusLg    : basics.borderRadiusLg   as CssKnownProps['borderRadius'],
        borderRadiusXl    : basics.borderRadiusLg   as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline     : basics.paddingInline    as CssKnownProps['paddingInline'],
        paddingBlock      : basics.paddingBlock     as CssKnownProps['paddingBlock' ],
        paddingInlineXs   : basics.paddingInlineSm  as CssKnownProps['paddingInline'],
        paddingBlockXs    : basics.paddingBlockSm   as CssKnownProps['paddingBlock' ],
        paddingInlineSm   : basics.paddingInlineSm  as CssKnownProps['paddingInline'],
        paddingBlockSm    : basics.paddingBlockSm   as CssKnownProps['paddingBlock' ],
        paddingInlineLg   : basics.paddingInlineLg  as CssKnownProps['paddingInline'],
        paddingBlockLg    : basics.paddingBlockLg   as CssKnownProps['paddingBlock' ],
        paddingInlineXl   : basics.paddingInlineLg  as CssKnownProps['paddingInline'],
        paddingBlockXl    : basics.paddingBlockLg   as CssKnownProps['paddingBlock' ],
        
        gapInline         : buttons.gapInline       as CssKnownProps['gapInline'],
        gapBlock          : buttons.gapBlock        as CssKnownProps['gapBlock' ],
        gapInlineXs       : buttons.gapInlineSm     as CssKnownProps['gapInline'],
        gapBlockXs        : buttons.gapBlockSm      as CssKnownProps['gapBlock' ],
        gapInlineSm       : buttons.gapInlineSm     as CssKnownProps['gapInline'],
        gapBlockSm        : buttons.gapBlockSm      as CssKnownProps['gapBlock' ],
        gapInlineLg       : buttons.gapInlineLg     as CssKnownProps['gapInline'],
        gapBlockLg        : buttons.gapBlockLg      as CssKnownProps['gapBlock' ],
        gapInlineXl       : buttons.gapInlineLg     as CssKnownProps['gapInline'],
        gapBlockXl        : buttons.gapBlockLg      as CssKnownProps['gapBlock' ],
        
        
        
        // typos:
        fontSize          : typos.fontSizeNm                                                as CssKnownProps['fontSize'],
        fontSizeXs        : typos.fontSizeSm                                                as CssKnownProps['fontSize'],
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']]   as CssKnownProps['fontSize'],
        fontSizeLg        : typos.fontSizeMd                                                as CssKnownProps['fontSize'],
        fontSizeXl        : typos.fontSizeLg                                                as CssKnownProps['fontSize'],
    };
}, { prefix: 'btni' });



// react components:

export type IconPosition = 'start'|'end'
export interface ButtonIconComponentProps
    extends
        // bases:
        Partial<IconComponentProps>
{
    // positions:
    iconPosition  ?: IconPosition
}

export interface ButtonIconProps
    extends
        // bases:
        Omit<ButtonProps, 'size'>,
        
        // layouts:
        SizeVariant,
        
        // components:
        ButtonIconComponentProps
{
}
const ButtonIcon = (props: ButtonIconProps): JSX.Element|null => {
    // styles:
    const styleSheet = useButtonIconStyleSheet();
    
    
    
    // rest props:
    const {
        // components:
        icon,
        iconPosition  = 'start',
        iconComponent = icon && <Icon<Element> icon={icon} />,
        
        
        
        // children:
        children,
    ...restButtonProps} = props;
    
    
    
    // jsx:
    return (
        <Button
            // other props:
            {...restButtonProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            { (iconPosition === 'start') && iconComponent }
            { children }
            { (iconPosition === 'end'  ) && iconComponent }
        </Button>
    );
};
export {
    ButtonIcon,
    ButtonIcon as default,
}

export type { OrientationName, OrientationVariant }

export type { ButtonStyle, ButtonVariant, ButtonType }
