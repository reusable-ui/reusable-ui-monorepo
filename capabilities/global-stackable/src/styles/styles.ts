// cssfn:
import {
    // writes css in javascript:
    style,
}                           from '@cssfn/core'                  // writes css in javascript



// styles:
export const usesPortalLayout = () => {
    return style({
        // layouts:
        display : 'contents', // ensures the <Portal> doesn't take up <Viewport>'s client area
    });
};

export default () => style({
    // layouts:
    ...usesPortalLayout(),
});
