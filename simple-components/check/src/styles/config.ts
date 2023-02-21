// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    style,
    escapeSvg,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                          // writes css in javascript

// reusable-ui core:
import {
    // a capability of UI to be checked:
    usesCheckable,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [checks, checkValues, cssCheckConfig] = cssConfig(() => {
    // dependencies:
    
    const {checkableVars : {filterIn: checkFilterIn, filterOut: checkFilterOut, transformIn: checkTransformIn, transformOut: checkTransformOut}} = usesCheckable();
    
    
    
    //#region keyframes
    const frameChecked = style({
        filter    : [[
            checkFilterIn,
        ]],
        
        transform : [[
            checkTransformIn,
        ]],
    });
    const frameCleared = style({
        filter    : [[
            checkFilterOut,
        ]],
        
        transform : [[
            checkTransformOut,
        ]],
    });
    const [keyframesCheckRule, keyframesCheck] = keyframes({
        from  : frameCleared,
        to    : frameChecked,
    });
    keyframesCheck.value = 'check'; // the @keyframes name should contain 'check' in order to be recognized by `usesCheckable`
    const [keyframesClearRule, keyframesClear] = keyframes({
        from  : frameChecked,
        to    : frameCleared,
    });
    keyframesClear.value = 'clear'; // the @keyframes name should contain 'clear' in order to be recognized by `usesCheckable`
    
    
    
    const frameChecking = style({
        transformOrigin: 'left', 
        transform : [[
            'scaleX(1.2)', // add a bumpy effect
            checkTransformIn,
        ]],
    });
    const frameClearing = style({
        transformOrigin: 'right',
        transform : [[
            'scaleX(1.2)', // add a bumpy effect
            checkTransformOut,
        ]],
    });
    const [keyframesSwitchCheckRule, keyframesSwitchCheck] = keyframes({
        from  : frameCleared,
        '50%' : frameChecking,
        to    : frameChecked,
    });
    keyframesSwitchCheck.value = 'switchCheck'; // the @keyframes name should contain 'check' in order to be recognized by `usesCheckable`
    const [keyframesSwitchClearRule, keyframesSwitchClear] = keyframes({
        from  : frameChecked,
        '50%' : frameClearing,
        to    : frameCleared,
    });
    keyframesSwitchClear.value = 'switchClear'; // the @keyframes name should contain 'clear' in order to be recognized by `usesCheckable`
    //#endregion keyframes
    
    
    
    return {
        // spacings:
        spacing                 : '0.3em'   as CssKnownProps['gapInline'],
        
        
        
        // animations:
        // forked from Bootstrap 5:
        indicator               : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3 6-6'/></svg>")}")` as CssKnownProps['maskImage'],
        switchIndicator         : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#000'/></svg>")}")` as CssKnownProps['maskImage'],
        
        
        checkFilterIn           : [[
            'opacity(100%)',
        ]]                                  as CssKnownProps['filter'   ],
        checkFilterOut          : [[
            'opacity(0%)',
        ]]                                  as CssKnownProps['filter'   ],
        checkTransformIn        : 'initial' as CssKnownProps['transform'],
        checkTransformOut       : 'initial' as CssKnownProps['transform'],
        
        ...keyframesCheckRule,
        ...keyframesClearRule,
        checkAnimIn             : [
            ['150ms', 'ease-out', 'both', keyframesCheck      ],
        ]                                   as CssKnownProps['animation'],
        checkAnimOut            : [
            ['150ms', 'ease-out', 'both', keyframesClear      ],
        ]                                   as CssKnownProps['animation'],
        
        
        switchCheckFilterIn     : [[
            'opacity(100%)',
        ]]                                  as CssKnownProps['filter'   ],
        switchCheckFilterOut    : [[
            'opacity(50%)',
        ]]                                  as CssKnownProps['filter'   ],
        switchCheckTransformIn  : [[
            'translateX(0.5em)',
        ]]                                  as CssKnownProps['transform'],
        switchCheckTransformOut : [[
            'translateX(-0.5em)',
        ]]                                  as CssKnownProps['transform'],
        
        ...keyframesSwitchCheckRule,
        ...keyframesSwitchClearRule,
        switchCheckAnimIn       : [
            ['200ms', 'ease-out', 'both', keyframesSwitchCheck],
        ]                                   as CssKnownProps['animation'],
        switchCheckAnimOut      : [
            ['200ms', 'ease-out', 'both', keyframesSwitchClear],
        ]                                   as CssKnownProps['animation'],
    };
}, { prefix: 'chk' });
