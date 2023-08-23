// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import type {
    // react components:
    AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// internals:
import {
    // utilities:
    DetermineCurrentPageProps,
    useDetermineCurrentPage,
}                           from './navigations.js'



// react components:
export interface ElementWithAutoActiveImplProps
    extends
        Omit<DetermineCurrentPageProps,
            // children:
            |'children' // no nested children
        >
{
    // components:
    /**
     * Required.  
     *   
     * The underlying `<Element>` to be manipulated of `[active]` & `[aria-current]` props, based on the current page url.
     */
    elementComponent  : React.ReactComponentElement<any, React.PropsWithChildren<AccessibilityProps & Pick<React.AriaAttributes, 'aria-current'>>>
    
    
    
    // children:
    /**
     * Required.
     *   
     * The `children` of `<Element>` that *may* contain `<Link>`.  
     * If the `<Link>` exists, its `[to]`/`[href]` prop will be used for determining the current page.  
     * If the `<Link>` doesn't exist, the active state will never occur.  
     */
    childrenOrigin    : React.ReactNode
}
const ElementWithAutoActiveImpl = (props: ElementWithAutoActiveImplProps): JSX.Element|null => {
    // rest props:
    const {
        // navigations:
        caseSensitive,
        end,
        
        
        
        // components:
        elementComponent,
        
        
        
        // children:
        childrenOrigin,
    ...restElementProps} = props;
    
    
    
    // fn props:
    const activeDn = useDetermineCurrentPage({
        // navigations:
        caseSensitive,
        end,
        
        
        
        // children:
        children : childrenOrigin,
    }) ?? false /* fallback to `false` => server-side or <Link> was not defined */;
    const activeFn = elementComponent.props.active /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // jsx:
    return React.cloneElement<React.PropsWithChildren<AccessibilityProps & Pick<React.AriaAttributes, 'aria-current'>>>(elementComponent,
        // props:
        {
            // other props:
            ...restElementProps,
            ...elementComponent.props, // overwrites restElementProps (if any conflics)
            
            
            
            // semantics:
            'aria-current' : (activeFn || undefined) && elementComponent.props['aria-current'],
            
            
            
            // states:
            active         : activeFn,
        },
    );
};
export {
    ElementWithAutoActiveImpl,
    ElementWithAutoActiveImpl as default,
}
