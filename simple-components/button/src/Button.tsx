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
    // rules:
    rule,
    variants,
    states,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropActive,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // types:
    SemanticTag,
    SemanticRole,
    
    
    
    // hooks:
    useTestSemantic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationRuleOptions,
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    gradientOf,
    ifNotOutlined,
    outlinedOf,
    usesBorder,
    usesPadding,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // hooks:
    usesThemeActive,
    ifFocus,
    ifArrive,
    ifLeave,
}                           from '@reusable-ui/control'         // a base component
import {
    // hooks:
    ifPress,
    isClientSideLink,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControlProps,
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component



// defaults:
const _defaultSemanticTag  : SemanticTag  = ['button', 'a'   ] // uses <button>        as the default semantic, fallbacks to <a>
const _defaultSemanticRole : SemanticRole = ['button', 'link'] // uses [role="button"] as the default semantic, fallbacks to [role="link"]
const _defaultOutlined     : boolean      = false
const _defaultMild         : boolean      = false



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;
//#endregion orientation


// appearances:

//#region button style
export type ButtonStyle = 'link'|'ghost' // might be added more styles in the future
export interface ButtonVariant {
    buttonStyle ?: ButtonStyle
}
export const useButtonVariant = (props: ButtonVariant) => {
    return {
        class: props.buttonStyle ?? null,
    };
};
//#endregion button style



// styles:
export const noBackground = () => {
    // dependencies:
    
    // borders:
    const [, borders] = usesBorder();
    
    
    
    return style({
        ...variants([
            ifNotOutlined({
                // borders:
                [borders.borderWidth]: '0px', // no_border if not explicitly `.outlined`
            }),
        ]),
        ...states([
            ifActive({
                ...imports([
                    outlinedOf(true), // keeps outlined (no background) variant
                ]),
            }),
            ifFocus({
                ...imports([
                    outlinedOf(true), // keeps outlined (no background) variant
                ]),
            }),
            ifArrive({
                ...imports([
                    outlinedOf(true), // keeps outlined (no background) variant
                ]),
            }),
            ifPress({
                ...imports([
                    outlinedOf(true), // keeps outlined (no background) variant
                ]),
            }),
        ]),
        ...variants([
            ifNotOutlined({
                ...imports([
                    outlinedOf(true), // keeps outlined (no background) variant
                ]),
            }),
        ], { minSpecificityWeight: 4 }), // force to win with states' specificity weight
    });
};

export const usesButtonLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(options);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesActionControlLayout(),
        ]),
        ...style({
            // layouts:
            display           : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            ...rule(orientationInlineSelector, { // inline
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...rule(orientationBlockSelector , { // block
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'center',      // center items (text, icon, etc) horizontally
            alignItems        : 'center',      // center items (text, icon, etc) vertically
            flexWrap          : 'wrap',        // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign     : 'baseline',    // button's text should be aligned with sibling text, so the button behave like <span> wrapper
            
            
            
            // typos:
            textAlign         : 'center',
            
            
            
            // customize:
            ...usesCssProps(buttons), // apply config's cssProps
        }),
    });
};
export const usesButtonLinkVariant = () => {
    // dependencies:
    
    // borders:
    const [, borders ] = usesBorder();
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        ...imports([
            // colors:
            usesThemeActive(), // set the active theme as the default theme
            
            // backgrounds:
            noBackground(),
        ]),
        ...style({
            // borders:
            // small rounded corners on top:
            [borders.borderStartStartRadius] : borderRadiuses.sm,
            [borders.borderStartEndRadius  ] : borderRadiuses.sm,
            // small rounded corners on bottom:
            [borders.borderEndStartRadius  ] : borderRadiuses.sm,
            [borders.borderEndEndRadius    ] : borderRadiuses.sm,
            
            
            
            // spacings:
            [paddings.paddingInline] : spacers.xs,
            [paddings.paddingBlock ] : spacers.xs,
            
            
            
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
                    gradientOf(false), // gradient is not supported if not `.outlined`
                ]),
            }),
        ]),
    });
};
export const usesButtonVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(buttons);
    
    
    
    return style({
        ...imports([
            // variants:
            usesActionControlVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
        ...variants([
            rule(['.link', '.ghost'], {
                ...imports([
                    noBackground(),
                ]),
            }),
            rule('.link', {
                ...imports([
                    usesButtonLinkVariant(),
                ]),
            }),
            rule('.ghost', {
                ...style({
                    // borders:
                    boxShadow : ['none', '!important'], // no focus animation
                    
                    
                    
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
                            gradientOf(false), // hides the gradient to increase invisibility
                        ]),
                    }),
                ]),
            }),
        ]),
    });
};
export const usesButtonStates = () => {
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
        ]),
    });
};

export const useButtonStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesButtonLayout(),
        
        // variants:
        usesButtonVariants(),
        
        // states:
        usesButtonStates(),
    ]),
}), { id: '7rehb2h20q' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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



// hooks:

export type ButtonType = 'button'|'submit'|'reset'
export interface SemanticButtonProps<TElement extends Element = HTMLButtonElement>
    extends
        // bases:
        ActionControlProps<TElement>,
        
        // button:
        Omit<React.ButtonHTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
            
            // formats:
            |'type' // we redefined [type] in <Button>
        >,
        
        // link:
        Omit<React.AnchorHTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
            
            // formats:
            |'type' // we redefined [type] in <Button>
        >
{
    // actions:
    type ?: ButtonType | (string & {})
}
export const useSemanticButton = <TElement extends Element = HTMLButtonElement>(props: SemanticButtonProps<TElement>) => {
    // fn props:
    const isNativeLink  = !!props.href; // assigning [href] will render the <Button> as <a>
    const isClientLink  = !isNativeLink && React.Children.toArray(props.children).some(isClientSideLink);
    
    const semanticTag   = props.semanticTag  ?? (isNativeLink ? 'a'    : _defaultSemanticTag );
    const semanticRole  = props.semanticRole ?? (isNativeLink ? 'link' : _defaultSemanticRole);
    const {
        tag,
        role,
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
        
        tag,
        role,
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
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        ButtonVariant
{
    // accessibilities:
    label    ?: string
    
    
    
    // children:
    children ?: React.ReactNode
}
const Button = (props: ButtonProps): JSX.Element|null => {
    // styles:
    const styleSheet         = useButtonStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const buttonVariant      = useButtonVariant(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
        // appearances:
        buttonStyle : _buttonStyle,
        
        
        
        // variants:
        outlined = _defaultOutlined,
        mild     = _defaultMild,
        
        
        
        // accessibilities:
        label,
        pressed,
    ...restActionControlProps} = props;
    
    
    
    // fn props:
    const propActive = usePropActive(props);
    const pressedFn  = pressed ?? ((propActive && !outlined && !mild) || undefined); // if (active (as pressed) === false) => uncontrolled pressed
    
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
        orientationVariant.class,
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
            aria-label   = {props['aria-label'] ?? label}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)} // aliasing [disabled] => ![enabled]
            pressed={pressedFn}
            
            
            
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

export type { OrientationName, OrientationVariant }
