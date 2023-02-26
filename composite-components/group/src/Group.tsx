// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a set of React node utility functions:
    isReusableUiComponent,
    
    
    
    // react helper hooks:
    useMergeClasses,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
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



// styles:
export const useGroupItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { specificityWeight: 2, id: 'd2scsx4yqe' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:

interface GroupItemProps
{
    // components:
    component : React.ReactElement
}
const GroupItem = (props: GroupItemProps): JSX.Element => {
    // rest props:
    const {
        // components:
        component,
    ...restComponentProps} = props;
    
    
    
    // styles:
    const styleSheet = useGroupItemStyleSheet();
    
    
    
    // verifies:
    const isReusableUiModalComponent : boolean = isReusableUiComponent<GenericProps<Element>>(component);
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes` from `component`:
        (
            isReusableUiModalComponent
            ?
            (component.props as GenericProps<Element>).classes
            :
            ((component.props as React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>).className ?? '').split(' ')
        ),
        
        
        
        // styles:
        styleSheet.main,
    );
    
    
    
    // jsx:
    return React.cloneElement(component,
        // props:
        {
            // other props:
            ...restComponentProps,
            
            
            
            // classes:
            ...(isReusableUiModalComponent ? {
                classes   : classes,
            } : {
                className : classes.filter((c) => !!c).join(' '),
            }),
        },
    );
};



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
