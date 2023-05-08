// cssfn:
import {
    // writes css in javascript:
    fallback,
    children,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                          // writes css in javascript

// reusable-ui core:
import {
    // removes browser's default stylesheet:
    stripoutTextbox,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // gradient variant of UI:
    usesGradientable,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onEditableTextControlStylesChange,
    usesEditableTextControlLayout,
    usesEditableTextControlVariants,
    usesEditableTextControlStates,
}                           from '@reusable-ui/editable-text-control'   // a base component

// internals:
import {
    // elements:
    inputElm,
}                           from './elements.js'
import {
    // configs:
    inputs,
    cssInputConfig,
}                           from './config.js'



// styles:
export const onInputStylesChange = watchChanges(onEditableTextControlStylesChange, cssInputConfig.onChange);

export const usesInputLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {borderRule, borderVars } = usesBorder({ borderWidth: '0px' });
    const {            paddingVars} = usesPadding();
    
    
    
    return style({
        // layouts:
        ...usesEditableTextControlLayout(),
        ...style({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // flow to the document's writing flow
            justifyContent : 'start',  // if input is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the input's first letter should be visible first
            alignItems     : 'center', // default center items vertically (especially for the validation icon indicator)
            flexWrap       : 'nowrap', // prevents the input & icon to wrap to the next row
            
            
            
            // positions:
            verticalAlign  : 'baseline', // <Input>'s text should be aligned with sibling text, so the <Input> behave like <span> wrapper
            
            
            
            // children:
            ...children(inputElm, {
                // resets:
                ...stripoutTextbox(), // clear browser's default styles
                
                
                
                // layouts:
                ...style({
                    // layouts:
                    display        : 'block', // fills the entire parent's width
                    
                    
                    
                    // sizes:
                    // strip out the *weird input's prop [size]* so it can follow flex behavior:
                    // span to maximum width including parent's paddings:
                    boxSizing      : 'border-box', // the final size is including borders & paddings
                    inlineSize     : 'fill-available',
                    ...fallback({
                        inlineSize : `calc(100% + (${paddingVars.paddingInline} * 2))`,
                    }),
                    
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    alignSelf      : 'stretch',        // follows parent's height
                    
                    
                    
                    // borders:
                    // a fix for :autofill corners:
                    border                   : borderVars.border,
                 // borderRadius             : borderVars.borderRadius,
                    borderStartStartRadius   : borderVars.borderStartStartRadius,
                    borderStartEndRadius     : borderVars.borderStartEndRadius,
                    borderEndStartRadius     : borderVars.borderEndStartRadius,
                    borderEndEndRadius       : borderVars.borderEndEndRadius,
                    [borderVars.borderWidth] : '0px', // only setup borderRadius, no borderStroke
                    
                    
                    
                    // spacings:
                    // cancel-out parent's padding with negative margin:
                    marginInline   : `calc(0px - ${paddingVars.paddingInline})`,
                    marginBlock    : `calc(0px - ${paddingVars.paddingBlock })`,
                    
                    // copy parent's paddings:
                    paddingInline  : paddingVars.paddingInline,
                    paddingBlock   : paddingVars.paddingBlock,
                    
                    
                    
                    // children:
                    ...children('::placeholder', {
                        // foregrounds:
                        foreg : 'currentColor',
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(inputs, 'placeholder')), // apply config's cssProps starting with placeholder***
                    }),
                }),
                
                
                
                // features:
                ...borderRule(), // must be placed at the last
            }),
            
            
            
            // customize:
            ...usesCssProps(inputs), // apply config's cssProps
        }),
    });
}, onInputStylesChange);

export const usesInputVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule   } = usesResizable(inputs);
    const {gradientableRule} = usesGradientable(inputs);
    
    
    
    return style({
        // variants:
        ...usesEditableTextControlVariants(),
        ...resizableRule(),
        ...gradientableRule(),
    });
}, onInputStylesChange);

export const usesInputStates = usesEditableTextControlStates;

export default memoizeStyle(() => style({
    // layouts:
    ...usesInputLayout(),
    
    // variants:
    ...usesInputVariants(),
    
    // states:
    ...usesInputStates(),
}), onInputStylesChange);
