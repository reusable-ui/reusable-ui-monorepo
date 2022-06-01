// cssfn:
import type {
    // cssfn properties:
    CssSelectorCollection,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // rules:
    rule,
    fallbacks,
    ifActive,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'         // writes css in javascript



const unset = 'unset';
const none  = 'none';



/**
 * Removes browser's default style on focusable element.
 */
export const stripoutFocusableElement = () => style({
    ...rule([':focus', ':focus-visible'], {
        // borders:
        outline       : unset, // removes focus outline
        outlineOffset : unset, // removes focus outline
    }),
});

/**
 * Removes browser's default style on control (`<input>`, `<textarea>`, `<button>`, etc).
 */
export const stripoutControl = () => style({
    ...imports([
        stripoutFocusableElement(),
    ]),
    ...style({
        // layouts:
        appearance      : none,
        
        
        
        // sizes:
        boxSizing       : unset,
        
        
        
        // accessibilities:
        cursor          : unset,
        
        
        
        // backgrounds:
        backgroundColor : unset,
        
        
        
        // foregrounds:
        color           : unset,
        
        
        
        // borders:
        border          : unset,
        borderRadius    : unset,
        
        
        
        // spacings:
        margin          : unset,
        padding         : unset,
        
        
        
        // typos:
        font            : unset,
        textRendering   : unset,
        textTransform   : unset,
        textIndent      : unset,
        textShadow      : unset,
        textAlign       : unset,
        letterSpacing   : unset,
        wordSpacing     : unset,
    }),
});

/**
 * Removes browser's default style on hyperlink (`<a>`).
 */
export const stripoutLink = () => style({
    ...imports([
        stripoutFocusableElement(),
    ]),
    ...style({
        // accessibilities:
        cursor         : unset, // removes hand pointer
        
        
        
        // foregrounds:
        color          : unset, // removes blue color
        
        
        
        // typos:
        textDecoration : unset, // removes underline
        
        
        
        // states:
        ...ifActive({
            // foregrounds:
            color      : unset, // removes blue color
        }),
    }),
});

/**
 * Removes browser's default style on `<input type=*textLike*>`.  
 * `*textLike*` = `text`|`search`|`password`|`email`|`tel`|`url`|`number`|`time`|`week`|`date`|`datetime-local`|`month`
 */
export const stripoutTextbox = () => style({
    ...imports([
        stripoutControl(),
    ]),
    ...style({
        // layouts:
        MozAppearance  : 'textfield',
        
        
        
        // states:
        ...rule([':valid', ':invalid'], {
            // borders:
            boxShadow  : unset,
        }),
        
        
        
        // children:
        ...children(['::-webkit-calendar-picker-indicator', '::-webkit-inner-spin-button', '::-webkit-search-cancel-button'], {
            // layouts:
            appearance : none,
            display    : none,
        }),
    }),
});

export const rangeTrackElm : CssSelectorCollection = ['::-webkit-slider-runnable-track', '::-moz-range-track', '::-ms-track'];
export const rangeThumbElm : CssSelectorCollection = ['::-webkit-slider-thumb'         , '::-moz-range-thumb', '::-ms-thumb'];
/**
 * Removes browser's default style on `<input type="range">`.
 */
export const stripoutRange = () => style({
    ...imports([
        stripoutControl(),
    ]),
    ...style({
        // children:
        ...children([rangeTrackElm, rangeThumbElm], {
            ...imports([
                stripoutControl(),
            ]),
        }, { performGrouping: false }), // any invalid selector does not cause the whole selectors to fail
    }),
});

/**
 * Removes browser's default style on list (`<ul> > <li>` & `<ol> > <li>`).
 */
export const stripoutList = () => style({
    // layouts:
    listStyleType      : none,
    
    
    
    // spacings:
    margin             : unset,
    paddingInlineStart : unset,
    
    
    
    // children:
    ...children('li', {
        // layouts:
        display        : unset,
        
        
        
        // typos:
        textAlign      : unset,
    }),
});

/**
 * Removes browser's default style on `<figure>`.
 */
export const stripoutFigure = () => style({
    // layouts:
    display : unset,
    
    
    
    // spacings:
    margin  : unset,
});

/**
 * Hides browser's default scrollbar.
 */
export const stripoutScrollbar = () => style({
    // layouts:
    scrollbarWidth  : none,
    msOverflowStyle : none,
    
    
    
    // children:
    ...children('::-webkit-scrollbar', {
        // layouts:
        display     : none,
    }),
});

/**
 * Removes browser's default style on `<img>`.
 */
export const stripoutImage = () => style({
    // layouts:
    display: 'block', // fills the entire parent's width
    
    
    
    // sizes:
    // fix the <img>'s abnormal `display=block` sizing:
    // span to maximum width:
    boxSizing      : 'border-box', // the final size is including borders & paddings
    inlineSize     : 'fill-available',
    ...fallbacks({
        inlineSize : '100%',
    }),
});

/**
 * Removes browser's default style on `<dialog>`.
 */
export const stripoutDialog = () => style({
    // layouts:
    display     : unset,
    
    
    
    // positions:
    position    : unset,
    inset       : unset,
    
    
    
    // sizes:
    inlineSize  : unset,
    blockSize   : unset,
    
    
    
    // backgrounds:
    background  : unset,
    
    
    
    // foregrounds:
    color       : unset,
    
    
    
    // borders:
    border      : unset,
    
    
    
    // spacings:
    margin      : unset,
    padding     : unset,
    
    
    
    // children:
    ...children('::backdrop', {
        // layouts:
        display    : none,
        
        
        
        // positions:
        position   : unset,
        inset      : unset,
        
        
        
        // backgrounds:
        background : unset,
    }),
});
