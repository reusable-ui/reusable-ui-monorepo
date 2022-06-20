// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    states,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    escapeSvg,
}                           from '@cssfn/cssfn'                         // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'                       // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui:
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    mildOf,
    usesPadding,
}                           from '@reusable-ui/basic'                   // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'               // a base component
import {
    // hooks:
    markActive as controlMarkActive,
    ifFocus,
    ifArrive,
}                           from '@reusable-ui/control'                 // a base component
import {
    // styles:
    usesEditableTextControlLayout,
    usesEditableTextControlVariants,
    usesEditableTextControlStates,
    
    
    
    // react components:
    EditableTextControlProps,
    EditableTextControl,
}                           from '@reusable-ui/editable-text-control'   // a base component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'                    // an icon set



// styles:
export const iconElm = '::after';

export const usesInputLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    // states:
    const [, valids  ] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableTextControlLayout(),
        ]),
        ...style({
            ...children(iconElm, {
                ...imports([
                    usesIconImage(
                        /*img   : */valids.iconImg,
                    ),
                ]),
                ...style({
                    // layouts:
                    content         : '""',
                    display         : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // positions:
                    position        : 'absolute',
                    insetInlineEnd  : paddings.paddingInline,
                    insetBlockStart : `calc(50% - (${inputs.iconSize} / 2))`,
                    maskPosition    : 'right', // align icon to the right
                    
                    
                    
                    // sizes:
                    boxSizing       : 'border-box', // the final size is including borders & paddings
                    blockSize       : inputs.iconSize,
                    aspectRatio     : '3 / 2', // make sure the icon's image ratio is 1.5 or less
                    
                    
                    
                    // accessibilities:
                    pointerEvents   : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(inputs, 'icon')), // apply config's cssProps starting with icon***
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(inputs), // apply config's cssProps
        }),
    });
};
export const usesInputVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(inputs);
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableTextControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesInputStates = () => {
    // dependencies:
    
    // states:
    const [validInvalidRule] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // states:
            usesEditableTextControlStates(),
            validInvalidRule,
        ]),
        ...states([
            ifActive({
                ...imports([
                    markActive(),
                ]),
            }),
            ifFocus({
                ...imports([
                    markActive(),
                ]),
            }),
            ifArrive({
                ...imports([
                    markActive(),
                ]),
            }),
            
            ifNoValidation({
                ...children(iconElm, {
                    display: 'none', // hides validation icon image
                }),
            }),
        ]),
    });
};

export const useInputStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesInputLayout(),
        
        // variants:
        usesInputVariants(),
        
        // states:
        usesInputStates(),
    ]),
}), { id: 'b75oz4h9pp' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [inputs, inputValues, cssInputConfig] = cssConfig(() => {
    return {
        // accessibilities:
        cursor      : 'text' as CssKnownProps['cursor'],
        
        
        
        // animations:
        iconSize    : '1em'  as CssKnownProps['inlineSize'],
        iconValid   : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>")}")`                        as CssKnownProps['maskImage'],
        iconInvalid : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M7.3,6.31,5,4,7.28,1.71a.7.7,0,1,0-1-1L4,3,1.71.72a.7.7,0,1,0-1,1L3,4,.7,6.31a.7.7,0,0,0,1,1L4,5,6.31,7.3A.7.7,0,0,0,7.3,6.31Z'/></svg>")}")` as CssKnownProps['maskImage'],
    };
}, { prefix: 'inp' });



// react components:
export type InputElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

export interface InputProps<TElement extends InputElement = InputElement>
    extends
        // bases:
        EditableTextControlProps<TElement>
{
    // validations:
    minLength ?: number
    maxLength ?: number
}
const Input = <TElement extends InputElement = InputElement>(props: InputProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useInputStyleSheet();
    
    
    
    // jsx:
    return (
        <EditableTextControl<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    Input,
    Input as default,
}
