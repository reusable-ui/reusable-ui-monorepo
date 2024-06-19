// react:
import {
    // react:
    default as React,
}                           from 'react'

// styles:
import {
    useVisuallyHiddenStyleSheet,
}                           from './styles/loader.js'

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component



// react components:
export interface VisuallyHiddenProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>
{
}
const VisuallyHidden = <TElement extends Element = HTMLElement>(props: VisuallyHiddenProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet = useVisuallyHiddenStyleSheet();
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...props}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    VisuallyHidden,
    VisuallyHidden as default,
}
