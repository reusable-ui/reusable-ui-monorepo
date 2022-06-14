// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useEffect,
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
    // rules:
    rule,
    variants,
    states,
    keyframes,
    
    
    
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
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
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
    useEvent,
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // types:
    DefaultTag,
    DefaultRole,
    
    
    
    // hooks:
    SemanticProps,
    useTestSemantic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    OrientationRuleOptions,
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    gradientOf,
    ifNotOutlined,
    ifOutlined,
    outlinedOf,
    usesBorder,
    extendsBorder,
    usesPadding,
    extendsPadding,
    usesAnim,
    fallbackNoneFilter,
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
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControlProps,
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component

// other libs:
import type {
    // types:
    To,
}                           from 'history'                      // a helper lib



// defaults:
const defaultTag  : DefaultTag  = ['button', 'a'   ] // uses <button>        as the default semantic, fallbacks to <a>
const defaultRole : DefaultRole = ['button', 'link'] // uses [role="button"] as the default semantic, fallbacks to [role="link"]



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;
//#endregion orientation


// appearances:

//#region button style
export type ButtonStyle = 'link'|'icon'|'ghost' // might be added more styles in the future
export interface ButtonVariant {
    btnStyle ?: ButtonStyle
}
export const useButtonVariant = (props: ButtonVariant) => {
    return {
        class: props.btnStyle ?? null,
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
            ...rule(orientationBlockSelector,  { // block
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
    const [sizesRule] = usesSizeVariant(buttons);
    
    // colors:
    // const [, outlineds] = usesOutlinedVariant();
    // const [, milds    ] = usesMildVariant();
    // const [, foregs   ] = usesForeg();
    
    
    
    return style({
        ...imports([
            // variants:
            usesActionControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
        ...variants([
            rule(['.link', '.icon', '.ghost'], {
                ...imports([
                    noBackground(),
                ]),
            }),
            rule(['.link', '.icon'], {
                ...imports([
                    usesButtonLinkVariant(),
                ]),
            }),
            // rule('.icon', {
            //     ...variants([
            //         ifNotOutlined({
            //             ...vars({
            //                 /*
            //                     `noBackground()` is causing `.outlined` actived
            //                     => currentColor = theme color
            //                     so we fix it:
            //                     => currentColor = foreg color at `.mild` variant
            //                 */
            //                 [foregs.foreg] : milds.foregFn,
            //             }),
            //         }),
            //         ifOutlined({
            //             ...vars({
            //                 [foregs.foreg] : outlineds.foregFn,
            //             }),
            //         }),
            //     ]),
            // }),
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
export const [buttons, cssButtonConfig] = cssConfig(() => {
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



// react components:
export interface ButtonProps<TElement extends Element = Element>
    extends
        // bases:
        ControlProps<TElement>
{
    // accessibilities:
    pressed      ?: boolean
}
const Button = <TElement extends Element = Element>(props: ButtonProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useButtonStyleSheet();
    
    
    
    // states:
    const pressReleaseState = usePressReleaseState(props);
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        pressed : _pressed,
    ...restControlProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // accessibilities:
        pressReleaseState.class,
    );
    
    
    
    // handlers:
    const handleMouseDown    = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleMouseDown,
    );
    const handleKeyDown      = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleKeyDown,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...restControlProps}
            
            
            
            // semantics:
            defaultTag  = {props.defaultTag  ?? defaultTag }
            defaultRole = {props.defaultRole ?? defaultRole}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // handlers:
            onClick        = {propEnabled ? props.onClick : handleClickDisabled}
            onMouseDown    = {handleMouseDown   }
            onKeyDown      = {handleKeyDown     }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
};
export {
    Button,
    Button as default,
}
