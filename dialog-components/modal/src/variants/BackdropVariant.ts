// defaults:
const _defaultBackdropStyle : BackdropStyle = 'regular'



// hooks:

// variants:

//#region BackdropVariant
export type BackdropStyle = 'regular'|'hidden'|'interactive'|'static' // might be added more styles in the future
export interface BackdropVariant {
    backdropStyle ?: BackdropStyle
}
export const useBackdropVariant = ({backdropStyle = _defaultBackdropStyle}: BackdropVariant) => {
    return {
        class: (backdropStyle === 'regular') ? null : backdropStyle,
    };
};
//#endregion BackdropVariant
