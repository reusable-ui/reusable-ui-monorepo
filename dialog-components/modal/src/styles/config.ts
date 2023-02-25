// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    style,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // a capability of UI to highlight itself to attract user's attention:
    usesExcitable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [modals, modalValues, cssModalConfig] = cssConfig(() => {
    // dependencies:
    
    const {animationRegistry : {filters}              } = usesAnimation();
    const {excitableVars     : {filter: filterExcited}} = usesExcitable();
    
    
    
    //#region keyframes
    const frameCollapsed    = style({
        filter : [[
            'opacity(0)',
        ]]
    });
    const frameExpanded     = style({
        filter : [[
            'opacity(1)',
        ]]
    });
    const [keyframesExpandRule  , keyframesExpand  ] = keyframes({
        from  : frameCollapsed,
        to    : frameExpanded,
    });
    keyframesExpand.value   = 'expand';   // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseRule, keyframesCollapse] = keyframes({
        from  : frameExpanded,
        to    : frameCollapsed,
    });
    keyframesCollapse.value = 'collapse'; // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    
    
    
    const [keyframesExciteRule, keyframesExcite] = keyframes({
        from  : {
            filter : [[
                ...filters.filter((f) => (f !== filterExcited)), // the rest filter(s)
            ]],
        },
        to    : {
            filter : [[
                ...filters.filter((f) => (f !== filterExcited)), // the rest filter(s)
                filterExcited, // the interpolating filter
            ]],
        },
    });
    keyframesExcite.value = 'excite'; // the @keyframes name should contain 'excite' in order to be recognized by `useToggleExcitable`
    //#endregion keyframes
    
    
    
    return {
        // backgrounds:
        backg               : 'rgba(0,0,0, 0.5)'                    as CssKnownProps['background'],
        
        
        
        // borders:
        // modalUiBoxShadow    : [[0, 0, '10px', 'rgba(0,0,0,0.5)']]   as CssKnownProps['boxShadow' ],
        modalUiFilter: [
            ['drop-shadow(', 0, 0, '10px', 'rgba(0,0,0,0.5)', ')'],
        ]                                                           as CssKnownProps['filter'],
        
        
        
        // animations:
        ...keyframesExpandRule,
        ...keyframesCollapseRule,
        animExpand          : [
            ['300ms', 'ease-out', 'both', keyframesExpand  ],
        ]                                                           as CssKnownProps['animation'],
        animCollapse        : [
            ['500ms', 'ease-in' , 'both', keyframesCollapse],
        ]                                                           as CssKnownProps['animation'],
        
        modalUiFilterExcite : [[
            'invert(80%)',
        ]]                                                          as CssKnownProps['filter'   ],
        
        ...keyframesExciteRule,
        modalUiAnimExcite   : [
            ['150ms', 'ease', 'both', 'alternate-reverse', 5, keyframesExcite],
        ]                                                           as CssKnownProps['animation'],
    };
}, { prefix: 'mdl' });
