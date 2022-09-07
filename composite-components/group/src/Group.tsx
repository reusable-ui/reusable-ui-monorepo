// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // utilities:
    isReusableUiComponent,
}                           from '@reusable-ui/utilities'       // common utility functions
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    defaultInlineOrientationableOptions,
    usesOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    useBasicVariantProps,
}                           from '@reusable-ui/basic-variants'  // basic variants of UI

// reusable-ui components:
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // styles:
    usesListItemBaseLayout,
    
    ListBasicStyle,
    ListVariant,
    
    
    
    // react components:
    ListProps,
    List,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
export const defaultOrientationableOptions = defaultInlineOrientationableOptions;



// styles:
export const usesGroupItemLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    options = orientationableStuff;
    
    
    
    return style({
        ...imports([
            // layouts:
            usesListItemBaseLayout(options),
        ]),
        ...style({
            // no layout modification needed.
            // the layout is belong to the <Button>/<Radio>/<Check> itself.
            
            
            
            // sizes:
            // just a few tweak:
            flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesCssProps(groups), // apply config's cssProps
        }),
    });
};
export const usesGroupItemVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(groups);
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
        ]),
    });
};

export const useGroupItemStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesGroupItemLayout(),
        
        // variants:
        usesGroupItemVariants(),
    ]),
}), { specificityWeight: 2, id: 'd2scsx4yqe' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [groups, groupValues, cssGroupConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'grp' });



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
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
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
                if (!React.isValidElement(child)) return child;
                
                
                
                // rest props:
                const childProps = {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...child.props,
                };
                const {
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
