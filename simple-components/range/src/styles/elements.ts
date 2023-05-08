// elements:
export const inputElm      = ':where(:first-child)' // zero degree specificity to be easily overwritten
export const trackElm      = '.track'               // one degree specificity to overwrite <Track>      component
export const trackLowerElm = '.tracklower'          // one degree specificity to overwrite <Tracklower> component
export const trackUpperElm = '.trackupper'          // one degree specificity to overwrite <Trackupper> component
export const thumbElm      = '.thumb'               // one degree specificity to overwrite <Thumb>      component