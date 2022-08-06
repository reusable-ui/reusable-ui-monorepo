// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // rules:
    rule,
    variants,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    usesContentBasicLayout,
    usesContentBasicVariants,
}                           from '@reusable-ui/content'         // a neighbor component



// hooks:

// variants:

//#region label style
export type LabelStyle = 'content' // might be added more styles in the future
export interface LabelVariant {
    labelStyle ?: LabelStyle
}
export const useLabelVariant = (props: LabelVariant) => {
    return {
        class: props.labelStyle ?? null,
    };
};
//#endregion label style



// styles:
export const usesLabelLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // layouts:
            display        : 'inline-flex',  // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',          // items are stacked horizontally
            justifyContent : 'center',       // center items (text, icon, etc) horizontally
            alignItems     : 'center',       // center items (text, icon, etc) vertically
            flexWrap       : 'wrap',         // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline',     // <Label>'s text should be aligned with sibling text, so the <Label> behave like <span> wrapper
            
            
            
            // typos:
            textAlign      : 'start',        // flow to the document's writing flow
            
            
            
            // customize:
            ...usesCssProps(labels),         // apply config's cssProps
        }),
    });
};
export const usesLabelVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(labels);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            resizableRule,
        ]),
        ...variants([
            rule('.content', { // content
                ...imports([
                    // layouts:
                    usesContentBasicLayout(),
                    
                    // variants:
                    usesContentBasicVariants(),
                ]),
            }),
        ]),
    });
};

export const useLabelStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesLabelLayout(),
        
        // variants:
        usesLabelVariants(),
    ]),
}), { id: 'si01upz9vr' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [labels, labelValues, cssLabelConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'lb' });



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
