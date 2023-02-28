// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component



// styles:
export const useVisuallyHiddenStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'zxyty1yae5' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
