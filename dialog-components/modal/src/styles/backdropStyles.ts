// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    states,
    fallbacks,
    children,
    style,
    vars,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ifCollapsed,
    usesCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // utilities:
    ifGlobalModal,
}                           from '../utilities.js'
import {
    // elements:
    noParentScrollElm,
    noParentScrollDummyChildElm,
}                           from './elements.js'
import {
    // configs:
    modals,
    cssModalConfig,
}                           from './config.js'



// styles:
export const onBackdropStylesChange = watchChanges(cssModalConfig.onChange);

export const usesBackdropLayout = memoizeStyle(() => {
    // dependencies:
    
    // capabilities:
    const {                groupableVars} = usesGroupable();
    
    // features:
    const {borderRule    , borderVars   } = usesBorder({
        borderWidth  : 'inherit',
        borderRadius : 'inherit',
    });
    const {animationRule , animationVars} = usesAnimation();
    
    
    
    return style({
        // layouts:
        ...style({
            // layouts:
            display      : 'grid',
            
            // child default sizes:
            justifyItems : 'center', // center horizontally
            alignItems   : 'center', // center vertically
            
            
            
            // positions:
            position     : 'absolute', // local <Modal>: absolute position
            ...ifGlobalModal({
                position : 'fixed',    // global <Modal>: directly inside `body > portal` => fixed position
            }),
            inset        : 0,          // span the <Modal> to the edges of <container>
            zIndex       : 1040,
            
            
            
            // sizes:
            // global <Modal>: fills the entire screen height:
            ...ifGlobalModal({
                boxSizing    : 'border-box', // the final size is including borders & paddings
                minBlockSize : '100svh',     // for modern browsers
                ...fallbacks({
                    minBlockSize : '100dvh', // for semi-modern browsers
                }),
                ...fallbacks({
                    minBlockSize : '100vh',  // for old browsers
                }),
            }),
            
            
            
            // children:
            ...children(noParentScrollElm, {
                // layouts:
                display            : 'grid',
                gridTemplate       : [[
                    '"content"', '1fr',
                    '/',
                    '1fr'
                ]],
                
                
                
                // positions:
                gridArea           : '1/1/-1/-1', // fills the entire <Backdrop>'s gridArea(s), inclding it's (virtual) paddings
                position           : 'absolute',  // supports for ::before pseudo_element of `position: relative`
                inset              : 0,           // span the <NoParentScroll> to the edges of <Backdrop>
                zIndex             : -1,          // below the <ModalUi>
                
                
                
                // appearances:
                opacity            : 0,         // visually_hidden but still processing the *hack* of scrolling
                
                
                
                // sizes:
                justifySelf        : 'stretch', // span the <NoParentScroll> to the width  of <Backdrop>
                alignSelf          : 'stretch', // span the <NoParentScroll> to the height of <Backdrop>
                
                
                
                // scrolls:
                overflow           : 'scroll',  // here how the *hack* works
                overscrollBehavior : 'none',    // here how the *hack* works
                
                
                
                // accessibilities:
                pointerEvents      : 'auto',    // cancel out *inherited* ghost layer from <Backdrop>, *force-enabling* mouse_event on the <NoParentScroll>
                
                
                
                // children:
                ...children(noParentScrollDummyChildElm, {
                    // layouts:
                    display        : 'inline-block', // use inline-block, so it takes the width & height as we set
                    content        : '""',           // activate the pseudo_element
                    
                    
                    
                    // positions:
                    gridArea       : 'content',
                    position       : 'relative',     // supports for adjusting the `insetBlockEnd`
                    insetInlineEnd : '-1px',         // triggers the horz_scrollbar of the <NoParentScroll>
                    insetBlockEnd  : '-1px',         // triggers the vert_scrollbar of the <NoParentScroll>
                    
                    
                    
                    // sizes:
                    justifySelf    : 'end',          // put the <DummyChild> to the right  of <NoParentScroll>
                    alignSelf      : 'end',          // put the <DummyChild> to the bottom of <NoParentScroll>
                    inlineSize     : '1px',          // triggers the horz_scrollbar of the <NoParentScroll>
                    blockSize      : '1px',          // triggers the vert_scrollbar of the <NoParentScroll>
                }),
            }, { specificityWeight : 2 }), // ensures not overwritten by `* as <CardDialog>`
            
            
            
            // customize:
            ...usesCssProps(modals), // apply config's cssProps
            
            
            
            // animations:
            anim         : animationVars.anim,
        }),
        
        
        
        // features:
        ...borderRule(),    // must be placed at the last
        ...animationRule(), // must be placed at the last
        
        
        
        // configs:
        ...vars({
            // borders:
            // makes the backdrop as a <group> by calculating <parent>'s border & borderRadius:
            
            [groupableVars.borderWidth           ] : '0px',
            
            [groupableVars.borderStartStartRadius] : `calc(${borderVars.borderStartStartRadius} - ${borderVars.borderWidth} - min(${borderVars.borderWidth}, 0.5px))`,
            [groupableVars.borderStartEndRadius  ] : `calc(${borderVars.borderStartEndRadius  } - ${borderVars.borderWidth} - min(${borderVars.borderWidth}, 0.5px))`,
            [groupableVars.borderEndStartRadius  ] : `calc(${borderVars.borderEndStartRadius  } - ${borderVars.borderWidth} - min(${borderVars.borderWidth}, 0.5px))`,
            [groupableVars.borderEndEndRadius    ] : `calc(${borderVars.borderEndEndRadius    } - ${borderVars.borderWidth} - min(${borderVars.borderWidth}, 0.5px))`,
            
            
            
            // spacings:
            [groupableVars.paddingInline         ] : '0px',
            [groupableVars.paddingBlock          ] : '0px',
        }),
        ...style({
            // borders:
            // fit the backdrop borderRadius to <container>'s borderRadius:
            
            borderWidth            : groupableVars.borderWidth,
            
            borderStartStartRadius : groupableVars.borderStartStartRadius,
            borderStartEndRadius   : groupableVars.borderStartEndRadius,
            borderEndStartRadius   : groupableVars.borderEndStartRadius,
            borderEndEndRadius     : groupableVars.borderEndEndRadius,
            
            
            
            // spacings:
            paddingInline          : groupableVars.paddingInline,
            paddingBlock           : groupableVars.paddingBlock,
        }),
    });
}, onBackdropStylesChange);

export const usesBackdropVariants = memoizeStyle(() => {
    return style({
        // variants:
        ...variants([
            rule('.hidden', {
                // backgrounds:
                background    : 'none',
            }),
            rule(['.hidden', '.interactive'], {
                // accessibilities:
                pointerEvents : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                
                
                
                // children:
                ...children('*', { // <ModalUi>
                    // accessibilities:
                    pointerEvents : 'initial', // cancel out *inherited* ghost layer from <Backdrop>, *re-enabling* mouse_event on the <ModalUi>
                }),
            }),
        ]),
    });
}, onBackdropStylesChange);

export const usesBackdropStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {collapsibleRule} = usesCollapsible(modals);
    
    
    
    return style({
        // states:
        ...collapsibleRule(),
        ...states([
            ifCollapsed({
                // appearances:
             // display    : 'none',   // hide the <Modal> -- causes the <Children>'s animation interrupted prematurely
                visibility : 'hidden', // hide the <Modal> without causing the <Children>'s animation interrupted prematurely
            }),
        ]),
    });
}, onBackdropStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesBackdropLayout(),
    
    // variants:
    ...usesBackdropVariants(),
    
    // states:
    ...usesBackdropStates(),
}), onBackdropStylesChange);
