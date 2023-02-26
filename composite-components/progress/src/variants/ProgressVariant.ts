// reusable-ui components:
import type {
    // variants:
    ListBasicStyle,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
const _defaultProgressStyle : ProgressStyle = 'regular'



// hooks:

// variants:

//#region ProgressVariant
export type ProgressStyle = ListBasicStyle // might be added more styles in the future
export interface ProgressVariant {
    progressStyle ?: ProgressStyle
}
export const useProgressVariant = ({progressStyle = _defaultProgressStyle}: ProgressVariant) => {
    return {
        class: (progressStyle === 'regular') ? null : progressStyle,
    };
};
//#endregion ProgressVariant
