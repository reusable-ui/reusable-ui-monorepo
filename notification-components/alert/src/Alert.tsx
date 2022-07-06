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
    // rules:
    rule,
    variants,
    ifEmpty,
    
    
    
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
    // styles:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
}                           from '@reusable-ui/layouts'         // reusable common layouts
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usesSizeVariant,
    ifNotNude,
    usesBorder,
    usesPadding,
    extendsPadding,
}                           from '@reusable-ui/basic'           // a base component
import {
    // types:
    ToggleActiveProps,
}                           from '@reusable-ui/indicator'       // a base component
export {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
}                           from '@reusable-ui/popup'           // a base component
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
    usesContentChildren,
    
    
    
    // configs:
    contents,
}                           from '@reusable-ui/content'         // a base component
import {
    // types:
    SizeName as IconSizeName,
    
    
    
    // react components:
    IconList,
    IconProps,
    Icon,
    
    IconComponentProps,
}                           from '@reusable-ui/icon'            // an icon set



// defaults:
const _defaultIconSize    : IconSizeName       = 'md';
const _defaultIconClasses : Optional<string>[] = ['icon'];



// styles:
const iconElm    = ':where(.icon)';    // zero specificity
const bodyElm    = ':where(.body)';    // zero specificity
const controlElm = ':where(.control)'; // zero specificity



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
const getIconByTheme = <TElement extends Element = HTMLElement>({ theme }: AlertProps<TElement>): IconList => {
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
export interface AlertProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        PopupProps<TElement>,
        
        // accessibilities:
        Pick<ToggleActiveProps, 'onActiveChange'>,
        
        // components:
        IconComponentProps
{
}
const Alert = <TElement extends Element = HTMLElement>(props: AlertProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet   = useAlertStyleSheet();
    
    
    
    // rest props:
    const {
        // appearances:
        alertStyle : _alertStyle,
        
        
        
        // accessibilities:
        active,
        label,
        
        
        
        // components:
        icon,
        iconComponent = (
            <Icon<Element>
                // appearances:
                icon={icon ?? getIconByTheme(props)}
                
                
                
                // classes:
                classes={_defaultIconClasses} // inject icon classes
            />
        ),
        
        
        
        // children:
        children,
    ...restPopupProps} = props;
    
    
    
    // fn props:
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const autoActive : boolean = !!(props.children || false);
    const activeFn   : boolean = active /*controllable*/ ?? autoActive /*uncontrollable*/;
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            semanticRole={props.semanticRole ?? 'status'}
            
            aria-label={props['aria-label'] ?? label}
            
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            active={activeFn}
        >
            {/* <Icon> */}
            {React.cloneElement<IconProps<Element>>(iconComponent,
                // props:
                {
                    // variants:
                    size    : (iconComponent.props as any).size ?? _defaultIconSize,
                    
                    
                    
                    // classes:
                    classes : (iconComponent.props as any).classes ?? _defaultIconClasses,
                }
            )}
            
            { props.children }
        </Popup>
    );
};
export {
    Alert,
    Alert as default,
}
