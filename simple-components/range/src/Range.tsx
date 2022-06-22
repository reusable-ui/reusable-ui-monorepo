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
    // types:
    Optional,
}                           from '@cssfn/types'
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                         // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'                       // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'                 // a border (stroke) management system
import {
    // styles:
    stripoutTextbox,
}                           from '@reusable-ui/stripouts'               // removes browser's default stylesheet
import {
    // styles:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
}                           from '@reusable-ui/layouts'                 // reusable common layouts
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'                   // react helper hooks
import {
    // utilities:
    parseNumber,
}                           from '@reusable-ui/utilities'               // common utility functions
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities'         // an accessibility management system
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'                 // a complement component
import {
    // types:
    FeatureMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationRuleOptions,
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    ifNude,
    gradientOf,
    ifNotOutlined,
    outlinedOf,
    usesBackg,
    usesBorder,
    extendsBorder,
    usesPadding,
    extendsPadding,
}                           from '@reusable-ui/basic'                   // a base component
import {
    // hooks:
    useFocusBlurState,
    useArriveLeaveState,
}                           from '@reusable-ui/control'                 // a base component
import {
    // hooks:
    usePressReleaseState,
}                           from '@reusable-ui/action-control'          // a base component
import {
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'        // a base component
import {
    // react components:
    EditableActionControl,
    EditableActionControlProps,
}                           from '@reusable-ui/editable-action-control' // a base component
import type {
    // types:
    InputHTMLAttributes,
}                           from '@reusable-ui/input'                   // a neighbor component
import {
    // rules:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    
    
    
    // hooks:
    usesContainer,
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
}                           from '@reusable-ui/container'               // a neighbor component

// other libs:
import {
    default as triggerChange,
    // @ts-ignore
}                           from 'react-trigger-change'                 // a helper lib



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;
//#endregion orientation

//#region range
export interface RangeVars {
    /**
     * Range's thumb ratio.
     */
    valueRatio : any
    
    /**
     * final background layers of the Range.
     */
    backg      : any
}
const [rangeVars] = cssVar<RangeVars>({ minify: false, prefix: 'range' }); // do not minify to make sure `style={{ --range-valueRatio: ... }}` is the same between in server (without `useRangeStyleSheet` rendered) & client (with `useRangeStyleSheet` rendered)

/**
 * Uses Range variables.
 * @returns A `FeatureMixin<RangeVars>` represents Range variables definitions.
 */
export const usesRange = (): FeatureMixin<RangeVars> => {
    // dependencies:
    
    // backgrounds:
    const [, backgs] = usesBackg();
    
    
    
    return [
        () => style({
            ...vars({
                [rangeVars.backg] : backgs.backg,
            }),
        }),
        rangeVars,
    ];
};
//#endregion range



// styles:
export const inputElm      = ':first-child';
export const trackElm      = '.track';
export const trackLowerElm = '.tracklower';
export const trackUpperElm = '.trackupper';
export const thumbElm      = '.thumb';

export const usesRangeLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(options);
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector}&`;
    
    
    
    // dependencies:
    
    // borders:
    const [         , borders  ] = usesBorder();
    
    // range:
    const [rangeRule, rangeVars] = usesRange();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
            
            // range:
            rangeRule,
        ]),
        ...style({
            // layouts:
            ...rule(orientationInlineSelector, { // inline
                display       : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...rule(orientationBlockSelector,  { // block
                display       : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'start',  // if range is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the range's first part should be visible first
            alignItems        : 'center', // default center items vertically
            flexWrap          : 'nowrap', // prevents the range to wrap to the next row
            
            
            
            // positions:
            verticalAlign     : 'baseline', // range's text should be aligned with sibling text, so the range behave like <span> wrapper
            
            
            
            // children:
            ...rule(orientationInlineSelector, { // inline
                ...children('::before', {
                    ...imports([
                        // layouts:
                        fillTextLineHeightLayout(), // adjust the <Range>'s height, the width is block (fills the entire parent's width)
                    ]),
                }),
            }),
            ...rule(orientationBlockSelector,  { // block
                ...children('::before', {
                    ...imports([
                        // layouts:
                        fillTextLineWidthLayout(), // adjust the <Range>'s width, the height is based on <Range>'s config
                    ]),
                }),
            }),
            
            ...children(inputElm, {
                // layouts:
                display: 'none', // hide the input
            }),
            
            ...children(trackElm, {
                ...imports([
                    // borders:
                    usesBorderAsContainer({ // make a nicely rounded corners
                        orientationInlineSelector : parentOrientationInlineSelector,
                        orientationBlockSelector  : parentOrientationBlockSelector,
                    }),
                ]),
                ...style({
                    // layouts:
                    display        : 'flex',    // use block flexbox, so it takes the entire Range's width
                    flexDirection  : 'inherit', // customizable orientation // inherit to parent flexbox
                    justifyContent : 'start',   // if thumb is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the thumb's first part should be visible first
                    alignItems     : 'center',  // center thumb vertically
                    flexWrap       : 'nowrap',  // no wrapping
                    
                    
                    
                    // sizes:
                    boxSizing      : 'border-box',     // the final size is including borders & paddings
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    
                    
                    
                    // animations:
                    boxShadow      : ['initial', '!important'], // no focus animation
                    
                    
                    
                    // children:
                    ...children([trackLowerElm, trackUpperElm], {
                        // layouts:
                        display    : 'inline-block', // use inline-block, so it takes the width & height as we set
                        
                        
                        
                        // backgrounds:
                        backg      : rangeVars.backg,
                        
                        
                        
                        // borders:
                        
                        // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                        ...extendsBorder(),
                        
                        // remove rounded corners on top:
                        [borders.borderStartStartRadius] : '0px',
                        [borders.borderStartEndRadius  ] : '0px',
                        // remove rounded corners on bottom:
                        [borders.borderEndStartRadius  ] : '0px',
                        [borders.borderEndEndRadius    ] : '0px',
                        
                        
                        
                        // sizes:
                        alignSelf  : 'stretch', // follows parent's height
                    }),
                    ...children(trackLowerElm, {
                        // sizes:
                        flex       : [[rangeVars.valueRatio, rangeVars.valueRatio, 0]], // growable, shrinkable, initial from 0 width; using `valueRatio` for the grow/shrink ratio
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(ranges, 'tracklower')), // apply config's cssProps starting with tracklower***
                    }),
                    ...children(trackUpperElm, {
                        // sizes:
                        flex       : [[`calc(1 - ${rangeVars.valueRatio})`, `calc(1 - ${rangeVars.valueRatio})`, 0]], // growable, shrinkable, initial from 0 width; using `1 - valueRatio` for the grow/shrink ratio
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(ranges, 'trackupper')), // apply config's cssProps starting with trackupper***
                    }),
                    
                    ...children(['&', thumbElm], {
                        // accessibilities:
                        cursor: 'inherit',
                    }),
                    ...children(thumbElm, {
                        // layouts:
                        display   : 'inline-block', // use inline-block, so it takes the width & height as we set
                        
                        
                        
                        // sizes:
                        boxSizing : 'border-box', // the final size is including borders & paddings
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(ranges, 'thumb')), // apply config's cssProps starting with thumb***
                        
                        
                        
                        // borders:
                        
                        // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                        ...extendsBorder({
                            borderRadius  : ranges.thumbBorderRadius,
                        }),
                        
                        
                        
                        // spacings:
                        
                        // let's Reusable-UI system to manage paddingInline & paddingBlock:
                        ...extendsPadding({
                            paddingInline : ranges.thumbPaddingInline,
                            paddingBlock  : ranges.thumbPaddingBlock,
                        }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(ranges, 'track')), // apply config's cssProps starting with track***
                    
                    
                    
                    // borders:
                    
                    // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                    ...extendsBorder({
                        borderRadius  : ranges.trackBorderRadius,
                    }),
                    
                    
                    
                    // spacings:
                    
                    // let's Reusable-UI system to manage paddingInline & paddingBlock:
                    ...extendsPadding({
                        paddingInline : ranges.trackPaddingInline,
                        paddingBlock  : ranges.trackPaddingBlock,
                    }),
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(ranges), // apply config's cssProps
            ...rule(orientationInlineSelector, { // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(ranges, usesSuffixedProps(ranges, 'inline')),
            }),
            ...rule(orientationBlockSelector,  { // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(ranges, usesSuffixedProps(ranges, 'block')),
            }),
        }),
    });
};
export const usesRangeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(ranges);
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
        ...variants([
            ifNude({
                // animations:
                boxShadow : ['initial', '!important'], // no focus animation on slider, but has one in thumb
            }),
        ]),
    });
};
export const usesRangeStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
        ]),
    });
};

export const useRangeStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesRangeLayout(),
        
        // variants:
        usesRangeVariants(),
        
        // states:
        usesRangeStates(),
    ]),
}), { id: 'jue5zxlqsc' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [ranges, rangeValues, cssRangeConfig] = cssConfig(() => {
    return {
        // sizes:
        minInlineSize        : 'unset'              as CssKnownProps['minInlineSize'],
        minBlockSize         : 'unset'              as CssKnownProps['minBlockSize' ],
        
        minInlineSizeBlock   : 'unset'              as CssKnownProps['minInlineSize'],
        minBlockSizeBlock    : '8rem'               as CssKnownProps['minBlockSize' ],
        
        
        
        // accessibilities:
        cursor               : 'col-resize'         as CssKnownProps['cursor'],
        cursorBlock          : 'row-resize'         as CssKnownProps['cursor'],
        
        
        
        trackInlineSize      : 'auto'               as CssKnownProps['inlineSize'],
        trackBlockSize       : '0.4em'              as CssKnownProps['blockSize' ],
        trackBorderRadius    : borderRadiuses.pill  as CssKnownProps['borderRadius'],
        trackPaddingInline   : '0em'                as CssKnownProps['paddingInline'],
        trackPaddingBlock    : '0em'                as CssKnownProps['paddingBlock' ],
        
        trackInlineSizeBlock : '0.4em'              as CssKnownProps['inlineSize'],
        trackBlockSizeBlock  : 'auto'               as CssKnownProps['blockSize' ],
        
        tracklowerFilter     : [[
            'contrast(1.5)',
            'saturate(0.75)',
        ]]                                          as CssKnownProps['filter'],
        trackupperFilter     : [[
            'contrast(1.5)',
            'invert(0.5)',
            'saturate(0)',
        ]]                                          as CssKnownProps['filter'],
        
        
        
        thumbInlineSize      : '1em'                as CssKnownProps['inlineSize'],
        thumbBlockSize       : '1em'                as CssKnownProps['blockSize' ],
        thumbBorderRadius    : borderRadiuses.pill  as CssKnownProps['borderRadius'],
        thumbPaddingInline   : '0em'                as CssKnownProps['paddingInline'],
        thumbPaddingBlock    : '0em'                as CssKnownProps['paddingBlock' ],
    };
}, { prefix: 'rnge' });



// react components:
export interface RangeProps
    extends
        // bases:
        EditableActionControlProps<HTMLInputElement>,
        
        // input[type="range"]:
        Omit<InputHTMLAttributes<HTMLInputElement>, 'role'|'size'|'pattern'|'type'|'placeholder'|'autoComplete'|'list'|'required'|'minLength'|'maxLength'>,
        
        // layouts:
        OrientationVariant
{
    // refs:
    trackRef          ?: React.Ref<HTMLElement> // setter ref
    trackLowerRef     ?: React.Ref<HTMLElement> // setter ref
    trackUpperRef     ?: React.Ref<HTMLElement> // setter ref
    thumbRef          ?: React.Ref<HTMLElement> // setter ref
    
    
    
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
    
    
    
    // validations:
    min               ?: string | number
    max               ?: string | number
    step              ?: string | number
}
const Range = (props: RangeProps): JSX.Element|null => {
    // styles:
    const styleSheet            = useRangeStyleSheet();
    
    
    
    // variants:
    const orientationVariant    = useOrientationVariant(props);
    const isOrientationVertical = (orientationVariant.class === 'block');
    
    
    
    // states:
    const focusBlurState        = useFocusBlurState<HTMLInputElement>(props);
    const arriveLeaveState      = useArriveLeaveState<HTMLInputElement>(props, focusBlurState);
    const pressReleaseState     = usePressReleaseState<HTMLInputElement>(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
        // refs:
        elmRef,
        
        trackRef,
        trackLowerRef,
        trackUpperRef,
        thumbRef,
        
        
        
        // classes:
        trackClasses,
        trackLowerClasses,
        trackUpperClasses,
        thumbClasses,
        
        
        
        // styles:
        trackStyle,
        trackLowerStyle,
        trackUpperStyle,
        thumbStyle,
        
        
        
        // still on <EditableControl> element
        // // accessibilities:
        // autoFocus,
        // tabIndex,
        // enterKeyHint,
        
        
        
        // forms:
        name,
        form,
        
        
        
        // values:
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        
        
        // validations:
        min,
        max,
        step,
    ...restEditableControlProps}  = props;
    
    
    
    // fn props:
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);
    
    const nude           = props.nude  ?? true;
    const theme          = props.theme ?? 'primary';
    const mild           = props.mild  ?? false;
    const mildAlternate  = nude ? mild : !mild;
    
    const minFn          : number      = parseNumber(min)  ?? 0;
    const maxFn          : number      = parseNumber(max)  ?? 100;
    const stepFn         : number      = (step === 'any') ? 0 : Math.abs(parseNumber(step) ?? 1);
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
    const trimValueOpt = (value: number|null|undefined): number|null => {
        // conditions:
        if ((value === null) || (value === undefined)) return null;
        
        
        
        return trimValue(value);
    };
    
    
    
    // fn props:
    const valueFn        : number|null = trimValueOpt(parseNumber(value));
    const defaultValueFn : number      = (
        trimValueOpt(parseNumber(defaultValue))
        ??
        (minFn + ((maxFn - minFn) / 2))
    );
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const trackRefInternal = useRef<HTMLElement|null>(null);
    const thumbRefInternal = useRef<HTMLElement|null>(null);
    
    
    
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
    
    const [valueDn, setValueDn] = useReducer(valueDnReducer, /*initialState: */valueFn ?? defaultValueFn);
    
    
    
    // fn props:
    const valueNow   : number = valueFn /*controllable*/ ?? valueDn /*uncontrollable*/;
    const valueRatio : number = (valueNow - minFn) / (maxFn - minFn);
    
    
    
    // dom effects:
    // watchdog for slider change by user:
    const prevValueDn = useRef<number>(valueDn);
    useEffect(() => {
        // conditions:
        const inputElm = inputRefInternal.current;
        if (!inputElm) return;
        
        if (prevValueDn.current === valueDn) return;
        prevValueDn.current = valueDn;
        
        
        
        // sync the hidden <input type="range">'s value:
        inputElm.valueAsNumber = valueDn;
        triggerChange(inputElm);
    }, [valueDn]);
    
    
    
    // classes:
    const mergedTrackLowerClasses = useMergeClasses(
        // preserves the original `trackLowerClasses`:
        trackLowerClasses,
        
        
        
        // id:
        'tracklower'
    );
    const mergedTrackUpperClasses = useMergeClasses(
        // preserves the original `trackUpperClasses`:
        trackUpperClasses,
        
        
        
        // id:
        'trackupper'
    );
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationVariant.class,
    );
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // accessibilities:
        focusBlurState.class,
        arriveLeaveState.class,
    );
    
    
    
    // styles:
    const [, rangeVars] = usesRange();
    const mergedStyle = useMemo(() => ({
        // values:
        [rangeVars.valueRatio] : valueRatio,
        
        
        
        // preserves the original `style` (can overwrite the `[rangeVars.valueRatio]`):
        ...(style ?? {}),
    }), [rangeVars.valueRatio, valueRatio, style]);
    
    
    
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
    
    const handleMouseSlider    = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (!propEnabled)           return; // control is disabled => no response required
        if (propReadOnly)           return; // control is readOnly => no response required
        
        if (event.defaultPrevented) return;
        if (event.buttons !== 1)    return; // only handle left_click only
        
        const track = trackRefInternal.current;
        const thumb = thumbRefInternal.current;
        if (!track)                 return;
        if (!thumb)                 return;
        
        
        
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
        
        setValueDn({ type: 'setValueRatio', payload: valueRatio });
        
        
        
        thumb.focus(); // turn on focus indicator on the thumb
        pressReleaseState.handleMouseDown(event); // indicates the <Range> is currently being pressed/touched
        event.preventDefault(); // prevents the whole page from scrolling when the user slides the <Range>
    }, [propEnabled, propReadOnly, isOrientationVertical]);
    const handleTouchSlider    = useEvent<React.TouchEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.touches.length !== 1) return;
        
        
        
        // simulates the touch as sliding mouse:
        handleMouseSlider({
            defaultPrevented : event.defaultPrevented,
            preventDefault   : event.preventDefault,
            
            currentTarget    : event.currentTarget,
            
            buttons          : 1, // simulate left_click
            clientX          : event.touches[0].clientX,
            clientY          : event.touches[0].clientY,
        } as React.MouseEvent<HTMLInputElement, MouseEvent>);
    }, [handleMouseSlider]);
    const handleKeyboardSlider = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (!propEnabled)           return; // control is disabled => no response required
        if (propReadOnly)           return; // control is readOnly => no response required
        
        if (event.defaultPrevented) return;
        
        const thumb = thumbRefInternal.current;
        if (!thumb)                 return;
        
        
        
        if (((): boolean => {
            const isKeyOf = (key: string): boolean => {
                return ((event.key.toLowerCase() === key) || (event.code.toLowerCase() === key));
            };
            const isRtl = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (!isOrientationVertical &&           isKeyOf('pagedown'  )) setValueDn({ type: 'decrease', payload: 1     });
            else if (!isOrientationVertical &&           isKeyOf('pageup'    )) setValueDn({ type: 'increase', payload: 1     });
            
            else if ( isOrientationVertical &&           isKeyOf('arrowdown' )) setValueDn({ type: 'decrease', payload: 1     });
            else if ( isOrientationVertical &&           isKeyOf('arrowup'   )) setValueDn({ type: 'increase', payload: 1     });
            
            else if (!isOrientationVertical && !isRtl && isKeyOf('arrowleft' )) setValueDn({ type: 'decrease', payload: 1     });
            else if (!isOrientationVertical && !isRtl && isKeyOf('arrowright')) setValueDn({ type: 'increase', payload: 1     });
            
            else if (!isOrientationVertical &&  isRtl && isKeyOf('arrowright')) setValueDn({ type: 'decrease', payload: 1     });
            else if (!isOrientationVertical &&  isRtl && isKeyOf('arrowleft' )) setValueDn({ type: 'increase', payload: 1     });
            
            else if (                                    isKeyOf('home'      )) setValueDn({ type: 'setValue', payload: minFn });
            else if (                                    isKeyOf('end'       )) setValueDn({ type: 'setValue', payload: maxFn });
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            thumb.focus(); // turn on focus indicator on the thumb
            pressReleaseState.handleKeyDown(event); // indicates the <Range> is currently being key pressed
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    }, [propEnabled, propReadOnly, isOrientationVertical, minFn, maxFn]);
    
    
    
    // jsx fn props:
    const trackLower = (
        <Generic<HTMLElement>
            // refs:
            elmRef={trackLowerRef}
            
            
            
            // classes:
            classes={mergedTrackLowerClasses}
            
            
            
            // styles:
            style={trackLowerStyle}
        />
    );
    const trackUpper = (
        <Generic<HTMLElement>
            // refs:
            elmRef={trackUpperRef}
            
            
            
            // classes:
            classes={mergedTrackUpperClasses}
            
            
            
            // styles:
            style={trackUpperStyle}
        />
    );
    
    
    
    // jsx:
    return (
        <EditableControl<HTMLInputElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // semantics:
            tag ={props.tag  ?? 'div'   }
            role={props.role ?? 'slider'}
            
            aria-orientation={props['aria-orientation'] ?? (isOrientationVertical ? 'vertical' : 'horizontal')}
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
            
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)} // aliasing [disabled] => ![enabled]
            
            
            
            // handlers:
            onFocus        = {handleFocus       }
            onBlur         = {handleBlur        }
            onMouseEnter   = {handleMouseEnter  }
            onMouseLeave   = {handleMouseLeave  }
            onAnimationEnd = {handleAnimationEnd}
        >
            <input
                // refs:
                ref={elmRef}
                
                
                
                // accessibilities:
                {...{
                    autoFocus,
                    tabIndex,
                    enterKeyHint,
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value if readOnly
                
                
                
                // forms:
                {...{
                    name,
                    form,
                }}
                
                
                
                // values:
                {...{
                    defaultValue,
                    value,
                    onChange,
                }}
                
                
                
                // validations:
                {...{
                    min,
                    max,
                    step,
                }}
            />
        </EditableControl>
    );
};
export {
    Range,
    Range as default,
}

export type { OrientationName, OrientationVariant }
