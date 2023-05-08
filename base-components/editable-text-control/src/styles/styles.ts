// cssfn:
import {
    // writes css in javascript:
    states,
    children,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                      // writes css in javascript

// reusable-ui core:
import {
    // background stuff of UI:
    usesBackground,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ifActive,
    MarkActiveOptions,
    markActive,
    
    
    
    // a capability of UI to be focused:
    ifFocus,
    
    
    
    // adds an interactive feel to a UI:
    ifArrive,
    
    
    
    // a possibility of UI having an invalid state:
    ifNeutralize,
    
    
    
    // an icon for indicating a validity status:
    usesValidationIcon,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onEditableControlStylesChange,
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
}                           from '@reusable-ui/editable-control'    // a base component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'                // an icon component

// internals:
import {
    // elements:
    iconElm,
}                           from './elements.js'
import {
    // configs:
    editableTextControls,
    cssEditableTextControlConfig,
}                           from './config.js'



// defaults:
const _defaultMarkActiveOptions : MarkActiveOptions = { mild: null };



// styles:
export const onEditableTextControlStylesChange = watchChanges(onEditableControlStylesChange, cssEditableTextControlConfig.onChange);

export const usesEditableTextControlLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {backgroundVars    } = usesBackground();
    const {paddingVars       } = usesPadding();
    
    // states:
    const {validationIconVars} = usesValidationIcon();
    
    
    
    return style({
        // layouts:
        ...usesEditableControlLayout(),
        ...style({
            // children:
            ...children(iconElm, {
                // layouts:
                ...usesIconImage({
                    image : validationIconVars.iconImage,
                    color : backgroundVars.altBackgColor,
                }),
                ...style({
                    // layouts:
                    content         : '""',
                    display         : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // positions:
                    position        : 'absolute',
                    insetInlineEnd  : paddingVars.paddingInline,
                    insetBlockStart : `calc(50% - (${editableTextControls.iconSize} / 2))`,
                    maskPosition    : 'right', // align icon to the right
                    
                    
                    
                    // sizes:
                    boxSizing       : 'border-box', // the final size is including borders & paddings
                    blockSize       : editableTextControls.iconSize,
                    aspectRatio     : '3 / 2', // make sure the icon's image ratio is 1.5 or less
                    
                    
                    
                    // accessibilities:
                    pointerEvents   : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(editableTextControls, 'icon')), // apply config's cssProps starting with icon***
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(editableTextControls), // apply config's cssProps
        }),
    });
}, onEditableTextControlStylesChange);

export const usesEditableTextControlVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(editableTextControls);
    
    
    
    return style({
        // variants:
        ...usesEditableControlVariants(),
        ...resizableRule(),
    });
}, onEditableTextControlStylesChange);

export const usesEditableTextControlStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {validationIconRule} = usesValidationIcon(editableTextControls);
    
    
    
    const markActiveRule = markActive(_defaultMarkActiveOptions);
    
    
    
    return style({
        // states:
        ...usesEditableControlStates(),
        ...validationIconRule(),
        ...states([
            ifActive(markActiveRule),
            ifFocus(markActiveRule),
            ifArrive(markActiveRule),
            
            ifNeutralize({
                ...children(iconElm, {
                    display: 'none', // hide the validation icon image
                }),
            }),
        ]),
    });
}, onEditableTextControlStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesEditableTextControlLayout(),
    
    // variants:
    ...usesEditableTextControlVariants(),
    
    // states:
    ...usesEditableTextControlStates(),
}), onEditableTextControlStylesChange);
