// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    fallbacks,
    children,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                          // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook

// reusable-ui core:
import {
    // removes browser's default stylesheet:
    stripoutTextbox,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    usePropReadOnly,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // gradient variant of UI:
    usesGradientable,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesEditableTextControlLayout,
    usesEditableTextControlVariants,
    usesEditableTextControlStates,
    
    
    
    // react components:
    EditableTextControlProps,
    EditableTextControl,
}                           from '@reusable-ui/editable-text-control'   // a base component



// configs:
export const [inputs, inputValues, cssInputConfig] = cssConfig(() => {
    return {
        // appearances:
        placeholderOpacity : 0.5    as CssKnownProps['opacity'],
        
        
        
        // backgrounds:
        backgGrad : [
            ['linear-gradient(180deg, rgba(0,0,0, 0.2), rgba(255,255,255, 0.2))', 'border-box'],
        ]                           as CssKnownProps['backgroundImage'],
    };
}, { prefix: 'inp' });



// styles:
export const inputElm = ':where(:first-child)' // zero degree specificity to be easily overwritten



export const usesInputLayout = () => {
    // dependencies:
    
    // features:
    const {borderRule, borderVars } = usesBorder({ borderWidth: '0px' });
    const {            paddingVars} = usesPadding();
    
    
    
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
                    // resets:
                    stripoutTextbox(), // clear browser's default styles
                    
                    // features:
                    borderRule,
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
                        inlineSize : `calc(100% + (${paddingVars.paddingInline} * 2))`,
                    }),
                    
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    alignSelf      : 'stretch',        // follows parent's height
                    
                    
                    
                    // borders:
                    // a fix for :autofill corners:
                    border                   : borderVars.border,
                 // borderRadius             : borderVars.borderRadius,
                    borderStartStartRadius   : borderVars.borderStartStartRadius,
                    borderStartEndRadius     : borderVars.borderStartEndRadius,
                    borderEndStartRadius     : borderVars.borderEndStartRadius,
                    borderEndEndRadius       : borderVars.borderEndEndRadius,
                    [borderVars.borderWidth] : '0px', // only setup borderRadius, no borderStroke
                    
                    
                    
                    // spacings:
                    // cancel-out parent's padding with negative margin:
                    marginInline   : `calc(0px - ${paddingVars.paddingInline})`,
                    marginBlock    : `calc(0px - ${paddingVars.paddingBlock })`,
                    
                    // copy parent's paddings:
                    paddingInline  : paddingVars.paddingInline,
                    paddingBlock   : paddingVars.paddingBlock,
                    
                    
                    
                    // children:
                    ...children('::placeholder', {
                        // foregrounds:
                        foreg : 'currentColor',
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(inputs, 'placeholder')), // apply config's cssProps starting with placeholder***
                    }),
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(inputs), // apply config's cssProps
        }),
    });
};
export const usesInputVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule   } = usesResizable(inputs);
    const {gradientableRule} = usesGradientable(inputs);
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableTextControlVariants(),
            resizableRule,
            gradientableRule,
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

export const useInputStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesInputLayout(),
        
        // variants:
        usesInputVariants(),
        
        // states:
        usesInputStates(),
    ]),
}), { id: 'b75oz4h9pp' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
        Omit<EditableTextControlProps<HTMLInputElement>,
            // children:
            |'children'              // no nested children
        >,
        
        // input[type="***"]:
        Omit<InputHTMLAttributes<HTMLInputElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // layouts:
            |'size'                  // we use css way to resize
            
            // accessibilities:
            |'disabled'              // we use [enabled] instead of [disabled]
            
            // values:
            |'defaultValue'|'value'  // supports numeric and string value
        >
{
    // validations:
    min          ?: number|string
    max          ?: number|string
    step         ?: number|string
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
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus-visible-within` (pseudo) => the wrapper is also `.focus` (synthetic)
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
