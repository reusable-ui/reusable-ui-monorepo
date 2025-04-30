export interface BackdropCounter {
    inline : number
    block  : number
}
export const backdropCounterMap = new WeakMap<Element, BackdropCounter>();
