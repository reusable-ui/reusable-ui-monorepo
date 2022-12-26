// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    states,
    keyframes,
    style,
    imports,
    
    
    
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
    // react helper hooks:
    useMergeEvents,
    useMergeClasses,
    
    
    
    // an accessibility management system:
    usePropAccessibility,
    AccessibilityProps,
    AccessibilityProvider,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to be disabled:
    usesDisableable,
    DisableableProps,
    useDisableable,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ifActive,
    usesActivatable,
    markActive,
    ActivatableProps,
    useActivatable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component



// configs:
export const [indicators, indicatorValues, cssIndicatorConfig] = cssConfig(() => {
    // dependencies:
    
    const {animationRegistry : {filters}              } = usesAnimation();
    const {disableableVars   : {filter: filterDisable}} = usesDisableable();
    const {activatableVars   : {filter: filterActive }} = usesActivatable();
    
    
    
    //#region keyframes
    const frameEnabled  = style({
        filter : [[
            ...filters.filter((f) => (f !== filterDisable)), // the rest filter(s)
        ]],
    });
    const frameDisabled = style({
        filter : [[
            ...filters.filter((f) => (f !== filterDisable)), // the rest filter(s)
            filterDisable, // the interpolating filter
        ]],
    });
    const [keyframesDisableRule, keyframesDisable] = keyframes({
        from : frameEnabled,
        to   : frameDisabled,
    });
    keyframesDisable.value = 'disable'; // the @keyframes name should contain 'disable' in order to be recognized by `useDisableable`
    const [keyframesEnableRule , keyframesEnable ] = keyframes({
        from : frameDisabled,
        to   : frameEnabled,
    });
    keyframesEnable.value  = 'enable';  // the @keyframes name should contain 'enable'  in order to be recognized by `useDisableable`
    
    
    
    const framePassivated = style({
        filter : [[
            ...filters.filter((f) => (f !== filterActive)), // the rest filter(s)
        ]],
    });
    const frameActivated  = style({
        filter : [[
            ...filters.filter((f) => (f !== filterActive)), // the rest filter(s)
            filterActive, // the interpolating filter
        ]],
    });
    const [keyframesActiveRule , keyframesActive ] = keyframes({
        from : framePassivated,
        to   : frameActivated,
    });
    keyframesActive.value  = 'active';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivatable`
    const [keyframesPassiveRule, keyframesPassive] = keyframes({
        from : frameActivated,
        to   : framePassivated,
    });
    keyframesPassive.value = 'passive'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivatable`
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



// styles:
let indicatorLayoutCache : WeakRef<CssRule>|undefined = undefined;
export const usesIndicatorLayout = () => {
    const cached = indicatorLayoutCache?.deref();
    if (cached) return cached;
    
    
    
    const result = style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(indicators), // apply config's cssProps
        }),
    });
    indicatorLayoutCache = new WeakRef<CssRule>(result);
    return result;
};

let indicatorVariantsCache : WeakRef<CssRule>|undefined = undefined;
export const usesIndicatorVariants = () => {
    const cached = indicatorVariantsCache?.deref();
    if (cached) return cached;
    
    
    
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(indicators);
    
    
    
    const result = style({
        ...imports([
            // variants:
            usesBasicVariants(),
            resizableRule,
        ]),
    });
    indicatorVariantsCache = new WeakRef<CssRule>(result);
    return result;
};

let indicatorStatesCache : WeakRef<CssRule>|undefined = undefined;
export const usesIndicatorStates = () => {
    const cached = indicatorStatesCache?.deref();
    if (cached) return cached;
    
    
    
    // dependencies:
    
    // states:
    const {disableableRule} = usesDisableable(indicators);
    const {activatableRule} = usesActivatable(indicators);
    
    
    
    const result = style({
        ...imports([
            // states:
            disableableRule,
            activatableRule,
        ]),
        ...states([
            ifActive(markActive()),
        ]),
    });
    indicatorStatesCache = new WeakRef<CssRule>(result);
    return result;
};

cssIndicatorConfig.onChange.subscribe(() => {
    // clear caches:
    indicatorLayoutCache   = undefined;
    indicatorVariantsCache = undefined;
    indicatorStatesCache   = undefined;
});

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
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        disableableState.handleAnimationStart,
        activatableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
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
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
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
