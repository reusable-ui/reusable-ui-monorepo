export const getControllableValue = (props: any): string|readonly string[]|number|boolean|unknown|undefined => {
    /*
        Explanation:
        
        1. Check if `type` exists in `props`:
            * If `type` exists, it indicates a standard <input> element.
            * If the `type` is `checkbox` or `radio`, assign `.checked`.
            * Otherwise, assign `.value`.
        
        2. For other standard HTML elements:
            * Check if `value` exists in `props`.
            * If `value` exists, assign `.value`.
        
        3. For custom components:
            * always return `undefined` because there is no way to determine whether it's controllable or uncontrollable.
    */
    
    if (props.type !== undefined) {
        // For standard <input> elements:
        if ((props.type === 'checkbox') || (props.type === 'radio')) {
            // For <input type='checkbox'> and <input type='radio'>:
            return (props as React.InputHTMLAttributes<HTMLInputElement>).checked;
        }
        else {
            // For other standard <input> elements:
            return (props as React.InputHTMLAttributes<HTMLInputElement>).value;
        } // if
    }
    else if (props.value !== undefined) {
        // For <textarea>, <select>, <option>, and other standard HTML elements:
        return (props as React.InputHTMLAttributes<HTMLInputElement>).value;
    } // if
    
    
    
    // For custom controls, no way to determine whether it's controllable or uncontrollable.
    // The safest assumption is always uncontrollable.
    return undefined;
}
