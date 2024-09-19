'use client'

// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// next-js:
import {
    // react components:
    default as LinkOrigin,
}                           from 'next/link.js'
import {
    // hooks:
    usePathname,
}                           from 'next/navigation.js'

// reusable-ui core:
import {
    // react helper hooks:
    useIsomorphicLayoutEffect,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



type LinkOriginProps = Parameters<typeof LinkOrigin>[0]
export interface LinkProps
    extends
        LinkOriginProps
{
}
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    // states:
    const newPathName = usePathname();
    const [latePathName, setLatePathName] = useState<string>(newPathName);
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (latePathName === newPathName) return; // already the same => ignore
        
        
        
        // actions:
        setLatePathName(newPathName); // an extra re-render: force to re-render for the SECOND_TIME when the current url is CHANGED
    }, [newPathName, latePathName]); // sync newPathName <==> latePathName
    
    
    
    // jsx:
    return (
        <LinkOrigin
            // other props:
            {...props}
            
            
            
            // refs:
            ref={ref}
        />
    );
});
export {
    Link,
    Link as default,
}
