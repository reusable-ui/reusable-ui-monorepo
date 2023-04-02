// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useTestSemantic,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // hooks:
    usePropEnabled,
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
    elementComponent  : React.ReactComponentElement<any, any>
    
    
    
    // children:
    children         ?: React.ReactNode
}
const WithLinkAndElement = (props: WithLinkAndElementProps): JSX.Element|null => {
    // rest props:
    const {
        // components:
        elementComponent,
        
        
        
        // children:
        children,
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
        elementComponent.props.children ?? childrenArray, // replace the children (if needed)
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
        elementComponent.props.children ?? mergedChildren, // replace the children (if needed)
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
            <WithForwardRef
                // components:
                elementComponent={elementComponent}
            >
                {mergedChildren}
            </WithForwardRef>
        )
    );
};
export {
    WithLinkAndElement,
    WithLinkAndElement as default,
}
