// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    states,
    keyframes,
    ifNthChild,
    children,
    style,
    imports,
    
    
    
    // strongly typed of css variables:
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a typography management system:
    typos,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ifActive,
    MarkActiveOptions,
    markActive,
    
    
    
    // a capability of UI to be focused:
    ifFocus,
    
    
    
    // adds an interactive feel to a UI:
    ifArrive,
    
    
    
    // a capability of UI to be clicked:
    ifPress,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    usesButtonLayout,
    usesButtonVariants,
    usesButtonStates,
    
    ButtonStyle,
    ButtonVariant,
    ButtonType,
}                           from '@reusable-ui/button'          // a base component
import {
    // react components:
    ToggleButtonProps,
    ToggleButton,
    
    ToggleButtonComponentProps,
}                           from '@reusable-ui/toggle-button'   // a base component

// internals:
import {
    // a hamburger menu animation:
    usesHamburgerable,
}                           from './hamburgerable.js'



// defaults:
const _defaultMarkActiveOptions : MarkActiveOptions = { mild: null };



// configs:
export const [hamburgerMenuButtons, hamburgerMenuButtonValues, cssHamburgerMenuButtonConfig] = cssConfig(() => {
    //#region keyframes
    const topTransformHamburger     : CssKnownProps['transform'] = [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]];
    const topTransformHamburgerOver : CssKnownProps['transform'] = [['rotate(15deg)' , 'scaleX(1)'   , 'translate(0, 0)',    ]];
    
    const topTransformCrossed       : CssKnownProps['transform'] = [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]];
    const topTransformCrossedOver   : CssKnownProps['transform'] = [['rotate(-60deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]];
    
    
    const midTransformHamburger     : CssKnownProps['transform'] = [[                  'scaleX(1)'   ,                       ]];
    const midTransformHamburgerOver : CssKnownProps['transform'] = [[                  'scaleX(1.35)'                        ]];
    
    const midTransformCrossed       : CssKnownProps['transform'] = [[                  'scaleX(0)'   ,                       ]];
    const midTransformCrossedOver   : CssKnownProps['transform'] = [[                  'scaleX(1.35)'                        ]];
    
    
    const btmTransformHamburger     : CssKnownProps['transform'] = [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]];
    const btmTransformHamburgerOver : CssKnownProps['transform'] = [['rotate(-15deg)', 'scaleX(1)'   , 'translate(0, 0)',    ]];
    
    const btmTransformCrossed       : CssKnownProps['transform'] = [['rotate(45deg)' , 'scaleX(1.35)', 'translate(0, -37.5%)']];
    const btmTransformCrossedOver   : CssKnownProps['transform'] = [['rotate(60deg)' , 'scaleX(1.35)', 'translate(0, -37.5%)']];
    
    
    
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



// styles:
const svgElm = ':where(svg)' // zero degree specificity to be easily overwritten



export const usesHamburgerLayout = () => {
    // dependencies:
    
    // states:
    const {hamburgerableVars} = usesHamburgerable();
    
    
    
    return style({
        // appearances:
        overflow   : 'visible', // allows the <polyline> to overflow the <svg>
        
        
        
        // sizes:
        // fills the entire parent text's height:
        inlineSize : 'auto', // calculates the width by [blockSize * aspect_ratio]
        blockSize  : `calc(1em * ${switchOf(basics.lineHeight, typos.lineHeight)})`,
        
        
        
        // children:
        ...children('polyline', {
            // appearances:
            stroke        : 'currentColor', // set menu color as parent's font color
            strokeWidth   : '4',            // set menu thickness, 4 of 24 might enough
            strokeLinecap : 'square',       // set menu edges square
            
            
            
            // animations:
            transformOrigin : '50% 50%',
            ...ifNthChild(0, 1, {
                transform : hamburgerableVars.topTransform,
                anim      : hamburgerableVars.topAnim,
            }),
            ...ifNthChild(0, 2, {
                transform : hamburgerableVars.midTransform,
                anim      : hamburgerableVars.midAnim,
            }),
            ...ifNthChild(0, 3, {
                transform : hamburgerableVars.btmTransform,
                anim      : hamburgerableVars.btmAnim,
            }),
        }),
    });
};
export const usesHamburgerMenuButtonLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesButtonLayout(),
        ]),
        ...style({
            // children:
            ...children(svgElm, {
                ...imports([
                    usesHamburgerLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(hamburgerMenuButtons), // apply config's cssProps
        }),
    });
};
export const usesHamburgerMenuButtonVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(hamburgerMenuButtons);
    
    
    
    return style({
        ...imports([
            // variants:
            usesButtonVariants(),
            resizableRule,
        ]),
    });
};
export const usesHamburgerMenuButtonStates = () => {
    // dependencies:
    
    // states:
    const {hamburgerableRule} = usesHamburgerable(hamburgerMenuButtons);
    
    
    
    return style({
        ...imports([
            // states:
            usesButtonStates(),
            hamburgerableRule,
        ]),
        ...states([
            ifActive({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            ifFocus({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            ifArrive({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            ifPress({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
        ]),
    });
};

export const useHamburgerMenuButtonStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesHamburgerMenuButtonLayout(),
        
        // variants:
        usesHamburgerMenuButtonVariants(),
        
        // states:
        usesHamburgerMenuButtonStates(),
    ]),
}), { enabled: true, id: '5sj70x1zsf' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface HamburgerMenuButtonProps
    extends
        // bases:
        Omit<ToggleButtonProps,
            // links:
            |'href' // link href is not supported
            
            
            
            // variants:
            |'orientation' // orientation is not supported
            
            
            
            // children:
            |'children' // children is not supported
        >,
        
        // components:
        ToggleButtonComponentProps
{
}
const HamburgerMenuButton = (props: HamburgerMenuButtonProps): JSX.Element|null => {
    // styles:
    const styleSheet = useHamburgerMenuButtonStyleSheet();
    
    
    
    // rest props:
    const {
        // components:
        toggleButtonComponent = (<ToggleButton /> as React.ReactComponentElement<any, ToggleButtonProps>),
    ...restToggleButtonProps} = props;
    
    
    
    // jsx:
    /* <ToggleButton> */
    return React.cloneElement<ToggleButtonProps>(toggleButtonComponent,
        // props:
        {
            // other props:
            ...restToggleButtonProps,
            ...toggleButtonComponent.props, // overwrites restToggleButtonProps (if any conflics)
            
            
            
            // accessibilities:
            label     : toggleButtonComponent.props.label     ?? props.label     ?? 'Toggle navigation',
            
            
            
            // classes:
            mainClass : toggleButtonComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
        },
        
        
        
        // children:
        toggleButtonComponent.props.children ?? (
            <svg viewBox='0 0 24 24'>
                <polyline points='2,3 22,3' />
                <polyline points='2,12 22,12' />
                <polyline points='2,21 22,21' />
            </svg>
        ),
    );
};
export {
    HamburgerMenuButton,
    HamburgerMenuButton as default,
}

export type { ButtonStyle, ButtonVariant, ButtonType }
