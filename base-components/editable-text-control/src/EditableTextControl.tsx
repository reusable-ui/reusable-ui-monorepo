// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    states,
    children,
    style,
    imports,
    escapeSvg,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                      // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui core:
import {
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
    ifNoValidation,
    
    
    
    // an icon for indicating a validity status:
    usesValidationIcon,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'    // a base component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'                // an icon component



// defaults:
const _defaultMarkActiveOptions : MarkActiveOptions = { mild: null };



// styles:
export const iconElm = '::after'



export const usesEditableTextControlLayout = () => {
    // dependencies:
    
    // features:
    const {paddingVars       } = usesPadding();
    
    // states:
    const {validationIconVars} = usesValidationIcon();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
        ]),
        ...style({
            // children:
            ...children(iconElm, {
                ...imports([
                    usesIconImage(
                        /*image : */validationIconVars.iconImage,
                    ),
                ]),
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
};
export const usesEditableTextControlVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(editableTextControls);
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            resizableRule,
        ]),
    });
};
export const usesEditableTextControlStates = () => {
    // dependencies:
    
    // states:
    const {validationIconRule} = usesValidationIcon(editableTextControls);
    
    
    
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
            validationIconRule,
        ]),
        ...states([
            ifActive({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            ifFocus({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            ifArrive({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            
            ifNoValidation({
                ...children(iconElm, {
                    display: 'none', // hide the validation icon image
                }),
            }),
        ]),
    });
};

export const useEditableTextControlStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesEditableTextControlLayout(),
        
        // variants:
        usesEditableTextControlVariants(),
        
        // states:
        usesEditableTextControlStates(),
    ]),
}), { id: '783lmd7hos' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [editableTextControls, editableTextControlValues, cssEditableTextControlConfig] = cssConfig(() => {
    return {
        // accessibilities:
        cursor      : 'text' as CssKnownProps['cursor'],
        
        
        
        // animations:
        iconSize    : '1em'  as CssKnownProps['inlineSize'],
        iconValid   : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>")}")`                        as CssKnownProps['maskImage'],
        iconInvalid : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M7.3,6.31,5,4,7.28,1.71a.7.7,0,1,0-1-1L4,3,1.71.72a.7.7,0,1,0-1,1L3,4,.7,6.31a.7.7,0,0,0,1,1L4,5,6.31,7.3A.7.7,0,0,0,7.3,6.31Z'/></svg>")}")` as CssKnownProps['maskImage'],
    };
}, { prefix: 'tedit' });



// react components:
export interface EditableTextControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        EditableControlProps<TElement>
{
    // validations:
    minLength ?: number
    maxLength ?: number
}
const EditableTextControl = <TElement extends Element = HTMLElement>(props: EditableTextControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet = useEditableTextControlStyleSheet();
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    EditableTextControl,
    EditableTextControl as default,
}
