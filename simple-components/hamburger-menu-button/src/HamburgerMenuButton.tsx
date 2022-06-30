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
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // types:
    ReadonlyCssCustomRefs,
    
    
    
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // hooks:
    usesSizeVariant,
    ThemeName,
    mildOf,
    usesAnim,
    
    
    
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifActived,
    ifActivating,
    ifPassivating,
    ifPassived,
    ifActive,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // hooks:
    markActive       as controlMarkActive,
    usesThemeDefault as controlUsesThemeDefault,
    usesThemeActive  as controlUsesThemeActive,
    ifFocus,
    ifArrive,
}                           from '@reusable-ui/control'         // a base component
import {
    // hooks:
    ifPress,
}                           from '@reusable-ui/action-control'  // a base component
export {
    // hooks:
    ButtonStyle,
    ButtonVariant,
    ButtonType,
}                           from '@reusable-ui/toggle-button'   // a base component
import {
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

//#region activePassive
export const markActive = (): CssRule => style({
    ...imports([
        controlMarkActive(),
        
        mildOf(null),      // keeps mild variant
        
        usesThemeActive(), // switch to active theme
    ]),
});

/**
 * Creates a default theme color definitions.
 * @param themeName The theme name as the default theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a default theme color definitions`.
 */
// change default parameter from 'secondary' to `null`:
export const usesThemeDefault = (themeName: ThemeName|null = null       ): CssRule => controlUsesThemeDefault(themeName);

/**
 * Creates conditional color definitions at active state.
 * @param themeName The theme name as the active theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents the conditional color definitions at active state.
 */
// change default parameter from 'primary' to 'secondary':
export const usesThemeActive  = (themeName: ThemeName|null = 'secondary'): CssRule => controlUsesThemeActive(themeName);
//#endregion activePassive


// animations:

//#region hamburger animations
export interface HamburgerAnimVars {
    topTransfIn  : any
    midTransfIn  : any
    btmTransfIn  : any
    
    topTransfOut : any
    midTransfOut : any
    btmTransfOut : any
    
    
    
    /**
     * final transform for the hamburger top.
     */
    topTransf    : any
    /**
     * final transform for the hamburger middle.
     */
    midTransf    : any
    /**
     * final transform for the hamburger bottom.
     */
    btmTransf    : any
    
    /**
     * final animation for the hamburger top.
     */
    topAnim      : any
    /**
     * final animation for the hamburger middle.
     */
    midAnim      : any
    /**
     * final animation for the hamburger bottom.
     */
    btmAnim      : any
}
const [hamburgerAnims] = cssVar<HamburgerAnimVars>();



export type HamburgerAnimMixin = readonly [() => CssRule, () => CssRule, ReadonlyCssCustomRefs<HamburgerAnimVars>]
/**
 * Uses hamburger animation.
 * @returns A `StateMixin<HamburgerAnimVars>` represents hamburger animation definitions.
 */
export const usesHamburgerAnim = (): HamburgerAnimMixin => {
    // dependencies:
    
    // animations:
    const [animRule, anims] = usesAnim();
    
    
    
    // css vars:
    const transfNoneVars = () => vars({
        [hamburgerAnims.topTransfIn ] : anims.transfNone,
        [hamburgerAnims.midTransfIn ] : anims.transfNone,
        [hamburgerAnims.btmTransfIn ] : anims.transfNone,
        
        [hamburgerAnims.topTransfOut] : anims.transfNone,
        [hamburgerAnims.midTransfOut] : anims.transfNone,
        [hamburgerAnims.btmTransfOut] : anims.transfNone,
    });
    const transfInVars   = () => vars({
        [hamburgerAnims.topTransfIn ] : hamburgerMenuButtons.hamburgerTopTransfIn,
        [hamburgerAnims.midTransfIn ] : hamburgerMenuButtons.hamburgerMidTransfIn,
        [hamburgerAnims.btmTransfIn ] : hamburgerMenuButtons.hamburgerBtmTransfIn,
    });
    const transfOutVars  = () => vars({
        [hamburgerAnims.topTransfOut] : hamburgerMenuButtons.hamburgerTopTransfOut,
        [hamburgerAnims.midTransfOut] : hamburgerMenuButtons.hamburgerMidTransfOut,
        [hamburgerAnims.btmTransfOut] : hamburgerMenuButtons.hamburgerBtmTransfOut,
    });
    
    const animNoneVars   = () => vars({
        [hamburgerAnims.topAnim     ] : anims.animNone,
        [hamburgerAnims.midAnim     ] : anims.animNone,
        [hamburgerAnims.btmAnim     ] : anims.animNone,
    });
    const animInVars     = () => vars({
        [hamburgerAnims.topAnim     ] : hamburgerMenuButtons.hamburgerTopAnimIn,
        [hamburgerAnims.midAnim     ] : hamburgerMenuButtons.hamburgerMidAnimIn,
        [hamburgerAnims.btmAnim     ] : hamburgerMenuButtons.hamburgerBtmAnimIn,
    });
    const animOutVars    = () => vars({
        [hamburgerAnims.topAnim     ] : hamburgerMenuButtons.hamburgerTopAnimOut,
        [hamburgerAnims.midAnim     ] : hamburgerMenuButtons.hamburgerMidAnimOut,
        [hamburgerAnims.btmAnim     ] : hamburgerMenuButtons.hamburgerBtmAnimOut,
    });
    
    
    
    return [
        () => style({
            ...imports([
                // animations:
                animRule,
            ]),
            ...vars({
                [hamburgerAnims.topTransf] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    hamburgerAnims.topTransfIn,
                    hamburgerAnims.topTransfOut,
                ]],
                [hamburgerAnims.midTransf] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    hamburgerAnims.midTransfIn,
                    hamburgerAnims.midTransfOut,
                ]],
                [hamburgerAnims.btmTransf] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    hamburgerAnims.btmTransfIn,
                    hamburgerAnims.btmTransfOut,
                ]],
            }),
        }),
        () => style({
            ...imports([
                // css vars:
                transfNoneVars(),
                animNoneVars(),
            ]),
            ...states([
                ifActived({
                    ...imports([
                        transfInVars(),
                    ]),
                }),
                ifActivating({
                    ...imports([
                        transfInVars(),
                        transfOutVars(),
                        
                        animInVars(),
                    ]),
                }),
                ifPassivating({
                    ...imports([
                        transfInVars(),
                        transfOutVars(),
                        
                        animOutVars(),
                    ]),
                }),
                ifPassived({
                    ...imports([
                        transfOutVars(),
                    ]),
                }),
            ]),
        }),
        hamburgerAnims,
    ];
};
//#endregion hamburger animations



// styles:
const svgElm = 'svg';

export const usesHamburgerLayout = () => {
    // dependencies:
    
    // animations:
    const [hamburgerAnimRule, , hamburgerAnims] = usesHamburgerAnim();
    
    
    
    return style({
        ...imports([
            // animations:
            hamburgerAnimRule,
        ]),
        ...style({
            // appearances:
            overflow   : 'visible', // allows the <polyline> to overflow the <svg>
            
            
            
            // sizes:
            // fills the entire parent text's height:
            inlineSize : 'auto', // calculates the width by [blockSize * aspect_ratio]
            blockSize  : `calc(1em * ${fallbacks(basics.lineHeight, typos.lineHeight)})`,
            
            
            
            // children:
            ...children('polyline', {
                // appearances:
                stroke        : 'currentColor', // set menu color as parent's font color
                strokeWidth   : '4',            // set menu thickness, 4 of 24 might enough
                strokeLinecap : 'square',       // set menu edges square
                
                
                
                // animations:
                transformOrigin : '50% 50%',
                ...ifNthChild(0, 1, {
                    transf : hamburgerAnims.topTransf,
                    anim   : hamburgerAnims.topAnim,
                }),
                ...ifNthChild(0, 2, {
                    transf : hamburgerAnims.midTransf,
                    anim   : hamburgerAnims.midAnim,
                }),
                ...ifNthChild(0, 3, {
                    transf : hamburgerAnims.btmTransf,
                    anim   : hamburgerAnims.btmAnim,
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
    
    // layouts:
    const [sizesRule] = usesSizeVariant(hamburgerMenuButtons);
    
    
    
    return style({
        ...imports([
            // variants:
            usesToggleButtonVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesHamburgerMenuButtonStates = () => {
    // dependencies:
    
    // animations:
    const [, hamburgerAnimStateRule] = usesHamburgerAnim();
    
    
    
    return style({
        ...imports([
            // states:
            usesToggleButtonStates(),
            hamburgerAnimStateRule,
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

export const useHamburgerMenuButtonStyleSheet = createUseStyleSheet(() => ({
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
    const topTransfHamburger     : CssKnownProps['transf'] = [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]];
    const topTransfHamburgerOver : CssKnownProps['transf'] = [['rotate(15deg)' , 'scaleX(1)'   , 'translate(0, 0)',    ]];
    
    const topTransfCrossed       : CssKnownProps['transf'] = [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]];
    const topTransfCrossedOver   : CssKnownProps['transf'] = [['rotate(-60deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]];
    
    
    const midTransfHamburger     : CssKnownProps['transf'] = [[                  'scaleX(1)'   ,                       ]];
    const midTransfHamburgerOver : CssKnownProps['transf'] = [[                  'scaleX(1.35)'                        ]];
    
    const midTransfCrossed       : CssKnownProps['transf'] = [[                  'scaleX(0)'   ,                       ]];
    const midTransfCrossedOver   : CssKnownProps['transf'] = [[                  'scaleX(1.35)'                        ]];
    
    
    const btmTransfHamburger     : CssKnownProps['transf'] = [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]];
    const btmTransfHamburgerOver : CssKnownProps['transf'] = [['rotate(-15deg)', 'scaleX(1)'   , 'translate(0, 0)',    ]];
    
    const btmTransfCrossed       : CssKnownProps['transf'] = [['rotate(45deg)' , 'scaleX(1.35)', 'translate(0, -37.5%)']];
    const btmTransfCrossedOver   : CssKnownProps['transf'] = [['rotate(60deg)' , 'scaleX(1.35)', 'translate(0, -37.5%)']];
    
    
    
    // hamburger => crossed:
    const [keyframesCrossingTopRule    , keyframesCrossingTop    ] = keyframes({
        from  : { transform: topTransfHamburger     },
        '43%' : { transform: topTransfCrossed       },
        '71%' : { transform: topTransfCrossedOver   },
        to    : { transform: topTransfCrossed       },
    });
    
    // crossed => hamburger:
    const [keyframesHamburgeringTopRule, keyframesHamburgeringTop] = keyframes({
        from  : { transform: topTransfCrossed       },
        '43%' : { transform: topTransfHamburger     },
        '71%' : { transform: topTransfHamburgerOver, transformOrigin : [['91.7%', '12.5%']] },
        to    : { transform: topTransfHamburger     },
    });
    
    
    // hamburger => crossed:
    const [keyframesCrossingMidRule    , keyframesCrossingMid    ] = keyframes({
        from  : { transform: midTransfHamburger     },
        '19%' : { transform: midTransfCrossedOver   },
        to    : { transform: midTransfCrossed       },
    });
    
    // crossed => hamburger:
    const [keyframesHamburgeringMidRule, keyframesHamburgeringMid] = keyframes({
        from  : { transform: midTransfCrossed       },
        '81%' : { transform: midTransfHamburgerOver },
        to    : { transform: midTransfHamburger     },
    });
    
    
    // hamburger => crossed:
    const [keyframesCrossingBtmRule    , keyframesCrossingBtm    ] = keyframes({
        from  : { transform: btmTransfHamburger     },
        '43%' : { transform: btmTransfCrossed       },
        '71%' : { transform: btmTransfCrossedOver   },
        to    : { transform: btmTransfCrossed       },
    });
    
    // crossed => hamburger:
    const [keyframesHamburgeringBtmRule, keyframesHamburgeringBtm] = keyframes({
        from  : { transform: btmTransfCrossed       },
        '43%' : { transform: btmTransfHamburger     },
        '71%' : { transform: btmTransfHamburgerOver, transformOrigin : [['91.7%', '87.5%']] },
        to    : { transform: btmTransfHamburger     },
    });
    //#endregion keyframes
    
    
    
    const hamburgerAnimDuration = '300ms';
    
    return {
        // animations:
        hamburgerTopTransfIn  : topTransfCrossed        as CssKnownProps['transf'],
        hamburgerMidTransfIn  : midTransfCrossed        as CssKnownProps['transf'],
        hamburgerBtmTransfIn  : btmTransfCrossed        as CssKnownProps['transf'],
        
        hamburgerTopTransfOut : topTransfHamburger      as CssKnownProps['transf'],
        hamburgerMidTransfOut : midTransfHamburger      as CssKnownProps['transf'],
        hamburgerBtmTransfOut : btmTransfHamburger      as CssKnownProps['transf'],
        
        
        
        ...keyframesCrossingTopRule,
        ...keyframesHamburgeringTopRule,
        ...keyframesCrossingMidRule,
        ...keyframesHamburgeringMidRule,
        ...keyframesCrossingBtmRule,
        ...keyframesHamburgeringBtmRule,
        
        hamburgerAnimDuration : hamburgerAnimDuration   as CssKnownProps['animationDuration'],
        
        hamburgerTopAnimIn    : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesCrossingTop    ],
        ]                                               as CssKnownProps['anim'],
        hamburgerMidAnimIn    : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesCrossingMid    ],
        ]                                               as CssKnownProps['anim'],
        hamburgerBtmAnimIn    : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesCrossingBtm    ],
        ]                                               as CssKnownProps['anim'],
        hamburgerTopAnimOut   : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesHamburgeringTop],
        ]                                               as CssKnownProps['anim'],
        hamburgerMidAnimOut   : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesHamburgeringMid],
        ]                                               as CssKnownProps['anim'],
        hamburgerBtmAnimOut   : [
            [hamburgerAnimDuration, 'ease-out', 'both', keyframesHamburgeringBtm],
        ]                                               as CssKnownProps['anim'],
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
            
            
            
            // semantics:
            aria-expanded={true} // the <ToggleButton> will automatically remove [aria-expanded] if not [active]
            
            
            
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
