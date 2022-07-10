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

// reusable-ui:
import {
    // hooks:
    useEvent,
    useMergeEvents,
}                           from '@reusable-ui/hooks'           // react helper hooks



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
        
        linkComponent = (<a /> as React.ReactElement<LinkProps>),
        passHref       = false,
        
        
        
        // links:
        target,
        
        
        
        // children:
        children,
    ...restAnchorProps} = props;
    
    
    
    // fn props:
    const href = useHref(to);
    
    
    
    // handlers:
    const handleClickClientSide            = useLinkClickHandler(to, { replace, state, target });
    const handleClickInternal = useEvent<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
        if (!event.defaultPrevented && !reloadDocument) {
            handleClickClientSide(event);
        } // if
    }, [handleClickClientSide, reloadDocument]);
    const handleMergedClick = useMergeEvents(
        // preserves the original `onClick` from `linkComponent`:
        linkComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // handlers:
        handleClickInternal,
    );
    
    
    
    // jsx:
    const isReusableUiComponent : boolean = (typeof(linkComponent.type) !== 'string');
    return React.cloneElement(linkComponent,
        // props:
        {
            // refs:
            [isReusableUiComponent ? 'elmRef' : 'ref'] : ref,
            
            
            
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
