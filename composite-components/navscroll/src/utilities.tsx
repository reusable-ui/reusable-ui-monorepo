// cssfn:
import type {
    // cssfn css specific types:
    CssSelector,
}                           from '@cssfn/core'                  // writes css in javascript



// utilities:

export class Viewport {
    /**
     * Reference of the related <HTMLElement>.
     */
    public readonly element    : HTMLElement
    
    /**
     * Left-position relative to the <Navscroll>'s client rect.
     */
    public readonly offsetLeft : number
    /**
     * Top-position relative to the <Navscroll>'s client rect.
     */
    public readonly offsetTop  : number
    
    /**
     * Left-position of the virtual viewport relative to the <Navscroll>'s client rect.
     */
    public readonly viewLeft   : number
    /**
     * Top-position of the virtual viewport relative to the <Navscroll>'s client rect.
     */
    public readonly viewTop    : number
    /**
     * Right-position of the virtual viewport relative to the <Navscroll>'s client rect.
     */
    public readonly viewRight  : number
    /**
     * Bottom-position of the virtual viewport relative to the <Navscroll>'s client rect.
     */
    public readonly viewBottom : number
    
    
    
    // constructors:
    public constructor(element: HTMLElement, offsetLeft: number, offsetTop: number, viewLeft: number, viewTop: number, viewRight: number, viewBottom: number) {
        this.element     = element;
        
        this.offsetLeft  = offsetLeft;
        this.offsetTop   = offsetTop;
        
        this.viewLeft    = viewLeft;
        this.viewTop     = viewTop;
        this.viewRight   = viewRight;
        this.viewBottom  = viewBottom;
    }
    public static from(element: HTMLElement, viewport: Viewport|null = null): Viewport {
        const offsetLeft = (viewport?.offsetLeft ?? 0);
        const offsetTop  = (viewport?.offsetTop  ?? 0);
        
        const viewLeft   = offsetLeft; // the `viewLeft` is initially the same as `offsetLeft`, and may shrinking over time every `intersect()`
        const viewTop    = offsetTop;  // the `viewTop`  is initially the same as `offsetTop`,  and may shrinking over time every `intersect()`
        const viewRight  = viewLeft + element.clientWidth;
        const viewBottom = viewTop  + element.clientHeight;
        
        
        
        const viewport2 = new Viewport(
            element,
            
            offsetLeft,
            offsetTop,
            
            viewLeft,
            viewTop,
            viewRight,
            viewBottom,
        );
        if (viewport) return viewport2.intersect(viewport);
        return viewport2;
    }
    
    
    
    // dimensions:
    public intersect(viewport: Viewport): Viewport {
        return new Viewport(
                     this.element,
                     
                     this.offsetLeft,
                     this.offsetTop,
            
            Math.max(this.viewLeft,   viewport.viewLeft),
            Math.max(this.viewTop,    viewport.viewTop),
            Math.min(this.viewRight,  viewport.viewRight),
            Math.min(this.viewBottom, viewport.viewBottom),
        );
    }
    
    
    
    // scrolls:
    public get isFirstScroll(): boolean {
        const element = this.element;
        
        return (
            (element.scrollLeft <= 0.5) // near the starting edge
            &&
            (element.scrollTop  <= 0.5) // near the starting edge
        );
    }
    public get isLastScroll(): boolean {
        const element = this.element;
        
        return (
            !this.isFirstScroll // if the scrollPos is satisfied the first & the last => the first win
            &&
            (((element.scrollWidth  - element.clientWidth ) - element.scrollLeft) <= 0.5) // near the ending edge
            &&
            (((element.scrollHeight - element.clientHeight) - element.scrollTop ) <= 0.5) // near the ending edge
        );
    }
    
    
    
    // children:
    public children(scrollingSelector: CssSelector = '*', scrollingFilter?: (element: HTMLElement) => boolean): Dimension[] {
        return (
            (() => {
                const children = Array.from(this.element.querySelectorAll(`:scope>:is(${scrollingSelector})`)) as HTMLElement[];
                if (scrollingFilter) return children.filter(scrollingFilter);
                return children;
            })()
            .map((child: HTMLElement) => Dimension.from(/*element: */child, /*viewport: */this))
        );
    }
}

export class Dimension {
    /**
     * Reference of the related `Viewport`.
     */
    public readonly viewport     : Viewport|null
    /**
     * Reference of the related <HTMLElement>.
     */
    public readonly element      : HTMLElement
    
    /**
     * Left-position of the outer element relative to the <Navscroll>'s client rect.
     */
    public readonly offsetLeft   : number
    /**
     * Top-position of the outer element relative to the <Navscroll>'s client rect.
     */
    public readonly offsetTop    : number
    /**
     * Right-position of the outer element relative to the <Navscroll>'s client rect.
     */
    public readonly offsetRight  : number
    /**
     * Bottom-position of the outer element relative to the <Navscroll>'s client rect.
     */
    public readonly offsetBottom : number
    
    
    
    // constructors:
    protected constructor(viewport: Viewport|null, element: HTMLElement, offsetLeft: number, offsetTop: number, offsetRight: number, offsetBottom: number) {
        this.viewport     = viewport;
        this.element      = element;
        
        this.offsetLeft   = offsetLeft;
        this.offsetTop    = offsetTop;
        this.offsetRight  = offsetRight;
        this.offsetBottom = offsetBottom;
    }
    public static from(element: HTMLElement, viewport: Viewport|null = null): Dimension {
        const [parentOffsetLeft, parentOffsetTop] = (() => { // compensation for non positioned parent element
            const parent = element.parentElement;
            if (!parent || (parent === element.offsetParent)) return [0, 0];
            
            return [
                parent.offsetLeft + parent.clientLeft,
                parent.offsetTop  + parent.clientTop,
            ];
        })();
        const offsetLeft   = (viewport?.offsetLeft ?? 0) + (element.offsetLeft - parentOffsetLeft) - (element.parentElement?.scrollLeft ?? 0);
        const offsetTop    = (viewport?.offsetTop  ?? 0) + (element.offsetTop  - parentOffsetTop ) - (element.parentElement?.scrollTop  ?? 0);
        const offsetRight  = offsetLeft + element.offsetWidth;
        const offsetBottom = offsetTop  + element.offsetHeight;
        
        
        
        return new Dimension(
            viewport,
            element,
            
            offsetLeft,
            offsetTop,
            offsetRight,
            offsetBottom,
        );
    }
    
    
    
    // dimensions:
    public intersect(viewport: Viewport): Dimension {
        return new Dimension(
                     this.viewport,
                     this.element,
            
            Math.max(this.offsetLeft,   viewport.viewLeft),
            Math.max(this.offsetTop,    viewport.viewTop),
            Math.min(this.offsetRight,  viewport.viewRight),
            Math.min(this.offsetBottom, viewport.viewBottom),
        );
    }
    
    
    
    public get offsetWidth() {
        return this.offsetRight - this.offsetLeft;
    }
    public get offsetHeight() {
        return this.offsetBottom - this.offsetTop;
    }
    
    public within(viewport: Viewport): boolean {
        return (
            ((this.offsetLeft >= viewport.viewLeft) && (this.offsetRight  <= viewport.viewRight ))
            &&
            ((this.offsetTop  >= viewport.viewTop ) && (this.offsetBottom <= viewport.viewBottom))
        );
    }
    public isPartiallyVisible(viewport: Viewport): Dimension|null {
        const intersected = this.intersect(viewport);
        
        if (
            (
                // intersected child is still considered visible if has positive width && positive height
                
                (intersected.offsetWidth > 0) // width
                &&
                (intersected.offsetHeight > 0) // height
            )
            ||
            // rare case:
            // consider zero width/height as visible if within the viewport:
            this.within(viewport)
        ) return intersected;
        
        return null;
    }
    public isFullyVisible(viewport: Viewport): Dimension|null {
        const intersected = this.intersect(viewport);
        
        // true if the rect is still the same as original
        if (
            (this.offsetLeft   === intersected.offsetLeft)
            &&
            (this.offsetTop    === intersected.offsetTop)
            &&
            (this.offsetRight  === intersected.offsetRight)
            &&
            (this.offsetBottom === intersected.offsetBottom)
        ) return this;
        
        return null;
    }
    
    public toViewport(): Viewport {
        const element    = this.element;
        
        const [parentOffsetLeft, parentOffsetTop] = (() => { // compensation for non positioned parent element
            const parent = element.parentElement;
            if (!parent || (parent === element.offsetParent)) return [0, 0];
            
            return [
                parent.offsetLeft + parent.clientLeft,
                parent.offsetTop  + parent.clientTop,
            ];
        })();
        const offsetLeft = (this.viewport?.offsetLeft ?? 0) + (element.offsetLeft - parentOffsetLeft) - (element.parentElement?.scrollLeft ?? 0) + element.clientLeft;
        const offsetTop  = (this.viewport?.offsetTop  ?? 0) + (element.offsetTop  - parentOffsetTop ) - (element.parentElement?.scrollTop  ?? 0) + element.clientTop;
        
        const viewLeft   = offsetLeft; // the `viewLeft` is initially the same as `offsetLeft`, and may shrinking over time every `intersect()`
        const viewTop    = offsetTop;  // the `viewTop`  is initially the same as `offsetTop`,  and may shrinking over time every `intersect()`
        const viewRight  = viewLeft + element.clientWidth;
        const viewBottom = viewTop  + element.clientHeight;
        
        
        
        return (
            new Viewport( // maximum of borderless full view
                element,
                
                offsetLeft,
                offsetTop,
                
                viewLeft,
                viewTop,
                viewRight,
                viewBottom,
            )
            .intersect( // intersect with (remaining) shrinking current view
                new Viewport(
                    element,
                    
                    0,
                    0,
                    
                    this.offsetLeft,
                    this.offsetTop,
                    this.offsetRight,
                    this.offsetBottom,
                )
            )
        );
    }
}

export const findFirst = <T,R>(array: T[], predicate: (value: T) => R|null): readonly [R, number]|null => {
    for (let index = 0; index < array.length; index++) {
        const result = predicate(array[index]);
        if (result) return [result, index]; // found
    } // for
    
    return null; // not found
}; 
export const findLast  = <T,R>(array: T[], predicate: (value: T) => R|null): readonly [R, number]|null => {
    for (let index = array.length - 1; index >= 0; index--) {
        const result = predicate(array[index]);
        if (result) return [result, index]; // found
    } // for
    
    return null; // not found
};

export const activeIndicesReducer = (indices: number[], newIndices: number[]): number[] => {
    if (((): boolean => {
        if (newIndices.length !== indices.length) return false; // differences detected
        
        for (let i = 0; i < newIndices.length; i++) {
            if (newIndices[i] !== indices[i]) return false; // differences detected
        } // for
        
        return true; // no differences detected
    })()) return indices; // already the same, use the old as by-reference
    
    return newIndices; // update with the new one
};
