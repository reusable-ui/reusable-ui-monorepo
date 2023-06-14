// react:
import {
    // react:
    default as React,
}                           from 'react'

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
    // jsx:
    return (
        <NavActionItem<TElement>
            // other props:
            {...props}
            
            
            
            // accessibilities:
            label={props.label ?? 'Next'}
        >
            {
                props.children
                ??
                <Icon
                    // appearances:
                    icon='navright'
                    
                    
                    
                    // variants:
                    size='1em'
                />
            }
        </NavActionItem>
    );
};
