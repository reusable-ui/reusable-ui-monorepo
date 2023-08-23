// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // react components:
    ElementWithMaybeLink,
}                           from '@reusable-ui/client-sides'    // a set of client-side functions

// internals:
import type {
    // utilities:
    DetermineCurrentPageProps,
}                           from './navigations.js'
import {
    // react components:
    ElementWithAutoActiveImpl,
}                           from './ElementWithAutoActiveImpl.js'



// react components:
export interface WithAutoActiveProps
    extends
        DetermineCurrentPageProps
{
    // components:
    /**
     * Required.  
     *   
     * The underlying `<Element>` to be `<Link>`-ed and manipulated of `[active]` & `[aria-current]` props, based on the current page url.
     */
    elementComponent  : React.ReactComponentElement<any, any>
    
    
    
    // children:
    /**
     * Optional.
     *   
     * The `children` of `<Element>` that *may* contain `<Link>`.  
     * If the `<Link>` exists, its `[to]`/`[href]` prop will be used for determining the current page.  
     * If the `<Link>` exists, it will wrap the `<Element>`.  
     * If the `<Link>` doesn't exist, the active state will never occur.  
     * The rest `children` will be inside the `<Element>`.  
     *   
     * If not supplied, defaults to `<Element>`'s `children`.  
     * If supplied, it will overwrite `<Element>`'s `children`.
     */
    children         ?: React.ReactNode
}
const WithAutoActive = (props: WithAutoActiveProps): JSX.Element|null => {
    // rest props:
    const {
        // navigations:
        caseSensitive,
        end,
        
        
        
        // components:
        elementComponent,
        
        
        
        // children:
        children = elementComponent.props.children, // if not supplied, defaults to `<Element>`'s `children`
    ...restElementProps} = props;
    
    
    
    // jsx:
    return (
        <ElementWithMaybeLink
            // components:
            elementComponent={ // the underlying `<Element>` to be `<Link>`-ed
                <ElementWithAutoActiveImpl
                    // other props:
                    {...restElementProps}
                    
                    
                    
                    // navigations:
                    caseSensitive={caseSensitive}
                    end={end}
                    
                    
                    
                    // components:
                    elementComponent={elementComponent} // the underlying `<Element>` to be manipulated of `[active]` & `[aria-current]` props, based on the current page url
                    
                    
                    
                    // children:
                    /* detect for `<Link>` component for `[to]`/`[href]` prop, for determining the current page */
                    childrenOrigin={children}
                >
                    {children}
                </ElementWithAutoActiveImpl>
            }
        >
            {/* detect for `<Link>` component to be a `<WrapperLink>` and wraps the `<Element>` with rest `children` */}
            {children}
        </ElementWithMaybeLink>
    );
};
export {
    WithAutoActive,
    WithAutoActive as default,
}
