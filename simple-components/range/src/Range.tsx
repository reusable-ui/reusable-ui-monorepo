// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
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
    // a collection of TypeScript type utilities, assertions, and validations for ensuring type safety in reusable UI components:
    type NoForeignProps,
    
    
    
    // a set of numeric utility functions:
    clamp,
    
    
    
    // react helper hooks:
    useTriggerRender,
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
    useScheduleTriggerEvent,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    usePropReadOnly,
    
    
    
    // a capability of UI to capture the mouse/touch event inside & outside the UI itself:
    usePointerCapturable,
    
    
    
    // a capability of UI to rotate its layout:
    type OrientationableProps,
    useOrientationable,
    
    
    
    // a capability of UI to be focused:
    useFocusable,
    
    
    
    // adds an interactive feel to a UI:
    useInteractable,
    
    
    
    // a capability of UI to be clicked:
    useClickable,
    
    
    
    // a possibility of UI having an invalid state:
    type ValidationDeps,
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
            
            // validations:
            |'required'              // never blank value => not supported
            
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
            |'type'                  // always [type="range"]
            |'placeholder'|'autoComplete'|'autoCapitalize'|'list' // text hints are not supported
            
            // values:
            |'defaultValue'|'value'  // only supports numeric value
        >,
        
        // variants:
        OrientationableProps,
        
        // components:
        RangeSubComponentProps
{
    // validations:
    min               ?: number       // redefine `min` to support `number` type only
    max               ?: number       // redefine `max` to support `number` type only
    step              ?: number|'any' // redefine `step` to support `number` type and 'any' string only
    
    
    
    // values:
    defaultValue      ?: number
    value             ?: number
}
const Range = <TElement extends Element = HTMLDivElement>(props: RangeProps<TElement>): JSX.Element|null => {
    // props:
    const {
        // refs:
        outerRef,
        elmRef,
        
        
        
        // variants:
        orientation : _orientation,  // remove
        
        
        
        // classes:
        variantClasses,
        stateClasses,
        
        
        
        // styles:
        style,
        
        
        
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
        defaultValue : defaultUncontrollableValueRaw,
        value        : controllableValueRaw,
        onChange, // forwards to `input[type]`
        
        
        
        // validations:
        enableValidation,
        isValid,
        inheritValidation,
        validationDeps      : validationDepsOverwrite,
        
        validDelay,
        invalidDelay,
        noValidationDelay,
        
        min                 = 0,
        max                 = 100,
        step : stepRaw      = 1,
        
        
        
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
        
        
        
        // handlers:
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave,
        onAnimationStart,
        onAnimationEnd,
        onMouseDown,
        onTouchStart,
        onKeyDown,
        
        
        
        // other props:
        ...restRangeProps
    } = props;
    
    const step            : number  = (stepRaw === 'any') ? 0 : Math.abs(stepRaw);
    const isReversedRange : boolean = (max < min);
    
    const appendValidationDeps   = useEvent<ValidationDeps>((bases) => [
        ...bases,
        
        /*
            Since we use <EditableControl> as a wrapper,
            and we don't pass the `required` prop to the <EditableControl>,
            and the <Range> doesn't support the `required` prop,
            we don't need to apply the `required` prop here.
        */
        
        // additional props that influences the validityState (for <Range>):
        
        // validations:
        min,
        max,
        step,
    ]);
    const mergedValidationDeps   = useEvent<ValidationDeps>((bases) => {
        // conditions:
        if (validationDepsOverwrite) return validationDepsOverwrite(appendValidationDeps(bases));
        return appendValidationDeps(bases);
    });
    
    
    
    // styles:
    const styles                 = useRangeStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const isOrientationBlock     = orientationableVariant.isOrientationBlock;
    const isOrientationVertical  = orientationableVariant.isOrientationVertical;
    
    
    
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
    
    
    
    // fn props:
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);
    const propEditable   = propEnabled && !propReadOnly;
    
    
    
    // capabilities:
    const pointerCapturable = usePointerCapturable<TElement>({
        enabled : propEditable,
        onPointerCaptureMove(event) {
            // conditions:
            const track = trackRefInternal.current;
            const thumb = thumbRefInternal.current;
            if (!track) return;
            if (!thumb) return;
            
            
            
            const style        = getComputedStyle(track);
            const borderStart  = (Number.parseInt(isOrientationVertical ? style.borderTopWidth : style.borderLeftWidth) || 0 /* NaN => 0 */);
            const paddingStart = (Number.parseInt(isOrientationVertical ? style.paddingTop     : style.paddingLeft    ) || 0 /* NaN => 0 */);
            const paddingEnd   = (Number.parseInt(isOrientationVertical ? style.paddingBottom  : style.paddingRight   ) || 0 /* NaN => 0 */);
            const thumbSize    =  (isOrientationVertical ? thumb.offsetHeight : thumb.offsetWidth);
            const trackSize    = ((isOrientationVertical ? track.clientHeight : track.clientWidth) - paddingStart - paddingEnd - thumbSize);
            
            const rect         = track.getBoundingClientRect();
            const cursorStart  = (isOrientationVertical ? event.clientY : event.clientX) - (isOrientationVertical ? rect.top : rect.left) - borderStart - paddingStart - (thumbSize / 2);
            // if ((cursorStart < 0) || (cursorStart > trackSize)) return; // setValueRatio will take care of this
            
            let valueRatio     = cursorStart / trackSize;
            if (isOrientationVertical || (style.direction === 'rtl')) valueRatio = (1 - valueRatio); // reverse the ratio from end
            
            changeValue('setValueRatio', valueRatio);
            
            
            
            // indicates the <Range> is currently being pressed/touched
            switch(event.type) {
                case 'mousedown':
                    clickableState.handleMouseDown({
                        ...event,
                        nativeEvent : event,
                    } as unknown as React.MouseEvent<TElement>);
                    break;
                case 'touchstart':
                    clickableState.handleTouchStart({
                        ...event,
                        nativeEvent : event,
                    } as unknown as React.TouchEvent<TElement>);
                    break;
            } // switch
        },
    });
    
    
    
    // refs:
    const rangeRefInternal    = useRef<TElement|null>(null);
    const inputRefInternal    = useRef<HTMLInputElement|null>(null);
    const trackRefInternal    = useRef<HTMLElement|null>(null);
    const thumbRefInternal    = useRef<HTMLElement|null>(null);
    
    const mergedRangeRef      = useMergeRefs(
        // preserves the original `outerRef` from `props`:
        outerRef,
        
        
        
        rangeRefInternal,
    );
    const mergedInputRef      = useMergeRefs(
        // preserves the original `elmRef` from `props`:
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
    const trimValue = useEvent(<TOpt extends number|null|undefined>(value: number|TOpt): number|TOpt => {
        return clamp(min, value, max, step);
    });
    
    
    
    // fn props:
    const controllableValue          : number|undefined = trimValue(controllableValueRaw);
    const defaultUncontrollableValue : number|undefined = trimValue(defaultUncontrollableValueRaw);
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
    
    
    
    // source of truth:
    const valueRef         = useRef<number>(/*initialState: */controllableValue ?? defaultUncontrollableValue ?? (min + ((max - min) * 0.5)));
    if (controllableValue !== undefined) valueRef.current = controllableValue; //   controllable component mode: update the source_of_truth on every_re_render -- on every [value] prop changes
    const [triggerRender]  = useTriggerRender();                               // uncontrollable component mode: update the source_of_truth when modified internally by internal component(s)
    const valueRatio       : number = (valueRef.current - min) / (max - min);
    
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
                
                value = trimValue(min + ((max - min) * valueRatio));
            } break;
            
            case 'decrease' : {
                value = trimValue(value - ((step || 1) * (isReversedRange ? -1 : 1) * amount));
            } break;
            case 'increase' : {
                value = trimValue(value + ((step || 1) * (isReversedRange ? -1 : 1) * amount));
            } break;
        } // switch
        
        
        
        // trigger `onChange` if the value changed:
        if (valueRef.current !== value) {
            const oldValue = valueRef.current; // react *hack* get_prev_value *before* modifying (by any re-render => fully controllable `value = valueRef.current`)
            
            
            
            if (controllableValue === undefined) { // uncontrollable component mode: update the source_of_truth when modified internally by internal component(s)
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
    const mergedVariantClasses    = useMergeClasses(
        // preserves the original `variantClasses` from `props`:
        variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
    );
    const mergedStateClasses      = useMergeClasses(
        // preserves the original `stateClasses` from `props`:
        stateClasses,
        
        
        
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
    const valueRatioStyle         = useMemo<React.CSSProperties>(() => ({
        // values:
        [
            rangeVars.valueRatio
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : valueRatio,
    }), [rangeVars.valueRatio, valueRatio]);
    const mergedStyle             = useMergeStyles(
        // values:
        valueRatioStyle,
        
        
        
        // preserves the original `style` (can overwrite the `valueRatioStyle`) from `props`:
        style,
    );
    const mergedTrackStyle        = useMergeStyles(
        // preserves the original `trackStyle` from `props`:
        trackStyle,
        
        
        
        // preserves the original `style` from `trackComponent` (can overwrite the `trackStyle`):
        trackComponent.props.style,
    );
    const mergedTrackLowerStyle   = useMergeStyles(
        // preserves the original `trackLowerStyle` from `props`:
        trackLowerStyle,
        
        
        
        // preserves the original `style` from `trackLowerComponent` (can overwrite the `trackLowerStyle`):
        trackLowerComponent.props.style,
    );
    const mergedTrackUpperStyle   = useMergeStyles(
        // preserves the original `trackUpperStyle` from `props`:
        trackUpperStyle,
        
        
        
        // preserves the original `style` from `trackUpperComponent` (can overwrite the `trackUpperStyle`):
        trackUpperComponent.props.style,
    );
    const mergedThumbStyle        = useMergeStyles(
        // preserves the original `thumbStyle` from `props`:
        thumbStyle,
        
        
        
        // preserves the original `style` from `thumbComponent` (can overwrite the `thumbStyle`):
        thumbComponent.props.style,
    );
    
    
    
    // handlers:
    const handleFocus             = useMergeEvents(
        // preserves the original `onFocus` from `props`:
        onFocus,
        
        
        
        // states:
        focusableState.handleFocus,
    );
    const handleBlur              = useMergeEvents(
        // preserves the original `onBlur` from `props`:
        onBlur,
        
        
        
        // states:
        focusableState.handleBlur,
    );
    const handleMouseEnter        = useMergeEvents(
        // preserves the original `onMouseEnter` from `props`:
        onMouseEnter,
        
        
        
        // states:
        interactableState.handleMouseEnter,
    );
    const handleMouseLeave        = useMergeEvents(
        // preserves the original `onMouseLeave` from `props`:
        onMouseLeave,
        
        
        
        // states:
        interactableState.handleMouseLeave,
    );
    const handleAnimationStart    = useMergeEvents(
        // preserves the original `onAnimationStart` from `props`:
        onAnimationStart,
        
        
        
        // states:
        focusableState.handleAnimationStart,
        interactableState.handleAnimationStart,
        clickableState.handleAnimationStart,
    );
    const handleAnimationEnd      = useMergeEvents(
        // preserves the original `onAnimationEnd` from `props`:
        onAnimationEnd,
        
        
        
        // states:
        focusableState.handleAnimationEnd,
        interactableState.handleAnimationEnd,
        clickableState.handleAnimationEnd,
    );
    
    const handleKeyboardSlide     = useEvent<React.KeyboardEventHandler<TElement>>((event) => {
        // conditions:
        if (!propEditable)          return; // control is disabled or readOnly => no response required
        
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        /* note: the `code` may `undefined` on autoComplete */
        const keyCode = (event.code as string|undefined)?.toLowerCase();
        if (!keyCode) return; // ignores [unidentified] key
        
        
        
        if (((): boolean => {
            const isRtl   = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                    (keyCode === 'pagedown'  )) changeValue('decrease', 1  );
            else if (                                    (keyCode === 'pageup'    )) changeValue('increase', 1  );
            
            else if (                                    (keyCode === 'home'      )) changeValue('setValue', min);
            else if (                                    (keyCode === 'end'       )) changeValue('setValue', max);
            
            else if ( isOrientationVertical &&           (keyCode === 'arrowdown' )) changeValue('decrease', 1  );
            else if ( isOrientationVertical &&           (keyCode === 'arrowup'   )) changeValue('increase', 1  );
            
            else if (!isOrientationVertical && !isRtl && (keyCode === 'arrowleft' )) changeValue('decrease', 1  );
            else if (!isOrientationVertical && !isRtl && (keyCode === 'arrowright')) changeValue('increase', 1  );
            
            else if (!isOrientationVertical &&  isRtl && (keyCode === 'arrowright')) changeValue('decrease', 1  );
            else if (!isOrientationVertical &&  isRtl && (keyCode === 'arrowleft' )) changeValue('increase', 1  );
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            clickableState.handleKeyDown(event); // indicates the <Range> is currently being key pressed
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    });
    
    const handleMouseDown         = useMergeEvents(
        // preserves the original `onMouseDown` from `props`:
        onMouseDown,
        
        
        
        // capabilities:
        pointerCapturable.handleMouseDown,
    );
    const handleTouchStart        = useMergeEvents(
        // preserves the original `onTouchStart` from `props`:
        onTouchStart,
        
        
        
        // capabilities:
        pointerCapturable.handleTouchStart,
    );
    const handleKeyDown           = useMergeEvents(
        // preserves the original `onKeyDown` from `props`:
        onKeyDown,
        
        
        
        // range handlers:
        handleKeyboardSlide, // update the keyboard arrow keys
        
        
        
        // states:
        focusableState.handleKeyDown,
    );
    
    const handleChange            = useMergeEvents(
        // preserves the original `onChange` from `props`:
        onChange,
        
        
        
        // dummy:
        handleChangeDummy, // just for satisfying React of controllable <input>
    );
    
    
    
    // default props:
    const {
        // semantics:
        tag                                  = 'div',
        role                                 = 'slider',
        
        'aria-orientation' : ariaOrientation = orientationableVariant['aria-orientation'],
        'aria-valuenow'    : ariaValueNow    = valueRef.current,
        'aria-valuemin'    : ariaValueMin    = (isReversedRange ? max : min),
        'aria-valuemax'    : ariaValueMax    = (isReversedRange ? min : max),
        
        
        
        // variants:
        nude                                 = true,
        theme                                = 'primary',
        mild                                 = false,
        
        
        
        // classes:
        mainClass                            = styles.main,
        
        
        
        // other props:
        ...restEditableControlProps
    } = restRangeProps satisfies NoForeignProps<typeof restRangeProps, EditableControlProps<TElement>>;
    
    const mildAlternate  = !mild;
    
    const {
        // variants:
        theme             : thumbComponentTheme             = theme,
        mild              : thumbComponentMild              = mildAlternate,
        
        
        
        // accessibilities:
        inheritEnabled    : thumbComponentInheritEnabled    = true,
        inheritReadOnly   : thumbComponentInheritReadOnly   = true,
        inheritActive     : thumbComponentInheritActive     = true,
        
        focused           : thumbComponentFocused           = focusableState.focused, // if the <Range> got focus => the <Thumb> has focus indicator too
        tabIndex          : thumbComponentTabIndex          = -1,                     // focus on the whole <Range>, not the <Thumb>
        
        
        
        // states:
        arrived           : thumbComponentArrived           = interactableState.arrived,
        pressed           : thumbComponentPressed           = clickableState.pressed,
        
        
        
        // validations:
        enableValidation  : thumbComponentEnableValidation  = enableValidation,
        isValid           : thumbComponentIsValid           = isValid,
        inheritValidation : thumbComponentInheritValidation = inheritValidation,
        
        validDelay        : thumbComponentValidDelay        = validDelay,
        invalidDelay      : thumbComponentInvalidDelay      = invalidDelay,
        noValidationDelay : thumbComponentNoValidationDelay = noValidationDelay,
    } = thumbComponent.props;
    
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
            theme             : thumbComponentTheme,
            mild              : thumbComponentMild,
            
            
            
            // classes:
            classes           : mergedThumbClasses,
            
            
            
            // styles:
            style             : mergedThumbStyle,
            
            
            
            // accessibilities:
            inheritEnabled    : thumbComponentInheritEnabled,
            inheritReadOnly   : thumbComponentInheritReadOnly,
            inheritActive     : thumbComponentInheritActive,
            
            focused           : thumbComponentFocused,
            tabIndex          : thumbComponentTabIndex,                     
            
            
            
            // states:
            arrived           : thumbComponentArrived,
            pressed           : thumbComponentPressed,
            
            
            
            // validations:
            enableValidation  : thumbComponentEnableValidation,
            isValid           : thumbComponentIsValid,
            inheritValidation : thumbComponentInheritValidation,
            
            validDelay        : thumbComponentValidDelay,
            invalidDelay      : thumbComponentInvalidDelay,
            noValidationDelay : thumbComponentNoValidationDelay,
        },
    );
    
    const {
        // variants:
        mild              : trackComponentMild              = mild,
        
        
        
        // accessibilities:
        inheritEnabled    : trackComponentInheritEnabled    = true,
        inheritReadOnly   : trackComponentInheritReadOnly   = true,
        inheritActive     : trackComponentInheritActive     = true,
        
        tabIndex          : trackComponentTabIndex          = -1,   // focus on the whole <Range>, not the <Track>
        
        
        
        // states:
        arrived           : trackComponentArrived           = interactableState.arrived,
        
        
        
        // validations:
        enableValidation  : trackComponentEnableValidation  = enableValidation,
        isValid           : trackComponentIsValid           = isValid,
        inheritValidation : trackComponentInheritValidation = inheritValidation,
        
        validDelay        : trackComponentValidDelay        = validDelay,
        invalidDelay      : trackComponentInvalidDelay      = invalidDelay,
        noValidationDelay : trackComponentNoValidationDelay = noValidationDelay,
        
        
        
        // children:
        children          : trackComponentChildren          = <>
            { isOrientationBlock ? trackUpper : trackLower }
            { thumb }
            { isOrientationBlock ? trackLower : trackUpper }
        </>,
    } = trackComponent.props;
    
    const track      = React.cloneElement<EditableControlProps<Element>>(trackComponent,
        // props:
        {
            // refs:
            elmRef            : mergedTrackRef,
            
            
            
            // variants:
            mild              : trackComponentMild,
            
            
            
            // classes:
            classes           : mergedTrackClasses,
            
            
            
            // styles:
            style             : mergedTrackStyle,
            
            
            
            // accessibilities:
            inheritEnabled    : trackComponentInheritEnabled,
            inheritReadOnly   : trackComponentInheritReadOnly,
            inheritActive     : trackComponentInheritActive,
            
            tabIndex          : trackComponentTabIndex,
            
            
            
            // states:
            arrived           : trackComponentArrived,
            
            
            
            // validations:
            enableValidation  : trackComponentEnableValidation,
            isValid           : trackComponentIsValid,
            inheritValidation : trackComponentInheritValidation,
            
            validDelay        : trackComponentValidDelay,
            invalidDelay      : trackComponentInvalidDelay,
            noValidationDelay : trackComponentNoValidationDelay,
        },
        
        
        
        // children:
        trackComponentChildren,
    );
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // refs:
            outerRef={mergedRangeRef}
            
            
            
            // semantics:
            tag ={tag}
            role={role}
            
            aria-orientation={ariaOrientation}
            aria-valuenow   ={ariaValueNow}
            aria-valuemin   ={ariaValueMin}
            aria-valuemax   ={ariaValueMax}
            
            
            
            // variants:
            nude={nude}
            theme={theme}
            mild={mild}
            
            
            
            // classes:
            mainClass={mainClass}
            variantClasses={mergedVariantClasses}
            stateClasses={mergedStateClasses}
            
            
            
            // styles:
            style={mergedStyle}
            
            
            
            // validations:
            enableValidation={enableValidation}
            isValid={isValid}
            inheritValidation={inheritValidation}
            validationDeps={mergedValidationDeps}
            
            validDelay={validDelay}
            invalidDelay={invalidDelay}
            noValidationDelay={noValidationDelay}
            
            
            
            // handlers:
            onFocus          = {handleFocus         }
            onBlur           = {handleBlur          }
            onMouseEnter     = {handleMouseEnter    }
            onMouseLeave     = {handleMouseLeave    }
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
            
            onMouseDown      = {handleMouseDown     }
            // // onMouseMove      = {handleMouseMove     }
            
            onTouchStart     = {handleTouchStart    }
            // // onTouchMove      = {handleTouchMove     }
            
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
                 // defaultValue : defaultUncontrollableValue, // fully controllable, no defaultValue
                    value        : valueRef.current,           // fully controllable
                    onChange     : handleChange,
                }}
                
                
                
                // validations:
                {...{
                    min  : isReversedRange ? max : min,
                    max  : isReversedRange ? min : max,
                    step : step,
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
    Range,            // named export for readibility
    Range as default, // default export to support React.lazy
}
