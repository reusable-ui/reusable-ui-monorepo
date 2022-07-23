// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // types:
    Optional,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    //combinators:
    children,
    
    
    
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
    usesPrefixedProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system
import {
    // hooks:
    useEvent,
}                           from '@reusable-ui/hooks'           // react helper hooks
import type {
    // type:
    ExpandedChangeEvent,
    ToggleExpandableProps,
}                           from '@reusable-ui/expandables'     // a capability of UI to expand/reduce its size or toggle the visibility
import {
    // hooks:
    usesSizeVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
    
    
    
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
const _defaultIconSize       : IconSizeName       = 'md'
const _defaultIconClasses    : Optional<string>[] = ['icon']

const _defaultControlSize    : ButtonIconSizeName = 'xs'
const _defaultControlClasses : Optional<string>[] = ['control']



// styles:
const iconElm    = ':where(.icon)'    // zero specificity
const bodyElm    = ':where(.body)'    // zero specificity
const controlElm = ':where(.control)' // zero specificity



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
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(alerts);
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            usesContentVariants(),
            
            // layouts:
            sizeVariantRule,
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

export const useAlertStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesAlertLayout(),
        
        // variants:
        usesAlertVariants(),
        
        // states:
        usesAlertStates(),
    ]),
}), { id: 'a5qyy5nbby' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [alerts, alertValues, cssAlertConfig] = cssConfig(() => {
    return {
        // spacings:
        gapInline : spacers.default as CssKnownProps['gapInline'],
        gapBlock  : spacers.default as CssKnownProps['gapBlock' ],
    };
}, { prefix: 'alrt' });



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
        
        // accessibilities:
        Pick<ToggleExpandableProps<TExpandedChangeEvent>,
            |'onExpandedChange' // implements `onExpandedChange`
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
        // accessibilities:
        onExpandedChange,
        
        
        
        // components:
        icon,
        iconComponent    = (<Icon<Element> icon={icon ?? getIconByTheme(props)} /> as React.ReactComponentElement<any,    IconProps<Element>>),
        controlComponent = (<CloseButton />                                        as React.ReactComponentElement<any, ControlProps<Element>>),
        
        
        
        // children:
        children,
    ...restPopupProps} = props;
    
    
    
    // handlers:
    const handleExpandedChange      = onExpandedChange;
    const defaultHandleControlClick = useEvent<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        handleExpandedChange?.({ expanded: false } as TExpandedChangeEvent); // handle click as request to close <Alert>
        event.preventDefault(); // handled
    }, [handleExpandedChange]);
    
    
    
    // jsx:
    return (
        <Popup<TElement, TExpandedChangeEvent>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'alert'}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            {/* <Icon> */}
            {React.cloneElement<IconProps<Element>>(iconComponent,
                // props:
                {
                    // variants:
                    size    : iconComponent.props.size ?? _defaultIconSize,
                    
                    
                    
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
                    size    : controlComponent.props.size ?? _defaultControlSize,
                    
                    
                    
                    // classes:
                    classes : controlComponent.props.classes ?? _defaultControlClasses,
                    
                    
                    
                    // handlers:
                    onClick : controlComponent.props.onClick ?? defaultHandleControlClick,
                },
            )}
        </Popup>
    );
};
export {
    Alert,
    Alert as default,
}

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition, PopupSide }
