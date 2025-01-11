// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// styles:
import {
    useInputStyleSheet,
}                           from './styles/loader.js'

// reusable-ui core:
import {
    // a collection of TypeScript type utilities, assertions, and validations for ensuring type safety in reusable UI components:
    type NoForeignProps,
    
    
    
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    usePropReadOnly,
    
    
    
    // a possibility of UI having an invalid state:
    type ValidityChangeEvent,
    type ValidationDeps,
    type ValidationEventHandler,
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
export type InputHTMLAttributes<TElement> = Omit<React.InputHTMLAttributes<TElement>, 'size'|'src'|'alt'|'width'|'height'|'crossOrigin'|'checked'|'multiple'|'accept'|'capture'|'formAction'|'formEncType'|'formMethod'|'formNoValidate'|'formTarget'|keyof Omit<React.HTMLAttributes<TElement>, 'placeholder'|'autoCapitalize'>>

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
    // formats:
    type                 ?: InputType // partially implemented <input>'s props because <EditableTextControl> is a base text control component
    autoCapitalize       ?: 'off'|'none'|'on'|'sentences'|'words'|'characters'|(string & {}) // redefine the possible values of `autoCapitalize`
    
    
    
    // components:
    nativeInputComponent ?: React.ReactComponentElement<any, React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>
}
const Input         = <TElement extends Element = HTMLSpanElement>(props: InputProps<TElement>): JSX.Element|null => {
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
    // states:
    const [ariaInvalidComputed, setAriaInvalidComputed] = useState<boolean>(false);
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // accessibilities:
        'aria-invalid' : ariaInvalid = ariaInvalidComputed, // since the inner native <input> is visible, focusable and fully functional, the `aria-invalid` should be moved to the <input> itself
        autoFocus,
        tabIndex,
        enterKeyHint,
        
        
        
        // forms:
        name,
        form,
        
        
        
        // values:
        defaultValue : defaultUncontrollableValue,
        value        : controllableValue,
        onChange, // forwards to `input[type]`
        
        
        
        // validations:
        validationDeps : validationDepsOverwrite,
        onValidation,
        
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
        
        
        
        // components:
        nativeInputComponent = (<input /> as React.ReactComponentElement<any, React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>),
        
        
        
        // other props:
        ...restInputProps
    } = props;
    
    
    
    // styles:
    const styles = useInputStyleSheet();
    
    
    
    // refs:
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef` from `nativeInputComponent`:
        nativeInputComponent.props.ref,
        
        
        
        // preserves the original `elmRef` from `props`:
        elmRef,
    );
    
    
    
    // fn props:
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    
    
    
    // handlers:
    const handleChange = useMergeEvents(
        // preserves the original `onChange` from `nativeInputComponent`:
        nativeInputComponent.props.onChange,
        
        
        
        // preserves the original `onChange` from `props`:
        onChange,
        
        
        
        // dummy:
        handleChangeDummy, // just for satisfying React of controllable <input>
    );
    
    const handleValidationInternal = useEvent<ValidationEventHandler<ValidityChangeEvent>>((event) => {
        setAriaInvalidComputed(event.isValid === false);
    });
    const handleValidation = useEvent<ValidationEventHandler<ValidityChangeEvent>>(async (event) => {
        /* sequentially runs validators from `onValidation()` then followed by `handleValidationInternal()` */
        
        
        
        // preserves the original `onValidation` from `props`:
        // *props*Validator (if any) is the external supplement validator, so it should be the last validation check:
        await onValidation?.(event);
        
        
        
        // states:
        // `handleValidationInternal` reads the validation result, so it should be placed at the end:
        handleValidationInternal(event);
    });
    
    
    
    // default props:
    const {
        // semantics:
        tag       = 'span',
        
        
        
        // classes:
        mainClass = styles.main,
        
        
        
        // other props:
        ...restEditableTextControlProps
    } = restInputProps satisfies NoForeignProps<typeof restInputProps, EditableTextControlProps<TElement>>;
    
    const {
        // accessibilities:
        'aria-invalid'    : nativeInputAriaInvalid    = ariaInvalid,
        
        autoFocus         : nativeInputAutoFocus      = autoFocus,
        tabIndex          : nativeInputTabIndex       = tabIndex,
        enterKeyHint      : nativeInputEnterKeyHint   = enterKeyHint,
        
        disabled          : nativeInputDisabled       = !propEnabled, // do not submit the value if disabled
        readOnly          : nativeInputReadOnly       = propReadOnly, // locks the value & no validation if readOnly
        
        
        
        // forms:
        name              : nativeInputName           = name,
        form              : nativeInputForm           = form,
        
        
        
        // values:
        defaultValue      : nativeInputDefaultValue   = defaultUncontrollableValue,
        value             : nativeInputValue          = controllableValue,
        
        
        
        // validations:
        required          : nativeInputRequired       = required,
        
        minLength         : nativeInputMinLength      = minLength,
        maxLength         : nativeInputMaxLength      = maxLength,
        
        min               : nativeInputMin            = min,
        max               : nativeInputMax            = max,
        step              : nativeInputStep           = step,
        pattern           : nativeInputPattern        = pattern,
        
        
        
        // formats:
        type              : nativeInputType           = type,
        placeholder       : nativeInputPlaceholder    = placeholder,
        autoComplete      : nativeInputAutoComplete   = autoComplete,
        autoCapitalize    : nativeInputAutoCapitalize = autoCapitalize,
        list              : nativeInputList           = list,
        inputMode         : nativeInputInputMode      = inputMode,
        
        
        
        // other props:
        ...restNativeInputComponentProps
    } = nativeInputComponent.props;
    
    const appendValidationDeps = useEvent<ValidationDeps>((bases) => [
        ...bases,
        
        // validations:
        /*
            Since we use <EditableTextControl> as a wrapper,
            and we don't pass the `required`, `minLength`, `maxLength` props to the <EditableTextControl>,
            we need to re-apply those props here.
        */
        nativeInputRequired,
        nativeInputMinLength,
        nativeInputMaxLength,
        
        nativeInputMin,
        nativeInputMax,
        nativeInputStep,
        nativeInputPattern,
        
        // formats:
        nativeInputType,
    ]);
    const mergedValidationDeps = useEvent<ValidationDeps>((bases) => {
        const basesStage2 = appendValidationDeps(bases);
        const basesStage3 = validationDepsOverwrite ? validationDepsOverwrite(basesStage2) : basesStage2;
        
        return basesStage3;
    });
    
    
    
    // jsx:
    return (
        <EditableTextControl<TElement>
            // other props:
            {...restEditableTextControlProps}
            
            
            
            // semantics:
            tag={tag}
            aria-invalid={false}
            
            
            
            // classes:
            mainClass={mainClass}
            
            
            
            // accessibilities:
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus-visible-within` (pseudo) => the wrapper is also `.focus` (synthetic)
            
            
            
            // validations:
            validationDeps={mergedValidationDeps}
            onValidation={handleValidation}
        >
            {/* <input> */}
            {React.cloneElement<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>(nativeInputComponent,
                // props:
                {
                    // other props:
                    ...restNativeInputComponentProps,
                    
                    
                    
                    // refs:
                    ref               : mergedInputRef,
                    
                    
                    
                    // accessibilities:
                    'aria-invalid'    : nativeInputAriaInvalid,
                    
                    autoFocus         : nativeInputAutoFocus,
                    tabIndex          : nativeInputTabIndex,
                    enterKeyHint      : nativeInputEnterKeyHint,
                    
                    disabled          : nativeInputDisabled,
                    readOnly          : nativeInputReadOnly,
                    
                    
                    
                    // forms:
                    name              : nativeInputName,
                    form              : nativeInputForm,
                    
                    
                    
                    // values:
                    defaultValue      : nativeInputDefaultValue,
                    value             : nativeInputValue,
                    onChange          : handleChange,
                    
                    
                    
                    // validations:
                    required          : nativeInputRequired,
                    
                    minLength         : nativeInputMinLength,
                    maxLength         : nativeInputMaxLength,
                    
                    min               : nativeInputMin,
                    max               : nativeInputMax,
                    step              : nativeInputStep,
                    pattern           : nativeInputPattern,
                    
                    
                    
                    // formats:
                    type              : nativeInputType,
                    placeholder       : nativeInputPlaceholder,
                    autoComplete      : nativeInputAutoComplete,
                    autoCapitalize    : nativeInputAutoCapitalize,
                    list              : nativeInputList,
                    inputMode         : nativeInputInputMode,
                },
            )}
        </EditableTextControl>
    );
};
export {
    Input,            // named export for readibility
    Input as default, // default export to support React.lazy
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
