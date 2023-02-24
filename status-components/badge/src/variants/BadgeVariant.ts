// hooks:

// variants:

//#region BadgeStyle
export type BadgeStyle = 'regular'|'pill'|'square'|'circle' // might be added more styles in the future
export interface BadgeVariant {
    badgeStyle ?: BadgeStyle
}
export const useBadgeVariant = ({badgeStyle}: BadgeVariant) => {
    return {
        class: (badgeStyle === 'regular') ? null : badgeStyle,
    };
};
//#endregion BadgeStyle
