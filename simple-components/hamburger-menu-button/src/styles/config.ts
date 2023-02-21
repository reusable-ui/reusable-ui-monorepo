// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



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
    
    // crossed => hamburger:
    const [keyframesHamburgeringTopRule, keyframesHamburgeringTop] = keyframes({
        from  : { transform: topTransformCrossed       },
        '43%' : { transform: topTransformHamburger     },
        '71%' : { transform: topTransformHamburgerOver, transformOrigin : [['91.7%', '12.5%']] },
        to    : { transform: topTransformHamburger     },
    });
    
    
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
    
    
    
    const hamburgerAnimDuration = '300ms';
    
    return {
        // animations:
        hamburgerTopTransformIn  : topTransformCrossed        as CssKnownProps['transform'],
        hamburgerMidTransformIn  : midTransformCrossed        as CssKnownProps['transform'],
        hamburgerBtmTransformIn  : btmTransformCrossed        as CssKnownProps['transform'],
        
        hamburgerTopTransformOut : topTransformHamburger      as CssKnownProps['transform'],
        hamburgerMidTransformOut : midTransformHamburger      as CssKnownProps['transform'],
        hamburgerBtmTransformOut : btmTransformHamburger      as CssKnownProps['transform'],
        
        
        
        ...keyframesCrossingTopRule,
        ...keyframesHamburgeringTopRule,
        ...keyframesCrossingMidRule,
        ...keyframesHamburgeringMidRule,
        ...keyframesCrossingBtmRule,
        ...keyframesHamburgeringBtmRule,
        
        hamburgerAnimDuration : hamburgerAnimDuration   as CssKnownProps['animationDuration'],
        
        hamburgerTopAnimIn    : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesCrossingTop    ],
        ]                                               as CssKnownProps['animation'],
        hamburgerMidAnimIn    : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesCrossingMid    ],
        ]                                               as CssKnownProps['animation'],
        hamburgerBtmAnimIn    : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesCrossingBtm    ],
        ]                                               as CssKnownProps['animation'],
        
        hamburgerTopAnimOut   : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesHamburgeringTop],
        ]                                               as CssKnownProps['animation'],
        hamburgerMidAnimOut   : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesHamburgeringMid],
        ]                                               as CssKnownProps['animation'],
        hamburgerBtmAnimOut   : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesHamburgeringBtm],
        ]                                               as CssKnownProps['animation'],
    };
}, { prefix: 'hbgmn' });
