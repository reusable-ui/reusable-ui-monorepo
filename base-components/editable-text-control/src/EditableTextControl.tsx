// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui components:
import {
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'    // a base component



// styles:
export const useEditableTextControlStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: '783lmd7hos' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
