// react:
import {
    // react:
    default as React,
}                           from 'react'

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
    
    
    
    // jsx:
    return (
        <List<TElement>
            // other props:
            {...restListProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'group'}
            aria-label={props['aria-label'] ?? label}
            
            
            
            // variants:
            orientation={props.orientation ?? 'inline'}
            mild={props.mild ?? false}
        >
            {React.Children.map<React.ReactNode, React.ReactNode>(children, (child) => {
                // conditions:
                if (!React.isValidElement<BasicProps & { component: React.ReactElement }>(child)) return child;
                
                
                
                // rest props:
                const childProps = {
                    // other props:
                    ...child.props,
                    
                    
                    
                    // variants:
                    size : child.props.size ?? size,
                };
                const {
                    // components:
                    component : childComponent, // sanitize the child's [component] prop (if exist), so it wouldn't collide with <GroupItem>'s [component] prop
                ...restChildProps} = childProps;
                
                
                
                // jsx:
                return (
                    <GroupItem
                        // other props:
                        {...restChildProps} // steals (almost) all child's props, so the <List> can recognize the <GroupItem> as <ListItem>
                        
                        
                        
                        // components:
                        component={
                            // clone child element with (almost) blank props:
                            <child.type
                                // identifiers:
                                key={child.key}
                                
                                
                                
                                // components:
                                // restore the sanitized child's [component] prop (if exist):
                                {...(('component' in child.props) ? { component: childComponent } : null)}
                            />
                        }
                    />
                );
            })}
        </List>
    );
};
export {
    Group,
    Group as default,
}

export type { ListBasicStyle, ListVariant }
