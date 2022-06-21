// react:
import {
    // react:
    default as React,
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
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities'         // an accessibility management system
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
    const styleSheet = useRangeStyleSheet();
    
    
    
    // rest props:
    const {
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
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    
    
    
    // jsx:
    return (
        <EditableControl<HTMLInputElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            
            
            // accessibilities:
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus-within` (pseudo) => the wrapper is also `.focus` (synthetic)
            enabled={props.enabled ?? !(props.disabled ?? false)} // aliasing [disabled] => ![enabled]
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
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
