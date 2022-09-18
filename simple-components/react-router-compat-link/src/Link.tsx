// react:
import {
    // react:
    default as React,
}                           from 'react'

// react router:
import {
    // hooks:
    useHref,
}                           from 'react-router'
import {
    // types:
    LinkProps as BaseLinkProps,
    
    
    
    // hooks:
    useLinkClickHandler,
}                           from 'react-router-dom'

// reusable-ui core:
import {
    // a set of React node utility functions:
    isReusableUiComponent,
    
    
    
    // react helper hooks:
    useEvent,
    useMergeEvents,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component



export interface LinkProps extends BaseLinkProps
{
    // react router links:
    linkComponent ?: React.ReactElement
    passHref      ?: boolean
}

/**
 * The public API for rendering a history-aware <a>.
 *
 * @see https://reactrouter.com/docs/en/v6/components/link
 */
const Link = React.forwardRef(function LinkWithRef(props: LinkProps, ref: React.ForwardedRef<HTMLAnchorElement>): JSX.Element|null {
    // rest props:
    const {
        // react router links:
        reloadDocument = false,
        replace        = false,
        state,
        to,
        
        linkComponent  = (<a /> as React.ReactElement<LinkProps>),
        passHref       = (linkComponent.type === 'a'), // if [passHref] is not specified, the default (safe) is true for <a> element, otherwise false
        
        
        
        // links:
        target,
        
        
        
        // children:
        children,
    ...restAnchorProps} = props;
    
    
    
    // fn props:
    const href = useHref(to);
    
    
    
    // handlers:
    const handleClickClientSide = useLinkClickHandler(to, { replace, state, target });
    const handleClickInternal   = useEvent<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
        if (!event.defaultPrevented && !reloadDocument) {
            handleClickClientSide(event);
        } // if
    });
    const handleMergedClick     = useMergeEvents(
        // preserves the original `onClick` from `linkComponent`:
        linkComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    
    
    // jsx:
    const isReusableUiLinkComponent : boolean = isReusableUiComponent<GenericProps<Element>>(linkComponent);
    return React.cloneElement(linkComponent,
        // props:
        {
            // refs:
            [isReusableUiLinkComponent ? 'elmRef' : 'ref'] : ref,
            
            
            
            // links:
            ...(passHref ? {
                href,
                target,
                
                // other props:
                ...restAnchorProps,
            } : null),
            
            
            
            // handlers:
            onClick: handleMergedClick,
        },
        
        
        
        // children:
        children,
    );
});
export {
    Link,
    Link as default,
}
