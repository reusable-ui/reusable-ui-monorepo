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
export interface ElementWithAutoActiveProps
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
     * The underlying `<Element>` to be `<Link>`-ed and manipulated of `[active]` & `[aria-current]` props, based on the current page url.
     */
    elementComponent  : React.ReactComponentElement<any, any>
}
const ElementWithAutoActive = (props: ElementWithAutoActiveProps): JSX.Element|null => {
    // rest props:
    const {
        // navigations:
        caseSensitive,
        end,
        
        
        
        // components:
        elementComponent,
    } = props;
    
    
    
    // jsx:
    return (
        <ElementWithMaybeLink
            // components:
            elementComponent={
                <ElementWithAutoActiveImpl
                    // navigations:
                    caseSensitive={caseSensitive}
                    end={end}
                    
                    
                    
                    // components:
                    elementComponent={elementComponent}
                    
                    
                    
                    // children:
                    /* detect for `<Link>` component for `[to]`/`[href]` prop, for determining the current page */
                    childrenOrigin={elementComponent.props.children} // copy the children before will be mutated by another <SomeWithSomething>
                />
            }
        />
    );
};
export {
    ElementWithAutoActive,
    ElementWithAutoActive as default,
}
