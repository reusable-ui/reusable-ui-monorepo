export interface ExpectedDropShadow {
    /**
     * Expected horizontal offset in pixels (e.g., `5` for `5px`).
     */
    offsetX : number
    
    /**
     * Expected vertical offset in pixels (e.g., `10` for `10px`).
     */
    offsetY : number
    
    /**
     * Expected blur radius in pixels (e.g., `8` for `8px`).
     */
    blur    : number
    
    /**
     * Expected color as a string (e.g., `rgba(0,0,0,0.5)`).
     */
    color   : string
}
