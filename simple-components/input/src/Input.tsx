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
    fallbacks,
    
    
    
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
    // styles:
    stripoutTextbox,
}                           from '@reusable-ui/stripouts'               // removes browser's default stylesheet
import {
    // hooks:
    usesSizeVariant,
    usesGradientVariant,
    usesBorder,
    extendsBorder,
    usesPadding,
    extendsPadding,
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
export const inputElm = ':first-child';

export const usesInputLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableTextControlLayout(),
        ]),
        ...style({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // flow to the document's writing flow
            justifyContent : 'start',  // if input is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the input's first letter should be visible first
            alignItems     : 'center', // default center items vertically (especially for the validation icon indicator)
            flexWrap       : 'nowrap', // prevents the input & icon to wrap to the next row
            
            
            
            // positions:
            verticalAlign  : 'baseline', // input's text should be aligned with sibling text, so the input behave like <span> wrapper
            
            
            
            // children:
            ...children(inputElm, {
                ...imports([
                    stripoutTextbox(), // clear browser's default styles
                ]),
                ...style({
                    // layouts:
                    display        : 'block', // fills the entire parent's width
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    alignSelf      : 'stretch',        // follows parent's height
                    // strip out the *weird input's prop [size]* so it can follow flex behavior:
                    // span to maximum width including parent's paddings:
                    boxSizing      : 'border-box', // the final size is including borders & paddings
                    inlineSize     : 'fill-available',
                    ...fallbacks({
                        inlineSize : `calc(100% + (${paddings.paddingInline} * 2))`,
                    }),
                    
                    
                    
                    // borders:
                    // affects for :autofill
                    
                    // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                    ...extendsBorder(),
                    
                    
                    
                    // spacings:
                    // cancel-out parent's padding with negative margin:
                    marginInline   : `calc(0px - ${paddings.paddingInline})`,
                    marginBlock    : `calc(0px - ${paddings.paddingBlock })`,
                    
                    // copy parent's paddings:
                    paddingInline  : paddings.paddingInline,
                    paddingBlock   : paddings.paddingBlock,
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
    
    // colors:
    const [gradientRule, gradients] = usesGradientVariant((toggle) => style({
        ...vars({
            // *toggle on/off* the background gradient prop:
            [gradients.backgGradTg] : toggle ? inputs.backgGrad : ((toggle !== null) ? 'initial' : null), // `null` => delete existing prop (if any), `undefined` => preserves existing prop (if any)
        }),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableTextControlVariants(),
            
            // layouts:
            sizesRule,
            
            // colors:
            gradientRule,
        ]),
    });
};
export const usesInputStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableTextControlStates(),
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
        // backgrounds:
        backgGrad : [
            ['linear-gradient(180deg, rgba(0,0,0, 0.2), rgba(255,255,255, 0.2))', 'border-box'],
        ] as CssKnownProps['backgroundImage'],
    };
}, { prefix: 'inp' });



// react components:

export type InputTextLike                 = 'text'|'search'|'password'|'email'|'tel'|'url'|'number'|'time'|'week'|'date'|'datetime-local'|'month'
export type InputType                     = InputTextLike | 'color'|'file'|'range'
export type InputHTMLAttributes<TElement> = Omit<React.InputHTMLAttributes<TElement>, 'size'|'src'|'alt'|'width'|'height'|'crossOrigin'|'checked'|'multiple'|'accept'|'capture'|'formAction'|'formEncType'|'formMethod'|'formNoValidate'|'formTarget'|keyof React.HTMLAttributes<TElement>>

export interface InputProps
    extends
        // bases:
        EditableTextControlProps<HTMLInputElement>,
        
        // input:
        Omit<InputHTMLAttributes<HTMLInputElement>, 'role'|'size'>
{
    // validations:
    min          ?: string | number
    max          ?: string | number
    step         ?: string | number
    pattern      ?: string
    
    
    
    // formats:
    type         ?: InputType
    placeholder  ?: string
    autoComplete ?: string
    list         ?: string
}
const Input = (props: InputProps): JSX.Element|null => {
    // styles:
    const styleSheet = useInputStyleSheet();
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        
        // accessibilities:
        autoFocus,
        tabIndex,
        enterKeyHint,
        
        
        
        // values:
        name,
        form,
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        
        
        // validations:
        required,
        
        minLength,
        maxLength,
        
        min,
        max,
        step,
        pattern,
        
        
        
        // formats:
        type,
        placeholder,
        autoComplete,
        list,
    ...restProps}  = props;
    
    
    
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
