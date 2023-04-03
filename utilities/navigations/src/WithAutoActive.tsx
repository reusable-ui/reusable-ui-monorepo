// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // react components:
    WithLinkAndElement,
}                           from '@reusable-ui/client-sides'    // a set of client-side functions

// internals:
import type {
    // utilities:
    DetermineCurrentPageProps,
}                           from './navigations.js'
import {
    // react components:
    WithAutoActiveImpl,
}                           from './WithAutoActiveImpl.js'



// react components:
export interface WithAutoActiveProps
    extends
        DetermineCurrentPageProps
{
    // components:
    elementComponent  : React.ReactComponentElement<any, any>
    
    
    
    // children:
    children         ?: React.ReactNode
}
const WithAutoActive = (props: WithAutoActiveProps): JSX.Element|null => {
    // rest props:
    const {
        // nav matches:
        caseSensitive,
        end,
        
        
        
        // components:
        elementComponent,
        
        
        
        // children:
        children,
    } = props;
    
    
    
    // jsx:
    return (
        <WithLinkAndElement
            // components:
            elementComponent={ // the underlying `<Element>` to be `<Link>`-ed
                <WithAutoActiveImpl
                    // nav matches:
                    caseSensitive={caseSensitive}
                    end={end}
                    
                    
                    
                    // components:
                    elementComponent={elementComponent} // the underlying `<Element>` to be manipulated of [active] & [aria-current] props, based on the current page url
                >
                    {/* detect for `<Link>` component for [to]/[href] prop, for determining the current page */}
                    {children}
                </WithAutoActiveImpl>
            }
        >
            {/* detect for `<Link>` component to be a `<WrapperLink>` and wraps the `<Element>` with rest `children` */}
            {children}
        </WithLinkAndElement>
    );
};
export {
    WithAutoActive,
    WithAutoActive as default,
}
