// cssfn:
import {
    // writes css in javascript:
    style,
    scope,
}                           from '@cssfn/core'                  // writes css in javascript



// styles:
export const usesNoScrollbarInlineLayout = () => {
    return style({
        // scrolls:
        overflowX       : 'hidden',
        scrollbarGutter : 'stable',
    });
};
export const usesNoScrollbarBlockLayout = () => {
    return style({
        // scrolls:
        overflowY       : 'hidden',
        scrollbarGutter : 'stable',
    });
};

export default () => [
    scope('noScrollbarInline', {
        // layouts:
        ...usesNoScrollbarInlineLayout(),
    }, { specificityWeight: 2 }),
    
    scope('noScrollbarBlock', {
        // layouts:
        ...usesNoScrollbarBlockLayout(),
    }, { specificityWeight: 2 }),
]
