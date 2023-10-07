// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a set of React node utility functions:
    flattenChildren,
    isTruthyNode,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // variants:
    BadgeStyle,
    
    
    
    // react components:
    BadgeProps,
    Badge,
}                           from '@reusable-ui/badge'           // a base component
import {
    // variants:
    SizeName as IconSizeName,
    
    
    
    // react components:
    IconProps,
    Icon,
    
    IconComponentProps,
}                           from '@reusable-ui/icon'            // an icon component
import {
    // react components:
    VisuallyHidden,
}                           from '@reusable-ui/visually-hidden' // an accessibility utility



// defaults:
const _defaultIconSize : IconSizeName = '1em'



// styles:
export const useBusyStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'y6oksyrdiq' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface BusyProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        BadgeProps<TElement, TExpandedChangeEvent>,
        
        // components:
        IconComponentProps<Element>
{
}
const Busy = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: BusyProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet   = useBusyStyleSheet();
    
    
    
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // components:
        icon = 'busy',
        iconComponent = (<Icon<Element> icon={icon} /> as React.ReactComponentElement<any, IconProps<Element>>),
        
        
        
        // children:
        children,
    ...restBadgeProps} = props;
    
    
    
    // if necessary, geneate auto label from [children]:
    const autoLabel = useMemo<string|null>(() => {
        // conditions:
        if (label !== undefined)     return null; // the [label] is explicitly defined => no need to generate auto label
        if (!isTruthyNode(children)) return null; // the [children] is not defined     =>  unable to generate auto label
        
        
        
        // flatten the (nested) children to single deep children:
        const flattenedChildren = (
            flattenChildren(children)
            .filter(isTruthyNode) // only truthy children, so all elements represent valid nodes
        );
        
        
        
        // conditions:
        if (flattenedChildren.some((child) => (typeof(child) !== 'string') && (typeof(child) !== 'number'))) return null; // contains one/more non_stringable node(s) => unable to generate auto label
        
        
        
        // merge all stringable children to single string:
        return flattenedChildren.join('');
    }, [label, children]);
    
    
    
    // jsx:
    console.log({autoLabel});
    return (
        <Badge<TElement, TExpandedChangeEvent>
            // other props:
            {...restBadgeProps}
            
            
            
            // variants:
            nude={props.nude ?? true}
            outlined={props.outlined ?? true}
            badgeStyle={props.badgeStyle ?? 'circle'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            label={label ?? autoLabel ?? 'Loading...'}
        >
            {/* <Icon> */}
            {React.cloneElement<IconProps<Element>>(iconComponent,
                // props:
                {
                    // variants:
                    size : iconComponent.props.size ?? _defaultIconSize,
                },
            )}
            
            { (autoLabel === null) && !!children && <VisuallyHidden>
                {children}
            </VisuallyHidden> }
        </Badge>
    );
};
export {
    Busy,
    Busy as default,
}

export type { BadgeStyle }
