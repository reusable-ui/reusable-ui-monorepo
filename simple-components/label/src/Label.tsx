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
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import {
    // variants:
    LabelVariant,
    useLabelVariant,
}                           from './variants/LabelVariant.js'



// styles:
export const useLabelStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'si01upz9vr' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface LabelProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // span:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // label:
        Omit<React.LabelHTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        LabelVariant
{
    // children:
    children ?: React.ReactNode
}
const Label = <TElement extends Element = HTMLSpanElement>(props: LabelProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet   = useLabelStyleSheet();
    
    
    
    // variants:
    const labelVariant = useLabelVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        labelStyle : _labelStyle, // remove
    ...restBasicProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        labelVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // semantics:
            tag={props.tag ?? (props.htmlFor ? 'label' : 'span')}
            
            
            
            // variants:
            theme={props.theme ?? 'secondary'}
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        />
    );
};
export {
    Label,
    Label as default,
}
