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
}                           from '@cssfn/types'                         // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    rule,
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
    cssVars,
}                           from '@cssfn/css-vars'                      // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'                 // a border (stroke) management system
import {
    // styles:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
}                           from '@reusable-ui/layouts'                 // reusable common layouts
import {
    // utilities:
    parseNumber,
}                           from '@reusable-ui/utilities'               // common utility functions
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
}                           from '@reusable-ui/hooks'                   // react helper hooks
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities'         // an accessibility management system

// reusable-ui features:
import {
    // hooks:
    usesBackground,
}                           from '@reusable-ui/background'      // background stuff of UI

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    defaultInlineOrientationableOptions,
    usesOrientationable,
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/orientationable'         // a capability of UI to rotate its layout
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'               // size options of UI
import {
    // hooks:
    mildOf,
}                           from '@reusable-ui/mildable'                // mild (soft color) variant of UI

// reusable-ui components:
import {
    // react components:
    Generic,
}                           from '@reusable-ui/generic'                 // a complement component
import {
    // types:
    FeatureMixin,
    
    
    
    // hooks:
    extendsBorder,
    extendsPadding,
}                           from '@reusable-ui/basic'                   // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'               // a base component
import {
    // hooks:
    markActive as controlMarkActive,
    ifFocus,
    useFocusBlurState,
    ifArrive,
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
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparator,
}                           from '@reusable-ui/container'               // a neighbor component



// hooks:

// layouts:

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
const [rangeVars] = cssVars<RangeVars>({ minify: false, prefix: 'range' }); // do not minify to make sure `style={{ --range-valueRatio: ... }}` is the same between in server (without `useRangeStyleSheet` rendered) & client (with `useRangeStyleSheet` rendered)

/**
 * Uses Range variables.
 * @returns A `FeatureMixin<RangeVars>` represents Range variables definitions.
 */
export const usesRange = (): FeatureMixin<RangeVars> => {
    // dependencies:
    
    // features:
    const {backgroundVars} = usesBackground();
    
    
    
    return [
        () => style({
            ...vars({
                [rangeVars.backg] : backgroundVars.backgColor,
            }),
        }),
        rangeVars,
    ];
};
//#endregion range

// variants:

//#region orientationable
export const defaultOrientationableOptions = defaultInlineOrientationableOptions;
//#endregion orientationable

// states:

//#region activePassive
export const markActive = (): CssRule => style({
    ...imports([
        controlMarkActive(),
        
        mildOf(null), // keeps mild variant
    ]),
});
//#endregion activePassive



// styles:
export const inputElm      = ':first-child'
export const trackElm      = '.track'
export const trackLowerElm = '.tracklower'
export const trackUpperElm = '.trackupper'
export const thumbElm      = '.thumb'

export const usesRangeLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableRules = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock, orientationInlineSelector, orientationBlockSelector} = orientationableRules;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    const ifParentOrientationInline       = (styles: CssStyleCollection) => rule(parentOrientationInlineSelector, styles);
    const ifParentOrientationBlock        = (styles: CssStyleCollection) => rule(parentOrientationBlockSelector , styles);
    
    
    
    // dependencies:
    
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
            ...ifOrientationInline({ // inline
                display       : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...ifOrientationBlock({  // block
                display       : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'start',  // if range is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the range's first part should be visible first
            alignItems        : 'center', // default center items vertically
            flexWrap          : 'nowrap', // prevents the range to wrap to the next row
            
            
            
            // positions:
            verticalAlign     : 'baseline', // <Range>'s text should be aligned with sibling text, so the <Range> behave like <span> wrapper
            
            
            
            // accessibilities:
            touchAction       : 'pinch-zoom', // prevents scrolling by touch, but allows to zoom_in/out
            
            
            
            // children:
            ...ifOrientationInline({ // inline
                ...children('::before', {
                    ...imports([
                        // layouts:
                        fillTextLineHeightLayout(), // adjust the <Range>'s height, the width is block (fills the entire parent's width)
                    ]),
                }),
            }),
            ...ifOrientationBlock({  // block
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
                    boxShadow      : ['none', '!important'], // no shadow & no focus animation
                    
                    
                    
                    // children:
                    ...children([trackLowerElm, trackUpperElm], {
                        ...style({
                            // layouts:
                            display    : 'inline-block', // use inline-block, so it takes the width & height as we set
                            
                            
                            
                            // backgrounds:
                            backg      : rangeVars.backg,
                            
                            
                            
                            // borders:
                            
                            // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                            ...extendsBorder(),
                            ...style({
                                border : 'none', // only setup borderRadius, no borderStroke
                            }),
                            
                            
                            
                            // sizes:
                            alignSelf  : 'stretch', // follows parent's height
                        }),
                        ...imports([
                            // borders:
                            usesBorderAsSeparator({ // must be placed at the last
                                orientationInlineSelector : parentOrientationInlineSelector,
                                orientationBlockSelector  : parentOrientationBlockSelector,
                                itemsSelector             : [trackLowerElm, trackUpperElm],
                            }),
                        ]),
                    }),
                    ...children(trackLowerElm, {
                        // sizes:
                        // the size grows in proportion to the given ratio, starting from the 1/2 size of <thumb>
                        // the size cannot shrink
                        ...ifParentOrientationInline({ // inline
                            flex   : [[rangeVars.valueRatio, 0, `calc(${ranges.thumbInlineSize} / 2)`]], // growable, shrinkable, initial from 0 width; using `valueRatio` for the grow/shrink ratio
                        }),
                        ...ifParentOrientationBlock({  // block
                            flex   : [[rangeVars.valueRatio, 0, `calc(${ranges.thumbBlockSize } / 2)`]], // growable, shrinkable, initial from 0 width; using `valueRatio` for the grow/shrink ratio
                        }),
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(ranges, 'tracklower')), // apply config's cssProps starting with tracklower***
                    }),
                    ...children(trackUpperElm, {
                        // sizes:
                        // the size grows in proportion to the given ratio, starting from the 1/2 size of <thumb>
                        // the size cannot shrink
                        ...ifParentOrientationInline({ // inline
                            flex   : [[`calc(1 - ${rangeVars.valueRatio})`, 0, `calc(${ranges.thumbInlineSize} / 2)`]], // growable, shrinkable, initial from 0 width; using `1 - valueRatio` for the grow/shrink ratio
                        }),
                        ...ifParentOrientationBlock({  // block
                            flex   : [[`calc(1 - ${rangeVars.valueRatio})`, 0, `calc(${ranges.thumbBlockSize } / 2)`]], // growable, shrinkable, initial from 0 width; using `1 - valueRatio` for the grow/shrink ratio
                        }),
                        
                        
                        
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
                        
                        
                        
                        // positions:
                        zIndex    : 1, // the <thumb> should at the top of <trackLower> & <trackUpper>
                        
                        
                        
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
                        
                        // cancel out <thumb>'s size with negative margin,
                        // so the <trackLower> & <trackUpper> can meet on the middle of the <thumb>:
                        marginInline : `calc(0px - (${ranges.thumbInlineSize}) / 2)`,
                        marginBlock  : `calc(0px - (${ranges.thumbBlockSize }) / 2)`,
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
            ...ifOrientationInline({ // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(ranges, usesSuffixedProps(ranges, 'inline')),
            }),
            ...ifOrientationBlock({  // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(ranges, usesSuffixedProps(ranges, 'block')),
            }),
        }),
    });
};
export const usesRangeVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(ranges);
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            resizableRule,
        ]),
    });
};
export const usesRangeStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
        ]),
        ...states([
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
            'brightness(0.9)',
        ]]                                          as CssKnownProps['filter'],
        trackupperFilter     : [[
            'brightness(0.85)',
            'contrast(0.5)',
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
        >,
        
        // variants:
        OrientationableProps
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
    const styleSheet             = useRangeStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const isOrientationBlock     = orientationableVariant.isOrientationBlock;
    
    
    
    // states:
    const focusBlurState         = useFocusBlurState<HTMLInputElement>(props);
    const arriveLeaveState       = useArriveLeaveState<HTMLInputElement>(props, focusBlurState);
    const pressReleaseState      = usePressReleaseState<HTMLInputElement>(props);
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        trackRef,
        trackLowerRef,
        trackUpperRef,
        thumbRef,
        
        
        
        // variants:
        orientation  : _orientation,  // remove
        
        
        
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
        
        
        
        // accessibilities:
        pressed      : _pressed,      // remove
        
        // still on <EditableControl> element
        // autoFocus,
        // tabIndex,
        // enterKeyHint,
        
        
        
        // behaviors:
        actionMouses : _actionMouses, // remove
        actionKeys   : _actionKeys,   // remove
        
        
        
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
    ...restEditableControlProps}  = props;
    
    
    
    // fn props:
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);
    
    const nude           = props.nude  ?? true;
    const theme          = props.theme ?? 'primary';
    const mild           = props.mild  ?? false;
    const mildAlternate  = !mild;
    
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
    const defaultValueFn : number|null = trimValueOpt(parseNumber(defaultValue));
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const trackRefInternal = useRef<HTMLElement|null>(null);
    const thumbRefInternal = useRef<HTMLElement|null>(null);
    
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    const mergedTrackRef   = useMergeRefs(
        // preserves the original `trackRef`:
        trackRef,
        
        
        
        trackRefInternal,
    );
    const mergedThumbRef   = useMergeRefs(
        // preserves the original `thumbRef`:
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
        
        
        
        // *hack*: controllable:
        inputElm.valueAsNumber = valueDn;
        
        // *hack*: trigger `onChange` event:
        inputElm.dispatchEvent(new Event('input', { bubbles: true, cancelable: false, composed: true }));
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
        
        
        
        // accessibilities:
        focusBlurState.class,
        arriveLeaveState.class,
    );
    const mergedTrackClasses      = useMergeClasses(
        // preserves the original `trackClasses`:
        trackClasses,
        
        
        
        // id:
        'track'
    );
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
    const mergedThumbClasses      = useMergeClasses(
        // preserves the original `thumbClasses`:
        thumbClasses,
        
        
        
        // id:
        'thumb'
    );
    
    
    
    // styles:
    const [, rangeVars]   = usesRange();
    const valueRatioStyle = useMemo<React.CSSProperties>(() => ({
        // values:
        [
            rangeVars.valueRatio
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : valueRatio,
    }), [rangeVars.valueRatio, valueRatio]);
    const mergedStyle     = useMergeStyles(
        // values:
        valueRatioStyle,
        
        
        
        // preserves the original `style` (can overwrite the `valueRatioStyle`):
        props.style,
    );
    
    
    
    // handlers:
    const handleFocus         = useMergeEvents(
        // preserves the original `onFocus`:
        props.onFocus,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleFocus,
    );
    const handleBlur          = useMergeEvents(
        // preserves the original `onBlur`:
        props.onBlur,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleBlur,
    );
    const handleMouseEnter    = useMergeEvents(
        // preserves the original `onMouseEnter`:
        props.onMouseEnter,
        
        
        
        // states:
        
        // accessibilities:
        arriveLeaveState.handleMouseEnter,
    );
    const handleMouseLeave    = useMergeEvents(
        // preserves the original `onMouseLeave`:
        props.onMouseLeave,
        
        
        
        // states:
        
        // accessibilities:
        arriveLeaveState.handleMouseLeave,
    );
    const handleAnimationEnd  = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        focusBlurState.handleAnimationEnd,
        arriveLeaveState.handleAnimationEnd,
        pressReleaseState.handleAnimationEnd,
    );
    
    const isMouseActive       = useRef(false);
    const handleMouseActive   = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (!propEnabled)           return; // control is disabled => no response required
        if (propReadOnly)           return; // control is readOnly => no response required
        
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        isMouseActive.current = ((event.buttons & 1) === 1); // only left button is pressed => true
    }, [propEnabled, propReadOnly]);
    
    const isTouchActive       = useRef(false);
    const handleTouchActive   = useEvent<React.TouchEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (!propEnabled)           return; // control is disabled => no response required
        if (propReadOnly)           return; // control is readOnly => no response required
        
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        isTouchActive.current = (event.touches.length === 1); // only touched by single finger => true
        // already handled by css `touch-action: pinch-zoom`
        // event.preventDefault(); // prevents the whole page from scrolling when the user slides the <Range>
        // event.currentTarget.focus(); // un-prevent to focus()
    }, [propEnabled, propReadOnly]);
    
    useEffect(() => {
        // conditions:
        if (!propEnabled)           return; // control is disabled => no response required
        if (propReadOnly)           return; // control is readOnly => no response required
        
        
        
        // handlers:
        const handleMousePassive = (): void => {
            isMouseActive.current = false;
        };
        const handleTouchPassive = (): void => {
            isTouchActive.current = false;
        };
        
        
        
        // setups:
        window.addEventListener('mouseup' , handleMousePassive);
        window.addEventListener('touchend', handleTouchPassive);
        
        
        
        // cleanups:
        return () => {
            window.removeEventListener('mouseup' , handleMousePassive);
            window.removeEventListener('touchend', handleTouchPassive);
        };
    }, [propEnabled, propReadOnly]);
    
    const handleMouseSlide    = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
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
        
        
        
        pressReleaseState.handleMouseDown(event); // indicates the <Range> is currently being pressed/touched
    }, [isOrientationBlock]);
    const handleTouchSlide    = useEvent<React.TouchEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.touches.length !== 1) return; // only single touch
        
        
        
        // simulates the touch as sliding mouse:
        handleMouseSlide({
            clientX : event.touches[0].clientX,
            clientY : event.touches[0].clientY,
        } as React.MouseEvent<HTMLInputElement, MouseEvent>);
    }, [handleMouseSlide]);
    const handleKeyboardSlide = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (!propEnabled)           return; // control is disabled => no response required
        if (propReadOnly)           return; // control is readOnly => no response required
        
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        if (((): boolean => {
            const isKeyOf = (key: string): boolean => {
                return ((event.key.toLowerCase() === key) || (event.code.toLowerCase() === key));
            };
            const isRtl = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                 isKeyOf('pagedown'  )) setValueDn({ type: 'decrease', payload: 1     });
            else if (                                 isKeyOf('pageup'    )) setValueDn({ type: 'increase', payload: 1     });
            
            else if (                                 isKeyOf('home'      )) setValueDn({ type: 'setValue', payload: minFn });
            else if (                                 isKeyOf('end'       )) setValueDn({ type: 'setValue', payload: maxFn });
            
            else if ( isOrientationBlock &&           isKeyOf('arrowdown' )) setValueDn({ type: 'decrease', payload: 1     });
            else if ( isOrientationBlock &&           isKeyOf('arrowup'   )) setValueDn({ type: 'increase', payload: 1     });
            
            else if (!isOrientationBlock && !isRtl && isKeyOf('arrowleft' )) setValueDn({ type: 'decrease', payload: 1     });
            else if (!isOrientationBlock && !isRtl && isKeyOf('arrowright')) setValueDn({ type: 'increase', payload: 1     });
            
            else if (!isOrientationBlock &&  isRtl && isKeyOf('arrowright')) setValueDn({ type: 'decrease', payload: 1     });
            else if (!isOrientationBlock &&  isRtl && isKeyOf('arrowleft' )) setValueDn({ type: 'increase', payload: 1     });
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            pressReleaseState.handleKeyDown(event); // indicates the <Range> is currently being key pressed
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    }, [propEnabled, propReadOnly, isOrientationBlock, minFn, maxFn]);
    
    const handleMouseDown     = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // range handlers:
        handleMouseActive,
        handleMouseSlide,
    );
    const handleMouseMove     = useMergeEvents(
        // preserves the original `onMouseMove`:
        props.onMouseMove,
        
        
        
        // range handlers:
        handleMouseSlide,
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
    );
    
    const handleChangeDummy   = useEvent<React.ChangeEventHandler<HTMLInputElement>>((_event) => {
        /* nothing to do */
    }, []);
    const handleChange        = useMergeEvents(
        // preserves the original `onChange`:
        onChange,
        
        
        
        // dummy:
        handleChangeDummy, // just for satisfying React of controllable <input>
    );
    
    
    
    // jsx:
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
    
    return (
        <EditableControl<HTMLInputElement>
            // other props:
            {...restEditableControlProps}
            
            
            
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
            onFocus        = {handleFocus       }
            onBlur         = {handleBlur        }
            onMouseEnter   = {handleMouseEnter  }
            onMouseLeave   = {handleMouseLeave  }
            onAnimationEnd = {handleAnimationEnd}
            
            onMouseDown    = {handleMouseDown   }
            onMouseMove    = {handleMouseMove   }
            
            onTouchStart   = {handleTouchStart  }
            onTouchMove    = {handleTouchMove   }
            
            onKeyDown      = {handleKeyDown     }
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
            <EditableControl<HTMLElement>
                // refs:
                elmRef={mergedTrackRef}
                
                
                
                // variants:
                mild={mild}
                
                
                
                // classes:
                classes={mergedTrackClasses}
                
                
                
                // styles:
                style={trackStyle}
                
                
                
                // accessibilities:
                inheritEnabled={true}
                inheritReadOnly={true}
                inheritActive={true}
                
                tabIndex={-1} // focus on the whole <Range>, not the <Track>
                arrived={arriveLeaveState.arrived}
                
                
                
                // validations:
                enableValidation={enableValidation}
                isValid={isValid}
                inheritValidation={inheritValidation}
            >
                { isOrientationBlock ? trackUpper : trackLower }
                <EditableActionControl<HTMLElement>
                    // refs:
                    elmRef={mergedThumbRef}
                    
                    
                    
                    // variants:
                    theme={theme}
                    mild={mildAlternate}
                    
                    
                    
                    // classes:
                    classes={mergedThumbClasses}
                    
                    
                    
                    // styles:
                    style={thumbStyle}
                    
                    
                    
                    // accessibilities:
                    inheritEnabled={true}
                    inheritReadOnly={true}
                    inheritActive={true}
                    
                    focused={focusBlurState.focused} // if the <Range> got focus => the <Thumb> has focus indicator too
                    tabIndex={-1}                    // focus on the whole <Range>, not the <Thumb>
                    arrived={arriveLeaveState.arrived}
                    
                    pressed={pressReleaseState.pressed}
                    
                    
                    
                    // validations:
                    enableValidation={enableValidation}
                    isValid={isValid}
                    inheritValidation={inheritValidation}
                />
                { isOrientationBlock ? trackLower : trackUpper }
            </EditableControl>
        </EditableControl>
    );
};
export {
    Range,
    Range as default,
}
