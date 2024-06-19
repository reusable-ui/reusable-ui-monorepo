// react:
import {
    // react:
    default as React,
}                           from 'react'

// styles:
import {
    useInputStyleSheet,
}                           from './styles/loader.js'

// reusable-ui core:
import {
    // react helper hooks:
    useMergeEvents,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    EditableTextControlProps,
    EditableTextControl,
}                           from '@reusable-ui/editable-text-control'   // a base component

// internals:
import {
    // react components:
    InputWithAutoCapitalize,
}                           from './InputWithAutoCapitalize.js'



// handlers:
const handleChangeDummy : React.ChangeEventHandler<HTMLInputElement> = (_event) => {
    /* nothing to do */
};



// react components:

export type InputTextLike                 = 'text'|'search'|'password'|'email'|'tel'|'url'|'number'|'time'|'week'|'date'|'datetime-local'|'month'
export type InputType                     = InputTextLike | 'color'|'file'|'range'

/**
 * Removed support for `<input type="image">` and `<input type="submit">`
 */
export type InputHTMLAttributes<TElement> = Omit<React.InputHTMLAttributes<TElement>, 'size'|'src'|'alt'|'width'|'height'|'crossOrigin'|'checked'|'multiple'|'accept'|'capture'|'formAction'|'formEncType'|'formMethod'|'formNoValidate'|'formTarget'|keyof React.HTMLAttributes<TElement>>

export interface InputProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        Omit<EditableTextControlProps<TElement>,
            // refs:
            |'elmRef'                // moved to <input>
            
            // values:
            |'onChange'              // moved to <input>
            
            // children:
            |'children'              // no nested children
        >,
        Pick<EditableTextControlProps<HTMLInputElement>,
            // refs:
            |'elmRef'                // moved here
            
            // values:
            |'onChange'              // moved here
        >,
        
        // input[type="***"]:
        Omit<InputHTMLAttributes<TElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // layouts:
            |'size'                  // we use css way to resize
            
            // accessibilities:
            |'disabled'              // we use [enabled] instead of [disabled]
            
            // values:
            |'defaultValue'|'value'  // supports numeric and string value
        >,
        Pick<React.HTMLAttributes<TElement>, 'inputMode'>
{
    // validations:
    min            ?: number|string
    max            ?: number|string
    step           ?: number|string
    pattern        ?: string
    
    
    
    // formats:
    type           ?: InputType
    placeholder    ?: string
    autoComplete   ?: string
    autoCapitalize ?: 'off'|'none'|'on'|'sentences'|'words'|'characters'|(string & {})
    list           ?: string
}
const Input = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>): JSX.Element|null => {
    // jsx:
    const inputInternal = <InputInternal<TElement> {...props} />;
    if (
        props.autoCapitalize
        &&
        !['off', 'none'].includes(props.autoCapitalize ?? 'off')
        &&
        ['text', 'search', /*'password', 'email', 'url'*/].includes(props.type ?? 'text')
    ) {
        // props:
        const inputInternalProps = inputInternal.props;
        
        
        
        // jsx:
        return (
            <InputWithAutoCapitalize
                // other props:
                {...inputInternalProps} // steals all inputInternal's props, so the <Owner> can recognize the <InputWithAutoCapitalize> as <TheirChild>
                
                
                
                // components:
                inputComponent={
                    // clone inputInternal element with (almost) blank props:
                    <inputInternal.type
                        // identifiers:
                        key={inputInternal.key}
                        
                        
                        
                        //#region restore conflicting props
                        {...{
                            ...(('inputComponent' in inputInternalProps) ? { inputComponent : inputInternalProps.inputComponent } : undefined),
                        }}
                        //#endregion restore conflicting props
                    />
                }
            />
        );
    } // if
    return inputInternal;
};
const InputInternal = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>): JSX.Element|null => {
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
        autoCapitalize,
        list,
        inputMode,
    ...restEditableTextControlProps}  = props;
    
    
    
    // fn props:
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    
    
    
    // handlers:
    const handleChange = useMergeEvents(
        // preserves the original `onChange`:
        onChange,
        
        
        
        // dummy:
        handleChangeDummy, // just for satisfying React of controllable <input>
    );
    
    
    
    // jsx:
    return (
        <EditableTextControl<TElement>
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
                    onChange : handleChange,
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
                    autoCapitalize,
                    list,
                    inputMode,
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
export const TextInput     = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='text'           {...props} />
export const SearchInput   = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='search'         {...props} />
export const PasswordInput = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='password'       {...props} />
export const EmailInput    = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='email'          {...props} />
export const TelInput      = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='tel'            {...props} />
export const UrlInput      = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='url'            {...props} />
export const NumberInput   = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='number'         {...props} />
export const TimeInput     = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='time'           {...props} />
export const WeekInput     = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='week'           {...props} />
export const DateInput     = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='date'           {...props} />
export const DateTimeInput = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='datetime-local' {...props} />
export const MonthInput    = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>) => <Input<TElement> type='month'          {...props} />

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



export interface InputComponentProps<TElement extends Element = HTMLSpanElement>
{
    // components:
    inputComponent ?: React.ReactComponentElement<any, InputProps<TElement>>
}
