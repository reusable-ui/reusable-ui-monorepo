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
        // features:
        ...borderRule(),
        ...animationRule(),
        
        
        
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
            
            
            
            // customize:
            ...usesCssProps(modals), // apply config's cssProps
            
            
            
            // animations:
            anim         : animationVars.anim,
        }),
        
        
        
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
                pointerEvents : 'none', // a ghost layer
                
                
                
                // children:
                ...children('*', { // <ModalUi>
                    // accessibilities:
                    pointerEvents : 'initial', // cancel out ghost layer
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
                display: 'none', // hide the <Modal>
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
