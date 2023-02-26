// defaults:
const _defaultProgressBarStyle : ProgressBarStyle = 'regular'



// hooks:

// variants:

//#region ProgressBarVariant
export type ProgressBarStyle = 'regular'|'striped' // might be added more styles in the future
export interface ProgressBarVariant {
    progressBarStyle ?: ProgressBarStyle
}
export const useProgressBarVariant = ({progressBarStyle = _defaultProgressBarStyle}: ProgressBarVariant) => {
    return {
        class: (progressBarStyle === 'regular') ? null : progressBarStyle,
    };
};
//#endregion ProgressBarVariant
