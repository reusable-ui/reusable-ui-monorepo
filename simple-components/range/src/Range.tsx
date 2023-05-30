// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // cssfn general types:
    Optional,
}                           from '@cssfn/core'                          // writes css in javascript
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                          // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook

// reusable-ui core:
import {
    // a set of numeric utility functions:
    clamp,
    
    
    
    // react helper hooks:
    useTriggerRender,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
    useScheduleTriggerEvent,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    usePropReadOnly,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableProps,
    useOrientationable,
    
    
    
    // a capability of UI to be focused:
    useFocusable,
    
    
    
    // adds an interactive feel to a UI:
    useInteractable,
    
    
    
    // a capability of UI to be clicked:
    useClickable,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'                 // a complement component
import {
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'        // a base component
import {
    // react components:
    EditableActionControlProps,
    EditableActionControl,
}                           from '@reusable-ui/editable-action-control' // a base component
import type {
    // types:
    InputHTMLAttributes,
}                           from '@reusable-ui/input'                   // a neighbor component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'
import {
    // features:
    usesRange,
}                           from './features/range.js'



// styles:
export const useRangeStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : 'jue5zxlqsc',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// handlers:
const handleChangeDummy : React.ChangeEventHandler<HTMLInputElement> = (_event) => {
    /* nothing to do */
};



// react components:
export interface RangeSubComponentProps
{
    // components:
    trackComponent      ?: React.ReactComponentElement<any, EditableControlProps<Element>>
    trackLowerComponent ?: React.ReactComponentElement<any, GenericProps<Element>>
    trackUpperComponent ?: React.ReactComponentElement<any, GenericProps<Element>>
    thumbComponent      ?: React.ReactComponentElement<any, EditableActionControlProps<Element>>
    
    
    
    // refs:
    trackRef          ?: React.Ref<Element> // setter ref
    trackLowerRef     ?: React.Ref<Element> // setter ref
    trackUpperRef     ?: React.Ref<Element> // setter ref
    thumbRef          ?: React.Ref<Element> // setter ref
    
    
    
    // classes:
    trackClasses      ?: Optional<string>[]
    trackLowerClasses ?: Optional<string>[]
    trackUpperClasses ?: Optional<string>[]
    thumbClasses      ?: Optional<string>[]
    
    
    
    // styles:
    trackStyle        ?: React.CSSProperties
    trackLowerStyle   ?: React.CSSProperties
    trackUpperStyle   ?: React.CSSProperties
    thumbStyle        ?: React.CSSProperties
}

export interface RangeProps<TElement extends Element = HTMLDivElement>
    extends
        // bases:
        Omit<EditableActionControlProps<TElement>,
            // refs:
            |'elmRef'                // moved to <input>
            
            // values:
            |'defaultValue'|'value'  // only supports numeric value
            |'onChange'              // moved to <input>
            
            // children:
            |'children'              // no nested children
        >,
        Pick<EditableActionControlProps<HTMLInputElement>,
            // refs:
            |'elmRef'                // moved here
            
            // values:
            |'onChange'              // moved here
        >,
        
        // input[type="range"]:
        Omit<InputHTMLAttributes<TElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // layouts:
            |'size'                  // we use css way to resize
            
            // accessibilities:
            |'enterKeyHint'          // no special [enter] keyboard
            |'disabled'              // we use [enabled] instead of [disabled]
            
            // validations:
            |'required'              // never blank value => not supported
            |'minLength'|'maxLength' // text length constraint is not supported
            |'pattern'               // text regex is not supported
            
            // formats:
            |'type'                              // always [type="range"]
            |'placeholder'|'autoComplete'|'list' // text hints are not supported
            
            // values:
            |'defaultValue'|'value'  // only supports numeric value
        >,
        
        // variants:
        OrientationableProps,
        
        // components:
        RangeSubComponentProps
{
    // validations:
    min               ?: number
    max               ?: number
    step              ?: number|'any'
    
    
    
    // values:
    defaultValue      ?: number
    value             ?: number
}
const Range = <TElement extends Element = HTMLDivElement>(props: RangeProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useRangeStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const isOrientationBlock     = orientationableVariant.isOrientationBlock;
    
    
    
    // states:
    const focusableState         = useFocusable<TElement>(props);
    const interactableState      = useInteractable<TElement>(props, focusableState);
    const clickableState         = useClickable<TElement>({
        enabled           : props.enabled,
        inheritEnabled    : props.inheritEnabled,
        
        readOnly          : props.readOnly,
        inheritReadOnly   : props.inheritReadOnly,
        
        pressed           : props.pressed,
        actionMouses      : (props.actionMouses  !== undefined) ? props.actionMouses  : null, // handled manually
        actionTouches     : (props.actionTouches !== undefined) ? props.actionTouches : null, // handled manually
        actionKeys        : (props.actionKeys    !== undefined) ? props.actionKeys    : null, // handled manually
    });
    
    
    
    // rest props:
    const {
        // refs:
        outerRef,
        elmRef,
        
        
        
        // variants:
        orientation : _orientation,  // remove
        
        
        
        // accessibilities:
        pressed      : _pressed,      // remove
        
        // still on <EditableControl> element
        // autoFocus,
        // tabIndex,
        // enterKeyHint,
        
        
        
        // behaviors:
        actionMouses  : _actionMouses,  // remove
        actionTouches : _actionTouches, // remove
        actionKeys    : _actionKeys,    // remove
        releaseDelay  : _releaseDelay,  // remove
        
        
        
        // forms:
        name,
        form,
        
        
        
        // values:
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        
        
        // validations:
        enableValidation,
        isValid,
        inheritValidation,
        
        min,
        max,
        step,
        
        
        
        // components:
        trackComponent      = (<EditableControl />       as React.ReactComponentElement<any, EditableControlProps<Element>>),
        trackLowerComponent = (<Generic />               as React.ReactComponentElement<any, GenericProps<Element>>),
        trackUpperComponent = (<Generic />               as React.ReactComponentElement<any, GenericProps<Element>>),
        thumbComponent      = (<EditableActionControl /> as React.ReactComponentElement<any, EditableActionControlProps<Element>>),
        
        trackRef,
        trackLowerRef,
        trackUpperRef,
        thumbRef,
        
        trackClasses,
        trackLowerClasses,
        trackUpperClasses,
        thumbClasses,
        
        trackStyle,
        trackLowerStyle,
        trackUpperStyle,
        thumbStyle,
    ...restEditableControlProps} = props;
    
    
    
    // fn props:
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);
    const propEditable   = propEnabled && !propReadOnly;
    
    const nude           = props.nude  ?? true;
    const theme          = props.theme ?? 'primary';
    const mild           = props.mild  ?? false;
    const mildAlternate  = !mild;
    
    
    
    // refs:
    const rangeRefInternal    = useRef<TElement|null>(null);
    const inputRefInternal    = useRef<HTMLInputElement|null>(null);
    const trackRefInternal    = useRef<HTMLElement|null>(null);
    const thumbRefInternal    = useRef<HTMLElement|null>(null);
    
    const mergedRangeRef      = useMergeRefs(
        // preserves the original `outerRef`:
        outerRef,
        
        
        
        rangeRefInternal,
    );
    const mergedInputRef      = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    const mergedTrackRef      = useMergeRefs(
        // preserves the original `elmRef` from `trackComponent`:
        trackComponent.props.elmRef,
        
        
        
        // preserves the original `trackRef` from `props`:
        trackRef,
        
        
        
        trackRefInternal,
    );
    const mergedTrackLowerRef = useMergeRefs(
        // preserves the original `elmRef` from `trackLowerComponent`:
        trackLowerComponent.props.elmRef,
        
        
        
        // preserves the original `trackLowerRef` from `props`:
        trackLowerRef,
    );
    const mergedTrackUpperRef = useMergeRefs(
        // preserves the original `elmRef` from `trackUpperComponent`:
        trackUpperComponent.props.elmRef,
        
        
        
        // preserves the original `trackUpperRef` from `props`:
        trackUpperRef,
    );
    const mergedThumbRef      = useMergeRefs(
        // preserves the original `elmRef` from `thumbComponent`:
        thumbComponent.props.elmRef,
        
        
        
        // preserves the original `thumbRef` from `props`:
        thumbRef,
        
        
        
        thumbRefInternal,
    );
    
    
    
    // utilities:
    const minFn      : number  = min ?? 0;
    const maxFn      : number  = max ?? 100;
    const stepFn     : number  = (step === 'any') ? 0 : Math.abs(step ?? 1);
    const negativeFn : boolean = (maxFn < minFn);
    
    const trimValue = useEvent(<TOpt extends number|null|undefined>(value: number|TOpt): number|TOpt => {
        return clamp(minFn, value, maxFn, stepFn);
    });
    
    
    
    // fn props:
    const valueFn        : number|undefined = trimValue(value);
    const defaultValueFn : number|undefined = trimValue(defaultValue);
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
    
    
    
    // source of truth:
    const valueRef         = useRef<number>(/*initialState: */valueFn ?? defaultValueFn ?? (minFn + ((maxFn - minFn) * 0.5)));
    if (valueFn !== undefined) valueRef.current = valueFn;  //   controllable component mode: update the source_of_truth on every_re_render -- on every [value] prop changes
    const [triggerRender]  = useTriggerRender();            // uncontrollable component mode: update the source_of_truth when modified internally by internal component(s)
    const valueRatio       : number = (valueRef.current - minFn) / (maxFn - minFn);
    
    type ChangeValueAction = 'setValue'|'setValueRatio'|'decrease'|'increase'
    const changeValue      = useEvent((action: ChangeValueAction, amount: number): void => {
        let value = valueRef.current;
        switch (action) {
            case 'setValue': {
                value = trimValue(amount);
            } break;
            case 'setValueRatio': {
                let valueRatio = amount;
                
                // make sure the valueRatio is between 0 & 1:
                valueRatio     = Math.min(Math.max(
                    valueRatio
                , 0), 1);
                
                value = trimValue(minFn + ((maxFn - minFn) * valueRatio));
            } break;
            
            case 'decrease' : {
                value = trimValue(value - ((stepFn || 1) * (negativeFn ? -1 : 1) * amount));
            } break;
            case 'increase' : {
                value = trimValue(value + ((stepFn || 1) * (negativeFn ? -1 : 1) * amount));
            } break;
        } // switch
        
        
        
        // trigger `onChange` if the value changed:
        if (valueRef.current !== value) {
            const oldValue = valueRef.current; // react *hack* get_prev_value *before* modifying (by any re-render => fully controllable `value = valueRef.current`)
            
            
            
            if (valueFn === undefined) { // uncontrollable component mode: update the source_of_truth when modified internally by internal component(s)
                valueRef.current = value; // update
                triggerRender();          // sync the UI to `valueRef.current`
            }
            // else {
            //     // for controllable component mode: the update of [value] prop and the source_of_truth are decided by <Parent> component (on every_re_render).
            // }
            
            
            
            const inputElm = inputRefInternal.current;
            if (inputElm) {
                // react *hack*: trigger `onChange` event:
                scheduleTriggerEvent(() => { // runs the `input` event *next after* current macroTask completed
                    inputElm.valueAsNumber = value;                           // react *hack* set_value *before* firing `input` event
                    (inputElm as any)._valueTracker?.setValue(`${oldValue}`); // react *hack* in order to React *see* the changes when `input` event fired
                    
                    
                    
                    // fire `input` native event to trigger `onChange` synthetic event:
                    inputElm.dispatchEvent(new Event('input', { bubbles: true, cancelable: false, composed: true }));
                });
            } // if
        } // if
    });
    
    
    
    // classes:
    const variantClasses          = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
    );
    const stateClasses            = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        focusableState.class,
        interactableState.class,
    );
    const mergedTrackClasses      = useMergeClasses(
        // preserves the original `classes` from `trackComponent`:
        trackComponent.props.classes,
        
        
        
        // preserves the original `trackClasses` from `props`:
        trackClasses,
        
        
        
        // identifiers:
        'track'
    );
    const mergedTrackLowerClasses = useMergeClasses(
        // preserves the original `classes` from `trackLowerComponent`:
        trackLowerComponent.props.classes,
        
        
        
        // preserves the original `trackLowerClasses` from `props`:
        trackLowerClasses,
        
        
        
        // identifiers:
        'tracklower'
    );
    const mergedTrackUpperClasses = useMergeClasses(
        // preserves the original `classes` from `trackUpperComponent`:
        trackUpperComponent.props.classes,
        
        
        
        // preserves the original `trackUpperClasses` from `props`:
        trackUpperClasses,
        
        
        
        // identifiers:
        'trackupper'
    );
    const mergedThumbClasses      = useMergeClasses(
        // preserves the original `classes` from `thumbComponent`:
        thumbComponent.props.classes,
        
        
        
        // preserves the original `thumbClasses` from `props`:
        thumbClasses,
        
        
        
        // identifiers:
        'thumb'
    );
    
    
    
    // features:
    const {rangeVars} = usesRange();
    
    
    
    // styles:
    const valueRatioStyle       = useMemo<React.CSSProperties>(() => ({
        // values:
        [
            rangeVars.valueRatio
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : valueRatio,
    }), [rangeVars.valueRatio, valueRatio]);
    const mergedStyle           = useMergeStyles(
        // values:
        valueRatioStyle,
        
        
        
        // preserves the original `style` (can overwrite the `valueRatioStyle`):
        props.style,
    );
    const mergedTrackStyle      = useMergeStyles(
        // preserves the original `trackStyle` from `props`:
        trackStyle,
        
        
        
        // preserves the original `style` from `trackComponent` (can overwrite the `trackStyle`):
        trackComponent.props.style,
    );
    const mergedTrackLowerStyle = useMergeStyles(
        // preserves the original `trackLowerStyle` from `props`:
        trackLowerStyle,
        
        
        
        // preserves the original `style` from `trackLowerComponent` (can overwrite the `trackLowerStyle`):
        trackLowerComponent.props.style,
    );
    const mergedTrackUpperStyle = useMergeStyles(
        // preserves the original `trackUpperStyle` from `props`:
        trackUpperStyle,
        
        
        
        // preserves the original `style` from `trackUpperComponent` (can overwrite the `trackUpperStyle`):
        trackUpperComponent.props.style,
    );
    const mergedThumbStyle      = useMergeStyles(
        // preserves the original `thumbStyle` from `props`:
        thumbStyle,
        
        
        
        // preserves the original `style` from `thumbComponent` (can overwrite the `thumbStyle`):
        thumbComponent.props.style,
    );
    
    
    
    // handlers:
    const handleFocus          = useMergeEvents(
        // preserves the original `onFocus`:
        props.onFocus,
        
        
        
        // states:
        focusableState.handleFocus,
    );
    const handleBlur           = useMergeEvents(
        // preserves the original `onBlur`:
        props.onBlur,
        
        
        
        // states:
        focusableState.handleBlur,
    );
    const handleMouseEnter     = useMergeEvents(
        // preserves the original `onMouseEnter`:
        props.onMouseEnter,
        
        
        
        // states:
        interactableState.handleMouseEnter,
    );
    const handleMouseLeave     = useMergeEvents(
        // preserves the original `onMouseLeave`:
        props.onMouseLeave,
        
        
        
        // states:
        interactableState.handleMouseLeave,
    );
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        focusableState.handleAnimationStart,
        interactableState.handleAnimationStart,
        clickableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        focusableState.handleAnimationEnd,
        interactableState.handleAnimationEnd,
        clickableState.handleAnimationEnd,
    );
    
    const isMouseActive        = useRef<boolean>(false);
    const handleMouseNative    = useEvent<EventHandler<MouseEvent>>((event) => {
        // conditions:
        if (!propEditable) return; // control is disabled or readOnly => no response required
        
        
        
        // actions:
        isMouseActive.current = (
            !isTouchActive.current // not in touch mode
            &&
            (event.buttons === 1)  // only left button pressed, ignore multi button pressed
        );
    });
    const handleMouseActive    = useEvent<React.MouseEventHandler<TElement>>((event) => {
        handleMouseNative(event.nativeEvent);
    });
    
    const isTouchActive        = useRef<boolean>(false);
    const handleTouchNative    = useEvent<EventHandler<TouchEvent>>((event) => {
        // conditions:
        if (!propEditable) return; // control is disabled or readOnly => no response required
        
        
        
        // actions:
        isTouchActive.current = (event.touches.length === 1); // only single touch
    });
    const handleTouchActive    = useEvent<React.TouchEventHandler<TElement>>((event) => {
        handleTouchNative(event.nativeEvent);
    });
    
    useEffect(() => {
        // conditions:
        if (!propEditable) return; // control is disabled or readOnly => no response required
        
        
        
        // setups:
        window.addEventListener('mouseup'    , handleMouseNative);
        window.addEventListener('touchend'   , handleTouchNative);
        window.addEventListener('touchcancel', handleTouchNative);
        
        
        
        // cleanups:
        return () => {
            window.removeEventListener('mouseup'    , handleMouseNative);
            window.removeEventListener('touchend'   , handleTouchNative);
            window.removeEventListener('touchcancel', handleTouchNative);
        };
    }, [propEditable]);
    
    useEffect(() => {
        // conditions:
        if (propEditable) return; // control is enabled and mutable => no reset required
        
        
        
        // resets:
        isMouseActive.current = false; // unmark as pressed
        isTouchActive.current = false; // unmark as touched
    }, [propEditable]);
    
    const handlePointerSlide  = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        // one of the mouse or touch is active but not both are active:
        if (
            (!isMouseActive.current && !isTouchActive.current) // both mouse & touch are inactive
            ||
            ( isMouseActive.current &&  isTouchActive.current) // both mouse & touch are active
        ) return;
        
        const track = trackRefInternal.current;
        const thumb = thumbRefInternal.current;
        if (!track)                 return;
        if (!thumb)                 return;
        
        
        
        const style        = getComputedStyle(track);
        const borderStart  = (Number.parseInt(isOrientationBlock ? style.borderTopWidth : style.borderLeftWidth) || 0 /* NaN => 0 */);
        const paddingStart = (Number.parseInt(isOrientationBlock ? style.paddingTop     : style.paddingLeft    ) || 0 /* NaN => 0 */);
        const paddingEnd   = (Number.parseInt(isOrientationBlock ? style.paddingBottom  : style.paddingRight   ) || 0 /* NaN => 0 */);
        const thumbSize    =  (isOrientationBlock ? thumb.offsetHeight : thumb.offsetWidth);
        const trackSize    = ((isOrientationBlock ? track.clientHeight : track.clientWidth) - paddingStart - paddingEnd - thumbSize);
        
        const rect         = track.getBoundingClientRect();
        const cursorStart  = (isOrientationBlock ? event.clientY : event.clientX) - (isOrientationBlock ? rect.top : rect.left) - borderStart - paddingStart - (thumbSize / 2);
        // if ((cursorStart < 0) || (cursorStart > trackSize)) return; // setValueRatio will take care of this
        
        let valueRatio     = cursorStart / trackSize;
        if (isOrientationBlock || (style.direction === 'rtl')) valueRatio = (1 - valueRatio); // reverse the ratio from end
        
        changeValue('setValueRatio', valueRatio);
        
        
        // indicates the <Range> is currently being pressed/touched
        switch(event.type) {
            case 'mousedown':
                clickableState.handleMouseDown(event);
                break;
            case 'touchstart':
                clickableState.handleTouchStart(event as unknown as React.TouchEvent<TElement>);
                break;
        } // switch
    });
    const handleTouchSlide    = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        if (event.touches.length !== 1) return; // only single touch
        
        
        
        // simulates the touch as sliding pointer:
        handlePointerSlide({
            ...event,
            clientX : event.touches[0].clientX,
            clientY : event.touches[0].clientY,
        } as unknown as React.MouseEvent<TElement, MouseEvent>);
    });
    const handleKeyboardSlide = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (!propEditable)          return; // control is disabled or readOnly => no response required
        
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        /* note: the `code` may `undefined` on autoComplete */
        const keyCode = (event.code as string|undefined)?.toLowerCase();
        if (!keyCode) return; // ignores [unidentified] key
        
        
        
        if (((): boolean => {
            const isRtl   = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                 (keyCode === 'pagedown'  )) changeValue('decrease', 1    );
            else if (                                 (keyCode === 'pageup'    )) changeValue('increase', 1    );
            
            else if (                                 (keyCode === 'home'      )) changeValue('setValue', minFn);
            else if (                                 (keyCode === 'end'       )) changeValue('setValue', maxFn);
            
            else if ( isOrientationBlock &&           (keyCode === 'arrowdown' )) changeValue('decrease', 1    );
            else if ( isOrientationBlock &&           (keyCode === 'arrowup'   )) changeValue('increase', 1    );
            
            else if (!isOrientationBlock && !isRtl && (keyCode === 'arrowleft' )) changeValue('decrease', 1    );
            else if (!isOrientationBlock && !isRtl && (keyCode === 'arrowright')) changeValue('increase', 1    );
            
            else if (!isOrientationBlock &&  isRtl && (keyCode === 'arrowright')) changeValue('decrease', 1    );
            else if (!isOrientationBlock &&  isRtl && (keyCode === 'arrowleft' )) changeValue('increase', 1    );
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            clickableState.handleKeyDown(event); // indicates the <Range> is currently being key pressed
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    });
    
    const handleMouseDown     = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // range handlers:
        handleMouseActive,
        handlePointerSlide,
    );
    const handleMouseMove     = useMergeEvents(
        // preserves the original `onMouseMove`:
        props.onMouseMove,
        
        
        
        // range handlers:
        handlePointerSlide,
    );
    
    const handleTouchStart    = useMergeEvents(
        // preserves the original `onTouchStart`:
        props.onTouchStart,
        
        
        
        // range handlers:
        handleTouchActive,
        handleTouchSlide,
    );
    const handleTouchMove     = useMergeEvents(
        // preserves the original `onTouchMove`:
        props.onTouchMove,
        
        
        
        // range handlers:
        handleTouchSlide,
    );
    
    const handleKeyDown       = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // range handlers:
        handleKeyboardSlide,
        
        
        
        // states:
        focusableState.handleKeyDown,
    );
    
    const handleChange        = useMergeEvents(
        // preserves the original `onChange`:
        onChange,
        
        
        
        // dummy:
        handleChangeDummy, // just for satisfying React of controllable <input>
    );
    
    
    
    // jsx:
    const trackLower = React.cloneElement<GenericProps<Element>>(trackLowerComponent,
        // props:
        {
            // refs:
            elmRef  : mergedTrackLowerRef,
            
            
            
            // classes:
            classes : mergedTrackLowerClasses,
            
            
            
            // styles:
            style   : mergedTrackLowerStyle,
        },
    );
    
    const trackUpper = React.cloneElement<GenericProps<Element>>(trackUpperComponent,
        // props:
        {
            // refs:
            elmRef  : mergedTrackUpperRef,
            
            
            
            // classes:
            classes : mergedTrackUpperClasses,
            
            
            
            // styles:
            style   : mergedTrackUpperStyle,
        },
    );
    
    const thumb      = React.cloneElement<EditableActionControlProps<Element>>(thumbComponent,
        // props:
        {
            // refs:
            elmRef            : mergedThumbRef,
            
            
            
            // variants:
            theme             : thumbComponent.props.theme ?? theme,
            mild              : thumbComponent.props.mild  ?? mildAlternate,
            
            
            
            // classes:
            classes           : mergedThumbClasses,
            
            
            
            // styles:
            style             : mergedThumbStyle,
            
            
            
            // accessibilities:
            inheritEnabled    : thumbComponent.props.inheritEnabled  ?? true,
            inheritReadOnly   : thumbComponent.props.inheritReadOnly ?? true,
            inheritActive     : thumbComponent.props.inheritActive   ?? true,
            
            focused           : thumbComponent.props.focused  ?? focusableState.focused, // if the <Range> got focus => the <Thumb> has focus indicator too
            tabIndex          : thumbComponent.props.tabIndex ?? -1,                     // focus on the whole <Range>, not the <Thumb>
            
            
            
            // states:
            arrived           : thumbComponent.props.arrived ?? interactableState.arrived,
            pressed           : thumbComponent.props.pressed ?? clickableState.pressed,
            
            
            
            // validations:
            enableValidation  : thumbComponent.props.enableValidation  ?? enableValidation,
            isValid           : thumbComponent.props.isValid           ?? isValid,
            inheritValidation : thumbComponent.props.inheritValidation ?? inheritValidation,
        },
    );
    
    const track      = React.cloneElement<EditableControlProps<Element>>(trackComponent,
        // props:
        {
            // refs:
            elmRef            : mergedTrackRef,
            
            
            
            // variants:
            mild              : trackComponent.props.mild ?? mild,
            
            
            
            // classes:
            classes           : mergedTrackClasses,
            
            
            
            // styles:
            style             : mergedTrackStyle,
            
            
            
            // accessibilities:
            inheritEnabled    : trackComponent.props.inheritEnabled  ?? true,
            inheritReadOnly   : trackComponent.props.inheritReadOnly ?? true,
            inheritActive     : trackComponent.props.inheritActive   ?? true,
            
            tabIndex          : trackComponent.props.tabIndex        ?? -1, // focus on the whole <Range>, not the <Track>
            
            
            
            // states:
            arrived           : trackComponent.props.arrived ?? interactableState.arrived,
            
            
            
            // validations:
            enableValidation  : trackComponent.props.enableValidation  ?? enableValidation,
            isValid           : trackComponent.props.isValid           ?? isValid,
            inheritValidation : trackComponent.props.inheritValidation ?? inheritValidation,
        },
        
        
        
        // children:
        trackComponent.props.children ?? (<>
            { isOrientationBlock ? trackUpper : trackLower }
            { thumb }
            { isOrientationBlock ? trackLower : trackUpper }
        </>),
    );
    
    return (
        <EditableControl<TElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // refs:
            outerRef={mergedRangeRef}
            
            
            
            // semantics:
            tag ={props.tag  ?? 'div'   }
            role={props.role ?? 'slider'}
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            aria-valuenow   ={props['aria-valuenow'   ] ?? valueRef.current}
            aria-valuemin   ={props['aria-valuemin'   ] ?? (negativeFn ? maxFn : minFn)}
            aria-valuemax   ={props['aria-valuemax'   ] ?? (negativeFn ? minFn : maxFn)}
            
            
            
            // variants:
            nude={nude}
            theme={theme}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            stateClasses={stateClasses}
            
            
            
            // styles:
            style={mergedStyle}
            
            
            
            // validations:
            enableValidation={enableValidation}
            isValid={isValid}
            inheritValidation={inheritValidation}
            
            
            
            // handlers:
            onFocus          = {handleFocus         }
            onBlur           = {handleBlur          }
            onMouseEnter     = {handleMouseEnter    }
            onMouseLeave     = {handleMouseLeave    }
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
            
            onMouseDown      = {handleMouseDown     }
            onMouseMove      = {handleMouseMove     }
            
            onTouchStart     = {handleTouchStart    }
            onTouchMove      = {handleTouchMove     }
            
            onKeyDown        = {handleKeyDown       }
        >
            <input
                // refs:
                ref={mergedInputRef}
                
                
                
                // accessibilities:
                
                // still on <EditableControl> element
                // {...{
                //     autoFocus,    // the input is hidden => not focusable
                //     tabIndex,     // the input is hidden => not focusable
                //     enterKeyHint, // not supported
                // }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value & no validation if readOnly
                
                
                
                // forms:
                {...{
                    name,
                    form,
                }}
                
                
                
                // values:
                {...{
                 // defaultValue : defaultValueFn,   // fully controllable, no defaultValue
                    value        : valueRef.current, // fully controllable
                    onChange     : handleChange,
                }}
                
                
                
                // validations:
                {...{
                    min  : negativeFn ? maxFn : minFn,
                    max  : negativeFn ? minFn : maxFn,
                    step : stepFn,
                }}
                
                
                
                // formats:
                {...{
                    type : 'range',
                }}
            />
            { track }
        </EditableControl>
    );
};
export {
    Range,
    Range as default,
}
