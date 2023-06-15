// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useMemo,
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
    useMergeStyles,
    useMountedFlag,
    useIsRtl,
    
    
    
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
    // features:
    usesCarousel,
}                           from './features/carousel.js'
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

const _defaultSlideThreshold         : number  = 5    /* pixel */         // the minimum distance to start sliding_action (but not yet swiping action)
const _defaultSwipeMovementThreshold : number  = 20   /* pixel */         // the minimum distance to considered swiping_action
const _defaultSwipeDurationThreshold : number  = 300  /* milliseconds */  // the maximum time duration to considered swiping_action, longer than it will considered as hold_scroll

const _defaultScrollingPrecision     : number  = 0.9  /* pixel */         // the browser's rounding error may up to 0.75px, so we set to 0.9 for the minimum uncertainty

const _defaultMovementStep           : number  = 1    /* step(s) */

const _defaultScrollMomentumAccum    : boolean = true
const _defaultScrollMomentumWeight   : number  = 2
const _defaultScrollMargin           : number  = 0

const _defaultMaxInitialLoad         : number  = 3000 /* ms */



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
    scrollingRef         ?: React.Ref<TElement> // setter ref
    
    
    
    // scrolls:
    scrollMomentumAccum  ?: boolean
    scrollMomentumWeight ?: number
    scrollMargin         ?: number
    
    
    
    // components:
    prevButtonComponent  ?: ButtonComponentProps['buttonComponent']
    nextButtonComponent  ?: ButtonComponentProps['buttonComponent']
    
    
    
    // children:
    children             ?: React.ReactNode
}
const Carousel = <TElement extends HTMLElement = HTMLElement, TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>(props: CarouselProps<TElement, TScrollIndexChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet        = useCarouselStyleSheet();
    
    
    
    // variants:
    const {infiniteLoop}    = useCarouselVariant(props);
    
    
    
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
    // cultures:
    const [isRtl, setCarouselElmRef] = useIsRtl<TElement>();
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        scrollingRef,
        
        
        
        // variants:
        infiniteLoop : _infiniteLoop, // remove
        
        
        
        // scrolls:
        scrollMomentumAccum  = _defaultScrollMomentumAccum,
        scrollMomentumWeight = _defaultScrollMomentumWeight,
        scrollMargin         : scrollMarginProp = _defaultScrollMargin,
        
        
        
        // states:
        defaultScrollIndex  : _defaultScrollIndex,  // take, to be handled by `useUncontrollableScrollable`
        scrollIndex         : _scrollIndex,         // take, to be handled by `useUncontrollableScrollable`
        onScrollIndexChange : _onScrollIndexChange, // take, to be handled by `useUncontrollableScrollable`
        
        
        
        // components:
        basicComponent      = (<Content<TElement>                                                      /> as React.ReactComponentElement<any, BasicProps<TElement>>),
        
        prevButtonComponent = (<ButtonIcon iconPosition='start' icon={isRtl ? 'navright' : 'navleft' } /> as React.ReactComponentElement<any, ButtonProps>),
        nextButtonComponent = (<ButtonIcon iconPosition='end'   icon={isRtl ? 'navleft'  : 'navright'} /> as React.ReactComponentElement<any, ButtonProps>),
        navscrollComponent  = (<Navscroll<Element>                                                     /> as React.ReactComponentElement<any, NavscrollProps<Element>>),
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // refs:
    const listRefInternal      = useRef<TElement|null>(null);
    const mergedListRef        = useMergeRefs<TElement>(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        // preserves the original `scrollingRef` (conditionally):
        (!infiniteLoop || undefined) && scrollingRef,
        
        
        
        listRefInternal,
        setCarouselElmRef,
    );
    
    const dummyListRefInternal = useRef<TElement|null>(null);
    const mergedDummyListRef   = useMergeRefs<TElement>(
        // preserves the original `scrollingRef` (conditionally):
        (infiniteLoop || undefined) && scrollingRef,
        
        
        
        dummyListRefInternal,
    );
    
    
    
    // fn props:
    const itemsCount              = React.Children.count(children);
    
    const minItemIndex            = 0;
    const maxItemIndex            = (itemsCount - 1);
    const rangeItemIndex          = maxItemIndex - minItemIndex;
    
    const maxPossibleScrollMargin = Math.max(0,
        Math.floor((itemsCount - 1) / 2)
    );
    
    const scrollMarginPropAbs     = Math.abs(scrollMarginProp);
    const scrollMarginFrPart      = scrollMarginPropAbs - Math.floor(scrollMarginPropAbs);
    
    const scrollMarginFr          = (
        !infiniteLoop
        ? 0
        : (
            (scrollMarginPropAbs <= maxPossibleScrollMargin)
            ? scrollMarginPropAbs
            :   !scrollMarginFrPart
                ?  maxPossibleScrollMargin
                : Math.max(0,
                    (maxPossibleScrollMargin - 1) + scrollMarginFrPart
                )
        )
    );
    const scrollMargin            = Math.ceil(scrollMarginFr);
    const minMovementItemIndex    = minItemIndex + scrollMargin;
    const maxMovementItemIndex    = maxItemIndex - scrollMargin;
    const rangeMovementItemIndex  = maxMovementItemIndex - minMovementItemIndex;
    
    
    
    // states:
    const dummyDiff                     = useRef<number>(0);
    
    const touchedScrollIndex            = useRef<number>(0);
    const promisePrevScrollingCompleted = useRef<Promise<void>|undefined>(undefined);
    
    const initialTouchTick              = useRef<number>(0);
    const initialTouchPos               = useRef<number>(0);
    const prevTouchPos                  = useRef<number>(0);
    
    const prevScrollPos                 = useRef<number>(0);
    const restScrollMomentum            = useRef<number>(0);
    const ranScrollMomentum             = useRef<number>(0);
    
    const signalScrolled                = useRef<(() => void)|undefined>(undefined);
    const enum SlidingStatus {
        Passive       = 0,
        Calibrate     = 1,
        AutoScrolling = 2,
        HoldScroll    = 3,
    }
    const slidingStatus                 = useRef<SlidingStatus>(SlidingStatus.Passive);
    
    const [scrollIndex, setScrollIndex] = useUncontrollableScrollable<TScrollIndexChangeEvent>(props, {
        min  : minItemIndex,
        max  : maxItemIndex,
        step : 1, // a fractional scrollIndex is not allowed, it will automatically rounded to nearest integer value
    });
    
    
    
    // utility functions:
    const periodify                         = (value: number, period: number) => {
        return ((value % period) + period) % period;
    };
    const normalizeShift                    = (shift: number) => {
        // conditions:
        if (!itemsCount) return shift;
        
        
        
        return periodify(shift, itemsCount);
    };
    const ensureCssLoaded                   = async () : Promise<boolean> => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return false; // listElm must be exist for testing
        
        
        
        // utilities:
        const liveStyle = getComputedStyle(listElm);
        const isCssLoaded = () => liveStyle.overflowX === 'scroll';
        
        
        
        // tests:
        if (isCssLoaded()) return true;
        
        return new Promise<boolean>(async (resolved) => {
            const initialTestTime = performance.now();
            for (let currentTestTime = initialTestTime; (currentTestTime - initialTestTime) < _defaultMaxInitialLoad; currentTestTime = performance.now()) {
                // wait for a frame duration:
                await new Promise<void>((resolved) => {
                    requestAnimationFrame(() => resolved());
                });
                
                if (isCssLoaded()) {
                    // loaded => return the result:
                    
                    resolved(true);
                    return;
                } // if
            } // for
            
            
            
            // test expires:
            resolved(false);
        });
    };
    const scrollIndexToItemIndex            = (scrollIndex: number): number => {
        return normalizeShift(scrollIndex - dummyDiff.current);
    };
    const itemIndexToScrollIndex            = (itemIndex: number): number => {
        return normalizeShift(itemIndex   + dummyDiff.current);
    };
    const getDomScrollPos                   = (listElm: TElement): number => {
        return isRtl ? -listElm.scrollLeft : +listElm.scrollLeft;
    };
    const setDomScrollPos                   = (listElm: TElement, scrollPos: number): void => {
        listElm.scrollLeft = isRtl ? -scrollPos : +scrollPos;
    };
    const domScrollTo                       = (listElm: TElement, { left, top, behavior }: ScrollToOptions): void => {
        listElm.scrollTo({
            left     : (left !== undefined) ? (isRtl ? -left : +left) : undefined,
            top      : top,
            behavior : behavior,
            
            [noInterceptMark as any] : undefined, // no intercept call hack
        });
    };
    
    // measuring functions:
    const getSlideDistance                  = (listElm: TElement) => {
        // get the listItem's slide distance:
        const listScrollPosMax  = listElm.scrollWidth - listElm.clientWidth;
        const range = (listElm === listRefInternal.current) ? rangeMovementItemIndex : rangeItemIndex;
        return itemsCount ? (listScrollPosMax / range) : 0;
    };
    const isExactScrollPos                  = (listElm: TElement) => {
        const listSlideDistance = getSlideDistance(listElm);
        const rest = getDomScrollPos(listElm) % listSlideDistance;
        return (rest < _defaultScrollingPrecision) || ((listSlideDistance - rest) < _defaultScrollingPrecision);
    };
    const getVisualNearestScrollIndex       = () => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return 0; // listElm must be exist for measuring
        
        
        
        const scrollLeftAbsolute          = getDomScrollPos(listElm);
        const physicalItemIndexFractional = scrollLeftAbsolute / getSlideDistance(listElm);
        const itemIndexFractional         = physicalItemIndexFractional + scrollMargin;
        const scrollIndexOverflowed       = itemIndexToScrollIndex(itemIndexFractional);
        const scrollIndex                 = normalizeShift(Math.round(scrollIndexOverflowed)); // round to the nearest (can cause overflow, eg: 6.88 => 7 of [min: 0, max: 6]), then normalize (eg: 7 => 0)
        return scrollIndex;
    };
    const measureScrollDelta                = (listElm: TElement) => {
        // logs:
        const oldScrollPos    = prevScrollPos.current;
        const newScrollPos    = getDomScrollPos(listElm);
        const deltaScrollPos  = newScrollPos - oldScrollPos;
        prevScrollPos.current = newScrollPos; // update the pos change
        
        return deltaScrollPos;
    };
    const isNearZeroScrollMomentum          = () => {
        return Math.abs(restScrollMomentum.current) < 0.1; // the precision is quite poor, it may be uncertain up to 0.05, so we set to 0.1 for a safer margin
    };
    
    // mutation functions:
    const ensurePrevScrollingCompleted      = async () => {
        await promisePrevScrollingCompleted.current;
    };
    const setRelativeScrollPos              = async (baseListElm: TElement|undefined, targetListElm: TElement, targetScrollDiff: number) => {
        const targetScrollPosMax            = targetListElm.scrollWidth - targetListElm.clientWidth;
        const targetSlideDistance           = getSlideDistance(targetListElm);
        const targetScale                   = baseListElm ? (targetSlideDistance / (getSlideDistance(baseListElm) || /* in case of the base's slideDistance is NaN => divide with targetSlideDistance itself to produce 1 */targetSlideDistance)) : 1;
        const targetScrollPosScaled         = (baseListElm ? getDomScrollPos(baseListElm) : 0) * targetScale;
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
        if (Math.abs(getDomScrollPos(targetListElm) - targetScrollPosWrappedRounded) >= _defaultScrollingPrecision) { // a significant movement detected
            // mark the sliding status:
            const originSlidingStatus = slidingStatus.current;
            if (originSlidingStatus === SlidingStatus.Passive) slidingStatus.current = SlidingStatus.Calibrate;
            try {
                promisePrevScrollingCompleted.current = (
                    (targetListElm === listRefInternal.current)
                    ? new Promise<void>((resolved) => {
                        signalScrolled.current?.();        // invoke previous pending_callback (if any)
                        signalScrolled.current = resolved; // setup a new pending_callback
                    })
                    : undefined
                );
                
                setDomScrollPos(targetListElm, targetScrollPosWrappedRounded);
                if (targetListElm === listRefInternal.current) prevScrollPos.current = getDomScrollPos(targetListElm); // update the pos change
                
                // a delay time to ensure the scroll calibration has fully settled & the `onScroll` event has fired (it's safe to scroll further):
                await promisePrevScrollingCompleted.current;
                promisePrevScrollingCompleted.current = undefined;
            }
            finally {
                // mark the sliding status:
                slidingStatus.current = originSlidingStatus;
            } // try
        } // if
    };
    const setRelativeShiftPos               = (baseShift: number|undefined, targetListElm: TElement, targetShiftDiff: number) => {
        // conditions:
        
        if (!itemsCount) return; // empty items => nothing to shift
        
        const relativeShift = normalizeShift((baseShift ?? -dummyDiff.current /*(undo prev shift => makes an absolute shift)*/) + targetShiftDiff);
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
    const updateListPresentation            = async (expectedScrollIndex?: number) => {
        // get the shown listItem's index by position:
        expectedScrollIndex ??= scrollIndex; // the *source of truth*
        
        
        
        // prepare to scrolling by rearrange slide(s) positions & then update current slide index:
        await prepareScrolling(/*currentItemIndex = */scrollIndexToItemIndex(expectedScrollIndex), /*movementItemIndex = */0/* no_movement, just to optimize */, { scrollIndex: expectedScrollIndex });
    };
    
    // navigation functions:
    interface MovementOptions {
        preserveMomentum ?: boolean
        scrollIndex      ?: number
    }
    const getOptimalIndexForMovement        = (currentItemIndex: number|undefined, movementItemIndex: number, options?: MovementOptions): number => {
        // options:
        const {
            preserveMomentum = true,
            scrollIndex : currentScrollIndex = scrollIndex,
        } = options ?? {};
        
        
        
        // assigning:
        currentItemIndex ??= scrollIndexToItemIndex(currentScrollIndex); // if not specified => calculate the itemIndex from scrollIndex
        
        
        
        // conditions:
        if (maxMovementItemIndex < minMovementItemIndex) return currentItemIndex; // the slides(s) are impossible to move => always return the unoptimized, if maxMovementItemIndex === minMovementItemIndex => also run the alg below just for alignment the image position
        
        
        
        const futureItemIndex          = currentItemIndex       + movementItemIndex; // predict the future index, regardless the range
        const clampedFutureItemIndex   = Math.min(Math.max(
            futureItemIndex,
        minMovementItemIndex), maxMovementItemIndex);
        
        const progressingMovementScrollIndex = preserveMomentum ? getProgressingMovementScrollIndex(/*visualScrollIndex = */itemIndexToScrollIndex(currentItemIndex), currentScrollIndex) : 0;
        
        const previousItemIndex        = clampedFutureItemIndex - movementItemIndex - progressingMovementScrollIndex; // predict the past index, regardless the range
        const clampedPreviousItemIndex = Math.min(Math.max(
            previousItemIndex,
        minMovementItemIndex), maxMovementItemIndex);
        
        return clampedPreviousItemIndex;
    };
    const prepareScrolling                  = async (currentItemIndex: number, movementItemIndex: number, options?: MovementOptions): Promise<number> => {
        // options:
        const {
            scrollIndex : currentScrollIndex = scrollIndex,
        } = options ?? {};
        
        
        
        // conditions:
        if (!infiniteLoop) return currentItemIndex; // a NON infinite loop => NO need to rearrange slide(s) positions
        
        const listElm = listRefInternal.current;
        if (!listElm) return currentItemIndex; // listElm must be exist to manipulate
        
        
        
        // the new index:
        const optimalItemIndex = getOptimalIndexForMovement(currentItemIndex, movementItemIndex, options);
        const shiftImage       = optimalItemIndex - currentScrollIndex;
        const scrollImage      = optimalItemIndex - scrollMargin;
        
        
        
        // shift the current image to the last|first, so we can scroll the listElm further_backward|further_forward (creates an infinite scroll illusion):
        setRelativeShiftPos(
            /*baseShift        :*/ undefined /* undefined = absolute shift */,
            /*targetListElm    :*/ listElm,
            /*targetShiftDiff  :*/ -shiftImage,
        );
        
        // immediately scroll to last|first index (it will scroll to step_backward_once|step_forward_once):
        await setRelativeScrollPos(
            /*baseListElm      :*/ undefined /* undefined = absolute scroll */,
            
            /*targetListElm    :*/ listElm,
            /*targetScrollDiff :*/ scrollImage,
        );
        
        
        
        // update the shifted listItem's index:
        return optimalItemIndex;
    };
    const performScrolling                  = (currentScrollIndex: number|undefined, futureScrollIndex: number): void => {
        futureScrollIndex = normalizeShift(futureScrollIndex);
        // conditions:
        if ((futureScrollIndex < minItemIndex) || (futureScrollIndex > maxItemIndex)) return; // out of movement range => ignore
        
        if ((currentScrollIndex !== undefined) && (currentScrollIndex === futureScrollIndex)) return; // no diff => ignore
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        
        
        // calculate the desired index:
        if (currentScrollIndex === undefined) currentScrollIndex = scrollIndex; // if not specified => get the index from props
        const movementScrollIndex = futureScrollIndex - currentScrollIndex;
        
        
        
        if (!movementScrollIndex) {
            // if no movement => restore (scroll snap) to current index:
            
            // calculate the desired pos:
            const currentItemIndex         = scrollIndexToItemIndex(currentScrollIndex);
            const physicalItemIndex        = normalizeShift(currentItemIndex - scrollMargin);
            const slideDistance            = getSlideDistance(listElm);
            const revertScrollLeftAbsolute = physicalItemIndex * slideDistance;
            const revertScrollLeftRelative = revertScrollLeftAbsolute - /*currentScrollLeftOffset = */getDomScrollPos(listElm);
            if (Math.abs(revertScrollLeftRelative) >= _defaultScrollingPrecision) { // a significant movement detected
                // mark the sliding status:
                slidingStatus.current = SlidingStatus.AutoScrolling;
                
                // snap scroll to the desired scrollIndex:
                restScrollMomentum.current = (revertScrollLeftRelative / slideDistance);
                domScrollTo(listElm, {
                    left     : revertScrollLeftAbsolute,
                    behavior : 'smooth',
                });
            } // if
        }
        else {
            // update the scrollIndex (and re-render):
            setScrollIndex(futureScrollIndex);
        } // if
    };
    const getProgressingMovementScrollIndex = (visualScrollIndex: number, currentScrollIndex = scrollIndex) => {
        return currentScrollIndex /* greedy: from re-render */ - visualScrollIndex /* delayed: from visual measurement */;
    };
    const limitsScrollMovement              = (visualScrollIndex: number, movementScrollIndex: number) => {
        movementScrollIndex = Math.min(Math.max(
            movementScrollIndex,
        -rangeMovementItemIndex), +rangeMovementItemIndex);
        
        
        
        const progressingMovementScrollIndex = getProgressingMovementScrollIndex(visualScrollIndex);
        const maxMovementByProgressing       = rangeMovementItemIndex - progressingMovementScrollIndex;
        movementScrollIndex = Math.min(Math.max(
            movementScrollIndex,
        -maxMovementByProgressing), +maxMovementByProgressing);
        
        
        
        return movementScrollIndex;
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
    
    
    
    // features:
    const {carouselVars} = usesCarousel();
    
    
    
    // styles:
    const scrollMarginStyle = useMemo<React.CSSProperties>(() => ({
        // values:
        [
            carouselVars.scrollMargin
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : scrollMargin,
        
        [
            carouselVars.scrollMarginFr
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : scrollMarginFr,
    }), [scrollMargin, scrollMarginFr]);
    const mergedStyle     = useMergeStyles(
        // values:
        scrollMarginStyle,
        
        
        
        // preserves the original `style` (can overwrite the `scrollMarginStyle`):
        props.style,
    );
    
    
    
    // handlers:
    const handlePrevClickInternal  = useEvent<React.MouseEventHandler<HTMLButtonElement>>(async (event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        if (!scrollMomentumAccum && (slidingStatus.current === SlidingStatus.AutoScrolling)) return; // do not accumulate the scroll momentum if not enabled
        
        // get the shown listItem's index by position:
        const visualScrollIndex = getVisualNearestScrollIndex();
        
        // calculate if there is an available go_backward movement:
        const movementScrollIndex = limitsScrollMovement(visualScrollIndex, -_defaultMovementStep);
        if (!movementScrollIndex) return;
        
        // all necessary task will be performed, no further action needed:
        event.preventDefault();
        
        
        
        // calculate the future index:
        const futureScrollIndex = normalizeShift(visualScrollIndex + movementScrollIndex);
        
        
        
        // scroll implementation:
        
        // scroll to previous neighbor step:
        performScrolling(visualScrollIndex, futureScrollIndex);
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
        
        if (!scrollMomentumAccum && (slidingStatus.current === SlidingStatus.AutoScrolling)) return; // do not accumulate the scroll momentum if not enabled
        
        // get the shown listItem's index by position:
        const visualScrollIndex = getVisualNearestScrollIndex();
        
        // calculate if there is an available go_forward movement:
        const movementScrollIndex = limitsScrollMovement(visualScrollIndex, +_defaultMovementStep);
        if (!movementScrollIndex) return;
        
        // all necessary task will be performed, no further action needed:
        event.preventDefault();
        
        
        
        // calculate the future index:
        const futureScrollIndex = normalizeShift(visualScrollIndex + movementScrollIndex);
        
        
        
        // scroll implementation:
        
        // scroll to next neighbor step:
        performScrolling(visualScrollIndex, futureScrollIndex);
    });
    const handleNextClick          = useMergeEvents(
        // preserves the original `onClick` from `nextButtonComponent`:
        nextButtonComponent.props.onClick,
        
        
        
        // actions:
        handleNextClickInternal,
    );
    
    const handleTouchStartInternal = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        if (event.touches.length !== 1) return; // ignore multi touches
        
        
        
        // set the initial touch pos to detect the movement direction later:
        initialTouchTick.current = performance.now();
        const touchPos           = event.touches[0].pageX;
        initialTouchPos.current  = touchPos;
        prevTouchPos.current     = touchPos;
        
        
        
        // get the shown listItem's index by position:
        touchedScrollIndex.current = getVisualNearestScrollIndex();
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
        
        if (event.touches.length !== 1) return; // ignore multi touches
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        // ensures the prev (async) scrolling process was completed:
        await ensurePrevScrollingCompleted();
        
        
        
        // get the shown listItem's index by position:
        const visualScrollIndex = touchedScrollIndex.current;
        getVisualNearestScrollIndex();
        
        
        
        // track the touch pos direction:
        const newTouchPos    = event.touches[0].pageX;
        
        const touchDirection = (initialTouchPos.current - prevTouchPos.current) * (isRtl ? -1 : +1); // a touch direction relative to initial touch & culture aware
        prevTouchPos.current = newTouchPos; // update the prev
        
        
        
        // calculate the hold_scroll action conditions:
        const touchDuration = performance.now() - initialTouchTick.current;
        if (!(touchDuration > _defaultSwipeDurationThreshold))         return; // a *minimum* holding_duration is required in order to perform hold_scroll action
        
        if (slidingStatus.current !== SlidingStatus.HoldScroll) {              // if not already having hold_scroll action
            if (!(Math.abs(touchDirection) >= _defaultSlideThreshold)) return; // a *minimum* holding_movement is required in order to perform hold_scroll action
        } // if
        
        
        
        // mark the sliding status:
        slidingStatus.current = SlidingStatus.HoldScroll; // mark as hold_scroll action
        
        
        
        // stop the running scrolling:
        domScrollTo(listElm, {
            left     : getDomScrollPos(listElm), // scroll to current scroll position itself
            behavior : 'auto',
        });
        
        
        
        // update current slide index:
        const movementScrollIndex = limitsScrollMovement(visualScrollIndex,
            touchDirection / getSlideDistance(listElm)
        );
        
        
        
        // customize the momentum:
        restScrollMomentum.current = 0;
        ranScrollMomentum.current  = movementScrollIndex;
        
        
        
        // predict the future movement:
        const steppedMovementItemIndex = (
            (movementScrollIndex < 0)
            ? Math.floor(movementScrollIndex) // rounded to lowest  integer to protect from premature movement
            : Math.ceil(movementScrollIndex)  // rounded to highest integer to protect from premature movement
        );
        
        
        
        // hold_scroll implementation:
        await prepareScrolling(/*currentItemIndex = */scrollIndexToItemIndex(visualScrollIndex), steppedMovementItemIndex, { preserveMomentum: false });
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
        
        if (event.touches.length !== 0) return; // ignore multi touches
        
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist to manipulate
        
        
        
        // a macroTask delay to make sure the `touchend` event is executed *after* `touchmove`:
        await new Promise<void>((resolved) => setTimeout(resolved, 0));
        
        
        
        // get the shown listItem's index by position:
        const visualScrollIndex = getVisualNearestScrollIndex();
        let   futureScrollIndex = visualScrollIndex;
        
        
        
        // track the touch pos direction:
        const touchDirection = (initialTouchPos.current - prevTouchPos.current) * (isRtl ? -1 : +1); // a touch direction relative to initial touch & culture aware
        
        
        
        // calculate the swipe_scroll action conditions:
        const hasHoldScrollAction  = (slidingStatus.current === SlidingStatus.HoldScroll);
        const hasSwipeScrollAction = (
            !hasHoldScrollAction
            &&
            (Math.abs(touchDirection) >= _defaultSwipeMovementThreshold) // a *minimum* swipe_movement is required in order to perform swipe_scroll action
            &&
            (scrollMomentumAccum || (slidingStatus.current !== SlidingStatus.AutoScrolling)) // do not accumulate the scroll momentum if not enabled
        );
        
        
        
        // unmark the sliding status:
        slidingStatus.current = SlidingStatus.Passive; // mark as free
        
        
        
        if (hasSwipeScrollAction) {
            // calculate the scroll accelaration:
            const touchDuration      = performance.now() - initialTouchTick.current;
            const touchVelocity      = touchDirection / touchDuration;
            let   scrollAccelaration = touchVelocity * scrollMomentumWeight;
            
            
            
            // ensures the accelaration is at least -1 or +1:
            if (Math.abs(scrollAccelaration) < 1) {
                scrollAccelaration = (scrollAccelaration < 0) ? -1 : +1;
            } // if
            
            
            
            // predict the future movement:
            const steppedMovementItemIndex = limitsScrollMovement(visualScrollIndex,
                Math.round(scrollAccelaration) // rounded to nearest integer to protect from premature movement
            );
            if (!steppedMovementItemIndex) return; // no movement available => nothing to do
            
            
            
            // calculate the future index:
            futureScrollIndex = normalizeShift(visualScrollIndex + steppedMovementItemIndex);
            
            
            
            // swipe_scroll implementation:
            await prepareScrolling(/*currentItemIndex = */scrollIndexToItemIndex(visualScrollIndex), steppedMovementItemIndex);
        }
        else if (hasHoldScrollAction) {
            /*
                DO NOT RESET the `ranScrollMomentum.current`.
                It's important to preserve (continue) the scrolled slide
                during NEXT re-render caused by `scrollIndex` change.
            */
            // // reset the momentum:
            // restScrollMomentum.current = 0;
            // ranScrollMomentum.current  = 0;
        }
        else { // neither swipe_scroll nor hold_scroll action => nothing to do
            return;
        } // if
        
        
        
        // hold_scroll|swipe_scroll implementation:
        
        // scroll to previous|current|next neighbor step:
        performScrolling(hasSwipeScrollAction ? visualScrollIndex : undefined, futureScrollIndex);
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
        if ((slidingStatus.current !== SlidingStatus.AutoScrolling) && (slidingStatus.current !== SlidingStatus.HoldScroll)) return; // only process `AutoScrolling`|`HoldScroll` state
        
        
        
        // immediately scroll to the correct position, so the dummyListElm's scroll_pos is in_sync with listElm's scroll_pos:
        const dummyListElm = dummyListRefInternal.current;
        if (dummyListElm) { // dummyListElm must be exist for syncing
            await setRelativeScrollPos(
                /*baseListElm      :*/ listElm /* relative to listElm's scroll */,
                
                /*targetListElm    :*/ dummyListElm,
                /*targetScrollDiff :*/ dummyDiff.current + scrollMargin,
            );
        } // if
        
        
        
        // conditions:
        if (slidingStatus.current !== SlidingStatus.AutoScrolling) return;
        
        
        
        // accumulates scroll momentum:
        const deltaScrollMomentum = (deltaScrollPos / getSlideDistance(listElm));
        restScrollMomentum.current -= deltaScrollMomentum;
        ranScrollMomentum.current  += deltaScrollMomentum;
        
        
        
        // detect the scrolling end:
        if (!isExactScrollPos(listElm))  return; // still scrolling between steps   => wait for another scroll_step
        if (!isNearZeroScrollMomentum()) return; // still having scrolling momentum => wait for another scroll_step
        restScrollMomentum.current = 0;          // reset to true zero
        ranScrollMomentum.current  = 0;          // completed => reset too
        
        
        
        // mark the sliding status:
        slidingStatus.current = SlidingStatus.Passive;
    });
    
    
    
    // dom effects:
    const isMounted = useMountedFlag();
    
    // initial scroll pos setup (without scrolling effect):
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        const dummyListElm   = dummyListRefInternal.current; // optional
        const primaryListElm = dummyListElm ?? listElm;      // if dummyListElm exists => use dummyListElm as the *source of truth* -otherwise- listElm
        
        
        
        // setups:
        (async () => {
            await ensureCssLoaded();
            
            if (!isMounted.current) return; // the component was unloaded before awaiting returned => do nothing
            
            // immediately scroll to the correct position, so the dummyListElm|listElm's scroll_pos is in_sync with scrollIndex:
            setRelativeScrollPos(
                /*baseListElm      :*/ undefined /* undefined = absolute scroll */,
                
                /*targetListElm    :*/ primaryListElm,
                /*targetScrollDiff :*/ scrollIndex,
            );
            
            // update listElm's image position & scroll position, as seen on dummyListElm (navigation indicator):
            updateListPresentation(); // setup the correct slide & scrollbar to the right position
        })();
        
        
        
        // cleanups:
        return () => {
            if (/*before: HAS dummyListElm*/dummyListElm && /*after: NO dummyListElm*/!dummyListRefInternal.current) { // mutation from infiniteLoop to finiteLoop: flush the dummyListElm to listElm
                dummyListRefInternal.current = dummyListElm;
                try {
                    // update listElm's image position & scroll position, as seen on dummyListElm (navigation indicator):
                    updateListPresentation(); // flush the correct scrollbar to the normal position (if has been teleported)
                }
                finally {
                    dummyListRefInternal.current = null;
                } // try
            } // if
            
            /* no need to cleanup if no  mutation from infiniteLoop to finiteLoop */
        };
    }, [infiniteLoop, scrollMargin]); // (re)run the setups on every time the infiniteLoop|scrollMargin changes
    
    // changing scroll pos (with scrolling effect):
    const prevScrollIndexRef = useRef<number>(scrollIndex);     // initial
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const listElm = listRefInternal.current;
        if (!listElm) return; // listElm must be exist for syncing
        
        
        
        // get the shown listItem's index by position:
        if (prevScrollIndexRef.current === scrollIndex) return;  // no change => ignore
        const currentScrollIndex   = prevScrollIndexRef.current; // backup
        const futureScrollIndex    = scrollIndex;                // get
        prevScrollIndexRef.current = futureScrollIndex;          // update
        
        
        
        // setups:
        (async () => {
            // get the physical scroll index:
            let currentItemIndex = scrollIndexToItemIndex(currentScrollIndex);
            let futureItemIndex  = scrollIndexToItemIndex(futureScrollIndex);
            
            
            
            // looking for a chance of *shorter_paths* by *teleporting*:
            if (infiniteLoop) {
                // calculate the possible paths:
                const movementItemIndex = futureItemIndex - currentItemIndex;
                
                const straightDistance  = Math.abs(movementItemIndex);
                const telePrevDistance  = itemsCount - futureItemIndex  + currentItemIndex;
                const teleNextDistance  = itemsCount - currentItemIndex + futureItemIndex;
                
                
                
                // determine which movement (and direction) is the shortest way:
                let shortestMovementItemIndex = (
                    ((telePrevDistance < straightDistance) || (teleNextDistance < straightDistance))
                    ? ((teleNextDistance < telePrevDistance) ? +teleNextDistance : -telePrevDistance)
                    : movementItemIndex
                );
                
                
                
                // workaround for excess movement:
                if (Math.abs(shortestMovementItemIndex) > rangeMovementItemIndex) {
                    // calculate the excess movement:
                    const excessMovement = (shortestMovementItemIndex > 0) ? (shortestMovementItemIndex - rangeMovementItemIndex) : (shortestMovementItemIndex + rangeMovementItemIndex);
                    
                    
                    
                    // immediately jump to the nearest reachable movement:
                    const semiFutureScrollIndex = currentScrollIndex + excessMovement;
                    updateListPresentation(semiFutureScrollIndex); // causes diff change
                    
                    
                    
                    // adjust the initial variables:
                    currentItemIndex = scrollIndexToItemIndex(normalizeShift(currentScrollIndex + excessMovement)); // shift + aware of diff change
                    shortestMovementItemIndex -= excessMovement; // reduce
                } // if
                
                
                
                // prepare to scrolling by rearrange slide(s) positions & then update current slide index:
                const optimalItemIndex = await prepareScrolling(currentItemIndex, shortestMovementItemIndex, { scrollIndex: itemIndexToScrollIndex(currentItemIndex) });
                if (!isMounted.current) return; // the component was unloaded before awaiting returned => do nothing
                futureItemIndex        = optimalItemIndex + shortestMovementItemIndex;
            } // if
            
            
            
            // reset the momentum:
            restScrollMomentum.current = 0;
            ranScrollMomentum.current  = 0; // reset the ran momentum (if was set by hold_scroll)
            
            
            
            // calculate the desired pos:
            const physicalItemIndex        = normalizeShift(futureItemIndex - scrollMargin);
            const slideDistance            = getSlideDistance(listElm);
            const futureScrollLeftAbsolute = physicalItemIndex * slideDistance;
            const futureScrollLeftRelative = futureScrollLeftAbsolute - /*currentScrollLeftOffset = */getDomScrollPos(listElm);
            if (Math.abs(futureScrollLeftRelative) >= _defaultScrollingPrecision) { // a significant movement detected
                // mark the sliding status:
                slidingStatus.current = SlidingStatus.AutoScrolling;
                
                // snap scroll to the desired scrollIndex:
                restScrollMomentum.current = (futureScrollLeftRelative / slideDistance);
                domScrollTo(listElm, {
                    left     : futureScrollLeftAbsolute,
                    behavior : 'smooth',
                });
            }
            else if (infiniteLoop) {
                // in case of the delta scroll is zero (not causing to scroll), we need to *manually* scroll the dummyListElm to sync with the currentScrollIndex:
                const dummyListElm   = dummyListRefInternal.current;
                if (dummyListElm) {
                    await setRelativeScrollPos(
                        /*baseListElm      :*/ listElm /* relative to listElm's scroll */,
                        
                        /*targetListElm    :*/ dummyListElm,
                        /*targetScrollDiff :*/ dummyDiff.current + scrollMargin,
                    );
                } // if
            } // if
        })();
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
            let futureScrollLeftAbsolute = (typeof(leftOrOptions) === 'number') ? leftOrOptions : leftOrOptions.left;
            if (futureScrollLeftAbsolute === undefined) return; // undefined => ignore // zero => okay
            if (isRtl) futureScrollLeftAbsolute = -futureScrollLeftAbsolute;
            const futureScrollLeftRelative = futureScrollLeftAbsolute - /*currentScrollLeftOffset = */getDomScrollPos(primaryListElm);
            if (Math.abs(futureScrollLeftRelative) >= _defaultScrollingPrecision) { // a significant movement detected
                // update the scrollIndex (and re-render):
                setScrollIndex(
                    normalizeShift( // no underflow|overflow
                        Math.round(futureScrollLeftAbsolute / getSlideDistance(primaryListElm)) // no fractional index
                    )
                );
            } // if
        } as any;
        primaryListElm.scrollBy = function(this: any, leftOrOptions: number|ScrollToOptions, ...rest: any[]): void {
            // conditionally call the original:
            if ((typeof(leftOrOptions) === 'object') && (noInterceptMark in leftOrOptions)) {
                (oriScrollBy.call as any)(this, leftOrOptions, ...rest);
                
                return; // just call the original, no further intercept
            } // if
            
            
            
            // calculate the desired pos:
            let futureScrollLeftRelative = (typeof(leftOrOptions) === 'number') ? leftOrOptions : leftOrOptions.left;
            if (!futureScrollLeftRelative) return; // undefined => ignore // zero => not moving => ignore
            if (isRtl) futureScrollLeftRelative = -futureScrollLeftRelative;
            if (Math.abs(futureScrollLeftRelative) >= _defaultScrollingPrecision) { // a significant movement detected
                const futureScrollLeftAbsolute = futureScrollLeftRelative + /*currentScrollLeftOffset = */getDomScrollPos(primaryListElm);
                
                
                
                // update the scrollIndex (and re-render):
                setScrollIndex(
                    normalizeShift( // no underflow|overflow
                        Math.round(futureScrollLeftAbsolute / getSlideDistance(primaryListElm)) // no fractional index
                    )
                );
            } // if
        } as any;
        
        
        
        // cleanups:
        return () => {
            // restore the originals:
            primaryListElm.scrollTo = oriScrollTo;
            primaryListElm.scrollBy = oriScrollBy;
        };
    }, [infiniteLoop, isRtl]); // (re)run the setups on every time the infiniteLoop|isRtl changes
    
    
    
    // jsx:
    return React.cloneElement<BasicProps<TElement>>(basicComponent,
        // props:
        {
            // other props:
            ...restBasicProps,
            ...basicComponent.props, // overwrites restBasicProps (if any conflics)
            
            
            
            // classes:
            mainClass     : basicComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
            
            
            
            // styles:
            style         : mergedStyle,
            
            
            
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
                    onScroll={listHandleScroll}
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
