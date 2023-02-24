// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useCallback,
    useRef,
    useReducer,
    useEffect,
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // cssfn general types:
    Optional,
}                           from '@cssfn/core'                          // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
    
    
    
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
, { id: 'jue5zxlqsc' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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

export interface RangeProps
    extends
        // bases:
        Omit<EditableActionControlProps<HTMLInputElement>,
            // values:
            |'defaultValue'|'value'  // only supports numeric value
            
            // children:
            |'children'              // no nested children
        >,
        
        // input[type="range"]:
        Omit<InputHTMLAttributes<HTMLInputElement>,
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
const Range = (props: RangeProps): JSX.Element|null => {
    // styles:
    const styleSheet             = useRangeStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const isOrientationBlock     = orientationableVariant.isOrientationBlock;
    
    
    
    // states:
    const focusableState         = useFocusable<HTMLInputElement>(props);
    const interactableState      = useInteractable<HTMLInputElement>(props, focusableState);
    const clickableState         = useClickable<HTMLInputElement>({
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
    
    const nude           = props.nude  ?? true;
    const theme          = props.theme ?? 'primary';
    const mild           = props.mild  ?? false;
    const mildAlternate  = !mild;
    
    const minFn          : number      = min ?? 0;
    const maxFn          : number      = max ?? 100;
    const stepFn         : number      = (step === 'any') ? 0 : Math.abs(step ?? 1);
    const negativeFn     : boolean     = (maxFn < minFn);
    
    
    
    // utilities:
    const trimValue = useCallback((value: number): number => {
        // make sure the requested value is between the min value & max value:
        value     = Math.min(Math.max(
            value
        , (negativeFn ? maxFn : minFn)), (negativeFn ? minFn : maxFn));
        
        // if step was specified => stepping the value starting from min value:
        if (stepFn > 0) {
            let steps    = Math.round((value - minFn) / stepFn); // get the_nearest_stepped_value
            
            // make sure the_nearest_stepped_value is not exceeded the max value:
            let maxSteps = (maxFn - minFn) / stepFn;
            maxSteps     = negativeFn ? Math.ceil(maxSteps) : Math.floor(maxSteps); // remove the decimal fraction
            
            // re-align the steps:
            steps        = negativeFn ? Math.max(steps, maxSteps) : Math.min(steps, maxSteps);
            
            // calculate the new value:
            value        = minFn + (steps * stepFn);
        } // if
        
        return value;
    }, [minFn, maxFn, stepFn, negativeFn]); // (re)create the function on every time the constraints changes
    const trimValueOpt = (value: number|undefined): number|null => {
        // conditions:
        if (value === undefined) return null;
        
        
        
        return trimValue(value);
    };
    
    
    
    // fn props:
    const valueFn        : number|null = trimValueOpt(value);
    const defaultValueFn : number|null = trimValueOpt(defaultValue);
    
    
    
    // refs:
    const rangeRefInternal    = useRef<HTMLInputElement|null>(null);
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
    
    
    
    // states:
    interface ValueReducerAction {
        type    : 'setValue'|'setValueRatio'|'decrease'|'increase'
        payload : number
    }
    
    const valueDnReducer = useCallback((value: number, action: ValueReducerAction): number => {
        switch (action.type) {
            case 'setValue': {
                return trimValue(action.payload);
            }
            case 'setValueRatio': {
                let valueRatio = action.payload;
                
                // make sure the valueRatio is between 0 & 1:
                valueRatio     = Math.min(Math.max(
                    valueRatio
                , 0), 1);
                
                return trimValue(minFn + ((maxFn - minFn) * valueRatio));
            }
            
            case 'decrease' : {
                return trimValue(value - ((stepFn || 1) * (negativeFn ? -1 : 1) * (action.payload)));
            }
            case 'increase' : {
                return trimValue(value + ((stepFn || 1) * (negativeFn ? -1 : 1) * (action.payload)));
            }
            
            default:
                return value; // no change
        } // switch
    }, [minFn, maxFn, stepFn, negativeFn, trimValue]); // (re)create the reducer function on every time the constraints changes
    
    const [valueDn, setValueDn] = useReducer(valueDnReducer, /*initialState: */valueFn ?? defaultValueFn ?? (minFn + ((maxFn - minFn) / 2)));
    
    
    
    // fn props:
    const valueNow   : number = valueFn /*controllable*/ ?? valueDn /*uncontrollable*/;
    const valueRatio : number = (valueNow - minFn) / (maxFn - minFn);
    
    
    
    // dom effects:
    // watchdog for slider change by user:
    const prevValueDn = useRef<number>(valueDn);
    useEffect(() => {
        // conditions:
        if (valueFn !== null)                return; // only for uncontrollable <Range> => ignore
        
        if (prevValueDn.current === valueDn) return; // no change detected => ignore
        prevValueDn.current = valueDn;
        
        const inputElm = inputRefInternal.current;
        if (!inputElm)                       return; // the <input> element was not initialized => ignore
        
        
        
        // *hack*: trigger `onChange` event:
        setTimeout(() => {
            inputElm.valueAsNumber = valueDn; // *hack* set_value before firing input event
            
            inputElm.dispatchEvent(new Event('input', { bubbles: true, cancelable: false, composed: true }));
        }, 0); // runs the 'input' event *next after* current event completed
    }, [valueFn, valueDn]);
    
    
    
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
        if (!propEnabled) return; // control is disabled => no response required
        if (propReadOnly) return; // control is readOnly => no response required
        
        
        
        // actions:
        isMouseActive.current = (
            !isTouchActive.current // not in touch mode
            &&
            (event.buttons === 1)  // only left button pressed, ignore multi button pressed
        );
    });
    const handleMouseActive    = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
        handleMouseNative(event.nativeEvent);
    });
    
    const isTouchActive        = useRef<boolean>(false);
    const handleTouchNative    = useEvent<EventHandler<TouchEvent>>((event) => {
        // conditions:
        if (!propEnabled) return; // control is disabled => no response required
        if (propReadOnly) return; // control is readOnly => no response required
        
        
        
        // actions:
        isTouchActive.current = (event.touches.length === 1); // only single touch
    });
    const handleTouchActive    = useEvent<React.TouchEventHandler<HTMLInputElement>>((event) => {
        handleTouchNative(event.nativeEvent);
    });
    
    useEffect(() => {
        // conditions:
        if (!propEnabled) return; // control is disabled => no response required
        if (propReadOnly) return; // control is readOnly => no response required
        
        
        
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
    }, [propEnabled, propReadOnly]);
    
    useEffect(() => {
        // conditions:
        if (propEnabled && !propReadOnly) return; // control is enabled and mutable => no reset required
        
        
        
        // resets:
        isMouseActive.current = false; // unmark as pressed
        isTouchActive.current = false; // unmark as touched
    }, [propEnabled, propReadOnly]);
    
    const handlePointerSlide  = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
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
        
        setValueDn({ type: 'setValueRatio', payload: valueRatio });
        
        
        // indicates the <Range> is currently being pressed/touched
        switch(event.type) {
            case 'mousedown':
                clickableState.handleMouseDown(event);
                break;
            case 'touchstart':
                clickableState.handleTouchStart(event as unknown as React.TouchEvent<HTMLInputElement>);
                break;
        } // switch
    });
    const handleTouchSlide    = useEvent<React.TouchEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.touches.length !== 1) return; // only single touch
        
        
        
        // simulates the touch as sliding pointer:
        handlePointerSlide({
            ...event,
            clientX : event.touches[0].clientX,
            clientY : event.touches[0].clientY,
        } as unknown as React.MouseEvent<HTMLInputElement, MouseEvent>);
    });
    const handleKeyboardSlide = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (!propEnabled)           return; // control is disabled => no response required
        if (propReadOnly)           return; // control is readOnly => no response required
        
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        /* note: the `code` may `undefined` on autoComplete */
        const keyCode = (event.code as string|undefined)?.toLowerCase();
        if (!keyCode) return; // ignores [unidentified] key
        
        
        
        if (((): boolean => {
            const isRtl   = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                 (keyCode === 'pagedown'  )) setValueDn({ type: 'decrease', payload: 1     });
            else if (                                 (keyCode === 'pageup'    )) setValueDn({ type: 'increase', payload: 1     });
            
            else if (                                 (keyCode === 'home'      )) setValueDn({ type: 'setValue', payload: minFn });
            else if (                                 (keyCode === 'end'       )) setValueDn({ type: 'setValue', payload: maxFn });
            
            else if ( isOrientationBlock &&           (keyCode === 'arrowdown' )) setValueDn({ type: 'decrease', payload: 1     });
            else if ( isOrientationBlock &&           (keyCode === 'arrowup'   )) setValueDn({ type: 'increase', payload: 1     });
            
            else if (!isOrientationBlock && !isRtl && (keyCode === 'arrowleft' )) setValueDn({ type: 'decrease', payload: 1     });
            else if (!isOrientationBlock && !isRtl && (keyCode === 'arrowright')) setValueDn({ type: 'increase', payload: 1     });
            
            else if (!isOrientationBlock &&  isRtl && (keyCode === 'arrowright')) setValueDn({ type: 'decrease', payload: 1     });
            else if (!isOrientationBlock &&  isRtl && (keyCode === 'arrowleft' )) setValueDn({ type: 'increase', payload: 1     });
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
    
    const handleChangeDummy   = useEvent<React.ChangeEventHandler<HTMLInputElement>>((_event) => {
        /* nothing to do */
    });
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
        <EditableControl<HTMLInputElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // refs:
            outerRef={mergedRangeRef}
            
            
            
            // semantics:
            tag ={props.tag  ?? 'div'   }
            role={props.role ?? 'slider'}
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            aria-valuenow   ={props['aria-valuenow'   ] ?? valueNow}
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
                    // defaultValue : defaultValueFn,                     // fully controllable, no defaultValue
                    value    : (valueFn !== null) ? valueNow : undefined, // fully controllable -or- *hack*ed controllable
                    onChange : handleChange,
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
