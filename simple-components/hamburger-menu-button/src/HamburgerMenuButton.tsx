// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css custom properties:
    CssCustomSimpleRef,
    
    
    
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    keyframes,
    ifNthChild,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    escapeSvg,
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
    usesPrefixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // hooks:
    useEvent,
    useMergeEvents,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    mildOf,
    usesAnim,
    fallbackNoneFilter,
    
    
    
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
    
    
    
    // configs:
    indicators,
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
}                           from '@reusable-ui/button'          // a base component
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
        
        mildOf(null), // keeps mild variant
        
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
        [hamburgerAnims.topTransfIn ] : hamburgerMenuButtons.svgTopTransfIn,
        [hamburgerAnims.midTransfIn ] : hamburgerMenuButtons.svgMidTransfIn,
        [hamburgerAnims.btmTransfIn ] : hamburgerMenuButtons.svgBtmTransfIn,
    });
    const transfOutVars  = () => vars({
        [hamburgerAnims.topTransfOut] : hamburgerMenuButtons.svgTopTransfOut,
        [hamburgerAnims.midTransfOut] : hamburgerMenuButtons.svgMidTransfOut,
        [hamburgerAnims.btmTransfOut] : hamburgerMenuButtons.svgBtmTransfOut,
    });
    
    const animNoneVars   = () => vars({
        [hamburgerAnims.topAnim     ] : anims.animNone,
        [hamburgerAnims.midAnim     ] : anims.animNone,
        [hamburgerAnims.btmAnim     ] : anims.animNone,
    });
    const animInVars     = () => vars({
        [hamburgerAnims.topAnim     ] : hamburgerMenuButtons.svgTopAnimIn,
        [hamburgerAnims.midAnim     ] : hamburgerMenuButtons.svgMidAnimIn,
        [hamburgerAnims.btmAnim     ] : hamburgerMenuButtons.svgBtmAnimIn,
    });
    const animOutVars    = () => vars({
        [hamburgerAnims.topAnim     ] : hamburgerMenuButtons.svgTopAnimOut,
        [hamburgerAnims.midAnim     ] : hamburgerMenuButtons.svgMidAnimOut,
        [hamburgerAnims.btmAnim     ] : hamburgerMenuButtons.svgBtmAnimOut,
    });
    
    
    
    return [
        () => style({
            ...imports([
                // animations:
                animRule,
                
                // css vars:
                transfNoneVars(),
                animNoneVars(),
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
    // dependencies:
    
    // animations:
    const [, , hamburgerAnims] = usesHamburgerAnim();
    
    
    
    //#region keyframes
    const transfTopHamburger     : CssKnownProps['transf'] = [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]];
    const transfTopHamburgerOver : CssKnownProps['transf'] = [['rotate(15deg)' , 'scaleX(1)'   , 'translate(0, 0)',     ]];
    
    const transfTopCrossed       : CssKnownProps['transf'] = [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]];
    const transfTopCrossedOver   : CssKnownProps['transf'] = [['rotate(-60deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]];
    //#endregion keyframes
    
    
    
    return {
    };
}, { prefix: 'hbmn' });



// react components:
export interface HamburgerMenuButtonProps
    extends
        // bases:
        ToggleButtonProps
{
}
const HamburgerMenuButton = (props: HamburgerMenuButtonProps): JSX.Element|null => {
    // jsx:
    return (
        <ToggleButton
            // other props:
            {...props}
        />
    );
};
export {
    HamburgerMenuButton,
    HamburgerMenuButton as default,
}
