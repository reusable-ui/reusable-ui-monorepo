// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
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
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    switchOf,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui configs:
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system

// reusable-ui utilities:
import {
    // hooks:
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui features:
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'         // padding (inner spacing) stuff of UI

// reusable-ui variants:
import type {
    // hooks:
    OrientationableOptions,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout
import {
    // hooks:
    usesResizable,
    ResizableProps,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    usesButtonLayout,
    usesButtonVariants,
    usesButtonStates,
    
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    
    
    
    // configs:
    buttons,
    
    
    
    // react components:
    ButtonProps,
    Button,
    
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a base component
import {
    // hooks:
    usesIcon,
    
    
    
    // configs:
    icons,
    
    
    
    // react components:
    IconProps,
    Icon,
    
    IconComponentProps,
}                           from '@reusable-ui/icon'            // an icon component



// hooks:

// variants:

//#region resizable
export type SizeName = 'xs'|'sm'|'lg'|'xl'



/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['xs', 'sm', 'lg', 'xl'];
//#endregion resizable



// styles:
export const usesButtonIconLayout = (options?: OrientationableOptions) => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(buttonIcons);
    const {paddingRule, paddingVars} = usesPadding(buttonIcons);
    const {             iconVars   } = usesIcon();
    
    
    
    return style({
        ...imports([
            // features:
            borderRule,
            paddingRule,
            
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
                    [iconVars.size       ] : `calc(1em * ${switchOf(basics.lineHeight, typos.lineHeight)})`,
                    
                    
                    
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
            border        : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
};
export const usesButtonIconVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable<SizeName>(buttonIcons, sizeOptions());
    
    
    
    return style({
        ...imports([
            // variants:
            usesButtonVariants(),
            resizableRule,
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

export const useButtonIconStyleSheet = dynamicStyleSheet(() => ({
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
        fontSize          : typos.fontSizeNm                                                as CssKnownProps['fontSize'      ],
        fontSizeXs        : typos.fontSizeSm                                                as CssKnownProps['fontSize'      ],
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']]   as CssKnownProps['fontSize'      ],
        fontSizeLg        : typos.fontSizeMd                                                as CssKnownProps['fontSize'      ],
        fontSizeXl        : typos.fontSizeLg                                                as CssKnownProps['fontSize'      ],
    };
}, { prefix: 'btni' });



// react components:

export type IconPosition = 'start'|'end'
export interface ButtonIconComponentProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        Partial<IconComponentProps<TElement>>
{
    // positions:
    iconPosition ?: IconPosition
}

export interface ButtonIconProps
    extends
        // bases:
        Omit<ButtonProps,
            |'size' // we redefined `size` prop with more size options
        >,
        
        // variants:
        ResizableProps<SizeName>,
        
        // components:
        ButtonIconComponentProps<Element>,
        ButtonComponentProps
{
}
const ButtonIcon = (props: ButtonIconProps): JSX.Element|null => {
    // styles:
    const styleSheet = useButtonIconStyleSheet();
    
    
    
    // rest props:
    const {
        // variants:
        size,
        
        
        
        // components:
        icon,
        iconPosition  = 'start',
        iconComponent = icon && (<Icon<Element> icon={icon} /> as React.ReactComponentElement<any, IconProps<Element>>),
        
        buttonRef,
        buttonOrientation,
        buttonStyle,
        buttonComponent     = (<Button /> as React.ReactComponentElement<any, ButtonProps>),
        buttonChildren,
        
        
        
        // children:
        children,
    ...restButtonProps} = props;
    
    
    
    // refs:
    const mergedButtonRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `buttonRef` from `props`:
        buttonRef,
        // preserves the original `elmRef` from `props`:
        props.elmRef,
    );
    
    
    
    // jsx:
    /* <Button> */
    return React.cloneElement<ButtonProps>(buttonComponent,
        // props:
        {
            // other props:
            ...restButtonProps,
            
            
            
            // refs:
            elmRef      : mergedButtonRef,
            
            
            
            // variants:
            orientation : buttonComponent.props.orientation ?? buttonOrientation ?? props.orientation,
            buttonStyle : buttonComponent.props.buttonStyle ?? buttonStyle,
            size        : buttonComponent.props.size        ?? (size as ButtonProps['size']),
            
            
            
            // classes:
            mainClass   : buttonComponent.props.mainClass   ?? props.mainClass ?? styleSheet.main,
        },
        
        
        
        // children:
        buttonComponent.props.children ?? (
            <>
                { (iconPosition === 'start') && iconComponent }
                { buttonChildren ?? children }
                { (iconPosition === 'end'  ) && iconComponent }
            </>
        ),
    );
};
export {
    ButtonIcon,
    ButtonIcon as default,
}

export type { ButtonStyle, ButtonVariant, ButtonType }
