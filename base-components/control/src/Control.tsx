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
    // removes browser's default stylesheet:
    stripoutControl,
    
    
    
    // react helper hooks:
    useMergeEvents,
    useMergeClasses,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to be disabled:
    ifDisable,
    
    
    
    // a capability of UI to be focused:
    ifBlurring,
    ifFocus,
    usesFocusable,
    FocusableProps,
    useFocusable,
    
    
    
    // adds an interactive feel to a UI:
    usesInteractable,
    InteractableProps,
    useInteractable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component



// styles:
export const usesControlLayout = () => {
    return style({
        ...imports([
            // resets:
            stripoutControl(), // clear browser's default styles
            
            // layouts:
            usesIndicatorLayout(),
        ]),
        ...style({
            // positions:
            position: 'relative', // supports for boxShadowFocus, prevents boxShadowFocus from clipping
            
            
            
            // customize:
            ...usesCssProps(controls), // apply config's cssProps
        }),
    });
};
export const usesControlVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(controls);
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            resizableRule,
        ]),
    });
};
export const usesControlStates = () => {
    // dependencies:
    
    // states:
    const {focusableRule   } = usesFocusable(controls);
    const {interactableRule} = usesInteractable(controls);
    
    
    
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
            focusableRule,
            interactableRule,
        ]),
        ...states([
            ifDisable({
                // accessibilities:
                cursor : controls.cursorDisable,
            }),
            
            ifFocus({
                // positions:
                zIndex: 2, // prevents boxShadowFocus from clipping
            }),
            ifBlurring({
                // positions:
                zIndex: 1, // prevents boxShadowFocus from clipping but below the active one
            }),
        ]),
    });
};

export const useControlStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesControlLayout(),
        
        // variants:
        usesControlVariants(),
        
        // states:
        usesControlStates(),
    ]),
}), { id: 'k8egfpu96l' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [controls, controlValues, cssControlConfig] = cssConfig(() => {
    // dependencies:
    
    const {animationRegistry : {boxShadows, filters       }} = usesAnimation();
    const {focusableVars     : {boxShadow : boxShadowFocus}} = usesFocusable();
    const {interactableVars  : {filter    : filterArrive  }} = usesInteractable();
    
    
    
    //#region keyframes
    const frameBlurred  = style({
        boxShadow : [
            ...boxShadows.filter((b) => (b !== boxShadowFocus)), // the rest boxShadow(s)
        ],
    });
    const frameFocused = style({
        boxShadow : [
            ...boxShadows.filter((b) => (b !== boxShadowFocus)), // the rest boxShadow(s)
            boxShadowFocus, // the interpolating boxShadow
        ],
    });
    const [keyframesFocusRule, keyframesFocus] = keyframes({
        from : frameBlurred,
        to   : frameFocused,
    });
    keyframesFocus.value = 'focus'; // the @keyframes name should contain 'focus' in order to be recognized by `useFocusable`
    const [keyframesBlurRule , keyframesBlur ] = keyframes({
        from : frameFocused,
        to   : frameBlurred,
    });
    keyframesBlur.value  = 'blur';  // the @keyframes name should contain 'blur'  in order to be recognized by `useFocusable`
    
    
    
    const frameLeft = style({
        filter : [[
            ...filters.filter((f) => (f !== filterArrive)), // the rest filter(s)
        ]],
    });
    const frameArrived  = style({
        filter : [[
            ...filters.filter((f) => (f !== filterArrive)), // the rest filter(s)
            filterArrive, // the interpolating filter
        ]],
    });
    const [keyframesArriveRule, keyframesArrive] = keyframes({
        from : frameLeft,
        to   : frameArrived,
    });
    keyframesArrive.value = 'arrive'; // the @keyframes name should contain 'arrive' in order to be recognized by `useInteractable`
    const [keyframesLeaveRule , keyframesLeave ] = keyframes({
        from : frameArrived,
        to   : frameLeft,
    });
    keyframesLeave.value  = 'leave';  // the @keyframes name should contain 'leave'  in order to be recognized by `useInteractable`
    //#endregion keyframes
    
    
    
    return {
        // accessibilities:
        cursorDisable  : 'not-allowed'  as CssKnownProps['cursor'],
        
        
        
        // animations:
        boxShadowFocus : [
            [0, 0, 0, '0.25rem'],
        ]                               as CssKnownProps['boxShadow'],
        filterArrive   : [[
            'brightness(85%)',
            'drop-shadow(0 0 0.01px rgba(0,0,0,0.4))',
        ]]                              as CssKnownProps['filter'],
        
        ...keyframesFocusRule,
        ...keyframesBlurRule,
        ...keyframesArriveRule,
        ...keyframesLeaveRule,
        animFocus      : [
            ['150ms', 'ease-out', 'both', keyframesFocus ],
        ]                               as CssKnownProps['animation'],
        animBlur       : [
            ['300ms', 'ease-out', 'both', keyframesBlur  ],
        ]                               as CssKnownProps['animation'],
        animArrive     : [
            ['150ms', 'ease-out', 'both', keyframesArrive],
        ]                               as CssKnownProps['animation'],
        animLeave      : [
            ['300ms', 'ease-out', 'both', keyframesLeave ],
        ]                               as CssKnownProps['animation'],
    };
}, { prefix: 'ctrl' });



// react components:
export interface ControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        IndicatorProps<TElement>,
        
        // states:
        FocusableProps,
        InteractableProps
{
}
const Control = <TElement extends Element = HTMLElement>(props: ControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useControlStyleSheet();
    
    
    
    // states:
    const focusableState    = useFocusable<TElement>(props);
    const interactableState = useInteractable<TElement>(props, focusableState);
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        tabIndex = (propEnabled ? 0 : -1), // makes any element type focusable
        
        
        
        // states:
        focused  : _focused,  // remove
        arrived  : _arrived,  // remove
    ...restIndicatorProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        focusableState.class,
        interactableState.class,
    );
    
    
    
    // handlers:
    const handleFocus        = useMergeEvents(
        // preserves the original `onFocus`:
        props.onFocus,
        
        
        
        // states:
        focusableState.handleFocus,
    );
    const handleBlur         = useMergeEvents(
        // preserves the original `onBlur`:
        props.onBlur,
        
        
        
        // states:
        focusableState.handleBlur,
    );
    const handleMouseEnter   = useMergeEvents(
        // preserves the original `onMouseEnter`:
        props.onMouseEnter,
        
        
        
        // states:
        interactableState.handleMouseEnter,
    );
    const handleMouseLeave   = useMergeEvents(
        // preserves the original `onMouseLeave`:
        props.onMouseLeave,
        
        
        
        // states:
        interactableState.handleMouseLeave,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        focusableState.handleAnimationEnd,
        interactableState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // Control props:
            {...{
                // accessibilities:
                tabIndex,
            }}
            
            
            
            // handlers:
            onFocus        = {handleFocus       }
            onBlur         = {handleBlur        }
            onMouseEnter   = {handleMouseEnter  }
            onMouseLeave   = {handleMouseLeave  }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
};
export {
    Control,
    Control as default,
}



export interface ControlComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    controlComponent ?: React.ReactComponentElement<any, ControlProps<TElement>>
}
