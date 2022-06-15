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
    cssVar,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
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
import {
    // types:
    FeatureMixin,
    
    
    
    // hooks:
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    usesBorder,
    extendsBorder,
    usesPadding,
    extendsPadding,
    
    
    
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

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;
//#endregion orientation

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
const [containerVars] = cssVar<ContainerVars>();



/**
 * Uses container.
 * @returns A `FeatureMixin<containerVars>` represents container definitions.
 */
export const usesContainer = (): FeatureMixin<ContainerVars> => {
    // dependencies:
    
    // borders:
    const [, borders ] = usesBorder();
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return [
        () => style({
            ...vars({
                // borders:
                [containerVars.borderWidth           ] : borders.borderWidth,
                
                [containerVars.borderStartStartRadius] : borders.borderStartStartRadius,
                [containerVars.borderStartEndRadius  ] : borders.borderStartEndRadius,
                [containerVars.borderEndStartRadius  ] : borders.borderEndStartRadius,
                [containerVars.borderEndEndRadius    ] : borders.borderEndEndRadius,
                
                
                
                // spacings:
                [containerVars.paddingInline         ] : paddings.paddingInline,
                [containerVars.paddingBlock          ] : paddings.paddingBlock,
            }),
        }),
        containerVars,
    ];
};
//#endregion container


// borders:

//#region border as container
export interface BorderAsContainerOptions extends OrientationRuleOptions {
    itemsSelector ?: CssSelectorCollection
}
export const usesBorderAsContainer = (options?: BorderAsContainerOptions): CssRule => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(options);
    const {
        itemsSelector = '*',
    } = options;
    
    
    
    // dependencies:
    
    // layouts:
    const [containerRule, containerVars] = usesContainer();
    
    // borders:
    const [             , borders      ] = usesBorder();
    
    
    
    return style({
        ...imports([
            // layouts:
            containerRule, // define the container variables, so we can access them
        ]),
        // ...style({
        //     // borders:
        //     overflow : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
        // }),
        ...iif(!!orientationInlineSelector, rule(orientationInlineSelector, {
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
                        [borders.borderStartStartRadius      ] : `calc(${containerVars.borderStartStartRadius} - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borders.borderEndStartRadius        ] : `calc(${containerVars.borderEndStartRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
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
                        [borders.borderStartEndRadius        ] : `calc(${containerVars.borderStartEndRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borders.borderEndEndRadius          ] : `calc(${containerVars.borderEndEndRadius    } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
                        /* recursive calculation of borderRadius is not supported yet */
                    }),
                }),
            }),
        })),
        ...iif(!!orientationBlockSelector , rule(orientationBlockSelector,  {
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
                        [borders.borderStartStartRadius      ] : `calc(${containerVars.borderStartStartRadius} - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borders.borderStartEndRadius        ] : `calc(${containerVars.borderStartEndRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
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
                        [borders.borderEndStartRadius        ] : `calc(${containerVars.borderEndStartRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borders.borderEndEndRadius          ] : `calc(${containerVars.borderEndEndRadius    } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
                        /* recursive calculation of borderRadius is not supported yet */
                    }),
                }),
            }),
        })),
        ...iif((!orientationInlineSelector && !orientationBlockSelector), style({
            // children:
            ...children(itemsSelector, {
                ...ifVisibleChild({
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
                        [containerVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                        [containerVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                    }),
                    ...style({
                        // borders:
                        
                        // add rounded corners on top:
                        [borders.borderStartStartRadius      ] : `calc(${containerVars.borderStartStartRadius} - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borders.borderStartEndRadius        ] : `calc(${containerVars.borderStartEndRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
                        // add rounded corners on bottom:
                        [borders.borderEndStartRadius        ] : `calc(${containerVars.borderEndStartRadius  } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        [borders.borderEndEndRadius          ] : `calc(${containerVars.borderEndEndRadius    } - ${containerVars.borderWidth} - min(${containerVars.borderWidth}, 0.5px))`,
                        
                        /* recursive calculation of borderRadius is not supported yet */
                    }),
                }),
            }),
        })),
    });
};
//#endregion border as container

//#region border as separator
export interface BorderAsSeparatorOptions {
    itemsSelector ?: CssSelectorCollection
    swapFirstItem ?: boolean
}
const usesBorderAsSeparator = (block: boolean, options: BorderAsSeparatorOptions = {}): CssRule => {
    // options:
    const {
        itemsSelector = '*',
        swapFirstItem = false,
    } = options;
    
    
    
    // dependencies:
    
    // layouts:
    const [, containerVars] = usesContainer();
    
    // borders:
    const [, borders      ] = usesBorder();
    
    
    
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
                    [borders.borderStartStartRadius] : '0px',
                    [borders.borderStartEndRadius  ] : '0px',
                })
                :
                style({
                    // borders:
                    // remove rounded corners on left:
                    [borders.borderStartStartRadius] : '0px',
                    [borders.borderEndStartRadius  ] : '0px',
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
                    [borders.borderEndStartRadius  ] : '0px',
                    [borders.borderEndEndRadius    ] : '0px',
                })
                :
                style({
                    // borders:
                    // remove rounded corners on right:
                    [borders.borderStartEndRadius  ] : '0px',
                    [borders.borderEndEndRadius    ] : '0px',
                })
            ),
        }),
    });
};
export const usesBorderAsSeparatorBlock  = (options: BorderAsSeparatorOptions = {}) => usesBorderAsSeparator(true , options);
export const usesBorderAsSeparatorInline = (options: BorderAsSeparatorOptions = {}) => usesBorderAsSeparator(false, options);
//#endregion border as separator



// styles:
/**
 * Applies a responsive container layout.
 * @returns A `CssRule` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = () => {
    return style({
        // borders:
        
        // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
        ...extendsBorder(containers),
        
        
        
        // spacings:
        
        // let's Reusable-UI system to manage paddingInline & paddingBlock:
        ...extendsPadding(containers),
    });
};
/**
 * Applies a responsive container using grid layout.
 * @returns A `CssRule` represents a responsive container using grid layout.
 */
export const usesResponsiveContainerGridLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        // layouts:
        display             : 'grid', // use css grid for layouting
        // define our logical paddings:
        gridTemplateRows    : [[paddings.paddingBlock,  'auto', paddings.paddingBlock ]], // the height of each row
        gridTemplateColumns : [[paddings.paddingInline, 'auto', paddings.paddingInline]], // the width of each column
        gridTemplateAreas   : [[
            '"........... blockStart ........."',
            '"inlineStart  content   inlineEnd"',
            '"...........  blockEnd  ........."',
        ]],
        
        
        
        // borders:
        
        // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
        ...extendsBorder(containers),
        
        
        
        // spacings:
        
        // let's Reusable-UI system to manage paddingInline & paddingBlock:
        ...extendsPadding(containers),
        
        // since we have delegated the (logical) paddings to the grid, so the (actual) css paddings are no longer needed:
        ...style({
            paddingInline : null, // turn off physical padding, use logical padding we've set above
            paddingBlock  : null, // turn off physical padding, use logical padding we've set above
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
export const [containers, cssContainerConfig] = cssConfig(() => {
    return {
        // borders:
        borderWidth      : borderStrokes.none   as CssKnownProps['borderWidth'  ], // strip out <Basic>'s border
        borderRadius     : borderRadiuses.none  as CssKnownProps['borderRadius' ], // strip out <Basic>'s borderRadius
        
        
        
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
export interface ContainerProps<TElement extends Element = Element>
    extends
        // bases:
        BasicProps<TElement>
{
    // children:
    children ?: React.ReactNode
}
const Container = <TElement extends Element = Element>(props: ContainerProps<TElement>): JSX.Element|null => {
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
