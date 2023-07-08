// cssfn:
import type {
    // cssfn css specific types:
    CssKnownProps,
}                           from '@cssfn/core'                  // writes css in javascript



export type GlobalStacks = {
    sticky        : CssKnownProps['zIndex'],
    fixed         : CssKnownProps['zIndex'],
    
    modalBackdrop : CssKnownProps['zIndex'],
    modalDialog   : CssKnownProps['zIndex'],
    
    dropdown      : CssKnownProps['zIndex'],
    
    tooltip       : CssKnownProps['zIndex'],
}
export const globalStacks : GlobalStacks = {
    sticky        : 1020, // a <Modal> should above (covering) the <Navbar>
    fixed         : 1030, // a <Modal> should above (covering) the <Navbar>
    
    modalBackdrop : 1050, // a <ModalBackdrop> is above (on the top) of <MainPage> that may contain <Navbar>, so placed a higher position than <Navbar>
    modalDialog   : 1055, // a <ModalDialog> is above (on the top) of <ModalBackdrop>
    
    dropdown      : 1060, // a <Dropdown> may inside (on the top) of <Modal> and may contain nested <Component>s including <Tooltip>, so placed it between <Modal> and <Tooltip>
    
    tooltip       : 1080, // [<Popup>, <Badge>, <Busy>, <Alert>, <Tooltip>] are rarely contain <Dropdown>, so placed it at highest position
};
