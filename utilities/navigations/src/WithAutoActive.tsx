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
    
    
    
    // props:
    const elementComponentProps : typeof elementComponent.props = {
        // other props:
        ...restElementProps,
        ...elementComponent.props, // overwrites restElementProps (if any conflics)
        
        
        
        // children:
        children,
    };
    
    
    
    // jsx:
    const elementWithAutoActiveImpl = (
        <ElementWithAutoActiveImpl
            // other props:
            {...elementComponentProps} // steals all elementComponent's props, so the <Owner> can recognize the <ElementWithAutoActiveImpl> as <TheirChild>
            
            
            
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
            childrenOrigin={children} // copy the children before be mutated by another <SomeWithSomething>
        />
    );
    const elementWithAutoActiveImplProps = elementWithAutoActiveImpl.props;
    
    return (
        <ElementWithMaybeLink
            // other props:
            {...elementWithAutoActiveImplProps} // steals all elementWithAutoActiveImpl's props, so the <Owner> can recognize the <ElementWithMaybeLink> as <TheirChild>
            
            
            
            // components:
            elementComponent={ // the underlying `<Element>` to be `<Link>`-ed
                // clone elementWithAutoActiveImpl element with (almost) blank props:
                <elementWithAutoActiveImpl.type
                    // identifiers:
                    key={elementWithAutoActiveImpl.key}
                    
                    
                    
                    //#region restore conflicting props
                    {...{
                        ...(('elementComponent' in elementWithAutoActiveImplProps) ? { elementComponent : elementWithAutoActiveImplProps.elementComponent } : undefined),
                    }}
                    //#endregion restore conflicting props
                />
            }
        />
    );
};
export {
    WithAutoActive,
    WithAutoActive as default,
}
