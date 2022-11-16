// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    states,
    fallbacks,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a border (stroke) management system:
    borderRadiuses,
    
    
    
    // a spacer (gap) management system:
    spacers,
    
    
    
    // react helper hooks:
    useMergeClasses,
    
    
    
    // a semantic management system for react web components:
    SemanticTag,
    SemanticRole,
    useSemantic,
    useTestSemantic,
    
    
    
    // a set of client-side functions:
    isClientSideLink,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    defaultInlineOrientationableOptions,
    usesOrientationable,
    OrientationableProps,
    useOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // gradient variant of UI:
    setGradient,
    
    
    
    // outlined (background-less) variant of UI:
    ifNotOutlined,
    setOutlined,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ifActive,
    
    
    
    // a capability of UI to be focused:
    ifFocus,
    
    
    
    // adds an interactive feel to a UI:
    ifArrive,
    ifLeave,
    
    
    
    // a capability of UI to be clicked:
    ifPress,
    
    
    
    // shows the UI as clicked when activated:
    usesActiveAsClick,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControlProps,
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component



// defaults:
export const defaultOrientationableOptions = defaultInlineOrientationableOptions;

const _defaultSemanticTag      : SemanticTag  = ['button', 'a'   ] // uses <button>        as the default semantic, fallbacks to <a>
const _defaultSemanticRole     : SemanticRole = ['button', 'link'] // uses [role="button"] as the default semantic, fallbacks to [role="link"]

const _defaultLinkSemanticTag  : SemanticTag  = ['a'   , 'button'] // uses <a>             as the default semantic, fallbacks to <button>
const _defaultLinkSemanticRole : SemanticRole = ['link', 'button'] // uses [role="link"]   as the default semantic, fallbacks to [role="button"]

const _defaultButtonStyle      : ButtonStyle  = 'regular'



// configs:
export const [buttons, buttonValues, cssButtonConfig] = cssConfig(() => {
    return {
        // spacings:
        gapInline          : spacers.sm as CssKnownProps['gapInline'],
        gapBlock           : spacers.sm as CssKnownProps['gapBlock' ],
        gapInlineSm        : spacers.xs as CssKnownProps['gapInline'],
        gapBlockSm         : spacers.xs as CssKnownProps['gapBlock' ],
        gapInlineLg        : spacers.md as CssKnownProps['gapInline'],
        gapBlockLg         : spacers.md as CssKnownProps['gapBlock' ],
        
        
        
        // typos:
        whiteSpace         : 'normal'   as CssKnownProps['whiteSpace'],
        
        
        
        // ghost style:
        ghostOpacity       : 0.5        as CssKnownProps['opacity'],
        ghostOpacityArrive : 1          as CssKnownProps['opacity'],
    };
}, { prefix: 'btn' });



// styles:
const usesNoBackground = () => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    return style({
        ...variants([
            ifNotOutlined({
                // borders:
                [borderVars.borderWidth]: '0px', // no_border if not explicitly `.outlined`
            }),
        ]),
        ...states([
            ifActive({
                ...imports([
                    setOutlined(true), // keeps outlined (no background) variant
                ]),
            }),
            ifFocus({
                ...imports([
                    setOutlined(true), // keeps outlined (no background) variant
                ]),
            }),
            ifArrive({
                ...imports([
                    setOutlined(true), // keeps outlined (no background) variant
                ]),
            }),
            ifPress({
                ...imports([
                    setOutlined(true), // keeps outlined (no background) variant
                ]),
            }),
        ]),
        ...variants([
            ifNotOutlined({
                ...imports([
                    setOutlined(true), // keeps outlined (no background) variant
                ]),
            }),
        ], { minSpecificityWeight: 4 }), // force to win with states' specificity weight
    });
};
const usesButtonLinkVariant = () => {
    // dependencies:
    
    // features:
    const {borderVars } = usesBorder();
    const {paddingVars} = usesPadding();
    
    
    
    return style({
        ...style({
            // accessibilities:
            userSelect     : 'contain', // a link should be selectable
            ...fallbacks({
                userSelect : 'text',    // a link should be selectable
            }),
            
            
            
            // borders:
            // small rounded corners on top:
            [borderVars.borderStartStartRadius] : borderRadiuses.sm,
            [borderVars.borderStartEndRadius  ] : borderRadiuses.sm,
            // small rounded corners on bottom:
            [borderVars.borderEndStartRadius  ] : borderRadiuses.sm,
            [borderVars.borderEndEndRadius    ] : borderRadiuses.sm,
            
            
            
            // spacings:
            [paddingVars.paddingInline] : spacers.xs,
            [paddingVars.paddingBlock ] : spacers.xs,
            marginInline : `calc(0px - ${paddingVars.paddingInline})`, // cancels out the padding with negative margin
            marginBlock  : `calc(0px - ${paddingVars.paddingBlock })`, // cancels out the padding with negative margin
            
            
            
            // typos:
            textDecoration : 'underline',
            lineHeight     : 1,
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(buttons, 'link')), // apply config's cssProps starting with link***
        }),
        ...variants([
            ifNotOutlined({ // fully link style without `.outlined`:
                ...imports([
                    // backgrounds:
                    setGradient(false), // gradient is not supported if not `.outlined`
                ]),
            }),
        ]),
    });
};
const usesButtonGhostVariant = () => {
    return style({
        ...style({
            // borders:
            boxShadow : ['none', '!important'], // no shadow & no focus animation
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(buttons, 'ghost')), // apply config's cssProps starting with ghost***
        }),
        ...states([
            ifArrive({
                // appearances:
                opacity: buttons.ghostOpacityArrive, // increase the opacity to increase visibility
            }),
            ifLeave({
                ...imports([
                    // backgrounds:
                    setGradient(false), // hide the gradient to increase invisibility
                ]),
            }),
        ]),
    });
};

export const usesButtonLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    
    
    
    return style({
        ...imports([
            // layouts:
            usesActionControlLayout(),
        ]),
        ...style({
            // layouts:
            display           : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            ...ifOrientationInline({ // inline
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...ifOrientationBlock({  // block
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'center',      // center items (text, icon, etc) horizontally
            alignItems        : 'center',      // center items (text, icon, etc) vertically
            flexWrap          : 'wrap',        // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign     : 'baseline',    // <Button>'s text should be aligned with sibling text, so the <Button> behave like <span> wrapper
            
            
            
            // typos:
            textAlign         : 'center',
            
            
            
            // customize:
            ...usesCssProps(buttons), // apply config's cssProps
        }),
    });
};
export const usesButtonVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(buttons);
    
    
    
    return style({
        ...imports([
            // variants:
            usesActionControlVariants(),
            resizableRule,
        ]),
        ...variants([
            rule(['.link', '.ghost'], usesNoBackground()       ),
            rule( '.link'           , usesButtonLinkVariant()  ),
            rule(          '.ghost' , usesButtonGhostVariant() ),
        ]),
    });
};
export const usesButtonStates = () => {
    // dependencies:
    
    // states:
    const {activeAsClickRule} = usesActiveAsClick();
    
    
    
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
            activeAsClickRule,
        ]),
    });
};

export const useButtonStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesButtonLayout(),
        
        // variants:
        usesButtonVariants(),
        
        // states:
        usesButtonStates(),
    ]),
}), { id: '7rehb2h20q' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export type ButtonStyle = 'regular'|'link'|'ghost' // might be added more styles in the future
export interface ButtonVariant {
    buttonStyle ?: ButtonStyle
}
export const useButtonVariant = ({buttonStyle = _defaultButtonStyle}: ButtonVariant) => {
    return {
        class: (buttonStyle === 'regular') ? null : buttonStyle,
    };
};



// hooks:

export type ButtonType = 'button'|'submit'|'reset'
export interface SemanticButtonProps<TElement extends Element = HTMLButtonElement>
    extends
        // bases:
        ActionControlProps<TElement>,
        
        // button:
        Omit<React.ButtonHTMLAttributes<TElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // accessibilities:
            |'disabled'              // we use [enabled] instead of [disabled]
            
            // formats:
            |'type'                  // we redefined [type] in <Button>
        >,
        
        // link:
        Omit<React.AnchorHTMLAttributes<TElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // formats:
            |'type'                  // we redefined [type] in <Button>
        >
{
    // actions:
    type ?: ButtonType | (string & {})
}
export const useSemanticButton = <TElement extends Element = HTMLButtonElement>(props: SemanticButtonProps<TElement>) => {
    // fn props:
    const isNativeLink  = !!props.href; // assigning [href] will render the <Button> as <a>
    const isClientLink  = !isNativeLink && React.Children.toArray(props.children).some(isClientSideLink);
    
    /*
        if has [href] or <Link> => default to <a>      or <foo role='link'>
        else                    => default to <button> or <foo role='button'>
    */
    const semanticTag   = props.semanticTag  ?? ((isNativeLink || isClientLink) ? _defaultLinkSemanticTag  : _defaultSemanticTag );
    const semanticRole  = props.semanticRole ?? ((isNativeLink || isClientLink) ? _defaultLinkSemanticRole : _defaultSemanticRole);
    
    const {
        tag  : finalTag,
        role : finalRole,
    } = useSemantic({
        tag  : props.tag,
        role : props.role,
        semanticTag,
        semanticRole,
    });
    
    const {
        isDesiredType : isButtonType,
        isSemanticTag : isSemanticButton,
    } = useTestSemantic(
        // test:
        {
            tag  : props.tag,
            role : props.role,
            semanticTag,
            semanticRole,
        },
        
        // expected:
        {
            semanticTag  : 'button',
            semanticRole : 'button',
        }
    );
    const type         = props.type ?? (isSemanticButton ? 'button' : undefined);
    
    
    
    return {
        isNativeLink,
        isClientSideLink: isClientLink,
        
        semanticTag,
        semanticRole,
        
        tag  : finalTag,
        role : finalRole,
        isButtonType,
        isSemanticButton,
        
        type,
    };
};



// react components:
export interface ButtonProps
    extends
        // bases:
        SemanticButtonProps<HTMLButtonElement>,
        
        // variants:
        OrientationableProps,
        ButtonVariant
{
    // accessibilities:
    label    ?: string
    
    
    
    // children:
    children ?: React.ReactNode
}
const Button = (props: ButtonProps): JSX.Element|null => {
    // styles:
    const styleSheet             = useButtonStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const buttonVariant          = useButtonVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        orientation : _orientation, // remove
        buttonStyle : _buttonStyle, // remove
        
        
        
        // accessibilities:
        label,
    ...restActionControlProps} = props;
    
    
    
    // fn props:
    const {
        semanticTag,
        semanticRole,
        
        tag,
        role,
        
        type,
    } = useSemanticButton(props);
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
        buttonVariant.class,
    );
    
    
    
    // jsx:
    return (
        <ActionControl<HTMLButtonElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            aria-label      ={props['aria-label'] ?? label}
            
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // Button props:
            {...{
                // actions:
                type,
            }}
        />
    );
};
export {
    Button,
    Button as default,
}



export interface ButtonComponentProps
{
    // refs:
    buttonRef         ?: React.Ref<HTMLButtonElement> // setter ref
    
    
    
    // variants:
    buttonOrientation ?: ButtonProps['orientation']
    buttonStyle       ?: ButtonProps['buttonStyle']
    
    
    
    // components:
    buttonComponent   ?: React.ReactComponentElement<any, ButtonProps>
    buttonChildren    ?: ButtonProps['children']
}
