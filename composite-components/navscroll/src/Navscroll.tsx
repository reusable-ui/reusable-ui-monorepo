// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useReducer,
    useEffect,
}                           from 'react'

// cssfn:
import type {
    // cssfn properties:
    CssSelector,
}                           from '@cssfn/css-types'             // cssfn css specific types

// reusable-ui utilities:
import {
    // hooks:
    usePropActive,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    DetermineCurrentPageProps,
    useDetermineCurrentPage,
}                           from '@reusable-ui/navigations'     // a set of navigation functions

// reusable-ui components:
import {
    // styles:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    NavProps,
    Nav,
}                           from '@reusable-ui/nav'             // a navigation component to navigate between pages



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

const findFirst = <T,R>(array: T[], predicate: (value: T) => R|null): readonly [R, number]|null => {
    for (let index = 0; index < array.length; index++) {
        const result = predicate(array[index]);
        if (result) return [result, index]; // found
    } // for
    
    return null; // not found
}; 
const findLast  = <T,R>(array: T[], predicate: (value: T) => R|null): readonly [R, number]|null => {
    for (let index = array.length - 1; index >= 0; index--) {
        const result = predicate(array[index]);
        if (result) return [result, index]; // found
    } // for
    
    return null; // not found
};

const activeIndicesReducer = (indices: number[], newIndices: number[]): number[] => {
    if (((): boolean => {
        if (newIndices.length !== indices.length) return false; // differences detected
        
        for (let i = 0; i < newIndices.length; i++) {
            if (newIndices[i] !== indices[i]) return false; // differences detected
        } // for
        
        return true; // no differences detected
    })()) return indices; // already the same, use the old as by-reference
    
    return newIndices; // update with the new one
};



// react components:
export interface NavscrollProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        NavProps<TElement>
{
    // scrolls:
    scrollingOf            ?: React.RefObject<HTMLElement>|HTMLElement|null // getter ref
    scrollingSelector      ?: CssSelector
    scrollingFilter        ?: (element: HTMLElement) => boolean
    scrollingInterpolation ?: boolean
}
const Navscroll = <TElement extends Element = HTMLElement>(props: NavscrollProps<TElement>): JSX.Element|null => {
    // states:
    const [activeIndices, setActiveIndices] = useReducer(activeIndicesReducer, []);
    
    
    
    // rest props:
    const {
        // scrolls:
        scrollingOf,
        scrollingSelector      = '*',
        scrollingFilter,
        scrollingInterpolation = true,
        
        
        
        // children:
        children,
    ...restNavProps} = props;
    type T1 = typeof restNavProps
    type T2 = Omit<T1, keyof NavProps>
    
    
    
    // dom effects:
    useEffect(() => {
        // conditions:
        const scrollingElm = (scrollingOf instanceof HTMLElement) ? scrollingOf : scrollingOf?.current;
        if (!scrollingElm) return; // scrollingElm was not set => nothing to do
        
        
        
        // functions:
        const updateSections = () => {
            const findUncroppedSection    = (viewport: Viewport, children: Dimension[]): readonly [Dimension, number]|null => {
                for (const [child, index] of children.map((child, index) => [child, index] as const)) {
                    // find current:
                    if (child.isFullyVisible(viewport)) return [child, index]; // found
                    
                    
                    
                    // find nested:
                    const childCropped = child.isPartiallyVisible(viewport);
                    if (childCropped) {
                        const childViewport = childCropped.toViewport();
                        const grandChildren = childViewport.children(scrollingSelector, scrollingFilter);
                        if (grandChildren.length && findUncroppedSection(childViewport, grandChildren)) {
                            return [childCropped, index]; // found in nested => return the parent instead of the grandChild
                        } // if
                    } // if
                } // foreach child
                
                
                
                return null; // not found
            };
            const findVisibleChildIndices = (viewport: Viewport, accumResults: number[] = []): number[] => {
                const children = viewport.children(scrollingSelector, scrollingFilter);
                const visibleChild = ((): readonly [Dimension, number]|null => {
                    if (scrollingInterpolation) {
                        return (
                            // at the end of scroll, the last section always win:
                            ((viewport.isLastScroll || null) && findLast(children, (child) => child.isPartiallyVisible(viewport)))
                            
                            ??
                            
                            // the first uncropped section always win:
                            findUncroppedSection(viewport, children)
                            
                            ??
                            
                            // the biggest cropped section always win:
                            children
                            .map((child, index) => {
                                const partialVisible = child.isPartiallyVisible(viewport);
                                
                                return {
                                    partialVisible,
                                    
                                    visibleArea    : (
                                        partialVisible
                                        ?
                                        (partialVisible.offsetWidth * partialVisible.offsetHeight) // calculates the visible area
                                        :
                                        0
                                    ),
                                    
                                    index          : index, // add index, so we can track the original index after sorted
                                };
                            })
                            .filter((item) => item.partialVisible) // only visible children
                            .sort((a, b) => b.visibleArea - a.visibleArea) // sort from biggest to smallest
                            .map((item): readonly [Dimension, number] => [item.partialVisible!, item.index])
                            [0] // find the biggest one
                            
                            ??
                            
                            // no winner:
                            null
                        );
                    }
                    else {
                        return (
                            // at the end of scroll, the last section always win:
                            ((viewport.isLastScroll || null) && findLast(children, (child) => child.isPartiallyVisible(viewport)))
                            
                            ??
                            
                            // the first visible (cropped/uncropped) section always win:
                            findFirst(children, (child) => child.isPartiallyVisible(viewport))
                        );
                    } // if
                })();
                
                
                
                if (!visibleChild) return accumResults;
                return findVisibleChildIndices(visibleChild[0].toViewport(), [...accumResults, visibleChild[1]]);
            };
            
            
            
            const visibleChildIndices = findVisibleChildIndices(Viewport.from(/*element: */scrollingElm));
            setActiveIndices(visibleChildIndices);
        };
        
        let isScheduledUpdateSections = false;
        let loaded = true;
        const scheduleUpdateSections = () => {
            // conditions:
            if (isScheduledUpdateSections) return; // already scheduled => ignore
            
            
            
            isScheduledUpdateSections = true; // mark as being scheduled
            requestAnimationFrame(() => {
                if (!isScheduledUpdateSections) return; // already done => ignore
                
                
                
                isScheduledUpdateSections = false; // mark as already done
                if (loaded) updateSections(); // update the sections if the <Navscroll> is still alive
            });
        };
        
        
        
        // setups:
        const sectionsResizeObserver = new ResizeObserver(scheduleUpdateSections);
        // sectionsResizeObserver.observe(scrollingElm, { box: 'border-box' }); // watch the offset size changes
        
        
        
        // cleanups:
        return () => {
            sectionsResizeObserver.disconnect();
            loaded = false;
        };
    }, [scrollingOf, scrollingSelector, scrollingFilter, scrollingInterpolation]); // (re)run the setups & cleanups on every time the scrolling** changes
    
    
    
    // jsx:
    /* <Nav> */
    return (
        <Nav<TElement>
            // other props:
            {...restNavProps}
        >
            //
        </Nav>
    );
};
export {
    Navscroll,
    Navscroll as default,
}

export type { ListStyle, ListVariant }
