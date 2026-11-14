// Types:
import {
    type CssBreakpoint,
}                           from './css-types.js'



// Types:

export interface Breakpoint {
    /**
     * Extra small screens (mobile-first).
     */
    breakpointXs   : CssBreakpoint
    
    /**
     * Small screens (typical smartphones).
     */
    breakpointSm   : CssBreakpoint
    
    /**
     * Medium screens (tablets & small laptops).
     */
    breakpointMd   : CssBreakpoint
    
    /**
     * Large screens (desktops & larger tablets).
     */
    breakpointLg   : CssBreakpoint
    
    /**
     * Extra large screens (wider displays).
     */
    breakpointXl   : CssBreakpoint
    
    /**
     * Double extra large screens (large desktops).
     */
    breakpointXxl  : CssBreakpoint
    
    /**
     * Triple extra large screens (ultrawide monitors).
     */
    breakpointXxxl : CssBreakpoint
}

export type BreakpointName = keyof Breakpoint;
