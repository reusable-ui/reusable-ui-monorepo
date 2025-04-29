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
    ...restElementProps} = props;
    
    
    
    // props:
    const elementComponentProps : typeof elementComponent.props = {
        // other props:
        ...restElementProps,
        ...elementComponent.props, // overwrites restElementProps (if any conflics)
    };
    
    
    
    // jsx:
    const elementWithAutoActiveImpl = (
        <ElementWithAutoActiveImpl
            // other props:
            {...elementComponentProps} // steals all elementComponent's props, so the <ElementWithMaybeLink> can recognize the <ElementWithAutoActiveImpl> having a/some <Link> component
            
            
            
            // navigations:
            caseSensitive={caseSensitive}
            end={end}
            
            
            
            // components:
            elementComponent={ // the underlying `<Element>` to be manipulated of `[active]` & `[aria-current]` props, based on the current page url
                // clone elementComponent element with (almost) blank props:
                <elementComponent.type
                    // identifiers:
                    key={elementComponent.key}
                    
                    
                    
                    //#region restore conflicting props
                    {...{
                        ...(('caseSensitive'    in elementComponentProps) ? { caseSensitive    : elementComponentProps.caseSensitive    } : undefined),
                        ...(('end'              in elementComponentProps) ? { end              : elementComponentProps.end              } : undefined),
                        ...(('elementComponent' in elementComponentProps) ? { elementComponent : elementComponentProps.elementComponent } : undefined),
                        ...(('childrenOrigin'   in elementComponentProps) ? { childrenOrigin   : elementComponentProps.childrenOrigin   } : undefined),
                    }}
                    //#endregion restore conflicting props
                />
            }
            
            
            
            // children:
            /* detect for `<Link>` component for `[to]`/`[href]` prop, for determining the current page */
            childrenOrigin={elementComponentProps.children} // copy the children before will be mutated by another <SomeWithSomething>
        />
    );
    
    return (
        <ElementWithMaybeLink
            // components:
            elementComponent={
                elementWithAutoActiveImpl
            }
        />
    );
};
export {
    ElementWithAutoActive,
    ElementWithAutoActive as default,
}
