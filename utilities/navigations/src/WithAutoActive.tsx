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
            elementComponent={
                <WithAutoActiveImpl
                    // nav matches:
                    caseSensitive={caseSensitive}
                    end={end}
                    
                    
                    
                    // components:
                    elementComponent={elementComponent} // the elementComponent to be manipulated of [active] & [aria-current] props
                >
                    {/* detect for <Link> component from the `children` to inspect the [href]/[to] prop */}
                    {children}
                </WithAutoActiveImpl>
            }
        >
            {/* detect for <Link> component to be a <WrapperLink> and wraps the rest children */}
            {children}
        </WithLinkAndElement>
    );
};
export {
    WithAutoActive,
    WithAutoActive as default,
}
