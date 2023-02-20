// cssfn:
import {
    // cssfn css specific types:
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    children,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                          // writes css in javascript

// reusable-ui core:
import {
    // reusable common layouts:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onEditableControlStylesChange,
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
}                           from '@reusable-ui/editable-control'        // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // features:
    usesRange,
}                           from '../features/range.js'
import {
    // configs:
    ranges,
    cssRangeConfig,
}                           from './config.js'



// styles:
export const inputElm      = ':where(:first-child)' // zero degree specificity to be easily overwritten
export const trackElm      = '.track'               // one degree specificity to overwrite <Track>      component
export const trackLowerElm = '.tracklower'          // one degree specificity to overwrite <Tracklower> component
export const trackUpperElm = '.trackupper'          // one degree specificity to overwrite <Trackupper> component
export const thumbElm      = '.thumb'               // one degree specificity to overwrite <Thumb>      component

export const onRangeStylesChange = watchChanges(onEditableControlStylesChange, cssRangeConfig.onChange);

export const usesRangeLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock, orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    const ifParentOrientationInline       = (styles: CssStyleCollection) => rule(parentOrientationInlineSelector, styles);
    const ifParentOrientationBlock        = (styles: CssStyleCollection) => rule(parentOrientationBlockSelector , styles);
    
    
    
    // dependencies:
    
    // features:
    const {
        borderRule: trackBorderRule,
        borderVars: trackBorderVars,
    } = usesBorder(
        usesPrefixedProps(ranges, 'track'), // fetch config's cssProps starting with track***
    );
    
    const {
        borderRule: thumbBorderRule,
        borderVars: thumbBorderVars,
    } = usesBorder(
        usesPrefixedProps(ranges, 'thumb'), // fetch config's cssProps starting with thumb***
    );
    
    const {
        paddingRule: trackPaddingRule,
        paddingVars: trackPaddingVars,
    } = usesPadding(
        usesPrefixedProps(ranges, 'track'), // fetch config's cssProps starting with track***
    );
    
    const {
        paddingRule: thumbPaddingRule,
        paddingVars: thumbPaddingVars,
    } = usesPadding(
        usesPrefixedProps(ranges, 'thumb'), // fetch config's cssProps starting with thumb***
    );
    
    const {groupableRule} = usesGroupable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
        itemsSelector             : [trackLowerElm, trackUpperElm], // only select <trackLower> & <trackUpper>, do not modify the <thumb>
    });
    const {separatorRule} = usesGroupable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
        itemsSelector             : [trackLowerElm, trackUpperElm], // only select <trackLower> & <trackUpper>, do not modify the <thumb>
    });
    
    const {rangeRule, rangeVars} = usesRange();
    
    
    
    return style({
        // features:
        ...rangeRule(),
        
        
        
        // layouts:
        ...usesEditableControlLayout(),
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
            touchAction             : 'pinch-zoom',  // prevents scrolling by touch, but allows to zoom_in/out
            WebkitTapHighlightColor : 'transparent', // no tap_&_hold highlight
            userSelect              : 'none',        // disable selecting text (double clicking and hold_and_mouse_move not causing selecting the <Range>)
            
            
            
            // children:
            ...ifOrientationInline({ // inline
                ...children('::before', {
                    // layouts:
                    ...fillTextLineHeightLayout(), // adjust the <Range>'s height, the width is block (fills the entire parent's width)
                }),
            }),
            ...ifOrientationBlock({  // block
                ...children('::before', {
                    // layouts:
                    ...fillTextLineWidthLayout(), // adjust the <Range>'s width, the height is based on <Range>'s config
                }),
            }),
            
            ...children(inputElm, {
                // layouts:
                display: 'none', // hide the input
            }),
            
            ...children(trackElm, {
                // features:
                ...trackBorderRule(),
                ...trackPaddingRule(),
                ...groupableRule(), // make a nicely rounded corners
                
                
                
                // layouts:
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
                    
                    
                    
                    // accessibilities:
                    pointerEvents  : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // animations:
                    boxShadow      : ['none', '!important'], // no shadow & no focus animation
                    
                    
                    
                    // children:
                    ...children([trackLowerElm, trackUpperElm], {
                        // borders:
                        ...separatorRule(), // turns the current border as separator between <trackLower> & <trackUpper>
                        
                        
                        
                        // layouts:
                        ...style({
                            // layouts:
                            display    : 'inline-block', // use inline-block, so it takes the width & height as we set
                            
                            
                            
                            // backgrounds:
                            backg      : rangeVars.trackBackg,
                            
                            
                            
                            // borders:
                            // a fix for track(Lower|Upper) background corners:
                            border                 : trackBorderVars.border,
                         // borderRadius           : trackBorderVars.borderRadius,
                            borderStartStartRadius : trackBorderVars.borderStartStartRadius,
                            borderStartEndRadius   : trackBorderVars.borderStartEndRadius,
                            borderEndStartRadius   : trackBorderVars.borderEndStartRadius,
                            borderEndEndRadius     : trackBorderVars.borderEndEndRadius,
                            [trackBorderVars.borderWidth] : '0px', // only setup borderRadius, no borderStroke
                            
                            
                            
                            // sizes:
                            alignSelf  : 'stretch', // follows parent's height
                        }),
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
                        
                        
                        
                        // borders:
                        // removes border at the center of <thumb> when <Range mild={true}>:
                        ...ifParentOrientationInline({ // inline
                            borderInlineEndWidth: '0px',
                        }),
                        ...ifParentOrientationBlock({  // block
                            borderBlockStartWidth: '0px',
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
                        
                        
                        
                        // borders:
                        // removes border at the center of <thumb> when <Range mild={true}>:
                        ...ifParentOrientationInline({ // inline
                            borderInlineStartWidth: '0px',
                        }),
                        ...ifParentOrientationBlock({  // block
                            borderBlockEndWidth: '0px',
                        }),
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(ranges, 'trackupper')), // apply config's cssProps starting with trackupper***
                    }),
                    
                    ...children(['&', thumbElm], {
                        // accessibilities:
                        cursor: 'inherit',
                    }),
                    ...children(thumbElm, {
                        // features:
                        ...thumbBorderRule(),
                        ...thumbPaddingRule(),
                        
                        
                        
                        // layouts:
                        ...style({
                            // layouts:
                            display       : 'inline-block', // use inline-block, so it takes the width & height as we set
                            
                            
                            
                            // positions:
                            zIndex        : 1, // the <thumb> should at the top of <trackLower> & <trackUpper>
                            
                            
                            
                            // sizes:
                            boxSizing     : 'border-box', // the final size is including borders & paddings
                            
                            
                            
                            // customize:
                            ...usesCssProps(usesPrefixedProps(ranges, 'thumb')), // apply config's cssProps starting with thumb***
                            
                            
                            
                            // borders:
                            border                 : thumbBorderVars.border,
                         // borderRadius           : thumbBorderVars.borderRadius,
                            borderStartStartRadius : thumbBorderVars.borderStartStartRadius,
                            borderStartEndRadius   : thumbBorderVars.borderStartEndRadius,
                            borderEndStartRadius   : thumbBorderVars.borderEndStartRadius,
                            borderEndEndRadius     : thumbBorderVars.borderEndEndRadius,
                            
                            
                            
                            // spacings:
                         // padding       : thumbPaddingVars.padding,
                            paddingInline : thumbPaddingVars.paddingInline,
                            paddingBlock  : thumbPaddingVars.paddingBlock,
                            
                            // cancel out <thumb>'s size with negative margin,
                            // so the <trackLower> & <trackUpper> can meet on the middle of the <thumb>:
                            marginInline  : `calc(0px - (${ranges.thumbInlineSize}) / 2)`,
                            marginBlock   : `calc(0px - (${ranges.thumbBlockSize }) / 2)`,
                        }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(ranges, 'track')), // apply config's cssProps starting with track***
                    
                    
                    
                    // borders:
                    border                 : trackBorderVars.border,
                 // borderRadius           : trackBorderVars.borderRadius,
                    borderStartStartRadius : trackBorderVars.borderStartStartRadius,
                    borderStartEndRadius   : trackBorderVars.borderStartEndRadius,
                    borderEndStartRadius   : trackBorderVars.borderEndStartRadius,
                    borderEndEndRadius     : trackBorderVars.borderEndEndRadius,
                    
                    
                    
                    // spacings:
                 // padding       : trackPaddingVars.padding,
                    paddingInline : trackPaddingVars.paddingInline,
                    paddingBlock  : trackPaddingVars.paddingBlock,
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
        // variants:
        ...usesEditableControlVariants(),
        ...resizableRule(),
    });
};
export const usesRangeStates = usesEditableControlStates;

export default () => style({
    // layouts:
    ...usesRangeLayout(),
    
    // variants:
    ...usesRangeVariants(),
    
    // states:
    ...usesRangeStates(),
});
