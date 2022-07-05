// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    fallbacks,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                         // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui:
import {
    // styles:
    stripoutTextbox,
}                           from '@reusable-ui/stripouts'               // removes browser's default stylesheet
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities'         // an accessibility management system
import {
    // hooks:
    usesSizeVariant,
    usesGradientVariant,
    extendsBorder,
    usesPadding,
}                           from '@reusable-ui/basic'                   // a base component
import {
    // styles:
    usesEditableTextControlLayout,
    usesEditableTextControlVariants,
    usesEditableTextControlStates,
    
    
    
    // react components:
    EditableTextControlProps,
    EditableTextControl,
}                           from '@reusable-ui/editable-text-control'   // a base component



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
            verticalAlign  : 'baseline', // <Input>'s text should be aligned with sibling text, so the <Input> behave like <span> wrapper
            
            
            
            // children:
            ...children(inputElm, {
                ...imports([
                    stripoutTextbox(), // clear browser's default styles
                ]),
                ...style({
                    // layouts:
                    display        : 'block', // fills the entire parent's width
                    
                    
                    
                    // sizes:
                    // strip out the *weird input's prop [size]* so it can follow flex behavior:
                    // span to maximum width including parent's paddings:
                    boxSizing      : 'border-box', // the final size is including borders & paddings
                    inlineSize     : 'fill-available',
                    ...fallbacks({
                        inlineSize : `calc(100% + (${paddings.paddingInline} * 2))`,
                    }),
                    
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    alignSelf      : 'stretch',        // follows parent's height
                    
                    
                    
                    // borders:
                    // affects for :autofill
                    
                    // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                    ...extendsBorder(),
                    ...style({
                        border     : 'none', // only setup borderRadius, no borderStroke
                    }),
                    
                    
                    
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
    const [sizeVariantRule] = usesSizeVariant(inputs);
    
    // colors:
    const [gradientVariantRule, gradients] = usesGradientVariant((toggle) => style({
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
            sizeVariantRule,
            
            // colors:
            gradientVariantRule,
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

/**
 * Removed support for `<input type="image">` and `<input type="submit">`
 */
export type InputHTMLAttributes<TElement> = Omit<React.InputHTMLAttributes<TElement>, 'size'|'src'|'alt'|'width'|'height'|'crossOrigin'|'checked'|'multiple'|'accept'|'capture'|'formAction'|'formEncType'|'formMethod'|'formNoValidate'|'formTarget'|keyof React.HTMLAttributes<TElement>>

export interface InputProps
    extends
        // bases:
        EditableTextControlProps<HTMLInputElement>,
        
        // input:
        Omit<InputHTMLAttributes<HTMLInputElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // layouts:
            |'size'                  // we use css way to resize
        >
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
        // refs:
        elmRef,
        
        
        
        // accessibilities:
        autoFocus,
        tabIndex,
        enterKeyHint,
        
        
        
        // forms:
        name,
        form,
        
        
        
        // values:
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
    ...restEditableTextControlProps}  = props;
    
    
    
    // fn props:
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    
    
    
    // jsx:
    return (
        <EditableTextControl<HTMLInputElement>
            // other props:
            {...restEditableTextControlProps}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus-within` (pseudo) => the wrapper is also `.focus` (synthetic)
            enabled={props.enabled ?? !(props.disabled ?? false)} // aliasing [disabled] => ![enabled]
        >
            <input
                // refs:
                ref={elmRef}
                
                
                
                // accessibilities:
                {...{
                    autoFocus,
                    tabIndex,
                    enterKeyHint,
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value & no validation if readOnly
                
                
                
                // forms:
                {...{
                    name,
                    form,
                }}
                
                
                
                // values:
                {...{
                    defaultValue,
                    value,
                    onChange,
                }}
                
                
                
                // validations:
                {...{
                    required,
                    
                    minLength,
                    maxLength,
                    
                    min,
                    max,
                    step,
                    pattern,
                }}
                
                
                
                // formats:
                {...{
                    type,
                    placeholder,
                    autoComplete,
                    list,
                }}
            />
        </EditableTextControl>
    );
};
export {
    Input,
    Input as default,
}



// shortcuts:
export const TextInput     = (props: InputProps) => <Input type='text'           {...props} />
export const SearchInput   = (props: InputProps) => <Input type='search'         {...props} />
export const PasswordInput = (props: InputProps) => <Input type='password'       {...props} />
export const EmailInput    = (props: InputProps) => <Input type='email'          {...props} />
export const TelInput      = (props: InputProps) => <Input type='tel'            {...props} />
export const UrlInput      = (props: InputProps) => <Input type='url'            {...props} />
export const NumberInput   = (props: InputProps) => <Input type='number'         {...props} />
export const TimeInput     = (props: InputProps) => <Input type='time'           {...props} />
export const WeekInput     = (props: InputProps) => <Input type='week'           {...props} />
export const DateInput     = (props: InputProps) => <Input type='date'           {...props} />
export const DateTimeInput = (props: InputProps) => <Input type='datetime-local' {...props} />
export const MonthInput    = (props: InputProps) => <Input type='month'          {...props} />

export {
    TextInput       as Text,
    SearchInput     as Search,
    PasswordInput   as Password,
    EmailInput      as Email,
    TelInput        as Tel,
    UrlInput        as Url,
    NumberInput     as Number,
    TimeInput       as Time,
    WeekInput       as Week,
    DateInput       as Date,
    DateTimeInput   as DateTime,
    MonthInput      as Month,
}
