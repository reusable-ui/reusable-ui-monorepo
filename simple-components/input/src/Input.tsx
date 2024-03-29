// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                          // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook

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



// styles:
export const useInputStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : 'b75oz4h9pp',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



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



export interface InputComponentProps<TElement extends Element = HTMLSpanElement>
{
    // components:
    inputComponent ?: React.ReactComponentElement<any, InputProps<TElement>>
}
