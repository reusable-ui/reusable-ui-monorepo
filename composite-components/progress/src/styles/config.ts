// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a spacer (gap) management system:
    spacers,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    basics,
    basicValues,
}                           from '@reusable-ui/basic'           // a base component



// configs:
export const [progresses, progressValues, cssProgressConfig] = cssConfig(() => {
    //#region keyframes
    const [keyframesItemRunningRule, keyframesItemRunning] = keyframes({
        from  : {
            backgroundPositionX : ['1rem', 0],
        },
        to    : {
            backgroundPositionX : [0, 0],
        },
    });
    keyframesItemRunning.value = 'running'; // the @keyframes name should contain 'running' in order to be recognized by `useRunnable`
    
    
    
    const [keyframesItemRunningBlockRule, keyframesItemRunningBlock] = keyframes({
        from  : {
            backgroundPositionY : ['1rem', 0],
        },
        to    : {
            backgroundPositionY : [0, 0],
        },
    });
    keyframesItemRunningBlock.value = 'runningBlock'; // the @keyframes name should contain 'running' in order to be recognized by `useRunnable`
    //#endregion keyframes
    
    
    
    return {
        // sizes:
        minInlineSize            : '8rem'       as CssKnownProps['minInlineSize'], // fills the entire parent's width:
        minBlockSize             : 'auto'       as CssKnownProps['minBlockSize' ], // depends on ProgressBar's height
        
        minInlineSizeBlock       : 'auto'       as CssKnownProps['minInlineSize'], // depends on ProgressBar's width
        minBlockSizeBlock        : '8rem'       as CssKnownProps['minBlockSize' ], // manually set the min height
        
        
        
        // backgrounds:
        backgGrad      : basics.backgGrad       as CssKnownProps['backgroundImage'],
        backgGradBlock : (() => {
            const value = [[...(basicValues.backgGrad as Extract<CssKnownProps['backgroundImage'], any[][]>)[0]]] as Extract<CssKnownProps['backgroundImage'], any[][]>;
            value[0][0] = value[0][0].toString().replace('180deg', '270deg');
            return value;
        })()                                    as CssKnownProps['backgroundImage'],
        
        barBackgStripedImg       : 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)'   as CssKnownProps['backgroundImage'],
        barBackgStripedWidth     : '1rem'       as CssKnownProps['backgroundSize' ],
        barBackgStripedWidthSm   : '0.25rem'    as CssKnownProps['backgroundSize' ],
        barBackgStripedWidthLg   : '3rem'       as CssKnownProps['backgroundSize' ],
        barBackgStripedHeight    : '1rem'       as CssKnownProps['backgroundSize' ],
        barBackgStripedHeightSm  : '0.25rem'    as CssKnownProps['backgroundSize' ],
        barBackgStripedHeightLg  : '3rem'       as CssKnownProps['backgroundSize' ],
        
        
        
        barBoxSizing             : 'border-box' as CssKnownProps['boxSizing'    ], // the final size is including borders & paddings
        
        barMinInlineSize         : 'unset'      as CssKnownProps['minInlineSize'],
        barMinBlockSize          : spacers.md   as CssKnownProps['minBlockSize' ],
        barMinBlockSizeSm        : spacers.xs   as CssKnownProps['minBlockSize' ],
        barMinBlockSizeLg        : spacers.xl   as CssKnownProps['minBlockSize' ],
        
        barMinBlockSizeBlock     : 'unset'      as CssKnownProps['minBlockSize' ],
        barMinInlineSizeBlock    : spacers.md   as CssKnownProps['minInlineSize'],
        barMinInlineSizeBlockSm  : spacers.xs   as CssKnownProps['minInlineSize'],
        barMinInlineSizeBlockLg  : spacers.xl   as CssKnownProps['minInlineSize'],
        
        
        
        // spacings:
        barPaddingInline         : '0px'        as CssKnownProps['paddingInline'],
        barPaddingBlock          : '0px'        as CssKnownProps['paddingBlock' ],
        
        
        
        // animations:
        ...keyframesItemRunningRule,
        ...keyframesItemRunningBlockRule,
        barAnimRunning           : [
            ['1000ms', 'linear', 'both', 'infinite', keyframesItemRunning]
        ]                                       as CssKnownProps['animation'],
        barAnimRunningBlock      : [
            ['1000ms', 'linear', 'both', 'infinite', keyframesItemRunningBlock]
        ]                                       as CssKnownProps['animation'],
    };
}, { prefix: 'prgs' });
