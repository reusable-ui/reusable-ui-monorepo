// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Optional,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    children,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a spacer (gap) management system:
    spacers,
    
    
    
    // react helper hooks:
    useEvent,
    useMergeEvents,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    ToggleCollapsibleProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
}                           from '@reusable-ui/content'         // a base component
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
const _defaultIconSizes : { [key: string]: IconSizeName } = {
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



// configs:
export const [alerts, alertValues, cssAlertConfig] = cssConfig(() => {
    return {
        // spacings:
        gapInline   : spacers.md    as CssKnownProps['gapInline'],
        gapBlock    : spacers.md    as CssKnownProps['gapBlock' ],
        gapInlineSm : spacers.sm    as CssKnownProps['gapInline'],
        gapBlockSm  : spacers.sm    as CssKnownProps['gapBlock' ],
        gapInlineLg : spacers.lg    as CssKnownProps['gapInline'],
        gapBlockLg  : spacers.lg    as CssKnownProps['gapBlock' ],
    };
}, { prefix: 'alrt' });



// styles:
const iconElm    = '.icon'         // one degree specificity to overwrite <Icon> component
const bodyElm    = ':where(.body)' // zero degree specificity to be easily overwritten
const controlElm = '.control'      // one degree specificity to overwrite <Control> component



export const usesAlertLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
            usesContentLayout(),
        ]),
        ...style({
            // layouts:
            display             : 'grid',        // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            /*
                just one explicit area: `body`
                `icon` & `control` rely on implicit area
            */
            gridTemplateRows    : [['auto'/*fluid height*/]],
            gridTemplateColumns : [['auto'/*fluid width*/ ]],
            gridTemplateAreas   : [[
                '"body"',
            ]],
            
            // implicit areas:
            gridAutoFlow        : 'column',      // if child's gridArea was not specified => place it automatically at horz direction
            gridAutoRows        : 'min-content', // other areas than `body` should take the minimum required height
            gridAutoColumns     : 'min-content', // other areas than `body` should take the minimum required width
            // the gridArea's size configured as *minimum* content's size required => no free space left to distribute => so (justify|algin)Content is *not required*
            
            // child default sizes:
            justifyItems        : 'stretch',     // each section fills the entire area's width
            alignItems          : 'stretch',     // each section fills the entire area's height
            
            
            
            // children:
            ...children(iconElm, {
                // layouts:
                gridArea    : '1 / -3', // the first row / the third column starting from the last
                
                
                
                // sizes:
                justifySelf : 'center', // align horizontally to center
                alignSelf   : 'start',  // align vertically   to top
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(alerts, 'icon')), // apply config's cssProps starting with icon***
            }),
            ...children(bodyElm, {
                // layouts:
                gridArea : 'body',
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(alerts, 'body')), // apply config's cssProps starting with body***
            }),
            ...children(controlElm, {
                // layouts:
                gridArea    : '1 / 2',  // the first row / the second column
                
                
                
                // sizes:
                justifySelf : 'center', // align horizontally to center
                alignSelf   : 'start',  // align vertically   to top
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(alerts, 'control')), // apply config's cssProps starting with control***
            }),
            
            
            
            // customize:
            ...usesCssProps(alerts), // apply config's cssProps
        }),
    });
};
export const usesAlertVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(alerts);
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            usesContentVariants(),
            resizableRule,
        ]),
    });
};
export const usesAlertStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useAlertStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesAlertLayout(),
        
        // variants:
        usesAlertVariants(),
        
        // states:
        usesAlertStates(),
    ]),
}), { id: 'a5qyy5nbby' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
            semanticRole={props.semanticRole ?? 'alert'}
            
            
            
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
