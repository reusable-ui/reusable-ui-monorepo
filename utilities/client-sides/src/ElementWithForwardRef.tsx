// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks



// react components:
export interface ElementWithForwardRefProps {
    // refs:
    /**
     * The *reusable-ui* way of forward `ref`.
     */
    outerRef         ?: React.Ref<Element>
    
    
    
    // components:
    /**
     * Required.  
     *   
     * The underlying `<Element>` to be forward `ref`-ed.
     */
    elementComponent  : React.ReactComponentElement<any, Pick<ElementWithForwardRefProps, 'outerRef'>>
}
const ElementWithForwardRef = React.forwardRef<Element, ElementWithForwardRefProps>((props, ref): JSX.Element|null => {
    // rest props:
    const {
        // refs:
        outerRef,
        
        
        
        // components:
        elementComponent,
    ...restComponentProps} = props;
    
    
    
    // refs:
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef`:
        outerRef,
        
        
        
        // forwards:
        ref,
    );
    
    
    
    // jsx:
    return React.cloneElement<Pick<ElementWithForwardRefProps, 'outerRef'>>(elementComponent,
        // props:
        {
            // other props:
            ...restComponentProps,
            ...elementComponent.props, // overwrites restComponentProps (if any conflics)
            
            
            
            // refs:
            outerRef : mergedOuterRef,
        },
    );
});
export {
    ElementWithForwardRef,
    ElementWithForwardRef as default,
}
