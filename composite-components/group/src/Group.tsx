// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// reusable-ui core:
import {
    // a set of React node utility functions:
    flattenChildren,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    BasicProps,
}                           from '@reusable-ui/basic'           // a base component
import {
    // variants:
    ListBasicStyle,
    ListVariant,
    
    
    
    // react components:
    ListProps,
    List,
}                           from '@reusable-ui/list'            // represents a series of content

// internals:
import {
    // react components:
    GroupItem,
}                           from './GroupItem.js'



// react components:
export interface GroupProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<ListProps<TElement>,
            // variants:
            |'listStyle'  // we downgraded the [listStyle] options
            
            // behaviors:
            |'actionCtrl' // no action list
        >
{
    // accessibilities:
    label     ?: string
    
    
    
    // variants:
    listStyle ?: ListBasicStyle
    
    
    
    // children:
    children  ?: React.ReactNode
}
const Group = <TElement extends Element = HTMLElement>(props: GroupProps<TElement>): JSX.Element|null => {
    // basic variant props:
    const size = props.size;
    
    
    
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // children:
        children,
    ...restListProps} = props;
    
    
    
    // children:
    const mutatedChildren = useMemo<React.ReactNode[]>(() =>
        flattenChildren(children)
        .map<React.ReactNode>((child, index) => {
            // conditions:
            if (!React.isValidElement<BasicProps>(child)) return child; // not an <Element> => place it anyway
            
            
            
            // props:
            const childProps = {
                // other props:
                ...child.props,
                
                
                
                // variants:
                size : child.props.size ?? size,
            };
            
            
            
            // jsx:
            return (
                /* wrap child with <GroupItem> */
                <GroupItem
                    // identifiers:
                    key={child.key ?? index}
                    
                    
                    
                    // other props:
                    {...childProps} // steals all child's props, so the <Owner> can recognize the <GroupItem> as <TheirChild>
                    
                    
                    
                    // components:
                    component={
                        // clone child element with (almost) blank props:
                        <child.type
                            // identifiers:
                            key={child.key}
                            
                            
                            
                            //#region restore conflicting props
                            {...{
                                ...(('component' in childProps) ? { component : childProps.component } : undefined),
                            }}
                            //#endregion restore conflicting props
                        />
                    }
                />
            );
        })
    , [children]);
    
    
    
    // jsx:
    return (
        <List<TElement>
            // other props:
            {...restListProps}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag   ?? ''     } // no corresponding semantic tag => defaults to <div>
            semanticRole = {props.semanticRole  ?? 'group'} // uses [role="group"] as the default semantic role
            aria-label   = {props['aria-label'] ?? label  }
            
            
            
            // variants:
            orientation={props.orientation ?? 'inline'}
            mild={props.mild ?? false}
        >
            {mutatedChildren}
        </List>
    );
};
export {
    Group,
    Group as default,
}

export type { ListBasicStyle, ListVariant }
