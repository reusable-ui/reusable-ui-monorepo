// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useEffect,
    useMemo,
}                           from 'react'

// next-js:
import {
    // react components:
    default as LinkOrigin,
}                           from 'next/link'
import {
    // hooks:
    usePathname,
}                           from 'next/navigation'



type LinkOriginProps = Parameters<typeof LinkOrigin>[0]
export interface LinkProps
    extends
        LinkOriginProps
{
}
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    // states:
    const newPathName = usePathname(); // just to force to re-render when the url changes
    const [latePathName, setLatePathName] = useState<string>(newPathName); // actually, force to re-render when the url is completely changed
    
    
    
    // dom effects:
    useEffect(() => {
        // conditions:
        if (latePathName === newPathName) return; // already the same => ignore
        
        
        
        // actions:
        setLatePathName(newPathName); // force to re-render when the url is completely changed
    }, [newPathName, latePathName]); // sync newPathName <==> latePathName
    
    
    
    // jsx:
    return useMemo(() =>
        <LinkOrigin
            // other props:
            {...props}
            
            
            
            // refs:
            ref={ref}
        />
    , [latePathName]); // only re-render when the `latePathName` changes -- ignore the `newPathName` changes
});
export {
    Link,
    Link as default,
}
