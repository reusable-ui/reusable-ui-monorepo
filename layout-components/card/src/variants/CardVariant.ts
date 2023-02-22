// defaults:
const _defaultCardStyle          : CardStyle = 'regular'



// hooks:

// variants:

//#region CardVariant
export type CardStyle = 'regular'|'flat'|'flush'|'joined' // might be added more styles in the future
export interface CardVariant {
    cardStyle ?: CardStyle
}
export const useCardVariant = ({cardStyle = _defaultCardStyle}: CardVariant) => {
    return {
        class: (cardStyle === 'regular') ? null : cardStyle,
    };
};
//#endregion CardVariant
