// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a capability of UI to stack on top-most of another UI(s) regardless of DOM's stacking context:
    globalStacks,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // configs:
    containers,
}                           from '@reusable-ui/container'       // a base container UI of Reusable-UI components



// configs:
export const [navbars, navbarValues, cssNavbarConfig] = cssConfig(() => {
    const bases = {
        // layouts:
        display                     : 'grid'                            as CssKnownProps['display'         ],
        gridAutoFlow                : 'column'                          as CssKnownProps['gridAutoFlow'    ], // the items (logo, toggler, etc) placed automatically to a new column
        gridAutoColumns             : 'auto'                            as CssKnownProps['gridAutoColumns' ], // each items (logo, toggler, etc) take a space automatically
        gridTemplateRows            : [[
            '1fr', // limiting only one row, so the items (logo, toggler, etc) placed automatically to a new column
        ]]                                                              as CssKnownProps['gridTemplateRows'],
        justifyContent              : 'space-between'                   as CssKnownProps['justifyContent'  ], // separates each items as far as possible
        alignContent                : 'center'                          as CssKnownProps['alignContent'    ], // the excess vertical space placed at the top & bottom
        justifyItems                : 'center'                          as CssKnownProps['justifyItems'    ], // prevents from stretching
        alignItems                  : 'center'                          as CssKnownProps['alignItems'      ], // prevents from stretching
        
        
        
        // positions:
        zIndex                      : globalStacks.sticky               as CssKnownProps['zIndex'          ],
        position                    : 'sticky'                          as CssKnownProps['position'        ],
        insetBlockStart             : '0px'                             as CssKnownProps['insetBlockStart' ],
        
        
        
        // sizes:
        boxSizing                   : 'content-box'                     as CssKnownProps['boxSizing'       ],
        blockSize                   : 'auto'                            as CssKnownProps['blockSize'       ],
        
        
        
        // borders:
        borderWidth                 : '0px'                             as CssKnownProps['borderWidth'     ],
        borderRadius                : '0px'                             as CssKnownProps['borderRadius'    ],
        boxShadow                   : [
            [0, 0, '10px', 'rgba(0,0,0,0.5)'],
        ]                                                               as CssKnownProps['boxShadow'       ],
        
        
        
        // spacings:
        paddingInline               : containers.paddingInline          as CssKnownProps['paddingInline'   ],
        paddingBlock                : basics.paddingBlock               as CssKnownProps['paddingBlock'    ],
        gapInline                   : basics.paddingInline              as CssKnownProps['gapInline'       ],
        gapBlock                    : basics.paddingBlock               as CssKnownProps['gapBlock'        ],
        
        
        
        // lists:
        listGridAreaCollapse        : '2/1/2/3'                         as CssKnownProps['gridArea'        ],
        listGridAreaExpand          : 'unset'                           as CssKnownProps['gridArea'        ],
        
        listDisplay                 : 'flex'                            as CssKnownProps['display'         ],
        listFlexDirectionCollapse   : 'column'                          as CssKnownProps['flexDirection'   ],
        listFlexDirectionExpand     : 'row'                             as CssKnownProps['flexDirection'   ],
        listJustifySelf             : 'stretch'                         as CssKnownProps['justifySelf'     ],
        listAlignSelf               : 'stretch'                         as CssKnownProps['alignSelf'       ],
        
        listMarginInlineCollapse    : [[
            'calc(0px - ', containers.paddingInline, ')',
        ]]                                                              as CssKnownProps['marginInline'    ],
        listMarginBlockCollapse     : 'unset'                           as CssKnownProps['marginBlock'     ],
        listMarginInlineExpand      : 'unset'                           as CssKnownProps['marginInline'    ],
        listMarginBlockExpand       : [[
            'calc(0px - ', basics.paddingBlock, ')',
        ]]                                                              as CssKnownProps['marginBlock'     ],
        
        // floating lists:
        listPositionCollapse        : 'absolute'                        as CssKnownProps['position'        ],
        listPositionExpand          : 'unset'                           as CssKnownProps['position'        ],
        listInsetInlineCollapse     : '0px'                             as CssKnownProps['insetInline'     ],
        listInsetBlockStartCollapse : basics.paddingBlock               as CssKnownProps['insetBlockStart' ],
        listInsetInlineExpand       : 'unset'                           as CssKnownProps['insetInline'     ],
        listInsetBlockStartExpand   : 'unset'                           as CssKnownProps['insetBlockStart' ],
        
        
        
        // menus:
        menuDisplay                 : 'flex'                            as CssKnownProps['display'         ],
        menuFlexDirection           : 'row'                             as CssKnownProps['flexDirection'   ],
        menuJustifyContent          : 'center'                          as CssKnownProps['justifyContent'  ],
        menuAlignItems              : 'center'                          as CssKnownProps['alignItems'      ],
        menuFlexWrap                : 'nowrap'                          as CssKnownProps['flexWrap'        ],
        menuWhiteSpace              : 'nowrap'                          as CssKnownProps['whiteSpace'      ],
    };
    
    
    
    const defaults = {
        // lists:
        listGridArea                : bases.listGridAreaCollapse        as CssKnownProps['gridArea'        ],
        
        listFlexDirection           : bases.listFlexDirectionCollapse   as CssKnownProps['flexDirection'   ],
        
        listMarginInline            : bases.listMarginInlineCollapse    as CssKnownProps['marginInline'    ],
        listMarginBlock             : bases.listMarginBlockCollapse     as CssKnownProps['marginBlock'     ],
        
        // floating lists:
        listPosition                : bases.listPositionCollapse        as CssKnownProps['position'        ],
        listInsetInline             : bases.listInsetInlineCollapse     as CssKnownProps['insetInline'     ],
        listInsetBlockStart         : bases.listInsetBlockStartCollapse as CssKnownProps['insetBlockStart' ],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'navb' });
