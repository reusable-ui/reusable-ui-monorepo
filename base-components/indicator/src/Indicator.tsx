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
    states,
    keyframes,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropAccessibility,
    
    
    
    // react components:
    AccessibilityProps,
    AccessibilityProvider,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui states:
import {
    // hooks:
    usesDisableable,
    DisableableProps,
    useDisableable,
}                           from '@reusable-ui/disableable'     // a capability of UI to be disabled
import {
    // hooks:
    ifActive,
    usesActivatable,
    markActive,
    ActivatableProps,
    useActivatable,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component



// styles:
export const usesIndicatorLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(indicators), // apply config's cssProps
        }),
    });
};
export const usesIndicatorVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(indicators);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            resizableRule,
        ]),
    });
};
export const usesIndicatorStates = () => {
    // dependencies:
    
    // states:
    const {disableableRule} = usesDisableable(indicators);
    const {activatableRule} = usesActivatable(indicators);
    
    
    
    return style({
        ...imports([
            // states:
            disableableRule,
            activatableRule,
        ]),
        ...states([
            ifActive({
                ...imports([
                    markActive(),
                ]),
            }),
        ]),
    });
};

export const useIndicatorStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesIndicatorLayout(),
        
        // variants:
        usesIndicatorVariants(),
        
        // states:
        usesIndicatorStates(),
    ]),
}), { id: '9i8stbnt0e' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [indicators, indicatorValues, cssIndicatorConfig] = cssConfig(() => {
    // dependencies:
    
    const {animationRegistry : {filters}              } = usesAnimation();
    const {disableableVars   : {filter: filterDisable}} = usesDisableable();
    const {activatableVars   : {filter: filterActive }} = usesActivatable();
    
    
    
    //#region keyframes
    const frameEnabled  = style({
        filter : [[...filters.filter((f) => (f !== filterDisable))]],
    });
    const frameDisabled = style({
        filter : [[...filters.filter((f) => (f !== filterDisable)), filterDisable]],
    });
    const [keyframesDisableRule, keyframesDisable] = keyframes({
        from : frameEnabled,
        to   : frameDisabled,
    });
    keyframesDisable.value = 'disable'; // the @keyframes name should contain 'disable' in order to be recognized by `useEnableDisableState`
    const [keyframesEnableRule , keyframesEnable ] = keyframes({
        from : frameDisabled,
        to   : frameEnabled,
    });
    keyframesEnable.value  = 'enable';  // the @keyframes name should contain 'enable'  in order to be recognized by `useEnableDisableState`
    
    
    
    const framePassived = style({
        filter : [[...filters.filter((f) => (f !== filterActive))]],
    });
    const frameActived  = style({
        filter : [[...filters.filter((f) => (f !== filterActive)), filterActive]],
    });
    const [keyframesActiveRule , keyframesActive ] = keyframes({
        from : framePassived,
        to   : frameActived,
    });
    keyframesActive.value  = 'active';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivePassiveState`
    const [keyframesPassiveRule, keyframesPassive] = keyframes({
        from : frameActived,
        to   : framePassived,
    });
    keyframesPassive.value = 'passive'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivePassiveState`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        filterDisable : [[
            'grayscale(50%)',
            'contrast(50%)',
        ]]                          as CssKnownProps['filter'],
        filterActive  : [[
            'brightness(100%)',
        ]]                          as CssKnownProps['filter'],
        
        ...keyframesDisableRule,
        ...keyframesEnableRule,
        ...keyframesActiveRule,
        ...keyframesPassiveRule,
        animEnable    : [
            ['300ms', 'ease-out', 'both', keyframesEnable ],
        ]                           as CssKnownProps['animation'],
        animDisable   : [
            ['300ms', 'ease-out', 'both', keyframesDisable],
        ]                           as CssKnownProps['animation'],
        animActive    : [
            ['150ms', 'ease-out', 'both', keyframesActive ],
        ]                           as CssKnownProps['animation'],
        animPassive   : [
            ['300ms', 'ease-out', 'both', keyframesPassive],
        ]                           as CssKnownProps['animation'],
    };
}, { prefix: 'indi' });



// react components:
export interface IndicatorProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // states:
        DisableableProps,
        ActivatableProps,
        
        // accessibilities:
        AccessibilityProps
{
}
const Indicator = <TElement extends Element = HTMLElement>(props: IndicatorProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = useIndicatorStyleSheet();
    
    
    
    // states:
    const disableableState = useDisableable<TElement>(props);
    const activatableState = useActivatable<TElement>(props);
    
    
    
    // fn props:
    const propAccess       = usePropAccessibility(props);
    
    
    
    // rest props:
    const {
        // states:
        enabled         : _enabled,         // remove
        inheritEnabled  : _inheritEnabled,  // remove
        
        active          : _active,          // remove
        inheritActive   : _inheritActive,   // remove
        
        readOnly        : _readOnly,        // remove
        inheritReadOnly : _inheritReadOnly, // remove
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        disableableState.class,
        activatableState.class,
    );
    
    
    
    // handlers:
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        disableableState.handleAnimationEnd,
        activatableState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // :disabled | [aria-disabled]
            {...disableableState.props}
            
            // :checked | [aria-checked] | [aria-pressed] | [aria-selected]
            {...activatableState.props}
            
            
            
            // handlers:
            onAnimationEnd={handleAnimationEnd}
        >
            { children && <AccessibilityProvider {...propAccess}>
                { children }
            </AccessibilityProvider> }
        </Basic>
    );
};
export {
    Indicator,
    Indicator as default,
}
