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

const _defaultTouchMovementThreshold : number = 20  /* pixel */
const _defaultTouchDurationThreshold : number = 200 /* milliseconds */



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
    const dummyDiff = useRef<number>(0);
    const touchedItemIndex  = useRef<number>(0);
    
    const initialTouchTick  = useRef<number>(0);
    const initialTouchPos   = useRef<number>(0);
    const prevTouchPos      = useRef<number>(0);
    
    
    
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
        const listCurrentPos  = listElm.scrollLeft;
        const listMaxPos      = listElm.scrollWidth - listElm.clientWidth;
        const dummyMaxPos     = dummyListElm.scrollWidth - dummyListElm.clientWidth;
        const ratio           = dummyMaxPos / listMaxPos;
        const dummyCurrentPos = listCurrentPos * ratio;
        
        
        
        // setups:
        dummyListElm.scrollTo({
            left     : Math.round(
                Math.min(Math.max(
                    dummyCurrentPos
                , 0), dummyMaxPos) // make sure the `dummyCurrentPos` doesn't exceed the range of 0 - `dummyMaxPos`
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
            const dummyCurrentPos = relative ? dummyListElm.scrollLeft : 0;
            const dummyLeft       =  (typeof(optionsOrX) !== 'number') ? (optionsOrX?.left ?? 0) : optionsOrX;
            const dummyBehavior   = ((typeof(optionsOrX) !== 'number') && optionsOrX?.behavior) || 'smooth';
            
            const listMaxPos      = listElm.scrollWidth - listElm.clientWidth;
            const dummyMaxPos     = dummyListElm.scrollWidth - dummyListElm.clientWidth;
            const ratio           = listMaxPos / dummyMaxPos;
            const listCurrentPos  = dummyCurrentPos * ratio;
            const listLeft        = dummyLeft       * ratio;
            const listDiff        = ((itemsCount - dummyDiff.current) * listElm.clientWidth); // converts logical diff to physical diff
            const listLeftLoop    = listCurrentPos + listLeft + listDiff;                     // current scroll + scroll by + diff
            const listLeftAbs     = listLeftLoop % listElm.scrollWidth;                       // wrap overflowed left
            
            return {
                left     : Math.round(
                    Math.min(Math.max(
                        listLeftAbs
                    , 0), listMaxPos) // make sure the `listLeftAbs` doesn't exceed the range of 0 - `listMaxPos`
                    -
                    (relative ? listElm.scrollLeft : 0) // if relative, substract the result by the relativity
                ),
                
                behavior : dummyBehavior,
            };
        };
        
        
        
        // setups:
        
        const oriScrollBy = dummyListElm.scrollBy;
        dummyListElm.scrollBy = (function(this: TElement, optionsOrX?: ScrollToOptions|number, y?: number) {
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
    const normalizeShift       = (shift: number) => {
        // conditions:
        if (!itemsCount) return shift;
        
        
        
        return ((shift % itemsCount) + itemsCount) % itemsCount;
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
        const listCurrentPos = listElm.scrollLeft;
        
        
        
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
        const listStyle       = getComputedStyle(listElm);
        const frameWidth      = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
        const listScrollWidth = frameWidth * itemsCount;
        const listNewPos      = listCurrentPos + (frameWidth * (itemsCount - listShift));
        listElm.scrollTo({
            left     : ((listNewPos % listScrollWidth) + listScrollWidth) % listScrollWidth, // wrap pos if overflowed/underflowed
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
        
        
        
        parent.scrollBy({
            left     : scrollLeft,
            top      : scrollRight,
            behavior : 'smooth',
        });
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
        
        
        
        parent.scrollBy({
            left     : scrollLeft,
            top      : scrollRight,
            behavior : 'smooth',
        });
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
        if (!dummyDiff.current) return; // no difference => nothing to do
        
        const dummyListElm = dummyListRefInternal.current;
        if (!dummyListElm) return; // dummyListElm must be exist for syncing
        
        
        
        // set the dummyListElm's scrollPos to the correct image:
        const dummyListStyle = getComputedStyle(dummyListElm);
        const frameWidth     = dummyListElm.clientWidth - (Number.parseInt(dummyListStyle.paddingLeft) || 0) - (Number.parseInt(dummyListStyle.paddingRight ) || 0);
        if ((dummyListElm.scrollLeft % frameWidth) >= 0.5) return; // not an exact step (fragment step) => scrolling is still in progress => abort
        
        
        
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
        
        
        
        // temporary disable the snapScroll:
        listElm.style.scrollSnapType = 'none';
        listElm.style.scrollBehavior = 'auto';
    });
    const listHandleTouchMove     = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        if (event.touches.length !== 1) return; // ignore multi touches
        
        
        
        // track the touch pos direction:
        const oldTouchPos = initialTouchPos.current;
        const newTouchPos = event.touches[0].pageX;
        
        
        
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
        
        
        
        // track the touch pos direction:
        const touchDirection = prevTouchPos.current - newTouchPos; // calculate the direction before updating the prev
        prevTouchPos.current = newTouchPos;                        // update the prev
        
        
        
        // scroll implementation:
        listElm.scrollLeft         += calculateScrollLimit(touchDirection);
    });
    const listHandleTouchEnd      = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        if (event.touches.length !== 0) return; // ignore multi touches
        
        
        
        // get the listItem's frame width:
        const listStyle  = getComputedStyle(listElm);
        const frameWidth = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
        
        
        
        // scroll implementation:
        const touchDirection = initialTouchPos.current - prevTouchPos.current;
        const touchDuration = performance.now() - initialTouchTick.current;
        if ((Math.abs(touchDirection) >= _defaultTouchMovementThreshold) && (touchDuration <= _defaultTouchDurationThreshold)) {
            const restScroll    = calculateScrollLimit(frameWidth * ((touchDirection > 0) ? 1 : -1));
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
        
        
        
        // the *auto scroll completation*:
        // get the shown listItem's index by position:
        if ((listElm.scrollLeft % frameWidth) >= 0.5) { // not an exact step (fragment step) => need scroll to nearest fragment step
            // update the nearest listItem's index:
            touchedItemIndex.current = Math.round(listElm.scrollLeft / frameWidth);
            // snap scroll to the nearest fragment step:
            listElm.scrollTo({
                left     : touchedItemIndex.current * frameWidth,
                behavior : 'smooth',
            });
        }
        else { // an exact step (fragment step) => restore the CSS snapScroll
            // restore the CSS snapScroll:
            listElm.style.scrollSnapType = '';
            listElm.style.scrollBehavior = '';
        } // if
    });
    const listHandleScroll      = useEvent<React.UIEventHandler<TElement>>((event) => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        
        
        // set the listElm's scrollPos to the correct image:
        const listStyle = getComputedStyle(listElm);
        const frameWidth     = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
        if ((listElm.scrollLeft % frameWidth) >= 0.5) return; // not an exact step (fragment step) => scrolling is still in progress => abort
        
        
        
        // restore the CSS snapScroll:
        listElm.style.scrollSnapType = '';
        listElm.style.scrollBehavior = '';
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
