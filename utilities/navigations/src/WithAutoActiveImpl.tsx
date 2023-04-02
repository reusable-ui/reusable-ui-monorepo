// react:
import {
    // react:
    default as React,
}                           from 'react'

// internals:
import {
    // utilities:
    DetermineCurrentPageProps,
    useDetermineCurrentPage,
}                           from './navigations.js'



// react components:
export interface WithAutoActiveImplProps
    extends
        DetermineCurrentPageProps
{
    // components:
    elementComponent  : React.ReactComponentElement<any, any>
}
const WithAutoActiveImpl = (props: WithAutoActiveImplProps): JSX.Element|null => {
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
    
    
    
    // fn props:
    const activeFn = useDetermineCurrentPage({
        // nav matches:
        caseSensitive,
        end,
        
        
        
        // children:
        children,
    }) ?? false /* fallback to `false` => server-side or <Link> was not defined */;
    
    
    
    // jsx:
    return React.cloneElement<any>(elementComponent,
        // props:
        {
            // semantics:
            'aria-current' : (activeFn || undefined) && elementComponent.props['aria-current'],
            
            
            
            // states:
            active         : activeFn,
        },
        
        
        
        // children:
        elementComponent.props.children ?? children,
    );
};
export {
    WithAutoActiveImpl,
    WithAutoActiveImpl as default,
}
