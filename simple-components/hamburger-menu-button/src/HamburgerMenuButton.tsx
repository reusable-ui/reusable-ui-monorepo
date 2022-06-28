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
    ifNotLastChild,
    
    
    
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
}                           from '@reusable-ui/indicator'       // a base component
export {
    // hooks:
    ButtonStyle,
    ButtonVariant,
    ButtonType,
}                           from '@reusable-ui/button'          // a base component
import {
    // react components:
    ToggleButtonProps,
    ToggleButton,
}                           from '@reusable-ui/toggle-button'   // a base component



// hooks:

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



/**
 * Uses hamburger animation.
 * @returns A `StateMixin<HamburgerAnimVars>` represents hamburger animation definitions.
 */
export const usesHamburgerAnim = (): StateMixin<HamburgerAnimVars> => {
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
        hamburgerAnims,
    ];
};
//#endregion hamburger animations



// styles:
const svgElm = 'svg';
export const usesHamburgerLayout = () => {
    // dependencies:
    
    // animations:
    const [, hamburgerAnims] = usesHamburgerAnim();
    
    
    
    return style({
        // sizes:
        // fills the entire parent text's height:
        inlineSize : 'auto', // calculates the width by [blockSize * aspect_ratio]
        blockSize  : `calc(1em * ${fallbacks(basics.lineHeight, typos.lineHeight)})`,
        
        
        
        // children:
        overflow: 'visible', // allows graphics to overflow the canvas
        ...children('polyline', {
            // appearances:
            stroke        : 'currentColor', // set menu color as parent's font color
            strokeWidth   : 4,              // set menu thickness, 4 of 24 might enough
            strokeLinecap : 'square',       // set menu edges square
            
            
            
            // animations:
            transformOrigin : '50% 50%',
            ...isNthChild(0, 1, {
                transf : hamburgerAnims.topTransf,
                anim   : hamburgerAnims.topAnim,
            }),
            ...isNthChild(0, 2, {
                transf : hamburgerAnims.midTransf,
                anim   : hamburgerAnims.midAnim,
            }),
            ...isNthChild(0, 3, {
                transf : hamburgerAnims.btmTransf,
                anim   : hamburgerAnims.btmAnim,
            }),
        }),
    });
};



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
