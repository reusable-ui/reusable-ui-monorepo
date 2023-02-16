// cssfn:
import {
    // writes css in javascript:
    rule,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // background stuff of UI:
    usesBackground,
    
    
    
    // foreground (text color) stuff of UI:
    usesForeground,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // ring (focus indicator) color of UI:
    usesRing,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // color options of UI:
    usesThemable,
    
    
    
    // gradient variant of UI:
    usesGradientable,
    
    
    
    // outlined (background-less) variant of UI:
    usesOutlineable,
    
    
    
    // mild (soft color) variant of UI:
    usesMildable,
    
    
    
    // nude variant of UI:
    usesNudible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // configs:
    basics,
    cssBasicConfig,
}                           from './config.js'



// styles:
export const onBasicStylesChange = watchChanges(cssBasicConfig.onChange);

export const usesBasicLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground(basics);
    const {foregroundRule, foregroundVars} = usesForeground(basics);
    const {borderRule    , borderVars    } = usesBorder(basics);
    const {ringRule                      } = usesRing(basics);
    const {animationRule , animationVars } = usesAnimation(basics as any);
    const {paddingRule   , paddingVars   } = usesPadding(basics);
    
    
    
    return style({
        // features:
        ...backgroundRule(),
        ...foregroundRule(),
        ...borderRule(),
        ...ringRule(),
        ...animationRule(),
        ...paddingRule(),
        
        
        
        // layouts:
        ...style({
            // layouts:
            display       : 'block',
            
            
            
            // customize:
            ...usesCssProps(basics), // apply config's cssProps
            
            
            
            // accessibilities:
            ...rule(['&::selection', '& ::selection'], { // ::selection on self and descendants
                    // backgrounds:
                backg     : backgroundVars.altBackgColor,
                
                
                
                // foregrounds:
                foreg     : foregroundVars.altForeg,
            }),
            
            
            
            // backgrounds:
            backg         : backgroundVars.backg,
            
            
            
            // foregrounds:
            foreg         : foregroundVars.foreg,
            
            
            
            // borders:
            border        : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
            
            
            
            // animations:
            boxShadow     : animationVars.boxShadow,
            filter        : animationVars.filter,
            anim          : animationVars.anim,
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
}, onBasicStylesChange);

export const usesBasicVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule   } = usesResizable(basics);
    const {themableRule    } = usesThemable();
    const {gradientableRule} = usesGradientable(basics);
    const {outlineableRule } = usesOutlineable(basics);
    const {mildableRule    } = usesMildable(basics);
    const {nudibleRule     } = usesNudible();
    
    
    
    return style({
        // variants:
        ...resizableRule(),
        ...themableRule(),
        ...gradientableRule(),
        ...outlineableRule(),
        ...mildableRule(),
        ...nudibleRule(),
    });
}, onBasicStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesBasicLayout(),
    
    // variants:
    ...usesBasicVariants(),
}), onBasicStylesChange);
