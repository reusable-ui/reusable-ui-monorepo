// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                      // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui core:
import {
    // a collection of TypeScript type utilities, assertions, and validations for ensuring type safety in reusable UI components:
    type NoForeignProps,
    
    
    
    // react helper hooks:
    useEvent,
    
    
    
    // a possibility of UI having an invalid state:
    type ValidationDeps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'    // a base component



// styles:
export const useEditableTextControlStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : '783lmd7hos',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// react components:
export interface EditableTextControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        EditableControlProps<TElement>,
        
        // input:
        // partially implemented <input>'s props because <EditableTextControl> is a base text control component:
        Pick<React.InputHTMLAttributes<TElement>,
            |'minLength'
            |'maxLength'
        >
{
}
const EditableTextControl = <TElement extends Element = HTMLElement>(props: EditableTextControlProps<TElement>): JSX.Element|null => {
    // props:
    const {
        // validations:
        validationDeps : validationDepsOverwrite,
        
        
        
        // other props:
        ...restEditableTextControlProps
    } = props;
    
    const appendValidationDeps = useEvent<ValidationDeps>((bases) => [
        ...bases,
        
        // validations:
        (props.minLength ?? 0),
        (props.maxLength ?? Infinity),
    ]);
    const mergedValidationDeps = useEvent<ValidationDeps>((bases) => {
        // conditions:
        if (validationDepsOverwrite) return validationDepsOverwrite(appendValidationDeps(bases));
        return appendValidationDeps(bases);
    });
    
    
    
    // styles:
    const styles = useEditableTextControlStyleSheet();
    
    
    
    // default props:
    const {
        // variants:
        mild      = true,
        
        
        
        // classes:
        mainClass = styles.main,
        
        
        
        // other props:
        ...restEditableControlProps
    } = restEditableTextControlProps satisfies NoForeignProps<typeof restEditableTextControlProps, EditableControlProps<TElement>, Pick<React.InputHTMLAttributes<TElement>, 'minLength'|'maxLength'>>;
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // variants:
            mild={mild}
            
            
            
            // classes:
            mainClass={mainClass}
            
            
            
            // validations:
            validationDeps={mergedValidationDeps}
        />
    );
};
export {
    EditableTextControl,            // named export for readibility
    EditableTextControl as default, // default export to support React.lazy
}
