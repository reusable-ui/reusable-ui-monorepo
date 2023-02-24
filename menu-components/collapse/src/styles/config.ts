// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    fallbacks,
    style,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [collapses, collapseValues, cssCollapseConfig] = cssConfig(() => {
    //#region keyframes
    const frameCollapsed    = style({
        overflowY     : 'clip',
        ...fallbacks({
            overflowY     : 'hidden',
        }),
        maxBlockSize  : 0,
    });
    const frameIntermediate = style({
        overflowY     : 'clip',
        ...fallbacks({
            overflowY     : 'hidden',
        }),
        maxBlockSize  : '100vh',
    });
    const frameExpanded     = style({
        overflowY     : 'unset',
        maxBlockSize  : 'unset',
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
        overflowX     : 'clip',
        ...fallbacks({
            overflowX     : 'hidden',
        }),
        maxInlineSize : 0,
    });
    const frameIntermediateInline = style({
        overflowX     : 'clip',
        ...fallbacks({
            overflowX     : 'hidden',
        }),
        maxInlineSize : '100vw',
    });
    const frameExpandedInline     = style({
        overflowX     : 'unset',
        maxInlineSize : 'unset',
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
            ['300ms', 'ease-in' , 'both', keyframesExpand  ],
        ]                                                       as CssKnownProps['animation'],
        animCollapse       : [
            ['500ms', 'ease-out', 'both', keyframesCollapse],
        ]                                                       as CssKnownProps['animation'],
        
        
        
        ...keyframesExpandInlineRule,
        ...keyframesCollapseInlineRule,
        animExpandInline   : [
            ['300ms', 'ease-in' , 'both', keyframesExpandInline  ],
        ]                                                       as CssKnownProps['animation'],
        animCollapseInline : [
            ['500ms', 'ease-out', 'both', keyframesCollapseInline],
        ]                                                       as CssKnownProps['animation'],
    };
}, { prefix: 'clps' });
