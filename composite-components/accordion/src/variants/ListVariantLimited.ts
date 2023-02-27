// reusable-ui components:
import type {
    // variants:
    ListBasicStyle,
    ListSpecificStyle,
    ListCompositeStyle,
}                           from '@reusable-ui/list'            // represents a series of content



// hooks:

// variants:

//#region ListVariantLimited
export type ListSpecificStyleLimited = Exclude<ListSpecificStyle, 'tab'|'bullet'> // 'tab' and 'bullet' are not supported in <Accordion>
export type ListStyleLimited = ListCompositeStyle<ListBasicStyle, ListSpecificStyleLimited>
export interface ListVariantLimited {
    listStyle ?: ListStyleLimited
}
//#endregion ListVariantLimited
