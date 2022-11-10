// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    CssSelectorCollection,
    
    
    
    // writes css in javascript:
    rule,
    rules,
    fallbacks,
    atGlobal,
    atRoot,
    children,
    style,
    imports,
    styleSheet,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a border (stroke) management system:
    borders as borderStrokes,
    borderRadiuses,
    
    
    
    // a responsive management system:
    breakpoints,
    ifScreenWidthAtLeast,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // groups a list of UIs into a single UI:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    usesGroupable,
    
    
    
    // a capability of UI to rotate its layout:
    defaultBlockOrientationableOptions,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component



// defaults:
export const defaultOrientationableOptions = defaultBlockOrientationableOptions;



// configs:
export const [containers, containerValues, cssContainerConfig] = cssConfig(() => {
    return {
        // borders:
        borderWidth       : borderStrokes.none   as CssKnownProps['borderWidth'  ], // override to <Basic>
        borderRadius      : borderRadiuses.none  as CssKnownProps['borderRadius' ], // override to <Basic>
        
        
        
        // spacings:
        paddingInline     : '12px'               as CssKnownProps['paddingInline'],
        paddingBlock      :  '9px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineSm   : '24px'               as CssKnownProps['paddingInline'],
        paddingBlockSm    : '18px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineMd   : '36px'               as CssKnownProps['paddingInline'],
        paddingBlockMd    : '27px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineLg   : '48px'               as CssKnownProps['paddingInline'],
        paddingBlockLg    : '36px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXl   : '60px'               as CssKnownProps['paddingInline'],
        paddingBlockXl    : '45px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXxl  : '72px'               as CssKnownProps['paddingInline'],
        paddingBlockXxl   : '54px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXxxl : '84px'               as CssKnownProps['paddingInline'],
        paddingBlockXxxl  : '63px'               as CssKnownProps['paddingBlock' ],
    };
}, { prefix: 'con' });

// configs adjusted by screen width:
styleSheet({
    ...atGlobal({
        ...atRoot({
            ...rules([
                // the <Container> size is determined by screen width:
                Object.keys(breakpoints)
                .map((breakpointName) =>
                    ifScreenWidthAtLeast(breakpointName, {
                        // overwrites propName = propName{BreakpointName}:
                        ...overwriteProps(containers, usesSuffixedProps(containers, breakpointName)),
                    }),
                ),
            ]),
        }, { specificityWeight: 2 }), // increase the specificity to win with the specificity in cssConfig's :root
    }),
});



// styles:
/**
 * Applies a responsive container layout.
 * @returns A `CssRule` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = () => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(containers);
    const {paddingRule, paddingVars} = usesPadding(containers);
    
    
    
    return style({
        ...imports([
            // features:
            borderRule,
            paddingRule,
        ]),
        ...style({
            // borders:
            border        : borderVars.border,
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
};
/**
 * Applies a responsive container using grid layout.
 * @returns A `CssRule` represents a responsive container using grid layout.
 */
export const usesResponsiveContainerGridLayout = () => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(containers);
    const {paddingRule, paddingVars} = usesPadding(containers);
    
    
    
    return style({
        ...imports([
            // features:
            borderRule,
            paddingRule,
        ]),
        ...style({
            // layouts:
            display             : 'grid', // use css grid for layouting
            // define our logical paddings:
            gridTemplateRows    : [[paddingVars.paddingBlock,  'auto', paddingVars.paddingBlock ]], // the height of each row
            gridTemplateColumns : [[paddingVars.paddingInline, 'auto', paddingVars.paddingInline]], // the width of each column
            gridTemplateAreas   : [[
                '"........... blockStart ........."',
                '"inlineStart  content   inlineEnd"',
                '"...........  blockEnd  ........."',
            ]],
            
            
            
            // borders:
            border       : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
        }),
    });
};

export interface ContainerChildrenOptions {
    fillSelector     ?: CssSelectorCollection
    fillSelfSelector ?: CssSelectorCollection
}
export const usesContainerChildrenFill = (options: ContainerChildrenOptions = {}) => {
    // options:
    const {
        fillSelector     = '.fill',
        fillSelfSelector = '.fill-self',
    } = options;
    
    
    
    // dependencies:
    
    // features:
    const {borderRule, borderVars} = usesBorder({
        borderRadius : 'initial', // protect from inheritance
    });
    
    const fillSelectorAndSelf = [fillSelector, fillSelfSelector];
    const {groupableRule, groupableVars} = usesGroupable({
        itemsSelector: fillSelectorAndSelf, // select .fill & .fill-selft for trimming their corners
    });
    
    // spacings:
    const positivePaddingInline = groupableVars.paddingInline;
    const positivePaddingBlock  = groupableVars.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    return style({
        ...imports([
            // features:
            groupableRule, // make a nicely rounded corners
        ]),
        ...style({
            // children:
            ...rule(':where(&)', { // set at lowest specificity to the parent selector
                ...children(fillSelectorAndSelf, {
                    ...imports([
                        // features:
                        borderRule,
                    ]),
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
};
export const usesContainerChildren = (options: ContainerChildrenOptions = {}) => {
    return style({
        ...imports([
            // spacings:
            usesContainerChildrenFill(options), // must be placed at the last
        ]),
    });
};

export const usesContainerLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // layouts:
            display: 'block',
            
            
            
            // customize:
            ...usesCssProps(containers), // apply config's cssProps
        }),
        ...imports([
            // layouts:
            usesResponsiveContainerLayout(), // must be placed at the last
        ]),
    });
};
export const usesContainerVariants = () => {
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
        ]),
    });
};

export const useContainerStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesContainerLayout(),
        
        // variants:
        usesContainerVariants(),
        
        // children:
        usesContainerChildren(),
    ]),
}), { id: 'dmgepbofol' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface ContainerProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>
{
    // children:
    children ?: React.ReactNode
}
const Container = <TElement extends Element = HTMLElement>(props: ContainerProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useContainerStyleSheet();
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    Container,
    Container as default,
}
