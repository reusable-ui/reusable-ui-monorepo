// react:
import {
    // react:
    default as React,
}                           from 'react'

// react router:
import {
    // types:
    To,
    
    
    
    // hooks:
    useHref,
}                        from 'react-router'
import {
    // types:
    LinkProps as BaseLinkProps,
    
    
    
    // hooks:
    useLinkClickHandler,
}                        from 'react-router-dom'



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
export const Link = React.forwardRef(function LinkWithRef(props: LinkProps, ref: React.ForwardedRef<HTMLAnchorElement>): JSX.Element|null {
    // rest props:
    const {
        // react router links:
        reloadDocument,
        replace = false,
        state,
        to,
        
        component = undefined,
        passHref  = false,
        
        
        // links:
        target,
    ...restProps} = props;
    
    
    
    // fn props:
    const href = useHref(to);
});
