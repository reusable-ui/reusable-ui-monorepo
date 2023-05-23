// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import type {
    // cssfn general types:
    Optional,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import type {
    // react components:
    BasicProps,
    
    BasicComponentProps,
}                           from '@reusable-ui/basic'           // a base component
import {
    // react components:
    Content,
}                           from '@reusable-ui/content'         // a base component
import type {
    // react components:
    ButtonProps,
    
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    // react components:
    ButtonIcon,
}                           from '@reusable-ui/button-icon'     // a button component with a nice icon
import {
    // utilities:
    Dimension,
    
    
    
    // react components:
    NavscrollProps,
    Navscroll,
    
    NavscrollComponentProps,
}                           from '@reusable-ui/navscroll'       // a navigation component to navigate within current page, based on scroll position
import {
    // react components:
    ListItem,
}                           from '@reusable-ui/list'            // represents a series of content

// internals:
import {
    // variants:
    CarouselVariant,
    useCarouselVariant,
}                           from './variants/CarouselVariant.js'



// defaults:
const _defaultListElmClasses         : Optional<string>[] = ['list']
const _defaultDummyListElmClasses    : Optional<string>[] = ['list', 'dummy']
const _defaultPrevButtonClasses      : Optional<string>[] = ['prevBtn']
const _defaultNextButtonClasses      : Optional<string>[] = ['nextBtn']
const _defaultNavscrollClasses       : Optional<string>[] = ['nav']

const _defaultSlideThreshold         : number = 5   /* pixel */         // the minimum distance to start sliding_action (but not yet swiping action)
const _defaultSwipeMovementThreshold : number = 20  /* pixel */         // the minimum distance to considered swiping_action
const _defaultSwipeDurationThreshold : number = 300 /* milliseconds */  // the maximum time duration to considered swiping_action


// styles:
export const useCarouselStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'v35mas3qt6' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface CarouselProps<TElement extends HTMLElement = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        CarouselVariant,
        
        // components:
        BasicComponentProps<TElement>,
        NavscrollComponentProps<Element>
{
    // refs:
    scrollingRef        ?: React.Ref<TElement> // setter ref
    
    
    
    // components:
    prevButtonComponent ?: ButtonComponentProps['buttonComponent']
    nextButtonComponent ?: ButtonComponentProps['buttonComponent']
    
    
    
    // children:
    children            ?: React.ReactNode
}
const Carousel = <TElement extends HTMLElement = HTMLElement>(props: CarouselProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useCarouselStyleSheet();
    
    
    
    // variants:
    const {infiniteLoop}    = useCarouselVariant(props);
    
    
    
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        scrollingRef,
        
        
        
        // variants:
        infiniteLoop : _infiniteLoop, // remove
        
        
        
        // components:
        basicComponent      = (<Content<TElement>                           /> as React.ReactComponentElement<any, BasicProps<TElement>>),
        
        prevButtonComponent = (<ButtonIcon iconPosition='start' icon='prev' /> as React.ReactComponentElement<any, ButtonProps>),
        nextButtonComponent = (<ButtonIcon iconPosition='end'   icon='next' /> as React.ReactComponentElement<any, ButtonProps>),
        navscrollComponent  = (<Navscroll<Element>                          /> as React.ReactComponentElement<any, NavscrollProps<Element>>),
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // refs:
    const listRefInternal      = useRef<TElement|null>(null);
    const mergedListRef        = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        // preserves the original `scrollingRef` (conditionally):
        (!infiniteLoop || undefined) && scrollingRef,
        
        
        
        listRefInternal,
    );
    
    const dummyListRefInternal = useRef<TElement|null>(null);
    const mergedDummyListRef   = useMergeRefs(
        // preserves the original `scrollingRef` (conditionally):
        (infiniteLoop || undefined) && scrollingRef,
        
        
        
        dummyListRefInternal,
    );
    
    
    
    // fn props:
    const itemsCount = React.Children.count(children);
    
    
    
    // states:
    const dummyDiff         = useRef<number>(0);
    const touchedItemIndex  = useRef<number>(0);
    
    const initialTouchTick  = useRef<number>(0);
    const initialTouchPos   = useRef<number>(0);
    const prevTouchPos      = useRef<number>(0);
    const enum SlidingStatus {
        Passive         = 0,
        MirrorScrolling = 1,
        AutoScrolling   = 2,
        FollowsPointer  = 3,
    }
    const slidingStatus     = useRef<SlidingStatus>(SlidingStatus.Passive);
    
    
    
    // dom effects:
    
    // sync dummyListElm scrolling position to listElm scrolling position, once, at startup:
    useEffect(() => {
        // conditions:
        
        if (!infiniteLoop) return; // only for infiniteLoop mode
        
        const dummyListElm = dummyListRefInternal.current;
        if (!dummyListElm) return; // dummyListElm must be exist to sync
        
        const listElm      = listRefInternal.current;
        if (!listElm)      return; // listElm must be exist for syncing
        
        
        
        // fn props:
        const listScrollPos     = listElm.scrollLeft;
        const listScrollPosMax  = listElm.scrollWidth - listElm.clientWidth;
        const dummyScrollPosMax = dummyListElm.scrollWidth - dummyListElm.clientWidth;
        const dummyScale        = dummyScrollPosMax / listScrollPosMax;
        const dummyScrollPos    = listScrollPos * dummyScale;
        
        
        
        // setups:
        dummyListElm.scrollTo({
            left     : Math.round(
                Math.min(Math.max(
                    dummyScrollPos
                , 0), dummyScrollPosMax) // make sure the `dummyScrollPos` doesn't exceed the range of 0 - `dummyScrollPosMax`
            ),
            
            behavior : ('instant' as any) // no scrolling animation during sync
        });
    }, [infiniteLoop]); // (re)run the setups on every time the infiniteLoop mode changes
    
    // sync listElm scrolling position to dummyListElm scrolling position, every `scrollBy()`/`scrollTo()` called:
    useEffect(() => {
        // conditions:
        
        if (!infiniteLoop) return; // only for infiniteLoop mode
        
        const dummyListElm = dummyListRefInternal.current;
        if (!dummyListElm) return; // dummyListElm must be exist for syncing
        
        
        
        // functions:
        const calculateListScrollPos = (dummyListElm: TElement, listElm: TElement, optionsOrX: ScrollToOptions|number|undefined, relative: boolean) => {
            const dummyScrollPos          = relative ? dummyListElm.scrollLeft : 0;
            const dummyScrollBy           =  (typeof(optionsOrX) !== 'number') ? (optionsOrX?.left ?? 0) : optionsOrX;
            const dummyBehavior           = ((typeof(optionsOrX) !== 'number') && optionsOrX?.behavior) || 'smooth';
            
            const listScrollPosMax        = listElm.scrollWidth - listElm.clientWidth;
            const dummyScrollPosMax       = dummyListElm.scrollWidth - dummyListElm.clientWidth;
            const listScale               = listScrollPosMax / dummyScrollPosMax;
            const listScrollPosScaled     = dummyScrollPos * listScale;
            const listScrollByScaled      = dummyScrollBy  * listScale;
            const listDiffPhysc           = (itemsCount - dummyDiff.current) * listElm.clientWidth;   // converts logical diff to physical diff
            const listScrollPosOverflowed = listScrollPosScaled + listScrollByScaled + listDiffPhysc; // scroll pos + scroll by + diff
            const listScrollPosPerioded   = periodify(listScrollPosOverflowed, listElm.scrollWidth);  // wrap overflowed left
            
            return {
                left     : Math.round(
                    Math.min(Math.max(
                        listScrollPosPerioded
                    , 0), listScrollPosMax)             // make sure the `listScrollPosPerioded` doesn't exceed the range of 0 - `listScrollPosMax`
                    -
                    (relative ? listElm.scrollLeft : 0) // if relative, substract the result by the relativity
                ),
                
                behavior : dummyBehavior,
            };
        };
        
        
        
        // setups:
        
        const oriScrollBy = dummyListElm.scrollBy;
        dummyListElm.scrollBy = (function(this: TElement, optionsOrX?: ScrollToOptions|number, y?: number) {
            const willScrollingXAxis = (typeof(optionsOrX) !== 'number') ? !!optionsOrX?.left : !!optionsOrX;
            if (willScrollingXAxis) slidingStatus.current = SlidingStatus.MirrorScrolling;
            
            
            
            const listElm = listRefInternal.current;
            if (listElm) { // listElm must be exist to sync
                listElm.scrollBy(calculateListScrollPos(this, listElm, optionsOrX, true));
            } // if
            
            
            
            // call the original:
            if (typeof(optionsOrX) !== 'number') {
                (oriScrollBy as any).call(this, optionsOrX);
            }
            else {
                (oriScrollBy as any).call(this, optionsOrX, y);
            } // if
        } as any);
        
        const oriScrollTo = dummyListElm.scrollTo;
        dummyListElm.scrollTo = (function(this: TElement, optionsOrX?: ScrollToOptions|number, y?: number) {
            const willScrollingXAxis = ((typeof(optionsOrX) !== 'number') ? optionsOrX?.left : optionsOrX) !== this.scrollLeft;
            if (willScrollingXAxis) slidingStatus.current = SlidingStatus.MirrorScrolling;
            
            
            
            const listElm = listRefInternal.current;
            if (listElm) { // listElm must be exist to sync
                listElm.scrollTo(calculateListScrollPos(this, listElm, optionsOrX, false));
            } // if
            
            
            
            // call the original:
            if (typeof(optionsOrX) !== 'number') {
                (oriScrollTo as any).call(this, optionsOrX);
            }
            else {
                (oriScrollTo as any).call(this, optionsOrX, y);
            } // if
        } as any);
        
        
        
        // cleanups:
        return () => {
            // restore the hacked to the original (back to prototype):
            delete (dummyListElm as any).scrollBy;
            delete (dummyListElm as any).scrollTo;
        };
    }, [infiniteLoop]); // (re)run the setups & cleanups on every time the infiniteLoop mode changes
    
    // prevents browser's scrolling implementation, we use our scrolling implementation:
    useEffect(() => {
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for setup
        
        
        // handlers:
        const listHandleTouchStart = (event: TouchEvent) => {
            event.preventDefault();
        };
        
        
        
        // setups:
        listElm.addEventListener('touchstart', listHandleTouchStart, { passive: false });
        
        
        
        // cleanups:
        return () => {
            listElm.removeEventListener('touchstart', listHandleTouchStart);
        };
    }, []);
    
    
    
    // functions:
    const periodify            = (value: number, period: number) => {
        return ((value % period) + period) % period;
    };
    const normalizeShift       = (shift: number) => {
        // conditions:
        if (!itemsCount) return shift;
        
        
        
        return periodify(shift, itemsCount);
    };
    const shiftDummyDiff       = (diff: number) => {
        dummyDiff.current = normalizeShift(dummyDiff.current + diff);
    };
    
    const cloneDummyToList     = (dummyShift = dummyDiff.current, moveNextSide : boolean|undefined = undefined) => {
        // conditions:
        
        if (!itemsCount) return; // empty items => nothing to shift
        
        const listShift = normalizeShift(itemsCount - dummyShift);
        if (!listShift) return; // no difference => nothing to shift
        
        
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to shift
        
        
        
        // remember the current listElm's scrollPos before modifying:
        const listScrollPos = listElm.scrollLeft;
        
        
        
        // decide which side to be moved:
        moveNextSide = moveNextSide ?? (listShift > (itemsCount / 2)); // determine the fewest listItem(s) to move
        if (moveNextSide) { // move the right listItem(s) to the left_most
            Array.from(listElm.childNodes).slice(-(itemsCount - listShift))            // take nth elements from the right
            .reverse()                                                                 // inserting at the beginning causes the inserted items to be reversed, so we're re-reversing them to keep the order
            .forEach((item) => listElm.insertBefore(item, listElm.firstElementChild)); // insert the items at the beginning
        }
        else { // move the left listItem(s) to the right_most
            Array.from(listElm.childNodes).slice(0, listShift) // take nth elements from the left
            .forEach((item) => listElm.append(item));          // insert the items at the end
        } // if
        
        
        
        // set the listElm's scrollPos to the correct image:
        const listStyle        = getComputedStyle(listElm);
        const frameWidth       = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
        const listScrollWidth  = itemsCount * frameWidth;
        const listDiffPhysc    = (itemsCount - listShift) * frameWidth;        // converts logical diff to physical diff
        const listLeftOverflow = listScrollPos + listDiffPhysc;                // scroll pos + diff
        const listLeftPeriod   = periodify(listLeftOverflow, listScrollWidth); // wrap overflowed left
        listElm.scrollTo({
            left     : listLeftPeriod,
            behavior : ('instant' as any) // no scrolling animation during sync
        });
        
        
        
        // update the diff of listElm & dummyListElm:
        dummyDiff.current = normalizeShift(dummyDiff.current + listShift);
    };
    
    const calculateScrollLimit = (deltaScroll: number) => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return deltaScroll; // listElm must be exist to manipulate
        
        
        
        const listStyle             = getComputedStyle(listElm);
        const frameWidth            = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
        const limitedScrollMin      = ((touchedItemIndex.current - 1) * frameWidth) - listElm.scrollLeft;
        const limitedScrollMax      = ((touchedItemIndex.current + 1) * frameWidth) - listElm.scrollLeft;
        return Math.min(Math.max(
            deltaScroll,
        limitedScrollMin), limitedScrollMax);
    };
    
    const enableFreeScrolling  = (enable: boolean) => {
        // temporary disable the snapScroll on listElm so it can follow our scroll implementation:
        const listElm = listRefInternal.current;
        if (listElm) {
            listElm.style.scrollSnapType = enable ? 'none' : '';
            listElm.style.scrollBehavior = enable ? 'auto' : '';
        } // if
        
        // temporary disable the snapScroll on dummyListElm so it can sync listElm's scroll position:
        const dummyListElm = dummyListRefInternal.current;
        if (dummyListElm) { // dummyListElm must be exist for syncing
            dummyListElm.style.scrollSnapType = enable ? 'none' : '';
            dummyListElm.style.scrollBehavior = enable ? 'auto' : '';
        } // if
    };
    
    const scrollBy             = (listElm: TElement, nextSlide: boolean) => {
        const parent = listElm;
        
        
        
        // calculate the limit of the allowed scrolling distances:
        const [minLeft, maxLeft, minTop, maxTop] = [
            -parent.scrollLeft,
            (parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft,
            
            -parent.scrollTop,
            (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
        ];
        
        // calculate the scrolling distance:
        const parentStyle = getComputedStyle(parent);
        const [scrollLeft, scrollRight] = [
            Math.min(Math.max((listElm.clientWidth  - (Number.parseInt(parentStyle.paddingLeft) || 0)  - (Number.parseInt(parentStyle.paddingRight ) || 0)) * (nextSlide ? 1 : -1), minLeft), maxLeft),
            Math.min(Math.max((listElm.clientHeight - (Number.parseInt(parentStyle.paddingTop ) || 0)  - (Number.parseInt(parentStyle.paddingBottom) || 0)) * (nextSlide ? 1 : -1), minTop ), maxTop ),
        ];
        
        
        
        if (scrollLeft || scrollRight) {
            // mark the sliding status:
            slidingStatus.current = (parent === dummyListRefInternal.current) ? SlidingStatus.MirrorScrolling : SlidingStatus.AutoScrolling;
            
            
            
            parent.scrollBy({
                left     : scrollLeft,
                top      : scrollRight,
                behavior : 'smooth',
            });
        } // if
    };
    const scrollTo             = (targetSlide: HTMLElement|null) => {
        if (!targetSlide) return;
        const parent = targetSlide.parentElement;
        if (!parent) return;
        
        
        
        // calculate the limit of the allowed scrolling distances:
        const [minLeft, maxLeft, minTop, maxTop] = [
            -parent.scrollLeft,
            (parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft,
            
            -parent.scrollTop,
            (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
        ];
        
        // calculate the scrolling distance:
        const parentStyle = getComputedStyle(parent);
        const dimension = Dimension.from(targetSlide);
        const [scrollLeft, scrollRight] = [
            Math.min(Math.max(dimension.offsetLeft - (Number.parseInt(parentStyle.paddingLeft) || 0), minLeft), maxLeft),
            Math.min(Math.max(dimension.offsetTop  - (Number.parseInt(parentStyle.paddingTop ) || 0), minTop ), maxTop ),
        ];
        
        
        
        if (scrollLeft || scrollRight) {
            // mark the sliding status:
            slidingStatus.current = (parent === dummyListRefInternal.current) ? SlidingStatus.MirrorScrolling : SlidingStatus.AutoScrolling;
            
            
            
            parent.scrollBy({
                left     : scrollLeft,
                top      : scrollRight,
                behavior : 'smooth',
            });
        } // if
    };
    
    const isBeginOfScroll      = (listElm: TElement) => (
        (listElm.scrollLeft <= 0.5)
        // &&
        // (listElm.scrollTop  <= 0.5) // no need to check vertical scrollbar
    );
    const isEndOfScroll        = (listElm: TElement) => (
        (((listElm.scrollWidth  - listElm.clientWidth ) - listElm.scrollLeft) <= 0.5)
        // &&
        // (((listElm.scrollHeight - listElm.clientHeight) - listElm.scrollTop ) <= 0.5) // no need to check vertical scrollbar
    );
    
    
    
    // classes:
    const mergedPrevButtonClasses = useMergeClasses(
        // preserves the original `classes` from `prevButtonComponent`:
        prevButtonComponent.props.classes,
        
        
        
        // identifiers:
        ..._defaultPrevButtonClasses,
    );
    const mergedNextButtonClasses = useMergeClasses(
        // preserves the original `classes` from `nextButtonComponent`:
        nextButtonComponent.props.classes,
        
        
        
        // identifiers:
        ..._defaultNextButtonClasses,
    );
    const mergedNavscrollClasses  = useMergeClasses(
        // preserves the original `classes` from `navscrollComponent`:
        navscrollComponent.props.classes,
        
        
        
        // identifiers:
        ..._defaultNavscrollClasses,
    );
    
    
    
    // handlers:
    const handlePrevClickInternal = useEvent<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        // conditions:
        if (slidingStatus.current === SlidingStatus.MirrorScrolling) return; // protect from messy scrolling
        if (event.defaultPrevented) return;
        
        
        
        const dummyListElm = dummyListRefInternal.current;
        const listElm      = listRefInternal.current;
        
        
        
        if (infiniteLoop && dummyListElm) {
            let itemsShifted = false;
            if (listElm && isBeginOfScroll(listElm)) {
                // move the last item to the first:
                const item = listElm.lastElementChild;
                if (item) {
                    // remember the current scrollPos before modifying:
                    const scrollPos = listElm.scrollLeft;
                    
                    
                    
                    listElm.insertBefore(item, listElm.firstElementChild); // insert the items at the beginning
                    itemsShifted = true;
                    
                    
                    
                    // set the current scrollPos to the next item, so the scrolling effect can occur:
                    listElm.scrollTo({ left: (scrollPos + listElm.clientWidth), behavior: ('instant' as any) }); // no scrolling animation during sync
                } // if
                
                
                
                // calculate the diff of listElm & dummyListElm:
                shiftDummyDiff(-1); // shift the dummyListElm once to left (will wrap to the right_most)
            } // if
            
            
            
            const doScroll = () => {
                if (isBeginOfScroll(dummyListElm)) {
                    // scroll to last:
                    scrollTo(dummyListElm.lastElementChild as (HTMLElement|null));
                }
                else {
                    // scroll to previous:
                    scrollBy(dummyListElm, false);
                } // if
            };
            if (itemsShifted) {
                setTimeout(doScroll, 0); // wait until scrolling shift completed and then doScroll()
            }
            else {
                doScroll();
            } // if
            
            
            
            // all necessary task has been performed, no further action needed:
            event.preventDefault();
        }
        else if (listElm) {
            if (isBeginOfScroll(listElm)) {
                // scroll to last:
                scrollTo(listElm.lastElementChild as (HTMLElement|null));
            }
            else {
                // scroll to previous:
                scrollBy(listElm, false);
            } // if
            
            
            
            // all necessary task has been performed, no further action needed:
            event.preventDefault();
        } // if
    });
    const handlePrevClick         = useMergeEvents(
        // preserves the original `onClick` from `prevButtonComponent`:
        prevButtonComponent.props.onClick,
        
        
        
        // actions:
        handlePrevClickInternal,
    );
    
    const handleNextClickInternal = useEvent<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        // conditions:
        if (slidingStatus.current === SlidingStatus.MirrorScrolling) return; // protect from messy scrolling
        if (event.defaultPrevented) return;
        
        
        
        const dummyListElm = dummyListRefInternal.current;
        const listElm      = listRefInternal.current;
        
        
        
        if (infiniteLoop && dummyListElm) {
            let itemsShifted = false;
            if (listElm && isEndOfScroll(listElm)) {
                // move the first item to the last:
                const item = listElm.firstElementChild;
                if (item) {
                    // remember the current scrollPos before modifying:
                    const scrollPos = listElm.scrollLeft;
                    
                    
                    
                    listElm.append(item); // insert the items at the end
                    itemsShifted = true;
                    
                    
                    
                    // set the current scrollPos to the prev item, so the scrolling effect can occur:
                    listElm.scrollTo({ left: (scrollPos - listElm.clientWidth), behavior: ('instant' as any) }); // no scrolling animation during sync
                } // if
                
                
                
                // calculate the diff of listElm & dummyListElm:
                shiftDummyDiff(1); // shift the dummyListElm once to right (will wrap to the left_most)
            } // if
            
            
            
            const doScroll = () => {
                if (isEndOfScroll(dummyListElm)) {
                    // scroll to first:
                    scrollTo(dummyListElm.firstElementChild as (HTMLElement|null));
                }
                else {
                    // scroll to next:
                    scrollBy(dummyListElm, true);
                } // if
            };
            if (itemsShifted) {
                setTimeout(doScroll, 0); // wait until scrolling shift completed and then doScroll()
            }
            else {
                doScroll();
            } // if
            
            
            
            // all necessary task has been performed, no further action needed:
            event.preventDefault();
        }
        else if (listElm) {
            if (isEndOfScroll(listElm)) {
                // scroll to first:
                scrollTo(listElm.firstElementChild as (HTMLElement|null));
            }
            else {
                // scroll to next:
                scrollBy(listElm, true);
            } // if
            
            
            
            // all necessary task has been performed, no further action needed:
            event.preventDefault();
        } // if
    });
    const handleNextClick         = useMergeEvents(
        // preserves the original `onClick` from `nextButtonComponent`:
        nextButtonComponent.props.onClick,
        
        
        
        // actions:
        handleNextClickInternal,
    );
    
    const dummyHandleScroll       = useEvent<React.UIEventHandler<TElement>>(() => {
        // conditions:
        if (slidingStatus.current !== SlidingStatus.MirrorScrolling) return; // only process `MirrorScrolling`
        
        const dummyListElm = dummyListRefInternal.current;
        if (!dummyListElm) return; // dummyListElm must be exist for syncing
        
        
        
        // detect the scrolling end:
        const dummyListStyle = getComputedStyle(dummyListElm);
        const frameWidth     = dummyListElm.clientWidth - (Number.parseInt(dummyListStyle.paddingLeft) || 0) - (Number.parseInt(dummyListStyle.paddingRight ) || 0);
        if ((dummyListElm.scrollLeft % frameWidth) >= 0.5) return; // scrolling fragment is (almost) zero => it's the moment of syncing listElm to dummyListElm
        
        
        
        // mark the sliding status:
        slidingStatus.current = SlidingStatus.Passive;
        
        
        
        // conditions:
        if (!dummyDiff.current) return; // no difference => nothing to sync
        
        
        
        // sync listElm scrolling position to dummyListElm scrolling position:
        cloneDummyToList();
    });
    
    const listHandleTouchStart    = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        if (event.touches.length !== 1) return; // ignore multi touches
        
        
        
        // set the initial touch pos to detect the movement direction later:
        initialTouchTick.current = performance.now();
        const touchPos = event.touches[0].pageX;
        initialTouchPos.current = touchPos;
        prevTouchPos.current = touchPos;
        
        
        
        // get the shown listItem's index by position:
        const listStyle  = getComputedStyle(listElm);
        const frameWidth = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
        touchedItemIndex.current = Math.round(listElm.scrollLeft / frameWidth);
    });
    const listHandleTouchMove     = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        if (slidingStatus.current === SlidingStatus.AutoScrolling) return; // protect from messy scrolling
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        if (event.touches.length !== 1) return; // ignore multi touches
        
        
        
        // track the touch pos direction:
        const oldTouchPos         = initialTouchPos.current;
        const newTouchPos         = event.touches[0].pageX;
        
        const touchDirection      = initialTouchPos.current - prevTouchPos.current; // calculate the direction before updating the prev
        const touchDirectionDelta = prevTouchPos.current - newTouchPos;             // calculate the direction before updating the prev
        prevTouchPos.current      = newTouchPos;                                    // update the prev
        
        
        
        // mark the sliding status:
        if (slidingStatus.current !== SlidingStatus.FollowsPointer) {
            if (!(Math.abs(touchDirection) >= _defaultSlideThreshold)) return; // the slide distance is too small => not considered a sliding_action
            slidingStatus.current = SlidingStatus.FollowsPointer; // the slide distance is long enough => start a sliding_action
            
            
            
            // temporary disable the snapScroll on listElm & dummyListElm so it can follow our scroll implementation:
            enableFreeScrolling(true);
        } // if
        
        
        
        // detect the movement direction:
        const isLtr = (getComputedStyle(listElm).direction === 'ltr');
        let isPositiveMovement : boolean|null = null;
        if (newTouchPos > oldTouchPos) {      // move to right
            isPositiveMovement = isLtr;
        }
        else if (newTouchPos < oldTouchPos) { // move to left
            isPositiveMovement = !isLtr;
        } // if
        
        
        
        // detect if not already been shifted:
        if ((isPositiveMovement !== null) && (touchedItemIndex.current !== (isPositiveMovement ? (itemsCount - 1) : 0))) {
            // decide the shift amount of dummyListElm:
            const shiftAmount = touchedItemIndex.current + (isPositiveMovement ? 1 : 0);
            // mutate the listItem(s):
            cloneDummyToList((isPositiveMovement ? itemsCount : 0) - shiftAmount, isPositiveMovement);
            
            
            
            // update the shifted listItem's index:
            touchedItemIndex.current = isPositiveMovement ? (itemsCount - 1) : 0;
        } // if
        
        
        
        // scroll implementation:
        listElm.scrollLeft += calculateScrollLimit(touchDirectionDelta);
    });
    const listHandleTouchEnd      = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        if (slidingStatus.current !== SlidingStatus.FollowsPointer) return; // only process `FollowsPointer`
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        if (event.touches.length !== 0) return; // ignore multi touches
        
        
        
        // get the listItem's frame width:
        const listStyle  = getComputedStyle(listElm);
        const frameWidth = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
        
        
        
        // scroll implementation:
        const touchDirection = initialTouchPos.current - prevTouchPos.current;
        const touchDuration = performance.now() - initialTouchTick.current;
        if ((Math.abs(touchDirection) >= _defaultSwipeMovementThreshold) && (touchDuration <= _defaultSwipeDurationThreshold)) {
            const restScroll          = calculateScrollLimit(frameWidth * ((touchDirection > 0) ? 1 : -1));
            if (Math.abs(restScroll) >= 0.5) {
                // mark the sliding status:
                slidingStatus.current = SlidingStatus.AutoScrolling;
                
                
                
                const finishingScrollLeft = listElm.scrollLeft + restScroll;
                
                // update the nearest listItem's index:
                touchedItemIndex.current = Math.round(finishingScrollLeft / frameWidth);
                // snap scroll to the nearest fragment step:
                listElm.scrollTo({
                    left     : touchedItemIndex.current * frameWidth,
                    behavior : 'smooth',
                });
                
                
                
                return; // no need to *auto scroll completation*:
            } // if
        } // if
        
        
        
        // the *auto scroll completation*:
        // get the shown listItem's index by position:
        if ((listElm.scrollLeft % frameWidth) >= 0.5) { // not an exact step (fragment step) => need scroll to nearest fragment step
            // mark the sliding status:
            slidingStatus.current = SlidingStatus.AutoScrolling;
            
            
            
            // update the nearest listItem's index:
            touchedItemIndex.current = Math.round(listElm.scrollLeft / frameWidth);
            // snap scroll to the nearest fragment step:
            listElm.scrollTo({
                left     : touchedItemIndex.current * frameWidth,
                behavior : 'smooth',
            });
        }
        else { // an exact step (fragment step) => restore the CSS snapScroll
            // restore the CSS snapScroll on listElm & dummyListElm:
            enableFreeScrolling(false);
            
            
            
            // mark the sliding status:
            slidingStatus.current = SlidingStatus.Passive;
        } // if
    });
    const listHandleScroll        = useEvent<React.UIEventHandler<TElement>>((event) => {
        // conditions:
        if ((slidingStatus.current !== SlidingStatus.AutoScrolling) && (slidingStatus.current !== SlidingStatus.FollowsPointer)) return; // only process `AutoScrolling`|`FollowsPointer` state
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        
        
        // sync listElm scroll to dummyListElm:
        const dummyListElm = dummyListRefInternal.current;
        if (dummyListElm) { // dummyListElm must be exist for syncing
            const dummyScrollPosMax        = dummyListElm.scrollWidth - dummyListElm.clientWidth;
            const listScrollPosMax         = listElm.scrollWidth - listElm.clientWidth;
            const dummyScale               = dummyScrollPosMax / listScrollPosMax;
            const dummyScrollPosScaled     = listElm.scrollLeft * dummyScale;
            const dummyDiffPhysc           = dummyDiff.current * dummyListElm.clientWidth;                  // converts logical diff to physical diff
            const dummyScrollPosOverflowed = dummyScrollPosScaled + dummyDiffPhysc;                         // scroll pos + diff
            const dummyScrollPosPerioded   = periodify(dummyScrollPosOverflowed, dummyListElm.scrollWidth); // wrap overflowed left
            const dummyScrollPosWrapped    = (
                Math.min(dummyScrollPosPerioded, listScrollPosMax)         // limits from 0 to `listScrollPosMax`
                -
                (
                    Math.max(dummyScrollPosPerioded - listScrollPosMax, 0) // the excess (if any)
                    /
                    dummyListElm.clientWidth                               // based scale to the frameWidth
                    *
                    dummyScrollPosMax                                      // will be used to scroll back to beginning
                )
            );
            
            dummyListElm.scrollLeft = Math.round(dummyScrollPosWrapped);   // no fractional pixel
        } // if
        
        
        
        // detect the scrolling end:
        if (slidingStatus.current === SlidingStatus.AutoScrolling) {
            const listStyle  = getComputedStyle(listElm);
            const frameWidth = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
            if (!((listElm.scrollLeft % frameWidth) >= 0.5)) { // scrolling fragment is (almost) zero => it's the moment of a scrolling end
                // restore the CSS snapScroll on listElm & dummyListElm:
                enableFreeScrolling(false);
                
                
                
                // mark the sliding status:
                slidingStatus.current = SlidingStatus.Passive;
            } // if
        } // if
    });
    
    
    
    // jsx:
    return React.cloneElement<BasicProps<TElement>>(basicComponent,
        // props:
        {
            // other props:
            ...restBasicProps,
            ...basicComponent.props, // overwrites restBasicProps (if any conflics)
            
            
            
            // classes:
            mainClass : basicComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
        },
        
        
        
        // children:
        basicComponent.props.children ?? (<>
            {children && <>
                {/* .list */}
                <Generic<TElement>
                    // refs:
                    elmRef={mergedListRef}
                    
                    
                    
                    // semantics:
                    tag='ul'
                    
                    
                    
                    // classes:
                    classes={_defaultListElmClasses}
                    
                    
                    
                    // handlers:
                    onTouchStart  = {listHandleTouchStart}
                    onTouchMove   = {listHandleTouchMove }
                    onTouchEnd    = {listHandleTouchEnd  }
                    onScroll      = {listHandleScroll    }
                >
                    {React.Children.map(children, (child, index) => {
                        // conditions:
                        if ((child === undefined) || (child === null) || (child === true) || (child === false)) return child; // ignore nullish child
                        
                        
                        
                        /* wrap child with .item */
                        return (
                            <Generic<TElement>
                                // identifiers:
                                key={index}
                                
                                
                                
                                // semantics:
                                tag='li'
                            >
                                {child}
                            </Generic>
                        );
                    })}
                </Generic>
                
                {/* .dummy */}
                {infiniteLoop && <Generic<TElement>
                    // refs:
                    elmRef={mergedDummyListRef}
                    
                    
                    
                    // semantics:
                    aria-hidden={true} // just a dummy element, no meaningful content here
                    
                    
                    
                    // classes:
                    classes={_defaultDummyListElmClasses}
                    
                    
                    
                    // handlers:
                    onScroll={dummyHandleScroll}
                >
                    {React.Children.map(children, (child, index) => {
                        // conditions:
                        if ((child === undefined) || (child === null) || (child === true) || (child === false)) return child; // ignore nullish child
                        
                        
                        
                        /* convert child to .dummy-item */
                        return (
                            <div
                                // identifiers:
                                key={index}
                            />
                        );
                    })}
                </Generic>}
            </>}
            
            {React.cloneElement<ButtonProps>(prevButtonComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...prevButtonComponent.props,
                    
                    
                    
                    // variants:
                    size        : prevButtonComponent.props.size        ?? basicVariantProps.size     ?? 'lg',
                    gradient    : prevButtonComponent.props.gradient    ?? basicVariantProps.gradient ?? true,
                    buttonStyle : prevButtonComponent.props.buttonStyle ?? 'ghost',
                    
                    
                    
                    // classes:
                    classes     : mergedPrevButtonClasses,
                    
                    
                    
                    // accessibilities:
                    label       : prevButtonComponent.props.label ?? 'Previous',
                    
                    
                    
                    // handlers:
                    onClick     : handlePrevClick,
                },
            )}
            
            {React.cloneElement<ButtonProps>(nextButtonComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...nextButtonComponent.props,
                    
                    
                    
                    // variants:
                    size        : nextButtonComponent.props.size        ?? basicVariantProps.size     ?? 'lg',
                    gradient    : nextButtonComponent.props.gradient    ?? basicVariantProps.gradient ?? true,
                    buttonStyle : prevButtonComponent.props.buttonStyle ?? 'ghost',
                    
                    
                    
                    // classes:
                    classes     : mergedNextButtonClasses,
                    
                    
                    
                    // accessibilities:
                    label       : nextButtonComponent.props.label ?? 'Next',
                    
                    
                    
                    // handlers:
                    onClick     : handleNextClick,
                },
            )}
            
            {React.cloneElement<NavscrollProps<Element>>(navscrollComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...navscrollComponent.props,
                    
                    
                    
                    // variants:
                    orientation            : navscrollComponent.props.orientation ?? 'inline',
                    outlined               : navscrollComponent.props.outlined    ?? basicVariantProps.outlined ?? true,
                    listStyle              : navscrollComponent.props.listStyle   ?? 'bullet',
                    
                    
                    
                    // classes:
                    classes                : mergedNavscrollClasses,
                    
                    
                    
                    // scrolls:
                    scrollingOf            : navscrollComponent.props.scrollingOf            ?? (infiniteLoop ? dummyListRefInternal : listRefInternal),
                    scrollingInterpolation : navscrollComponent.props.scrollingInterpolation ?? true,
                },
                
                
                
                // children:
                navscrollComponent.props.children ?? React.Children.map(children, (child, index) => {
                    // conditions:
                    if ((child === undefined) || (child === null) || (child === true) || (child === false)) return child; // ignore nullish child
                    
                    
                    
                    /* convert child to button */
                    return (
                        <ListItem
                            // identifiers:
                            key={index}
                            
                            
                            
                            // semantics:
                            tag='button'
                            
                            
                            
                            // accessibilities:
                            {...(React.isValidElement<React.HTMLAttributes<HTMLElement>>(child) ? ({
                                title : child.props.title,
                            } as React.HTMLAttributes<HTMLElement>) : null)}
                        />
                    );
                }),
            )}
        </>),
    );
};
export {
    Carousel,
    Carousel as default,
}
