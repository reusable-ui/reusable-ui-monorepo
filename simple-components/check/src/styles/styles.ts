// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    ifNotLastChild,
    children,
    style,
    vars,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    overwriteProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                          // writes css in javascript

// reusable-ui core:
import {
    // a border (stroke) management system:
    borderRadiuses,
    
    
    
    // reusable common layouts:
    fillTextLineHeightLayout,
    
    
    
    // foreground (text color) stuff of UI:
    usesForeground,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // mild (soft color) variant of UI:
    usesMildable,
    
    
    
    // nude variant of UI:
    ifNotNude,
    ifNude,
    
    
    
    // a capability of UI to be focused:
    usesFocusable,
    
    
    
    // shows the UI as clicked when activated:
    usesActiveAsClick,
    
    
    
    // a capability of UI to be checked:
    usesCheckable,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onEditableActionControlStylesChange,
    usesEditableActionControlLayout,
    usesEditableActionControlVariants,
    usesEditableActionControlStates,
}                           from '@reusable-ui/editable-action-control' // a base component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'                    // an icon component
import {
    // styles:
    onButtonStylesChange,
    usesButtonLayout,
}                           from '@reusable-ui/button'                  // a button component

// internals:
import {
    // elements:
    dummyElm,
    inputElm,
    checkElm,
    labelElm,
}                           from './elements.js'
import {
    // configs:
    checks,
    cssCheckConfig,
}                           from './config.js'



// styles:
export const onCheckStylesChange = watchChanges(onEditableActionControlStylesChange, onButtonStylesChange, cssCheckConfig.onChange);

export const usesCheckLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {foregroundVars} = usesForeground();
    const {paddingVars   } = usesPadding();
    
    // states:
    const {checkableVars } = usesCheckable();
    
    
    
    return style({
        // layouts:
        ...usesEditableActionControlLayout(),
        ...style({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // items are placed starting from the center (in case of input & label are wrapped, each placed at the center)
            alignItems     : 'center',      // center items vertically (indicator & label are always at center no matter how tall is the wrapper)
            flexWrap       : 'wrap',        // allows the label to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline',    // <Check>'s text should be aligned with sibling text, so the <Check> behave like <span> wrapper
            
            
            
            // children:
            ...children(dummyElm, {
                ...fillTextLineHeightLayout(),
            }),
            ...children(inputElm, {
                // layouts:
                ...usesEditableActionControlLayout(),
                ...style({
                    // layouts:
                    display       : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // sizes:
                    boxSizing     : 'border-box', // the final size is including borders & paddings
                    // the size is exactly the same as current font size:
                    inlineSize    : '1em',
                    blockSize     : '1em',
                    
                    flex          : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's width
                    
                    
                    
                    // accessibilities:
                    pointerEvents : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // borders:
                    overflow      : 'hidden', // clip the icon at borderRadius
                    
                    
                    
                    // animations:
                    filter        : 'none',    // (pseudo) inherit parent filter
                    anim          : 'inherit', //          inherit parent animation
                    
                    
                    
                    // spacings:
                    [paddingVars.paddingInline] : '0px', // discard padding
                    [paddingVars.paddingBlock ] : '0px', // discard padding
                    ...ifNotLastChild({
                        // spacing between input & label:
                        marginInlineEnd : checks.spacing, // we cannot place a `gap` on the parent flex because the existance of <dummyElm>
                    }),
                    
                    
                    
                    // children:
                    ...children(checkElm, {
                        // layouts:
                        // check indicator:
                        ...usesIconImage({
                            image : checks.indicator,
                            color : foregroundVars.foreg,
                        }),
                        ...style({
                            // layouts:
                            content   : '""',
                            display   : 'block', // fills the entire parent's width
                            
                            
                            
                            // sizes:
                            // fills the entire parent:
                            boxSizing : 'border-box', // the final size is including borders & paddings
                            blockSize : '100%', // fills the entire parent's height
                            
                            
                            
                            // animations:
                            filter    : checkableVars.filter,
                            transform : checkableVars.transform,
                            anim      : checkableVars.anim,
                        }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(checks), // apply config's cssProps
                }),
            }),
            ...children(labelElm, {
                // layouts:
                display       : 'inline', // use inline, so it takes the width & height automatically
                
                
                
                // positions:
                verticalAlign : 'baseline', // <Label>'s text should be aligned with sibling text, so the <Label> behave like <span> wrapper
                
                
                
                // sizes:
                flex          : [[1, 1, 0]], // growable, shrinkable, initial from 0 width (setting initial to `auto`, when wrapped to next line, causing the text is not centered)
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(checks, 'label')), // apply config's cssProps starting with label***
            }),
        }),
    });
}, onCheckStylesChange);

export const usesCheckVariants = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {foregroundVars} = usesForeground();
    const {borderVars    } = usesBorder();
    
    // variants:
    const {resizableRule } = usesResizable(checks);
    const {mildableVars  } = usesMildable();
    
    
    
    return style({
        // variants:
        
        /* write specific checkStyle first, so it can be overriden by `.nude`, `.mild`, `.outlined`, etc */
        
        ...variants([
            rule(['.button', '.toggleButton'], {
                // layouts:
                ...usesButtonLayout(),
                ...style({
                    // children:
                    // hide the <dummy> & <Check>'s indicator:
                    ...children([dummyElm, inputElm], {
                        // layouts:
                        display : 'none',
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(checks, 'button')), // apply config's cssProps starting with button***
                    
                    // overwrites propName = {button}propName:
                    ...overwriteProps(checks, usesPrefixedProps(checks, 'button')),
                }),
            }),
            rule('.toggleButton', {
                // customize:
                ...usesCssProps(usesPrefixedProps(checks, 'toggleButton')), // apply config's cssProps starting with toggleButton***
                
                // overwrites propName = {toggleButton}propName:
                ...overwriteProps(checks, usesPrefixedProps(checks, 'toggleButton')),
            }),
            
            rule('.switch', {
                // children:
                ...children(inputElm, {
                    // sizes:
                    aspectRatio : '2 / 1', // make the width twice the height
                    inlineSize : 'auto',   // make the width twice the height
                    
                    
                    
                    // borders:
                    // circle corners on top:
                    [borderVars.borderStartStartRadius] : borderRadiuses.pill,
                    [borderVars.borderStartEndRadius  ] : borderRadiuses.pill,
                    // circle corners on bottom:
                    [borderVars.borderEndStartRadius  ] : borderRadiuses.pill,
                    [borderVars.borderEndEndRadius    ] : borderRadiuses.pill,
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(checks, 'switch')), // apply config's cssProps starting with switch***
                }),
                
                
                
                // overwrites propName = {switch}propName:
                ...overwriteProps(checks, usesPrefixedProps(checks, 'switch')),
            }),
        ], { specificityWeight: 1 }),
        
        ...usesEditableActionControlVariants(),
        ...resizableRule(),
        ...variants([
            ifNotNude({
                // children:
                ...children(inputElm, {
                    // borders:
                    [borderVars.borderColor] : foregroundVars.foreg,  // make a contrast border between indicator & filler
                    
                    
                    
                    // animations:
                    boxShadow : ['none', '!important'], // remove double focus indicator animation to the wrapper
                }),
            }),
            ifNude({
                // foregrounds:
                foreg     : [mildableVars.foregFn, '!important'], // no valid/invalid animation
            }),
        ], { specificityWeight: 2 }),
    });
}, onCheckStylesChange);

export const usesCheckStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {focusableVars    } = usesFocusable();
    const {checkableRule    } = usesCheckable(checks);
    const {activeAsClickRule} = usesActiveAsClick();
    
    
    
    return style({
        // states:
        ...usesEditableActionControlStates(),
        ...checkableRule(),
        ...variants([
            rule('.toggleButton', {
                // states:
                ...activeAsClickRule(),
            }),
        ], { specificityWeight: 1 }),
        
        
        
        // layouts:
        ...style({
            // children:
            ...children(inputElm, {
                ...vars({
                    // copy focus effect from parent:
                    [focusableVars.boxShadow] : 'inherit',
                    [focusableVars.anim     ] : 'inherit',
                }),
            }),
        }),
    });
}, onCheckStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesCheckLayout(),
    
    // variants:
    ...usesCheckVariants(),
    
    // states:
    ...usesCheckStates(),
}), onCheckStylesChange);
