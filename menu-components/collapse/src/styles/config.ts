// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    fallback,
    style,
    
    
    
    // strongly typed of css variables:
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    usesLastKnownExpandedSize,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// TODO: experimental
// // internals:
// import {
//     // features:
//     usesCollapse,
// }                           from '../features/collapse.js'



// configs:
export const [collapses, collapseValues, cssCollapseConfig] = cssConfig(() => {
    // features:
    const {paddingVars              } = usesPadding();
    const {lastKnownExpandedSizeVars} = usesLastKnownExpandedSize();
    // const {collapseVars             } = usesCollapse(); // TODO: experimental
    
    
    
    //#region keyframes
    const frameCollapsedBlock     = style({
        maxBlockSize       : 0,
        paddingBlock       : 0,
        
        overflowY          : 'clip',
        ...fallback({
            overflowY      : 'hidden',
        }),
    });
    const frameIntermediateBlock  = style({
        // blockSize       : `calc-size(${collapseVars.blockSize }, size * 1.05)`, // TODO: experimental
        // maxBlockSize    : `calc-size(${collapseVars.blockSize }, size * 1.05)`, // TODO: experimental
        ...fallback({
            blockSize      : `calc(${
                switchOf(
                    lastKnownExpandedSizeVars.blockSize,
                    '100vh',
                )
            } * 1.05)`,
            maxBlockSize   : `calc(${
                switchOf(
                    lastKnownExpandedSizeVars.blockSize,
                    '100vh',
                )
            } * 1.05)`,
        }),
        paddingBlock       : `calc(${paddingVars.paddingBlock } * 1.05)`,
    });
    const frameFinalizingBlock    = style({
        overflowY          : 'clip',
        ...fallback({
            overflowY      : 'hidden',
        }),
    });
    const frameExpandedBlock      = style({
        // blockSize       : `calc-size(${collapseVars.blockSize }, size)`, // TODO: experimental
        // maxBlockSize    : `calc-size(${collapseVars.blockSize }, size)`, // TODO: experimental
        ...fallback({
            blockSize      : switchOf(
                lastKnownExpandedSizeVars.blockSize,
                '100vh',
            ),
            maxBlockSize   : switchOf(
                lastKnownExpandedSizeVars.blockSize,
                '100vh',
            ),
        }),
        paddingBlock       : paddingVars.paddingBlock,
        
        overflowY          : 'unset',
    });
    const [keyframesExpandBlockRule   , keyframesExpandBlock   ] = keyframes({
        from               : frameCollapsedBlock,
        '70%'              : frameIntermediateBlock,
        '99%'              : frameFinalizingBlock,
        to                 : frameExpandedBlock,
    });
    keyframesExpandBlock.value    = 'expandBlock';    // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseBlockRule , keyframesCollapseBlock ] = keyframes({
        from               : frameExpandedBlock,
        '30%'              : frameIntermediateBlock,
        '1%'               : frameFinalizingBlock,
        to                 : frameCollapsedBlock,
    });
    keyframesCollapseBlock.value  = 'collapseBlock';  // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    
    
    
    const frameCollapsedInline    = style({
        maxInlineSize      : 0,
        paddingInline      : 0,
        
        overflowX          : 'clip',
        ...fallback({
            overflowX      : 'hidden',
        }),
    });
    const frameIntermediateInline = style({
        // inlineSize      : `calc-size(${collapseVars.inlineSize}, size * 1.05)`, // TODO: experimental
        // maxInlineSize   : `calc-size(${collapseVars.inlineSize}, size * 1.05)`, // TODO: experimental
        ...fallback({
            inlineSize     : `calc(${
                switchOf(
                    lastKnownExpandedSizeVars.inlineSize,
                    '100vh',
                )
            } * 1.05)`,
            maxInlineSize  : `calc(${
                switchOf(
                    lastKnownExpandedSizeVars.inlineSize,
                    '100vh',
                )
            } * 1.05)`,
        }),
        paddingInline      : `calc(${paddingVars.paddingInline} * 1.05)`,
    });
    const frameFinalizingInline   = style({
        overflowX          : 'clip',
        ...fallback({
            overflowX      : 'hidden',
        }),
    });
    const frameExpandedInline     = style({
        // inlineSize      : `calc-size(${collapseVars.inlineSize}, size)`, // TODO: experimental
        // maxInlineSize   : `calc-size(${collapseVars.inlineSize}, size)`, // TODO: experimental
        ...fallback({
            inlineSize     : switchOf(
                lastKnownExpandedSizeVars.inlineSize,
                '100vh',
            ),
            maxInlineSize  : switchOf(
                lastKnownExpandedSizeVars.inlineSize,
                '100vh',
            ),
        }),
        paddingInline      : paddingVars.paddingInline,
        
        overflowX          : 'unset',
    });
    const [keyframesExpandInlineRule  , keyframesExpandInline  ] = keyframes({
        from               : frameCollapsedInline,
        '70%'              : frameIntermediateInline,
        '99%'              : frameFinalizingInline,
        to                 : frameExpandedInline,
    });
    keyframesExpandInline.value   = 'expandInline';   // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseInlineRule, keyframesCollapseInline] = keyframes({
        from               : frameExpandedInline,
        '30%'              : frameIntermediateInline,
        '1%'               : frameFinalizingInline,
        to                 : frameCollapsedInline,
    });
    keyframesCollapseInline.value = 'collapseInline'; // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    //#endregion keyframes
    
    
    
    const bases = {
        // sizes:
        inlineSize         : 'fit-content'                          as CssKnownProps['inlineSize'   ],
        blockSize          : 'fit-content'                          as CssKnownProps['blockSize'    ],
        
        
        
        // animations:
        ...keyframesExpandBlockRule,
        ...keyframesCollapseBlockRule,
        animExpandBlock    : [
            ['300ms', 'ease-out', 'both', keyframesExpandBlock   ],
        ]                                                           as CssKnownProps['animation'    ],
        animCollapseBlock  : [
            ['300ms', 'ease-out', 'both', keyframesCollapseBlock ],
        ]                                                           as CssKnownProps['animation'    ],
        
        
        
        ...keyframesExpandInlineRule,
        ...keyframesCollapseInlineRule,
        animExpandInline   : [
            ['300ms', 'ease-out', 'both', keyframesExpandInline  ],
        ]                                                           as CssKnownProps['animation'    ],
        animCollapseInline : [
            ['300ms', 'ease-out', 'both', keyframesCollapseInline],
        ]                                                           as CssKnownProps['animation'    ],
        
        
        
        // spacings:
        paddingInline      : '0px'                                  as CssKnownProps['paddingInline'],
        paddingBlock       : '0px'                                  as CssKnownProps['paddingBlock' ],
    };
    
    
    
    const defaults = {
        // animations:
        animExpand         : bases.animExpandBlock                  as CssKnownProps['animation'    ],
        animCollapse       : bases.animCollapseBlock                as CssKnownProps['animation'    ],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'clp' });
