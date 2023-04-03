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
     * It the `<Link>` exists, it will wrap the `<Element>`.  
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
    ...restLinkProps} = props;
    
    
    
    // convert the children to array (if necessary):
    const childrenArray = (Array.isArray(children) ? (children as React.ReactNode[]) : React.Children.toArray(children));
    
    // inspect if <Element>'s children contain one/more <Link>:
    const linkComponent = childrenArray.find(isClientSideLink); // take the first <Link> (if any)
    
    // if no contain <Link> => normal <Element>:
    if (!linkComponent) return React.cloneElement(elementComponent,
        // props:
        undefined, // keeps the original <Element>'s props
        
        
        
        // children:
        childrenArray, // overwrite the children
    );
    
    
    
    /*
        swaps between <Element> and <Link> while maintaining their's children, so:
        declaration:
        <Element>
            <c1>
            <c2>
            <Link>
                <c3>
                <c4>
            </Link>
            <c5>
            <c6>
        </Element>
        rendered to:
        <Link>
            <Element>
                <c1>
                <c2>
                <c3>
                <c4>
                <c5>
                <c6>
            </Element>
        </Link>
    */
    const mergedChildren = (
        childrenArray
        .flatMap((child): React.ReactNode[] => { // merge <Link>'s children and <Element>'s children:
            // current <Element>'s children:
            if (child !== linkComponent) return [child];
            
            
            
            // merge with <Link>'s children:
            return (
                React.Children.toArray(linkComponent.props.children) // unwrap the <Link>
                .map((grandChild) => { // fix the grandChild's key
                    if (!React.isValidElement(grandChild)) return grandChild;
                    return React.cloneElement(grandChild, { key: `${child.key}-${grandChild.key}` });
                })
            );
        })
    );
    
    
    
    // fn props:
    const propEnabled                     = usePropEnabled(elementComponent.props);
    const {isSemanticTag: isSemanticLink} = useTestSemantic(elementComponent.props, { semanticTag: 'a', semanticRole: 'link' });
    
    
    
    // jsx:
    if (!propEnabled) return React.cloneElement(elementComponent, // if <Element> is disabled => no need to wrap with <Link>
        // props:
        undefined, // keeps the original <Element>'s props
        
        
        
        // children:
        mergedChildren, // overwrite the children
    );
    
    const isNextJsLink = !!linkComponent.props.href;
    return React.cloneElement(linkComponent,
        // props:
        {
            // other props:
            ...restLinkProps,
            
            
            
            // link props:
            ...( isNextJsLink  ? { legacyBehavior : true             } : undefined), // NextJs's <Link>
            ...(!isNextJsLink  ? { linkComponent  : elementComponent } : undefined), // ReactRouterCompat's <Link>
            ...(isSemanticLink ? { passHref       : true             } : undefined),
        },
        
        
        
        // children:
        (
            !isNextJsLink
            ?
            mergedChildren
            :
            React.forwardRef<Element, { outerRef?: React.Ref<Element>, children?: React.ReactNode }>((props, ref): JSX.Element|null => {
                // rest props:
                const {
                    // refs:
                    outerRef,
                    
                    
                    
                    // children:
                    children : mergedChildren,
                ...restElementProps} = props;
                
                
                
                // refs:
                const mergedOuterRef = useMergeRefs(
                    // preserves the original `outerRef`:
                    outerRef,
                    
                    
                    
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
                    mergedChildren, // overwrite the children
                );
            })({ children: mergedChildren })
        )
    );
};
export {
    WithLinkAndElement,
    WithLinkAndElement as default,
}
