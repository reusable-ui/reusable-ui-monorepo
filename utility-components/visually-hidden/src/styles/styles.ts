// cssfn:
import {
    // writes css in javascript:
    style,
}                           from '@cssfn/core'                  // writes css in javascript



// styles:
export const usesVisuallyHiddenLayout = () => {
    return style({
        // layouts:
        display    : ['inline-block',  '!important'], // use inline block, so it takes the width & height as we set
        
        
        
        // positions:
        position   : ['absolute',      '!important'],
        
        
        
        // sizes:
        width      : ['1px',           '!important'],
        height     : ['1px',           '!important'],
        overflow   : ['hidden',        '!important'],
        clip       : ['rect(0,0,0,0)', '!important'],
        
        
        
        // borders:
        border     : ['none',          '!important'],
        
        
        
        // spacings:
        margin     : ['-1px',          '!important'], // fix for https://github.com/twbs/bootstrap/issues/25686
        padding    : [0,               '!important'],
        
        
        
        // typos:
        whiteSpace : ['nowrap',        '!important'],
    });
};

export default () => style({
    // layouts:
    ...usesVisuallyHiddenLayout(),
});
