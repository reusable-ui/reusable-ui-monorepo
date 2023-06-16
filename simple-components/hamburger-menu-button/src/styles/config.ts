// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component



// configs:
export const [hamburgerMenuButtons, hamburgerMenuButtonValues, cssHamburgerMenuButtonConfig] = cssConfig(() => {
    //#region keyframes
    const topTransformHamburger     : CssKnownProps['transform'] = [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]];
    const topTransformHamburgerOver : CssKnownProps['transform'] = [['rotate(15deg)' , 'scaleX(1)'   , 'translate(0, 0)',    ]];
    
    const topTransformCrossed       : CssKnownProps['transform'] = [['rotate(-45deg)', 'scaleX(1.41)', 'translate(0, 33.3%)' ]];
    const topTransformCrossedOver   : CssKnownProps['transform'] = [['rotate(-60deg)', 'scaleX(1.41)', 'translate(0, 33.3%)' ]];
    
    
    const midTransformHamburger     : CssKnownProps['transform'] = [[                  'scaleX(1)'   ,                       ]];
    const midTransformHamburgerOver : CssKnownProps['transform'] = [[                  'scaleX(1.41)'                        ]];
    
    const midTransformCrossed       : CssKnownProps['transform'] = [[                  'scaleX(0)'   ,                       ]];
    const midTransformCrossedOver   : CssKnownProps['transform'] = [[                  'scaleX(1.41)'                        ]];
    
    
    const btmTransformHamburger     : CssKnownProps['transform'] = [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]];
    const btmTransformHamburgerOver : CssKnownProps['transform'] = [['rotate(-15deg)', 'scaleX(1)'   , 'translate(0, 0)',    ]];
    
    const btmTransformCrossed       : CssKnownProps['transform'] = [['rotate(45deg)' , 'scaleX(1.41)', 'translate(0, -33.3%)']];
    const btmTransformCrossedOver   : CssKnownProps['transform'] = [['rotate(60deg)' , 'scaleX(1.41)', 'translate(0, -33.3%)']];
    
    
    
    // hamburger => crossed:
    const [keyframesCrossingTopRule    , keyframesCrossingTop    ] = keyframes({
        from  : { transform: topTransformHamburger     },
        '43%' : { transform: topTransformCrossed       },
        '71%' : { transform: topTransformCrossedOver   },
        to    : { transform: topTransformCrossed       },
    });
    keyframesCrossingTop.value     = 'hamburgerout'; // the @keyframes name should contain 'hamburgerout' in order to be recognized by `useHamburgerable`
    
    // crossed => hamburger:
    const [keyframesHamburgeringTopRule, keyframesHamburgeringTop] = keyframes({
        from  : { transform: topTransformCrossed       },
        '43%' : { transform: topTransformHamburger     },
        '71%' : { transform: topTransformHamburgerOver, transformOrigin : [['91.7%', '12.5%']] },
        to    : { transform: topTransformHamburger     },
    });
    keyframesHamburgeringTop.value = 'hamburgerin';  // the @keyframes name should contain 'hamburgerin'  in order to be recognized by `useHamburgerable`
    
    
    // hamburger => crossed:
    const [keyframesCrossingMidRule    , keyframesCrossingMid    ] = keyframes({
        from  : { transform: midTransformHamburger     },
        '19%' : { transform: midTransformCrossedOver   },
        to    : { transform: midTransformCrossed       },
    });
    
    // crossed => hamburger:
    const [keyframesHamburgeringMidRule, keyframesHamburgeringMid] = keyframes({
        from  : { transform: midTransformCrossed       },
        '81%' : { transform: midTransformHamburgerOver },
        to    : { transform: midTransformHamburger     },
    });
    
    
    // hamburger => crossed:
    const [keyframesCrossingBtmRule    , keyframesCrossingBtm    ] = keyframes({
        from  : { transform: btmTransformHamburger     },
        '43%' : { transform: btmTransformCrossed       },
        '71%' : { transform: btmTransformCrossedOver   },
        to    : { transform: btmTransformCrossed       },
    });
    
    // crossed => hamburger:
    const [keyframesHamburgeringBtmRule, keyframesHamburgeringBtm] = keyframes({
        from  : { transform: btmTransformCrossed       },
        '43%' : { transform: btmTransformHamburger     },
        '71%' : { transform: btmTransformHamburgerOver, transformOrigin : [['91.7%', '87.5%']] },
        to    : { transform: btmTransformHamburger     },
    });
    //#endregion keyframes
    
    
    
    const bases = {
        // animations:
        hamburgerTopTransformIn  : topTransformCrossed              as CssKnownProps['transform'        ],
        hamburgerMidTransformIn  : midTransformCrossed              as CssKnownProps['transform'        ],
        hamburgerBtmTransformIn  : btmTransformCrossed              as CssKnownProps['transform'        ],
        
        hamburgerTopTransformOut : topTransformHamburger            as CssKnownProps['transform'        ],
        hamburgerMidTransformOut : midTransformHamburger            as CssKnownProps['transform'        ],
        hamburgerBtmTransformOut : btmTransformHamburger            as CssKnownProps['transform'        ],
        
        defaultAnimationDuration : basics.defaultAnimationDuration  as CssKnownProps['animationDuration'],
    };
    
    
    
    const subs = {
        // animations:
        ...keyframesCrossingTopRule,
        ...keyframesHamburgeringTopRule,
        ...keyframesCrossingMidRule,
        ...keyframesHamburgeringMidRule,
        ...keyframesCrossingBtmRule,
        ...keyframesHamburgeringBtmRule,
        
        hamburgerTopAnimIn       : [
            [bases.defaultAnimationDuration, 'ease-out', 'both', keyframesCrossingTop    ],
        ]                                                           as CssKnownProps['animation'        ],
        hamburgerMidAnimIn       : [
            [bases.defaultAnimationDuration, 'ease-out', 'both', keyframesCrossingMid    ],
        ]                                                           as CssKnownProps['animation'        ],
        hamburgerBtmAnimIn       : [
            [bases.defaultAnimationDuration, 'ease-out', 'both', keyframesCrossingBtm    ],
        ]                                                           as CssKnownProps['animation'        ],
        
        hamburgerTopAnimOut      : [
            [bases.defaultAnimationDuration, 'ease-out', 'both', keyframesHamburgeringTop],
        ]                                                           as CssKnownProps['animation'        ],
        hamburgerMidAnimOut      : [
            [bases.defaultAnimationDuration, 'ease-out', 'both', keyframesHamburgeringMid],
        ]                                                           as CssKnownProps['animation'        ],
        hamburgerBtmAnimOut      : [
            [bases.defaultAnimationDuration, 'ease-out', 'both', keyframesHamburgeringBtm],
        ]                                                           as CssKnownProps['animation'        ],
    };
    
    
    
    return {
        ...bases,
        ...subs,
    };
}, { prefix: 'hbgmn' });
