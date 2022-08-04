// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    rules,
    fallbacks,
    atGlobal,
    atRoot,
    
    
    
    // combinators:
    children,
    nextSiblings,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // style sheets:
    styleSheet,
    
    
    
    // utilities:
    iif,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // configs:
    borders as borderStrokes,
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system
import {
    // configs:
    breakpoints,
    
    
    
    // rules:
    ifScreenWidthAtLeast,
}                           from '@reusable-ui/breakpoints'     // a responsive management system

// reusable-ui features:
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'         // padding (inner spacing) stuff of UI

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    defaultBlockOrientationableOptions,
    usesOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout

// reusable-ui components:
import {
    // types:
    FeatureMixin,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component



// rules:
// :where(...) => zero specificity => easy to overwrite further:
export const ifVisibleChild          = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign))'                                           , styles);

export const ifFirstVisibleChild     = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where(:first-child, .first-visible-child)' , styles);
export const ifLastVisibleChild      = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where( :last-child,  .last-visible-child)' , styles);
export const ifNotFirstVisibleChild  = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign, :first-child, .first-visible-child))'       , styles);
export const ifNotLastVisibleChild   = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign,  :last-child,  .last-visible-child))'       , styles);

export const ifSecondVisibleChild    = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where(:nth-child(2))'                      , styles);
export const ifNotSecondVisibleChild = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign, :nth-child(2)))'                            , styles);



// hooks:

// variants:

//#region orientationable
export const defaultOrientationableOptions = defaultBlockOrientationableOptions;
//#endregion orientationable


// layouts:

//#region container
export interface ContainerVars {
    // borders:
    borderWidth            : any
    
    borderStartStartRadius : any
    borderStartEndRadius   : any
    borderEndStartRadius   : any
    borderEndEndRadius     : any
    
    
    
    // spacings:
    paddingInline          : any
    paddingBlock           : any
}
const [containerVars] = cssVars<ContainerVars>();



/**
 * Uses container.
 * @returns A `FeatureMixin<containerVars>` represents container definitions.
 */
export const usesContainer = (): FeatureMixin<ContainerVars> => {
    // dependencies:
    
    // features:
    const {borderVars } = usesBorder();
    const {paddingVars} = usesPadding();
    
    
    
    return [
        () => style({
            ...vars({
                // borders:
                [containerVars.borderWidth           ] : borderVars.borderWidth,
                
                [containerVars.borderStartStartRadius] : borderVars.borderStartStartRadius,
                [containerVars.borderStartEndRadius  ] : borderVars.borderStartEndRadius,
                [containerVars.borderEndStartRadius  ] : borderVars.borderEndStartRadius,
                [containerVars.borderEndEndRadius    ] : borderVars.borderEndEndRadius,
                
                
                
                // spacings:
                [containerVars.paddingInline         ] : paddingVars.paddingInline,
                [containerVars.paddingBlock          ] : paddingVars.paddingBlock,
            }),
        }),
        containerVars,
    ];
};
//#endregion container


// borders:

//#region border as container
export interface BorderAsContainerOptions extends OrientationableOptions {
    itemsSelector ?: CssSelectorCollection
}
export const usesBorderAsContainer = (options?: BorderAsContainerOptions): CssRule => {
    // options:
    const orientationableRules = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableRules;
    options = orientationableRules;
    const {
        itemsSelector = '*',
    } = options;
    
    
    
    // dependencies:
    
    // features:
    const {               borderVars   } = usesBorder();
    
    // layouts:
    const [containerRule, containerVars] = usesContainer();
    
    
    
    return style({
        ...imports([
            // layouts:
            containerRule, // define the container variables, so we can access them
        ]),
        // ...style({
        //     // borders:
        //     overflow : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
        // }),
        ...ifOrientationInline({ // inline
            // children:
            ...children(itemsSelector, {
                ...ifFirstVisibleChild({
                    ...vars({
                        /*
                            if the_current_element is a_child_of_container and also a_separator,
                            the deleted `containerVars.borderWidth` in separator must be pointed to container,
                            so we can calculate the correct inner_borderRadius.
                            
                            that's why we set `!important` to the `containerVars.borderWidth`.
                        */
                        [containerVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                        
                        [containerVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                        [containerVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        // add rounded corners on left:
                        [borderVars.borderStartStartRadius   ] : `calc(${containerVars.borderStartStartRadius} - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borderVars.borderEndStartRadius     ] : `calc(${containerVars.borderEndStartRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
                        /* recursive calculation of borderRadius is not supported yet */
                    }),
                }),
                ...ifLastVisibleChild({
                    ...vars({
                        /*
                            if the_current_element is a_child_of_container and also a_separator,
                            the deleted `containerVars.borderWidth` in separator must be pointed to container,
                            so we can calculate the correct inner_borderRadius.
                            
                            that's why we set `!important` to the `containerVars.borderWidth`.
                        */
                        [containerVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                        
                        [containerVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                        [containerVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        // add rounded corners on right:
                        [borderVars.borderStartEndRadius     ] : `calc(${containerVars.borderStartEndRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borderVars.borderEndEndRadius       ] : `calc(${containerVars.borderEndEndRadius    } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
                        /* recursive calculation of borderRadius is not supported yet */
                    }),
                }),
            }),
        }),
        ...ifOrientationBlock({  // block
            // children:
            ...children(itemsSelector, {
                ...ifFirstVisibleChild({
                    ...vars({
                        /*
                            if the_current_element is a_child_of_container and also a_separator,
                            the deleted `containerVars.borderWidth` in separator must be pointed to container,
                            so we can calculate the correct inner_borderRadius.
                            
                            that's why we set `!important` to the `containerVars.borderWidth`.
                        */
                        [containerVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                        
                        [containerVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                        [containerVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        // add rounded corners on top:
                        [borderVars.borderStartStartRadius   ] : `calc(${containerVars.borderStartStartRadius} - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borderVars.borderStartEndRadius     ] : `calc(${containerVars.borderStartEndRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
                        /* recursive calculation of borderRadius is not supported yet */
                    }),
                }),
                ...ifLastVisibleChild({
                    ...vars({
                        /*
                            if the_current_element is a_child_of_container and also a_separator,
                            the deleted `containerVars.borderWidth` in separator must be pointed to container,
                            so we can calculate the correct inner_borderRadius.
                            
                            that's why we set `!important` to the `containerVars.borderWidth`.
                        */
                        [containerVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                        
                        [containerVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                        [containerVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        // add rounded corners on bottom:
                        [borderVars.borderEndStartRadius     ] : `calc(${containerVars.borderEndStartRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borderVars.borderEndEndRadius       ] : `calc(${containerVars.borderEndEndRadius    } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
                        /* recursive calculation of borderRadius is not supported yet */
                    }),
                }),
            }),
        }),
    });
};
//#endregion border as container

//#region border as separator
export interface BorderAsSeparatorOptions extends OrientationableOptions {
    itemsSelector ?: CssSelectorCollection
    swapFirstItem ?: boolean
}
const usesBorderAsSeparatorOf = (block: boolean, options: BorderAsSeparatorOptions = {}): CssRule => {
    // options:
    const {
        itemsSelector = '*',
        swapFirstItem = false,
    } = options;
    
    
    
    // dependencies:
    
    // features:
    const {  borderVars   } = usesBorder();
    
    // layouts:
    const [, containerVars] = usesContainer();
    
    
    
    return style({
        // the container variables are already defined on `usesBorderAsContainer`
        // if the `usesBorderAsContainer` was not defined => the `usesBorderAsSeparator` is effectively unused
        // ...imports([
        //     // layouts:
        //     containerRule,
        // ]),
        
        
        
        ...vars({
            /*
                if the_current_element is a container,
                the `containerVars.borderWidth` will be deleted (not follow `borderWidth` again),
                because the_current_element becomes a separator.
                
                use `0px` instead of 0,
                because the value will be calculated in `calc()` expression.
            */
            [containerVars.borderWidth] : '0px', // remove border
        }),
        ...style({
            // borders:
            boxShadow                   : null,  // remove shadow
        }),
        
        
        
        // removes unecessary border stroke:
        ...style({
            // borders:
            [`border${block ? 'Inline' : 'Block'}Width`         ] : 0, // remove (left|right)-border
            
            // remove top-border at the first-child, so that it wouldn't collide with the container's top-border
            ...ifFirstVisibleChild({
                // borders:
                [`border${block ? 'Block' : 'Inline'}StartWidth`] : 0, // remove top-border
            }),
            
            // remove bottom-border at the last-child, so that it wouldn't collide with the container's bottom-border
            // *note : *special case* => move the first separator to the second child
            ...ifLastVisibleChild({
                // borders:
                [`border${block ? 'Block' : 'Inline'}EndWidth`  ] : 0, // remove bottom-border
            }),
            ...iif(swapFirstItem, ifFirstVisibleChild({
                // borders:
                [`border${block ? 'Block' : 'Inline'}EndWidth`  ] : 0, // remove bottom-border
            })),
            
            
            
            // children:
            // remove double border by removing top-border at the subsequent sibling(s)
            ...nextSiblings(itemsSelector, {
                ...ifVisibleChild({
                    ...iif(!swapFirstItem, style({
                        // borders:
                        [`border${block ? 'Block' : 'Inline'}StartWidth`] : 0, // remove top-border
                    })),
                    ...iif(swapFirstItem, ifNotSecondVisibleChild({ // *note : *special case* => move the first separator to the second child
                        // borders:
                        [`border${block ? 'Block' : 'Inline'}StartWidth`] : 0, // remove top-border
                    })),
                }),
            }),
        }),
        
        // removes unecessary border radius:
        // although the border stroke was/not removed, it *affects* the children's border radius
        // do not remove border radius at the parent's corners (:first-child & :last-child)
        ...ifNotFirstVisibleChild({
            ...(
                block
                ?
                style({
                    // borders:
                    // remove rounded corners on top:
                    [borderVars.borderStartStartRadius] : '0px',
                    [borderVars.borderStartEndRadius  ] : '0px',
                })
                :
                style({
                    // borders:
                    // remove rounded corners on left:
                    [borderVars.borderStartStartRadius] : '0px',
                    [borderVars.borderEndStartRadius  ] : '0px',
                })
            ),
        }),
        ...ifNotLastVisibleChild({
            ...(
                block
                ?
                style({
                    // borders:
                    // remove rounded corners on bottom:
                    [borderVars.borderEndStartRadius  ] : '0px',
                    [borderVars.borderEndEndRadius    ] : '0px',
                })
                :
                style({
                    // borders:
                    // remove rounded corners on right:
                    [borderVars.borderStartEndRadius  ] : '0px',
                    [borderVars.borderEndEndRadius    ] : '0px',
                })
            ),
        }),
    });
};
export const usesBorderAsSeparator = (options: BorderAsSeparatorOptions = {}): CssRule => {
    // options:
    const orientationableRules = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableRules;
    options = orientationableRules;
    
    
    
    return style({
        ...ifOrientationInline( // inline
            usesBorderAsSeparatorOf(false, options)
        ),
        ...ifOrientationBlock(  // block
            usesBorderAsSeparatorOf(true, options)
        ),
    });
};
//#endregion border as separator



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
            border       : borderVars.border,
            borderRadius : borderVars.borderRadius,
            
            
            
            // spacings:
            padding      : paddingVars.padding,
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
            borderRadius : borderVars.borderRadius,
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
    
    // spacings:
    const [, containerVars]     = usesContainer();
    const positivePaddingInline = containerVars.paddingInline;
    const positivePaddingBlock  = containerVars.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    const fillSelectorAndSelf = [fillSelector, fillSelfSelector];
    return style({
        ...imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: fillSelectorAndSelf }), // make a nicely rounded corners
        ]),
        ...style({
            // children:
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

export const useContainerStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesContainerLayout(),
        
        // variants:
        usesContainerVariants(),
        
        // children:
        usesContainerChildren(),
    ]),
}), { id: 'dmgepbofol' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [containers, containerValues, cssContainerConfig] = cssConfig(() => {
    return {
        // borders:
        borderWidth      : borderStrokes.none   as CssKnownProps['borderWidth'  ], // override to <Basic>
        borderRadius     : borderRadiuses.none  as CssKnownProps['borderRadius' ], // override to <Basic>
        
        
        
        // spacings:
        paddingInline    : '12px'               as CssKnownProps['paddingInline'],
        paddingBlock     :  '9px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineSm  : '24px'               as CssKnownProps['paddingInline'],
        paddingBlockSm   : '18px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineMd  : '36px'               as CssKnownProps['paddingInline'],
        paddingBlockMd   : '27px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineLg  : '48px'               as CssKnownProps['paddingInline'],
        paddingBlockLg   : '36px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXl  : '60px'               as CssKnownProps['paddingInline'],
        paddingBlockXl   : '45px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXxl : '72px'               as CssKnownProps['paddingInline'],
        paddingBlockXxl  : '54px'               as CssKnownProps['paddingBlock' ],
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
