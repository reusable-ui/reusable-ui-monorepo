// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // cssfn general types:
    Optional,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    ToggleCollapsibleProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component
import {
    // hooks:
    SizeName as IconSizeName,
    
    
    
    // react components:
    IconList,
    IconProps,
    Icon,
    
    IconComponentProps,
}                           from '@reusable-ui/icon'            // an icon component
import type {
    // react components:
    ControlProps,
    ControlComponentProps,
}                           from '@reusable-ui/control'         // a controllable component
import type {
    // hooks:
    SizeName as ButtonIconSizeName,
}                           from '@reusable-ui/button-icon'     // a button component with icon
import {
    // react components:
    CloseButton,
}                           from '@reusable-ui/close-button'    // a close button component



// defaults:
const _defaultIconSizes      : { [key: string]: IconSizeName } = {
    sm: 'md',
    md: 'lg',
    lg: 'xl',
};
const _defaultIconClasses    : Optional<string>[] = ['icon']

const _defaultControlSizes   : { [key: string]: ButtonIconSizeName } = {
    sm: 'xs',
    md: 'xs',
    lg: 'sm',
};
const _defaultControlClasses : Optional<string>[] = ['control']



// styles:
export const useAlertStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'a5qyy5nbby' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// utilities:
const getIconByTheme = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>({ theme }: AlertProps<TElement, TExpandedChangeEvent>): IconList => {
    switch (theme) {
        case 'success'   : return 'check_circle';
        case 'warning'   : return 'warning';
        case 'danger'    : return 'error';
     // case 'primary'   :
     // case 'secondary' :
     // case 'info'      :
     // case 'light'     :
     // case 'dark'      :
        default          : return 'info';
    } // switch
};



// react components:
export interface AlertProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        PopupProps<TElement, TExpandedChangeEvent>,
        
        // states:
        Pick<ToggleCollapsibleProps<TExpandedChangeEvent>,
            |'onExpandedChange' // implements `onExpandedChange` (implements controllable only, uncontrollable is not implemented)
        >,
        
        // components:
        IconComponentProps<Element>,
        ControlComponentProps<Element>
{
}
const Alert = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: AlertProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet   = useAlertStyleSheet();
    
    
    
    // rest props:
    const {
        // variants:
        size = 'md',
        
        
        
        // states:
        onExpandedChange,
        
        
        
        // components:
        icon,
        iconComponent    = (<Icon<Element> icon={icon ?? getIconByTheme(props)} /> as React.ReactComponentElement<any,    IconProps<Element>>),
        controlComponent = (<CloseButton />                                        as React.ReactComponentElement<any, ControlProps<Element>>),
        
        
        
        // children:
        children,
    ...restPopupProps} = props;
    
    
    
    // handlers:
    const handleExpandedChange       = onExpandedChange;
    const handleControlClickInternal = useEvent<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        // <CloseButton> clicked => request to hide the <Alert>:
        handleExpandedChange?.({ expanded: false } as TExpandedChangeEvent);
        event.preventDefault(); // handled
    });
    const handleControlClick         = useMergeEvents(
        // preserves the original `onClick` from `controlComponent`:
        controlComponent.props.onClick,
        
        
        
        // actions:
        handleControlClickInternal,
    );
    
    
    
    // jsx:
    return (
        <Popup<TElement, TExpandedChangeEvent>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? ''     } // no corresponding semantic tag => defaults to <div>
            semanticRole = {props.semanticRole ?? 'alert'} // uses [role="alert"] as the default semantic role
            
            
            
            // variants:
            size={size}
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            {/* <Icon> */}
            {React.cloneElement<IconProps<Element>>(iconComponent,
                // props:
                {
                    // variants:
                    size    : iconComponent.props.size    ?? _defaultIconSizes[size],
                    
                    
                    
                    // classes:
                    classes : iconComponent.props.classes ?? _defaultIconClasses,
                },
            )}
            
            { children && <div className='body'>
                { children }
            </div> }
            
            {/* <Control> */}
            {React.cloneElement<ControlProps<Element>>(controlComponent,
                // props:
                {
                    // variants:
                    size    : controlComponent.props.size    ?? (_defaultControlSizes[size] as ControlProps<Element>['size']),
                    
                    
                    
                    // classes:
                    classes : controlComponent.props.classes ?? _defaultControlClasses,
                    
                    
                    
                    // handlers:
                    onClick : handleControlClick,
                },
            )}
        </Popup>
    );
};
export {
    Alert,
    Alert as default,
}
