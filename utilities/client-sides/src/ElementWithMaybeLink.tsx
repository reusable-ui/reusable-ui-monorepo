// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// reusable-ui utilities:
import {
    // utilities:
    flattenChildren,
}                           from '@reusable-ui/nodes'           // a set of React node utility functions
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
    JsxClientSideLink,
    isClientSideLink,
}                           from './client-sides.js'
import {
    // react components:
    ElementWithForwardRefProps,
    ElementWithForwardRef,
}                           from './ElementWithForwardRef.js'



// react components:
export interface ElementWithMaybeLinkProps {
    // components:
    /**
     * Required.  
     *   
     * The underlying `<Element>` to be `<Link>`-ed.
     */
    elementComponent  : React.ReactComponentElement<any, React.PropsWithChildren<{ outerRef?: React.Ref<Element> } & AccessibilityProps & SemanticProps>>
    
    
    
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
const ElementWithMaybeLink = (props: ElementWithMaybeLinkProps): JSX.Element|null => {
    // rest props:
    const {
        // components:
        elementComponent,
        
        
        
        // children:
        children = elementComponent.props.children, // if not supplied, defaults to `<Element>`'s `children`
    ...restElementProps} = props;
    
    
    
    const [mutatedChildren, linkComponent] = useMemo<readonly [React.ReactNode[], JsxClientSideLink|null]>(() => {
        // convert the <Element>'s children to flattened array:
        const flattenedChildren = flattenChildren(children);
        
        
        
        // inspect if <Element>'s children contain one/more <Link>:
        const linkComponent = flattenedChildren.find(isClientSideLink); // take the first <Link> (if any)
        
        
        
        // if not_contain <Link> => nothing to merge:
        if (!linkComponent) return [
            flattenedChildren,
            null,
        ];
        
        
        
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
            flattenedChildren
            .flatMap((child: React.ReactNode): React.ReactNode[] => {
                // not a <Link> => current <Element>'s child:
                if (child !== linkComponent) return [child];
                
                
                
                // merge with <Link>'s children:
                return (
                    flattenChildren(linkComponent.props.children) // unwrap the <Link>'s children & flattened them
                    .map((grandChild: React.ReactNode, childIndex): React.ReactNode => {
                        // conditions:
                        if (!React.isValidElement<{}>(grandChild)) return grandChild; // not an <Element> => place it anyway
                        
                        
                        
                        // jsx:
                        const linkKey = linkComponent.key ?? `.${childIndex}`;
                        return React.cloneElement<{}>(grandChild,
                            // props:
                            {
                                key : `${linkKey}/${grandChild.key}`, // fix the grandChild's key to avoid collision
                            },
                        );
                    })
                );
            })
        );
        
        
        
        // if contain <Link> => return the `mergedChildren`:
        return [
            mergedChildren,
            linkComponent,
        ];
    }, [children]);
    
    
    
    // if not_contain <Link> => normal <Element>:
    if (!linkComponent) return React.cloneElement(elementComponent,
        // props:
        {
            // other props:
            ...restElementProps,
            ...elementComponent.props, // overwrites restElementProps (if any conflics)
        },
        
        
        
        // children:
        mutatedChildren, // overwrite the children
    );
    
    
    
    // fn props:
    const propEnabled                     = usePropEnabled(elementComponent.props);
    const {isSemanticTag: isSemanticLink} = useTestSemantic(elementComponent.props, { semanticTag: 'a', semanticRole: 'link' });
    
    
    
    // jsx:
    const modifiedElementComponent = React.cloneElement(elementComponent,
        // props:
        {
            // other props:
            ...restElementProps,
            ...elementComponent.props, // overwrites restElementProps (if any conflics)
        },
        
        
        
        // children:
        mutatedChildren, // overwrite the children
    );
    
    
    
    // if <Element> is disabled => no need to wrap with <Link>:
    if (!propEnabled) return modifiedElementComponent;
    
    
    
    // jsx:
    // if <Element> is enabled => wraps with <Link>:
    const isNextJsLink = !!linkComponent.props.href;
    return React.cloneElement(linkComponent,
        // props:
        {
            // link props:
            ...( isNextJsLink  ? { legacyBehavior : true                     } : undefined), // NextJs's <Link>
            ...(!isNextJsLink  ? { linkComponent  : modifiedElementComponent } : undefined), // ReactRouterCompat's <Link>
            ...(isSemanticLink ? { passHref       : true                     } : undefined),
        },
        
        
        
        // children:
        (
            !isNextJsLink
            
            // for ReactRouterCompat's <Link> => uses the usual children:
            ? mutatedChildren
            
            // for NextJs's <Link> => wraps the children with <Element>:
            : ((): React.ReactComponentElement<any, ElementWithForwardRefProps> => {
                // props:
                const modifiedElementComponentProps = modifiedElementComponent.props;
                
                
                
                // jsx:
                return (
                    <ElementWithForwardRef
                        // other props:
                        {...modifiedElementComponentProps} // steals all modifiedElementComponent's props, so the <Owner> can recognize the <ElementWithForwardRef> as <TheirChild>
                        
                        
                        
                        // components:
                        elementComponent={
                            // clone modifiedElementComponent element with (almost) blank props:
                            <modifiedElementComponent.type
                                // identifiers:
                                key={modifiedElementComponent.key}
                                
                                
                                
                                //#region restore conflicting props
                                {...{
                                    ...(('elementComponent' in modifiedElementComponentProps) ? { elementComponent : modifiedElementComponentProps.elementComponent } : undefined),
                                }}
                                //#endregion restore conflicting props
                            />
                        }
                    />
                );
            })()
        )
    );
};
export {
    ElementWithMaybeLink,
    ElementWithMaybeLink as default,
}
