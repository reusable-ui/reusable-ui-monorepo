// elements:
export const logoElm    = '.logo'    // one degree specificity to overwrite <Logo>    component
export const togglerElm = '.toggler' // one degree specificity to overwrite <Toggler> component
export const listElm    = '.list'    // one degree specificity to overwrite <List>    component
export const menuElm    = ':is(.menu, :where(.list) :where(.button, button, [role="button"], .link, a, [role="link"]):not(.not-menu))' // one degree specificity to overwrite <Menu> component
