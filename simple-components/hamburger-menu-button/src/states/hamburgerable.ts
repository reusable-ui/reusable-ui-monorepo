// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    states,
    fallback,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui features:
import {
    // hooks:
    useAnimatingState,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActivatableApi,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// hooks:

// states:

//#region hamburgerable
export interface HamburgerableVars {
    topTransformIn  : any
    midTransformIn  : any
    btmTransformIn  : any
    
    topTransformOut : any
    midTransformOut : any
    btmTransformOut : any
    
    
    
    /**
     * final transform for the hamburger top.
     */
    topTransform    : any
    /**
     * final transform for the hamburger middle.
     */
    midTransform    : any
    /**
     * final transform for the hamburger bottom.
     */
    btmTransform    : any
    
    /**
     * final animation for the hamburger top.
     */
    topAnim         : any
    /**
     * final animation for the hamburger middle.
     */
    midAnim         : any
    /**
     * final animation for the hamburger bottom.
     */
    btmAnim         : any
}
const [hamburgerableVars] = cssVars<HamburgerableVars>(); // no need to have SSR support because the variables are not shared externally (outside <HamburgerMenuButton>)



// .crossed will be added after crossing-animation done:
const selectorIfCrossed      = '.crossed'
// .crossing = styled crossing:
const selectorIfCrossing     = '.crossing'
// .hamburgering will be added after loosing cross(ing|ed) and will be removed after hamburgering-animation done:
const selectorIfHamburgering = '.hamburgering'
// if all above are not set => hamburgered:
const selectorIfHamburgered  = ':not(:is(.crossed, .crossing, .hamburgering))'



export const ifCrossed           = (styles: CssStyleCollection): CssRule => rule(selectorIfCrossed     , styles);
export const ifCrossing          = (styles: CssStyleCollection): CssRule => rule(selectorIfCrossing    , styles);
export const ifHamburgering      = (styles: CssStyleCollection): CssRule => rule(selectorIfHamburgering, styles);
export const ifHamburgered       = (styles: CssStyleCollection): CssRule => rule(selectorIfHamburgered , styles);

export const ifCross             = (styles: CssStyleCollection): CssRule => rule([selectorIfCrossing   , selectorIfCrossed                                               ], styles);
export const ifHamburger         = (styles: CssStyleCollection): CssRule => rule([                                          selectorIfHamburgering, selectorIfHamburgered], styles);
export const ifCrossHamburgering = (styles: CssStyleCollection): CssRule => rule([selectorIfCrossing   , selectorIfCrossed, selectorIfHamburgering                       ], styles);



export interface HamburgerableStuff { hamburgerableRule: Factory<CssRule>, hamburgerableVars: CssVars<HamburgerableVars> }
export interface HamburgerableConfig {
    hamburgerTopTransformIn  ?: CssKnownProps['transform']
    hamburgerMidTransformIn  ?: CssKnownProps['transform']
    hamburgerBtmTransformIn  ?: CssKnownProps['transform']
    
    hamburgerTopTransformOut ?: CssKnownProps['transform']
    hamburgerMidTransformOut ?: CssKnownProps['transform']
    hamburgerBtmTransformOut ?: CssKnownProps['transform']
    
    hamburgerTopAnimIn       ?: CssKnownProps['animation']
    hamburgerMidAnimIn       ?: CssKnownProps['animation']
    hamburgerBtmAnimIn       ?: CssKnownProps['animation']
    
    hamburgerTopAnimOut      ?: CssKnownProps['animation']
    hamburgerMidAnimOut      ?: CssKnownProps['animation']
    hamburgerBtmAnimOut      ?: CssKnownProps['animation']
}
/**
 * Uses hamburger animation.
 * @param config  A configuration of `hamburgerableRule`.
 * @returns A `HamburgerableStuff` represents a hamburgerable state.
 */
export const usesHamburgerable = (config?: HamburgerableConfig): HamburgerableStuff => {
    // dependencies:
    
    // features:
    const {animationRule, animationVars} = usesAnimation();
    
    
    
    // css vars:
    const transformNoneVars = () => vars({
        [hamburgerableVars.topTransformIn ] : animationVars.transformNone,
        [hamburgerableVars.midTransformIn ] : animationVars.transformNone,
        [hamburgerableVars.btmTransformIn ] : animationVars.transformNone,
        
        [hamburgerableVars.topTransformOut] : animationVars.transformNone,
        [hamburgerableVars.midTransformOut] : animationVars.transformNone,
        [hamburgerableVars.btmTransformOut] : animationVars.transformNone,
    });
    const transformInVars   = () => vars({
        [hamburgerableVars.topTransformIn ] : config?.hamburgerTopTransformIn,
        [hamburgerableVars.midTransformIn ] : config?.hamburgerMidTransformIn,
        [hamburgerableVars.btmTransformIn ] : config?.hamburgerBtmTransformIn,
    });
    const transformOutVars  = () => vars({
        [hamburgerableVars.topTransformOut] : config?.hamburgerTopTransformOut,
        [hamburgerableVars.midTransformOut] : config?.hamburgerMidTransformOut,
        [hamburgerableVars.btmTransformOut] : config?.hamburgerBtmTransformOut,
    });
    
    const animNoneVars      = () => vars({
        [hamburgerableVars.topAnim        ] : animationVars.animNone,
        [hamburgerableVars.midAnim        ] : animationVars.animNone,
        [hamburgerableVars.btmAnim        ] : animationVars.animNone,
    });
    const animInVars        = () => vars({
        [hamburgerableVars.topAnim        ] : config?.hamburgerTopAnimIn,
        [hamburgerableVars.midAnim        ] : config?.hamburgerMidAnimIn,
        [hamburgerableVars.btmAnim        ] : config?.hamburgerBtmAnimIn,
    });
    const animOutVars       = () => vars({
        [hamburgerableVars.topAnim        ] : config?.hamburgerTopAnimOut,
        [hamburgerableVars.midAnim        ] : config?.hamburgerMidAnimOut,
        [hamburgerableVars.btmAnim        ] : config?.hamburgerBtmAnimOut,
    });
    
    
    
    return {
        hamburgerableRule: () => style({
            // features:
            ...animationRule(),
            
            
            
            // reset functions:
            // declare default values at lowest specificity:
            ...fallback({
                ...transformNoneVars(),
                ...animNoneVars(),
            }),
            
            
            
            // animation states:
            ...states([
                ifCrossed({
                    ...transformInVars(),
                }),
                ifCrossing({
                    ...transformInVars(),
                    ...transformOutVars(),
                    
                    ...animInVars(),
                }),
                ifHamburgering({
                    ...transformInVars(),
                    ...transformOutVars(),
                    
                    ...animOutVars(),
                }),
                ifHamburgered({
                    ...transformOutVars(),
                }),
            ]),
            
            
            
            // compositions:
            ...vars({
                [hamburgerableVars.topTransform] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    // back-to-front order, the last is processed first, the first is processed last
                    
                    hamburgerableVars.topTransformIn,
                    hamburgerableVars.topTransformOut,
                ]],
                [hamburgerableVars.midTransform] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    // back-to-front order, the last is processed first, the first is processed last
                    
                    hamburgerableVars.midTransformIn,
                    hamburgerableVars.midTransformOut,
                ]],
                [hamburgerableVars.btmTransform] : [[
                    // combining: transform1 * transform2 * transform3 ...
                    
                    // back-to-front order, the last is processed first, the first is processed last
                    
                    hamburgerableVars.btmTransformIn,
                    hamburgerableVars.btmTransformOut,
                ]],
            }),
        }),
        hamburgerableVars,
    };
};



export const enum HamburgerableState {
    Hamburgered  = 0,
    Hamburgering = 1,
    Crossing     = 2,
    Crossed      = 3,
}

export interface HamburgerableApi<TElement extends Element = HTMLElement> {
    active                : boolean
    
    state                 : HamburgerableState
    class                 : string|null
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

export const useHamburgerable = <TElement extends Element = HTMLElement>(activatableApi: ActivatableApi<TElement>): HamburgerableApi<TElement> => {
    // states:
    const {active} = activatableApi;
    
    
    
    // fn states:
    /*
     * state is hamburgered/crossed based on [controllable crossed = active]
     * [uncontrollable crossed] is not supported
     */
    const crossedFn : boolean = active /*controllable*/;
    
    
    
    // states:
    const [crossed, setCrossed, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : crossedFn,
        animationName : /((?<![a-z])(cross|hamburger)|(?<=[a-z])(Cross|Hamburger))(?![a-z])/,
    });
    
    
    
    // update state:
    if (crossed !== crossedFn) { // change detected => apply the change & start animating
        setCrossed(crossedFn);   // remember the last change
    } // if
    
    
    
    // fn props:
    const state = ((): HamburgerableState => {
        // crossing:
        if (animation === true ) return HamburgerableState.Crossing;
        
        // hamburgering:
        if (animation === false) return HamburgerableState.Hamburgering;
        
        // fully crossed:
        if (crossed) return HamburgerableState.Crossed;
        
        // fully hamburgered:
        return HamburgerableState.Hamburgered;
    })();
    const stateClass = ((): string|null => {
        switch (state) {
            // crossing:
            case HamburgerableState.Crossing: {
                return 'crossing';
            };
            
            // hamburgering:
            case HamburgerableState.Hamburgering: {
                return 'hamburgering';
            };
            
            // fully crossed:
            case HamburgerableState.Crossed: {
                return 'crossed';
            };
            
            // fully hamburgered:
            case HamburgerableState.Hamburgered: {
                return null; // discard all classes above
            };
        } // switch
    })();
    
    
    
    // api:
    return {
        active    : crossed,
        
        state     : state,
        class     : stateClass,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};
//#endregion hamburgerable
