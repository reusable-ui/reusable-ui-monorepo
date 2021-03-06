// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui states:
import type {
    // type:
    ExpandedChangeEvent,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // types:
    BadgeStyle,
    
    
    
    // styles:
    usesBadgeLayout,
    usesBadgeVariants,
    usesBadgeStates,
    
    
    
    // react components:
    BadgeProps,
    Badge,
}                           from '@reusable-ui/badge'           // a base component
import {
    // hooks:
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
export const usesBusyLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBadgeLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(busies), // apply config's cssProps
        }),
    });
};
export const usesBusyVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(busies);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBadgeVariants(),
            resizableRule,
        ]),
    });
};
export const usesBusyStates = () => {
    return style({
        ...imports([
            // states:
            usesBadgeStates(),
        ]),
    });
};

export const useBusyStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBusyLayout(),
        
        // variants:
        usesBusyVariants(),
        
        // states:
        usesBusyStates(),
    ]),
}), { id: 'y6oksyrdiq' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [busies, busyValues, cssBusyConfig] = cssConfig(() => {
    const basics = {
        // typos:
        fontSize   : '1em'                                          as CssKnownProps['fontSize'],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // typos:
        fontSizeSm : [['calc(', basics.fontSize, '/', 1.25, ')']]   as CssKnownProps['fontSize'],
        fontSizeLg : [['calc(', basics.fontSize, '*', 1.25, ')']]   as CssKnownProps['fontSize'],
    };
}, { prefix: 'busy' });



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
    let {
        // accessibilities:
        label,
        
        
        
        // components:
        icon = 'busy',
        iconComponent = (<Icon<Element> icon={icon} /> as React.ReactComponentElement<any, IconProps<Element>>),
        
        
        
        // children:
        children,
    ...restBadgeProps} = props;
    
    
    
    // if no [label] and [children] are text-able => move them from [children] to [label]
    if (!label && children) {
        const childrenArr = React.Children.toArray(children);
        if (childrenArr.length && childrenArr.every((child) => (typeof(child) === 'string') || (typeof(child) === 'number'))) {
            label    = childrenArr.join(''); // move in
            children = undefined;            // move out
        } // if
    } // if
    
    
    
    // jsx:
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
            label={label ?? 'Loading...'}
        >
            {/* <Icon> */}
            {React.cloneElement<IconProps<Element>>(iconComponent,
                // props:
                {
                    // appearances:
                    icon: iconComponent.props.icon  ?? icon,
                    
                    
                    
                    // variants:
                    size : iconComponent.props.size ?? _defaultIconSize,
                },
            )}
            
            { children && <VisuallyHidden>
                { children }
            </VisuallyHidden> }
        </Badge>
    );
};
export {
    Busy,
    Busy as default,
}

export type { BadgeStyle }
