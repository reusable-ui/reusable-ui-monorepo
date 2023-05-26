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
        Passive        = 0,
        Calibrate      = 1,
        AutoScrolling  = 2,
        FollowsPointer = 3,
    }
    const slidingStatus     = useRef<SlidingStatus>(SlidingStatus.Passive);
    
    
    
    // utility functions:
    const periodify             = (value: number, period: number) => {
        return ((value % period) + period) % period;
    };
    const normalizeShift        = (shift: number) => {
        // conditions:
        if (!itemsCount) return shift;
        
        
        
        return periodify(shift, itemsCount);
    };
    
    // measuring functions:
    const getSlideDistance      = (listElm: TElement) => {
        // get the listItem's slide distance:
        const listScrollPosMax  = listElm.scrollWidth - listElm.clientWidth;
        return itemsCount ? (listScrollPosMax / (itemsCount - 1)) : 0;
    };
    const isExactScrollPos      = (listElm: TElement) => {
        return (listElm.scrollLeft % getSlideDistance(listElm)) < 0.5;
    };
    const getNearestScrollIndex = (listElm: TElement) => {
        return Math.round(listElm.scrollLeft / getSlideDistance(listElm));
    };
    const calculateScrollLimit  = (deltaScroll: number) => {
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
    
    // mutation functions:
    const setRelativeScrollPos  = async (baseListElm: TElement|undefined, targetListElm: TElement, targetScrollDiff: number) => {
        const targetScrollPosMax        = targetListElm.scrollWidth - targetListElm.clientWidth;
        const baseScrollPosMax          = baseListElm ? (baseListElm.scrollWidth - baseListElm.clientWidth) : targetScrollPosMax;
        const targetScale               = targetScrollPosMax / baseScrollPosMax;
        const targetScrollPosScaled     = (baseListElm?.scrollLeft ?? 0) * targetScale;
        const targetSlideDistance       = itemsCount ? (targetScrollPosMax / (itemsCount - 1)) : 0;
        const targetScrollPosDiff       = targetScrollDiff * targetSlideDistance;                          // converts logical diff to physical diff
        const targetScrollPosOverflowed = targetScrollPosScaled + targetScrollPosDiff;                     // scroll pos + diff
        const targetScrollPosPerioded   = periodify(targetScrollPosOverflowed, (targetScrollPosMax + targetSlideDistance)); // wrap overflowed left
        const targetScrollPosWrapped    = (
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
        
        
        
        // mark the sliding status:
        const originSlidingStatus = slidingStatus.current;
        if (originSlidingStatus === SlidingStatus.Passive) slidingStatus.current = SlidingStatus.Calibrate;
        try {
            targetListElm.scrollLeft = Math.round(targetScrollPosWrapped); // no fractional pixel
            
            // a delay time to ensure the scroll calibration has fully settled & the `onScroll` event has fired (it's safe to scroll further):
            await new Promise<void>((resolved) => setTimeout(resolved, 0));
        }
        finally {
            // mark the sliding status:
            slidingStatus.current = originSlidingStatus;
        } // try
    };
    const setRelativeShiftPos   = (baseShift: number|undefined, targetListElm: TElement, targetShiftDiff: number) => {
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
    
    // navigation functions:
    const prepareScrolling      = async (currentItemIndex: number, isPositiveMovement: boolean): Promise<number> => {
        // conditions:
        if (!infiniteLoop) return currentItemIndex; // a NON infinite loop => NO need to rearrange slide(s) positions
        
        const listElm = listRefInternal.current;
        if (!listElm) return currentItemIndex; // listElm must be exist to manipulate
        
        
        
        // shift the current image to the last|first, so we can scroll the listElm further_backward|further_forward (creates an infinite scroll illusion):
        setRelativeShiftPos(
            /*baseShift        :*/ 0,
            /*targetListElm    :*/ listElm,
            /*targetShiftDiff  :*/ currentItemIndex + (isPositiveMovement ? 0 : 1),
        );
        
        // immediately scroll to last|first index (it will scroll to step_backward_once|step_forward_once):
        await setRelativeScrollPos(
            /*baseListElm      :*/ undefined,
            
            /*targetListElm    :*/ listElm,
            /*targetScrollDiff :*/ (isPositiveMovement ? 0 : (itemsCount - 1)),
        );
        
        
        
        // update the shifted listItem's index:
        return (isPositiveMovement ? 0 : (itemsCount - 1));
    };
    const performScrolling      = (currentItemIndex: number|undefined, futureItemIndex: number): void => {
        // conditions:
        if ((futureItemIndex < 0) || (futureItemIndex > (itemsCount - 1))) {
            // TODO: out of range of finite scroll
            console.log('out of range!');
            return;
        } // if
        
        if ((currentItemIndex !== undefined) && (currentItemIndex === futureItemIndex)) return; // no diff => ignore
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        
        
        // mark the sliding status:
        slidingStatus.current = SlidingStatus.AutoScrolling;
        
        
        
        // make a non_zero fragment to de-confuse the scrolling end detection:
        if (isExactScrollPos(listElm) && (currentItemIndex !== undefined)) listElm.scrollLeft += (futureItemIndex > currentItemIndex) ? 1 : -1;
        
        
        
        // snap scroll to the nearest fragment step:
        listElm.scrollTo({
            left     : futureItemIndex * getSlideDistance(listElm),
            behavior : 'smooth',
        });
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
    const handlePrevClickInternal = useEvent<React.MouseEventHandler<HTMLButtonElement>>(async (event) => {
        // conditions:
        if (event.defaultPrevented) return;
        if (slidingStatus.current === SlidingStatus.AutoScrolling) return; // protect from messy scrolling
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        // all necessary task will be performed, no further action needed:
        event.preventDefault();
        
        
        
        // get the shown listItem's index by position:
        let currentItemIndex = getNearestScrollIndex(listElm);
        
        
        
        // prepare to scrolling by rearrange slide(s) positions & then update current slide index:
        currentItemIndex = await prepareScrolling(currentItemIndex, /*isPositiveMovement = */false);
        
        
        
        // scroll implementation:
        
        // scroll to previous neighbor step:
        performScrolling(currentItemIndex, currentItemIndex - 1);
    });
    const handlePrevClick         = useMergeEvents(
        // preserves the original `onClick` from `prevButtonComponent`:
        prevButtonComponent.props.onClick,
        
        
        
        // actions:
        handlePrevClickInternal,
    );
    
    const handleNextClickInternal = useEvent<React.MouseEventHandler<HTMLButtonElement>>(async (event) => {
        // conditions:
        if (event.defaultPrevented) return;
        if (slidingStatus.current === SlidingStatus.AutoScrolling) return; // protect from messy scrolling
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        // all necessary task will be performed, no further action needed:
        event.preventDefault();
        
        
        
        // get the shown listItem's index by position:
        let currentItemIndex = getNearestScrollIndex(listElm);
        
        
        
        // prepare to scrolling by rearrange slide(s) positions & then update current slide index:
        currentItemIndex = await prepareScrolling(currentItemIndex, /*isPositiveMovement = */true);
        
        
        
        // scroll implementation:
        
        // scroll to next neighbor step:
        performScrolling(currentItemIndex, currentItemIndex + 1);
    });
    const handleNextClick         = useMergeEvents(
        // preserves the original `onClick` from `nextButtonComponent`:
        nextButtonComponent.props.onClick,
        
        
        
        // actions:
        handleNextClickInternal,
    );
    
    const dummyHandleScroll       = useEvent<React.UIEventHandler<TElement>>(() => {
        // conditions:
        if (slidingStatus.current !== SlidingStatus.Passive) return; // only process `Passive`
        
        const dummyListElm = dummyListRefInternal.current;
        if (!dummyListElm) return; // dummyListElm must be exist for syncing
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        
        
        // sync dummyListElm layout to listElm:
        if (dummyDiff.current) { // has difference => need to sync
            // shift the current image similar to the dummyListElm, so we can scroll the listElm as the same effect as dummyListElm (creates a clone scroll):
            setRelativeShiftPos(
                /*baseShift        :*/ undefined,
                /*targetListElm    :*/ listElm,
                /*targetShiftDiff  :*/ 0,
            );
        } // if
        
        
        
        // immediately scroll to the correct position, so the listElm's scroll_pos is in_sync to dummyListElm's scroll_pos:
        setRelativeScrollPos(
            /*baseListElm      :*/ dummyListElm,
            
            /*targetListElm    :*/ listElm,
            /*targetScrollDiff :*/ (itemsCount - dummyDiff.current),
        );
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
        touchedItemIndex.current = getNearestScrollIndex(listElm);
    });
    const listHandleTouchMove     = useEvent(async (event: TouchEvent) => {
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
        if ((isPositiveMovement !== null) && (touchedItemIndex.current !== (isPositiveMovement ? 0 : (itemsCount - 1)))) {
            // prepare to scrolling by rearrange slide(s) positions & then update current slide index:
            touchedItemIndex.current = await prepareScrolling(touchedItemIndex.current, isPositiveMovement);
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
        
        
        
        // get the listItem's slide distance:
        const listSlideDistance = getSlideDistance(listElm);
        
        
        
        // scroll implementation:
        const touchDirection = initialTouchPos.current - prevTouchPos.current;
        const touchDuration = performance.now() - initialTouchTick.current;
        if ((Math.abs(touchDirection) >= _defaultSwipeMovementThreshold) && (touchDuration <= _defaultSwipeDurationThreshold)) {
            const restScroll = calculateScrollLimit(listSlideDistance * ((touchDirection > 0) ? 1 : -1));
            if (Math.abs(restScroll) >= 0.5) {
                // scroll to nearest neighbor step:
                performScrolling(undefined, Math.round((listElm.scrollLeft + restScroll) / listSlideDistance));
                
                
                
                return; // no need to *auto scroll completation*:
            } // if
        } // if
        
        
        
        // the *auto scroll completation*:
        // get the shown listItem's index by position:
        if (!isExactScrollPos(listElm)) { // the listElm is NOT in the exact_position => needs to be re-aligned to the nearest exact_position
            // scroll to nearest neighbor step:
            performScrolling(undefined, getNearestScrollIndex(listElm));
        }
        else { // the listElm is in the exact_position => the sliding animation is completed
            // mark the sliding status:
            slidingStatus.current = SlidingStatus.Passive;
        } // if
    });
    const listHandleScroll        = useEvent(async (event: Event) => {
        // conditions:
        if ((slidingStatus.current !== SlidingStatus.AutoScrolling) && (slidingStatus.current !== SlidingStatus.FollowsPointer)) return; // only process `AutoScrolling`|`FollowsPointer` state
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        
        
        // immediately scroll to the correct position, so the dummyListElm's scroll_pos is in_sync to listElm's scroll_pos:
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
        
        
        
        // detect the scrolling end:
        if (!isExactScrollPos(listElm)) return; // the listElm is NOT in the exact_position yet => ignore => wait for another scroll_step
        
        
        
        // mark the sliding status:
        slidingStatus.current = SlidingStatus.Passive;
    });
    
    
    
    // dom effects:
    
    // prevents browser's scrolling implementation, we use our scrolling implementation:
    // attach/detach passive events:
    useEffect(() => {
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for setup
        
        
        
        // setups:
        listElm.addEventListener('touchmove', listHandleTouchMove, { passive: false });
        listElm.addEventListener('scroll'   , listHandleScroll   , { passive: false });
        
        
        
        // cleanups:
        return () => {
            listElm.removeEventListener('touchmove', listHandleTouchMove);
            listElm.removeEventListener('scroll'   , listHandleScroll   );
        };
    }, []);
    
    // sync forth & back dummyListElm scrolling position to listElm scrolling position, at `infiniteLoop` transition:
    useEffect(() => {
        // conditions:
        
        if (!infiniteLoop) return; // only for infiniteLoop mode
        
        const dummyListElm = dummyListRefInternal.current;
        if (!dummyListElm) return; // dummyListElm must be exist for syncing
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        
        
        // setups:
        // immediately scroll to the correct position, so the dummyListElm's scroll_pos is in_sync to listElm's scroll_pos, before dummyListElm becomes the *source of truth*:
        setRelativeScrollPos(
            /*baseListElm      :*/ listElm,
            
            /*targetListElm    :*/ dummyListElm,
            /*targetScrollDiff :*/ dummyDiff.current,
        );
        
        
        
        // cleanups:
        return () => {
            // sync dummyListElm (as the previous *source of truth*) to listElm:
            if (dummyDiff.current) { // has difference => need to sync
                // shift the current image similar to the dummyListElm, so the dummyListElm cloned to listElm:
                setRelativeShiftPos(
                    /*baseShift        :*/ undefined,
                    /*targetListElm    :*/ listElm,
                    /*targetShiftDiff  :*/ 0,
                );
            } // if
        };
    }, [infiniteLoop]); // (re)run the setups on every time the infiniteLoop mode changes
    
    
    
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
                    // onTouchMove   = {listHandleTouchMove } // can't setup event here, we need *passive* listener, we use async event_handler that needs to be called in *sequential* order
                    onTouchEnd    = {listHandleTouchEnd  }
                    // onScroll      = {listHandleScroll    } // can't setup event here, we need *passive* listener, we use async event_handler that needs to be called in *sequential* order
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
