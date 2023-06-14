// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useMergeRefs,
    useIsRtl,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    Icon,
}                           from '@reusable-ui/icon'            // an icon component

// internals:
import {
    // react components:
    NavActionItemProps,
    NavActionItem,
}                           from './NavActionItem.js'



// react components:
export const NavNextItem = <TElement extends Element = HTMLElement>(props: NavActionItemProps<TElement>): JSX.Element|null => {
    // cultures:
    const [isRtl, setButtonElmRef] = useIsRtl<TElement>();
    
    
    
    // refs:
    const mergedElmRef = useMergeRefs<TElement>(
        // preserves the original `elmRef`:
        props.elmRef,
        
        
        
        setButtonElmRef,
    );
    
    
    
    // jsx:
    return (
        <NavActionItem<TElement>
            // other props:
            {...props}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
            // accessibilities:
            label={props.label ?? 'Next'}
        >
            {
                props.children
                ??
                <Icon
                    // appearances:
                    icon={isRtl ? 'navleft' : 'navright'}
                    
                    
                    
                    // variants:
                    size='1em'
                />
            }
        </NavActionItem>
    );
};
