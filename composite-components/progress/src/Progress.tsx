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



// styles:
export const usesProgressLayout = () => {
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
            verticalAlign  : 'baseline',     // <Progress>'s text should be aligned with sibling text, so the <Progress> behave like <span> wrapper
            
            
            
            // typos:
            textAlign      : 'start',        // flow to the document's writing flow
            
            
            
            // customize:
            ...usesCssProps(progresses),     // apply config's cssProps
        }),
    });
};
export const usesProgressVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(progresses);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            resizableRule,
        ]),
    });
};

export const useProgressStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesProgressLayout(),
        
        // variants:
        usesProgressVariants(),
    ]),
}), { id: 'si01upz9vr' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export type ProgressStyle = 'content' // might be added more styles in the future
export interface ProgressVariant {
    progressStyle ?: ProgressStyle
}
export const useProgressVariant = (props: ProgressVariant) => {
    return {
        class: props.progressStyle ?? null,
    };
};



// configs:
export const [progresses, progressValues, cssProgressConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'lb' });



// react components:
export interface ProgressProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // variants:
        ProgressVariant
{
    // children:
    children ?: React.ReactNode
}
const Progress = <TElement extends Element = HTMLSpanElement>(props: ProgressProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet      = useProgressStyleSheet();
    
    
    
    // variants:
    const progressVariant = useProgressVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        progressStyle : _progressStyle, // remove
    ...restBasicProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        progressVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // semantics:
            
            
            
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
    Progress,
    Progress as default,
}
