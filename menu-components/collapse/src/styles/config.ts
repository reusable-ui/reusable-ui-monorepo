// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    fallbacks,
    style,
    
    
    
    // strongly typed of css variables:
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// internals:
import {
    // features:
    usesCollapse,
}                           from '../features/collapse.js'



// configs:
export const [collapses, collapseValues, cssCollapseConfig] = cssConfig(() => {
    // features:
    const {collapseVars} = usesCollapse();
    
    
    
    //#region keyframes
    const frameCollapsed    = style({
        maxBlockSize  : 0,
        
        overflowY     : 'clip',
        ...fallbacks({
            overflowY : 'hidden',
        }),
    });
    const frameIntermediate = style({
        overflowY     : 'clip',
        ...fallbacks({
            overflowY : 'hidden',
        }),
    });
    const frameExpanded     = style({
        maxBlockSize  : switchOf(
            collapseVars.lastKnownBlockSize,
            '100vh',
        ),
        
        overflowY     : 'unset',
    });
    const [keyframesExpandRule  , keyframesExpand  ] = keyframes({
        from  : frameCollapsed,
        '99%' : frameIntermediate,
        to    : frameExpanded,
    });
    keyframesExpand.value   = 'expand';   // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseRule, keyframesCollapse] = keyframes({
        from  : frameExpanded,
        '1%'  : frameIntermediate,
        to    : frameCollapsed,
    });
    keyframesCollapse.value = 'collapse'; // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    
    
    
    const frameCollapsedInline    = style({
        maxInlineSize : 0,
        
        overflowX     : 'clip',
        ...fallbacks({
            overflowX : 'hidden',
        }),
    });
    const frameIntermediateInline = style({
        overflowX     : 'clip',
        ...fallbacks({
            overflowX : 'hidden',
        }),
    });
    const frameExpandedInline     = style({
        maxInlineSize : switchOf(
            collapseVars.lastKnownInlineSize,
            '100vw',
        ),
        
        overflowX     : 'unset',
    });
    const [keyframesExpandInlineRule  , keyframesExpandInline  ] = keyframes({
        from  : frameCollapsedInline,
        '99%' : frameIntermediateInline,
        to    : frameExpandedInline,
    });
    keyframesExpandInline.value   = 'expandInline';   // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseInlineRule, keyframesCollapseInline] = keyframes({
        from  : frameExpandedInline,
        '1%'  : frameIntermediateInline,
        to    : frameCollapsedInline,
    });
    keyframesCollapseInline.value = 'collapseInline'; // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesExpandRule,
        ...keyframesCollapseRule,
        animExpand         : [
            ['300ms', 'ease-out', 'both', keyframesExpand  ],
        ]                                                       as CssKnownProps['animation'],
        animCollapse       : [
            ['300ms', 'ease-out', 'both', keyframesCollapse],
        ]                                                       as CssKnownProps['animation'],
        
        
        
        ...keyframesExpandInlineRule,
        ...keyframesCollapseInlineRule,
        animExpandInline   : [
            ['300ms', 'ease-out', 'both', keyframesExpandInline  ],
        ]                                                       as CssKnownProps['animation'],
        animCollapseInline : [
            ['300ms', 'ease-out', 'both', keyframesCollapseInline],
        ]                                                       as CssKnownProps['animation'],
    };
}, { prefix: 'clp' });
