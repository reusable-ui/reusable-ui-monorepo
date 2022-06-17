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
    component ?: React.ReactElement
    passHref  ?: boolean
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
        
        component      = undefined,
        passHref       = false,
        
        
        
        // links:
        target,
        
        
        
        // children:
        children,
    ...restAnchorProps} = props;
    
    
    
    // fn props:
    const href = useHref(to);
    
    
    
    // handlers:
    const handleClientSideClick            = useLinkClickHandler(to, { replace, state, target });
    const handleConditionalClientSideClick = useEvent<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
        if (!event.defaultPrevented && !reloadDocument) {
            handleClientSideClick(event);
        } // if
    }, [handleClientSideClick, reloadDocument]);
    const handleClick = useMergeEvents(
        // preserves the original `onClick`:
        props.onClick, // keeps the original onClick on <Link onClick={...} />
        
        
        
        // handlers:
        handleConditionalClientSideClick,
    );
    
    
    
    // jsx:
    if (component) {
        // handlers:
        const handleMergedClick = useMergeEvents(
            // preserves the original `onClick`:
            component.props.onClick, // keeps the original onClick on <FooComponent onClick={...} />
            
            
            
            // handlers:
            handleClick,
        );
        
        
        
        // jsx:
        return React.cloneElement(component,
            // props:
            {
                // essentials:
                ref,
                
                
                
                // links:
                ...(passHref ? {
                    href,
                    target,
                } : {}),
                
                
                
                // handlers:
                onClick: handleMergedClick,
            },
            
            
            
            // children:
            children
        );
    }
    else {
        // jsx:
        return (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a
                // other props:
                {...restAnchorProps}
                
                
                
                // essentials:
                ref={ref}
                
                
                
                // links:
                href={href}
                target={target}
                
                
                
                // handlers:
                onClick={handleClick}
            >
                {children}
            </a>
        );
    } // if
});
export {
    Link,
    Link as default,
}
