// defaults:
const _defaultBadgeStyle : BadgeStyle = 'regular'



// hooks:

// variants:

//#region BadgeStyle
export type BadgeStyle = 'regular'|'pill'|'square'|'circle' // might be added more styles in the future
export interface BadgeVariant {
    badgeStyle ?: BadgeStyle
}
export const useBadgeVariant = ({badgeStyle = _defaultBadgeStyle}: BadgeVariant) => {
    return {
        class: (badgeStyle === 'regular') ? null : badgeStyle,
    };
};
//#endregion BadgeStyle
