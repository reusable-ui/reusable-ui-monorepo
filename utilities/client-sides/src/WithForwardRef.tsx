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
export interface WithForwardRefProps {
    // refs:
    /**
     * The *reusable-ui* way of forward `ref`.
     */
    outerRef ?: React.Ref<Element>
    
    
    
    // components:
    /**
     * Required.  
     *   
     * The underlying `<Element>` to be forward `ref`-ed.
     */
    children  : React.ReactComponentElement<any, Pick<WithForwardRefProps, 'outerRef'>>
}
const WithForwardRef = React.forwardRef<Element, WithForwardRefProps>((props, ref): JSX.Element|null => {
    // rest props:
    const {
        // refs:
        outerRef,
        
        
        
        // components:
        children : elementComponent,
    ...restElementProps} = props;
    
    
    
    // refs:
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef`:
        outerRef,
        
        
        
        // forwards:
        ref,
    );
    
    
    
    // jsx:
    return React.cloneElement(elementComponent,
        // props:
        {
            // other props:
            ...restElementProps,
            ...elementComponent.props, // overwrites restElementProps (if any conflics)
            
            
            
            // refs:
            outerRef : mergedOuterRef,
        },
    );
});
export {
    WithForwardRef,
    WithForwardRef as default,
}
