// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
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
    useIsomorphicLayoutEffect,
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
    
    
    
    // a capability of UI to scroll/switch its contents:
    ScrollIndexChangeEvent,
    ScrollableProps,
    ControllableScrollableProps,
    UncontrollableScrollableProps,
    useUncontrollableScrollable,
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

const _defaultScrollingPrecision     : number = 0.5 /* pixel */

const _defaultMovementStep           : number = 1   /* step(s) */



// utilities:
const noInterceptMark = Symbol('no intercept');



// styles:
export const useCarouselStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'v35mas3qt6' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface CarouselProps<TElement extends HTMLElement = HTMLElement, TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>
    extends
        // bases:
        BasicProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // states:
        ScrollableProps<TScrollIndexChangeEvent>,
        ControllableScrollableProps<TScrollIndexChangeEvent>,
        UncontrollableScrollableProps<TScrollIndexChangeEvent>,
        
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
const Carousel = <TElement extends HTMLElement = HTMLElement, TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>(props: CarouselProps<TElement, TScrollIndexChangeEvent>): JSX.Element|null => {
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
        
        
        
        // states:
        defaultScrollIndex  : _defaultScrollIndex,  // take, to be handled by `useUncontrollableScrollable`
        scrollIndex         : _scrollIndex,         // take, to be handled by `useUncontrollableScrollable`
        onScrollIndexChange : _onScrollIndexChange, // take, to be handled by `useUncontrollableScrollable`
        
        
        
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
    const dummyDiff                 = useRef<number>(0);
    
    const touchedItemIndex          = useRef<number>(0);
    const optimizedTouchedItemIndex = useRef<number>(0);
    
    const initialTouchTick          = useRef<number>(0);
    const initialTouchPos           = useRef<number>(0);
    const prevTouchPos              = useRef<number>(0);
    
    const prevScrollPos             = useRef<number>(0);
    const restScrollMomentum        = useRef<number>(0);
    const ranScrollMomentum         = useRef<number>(0);
    
    const signalScrolled            = useRef<(() => void)|undefined>(undefined);
    const enum SlidingStatus {
        Passive        = 0,
        Calibrate      = 1,
        AutoScrolling  = 2,
        FollowsPointer = 3,
    }
    const slidingStatus             = useRef<SlidingStatus>(SlidingStatus.Passive);
    
    const [scrollIndex, setScrollIndex] = useUncontrollableScrollable<TScrollIndexChangeEvent>(props, {
        min  : 0,
        max  : (itemsCount - 1),
        step : undefined,
    });
    
    
    
    // utility functions:
    const periodify                  = (value: number, period: number) => {
        return ((value % period) + period) % period;
    };
    const normalizeShift             = (shift: number) => {
        // conditions:
        if (!itemsCount) return shift;
        
        
        
        return periodify(shift, itemsCount);
    };
    
    // measuring functions:
    const getSlideDistance           = (listElm: TElement) => {
        // get the listItem's slide distance:
        const listScrollPosMax  = listElm.scrollWidth - listElm.clientWidth;
        return itemsCount ? (listScrollPosMax / (itemsCount - 1)) : 0;
    };
    const isExactScrollPos           = (listElm: TElement) => {
        const listSlideDistance = getSlideDistance(listElm);
        const rest = listElm.scrollLeft % listSlideDistance;
        return (rest < _defaultScrollingPrecision) || ((listSlideDistance - rest) < _defaultScrollingPrecision);
    };
    const getNearestScrollIndex      = (listElm: TElement) => {
        return Math.round(listElm.scrollLeft / getSlideDistance(listElm));
    };
    const calculateScrollLimit       = (deltaScroll: number) => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return deltaScroll; // listElm must be exist to manipulate
        
        
        
        const listSlideDistance = getSlideDistance(listElm);
        const limitedScrollMin  = ((touchedItemIndex.current - 1) * listSlideDistance) - listElm.scrollLeft;
        const limitedScrollMax  = ((touchedItemIndex.current + 1) * listSlideDistance) - listElm.scrollLeft;
        return Math.min(Math.max(
            deltaScroll,
        limitedScrollMin), limitedScrollMax);
    };
    const measureScrollDelta         = (listElm: TElement) => {
        // logs:
        const oldScrollPos    = prevScrollPos.current;
        const newScrollPos    = listElm.scrollLeft;
        const deltaScrollPos  = newScrollPos - oldScrollPos;
        prevScrollPos.current = newScrollPos; // update the pos change
        
        return deltaScrollPos;
    };
    const isNearZeroScrollMomentum   = () => {
        return Math.abs(restScrollMomentum.current) < 0.1; // the precision is quite poor, it may be uncertain up to 0.05, so we set to 0.1 for a safer margin
    };
    
    // mutation functions:
    const setRelativeScrollPos       = async (baseListElm: TElement|undefined, targetListElm: TElement, targetScrollDiff: number) => {
        const targetScrollPosMax            = targetListElm.scrollWidth - targetListElm.clientWidth;
        const baseScrollPosMax              = baseListElm ? (baseListElm.scrollWidth - baseListElm.clientWidth) : targetScrollPosMax;
        const targetScale                   = targetScrollPosMax / baseScrollPosMax;
        const targetScrollPosScaled         = (baseListElm?.scrollLeft ?? 0) * targetScale;
        const targetSlideDistance           = itemsCount ? (targetScrollPosMax / (itemsCount - 1)) : 0;
        const targetScrollPosDiff           = targetScrollDiff * targetSlideDistance; // converts logical diff to physical diff
        const targetScrollPosOverflowed     = (
            // scroll pos:
            targetScrollPosScaled
            +
            // diff:
            targetScrollPosDiff
            +
            // progressing:
            ((targetListElm === listRefInternal.current) ?
                ranScrollMomentum.current * targetSlideDistance
            : 0)
        );
        const targetScrollPosPerioded       = periodify(targetScrollPosOverflowed, (targetScrollPosMax + targetSlideDistance)); // wrap overflowed left
        const targetScrollPosWrapped        = (
            // range from 0 to `targetScrollPosMax`:
            Math.min(targetScrollPosPerioded, targetScrollPosMax)
            
            -
            
            // range from `targetScrollPosMax` to rest:
            (
                Math.max(targetScrollPosPerioded - targetScrollPosMax, 0)
                /
                targetSlideDistance // normalize scale to the `targetSlideDistance`, so the scale should between 0 and 1
                *
                targetScrollPosMax  // will be used to scroll back from ending to beginning
            )
        );
        const targetScrollPosWrappedRounded = Math.round(targetScrollPosWrapped); // no fractional pixel
        
        
        
        // adjustment:
        if (Math.abs(targetListElm.scrollLeft - targetScrollPosWrappedRounded) >= _defaultScrollingPrecision) { // a significant movement detected
            // mark the sliding status:
            const originSlidingStatus = slidingStatus.current;
            if (originSlidingStatus === SlidingStatus.Passive) slidingStatus.current = SlidingStatus.Calibrate;
            try {
                const promiseScrolled = (
                    (targetListElm === listRefInternal.current)
                    ? new Promise<void>((resolved) => {
                        signalScrolled.current?.();        // invoke previous pending_callback (if any)
                        signalScrolled.current = resolved; // setup a new pending_callback
                    })
                    : null
                );
                
                targetListElm.scrollLeft = targetScrollPosWrappedRounded;
                if (targetListElm === listRefInternal.current) prevScrollPos.current = targetListElm.scrollLeft; // update the pos change
                
                // a delay time to ensure the scroll calibration has fully settled & the `onScroll` event has fired (it's safe to scroll further):
                await promiseScrolled;
            }
            finally {
                // mark the sliding status:
                slidingStatus.current = originSlidingStatus;
            } // try
        } // if
    };
    const setRelativeShiftPos        = (baseShift: number|undefined, targetListElm: TElement, targetShiftDiff: number) => {
        // conditions:
        
        if (!itemsCount) return; // empty items => nothing to shift
        
        const relativeShift = normalizeShift((baseShift ?? (itemsCount - dummyDiff.current)) + targetShiftDiff);
        if (!relativeShift) return; // no difference => nothing to shift
        
        
        
        // decide which side to be moved (the least effort):
        const moveNextSide = (relativeShift > (itemsCount / 2)); // determine the smallest slide(s) to migrate
        if (moveNextSide) { // move the right slide(s) to the left_most
            Array.from(targetListElm.childNodes).slice(-(itemsCount - relativeShift))              // take nth elements from the right
            .reverse()                                                                             // inserting at the beginning causes the inserted items to be reversed, so we're re-reversing them to keep the order
            .forEach((item) => targetListElm.insertBefore(item, targetListElm.firstElementChild)); // insert the items at the beginning
        }
        else { // move the left slide(s) to the right_most
            Array.from(targetListElm.childNodes).slice(0, relativeShift) // take nth elements from the left
            .forEach((item) => targetListElm.append(item));              // insert the items at the end
        } // if
        
        
        
        // update the diff of listElm & dummyListElm:
        dummyDiff.current = normalizeShift(dummyDiff.current + relativeShift);
    };
    const normalizeListScrollPos     = async (currentDummyListElm?: TElement) => {
        // conditions:
        const dummyListElm = currentDummyListElm ?? dummyListRefInternal.current;
        if (!dummyListElm) return; // dummyListElm must be exist for syncing
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        
        
        // normalize scroll pos as seen on dummyListElm (navigation indicator):
        if (dummyDiff.current) { // has difference => need to sync
            // shift the current image similar to the dummyListElm, so we can scroll the listElm as the same effect as dummyListElm (creates a clone scroll):
            setRelativeShiftPos(
                /*baseShift        :*/ undefined,
                /*targetListElm    :*/ listElm,
                /*targetShiftDiff  :*/ 0,
            );
        } // if
        
        
        
        // immediately scroll to the correct position, so that the visual_current_image appears not_moving (as seen before scrolled):
        await setRelativeScrollPos(
            /*baseListElm      :*/ dummyListElm,
            
            /*targetListElm    :*/ listElm,
            /*targetScrollDiff :*/ (itemsCount - dummyDiff.current),
        );
    };
    
    // navigation functions:
    const getOptimalIndexForMovement = (currentItemIndex: number|undefined, movementItemIndex: number) => {
        const maxItemIndex = (itemsCount - 1);
        if (maxItemIndex <= 0) return 0; // the listItems(s) are impossible to move => always return 0
        
        const futureItemIndex          = scrollIndex            + movementItemIndex; // predict the future index, regardless the range
        const clampedFutureItemIndex   = Math.min(Math.max(
            futureItemIndex,
        /*minItemIndex: */0), maxItemIndex);
        
        if (currentItemIndex === undefined) currentItemIndex = normalizeShift(scrollIndex /* === currentDummyItemIndex */ - dummyDiff.current); // if not specified => calculate the list_item_index based from dummy_item_index
        const progressingScrollIndex       = normalizeShift(scrollIndex - dummyDiff.current);
        const progressingMovementItemIndex = progressingScrollIndex - currentItemIndex;
        
        const previousItemIndex        = clampedFutureItemIndex - movementItemIndex - progressingMovementItemIndex; // predict the past index, regardless the range
        const clampedPreviousItemIndex = Math.min(Math.max(
            previousItemIndex,
        /*minItemIndex: */0), maxItemIndex);
        
        console.log({prog: progressingMovementItemIndex, past: previousItemIndex, pastC: clampedPreviousItemIndex, optim: clampedPreviousItemIndex, target: normalizeShift(scrollIndex + movementItemIndex) })
        return clampedPreviousItemIndex;
    };
    const prepareScrolling           = async (currentItemIndex: number, isPositiveMovement: boolean): Promise<number> => {
        // conditions:
        if (!infiniteLoop) return currentItemIndex; // a NON infinite loop => NO need to rearrange slide(s) positions
        
        const listElm = listRefInternal.current;
        if (!listElm) return currentItemIndex; // listElm must be exist to manipulate
        
        
        
        // the new index:
        const optimalItemIndex = getOptimalIndexForMovement(currentItemIndex, isPositiveMovement ? +_defaultMovementStep : -_defaultMovementStep);
        
        
        
        // shift the current image to the last|first, so we can scroll the listElm further_backward|further_forward (creates an infinite scroll illusion):
        setRelativeShiftPos(
            /*baseShift        :*/ 0,
            /*targetListElm    :*/ listElm,
            /*targetShiftDiff  :*/ currentItemIndex + (itemsCount - optimalItemIndex),
        );
        
        // immediately scroll to last|first index (it will scroll to step_backward_once|step_forward_once):
        await setRelativeScrollPos(
            /*baseListElm      :*/ undefined,
            
            /*targetListElm    :*/ listElm,
            /*targetScrollDiff :*/ optimalItemIndex,
        );
        
        
        
        // update the shifted listItem's index:
        return optimalItemIndex;
    };
    const performScrolling           = (currentItemIndex: number|undefined, futureItemIndex: number): void => {
        // conditions:
        const maxItemIndex = (itemsCount - 1);
        if ((futureItemIndex < 0) || (futureItemIndex > maxItemIndex)) return; // out of range => ignore
        
        if ((currentItemIndex !== undefined) && (currentItemIndex === futureItemIndex)) return; // no diff => ignore
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        
        
        // calculate the desired index:
        if (currentItemIndex === undefined) currentItemIndex = normalizeShift(scrollIndex /* === currentDummyItemIndex */ - dummyDiff.current); // if not specified => calculate the list_item_index based from dummy_item_index
        const movementItemIndex = futureItemIndex - currentItemIndex;
        
        
        
        if (!movementItemIndex) {
            // TODO: uncomment
            // // // if no movement => restore (scroll snap) to current index:
            // // 
            // // // calculate the desired pos:
            // // const slideDistance            = getSlideDistance(listElm);
            // // const revertScrollLeftAbsolute = currentItemIndex * slideDistance;
            // // const revertScrollLeftRelative = revertScrollLeftAbsolute - /*currentScrollLeftAbsolute = */listElm.scrollLeft;
            // // if (Math.abs(revertScrollLeftRelative) >= _defaultScrollingPrecision) { // a significant movement detected
            // //     // mark the sliding status:
            // //     slidingStatus.current = SlidingStatus.AutoScrolling;
            // //     
            // //     // snap scroll to the desired scrollIndex:
            // //     restScrollMomentum.current = (revertScrollLeftRelative / slideDistance);
            // //     listElm.scrollTo({
            // //         left                     : revertScrollLeftAbsolute,
            // //         behavior                 : 'smooth',
            // //         
            // //         [noInterceptMark as any] : undefined, // no intercept call hack
            // //     });
            // // } // if
        }
        else {
            // update the scrollIndex (and re-render):
            setScrollIndex((currentScrollIndex) => normalizeShift(
                currentScrollIndex // the current scroll index
                +
                movementItemIndex  // the item movement
            ));
        } // if
    };
    
    
    
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
    const handlePrevClickInternal  = useEvent<React.MouseEventHandler<HTMLButtonElement>>(async (event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        // TODO: delete
        // if (slidingStatus.current === SlidingStatus.AutoScrolling) return; // protect from messy scrolling
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        // all necessary task will be performed, no further action needed:
        event.preventDefault();
        
        
        
        // get the shown listItem's index by position:
        const currentItemIndex = getNearestScrollIndex(listElm);
        
        
        
        // prepare to scrolling by rearrange slide(s) positions & then update current slide index:
        const optimizedCurrentItemIndex = await prepareScrolling(currentItemIndex, /*isPositiveMovement = */false);
        let futureItemIndex = optimizedCurrentItemIndex - 1;
        if (futureItemIndex < 0) futureItemIndex = (itemsCount - 1); // scroll to the last slide (for non_infinite_loop)
        
        
        
        // scroll implementation:
        
        // scroll to previous neighbor step:
        performScrolling(optimizedCurrentItemIndex, futureItemIndex);
    });
    const handlePrevClick          = useMergeEvents(
        // preserves the original `onClick` from `prevButtonComponent`:
        prevButtonComponent.props.onClick,
        
        
        
        // actions:
        handlePrevClickInternal,
    );
    
    const handleNextClickInternal  = useEvent<React.MouseEventHandler<HTMLButtonElement>>(async (event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        // TODO: delete
        // if (slidingStatus.current === SlidingStatus.AutoScrolling) return; // protect from messy scrolling
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        // all necessary task will be performed, no further action needed:
        event.preventDefault();
        
        
        
        // get the shown listItem's index by position:
        const currentItemIndex = getNearestScrollIndex(listElm);
        
        
        
        // prepare to scrolling by rearrange slide(s) positions & then update current slide index:
        const optimizedCurrentItemIndex = await prepareScrolling(currentItemIndex, /*isPositiveMovement = */true);
        let futureItemIndex = optimizedCurrentItemIndex + 1;
        if (futureItemIndex > (itemsCount - 1)) futureItemIndex = 0; // scroll to the first slide (for non_infinite_loop)
        
        
        
        // scroll implementation:
        
        // scroll to next neighbor step:
        performScrolling(optimizedCurrentItemIndex, futureItemIndex);
    });
    const handleNextClick          = useMergeEvents(
        // preserves the original `onClick` from `nextButtonComponent`:
        nextButtonComponent.props.onClick,
        
        
        
        // actions:
        handleNextClickInternal,
    );
    
    const dummyHandleScroll        = useEvent(() => {
        // conditions:
        if (slidingStatus.current !== SlidingStatus.Passive) return; // only process `Passive`
        
        
        
        // normalize listElm scroll pos as seen on dummyListElm (navigation indicator), without changing the visual_current_image:
        normalizeListScrollPos();
    });
    
    const handleTouchStartInternal = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        if (event.touches.length !== 1) return; // ignore multi touches
        
        
        
        // set the initial touch pos to detect the movement direction later:
        initialTouchTick.current = performance.now();
        const touchPos = event.touches[0].pageX;
        initialTouchPos.current = touchPos;
        prevTouchPos.current = touchPos;
        
        
        
        // get the shown listItem's index by position:
        touchedItemIndex.current = getNearestScrollIndex(listElm);
    });
    const handleTouchStart         = useMergeEvents(
        // preserves the original `onTouchStart`:
        props.onTouchStart,
        
        
        
        // actions:
        handleTouchStartInternal,
    );
    const handleTouchMoveInternal  = useEvent<React.TouchEventHandler<TElement>>(async (event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        // TODO: delete
        // if (slidingStatus.current === SlidingStatus.AutoScrolling) return; // protect from messy scrolling
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        if (event.touches.length !== 1) return; // ignore multi touches
        
        
        
        // track the touch pos direction:
        const oldTouchPos         = initialTouchPos.current;
        const newTouchPos         = event.touches[0].pageX;
        
        const touchDirection      = initialTouchPos.current - prevTouchPos.current; // calculate the direction before updating the prev
        const touchDirectionDelta = prevTouchPos.current - newTouchPos;             // calculate the direction before updating the prev
        prevTouchPos.current      = newTouchPos;                                    // update the prev
        
        
        
        // conditions:
        if (slidingStatus.current !== SlidingStatus.FollowsPointer) {
            if (!(Math.abs(touchDirection) >= _defaultSlideThreshold)) return; // the slide distance is too small => not considered a sliding_action
        } // if
        
        
        
        // detect the movement direction:
        const isLtr = (getComputedStyle(listElm).direction === 'ltr');
        let isPositiveMovement : boolean|null = null;
        if (newTouchPos > oldTouchPos) {      // move to right
            isPositiveMovement = !isLtr;
        }
        else if (newTouchPos < oldTouchPos) { // move to left
            isPositiveMovement = isLtr;
        } // if
        
        
        
        // detect if not already been shifted:
        if ((isPositiveMovement !== null) && (optimizedTouchedItemIndex.current !== getOptimalIndexForMovement(touchedItemIndex.current, isPositiveMovement ? +_defaultMovementStep : -_defaultMovementStep))) {
            // TODO: remove log
            const progressingScrollIndex = normalizeShift(scrollIndex - dummyDiff.current);
            console.log({ ran: ranScrollMomentum.current, restMomentum: restScrollMomentum.current, progress: progressingScrollIndex, touchIndex: touchedItemIndex.current })
            
            // prepare to scrolling by rearrange slide(s) positions & then update current slide index:
            optimizedTouchedItemIndex.current = await prepareScrolling(touchedItemIndex.current, isPositiveMovement);
        } // if
        
        
        
        // mark the sliding status:
        slidingStatus.current = SlidingStatus.FollowsPointer; // the slide distance is long enough => start a sliding_action
        
        
        
        // TODO: uncomment
        // // // scroll implementation:
        // // listElm.scrollLeft += calculateScrollLimit(touchDirectionDelta);
        // // prevScrollPos.current = listElm.scrollLeft; // update the pos change
    });
    const handleTouchMove          = useMergeEvents(
        // preserves the original `onTouchMove`:
        props.onTouchMove,
        
        
        
        // actions:
        handleTouchMoveInternal,
    );
    const handleTouchEndInternal   = useEvent<React.TouchEventHandler<TElement>>(async (event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // a macroTask delay to make sure the `touchend` event is executed *after* `touchmove`:
        await new Promise<void>((resolved) => setTimeout(resolved, 0));
        
        
        
        // conditions:
        if (slidingStatus.current !== SlidingStatus.FollowsPointer) return; // only process `FollowsPointer`
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        if (event.touches.length !== 0) return; // ignore multi touches
        
        
        
        // get the listItem's slide distance:
        const listSlideDistance = getSlideDistance(listElm);
        
        
        
        // scroll implementation:
        const touchDirection = initialTouchPos.current - prevTouchPos.current;
        const touchDuration = performance.now() - initialTouchTick.current;
        if ((Math.abs(touchDirection) >= _defaultSwipeMovementThreshold) && (touchDuration <= _defaultSwipeDurationThreshold)) {
            // TODO: begin check new alg
            const optimizedCurrentItemIndex = optimizedTouchedItemIndex.current;
            
            let futureItemIndex = optimizedCurrentItemIndex + ((touchDirection >= 0) ? +1 : -1);
            if (futureItemIndex < 0) futureItemIndex = (itemsCount - 1); // scroll to the last  slide (for non_infinite_loop)
            if (futureItemIndex > (itemsCount - 1)) futureItemIndex = 0; // scroll to the first slide (for non_infinite_loop)
            
            
            // scroll to next neighbor step:
            console.log('scrollTo: ', {from: optimizedCurrentItemIndex, to: futureItemIndex})
            performScrolling(optimizedCurrentItemIndex, futureItemIndex);
            
            
            
            return; // no need to *auto scroll completation*:
            // TODO: end check new alg
            
            
            
            // TODO: remove old alg
            // // const restScrollToNeighbor = calculateScrollLimit(listSlideDistance * ((touchDirection > 0) ? 1 : -1));
            // // if (Math.abs(restScrollToNeighbor) >= _defaultScrollingPrecision) { // a significant movement detected
            // //     // scroll to nearest neighbor step:
            // //     performScrolling(undefined, Math.round((listElm.scrollLeft + restScrollToNeighbor) / listSlideDistance));
            // //     
            // //     
            // //     
            // //     return; // no need to *auto scroll completation*:
            // // } // if
        } // if
        
        
        
        // TODO: uncomment
        // // // the *auto scroll completation*:
        // // // get the shown listItem's index by position:
        // // if (!isExactScrollPos(listElm)) { // the listElm is NOT in the exact_position => needs to be re-aligned to the nearest exact_position
        // //     // scroll to nearest neighbor step:
        // //     performScrolling(undefined, getNearestScrollIndex(listElm));
        // // }
        // // else { // the listElm is in the exact_position => the sliding animation is completed
        // //     // mark the sliding status:
        // //     slidingStatus.current = SlidingStatus.Passive;
        // // } // if
    });
    const handleTouchEnd           = useMergeEvents(
        // preserves the original `onTouchEnd`:
        props.onTouchEnd,
        
        
        
        // actions:
        handleTouchEndInternal,
    );
    const handleTouchCancel        = useMergeEvents(
        // preserves the original `onTouchCancel`:
        props.onTouchCancel,
        
        
        
        // actions:
        handleTouchEndInternal,
    );
    
    const listHandleScroll         = useEvent<React.UIEventHandler<TElement>>(async (event) => {
        // signals:
        if (signalScrolled.current) {
            signalScrolled.current();           // invoke previous pending_callback
            signalScrolled.current = undefined; // reset pending_callback
        } // if
        
        
        
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        
        
        // measures delta scroll pos based on prev & current scroll pos:
        const deltaScrollPos = measureScrollDelta(listElm);
        
        
        
        // conditions:
        if ((slidingStatus.current !== SlidingStatus.AutoScrolling) && (slidingStatus.current !== SlidingStatus.FollowsPointer)) return; // only process `AutoScrolling`|`FollowsPointer` state
        
        
        
        // immediately scroll to the correct position, so the dummyListElm's scroll_pos is in_sync with listElm's scroll_pos:
        const dummyListElm = dummyListRefInternal.current;
        if (dummyListElm) { // dummyListElm must be exist for syncing
            await setRelativeScrollPos(
                /*baseListElm      :*/ listElm,
                
                /*targetListElm    :*/ dummyListElm,
                /*targetScrollDiff :*/ dummyDiff.current,
            );
        } // if
        
        
        
        // conditions:
        if (slidingStatus.current !== SlidingStatus.AutoScrolling) return;
        
        
        
        // accumulates scroll momentum:
        const deltaScrollMomentum = (deltaScrollPos / getSlideDistance(listElm));
        restScrollMomentum.current -= deltaScrollMomentum;
        ranScrollMomentum.current  += deltaScrollMomentum;
        console.log('rest momentum: ', restScrollMomentum.current.toFixed(4));
        
        
        
        // detect the scrolling end:
        if (!isExactScrollPos(listElm))  return; // still scrolling between steps   => wait for another scroll_step
        if (!isNearZeroScrollMomentum()) return; // still having scrolling momentum => wait for another scroll_step
        restScrollMomentum.current = 0;          // reset to true zero
        ranScrollMomentum.current  = 0;          // completed => reset too
        console.log('ZERO');
        
        
        
        // mark the sliding status:
        slidingStatus.current = SlidingStatus.Passive;
        
        
        
        // normalize listElm scroll pos as seen on dummyListElm (navigation indicator), without changing the visual_current_image:
        normalizeListScrollPos();
    });
    
    
    
    // dom effects:
    
    // initial scroll pos setup (without scrolling effect):
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        const dummyListElm   = dummyListRefInternal.current; // optional
        const primaryListElm = dummyListElm ?? listElm;      // if dummyListElm exists => use dummyListElm as the *source of truth* -otherwise- listElm
        
        
        
        // setups:
        
        // immediately scroll to the correct position, so the dummyListElm|listElm's scroll_pos is in_sync with scrollIndex:
        setRelativeScrollPos(
            /*baseListElm      :*/ undefined,
            
            /*targetListElm    :*/ primaryListElm,
            /*targetScrollDiff :*/ scrollIndex,
        );
        
        // normalize listElm scroll pos as seen on dummyListElm (navigation indicator), without changing the visual_current_image:
        if (dummyListElm) normalizeListScrollPos(dummyListElm);
        
        
        
        // cleanups:
        return () => {
            if (/*before: HAS dummyListElm*/dummyListElm && /*after: NO dummyListElm*/!dummyListRefInternal.current) { // mutation from infiniteLoop to finiteLoop: flush the dummyListElm to listElm
                // normalize listElm scroll pos as seen on dummyListElm (navigation indicator), without changing the visual_current_image:
                normalizeListScrollPos(dummyListElm);
            } // if
            
            /* no need to cleanup if no  mutation from infiniteLoop to finiteLoop */
        };
    }, [infiniteLoop]); // (re)run the setups on every time the infiniteLoop changes
    
    // changing scroll pos (with scrolling effect):
    const prevScrollIndexRef = useRef<number>(scrollIndex);     // initial
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (prevScrollIndexRef.current === scrollIndex) return; // no change => ignore
        prevScrollIndexRef.current = scrollIndex;               // update
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        
        
        // setups:
        
        // calculate the desired pos:
        const slideDistance            = getSlideDistance(listElm);
        const futureItemIndex          = normalizeShift(scrollIndex - dummyDiff.current);
        const futureScrollLeftAbsolute = futureItemIndex * slideDistance;
        const futureScrollLeftRelative = futureScrollLeftAbsolute - /*currentScrollLeftAbsolute = */listElm.scrollLeft;
        if (Math.abs(futureScrollLeftRelative) >= _defaultScrollingPrecision) { // a significant movement detected
            // mark the sliding status:
            slidingStatus.current = SlidingStatus.AutoScrolling;
            
            // snap scroll to the desired scrollIndex:
            console.log((listElm.scrollLeft > futureScrollLeftAbsolute) ? 'ERROR: ' : 'OK: ', { current: listElm.scrollLeft, future: futureScrollLeftAbsolute, ran: ranScrollMomentum.current, rest: restScrollMomentum.current  });
            restScrollMomentum.current = (futureScrollLeftRelative / slideDistance);
            listElm.scrollTo({
                left                     : futureScrollLeftAbsolute,
                behavior                 : 'smooth',
                
                [noInterceptMark as any] : undefined, // no intercept call hack
            });
        } // if
    }, [scrollIndex]); // (re)run the setups on every time the scrollIndex changes
    
    // intercepts scrollTo/scrollBy by external call:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for intercepting
        
        const dummyListElm   = dummyListRefInternal.current; // optional
        const primaryListElm = dummyListElm ?? listElm;      // if dummyListElm exists => intercepts dummyListElm -otherwise- listElm
        
        
        
        // setups:
        // backup the originals:
        const oriScrollTo = primaryListElm.scrollTo;
        const oriScrollBy = primaryListElm.scrollBy;
        
        // replace with interceptors:
        primaryListElm.scrollTo = function(this: any, leftOrOptions: number|ScrollToOptions, ...rest: any[]): void {
            // conditionally call the original:
            if ((typeof(leftOrOptions) === 'object') && (noInterceptMark in leftOrOptions)) {
                (oriScrollTo.call as any)(this, leftOrOptions, ...rest);
                
                return; // just call the original, no further intercept
            } // if
            
            
            
            // calculate the desired pos:
            const futureScrollLeftAbsolute = (typeof(leftOrOptions) === 'number') ? leftOrOptions : leftOrOptions.left;
            if (futureScrollLeftAbsolute === undefined) return; // undefined => ignore // zero => okay
            const futureScrollLeftRelative = futureScrollLeftAbsolute - /*currentScrollLeftAbsolute = */primaryListElm.scrollLeft;
            if (Math.abs(futureScrollLeftRelative) >= _defaultScrollingPrecision) { // a significant movement detected
                // update the scrollIndex (and re-render):
                setScrollIndex(futureScrollLeftAbsolute / getSlideDistance(primaryListElm)); // a fractional index is allowed
            } // if
        } as any;
        primaryListElm.scrollBy = function(this: any, leftOrOptions: number|ScrollToOptions, ...rest: any[]): void {
            // conditionally call the original:
            if ((typeof(leftOrOptions) === 'object') && (noInterceptMark in leftOrOptions)) {
                (oriScrollBy.call as any)(this, leftOrOptions, ...rest);
                
                return; // just call the original, no further intercept
            } // if
            
            
            
            // calculate the desired pos:
            const futureScrollLeftRelative = (typeof(leftOrOptions) === 'number') ? leftOrOptions : leftOrOptions.left;
            if (!futureScrollLeftRelative) return; // undefined => ignore // zero => not moving => ignore
            if (Math.abs(futureScrollLeftRelative) >= _defaultScrollingPrecision) { // a significant movement detected
                const futureScrollLeftAbsolute = futureScrollLeftRelative + /*currentScrollLeftAbsolute = */primaryListElm.scrollLeft;
                
                
                
                // update the scrollIndex (and re-render):
                setScrollIndex(futureScrollLeftAbsolute / getSlideDistance(primaryListElm)); // a fractional index is allowed
            } // if
        } as any;
        
        
        
        // cleanups:
        return () => {
            // restore the originals:
            primaryListElm.scrollTo = oriScrollTo;
            primaryListElm.scrollBy = oriScrollBy;
        };
    }, [infiniteLoop]); // (re)run the setups on every time the infiniteLoop changes
    
    
    
    // jsx:
    return React.cloneElement<BasicProps<TElement>>(basicComponent,
        // props:
        {
            // other props:
            ...restBasicProps,
            ...basicComponent.props, // overwrites restBasicProps (if any conflics)
            
            
            
            // classes:
            mainClass : basicComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
            
            
            
            // handlers:
            onTouchStart  : handleTouchStart,
            onTouchMove   : handleTouchMove,
            onTouchEnd    : handleTouchEnd,
            onTouchCancel : handleTouchCancel,
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
