// hooks:

// variants:

//#region ListVariant
export type ListBasicStyle    = 'regular'|'flat'|'flush'|'joined';
export type ListSpecificStyle = 'content'|'button'|'tab'|'breadcrumb'|'bullet'|'numbered' // might be added more styles in the future
export type ListCompositeStyle<TListBasicStyle extends string, TListSpecificStyle extends string> =
    |TListBasicStyle
    |TListSpecificStyle
    |[TListBasicStyle]
    |[TListSpecificStyle]
    |[TListBasicStyle, TListSpecificStyle]
    |[TListSpecificStyle, TListBasicStyle]
export type ListStyle = ListCompositeStyle<ListBasicStyle, ListSpecificStyle>
export interface ListVariant {
    listStyle ?: ListStyle
}
export const useListVariant = ({ listStyle }: ListVariant) => {
    return {
        class: (
            (Array.isArray(listStyle) ? listStyle : [listStyle])
            .filter((style) => !!style && (style !== 'regular')).join(' ')
            ||
            null
        ),
    };
};
//#endregion ListVariant
