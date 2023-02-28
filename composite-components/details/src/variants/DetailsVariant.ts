// defaults:
const _defaultDetailsStyle : DetailsStyle = 'regular'



// hooks:

// variants:

//#region DetailsVariant
export type DetailsStyle = 'regular'|'content' // might be added more styles in the future
export interface DetailsVariant {
    detailsStyle ?: DetailsStyle
}
export const useDetailsVariant = ({detailsStyle = _defaultDetailsStyle}: DetailsVariant) => {
    return {
        class: (detailsStyle === 'regular') ? null : detailsStyle,
    };
};
//#endregion DetailsVariant
