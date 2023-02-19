// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    states,
    fallbacks,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a border (stroke) management system:
    borderRadiuses,
    
    
    
    // a spacer (gap) management system:
    spacers,
    
    
    
    // a typography management system:
    typos,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // gradient variant of UI:
    usesGradientable,
    setGradient,
    
    
    
    // outlined (background-less) variant of UI:
    usesOutlineable,
    
    
    
    // adds an interactive feel to a UI:
    ifArrive,
    ifLeave,
    
    
    
    // shows the UI as clicked when activated:
    usesActiveAsClick,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    onActionControlStylesChange,
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
}                           from '@reusable-ui/action-control'  // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // variables:
    condBorderVars,
}                           from './variables.js'
import {
    // configs:
    buttons,
    cssButtonConfig,
}                           from './config.js'



// utility styles:
const usesAppearAsOutlined   = () => {
    // dependencies:
    
    // features:
    const {borderVars     } = usesBorder();
    
    // variants:
    const {outlineableVars} = usesOutlineable();
    
    
    
    return style({
        // compositions:
        ...vars({
            [borderVars.border     ] : [[
                borderVars.borderStyle,
                switchOf(
                    condBorderVars.condBorderWidthTg, // border is  supported
                    '0px',                            // border not supported
                ),
                borderVars.borderColor,
            ]],
        }),
        
        // toggling functions:
        ...vars({
            [condBorderVars.condBorderWidthTg] : [[
                outlineableVars.outlinedSw,  // border is supported only if `.outlined`
                borderVars.borderWidth,
            ]],
        }),
        
        
        
        // toggling functions:
        ...vars({
            [outlineableVars.noBackgTg] : [[
                'transparent',              // the no background color definition
            ]],
            
            [outlineableVars.backgTg] : [[
                outlineableVars.backgFn,    // the outlined background color definition
            ]],
            [outlineableVars.foregTg] : [[
                outlineableVars.foregFn,    // the outlined foreground color definition
            ]],
            
            [outlineableVars.altBackgTg] : [[
                outlineableVars.altBackgFn, // the outlined alternate background color definition
            ]],
            [outlineableVars.altForegTg] : [[
                outlineableVars.altForegFn, // the outlined alternate foreground color definition
            ]],
        }),
    });
};
const usesButtonLinkVariant  = () => {
    // dependencies:
    
    // features:
    const {borderVars      } = usesBorder();
    const {paddingVars     } = usesPadding();
    
    // variants:
    const {gradientableVars} = usesGradientable();
    const {outlineableVars } = usesOutlineable();
    
    
    
    return style({
        // layouts:
        ...style({
            // accessibilities:
            userSelect     : 'contain', // a link should be selectable
            ...fallbacks({
                userSelect : 'text',    // a link should be selectable
            }),
            
            
            
            // borders:
            // small rounded corners on top:
            [borderVars.borderStartStartRadius] : borderRadiuses.sm,
            [borderVars.borderStartEndRadius  ] : borderRadiuses.sm,
            // small rounded corners on bottom:
            [borderVars.borderEndStartRadius  ] : borderRadiuses.sm,
            [borderVars.borderEndEndRadius    ] : borderRadiuses.sm,
            
            
            
            // spacings:
            [paddingVars.paddingInline] : spacers.xs,
            [paddingVars.paddingBlock ] : `max(0px, ${spacers.xs} - (0.5em * (${switchOf(basics.lineHeight, typos.lineHeight)} - 1)))`,
            marginInline : `calc(0px - ${paddingVars.paddingInline})`, // cancels out the padding with negative margin
            marginBlock  : `calc(0px - ${paddingVars.paddingBlock })`, // cancels out the padding with negative margin
            
            
            
            // typos:
            textDecoration : 'underline',
            lineHeight     : switchOf(basics.lineHeight, typos.lineHeight),
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(buttons, 'link')), // apply config's cssProps starting with link***
        }),
        
        
        
        // toggling functions:
        ...vars({
            [gradientableVars.backgGradTg] : [[
                outlineableVars.outlinedSw,  // gradient is supported only if `.outlined`
                gradientableVars.gradientSw, // the gradient switching function
                gradientableVars.backgGrad,  // the gradient definition
            ]],
        }),
    });
};
const usesButtonGhostVariant = () => {
    return style({
        // layouts:
        ...style({
            // borders:
            boxShadow : ['none', '!important'], // no shadow & no focus animation
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(buttons, 'ghost')), // apply config's cssProps starting with ghost***
        }),
        
        
        
        // states:
        ...states([
            ifArrive({
                // appearances:
                opacity: buttons.ghostOpacityArrive, // increase the opacity to increase visibility
            }),
            ifLeave(
                // backgrounds:
                setGradient(false), // hide the gradient to increase invisibility
            ),
        ]),
    });
};



// styles:
export const onButtonStylesChange = watchChanges(onActionControlStylesChange, cssButtonConfig.onChange);

export const usesButtonLayout = memoizeStyle((options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    
    
    
    return style({
        // layouts:
        ...usesActionControlLayout(),
        ...style({
            // layouts:
            display           : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            ...ifOrientationInline({ // inline
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...ifOrientationBlock({  // block
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'center',      // center items (text, icon, etc) horizontally
            alignItems        : 'center',      // center items (text, icon, etc) vertically
            flexWrap          : 'wrap',        // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign     : 'baseline',    // <Button>'s text should be aligned with sibling text, so the <Button> behave like <span> wrapper
            
            
            
            // typos:
            textAlign         : 'center',
            
            
            
            // customize:
            ...usesCssProps(buttons), // apply config's cssProps
        }),
    });
}, onButtonStylesChange);

export const usesButtonVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(buttons);
    
    
    
    return style({
        // variants:
        /* write specific buttonStyle first, so it can be overriden by `.nude`, `.mild`, `.outlined`, etc */
        ...variants([
            rule(['.link', '.ghost'], usesAppearAsOutlined()   ),
            rule( '.link'           , usesButtonLinkVariant()  ),
            rule(          '.ghost' , usesButtonGhostVariant() ),
        ]),
        ...usesActionControlVariants(),
        ...resizableRule(),
    });
}, onButtonStylesChange);

export const usesButtonStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {activeAsClickRule} = usesActiveAsClick();
    
    
    
    return style({
        // states:
        ...usesActionControlStates(),
        ...activeAsClickRule(),
    });
}, onButtonStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesButtonLayout(),
    
    // variants:
    ...usesButtonVariants(),
    
    // states:
    ...usesButtonStates(),
}), onButtonStylesChange);
