// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    SemanticProps,
    useTestSemantic,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // hooks:
    usePropEnabled,
    
    
    
    // react components:
    AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// internals:
import {
    // utilities:
    isClientSideLink,
}                           from './client-sides.js'
import {
    // react components:
    WithForwardRef,
}                           from './WithForwardRef.js'



// react components:
export interface WithLinkAndElementProps {
    // components:
    /**
     * Required.  
     *   
     * The underlying `<Element>` to be `<Link>`-ed.
     */
    elementComponent  : React.ReactComponentElement<any, { outerRef?: React.Ref<Element> } & AccessibilityProps & SemanticProps>
    
    
    
    // children:
    /**
     * Optional.
     *   
     * The `children` of `<Element>` that *may* contain `<Link>`.  
     * If the `<Link>` exists, it will wrap the `<Element>`.  
     * The rest `children` will be inside the `<Element>`.  
     *   
     * If not supplied, defaults to `<Element>`'s `children`.  
     * If supplied, it will overwrite `<Element>`'s `children`.
     */
    children         ?: React.ReactNode
}
const WithLinkAndElement = (props: WithLinkAndElementProps): JSX.Element|null => {
    // rest props:
    const {
        // components:
        elementComponent,
        
        
        
        // children:
        children = elementComponent.props.children, // if not supplied, defaults to `<Element>`'s `children`
    ...restElementProps} = props;
    
    
    
    // convert the children to array (if necessary):
    const childrenArray : React.ReactNode[] = Array.isArray(children) ? (children as React.ReactNode[]) : React.Children.toArray(children);
    
    // inspect if <Element>'s children contain one/more <Link>:
    const linkComponent = childrenArray.find(isClientSideLink); // take the first <Link> (if any)
    
    // if no contain <Link> => normal <Element>:
    if (!linkComponent) return React.cloneElement(elementComponent,
        // props:
        {
            // other props:
            ...restElementProps,
            ...elementComponent.props, // overwrites restElementProps (if any conflics)
        },
        
        
        
        // children:
        ...childrenArray, // overwrite the children
    );
    
    
    
    /*
        merge <Link>'s children and <Element>'s children:
        
        declaration: [
            <c1>
            <c2>
            <Link>
                <c3>
                <c4>
            </Link>
            <c5>
            <c6>
        ]
        
        rendered to: [
            <c1>
            <c2>
            <c3>
            <c4>
            <c5>
            <c6>
        ]
    */
    const mergedChildren : React.ReactNode[] = (
        childrenArray
        .flatMap((child: React.ReactNode): React.ReactNode[] => {
            // not a found <Link> => current <Element>'s children:
            if (child !== linkComponent) return [child];
            
            
            
            // merge with <Link>'s children:
            return (
                React.Children.toArray(linkComponent.props.children) // unwrap the <Link>
                .map((grandChild: React.ReactNode): React.ReactNode => {
                    if (!React.isValidElement(grandChild)) return grandChild;
                    return React.cloneElement(grandChild, { key: `${child.key}-${grandChild.key}` }); // fix the grandChild's key
                })
            );
        })
    );
    
    
    
    // fn props:
    const propEnabled                     = usePropEnabled(elementComponent.props);
    const {isSemanticTag: isSemanticLink} = useTestSemantic(elementComponent.props, { semanticTag: 'a', semanticRole: 'link' });
    
    
    
    // jsx:
    // if <Element> is disabled => no need to wrap with <Link>:
    if (!propEnabled) return React.cloneElement(elementComponent,
        // props:
        {
            // other props:
            ...restElementProps,
            ...elementComponent.props, // overwrites restElementProps (if any conflics)
        },
        
        
        
        // children:
        ...mergedChildren, // overwrite the children
    );
    
    
    
    // jsx:
    // if <Element> is enabled => wraps with <Link>:
    const isNextJsLink = !!linkComponent.props.href;
    return React.cloneElement(linkComponent,
        // props:
        {
            // link props:
            ...( isNextJsLink  ? { legacyBehavior : true             } : undefined), // NextJs's <Link>
            ...(!isNextJsLink  ? { linkComponent  : elementComponent } : undefined), // ReactRouterCompat's <Link>
            ...(isSemanticLink ? { passHref       : true             } : undefined),
        },
        
        
        
        // children:
        (
            !isNextJsLink
            ?
            // for ReactRouterCompat's <Link> => uses the usual children:
            mergedChildren
            :
            // for NextJs's <Link> => wraps the children with <Element>:
            <WithForwardRef>
                {React.cloneElement(elementComponent,
                    // props:
                    {
                        // other props:
                        ...restElementProps,
                        ...elementComponent.props, // overwrites restElementProps (if any conflics)
                    },
                    
                    
                    
                    // children:
                    ...mergedChildren, // overwrite the children
                )}
            </WithForwardRef>
        )
    );
};
export {
    WithLinkAndElement,
    WithLinkAndElement as default,
}
