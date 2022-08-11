// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    states,
    keyframes,
    ifNthChild,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    fallbacks as switchOf,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import type {
    // hooks:
    ThemeName,
}                           from '@reusable-ui/themable'        // color options of UI
import {
    // hooks:
    mildOf,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI

// reusable-ui states:
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated
import {
    // hooks:
    ifFocus,
}                           from '@reusable-ui/focusable'       // a capability of UI to be focused
import {
    // hooks:
    ifArrive,
}                           from '@reusable-ui/interactable'    // adds an interactive feel to a UI
import {
    // hooks:
    ifPress,
}                           from '@reusable-ui/clickable'       // a capability of UI to be clicked
import {
    // hooks:
    usesHamburgerable,
}                           from '@reusable-ui/hamburgerable'   // a hamburger menu animation

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    markActive       as baseMarkActive,
    usesThemeDefault as baseUsesThemeDefault,
    usesThemeActive  as baseUsesThemeActive,
}                           from '@reusable-ui/control'         // a base component
import {
    // types:
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    
    
    
    // styles:
    usesToggleButtonLayout,
    usesToggleButtonVariants,
    usesToggleButtonStates,
    
    
    
    // react components:
    ToggleButtonProps,
    ToggleButton,
}                           from '@reusable-ui/toggle-button'   // a base component



// hooks:

// states:

//#region activatable
export const markActive = (): CssRule => style({
    ...imports([
        baseMarkActive(),
        
        mildOf(null),      // keeps mild variant
        
        usesThemeActive(), // switch to active theme
    ]),
});

/**
 * Creates a default theme color rules.
 * @param themeName The theme name as the default theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a default theme color rules.
 */
// change default parameter from 'secondary' to `null`:
export const usesThemeDefault = (themeName: ThemeName|null = null       ): CssRule => baseUsesThemeDefault(themeName);

/**
 * Creates a conditional theme color rules at active state.
 * @param themeName The theme name as the active theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a conditional theme color rules at active state.
 */
// change default parameter from 'primary' to 'secondary':
export const usesThemeActive  = (themeName: ThemeName|null = 'secondary'): CssRule => baseUsesThemeActive(themeName);
//#endregion activatable



// styles:
const svgElm = 'svg'

export const usesHamburgerLayout = () => {
    // dependencies:
    
    // states:
    const {hamburgerableVars} = usesHamburgerable();
    
    
    
    return style({
        ...imports([
            // animations:
            // hamburgerAnimRule,
        ]),
        ...style({
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
        }),
    });
};
export const usesHamburgerMenuButtonLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesToggleButtonLayout(),
            
            // colors:
            usesThemeDefault(),
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
            usesToggleButtonVariants(),
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
            usesToggleButtonStates(),
            hamburgerableRule,
        ]),
        ...states([
            ifActive({
                ...imports([
                    markActive(),
                ]),
            }),
            ifFocus({
                ...imports([
                    markActive(),
                ]),
            }),
            ifArrive({
                ...imports([
                    markActive(),
                ]),
            }),
            ifPress({
                ...imports([
                    markActive(),
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
}), { id: '5sj70x1zsf' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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



// react components:
export interface HamburgerMenuButtonProps
    extends
        // bases:
        Omit<ToggleButtonProps,
            // children:
            |'children' // children is not supported
        >
{
}
const HamburgerMenuButton = (props: HamburgerMenuButtonProps): JSX.Element|null => {
    // styles:
    const styleSheet = useHamburgerMenuButtonStyleSheet();
    
    
    
    // jsx:
    return (
        <ToggleButton
            // other props:
            {...props}
            
            
            
            // accessibilities:
            label={props.label ?? 'Toggle navigation'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            <svg viewBox='0 0 24 24'>
                <polyline points='2,3 22,3' />
                <polyline points='2,12 22,12' />
                <polyline points='2,21 22,21' />
            </svg>
        </ToggleButton>
    );
};
export {
    HamburgerMenuButton,
    HamburgerMenuButton as default,
}

export type { ButtonStyle, ButtonVariant, ButtonType }
