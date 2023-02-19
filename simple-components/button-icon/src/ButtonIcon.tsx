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
    useMergeRefs,
    
    
    
    // size options of UI:
    ResizableProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // semantics:
    ButtonType,
    
    
    
    // variants:
    ButtonStyle,
    ButtonVariant,
    
    
    
    // react components:
    ButtonProps,
    Button,
    
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a base component
import {
    // react components:
    IconProps,
    Icon,
    
    IconComponentProps,
}                           from '@reusable-ui/icon'            // an icon component

// internals:
import type {
    // variants:
    SizeName,
}                           from './variants/resizable.js'



// styles:
export const useButtonIconStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'x6fgydkqor' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:

export type IconPosition = 'start'|'end'
export interface ButtonIconComponentProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        Partial<IconComponentProps<TElement>>
{
    // positions:
    iconPosition ?: IconPosition
}

export interface ButtonIconProps
    extends
        // bases:
        Omit<ButtonProps,
            |'size' // we redefined `size` prop with more size options
        >,
        
        // variants:
        ResizableProps<SizeName>,
        
        // components:
        ButtonIconComponentProps<Element>,
        Omit<ButtonComponentProps,
            // we don't need these extra properties because the <ButtonIcon> is sub <Button>
            |'buttonRef'
            |'buttonOrientation'
            |'buttonStyle'
            |'buttonChildren'
        >
{
}
const ButtonIcon = (props: ButtonIconProps): JSX.Element|null => {
    // styles:
    const styleSheet = useButtonIconStyleSheet();
    
    
    
    // rest props:
    const {
        // variants:
        size,
        
        
        
        // components:
        icon,
        iconPosition    = 'start',
        iconComponent   = icon && (<Icon<Element> icon={icon} /> as React.ReactComponentElement<any, IconProps<Element>>),
        
        buttonComponent = (<Button /> as React.ReactComponentElement<any, ButtonProps>),
        
        
        
        // children:
        children,
    ...restButtonProps} = props;
    
    
    
    // refs:
    const mergedButtonRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `elmRef` from `props`:
        props.elmRef,
    );
    
    
    
    // jsx:
    /* <Button> */
    return React.cloneElement<ButtonProps>(buttonComponent,
        // props:
        {
            // other props:
            ...restButtonProps,
            ...buttonComponent.props, // overwrites restButtonProps (if any conflics)
            
            
            
            // refs:
            elmRef    : mergedButtonRef,
            
            
            
            // variants:
            size      : buttonComponent.props.size      ?? (size as ButtonProps['size']),
            
            
            
            // classes:
            mainClass : buttonComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
        },
        
        
        
        // children:
        buttonComponent.props.children ?? (
            /*<>
                { (iconPosition === 'start') && iconComponent }
                { children }
                { (iconPosition === 'end'  ) && iconComponent }
            </>*/
            
            // use an array instead of fragment, so the <Button> can see the existance of <Link> inside `children`:
            [
                ( (iconPosition === 'start') && iconComponent && React.cloneElement(iconComponent, { key: iconComponent.key ?? '.icon' }) ),
                ( children ),
                ( (iconPosition === 'end'  ) && iconComponent && React.cloneElement(iconComponent, { key: iconComponent.key ?? '.icon' }) ),
            ]
        ),
    );
};
export {
    ButtonIcon,
    ButtonIcon as default,
}

export type { ButtonStyle, ButtonVariant, ButtonType }
