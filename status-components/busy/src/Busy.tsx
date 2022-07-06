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

// reusable-ui:
import {
    // hooks:
    usesSizeVariant,
}                           from '@reusable-ui/basic'           // a base component
export {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    
    BadgeStyle,
}                           from '@reusable-ui/badge'           // a base component
import {
    // styles:
    usesBadgeLayout,
    usesBadgeVariants,
    usesBadgeStates,
    
    
    
    // react components:
    BadgeProps,
    Badge,
}                           from '@reusable-ui/badge'           // a base component
import {
    // types:
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
const _defaultIconSize : IconSizeName = 'md';



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
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(busies);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBadgeVariants(),
            
            // layouts:
            sizeVariantRule,
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
export interface BusyProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BadgeProps<TElement>,
        
        // components:
        IconComponentProps
{
}
const Busy = <TElement extends Element = HTMLElement>(props: BusyProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet   = useBusyStyleSheet();
    
    
    
    // rest props:
    let {
        // accessibilities:
        label,
        
        
        
        // components:
        icon = 'busy',
        iconComponent = <Icon<Element> icon={icon} />,
        
        
        
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
        <Badge<TElement>
            // other props:
            {...restBadgeProps}
            
            
            
            // appearances:
            nude={props.nude ?? true}
            outlined={props.outlined ?? true}
            
            
            
            // variants:
            badgeStyle={props.badgeStyle ?? 'circle'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            label={label ?? 'Loading...'}
        >
            {React.cloneElement<IconProps<Element>>(iconComponent,
                // props:
                {
                    // variants:
                    size: (iconComponent.props as any).size ?? _defaultIconSize,
                }
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
