// defaults:
const _defaultLabelStyle : LabelStyle = 'regular'



// hooks:

// variants:

//#region LabelVariant
export type LabelStyle = 'regular'|'content' // might be added more styles in the future
export interface LabelVariant {
    labelStyle ?: LabelStyle
}
export const useLabelVariant = ({labelStyle = _defaultLabelStyle}: LabelVariant) => {
    return {
        class: (labelStyle === 'regular') ? null : labelStyle,
    };
};
//#endregion LabelVariant
