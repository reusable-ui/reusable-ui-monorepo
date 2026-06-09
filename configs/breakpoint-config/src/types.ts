// Types:
import {
    type CssBreakpoint,
}                           from './css-types.js'



// Types:

export interface Breakpoint {
    /**
     * Extra small screens (mobile-first).
     */
    xs   : CssBreakpoint
    
    /**
     * Small screens (typical smartphones).
     */
    sm   : CssBreakpoint
    
    /**
     * Medium screens (tablets & small laptops).
     */
    md   : CssBreakpoint
    
    /**
     * Large screens (desktops & larger tablets).
     */
    lg   : CssBreakpoint
    
    /**
     * Extra large screens (wider displays).
     */
    xl   : CssBreakpoint
    
    /**
     * Double extra large screens (large desktops).
     */
    xxl  : CssBreakpoint
    
    /**
     * Triple extra large screens (ultrawide monitors).
     */
    xxxl : CssBreakpoint
}

export type BreakpointName = keyof Breakpoint;
