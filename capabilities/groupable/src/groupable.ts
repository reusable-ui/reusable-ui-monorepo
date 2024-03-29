// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    CssSelectorCollection,
    
    
    
    // writes css in javascript:
    rule,
    children,
    nextSiblings,
    style,
    vars,
    iif,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    
    
    
    // writes complex stylesheets in simpler way:
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

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



// defaults:
export const defaultOrientationableOptions = defaultBlockOrientationableOptions;



// hooks:

// capabilities:

//#region groupable
export interface GroupableVars {
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
const [groupableVars] = cssVars<GroupableVars>({ prefix: 'gr', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



// rules:
// :where(...) => zero specificity => easy to overwrite further:
export const ifVisibleChild          = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign))'                                           , styles);

export const ifFirstVisibleChild     = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where(:first-child, .first-visible-child)' , styles);
export const ifLastVisibleChild      = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where( :last-child,  .last-visible-child)' , styles);
export const ifNotFirstVisibleChild  = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign, :first-child, .first-visible-child))'       , styles);
export const ifNotLastVisibleChild   = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign,  :last-child,  .last-visible-child))'       , styles);

export const ifSecondVisibleChild    = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign)):where(:nth-child(2))'                      , styles);
export const ifNotSecondVisibleChild = (styles: CssStyleCollection): CssRule => rule(':not(:where(.overlay, .foreign, :nth-child(2)))'                            , styles);



export interface GroupableStuff { groupableRule: Factory<CssRule>, separatorRule: Factory<CssRule>, groupableVars: CssVars<GroupableVars> }
export interface GroupableOptions extends OrientationableOptions {
    itemsSelector ?: CssSelectorCollection
    swapFirstItem ?: boolean
}
const groupableChildrenRuleOfOrientationInline = memoizeStyle((): CssRule => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    return style({
        ...ifFirstVisibleChild({
            ...vars({
                /*
                    if the_current_element is a_child_of_container and also a_separator,
                    the deleted `groupableVars.borderWidth` in separator must be pointed to container,
                    so we can calculate the correct inner_borderRadius.
                    
                    that's why we set `!important` to the `groupableVars.borderWidth`.
                */
                [groupableVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                
                /*
                    the two props below using `!important` to overwrite `groupableRule()`,
                    if the_current_element is a_child_of_container and also a_separator.
                */
                [groupableVars.borderStartStartRadius] : ['inherit', '!important'], // reads parent's prop
                [groupableVars.borderEndStartRadius  ] : ['inherit', '!important'], // reads parent's prop
            }),
            ...style({
                // borders:
                // add rounded corners on left:
                /*
                    the two props below using `!important` to overwrite `borderRule()`,
                    if the_current_element defines `...borderRule()`.
                */
                [borderVars.borderStartStartRadius   ] : [`calc(${groupableVars.borderStartStartRadius} - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`, '!important'],
                [borderVars.borderEndStartRadius     ] : [`calc(${groupableVars.borderEndStartRadius  } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`, '!important'],
                
                /* recursive calculation of borderRadius is not supported yet */
            }),
        }),
        ...ifLastVisibleChild({
            ...vars({
                /*
                    if the_current_element is a_child_of_container and also a_separator,
                    the deleted `groupableVars.borderWidth` in separator must be pointed to container,
                    so we can calculate the correct inner_borderRadius.
                    
                    that's why we set `!important` to the `groupableVars.borderWidth`.
                */
                [groupableVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                
                /*
                    the two props below using `!important` to overwrite `groupableRule()`,
                    if the_current_element is a_child_of_container and also a_separator.
                */
                [groupableVars.borderStartEndRadius  ] : ['inherit', '!important'], // reads parent's prop
                [groupableVars.borderEndEndRadius    ] : ['inherit', '!important'], // reads parent's prop
            }),
            ...style({
                // borders:
                // add rounded corners on right:
                /*
                    the two props below using `!important` to overwrite `borderRule()`,
                    if the_current_element defines `...borderRule()`.
                */
                [borderVars.borderStartEndRadius     ] : [`calc(${groupableVars.borderStartEndRadius  } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`, '!important'],
                [borderVars.borderEndEndRadius       ] : [`calc(${groupableVars.borderEndEndRadius    } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`, '!important'],
                
                /* recursive calculation of borderRadius is not supported yet */
            }),
        }),
    });
});
const groupableChildrenRuleOfOrientationBlock  = memoizeStyle((): CssRule => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    return style({
        ...ifFirstVisibleChild({
            ...vars({
                /*
                    if the_current_element is a_child_of_container and also a_separator,
                    the deleted `groupableVars.borderWidth` in separator must be pointed to container,
                    so we can calculate the correct inner_borderRadius.
                    
                    that's why we set `!important` to the `groupableVars.borderWidth`.
                */
                [groupableVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                
                /*
                    the two props below using `!important` to overwrite `groupableRule()`,
                    if the_current_element is a_child_of_container and also a_separator.
                */
                [groupableVars.borderStartStartRadius] : ['inherit', '!important'], // reads parent's prop
                [groupableVars.borderStartEndRadius  ] : ['inherit', '!important'], // reads parent's prop
            }),
            ...style({
                // borders:
                // add rounded corners on top:
                /*
                    the two props below using `!important` to overwrite `borderRule()`,
                    if the_current_element defines `...borderRule()`.
                */
                [borderVars.borderStartStartRadius   ] : [`calc(${groupableVars.borderStartStartRadius} - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`, '!important'],
                [borderVars.borderStartEndRadius     ] : [`calc(${groupableVars.borderStartEndRadius  } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`, '!important'],
                
                /* recursive calculation of borderRadius is not supported yet */
            }),
        }),
        ...ifLastVisibleChild({
            ...vars({
                /*
                    if the_current_element is a_child_of_container and also a_separator,
                    the deleted `groupableVars.borderWidth` in separator must be pointed to container,
                    so we can calculate the correct inner_borderRadius.
                    
                    that's why we set `!important` to the `groupableVars.borderWidth`.
                */
                [groupableVars.borderWidth           ] : ['inherit', '!important'], // reads parent's prop
                
                /*
                    the two props below using `!important` to overwrite `groupableRule()`,
                    if the_current_element is a_child_of_container and also a_separator.
                */
                [groupableVars.borderEndStartRadius  ] : ['inherit', '!important'], // reads parent's prop
                [groupableVars.borderEndEndRadius    ] : ['inherit', '!important'], // reads parent's prop
            }),
            ...style({
                // borders:
                // add rounded corners on bottom:
                /*
                    the two props below using `!important` to overwrite `borderRule()`,
                    if the_current_element defines `...borderRule()`.
                */
                [borderVars.borderEndStartRadius     ] : [`calc(${groupableVars.borderEndStartRadius  } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`, '!important'],
                [borderVars.borderEndEndRadius       ] : [`calc(${groupableVars.borderEndEndRadius    } - ${groupableVars.borderWidth} - min(${groupableVars.borderWidth}, 0.5px))`, '!important'],
                
                /* recursive calculation of borderRadius is not supported yet */
            }),
        }),
    });
});
/**
 * Groups a list of UIs into a single UI.
 * @param options  Options of `groupableRule`.
 * @returns A `GroupableStuff` represents the group rules.
 */
export const usesGroupable = (options?: GroupableOptions): GroupableStuff => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    options = orientationableStuff;
    const {
        itemsSelector = '*',
    } = options;
    
    
    
    // dependencies:
    
    // features:
    const {borderVars } = usesBorder();
    const {paddingVars} = usesPadding();
    
    
    
    return {
        groupableRule: () => style({
            ...vars({
                // borders:
                [groupableVars.borderWidth           ] : borderVars.borderWidth,
                
                [groupableVars.borderStartStartRadius] : borderVars.borderStartStartRadius,
                [groupableVars.borderStartEndRadius  ] : borderVars.borderStartEndRadius,
                [groupableVars.borderEndStartRadius  ] : borderVars.borderEndStartRadius,
                [groupableVars.borderEndEndRadius    ] : borderVars.borderEndEndRadius,
                
                
                
                // spacings:
                [groupableVars.paddingInline         ] : paddingVars.paddingInline,
                [groupableVars.paddingBlock          ] : paddingVars.paddingBlock,
            }),
            // ...style({
            //     // borders:
            //     overflow : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
            // }),
            ...ifOrientationInline(() => // inline
                children(itemsSelector, groupableChildrenRuleOfOrientationInline),
            ),
            ...ifOrientationBlock(() =>  // block
                children(itemsSelector, groupableChildrenRuleOfOrientationBlock),
            ),
        }),
        separatorRule: () => style({
            ...ifOrientationInline(() => // inline
                (
                    (options === undefined)
                    ||
                    (
                        (options.itemsSelector === '*')
                        &&
                        (options.swapFirstItem === false)
                    )
                )
                ?
                getDefaultSeparatorRuleInline()
                :
                createSeparatorRuleInline(options)
            ),
            ...ifOrientationBlock(() =>  // block
                (
                    (options === undefined)
                    ||
                    (
                        (options.itemsSelector === '*')
                        &&
                        (options.swapFirstItem === false)
                    )
                )
                ?
                getDefaultSeparatorRuleBlock()
                :
                createSeparatorRuleBlock(options)
            ),
        }),
        groupableVars,
    };
};
const createSeparatorRuleOf = (block: boolean, options?: GroupableOptions): CssRule => {
    // options:
    const {
        itemsSelector = '*',
        swapFirstItem = false,
    } = options ?? {};
    
    
    
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    return style({
        ...vars({
            /*
                if the_current_element is a container,
                the `groupableVars.borderWidth` will be deleted (not follow `borderWidth` again),
                because the_current_element becomes a separator.
                
                use `0px` instead of 0,
                because the value will be calculated in `calc()` expression.
            */
            [groupableVars.borderWidth] : '0px', // remove border
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
const createSeparatorRuleInline = (options?: GroupableOptions): CssRule => createSeparatorRuleOf(false, options);
const createSeparatorRuleBlock  = (options?: GroupableOptions): CssRule => createSeparatorRuleOf(true , options);
const getDefaultSeparatorRuleInline = memoizeStyle(() => createSeparatorRuleInline());
const getDefaultSeparatorRuleBlock  = memoizeStyle(() => createSeparatorRuleBlock());
//#endregion groupable
