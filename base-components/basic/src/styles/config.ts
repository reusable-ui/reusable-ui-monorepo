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
    const bases = {
        // backgrounds:
        backg                    : 'transparent'                                                    as CssKnownProps['background'        ],
        altBackg                 : colors.primary                                                   as CssKnownProps['background'        ],
        backgGrad                : [
            ['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box'],
        ]                                                                                           as CssKnownProps['backgroundImage'   ],
        
        
        
        // foregrounds:
        foreg                    : 'currentColor'                                                   as CssKnownProps['foreground'        ],
        altForeg                 : colors.primaryText                                               as CssKnownProps['foreground'        ],
        
        
        
        // borders:
        borderStyle              : borders.style                                                    as CssKnownProps['borderStyle'       ],
        borderWidth              : borders.defaultWidth                                             as CssKnownProps['borderWidth'       ],
        borderColor              : borders.color                                                    as CssKnownProps['borderColor'       ],
        
        borderRadiusSm           : borderRadiuses.sm                                                as CssKnownProps['borderRadius'      ],
        borderRadiusMd           : borderRadiuses.md                                                as CssKnownProps['borderRadius'      ],
        borderRadiusLg           : borderRadiuses.lg                                                as CssKnownProps['borderRadius'      ],
        
        
        
        // rings:
        ring                     : colors.secondaryThin                                             as CssKnownProps['color'             ],
        
        
        
        // animations:
        defaultAnimationDuration : '300ms'                                                          as CssKnownProps['animationDuration' ],
        
        
        
        // spacings:
        paddingInlineSm          : spacers.sm                                                       as CssKnownProps['paddingInline'     ],
        paddingBlockSm           : spacers.xs                                                       as CssKnownProps['paddingBlock'      ],
        paddingInlineMd          : [['calc((', spacers.sm, '+', spacers.md, ')/2)']]                as CssKnownProps['paddingInline'     ],
        paddingBlockMd           : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']]                as CssKnownProps['paddingBlock'      ],
        paddingInlineLg          : spacers.md                                                       as CssKnownProps['paddingInline'     ],
        paddingBlockLg           : spacers.sm                                                       as CssKnownProps['paddingBlock'      ],
        
        
        
        // typos:
        fontSizeSm               : [['calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)']]    as CssKnownProps['fontSize'          ],
        fontSizeMd               : typos.fontSizeMd                                                 as CssKnownProps['fontSize'          ],
        fontSizeLg               : typos.fontSizeLg                                                 as CssKnownProps['fontSize'          ],
        fontFamily               : 'inherit'                                                        as CssKnownProps['fontFamily'        ],
        fontWeight               : 'inherit'                                                        as CssKnownProps['fontWeight'        ],
        fontStyle                : 'inherit'                                                        as CssKnownProps['fontStyle'         ],
        textDecoration           : 'inherit'                                                        as CssKnownProps['textDecoration'    ],
        lineHeight               : 'inherit'                                                        as CssKnownProps['lineHeight'        ],
    };
    
    
    
    const subs = {
        // animations:
        transition               : [
            // appearances:
            ['opacity'      , bases.defaultAnimationDuration, 'ease-out'],
            
            // sizes:
            ['inline-size'  , bases.defaultAnimationDuration, 'ease-out'],
            ['block-size'   , bases.defaultAnimationDuration, 'ease-out'],
            
            // backgrounds:
            ['background'   , bases.defaultAnimationDuration, 'ease-out'],
            
            // foregrounds:
            ['color'        , bases.defaultAnimationDuration, 'ease-out'],
            
            // borders:
            ['border'       , bases.defaultAnimationDuration, 'ease-out'],
            ['border-radius', bases.defaultAnimationDuration, 'ease-out'],
            
            // spacings:
         // ['padding'      , bases.defaultAnimationDuration, 'ease-out'], // beautiful but uncomfortable
            
            // typos:
            ['font-size'    , bases.defaultAnimationDuration, 'ease-out'],
        ]                                                                                           as CssKnownProps['transition'        ],
    };
    
    
    
    const defaults = {
        // borders:
        borderRadius             : bases.borderRadiusMd                                             as CssKnownProps['borderRadius'      ],
        
        
        
        // spacings:
        paddingInline            : bases.paddingInlineMd                                            as CssKnownProps['paddingInline'     ],
        paddingBlock             : bases.paddingBlockMd                                             as CssKnownProps['paddingBlock'      ],
        
        
        
        // typos:
        fontSize                 : bases.fontSizeMd                                                 as CssKnownProps['fontSize'          ],
    };
    
    
    
    return {
        ...bases,
        ...subs,
        ...defaults,
    };
}, { prefix: 'bsc' });
