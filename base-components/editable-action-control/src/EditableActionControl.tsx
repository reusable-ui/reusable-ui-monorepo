// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'                 // cssfn css specific types
import {
    // rules:
    states,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    escapeSvg,
}                           from '@cssfn/cssfn'                     // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'                   // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'                // reads/writes css variables configuration

// reusable-ui:
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    mildOf,
    usesBackg,
    usesPadding,
}                           from '@reusable-ui/basic'               // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'           // a base component
import {
    // hooks:
    markActive as controlMarkActive,
    ifFocus,
    ifArrive,
}                           from '@reusable-ui/control'             // a base component
import {
    // hooks:
    ValidInvalidVars      as EditableControlValidInvalidVars,
    ifValid,
    ifInvalid,
    ifNoValidation,
    usesValidInvalidState as editableControlUsesValidInvalidState,
    
    
    
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
}                           from '@reusable-ui/icon'                // an icon set



// styles:
export const usesEditableActionControlLayout = () => {
    // dependencies:
    
    // backgrounds:
    const [, backgs  ] = usesBackg();
    
    // spacings:
    const [, paddings] = usesPadding();
    
    // states:
    const [, valids  ] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
        ]),
        ...style({
            ...children(iconElm, {
                ...imports([
                    usesIconImage(
                        /*img   : */valids.iconImg,
                        /*backg : */backgs.altBackgColor
                    ),
                ]),
                ...style({
                    // layouts:
                    content         : '""',
                    display         : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // positions:
                    position        : 'absolute',
                    insetInlineEnd  : paddings.paddingInline,
                    insetBlockStart : `calc(50% - (${editableActionControls.iconSize} / 2))`,
                    maskPosition    : 'right', // align icon to the right
                    
                    
                    
                    // sizes:
                    boxSizing       : 'border-box', // the final size is including borders & paddings
                    blockSize       : editableActionControls.iconSize,
                    aspectRatio     : '3 / 2', // make sure the icon's image ratio is 1.5 or less
                    
                    
                    
                    // accessibilities:
                    pointerEvents   : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(editableActionControls, 'icon')), // apply config's cssProps starting with icon***
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(editableActionControls), // apply config's cssProps
        }),
    });
};
export const usesEditableActionControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(editableActionControls);
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesEditableActionControlStates = () => {
    // dependencies:
    
    // states:
    const [validInvalidRule] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
            validInvalidRule,
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
            
            ifNoValidation({
                ...children(iconElm, {
                    display: 'none', // hides validation icon image
                }),
            }),
        ]),
    });
};

export const useEditableActionControlStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesEditableActionControlLayout(),
        
        // variants:
        usesEditableActionControlVariants(),
        
        // states:
        usesEditableActionControlStates(),
    ]),
}), { id: 'viprxwh99g' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export type EditableActionControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

export interface EditableActionControlProps<TElement extends EditableActionControlElement = EditableActionControlElement>
    extends
        // bases:
        EditableControlProps<TElement>
{
    // validations:
    minLength ?: number
    maxLength ?: number
}
const EditableActionControl = <TElement extends EditableActionControlElement = EditableActionControlElement>(props: EditableActionControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useEditableActionControlStyleSheet();
    
    
    
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
    EditableActionControl,
    EditableActionControl as default,
}
