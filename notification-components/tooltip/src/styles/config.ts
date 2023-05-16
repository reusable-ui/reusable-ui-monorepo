// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a typography management system:
    typos,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [tooltips, tooltipValues, cssTooltipConfig] = cssConfig(() => {
    const bases = {
        // sizes:
        arrowInlineSizeMd     : '0.8rem'                                                                    as CssKnownProps['inlineSize'     ],
        arrowBlockSizeMd      : '0.8rem'                                                                    as CssKnownProps['blockSize'      ],
        
     // arrowClipPath         : 'polygon(100% 0, 100% 100%, 0 100%)'                                        as CssKnownProps['clipPath'       ],
        arrowClipPath         : 'polygon(200% -100%, 200% 200%, -100% 200%)'                                as CssKnownProps['clipPath'       ], // compensates for boxShadow
        
        arrowTransform        : 'none'                                                                      as CssKnownProps['transform'      ],
        arrowTransformTop     : [['scaleX(0.7)', 'translateY(calc((50% - 0.8px) *  1))', 'rotate(45deg)' ]] as CssKnownProps['transform'      ],
        arrowTransformRight   : [['scaleY(0.7)', 'translateX(calc((50% - 0.8px) * -1))', 'rotate(135deg)']] as CssKnownProps['transform'      ],
        arrowTransformBottom  : [['scaleX(0.7)', 'translateY(calc((50% - 0.8px) * -1))', 'rotate(225deg)']] as CssKnownProps['transform'      ],
        arrowTransformLeft    : [['scaleY(0.7)', 'translateX(calc((50% - 0.8px) *  1))', 'rotate(315deg)']] as CssKnownProps['transform'      ],
        
        
        
        // borders:
        boxShadow             : [[0, 0, '10px', 'rgba(0,0,0,0.5)']]                                         as CssKnownProps['boxShadow'      ],
        
        
        
        // animations:
        transformOrigin       : 'center'                                                                    as CssKnownProps['transformOrigin'],
        transformOriginTop    : 'bottom'                                                                    as CssKnownProps['transformOrigin'],
        transformOriginRight  : 'left'                                                                      as CssKnownProps['transformOrigin'],
        transformOriginBottom : 'top'                                                                       as CssKnownProps['transformOrigin'],
        transformOriginLeft   : 'right'                                                                     as CssKnownProps['transformOrigin'],
        
        
        
        // typos:
        whiteSpace            : 'normal'                                                                    as CssKnownProps['whiteSpace'     ],
        fontSizeSm            : typos.fontSizeSm                                                            as CssKnownProps['fontSize'       ],
        fontSizeMd            : [['calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)']]               as CssKnownProps['fontSize'       ],
        fontSizeLg            : typos.fontSizeMd                                                            as CssKnownProps['fontSize'       ],
    };
    
    
    
    const subs = {
        // sizes:
        arrowInlineSizeSm     : [['calc((', bases.arrowInlineSizeMd, ')*0.75)']]                            as CssKnownProps['inlineSize'     ],
        arrowBlockSizeSm      : [['calc((', bases.arrowBlockSizeMd , ')*0.75)']]                            as CssKnownProps['blockSize'      ],
        arrowInlineSizeLg     : [['calc((', bases.arrowInlineSizeMd, ')*1.50)']]                            as CssKnownProps['inlineSize'     ],
        arrowBlockSizeLg      : [['calc((', bases.arrowBlockSizeMd , ')*1.50)']]                            as CssKnownProps['blockSize'      ],
    };
    
    
    
    const defaults = {
        // sizes:
        arrowInlineSize       : bases.arrowInlineSizeMd                                                     as CssKnownProps['inlineSize'     ],
        arrowBlockSize        : bases.arrowBlockSizeMd                                                      as CssKnownProps['blockSize'      ],
        
        
        
        // typos:
        fontSize              : bases.fontSizeMd                                                            as CssKnownProps['fontSize'       ],
    };
    
    
    
    return {
        ...bases,
        ...subs,
        ...defaults,
    };
}, { prefix: 'ttip' });
