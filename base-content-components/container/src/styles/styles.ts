// cssfn:
import {
    // cssfn css specific types:
    CssSelectorCollection,
    
    
    
    // writes css in javascript:
    rule,
    fallbacks,
    children,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // groups a list of UIs into a single UI:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    usesGroupable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onBasicStylesChange,
    usesBasicLayout,
    usesBasicVariants,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import {
    // configs:
    containers,
    cssContainerConfig,
}                           from './config.js'



// responsive styles:
/**
 * Applies a responsive container layout.
 * @returns A `CssRule` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(containers);
    const {paddingRule, paddingVars} = usesPadding(containers);
    
    
    
    return style({
        // features:
        ...borderRule(),
        ...paddingRule(),
        
        
        
        // layouts:
        ...style({
            // borders:
            border                 : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
}, cssContainerConfig.onChange);

/**
 * Applies a responsive container using grid layout.
 * @returns A `CssRule` represents a responsive container using grid layout.
 */
export const usesResponsiveContainerGridLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(containers);
    const {paddingRule, paddingVars} = usesPadding(containers);
    
    
    
    return style({
        // features:
        ...borderRule(),
        ...paddingRule(),
        
        
        
        // layouts:
        ...style({
            // layouts:
            display      : 'grid', // use css grid for layouting
            // define our logical paddings:
            gridTemplate : [[
                `"........... blockStart ........." ${paddingVars.paddingBlock}`,
                `"inlineStart  content   inlineEnd" auto`,
                `"...........  blockEnd  ........." ${paddingVars.paddingBlock}`,
                '/',
                `${paddingVars.paddingInline} auto ${paddingVars.paddingInline}`
            ]],
            
            
            
            // borders:
            border                 : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
        }),
    });
}, cssContainerConfig.onChange);



// children styles:
export interface ContainerChildrenOptions {
    fillSelector     ?: CssSelectorCollection
    fillSelfSelector ?: CssSelectorCollection
}
export const usesContainerChildrenFill = memoizeStyle((options?: ContainerChildrenOptions) => {
    // options:
    const {
        fillSelector     = '.fill',
        fillSelfSelector = '.fill-self',
    } = options ?? {};
    
    
    
    // dependencies:
    
    // capabilities:
    const fillSelectorAndSelf = [fillSelector, fillSelfSelector];
    const {groupableRule, groupableVars} = usesGroupable({
        itemsSelector: fillSelectorAndSelf, // select .fill & .fill-selft for trimming their corners
    });
    
    // features:
    const {borderRule, borderVars} = usesBorder({
        borderRadius : 'initial', // protect from inheritance
    });
    
    // spacings:
    const positivePaddingInline = groupableVars.paddingInline;
    const positivePaddingBlock  = groupableVars.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    return style({
        // capabilities:
        ...groupableRule(), // make a nicely rounded corners
        
        
        
        // layouts:
        ...style({
            // children:
            ...rule(':where(&)', { // set at lowest specificity to the parent selector
                ...children(fillSelectorAndSelf, {
                    // features:
                    ...borderRule(),
                    
                    
                    
                    // layouts:
                    ...style({
                        // borders:
                     // borderRadius           : borderVars.borderRadius,
                        borderStartStartRadius : borderVars.borderStartStartRadius,
                        borderStartEndRadius   : borderVars.borderStartEndRadius,
                        borderEndStartRadius   : borderVars.borderEndStartRadius,
                        borderEndEndRadius     : borderVars.borderEndEndRadius,
                    }),
                }, { specificityWeight: 0 }), // set at lowest specificity to the section selectors
            }, { performGrouping: false }), // do not transform/simplify
            ...children(fillSelectorAndSelf, {
                // sizes:
                // span to maximum width including parent's paddings:
                boxSizing      : 'border-box', // the final size is including borders & paddings
                inlineSize     : 'fill-available',
                ...fallbacks({
                    inlineSize : `calc(100% + (${positivePaddingInline} * 2))`,
                }),
                
                
                
                // spacings:
                marginInline         : negativePaddingInline,  // cancel out parent's padding with negative margin
                ...ifFirstVisibleChild({
                    marginBlockStart : negativePaddingBlock,   // cancel out parent's padding with negative margin
                }),
                ...ifLastVisibleChild({
                    marginBlockEnd   : negativePaddingBlock,   // cancel out parent's padding with negative margin
                }),
            }),
            ...children(fillSelfSelector, {
                // spacings:
                paddingInline         : positivePaddingInline, // restore parent's padding with positive margin
                ...ifFirstVisibleChild({
                    paddingBlockStart : positivePaddingBlock,  // restore parent's padding with positive margin
                }),
                ...ifLastVisibleChild({
                    paddingBlockEnd   : positivePaddingBlock,  // restore parent's padding with positive margin
                }),
            }),
        }),
    });
});
export const usesContainerChildren = memoizeStyle((options?: ContainerChildrenOptions) => {
    return style({
        // spacings:
        ...usesContainerChildrenFill(options), // must be placed at the last
    });
});



// styles:
export const onContainerStylesChange = watchChanges(onBasicStylesChange, cssContainerConfig.onChange);

export const usesContainerLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesBasicLayout(),
        ...style({
            // layouts:
            display: 'block',
            
            
            
            // customize:
            ...usesCssProps(containers), // apply config's cssProps
        }),
        ...usesResponsiveContainerLayout(), // must be placed at the last
    });
}, onContainerStylesChange);

export const usesContainerVariants = usesBasicVariants;

export default memoizeStyle(() => style({
    // layouts:
    ...usesContainerLayout(),
    
    // variants:
    ...usesContainerVariants(),
    
    // children:
    ...usesContainerChildren(),
}), onContainerStylesChange);
