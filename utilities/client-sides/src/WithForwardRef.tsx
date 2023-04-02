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
export interface WithForwardRefProps
{
    // components:
    elementComponent  : React.ReactComponentElement<any, any>
    
    
    
    // children:
    children         ?: React.ReactNode
}
const WithForwardRef = React.forwardRef((props: WithForwardRefProps, ref: React.ForwardedRef<any>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        elementComponent,
        
        
        
        // children:
        children,
    ...restElementProps} = props;
    
    
    
    // refs:
    const mergedOuterRef = useMergeRefs(
        // preserves the original `outerRef`:
        (props as any).outerRef,
        
        
        
        // forwards:
        ref,
    );
    
    
    
    // jsx:
    return React.cloneElement(elementComponent,
        // props:
        {
            // other props:
            ...restElementProps,
            
            
            
            // refs:
            outerRef : mergedOuterRef,
        },
        
        
        
        // children:
        children,
    );
});
export {
    WithForwardRef,
    WithForwardRef as default,
}
