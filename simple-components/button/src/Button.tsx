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
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
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
    defaultInlineOrientationRuleOptions,
    ifNotOutlined,
    ifOutlined,
    outlinedOf,
    usesBorder,
    usesAnim,
    fallbackNoneFilter,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // hooks:
    ifFocus,
    ifArrive,
    
    
    
    // styles:
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
    
    
    
    // react components:
    ControlProps,
    Control,
}                           from '@reusable-ui/control'         // a base component
import {
    // hooks:
    ifPress,
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

export const usesButtonLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesControlLayout(),
        ]),
        ...style({
            // accessibilities:
            userSelect : 'none', // disable selecting text (double clicking not causing selecting text)
            
            
            
            // customize:
            ...usesCssProps(buttons), // apply config's cssProps
        }),
    });
};
export const usesButtonVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(buttons);
    
    
    
    return style({
        ...imports([
            // variants:
            usesControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesButtonStates = () => {
    // dependencies:
    
    // states:
    const [pressReleaseRule] = usesPressReleaseState();
    
    
    
    return style({
        ...imports([
            // states:
            usesControlStates(),
            pressReleaseRule,
        ]),
        ...states([
            ifPress({
                ...imports([
                    markActive(),
                ]),
            }),
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
    // dependencies:
    
    const [, , animRegistry] = usesAnim();
    const filters = animRegistry.filters;
    
    const [, {filter: filterPressRelease}] = usesPressReleaseState();
    
    
    
    //#region keyframes
    const frameReleased = style({
        filter: [[
            ...filters.filter((f) => (f !== filterPressRelease)),
            
         // filterPressRelease, // missing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const framePressed  = style({
        filter: [[
            ...filters.filter((f) => (f !== filterPressRelease)),
            
            filterPressRelease, // existing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const [keyframesPressRule  , keyframesPress  ] = keyframes({
        from : frameReleased,
        to   : framePressed,
    });
    keyframesPress.value   = 'press';   // the @keyframes name should contain 'press'   in order to be recognized by `useEnableDisableState`
    const [keyframesReleaseRule, keyframesRelease] = keyframes({
        from : framePressed,
        to   : frameReleased,
    });
    keyframesRelease.value = 'release'; // the @keyframes name should contain 'release' in order to be recognized by `useEnableDisableState`
    //#endregion keyframes
    
    
    
    return {
        // accessibilities:
        cursor      : 'pointer' as CssKnownProps['cursor'],
        
        
        
        // animations:
        filterPress : [[
            'brightness(65%)',
            'contrast(150%)',
        ]]                      as CssKnownProps['filter'],
        
        ...keyframesPressRule,
        ...keyframesReleaseRule,
        animPress   : [
            ['150ms', 'ease-out', 'both', keyframesPress ],
        ]                       as CssKnownProps['anim'],
        animRelease : [
            ['300ms', 'ease-out', 'both', keyframesRelease],
        ]                       as CssKnownProps['anim'],
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
