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
    // react helper hooks:
    useMergeClasses,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component

// internals:
import {
    // variants:
    BadgeVariant,
    useBadgeVariant,
}                           from './variants/BadgeVariant.js'



// styles:
export const useBadgeStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'a7wkthow0k' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface BadgeProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        PopupProps<TElement, TExpandedChangeEvent>,
        
        // variants:
        BadgeVariant
{
    // accessibilities:
    label ?: string
}
const Badge = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: BadgeProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet   = useBadgeStyleSheet();
    
    
    
    // variants:
    const badgeVariant = useBadgeVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        badgeStyle : _badgeStyle, // remove
        
        
        
        // accessibilities:
        label,
        
        
        
        // states:
        expanded,
        
        
        
        // children:
        children,
    ...restPopupProps} = props;
    
    
    
    // fn props:
    /*
     * state is expand/collapse based on [controllable expanded] (if set) and fallback to [uncontrollable expanded]
     */
    const autoExpanded : boolean = !!(props.children || false);
    const expandedFn   : boolean = expanded /*controllable*/ ?? autoExpanded /*uncontrollable*/;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        badgeVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Popup<TElement, TExpandedChangeEvent>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            aria-label={props['aria-label'] ?? label}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // states:
            expanded={expandedFn}
        >
            { props.children }
        </Popup>
    );
};
export {
    Badge,
    Badge as default,
}
