// cssfn:
import {
    // writes css in javascript:
    children,
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a typography management system:
    typos,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    onBasicStylesChange,
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    onButtonStylesChange,
    usesButtonLayout,
    usesButtonVariants,
    usesButtonStates,
}                           from '@reusable-ui/button'          // a base component
import {
    // configs:
    onIconStylesChange,
    icons,
    
    
    
    // hooks:
    usesIcon,
}                           from '@reusable-ui/icon'            // an icon component

// internals:
import {
    // configs:
    buttonIcons,
    cssButtonIconConfig,
}                           from './config.js'
import {
    // variants:
    SizeName,
    sizeOptions,
}                           from '../variants/resizable.js'



// styles:
export const onButtonIconStylesChange = watchChanges(onBasicStylesChange, onButtonStylesChange, onIconStylesChange, cssButtonIconConfig.onChange);

export const usesButtonIconLayout = memoizeStyle((options?: OrientationableOptions) => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(buttonIcons);
    const {paddingRule, paddingVars} = usesPadding(buttonIcons);
    const {             iconVars   } = usesIcon();
    
    
    
    return style({
        // features:
        ...borderRule(),
        ...paddingRule(),
        
        
        
        // layouts:
        ...usesButtonLayout(options),
        ...style({
            // children:
            ...children(':nth-child(n):not(_)', { // increase specificity by 1.1 to win with <Icon>
                ...vars({
                    //#region <Icon>
                    // sizes:
                    // fills the entire parent text's height:
                    [iconVars.size       ] : `calc(1em * ${switchOf(basics.lineHeight, typos.lineHeight)})`,
                    
                    
                    
                    // animations:
                    [icons.transition    ] : [
                        [icons.transition],
                        
                        // sizes:
                        // fix the resizing transition to sync with <Button>
                        ['inline-size', 0],
                        ['block-size' , 0],
                    ],
                    //#endregion <Icon>
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(buttonIcons), // apply config's cssProps
            
            
            
            // borders:
            border                 : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
}, onButtonIconStylesChange);

export const usesButtonIconVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable<SizeName>(buttonIcons, sizeOptions());
    
    
    
    return style({
        // variants:
        ...usesButtonVariants(),
        ...resizableRule(),
    });
}, onButtonIconStylesChange);

export const usesButtonIconStates = usesButtonStates;

export default memoizeStyle(() => style({
    // layouts:
    ...usesButtonIconLayout(),
    
    // variants:
    ...usesButtonIconVariants(),
    
    // states:
    ...usesButtonIconStates(),
}), onButtonIconStylesChange);
