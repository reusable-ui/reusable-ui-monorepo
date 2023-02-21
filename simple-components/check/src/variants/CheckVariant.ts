// defaults:
const _defaultCheckStyle : CheckStyle  = 'regular'



// hooks:

// variants:

//#region CheckVariant
export type CheckStyle = 'regular'|'button'|'toggleButton'|'switch' // might be added more styles in the future
export interface CheckVariant {
    checkStyle ?: CheckStyle
}
export const useCheckVariant = ({checkStyle = _defaultCheckStyle}: CheckVariant) => {
    return {
        class: (checkStyle === 'regular') ? null : checkStyle,
    };
};
//#endregion CheckVariant
