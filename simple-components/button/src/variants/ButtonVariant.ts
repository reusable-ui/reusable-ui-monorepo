// defaults:
const _defaultButtonStyle      : ButtonStyle  = 'regular'



// hooks:

// variants:

//#region ButtonVariant
export type ButtonStyle = 'regular'|'link'|'ghost' // might be added more styles in the future
export interface ButtonVariant {
    buttonStyle ?: ButtonStyle
}
export const useButtonVariant = ({buttonStyle = _defaultButtonStyle}: ButtonVariant) => {
    return {
        class: (buttonStyle === 'regular') ? null : buttonStyle,
    };
};
//#endregion ButtonVariant
