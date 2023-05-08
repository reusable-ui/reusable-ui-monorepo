// elements:
// .carousel > .list > .item > .media
export const listElm      = ':where(.list)' // zero degree specificity to be easily overwritten
export const dummyListElm = '.dummy'        // any degree specificity, not intended to be overwritten
export const itemElm      = '*'             // zero degree specificity to be easily overwritten
export const prevBtnElm   = '.prevBtn'      // one degree specificity to overwrite <Button>    component
export const nextBtnElm   = '.nextBtn'      // one degree specificity to overwrite <Button>    component
export const navElm       = '.nav'          // one degree specificity to overwrite <Navscroll> component
