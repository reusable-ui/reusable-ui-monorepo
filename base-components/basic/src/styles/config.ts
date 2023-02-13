// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a color management system:
    colors,
    
    
    
    // a border (stroke) management system:
    borders,
    borderRadiuses,
    
    
    
    // a spacer (gap) management system:
    spacers,
    
    
    
    // a typography management system:
    typos,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [basics, basicValues, cssBasicConfig] = cssConfig(() => {
    const transitionDuration = '300ms';
    
    return {
        // backgrounds:
        backg                : 'transparent'        as CssKnownProps['background'],
        altBackg             : colors.primary       as CssKnownProps['background'],
        backgGrad            : [
            ['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box'],
        ]                                           as CssKnownProps['backgroundImage'],
        
        
        
        // foregrounds:
        foreg                : 'currentColor'       as CssKnownProps['foreground'],
        altForeg             : colors.primaryText   as CssKnownProps['foreground'],
        
        
        
        // borders:
        borderStyle          : borders.style        as CssKnownProps['borderStyle' ],
        borderWidth          : borders.defaultWidth as CssKnownProps['borderWidth' ],
        borderColor          : borders.color        as CssKnownProps['borderColor' ],
        
        borderRadius         : borderRadiuses.md    as CssKnownProps['borderRadius'],
        borderRadiusSm       : borderRadiuses.sm    as CssKnownProps['borderRadius'],
        borderRadiusLg       : borderRadiuses.lg    as CssKnownProps['borderRadius'],
        
        
        
        // rings:
        ring                 : colors.secondaryThin as CssKnownProps['color'],
        
        
        
        // animations:
        transitionDuration   : transitionDuration   as CssKnownProps['transitionDuration'],
        transition           : [
            // appearances:
            ['opacity'      , transitionDuration, 'ease-out'],
            
            // sizes:
            ['inline-size'  , transitionDuration, 'ease-out'],
            ['block-size'   , transitionDuration, 'ease-out'],
            
            // backgrounds:
            ['background'   , transitionDuration, 'ease-out'],
            
            // foregrounds:
            ['color'        , transitionDuration, 'ease-out'],
            
            // borders:
            ['border'       , transitionDuration, 'ease-out'],
            ['border-radius', transitionDuration, 'ease-out'],
            
            // spacings:
         // ['padding'      , transitionDuration, 'ease-out'], // beautiful but uncomfortable
            
            // typos:
            ['font-size'    , transitionDuration, 'ease-out'],
        ]                                           as CssKnownProps['transition'],
        
        
        
        // spacings:
        paddingInline        : [['calc((', spacers.sm, '+', spacers.md, ')/2)']]    as CssKnownProps['paddingInline'],
        paddingBlock         : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']]    as CssKnownProps['paddingBlock' ],
        paddingInlineSm      : spacers.sm                                           as CssKnownProps['paddingInline'],
        paddingBlockSm       : spacers.xs                                           as CssKnownProps['paddingBlock' ],
        paddingInlineLg      : spacers.md                                           as CssKnownProps['paddingInline'],
        paddingBlockLg       : spacers.sm                                           as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSize             : typos.fontSizeMd                                                 as CssKnownProps['fontSize'      ],
        fontSizeSm           : [['calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)']]    as CssKnownProps['fontSize'      ],
        fontSizeLg           : typos.fontSizeLg                                                 as CssKnownProps['fontSize'      ],
        fontFamily           : 'inherit'                                                        as CssKnownProps['fontFamily'    ],
        fontWeight           : 'inherit'                                                        as CssKnownProps['fontWeight'    ],
        fontStyle            : 'inherit'                                                        as CssKnownProps['fontStyle'     ],
        textDecoration       : 'inherit'                                                        as CssKnownProps['textDecoration'],
        lineHeight           : 'inherit'                                                        as CssKnownProps['lineHeight'    ],
    };
}, { prefix: 'bsc' });
