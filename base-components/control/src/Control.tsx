// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
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
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // styles:
    stripoutControl,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// reusable-ui features:
import {
    // hooks:
    usesRing,
}                           from '@reusable-ui/ring'            // ring (focus indicator) color of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    ThemeName,
    usesThemeDefault as baseUsesThemeDefault,
}                           from '@reusable-ui/themable'        // color options of UI

// reusable-ui components:
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesAnim,
    fallbackNoneBoxShadow,
    fallbackNoneFilter,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifDisable,
    ifActive,
    markActive      as indicatorMarkActive,
    usesThemeActive as indicatorUsesThemeActive,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component



// hooks:

// accessibilities:

//#region activePassive
export const markActive = (): CssRule => style({
    ...imports([
        indicatorMarkActive(),
        
        usesThemeActive(), // switch to active theme
    ]),
});

/**
 * Creates a default theme color rules.
 * @param themeName The theme name as the default theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a default theme color rules.
 */
// change default parameter from `null` to 'secondary':
export const usesThemeDefault = (themeName: ThemeName|null = 'secondary'): CssRule => baseUsesThemeDefault(themeName);

/**
 * Creates a conditional theme color rules at active state.
 * @param themeName The theme name as the active theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a conditional theme color rules at active state.
 */
// change default parameter from 'secondary' to 'primary':
export const usesThemeActive  = (themeName: ThemeName|null = 'primary'): CssRule => indicatorUsesThemeActive(themeName);
//#endregion activePassive

//#region focusBlur
export interface FocusBlurVars {
    boxShadow   : any
    anim        : any
    
    
    
    /**
     * final boxShadow single layer - at focused state.
     */
    boxShadowLy : any
}
const [focuses] = cssVars<FocusBlurVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerBoxShadow(focuses.boxShadow);
    animRegistry.registerAnim(focuses.anim);
}



// .focused will be added after focusing-animation done:
const selectorIfFocused  = '.focused'
// .focusing = styled focus, :focus-within = native focus:
// the .disabled, .disable are used to kill native :focus-within
// the .focused, .blurring, .blurred are used to overwrite native :focus-within
const selectorIfFocusing = ':is(.focusing, :focus-within:not(:is(.disabled, .disable, .focused, .blurring, .blurred)))'
// .blurring will be added after loosing focus and will be removed after blurring-animation done:
const selectorIfBlurring = '.blurring'
// if all above are not set => blurred:
// optionally use .blurred to overwrite native :focus-within
const selectorIfBlurred  = ':is(:not(:is(.focused, .focusing, :focus-within:not(:is(.disabled, .disable)), .blurring)), .blurred)'

export const ifFocused       = (styles: CssStyleCollection): CssRule => rule(selectorIfFocused , styles);
export const ifFocusing      = (styles: CssStyleCollection): CssRule => rule(selectorIfFocusing, styles);
export const ifBlurring      = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurring, styles);
export const ifBlurred       = (styles: CssStyleCollection): CssRule => rule(selectorIfBlurred , styles);

export const ifFocus         = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfFocused                                       ], styles);
export const ifBlur          = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfBlurring, selectorIfBlurred], styles);
export const ifFocusBlurring = (styles: CssStyleCollection): CssRule => rule([selectorIfFocusing, selectorIfFocused, selectorIfBlurring                   ], styles);



/**
 * Uses focus & blur states.
 * @returns A `StateMixin<FocusBlurVars>` represents focus & blur state definitions.
 */
export const usesFocusBlurState = (): StateMixin<FocusBlurVars> => {
    // dependencies:
    
    // features:
    const {ringVars} = usesRing();
    
    
    
    return [
        () => style({
            ...vars({
                [focuses.boxShadowLy     ] : [[
                    // combining: pos width spread color ...
                    
                    // boxShadowFocus pos, width, spread, etc:
                    controls.boxShadowFocus,
                    
                    // ring color:
                    ringVars.ring,
                ]],
            }),
            ...states([
                ifFocused({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                    }),
                }),
                ifFocusing({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                        [focuses.anim     ] : controls.animFocus,
                    }),
                }),
                ifBlurring({
                    ...vars({
                        [focuses.boxShadow] : focuses.boxShadowLy,
                        [focuses.anim     ] : controls.animBlur,
                    }),
                }),
            ]),
        }),
        focuses,
    ];
};



export const useFocusBlurState  = <TElement extends Element = HTMLElement>(props: ControlProps<TElement>) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const isControllableFocused = (props.focused !== undefined);
    
    
    
    // states:
    const [focused,   setFocused  ] = useState<boolean>(props.focused ?? false); // true => focused, false => blurred
    const [animating, setAnimating] = useState<boolean|null>(null);              // null => no-animation, true => focusing-animation, false => blurring-animation
    
    const [focusDn,   setFocusDn  ] = useState<boolean>(false);                  // uncontrollable (dynamic) state: true => user focused, false => user blurred
    
    
    
    // resets:
    if (focusDn && (!propEnabled || isControllableFocused)) {
        setFocusDn(false); // lost focus because the control is disabled or controllable [focused] is set, when the control is re-enabled => still lost focus
    } // if
    
    
    
    /*
     * state is always blur if disabled
     * state is focused/blurred based on [controllable focused] (if set) and fallback to [uncontrollable focused]
     */
    const focusedFn : boolean = propEnabled && (props.focused /*controllable*/ ?? focusDn /*uncontrollable*/);
    
    if (focused !== focusedFn) { // change detected => apply the change & start animating
        setFocused(focusedFn);   // remember the last change
        setAnimating(focusedFn); // start focusing-animation/blurring-animation
    } // if
    
    
    
    // handlers:
    const handleFocus = useEvent<React.FocusEventHandler<TElement>>(() => {
        // conditions:
        if (!propEnabled)          return; // control is disabled => no response required
        if (isControllableFocused) return; // controllable [focused] is set => no uncontrollable required
        
        
        
        setFocusDn(true);
    }, [propEnabled, isControllableFocused]);
    
    const handleBlur  = useEvent<React.FocusEventHandler<TElement>>(() => {
        // conditions:
        if (!propEnabled)          return; // control is disabled => no response required
        if (isControllableFocused) return; // controllable [focused] is set => no uncontrollable required
        
        
        
        setFocusDn(false);
    }, [propEnabled, isControllableFocused]);
    
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(focus|blur)|(?<=[a-z])(Focus|Blur))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (focus|blur)[Foo] or boo(Focus|Blur)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop focusing-animation/blurring-animation
    }, []);
    
    
    
    return {
        focused,
        
        class : ((): string|null => {
            // focusing:
            if (animating === true) {
                // focusing by controllable prop => use class .focusing
                if (isControllableFocused) return 'focusing';
                
                // negative [tabIndex] => can't be focused by user input => treats <Control> as *wrapper* element => use class .focusing
                if ((props.tabIndex ?? 0) < 0) return 'focusing';
                
                // otherwise use pseudo :focus-within
                return null;
            } // if
            
            // blurring:
            if (animating === false) return 'blurring';
            
            // fully focused:
            if (focused) return 'focused';
            
            // fully blurred:
            if (isControllableFocused) {
                return 'blurred'; // blurring by controllable prop => use class .blurred to kill pseudo :focus-within
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handleFocus,
        handleBlur,
        handleAnimationEnd,
    };
};
//#endregion focusBlur

//#region arriveLeave
export interface ArriveLeaveVars {
    filter : any
    anim   : any
}
const [arrives] = cssVars<ArriveLeaveVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(arrives.filter);
    animRegistry.registerAnim(arrives.anim);
}



/***  arriving = hover(ing) + focus(ing|ed)  ***/

// .arrived will be added after arriving-animation done:
const selectorIfArrived  = '.arrived'
// .arriving = styled arrive, :hover = native arrive:
// the .disabled, .disable are used to kill native :hover
// the .arrived, .leaving, .left are used to overwrite native :hover
const selectorIfArriving = ':is(.arriving, :is(:hover, .focused, .focusing, :focus-within:not(:is(.blurring, .blurred))):not(:is(.disabled, .disable, .arrived, .leaving, .left)))'
// .leaving will be added after loosing arrive and will be removed after leaving-animation done:
const selectorIfLeaving  = '.leaving'
// if all above are not set => left:
// optionally use .left to overwrite native :hover
const selectorIfLeft     = ':is(:not(:is(.arrived, .arriving, :is(:hover, .focused, .focusing, :focus-within:not(:is(.blurring, .blurred))):not(:is(.disabled, .disable)), .leaving)), .left)'



export const ifArrived       = (styles: CssStyleCollection): CssRule => rule(selectorIfArrived , styles);
export const ifArriving      = (styles: CssStyleCollection): CssRule => rule(selectorIfArriving, styles);
export const ifLeaving       = (styles: CssStyleCollection): CssRule => rule(selectorIfLeaving , styles);
export const ifLeft          = (styles: CssStyleCollection): CssRule => rule(selectorIfLeft    , styles);

export const ifArrive        = (styles: CssStyleCollection): CssRule => rule([selectorIfArriving, selectorIfArrived                                   ], styles);
export const ifLeave         = (styles: CssStyleCollection): CssRule => rule([                                       selectorIfLeaving, selectorIfLeft], styles);
export const ifArriveLeaving = (styles: CssStyleCollection): CssRule => rule([selectorIfArriving, selectorIfArrived, selectorIfLeaving                ], styles);



/**
 * Uses arrive (hover) & leave states.
 * @returns A `StateMixin<ArriveLeaveVars>` represents arrive (hover) & leave state definitions.
 */
export const usesArriveLeaveState = (): StateMixin<ArriveLeaveVars> => {
    return [
        () => style({
            ...states([
                ifArrived({
                    ...vars({
                        [arrives.filter] : controls.filterArrive,
                    }),
                }),
                ifArriving({
                    ...vars({
                        [arrives.filter] : controls.filterArrive,
                        [arrives.anim  ] : controls.animArrive,
                    }),
                }),
                ifLeaving({
                    ...vars({
                        [arrives.filter] : controls.filterArrive,
                        [arrives.anim  ] : controls.animLeave,
                    }),
                }),
            ]),
        }),
        arrives,
    ];
};



export const useArriveLeaveState  = <TElement extends Element = HTMLElement>(props: ControlProps<TElement>, focusBlurState: Pick<ReturnType<typeof useFocusBlurState<TElement>>, 'focused'>) => {
    // fn props:
    const propEnabled           = usePropEnabled(props);
    const isControllableArrived = (props.arrived !== undefined);
    
    
    
    // states:
    const [arrived,   setArrived  ] = useState<boolean>(props.arrived ?? false); // true => arrived, false => left
    const [animating, setAnimating] = useState<boolean|null>(null);              // null => no-animation, true => arriving-animation, false => leaving-animation
    
    const [hoverDn,   setHoverDn  ] = useState<boolean>(false);                  // uncontrollable (dynamic) state: true => user hovered, false => user left
    
    
    
    // resets:
    if (hoverDn && (!propEnabled || isControllableArrived)) {
        setHoverDn(false); // lost hover because the control is disabled or controllable [arrived] is set, when the control is re-enabled => still lost hover
    } // if
    
    
    
    /*
     * state is always left if disabled
     * state is arrived/left based on [controllable arrived] (if set) and fallback to ([uncontrollable hovered] || [uncontrollable focused])
     */
    const arrivedFn : boolean = propEnabled && (props.arrived /*controllable*/ ?? (hoverDn /*uncontrollable*/ || focusBlurState.focused /*uncontrollable*/));
    
    if (arrived !== arrivedFn) { // change detected => apply the change & start animating
        setArrived(arrivedFn);   // remember the last change
        setAnimating(arrivedFn); // start arriving-animation/leaving-animation
    } // if
    
    
    
    // handlers:
    const handleMouseEnter = useEvent<React.MouseEventHandler<TElement>>(() => {
        // conditions:
        if (!propEnabled)          return; // control is disabled => no response required
        if (isControllableArrived) return; // controllable [arrived] is set => no uncontrollable required
        
        
        
        setHoverDn(true);
    }, [propEnabled, isControllableArrived]);
    
    const handleMouseLeave = useEvent<React.MouseEventHandler<TElement>>(() => {
        // conditions:
        if (!propEnabled)          return; // control is disabled => no response required
        if (isControllableArrived) return; // controllable [arrived] is set => no uncontrollable required
        
        
        
        setHoverDn(false);
    }, [propEnabled, isControllableArrived]);
    
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(arrive|leave)|(?<=[a-z])(Arrive|Leave))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (arrive|leave)[Foo] or boo(Arrive|Leave)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop arriving-animation/leaving-animation
    }, []);
    
    
    
    return {
        arrived,
        
        class  : ((): string|null => {
            // arriving:
            if (animating === true) {
                // arriving by controllable prop => use class .arriving
                if (isControllableArrived) return 'arriving';
                
                // otherwise use a combination of :hover || (.focused || .focusing || :focus)
                return null;
            } // if
            
            // leaving:
            if (animating === false) return 'leaving';
            
            // fully arrived:
            if (arrived) return 'arrived';
            
            // fully left:
            if (isControllableArrived) {
                return 'left'; // arriving by controllable prop => use class .left to kill [:hover || (.focused || .focusing || :focus)]
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handleMouseEnter,
        handleMouseLeave,
        handleAnimationEnd,
    };
};
//#endregion arriveLeave



// styles:
export const usesControlLayout = () => {
    return style({
        ...imports([
            // resets:
            stripoutControl(), // clear browser's default styles
            
            // layouts:
            usesIndicatorLayout(),
            
            // colors:
            usesThemeDefault(),
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
    const [focusBlurStateRule  ] = usesFocusBlurState();
    const [arriveLeaveStateRule] = usesArriveLeaveState();
    
    
    
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
            
            // accessibilities:
            focusBlurStateRule,
            arriveLeaveStateRule,
        ]),
        ...states([
            ifDisable({
                // accessibilities:
                cursor : controls.cursorDisable,
            }),
            
            ifActive({
                ...imports([
                    markActive(),
                ]),
            }),
            ifFocus({
                ...imports([
                    markActive(),
                ]),
            }),
            ifArrive({
                ...imports([
                    markActive(),
                ]),
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

export const useControlStyleSheet = createUseStyleSheet(() => ({
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
    
    const [, , animRegistry] = usesAnim();
    const boxShadows = animRegistry.boxShadows;
    const filters    = animRegistry.filters;
    
    const [, {boxShadow : boxShadowFocusBlur}] = usesFocusBlurState();
    const [, {filter    : filterArriveLeave }] = usesArriveLeaveState();
    
    
    
    //#region keyframes
    const frameBlurred  = style({
        boxShadow: [
            ...boxShadows.filter((b) => (b !== boxShadowFocusBlur)),
            
         // boxShadowFocusBlur, // missing the last => let's the browser interpolated it
        ].map(fallbackNoneBoxShadow),
    });
    const frameFocused = style({
        boxShadow: [
            ...boxShadows.filter((b) => (b !== boxShadowFocusBlur)),
            
            boxShadowFocusBlur, // existing the last => let's the browser interpolated it
        ].map(fallbackNoneBoxShadow),
    });
    const [keyframesFocusRule, keyframesFocus] = keyframes({
        from : frameBlurred,
        to   : frameFocused,
    });
    keyframesFocus.value = 'focus'; // the @keyframes name should contain 'focus' in order to be recognized by `useFocusBlurState`
    const [keyframesBlurRule , keyframesBlur ] = keyframes({
        from : frameFocused,
        to   : frameBlurred,
    });
    keyframesBlur.value  = 'blur';  // the @keyframes name should contain 'blur'  in order to be recognized by `useFocusBlurState`
    
    
    
    const frameLeft = style({
        filter: [[
            ...filters.filter((f) => (f !== filterArriveLeave)),
            
         // filterArriveLeave, // missing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const frameArrived  = style({
        filter: [[
            ...filters.filter((f) => (f !== filterArriveLeave)),
            
            filterArriveLeave, // existing the last => let's the browser interpolated it
        ]].map(fallbackNoneFilter),
    });
    const [keyframesArriveRule, keyframesArrive] = keyframes({
        from : frameLeft,
        to   : frameArrived,
    });
    keyframesArrive.value = 'arrive'; // the @keyframes name should contain 'arrive' in order to be recognized by `useArriveLeaveState`
    const [keyframesLeaveRule , keyframesLeave ] = keyframes({
        from : frameArrived,
        to   : frameLeft,
    });
    keyframesLeave.value  = 'leave';  // the @keyframes name should contain 'leave'  in order to be recognized by `useArriveLeaveState`
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
        ]                               as CssKnownProps['anim'],
        animBlur       : [
            ['300ms', 'ease-out', 'both', keyframesBlur  ],
        ]                               as CssKnownProps['anim'],
        animArrive     : [
            ['150ms', 'ease-out', 'both', keyframesArrive],
        ]                               as CssKnownProps['anim'],
        animLeave      : [
            ['300ms', 'ease-out', 'both', keyframesLeave ],
        ]                               as CssKnownProps['anim'],
    };
}, { prefix: 'ctrl' });



// react components:
export interface ControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        IndicatorProps<TElement>
{
    // accessibilities:
    focused  ?: boolean
    tabIndex ?: number
    
    arrived  ?: boolean
}
const Control = <TElement extends Element = HTMLElement>(props: ControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = useControlStyleSheet();
    
    
    
    // states:
    
    // accessibilities:
    const focusBlurState   = useFocusBlurState<TElement>(props);
    const arriveLeaveState = useArriveLeaveState<TElement>(props, focusBlurState);
    
    
    
    // fn props:
    const propEnabled      = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        focused  : _focused,
        tabIndex : _tabIndex,
        
        arrived  : _arrived,
    ...restIndicatorProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // accessibilities:
        focusBlurState.class,
        arriveLeaveState.class,
    );
    
    
    
    // handlers:
    const handleFocus        = useMergeEvents(
        // preserves the original `onFocus`:
        props.onFocus,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleFocus,
    );
    const handleBlur         = useMergeEvents(
        // preserves the original `onBlur`:
        props.onBlur,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleBlur,
    );
    const handleMouseEnter   = useMergeEvents(
        // preserves the original `onMouseEnter`:
        props.onMouseEnter,
        
        
        
        // states:
        
        // accessibilities:
        arriveLeaveState.handleMouseEnter,
    );
    const handleMouseLeave   = useMergeEvents(
        // preserves the original `onMouseLeave`:
        props.onMouseLeave,
        
        
        
        // states:
        
        // accessibilities:
        arriveLeaveState.handleMouseLeave,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleAnimationEnd,
        arriveLeaveState.handleAnimationEnd,
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
                tabIndex : props.tabIndex ?? (propEnabled ? 0 : -1), // makes any element type focusable
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
