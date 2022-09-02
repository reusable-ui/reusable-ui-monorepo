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
    // types:
    Optional,
}                           from '@cssfn/types'                         // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    fallbacks,
    
    
    
    // combinators:
    children,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // styles:
    stripoutList,
    stripoutScrollbar,
    stripoutImage,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui features:
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'         // padding (inner spacing) stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI
import {
    // hooks:
    useBasicVariantProps,
}                           from '@reusable-ui/basic-variants'  // basic variants of UI

// reusable-ui components:
import {
    // react components:
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // styles:
    ContentChildrenMediaOptions,
    usesContentChildrenMediaOptions,
    usesContentLayout,
    usesContentVariants,
    
    
    
    // configs:
    contents,
    
    
    
    // react components:
    ContentProps,
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



// defaults:
const _defaultListElmClasses      : Optional<string>[] = ['list']
const _defaultDummyListElmClasses : Optional<string>[] = ['list', 'dummy']
const _defaultPrevButtonClasses   : Optional<string>[] = ['prevBtn']
const _defaultNextButtonClasses   : Optional<string>[] = ['nextBtn']
const _defaultNavscrollClasses    : Optional<string>[] = ['nav']



// styles:

// .carousel > .list > .item > .media
const listElm      = ':where(.list)'; // zero specificity
const dummyListElm = '.dummy';
const itemElm      = '*';             // zero specificity
const prevBtnElm   = '.prevBtn';
const nextBtnElm   = '.nextBtn';
const navElm       = '.nav';



export const usesCarouselListLayout = (options?: ContentChildrenMediaOptions) => {
    // dependencies:
    
    // features:
    const {paddingVars} = usesPadding(carousels);
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutList(),      // clear browser's default styles
            stripoutScrollbar(), // hides browser's scrollbar
        ]),
        ...style({
            // layouts:
            gridArea       : '1 / 1 / -1 / -1', // fills the entire grid areas, from the first row/column to the last row/column
            display        : 'flex',            // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',             // items are stacked horizontally
            justifyContent : 'start',           // items are placed starting from the left, so the first item is initially visible
            alignItems     : 'stretch',         // items height are follow the tallest one
            flexWrap       : 'nowrap',          // no wrapping, so the sliding works
            
            
            
            // positions:
            position       : 'relative', // (optional) makes calculating slide's offsetLeft/offsetTop faster
            
            
            
            // spacings:
            // cancel-out parent's padding with negative margin:
            marginInline   : `calc(0px - ${paddingVars.paddingInline})`,
            marginBlock    : `calc(0px - ${paddingVars.paddingBlock})`,
            
            
            
            // scrolls:
            overflowX      : 'scroll',                  // enable horizontal scrolling
            scrollSnapType : [['inline', 'mandatory']], // enable horizontal scroll snap
            scrollBehavior : 'smooth',                  // smooth scrolling when it's triggered by the navigation or CSSOM scrolling APIs
            WebkitOverflowScrolling : 'touch',          // supports for iOS Safari
            
            
            
            // children:
            ...children(itemElm, {
                ...imports([
                    usesCarouselItemLayout(options),
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(carousels, 'list')), // apply config's cssProps starting with list***
        }),
    });
};
export const usesCarouselItemLayout = (options: ContentChildrenMediaOptions = {}) => {
    // options:
    const {
        mediaSelectorWithExcept,
    } = usesContentChildrenMediaOptions(options);
    
    
    
    return style({
        // layouts:
        display         : 'flex',   // use block flexbox, so it takes the entire parent's width
        flexDirection   : 'column', // the flex direction to vert
        justifyContent  : 'center', // center items vertically
        alignItems      : 'center', // center items horizontally
        flexWrap        : 'nowrap', // no wrapping
        
        
        
        // sizes:
        flex            : [[0, 0, '100%']], // ungrowable, unshrinkable, initial 100% parent's width
        // (important) force the media follow the <li> width, so it doesn't break the flex width:
        boxSizing       : 'border-box',     // the final size is including borders & paddings
        inlineSize      : '100%',           // fills the entire parent's width
        
        
        
        // scrolls:
        scrollSnapAlign : 'center', // put a magnet at the center
        scrollSnapStop  : 'normal', // scrolls one by one or multiple at once
        
        
        
        // children:
        ...children(mediaSelectorWithExcept, {
            ...imports([
                usesCarouselMediaLayout(),
            ]),
        }),
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(carousels, 'item')), // apply config's cssProps starting with item***
    });
};
export const usesCarouselMediaLayout = () => {
    return style({
        ...imports([
            stripoutImage(), // removes browser's default styling on image
        ]),
        ...style({
            // layouts:
            ...rule(':where(:first-child:last-child)', { // only one child
                display : 'block', // fills the entire parent's width
                
                
                
                // sizes:
                // span to maximum width/height while keeps aspect-ratio:
                boxSizing         : 'border-box', // the final size is including borders & paddings
                maxInlineSize     : 'fill-available',
                maxBlockSize      : 'fill-available',
                ...fallbacks({
                    maxInlineSize : '100%',
                    maxBlockSize  : '100%',
                }),
                inlineSize        : 'auto',
                blockSize         : 'auto',
            }),
            
            
            
            // sizes:
            flex                  : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(carousels, 'media')), // apply config's cssProps starting with media***
        }),
    });
};

export const usesNavBtnLayout = () => {
    return style({
        // customize:
        ...usesCssProps(usesPrefixedProps(carousels, 'navBtn')), // apply config's cssProps starting with navBtn***
    });
};
export const usesPrevBtnLayout = () => {
    return style({
        // layouts:
        gridArea : 'prevBtn',
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(carousels, 'prevBtn')), // apply config's cssProps starting with prevBtn***
    });
};
export const usesNextBtnLayout = () => {
    return style({
        // layouts:
        gridArea : 'nextBtn',
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(carousels, 'nextBtn')), // apply config's cssProps starting with nextBtn***
    });
};

export const usesNavLayout = () => {
    return style({
        // layouts:
        gridArea    : 'nav',
        
        
        
        // sizes:
        justifySelf : 'center', // do not stretch the nav, just place it at the center horizontally
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(carousels, 'nav')), // apply config's cssProps starting with nav***
    });
};

export const usesCarouselLayout = (options?: ContentChildrenMediaOptions) => {
    // dependencies:
    
    // features:
    const {paddingRule, paddingVars} = usesPadding(carousels);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
            
            // features:
            paddingRule,
        ]),
        ...style({
            // layouts:
            display             : 'grid', // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            gridTemplateRows    : [[
                '1fr',
                'min-content',
            ]],
            gridTemplateColumns : [['15%', '1fr', '15%']],
            gridTemplateAreas   : [[
                '"prevBtn main nextBtn"',
                '"prevBtn nav  nextBtn"',
            ]],
            
            // child default sizes:
            justifyItems        : 'stretch', // each section fills the entire area's width
            alignItems          : 'stretch', // each section fills the entire area's height
            
            
            
            // borders:
            overflow            : 'hidden', // clip the children at the rounded corners
            
            
            
            // children:
            ...children(listElm, {
                ...imports([
                    usesCarouselListLayout(options),
                ]),
            }),
            ...children(dummyListElm, {
                // appearances:
             // visibility : 'hidden', // causing onScroll doesn't work in Firefox
                opacity    : 0,
                position   : 'relative',
                zIndex     : -1,
            }),
            
            ...children([prevBtnElm, nextBtnElm], {
                ...imports([
                    usesNavBtnLayout(),
                ]),
            }),
            ...children(prevBtnElm, {
                ...imports([
                    usesPrevBtnLayout(),
                ]),
            }),
            ...children(nextBtnElm, {
                ...imports([
                    usesNextBtnLayout(),
                ]),
            }),
            
            ...children(navElm, {
                ...imports([
                    usesNavLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(carousels), // apply config's cssProps
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
};
export const usesCarouselVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(carousels);
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            resizableRule,
        ]),
    });
};

export const useCarouselStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCarouselLayout(),
        
        // variants:
        usesCarouselVariants(),
    ]),
}), { id: 'v35mas3qt6' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export interface CarouselVariant {
    infiniteLoop ?: boolean
}
export const useCarouselVariant = (props: CarouselVariant) => {
    return {
        infiniteLoop: props.infiniteLoop ?? false,
    };
};



// configs:
export const [carousels, carouselValues, cssCarouselConfig] = cssConfig(() => {
    return {
        // borders:
        navBtnBorderRadius  : '0px'                     as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline       : '0px'                     as CssKnownProps['paddingInline'],
        paddingBlock        : '0px'                     as CssKnownProps['paddingBlock' ],
        
        navMarginBlockEnd   : contents.paddingBlock     as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndSm : contents.paddingBlockSm   as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndLg : contents.paddingBlockLg   as CssKnownProps['marginBlockEnd'],
    };
}, { prefix: 'crsl' });



// react components:
export interface CarouselProps<TElement extends HTMLElement = HTMLElement>
    extends
        // bases:
        ContentProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        CarouselVariant,
        
        // components:
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
    const carouselVariant   = useCarouselVariant(props);
    const infiniteLoop      = carouselVariant.infiniteLoop;
    
    
    
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
        prevButtonComponent = (<ButtonIcon iconPosition='start' icon='prev' buttonStyle='ghost' /> as React.ReactComponentElement<any, ButtonProps>),
        nextButtonComponent = (<ButtonIcon iconPosition='end'   icon='next' buttonStyle='ghost' /> as React.ReactComponentElement<any, ButtonProps>),
        navscrollComponent  = (<Navscroll<Element> orientation='inline'     listStyle='bullet'  /> as React.ReactComponentElement<any, NavscrollProps<Element>>),
        
        
        
        // children:
        children,
    ...restContentProps} = props;
    
    
    
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
    const updateDummyDiff = (diff: number) => {
        // conditions:
        if (!itemsCount) return;
        
        
        
        dummyDiff.current = (((dummyDiff.current - diff) % itemsCount) + itemsCount) % itemsCount;
    };
    
    
    
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
            const listDiff        = (dummyDiff.current * listElm.clientWidth); // converts logical diff to physical diff
            const listLeftLoop    = listCurrentPos + listLeft + listDiff;      // current scroll + scroll by + diff
            const listLeftAbs     = listLeftLoop % listElm.scrollWidth;        // wrap overflowed left
            
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
    
    
    
    // functions:
    const normalizeListItems = (listElm: TElement) => {
        if (!itemsCount) return; // empty items => nothing to do
        
        const dummyCurrentDiff = dummyDiff.current;
        if (!dummyCurrentDiff) return; // no difference => nothing to do
        
        
        
        // remember the current listElm's scrollPos before modifying:
        const listCurrentPos = listElm.scrollLeft;
        
        
        
        // decide which side to be moved:
        const modifLeft = dummyCurrentDiff <= (itemsCount / 2);
        if (modifLeft) { // modify the left side
            Array.from(listElm.childNodes).slice(0, dummyCurrentDiff) // take nth elements from the left
            .forEach((item) => listElm.append(item));                 // insert the items at the end
        }
        else { // modify the right side
            Array.from(listElm.childNodes).slice(-(itemsCount - dummyCurrentDiff))     // take nth elements from the right
            .reverse()                                                                 // inserting at the beginning causes the inserted items to be reversed, so we're re-reversing them to keep the order
            .forEach((item) => listElm.insertBefore(item, listElm.firstElementChild)); // insert the items at the beginning
        } // if
        
        
        
        // set the listElm's scrollPos to the correct image:
        const listStyle  = getComputedStyle(listElm);
        const frameWidth = listElm.clientWidth - (Number.parseInt(listStyle.paddingLeft) || 0) - (Number.parseInt(listStyle.paddingRight ) || 0);
        const steps      = modifLeft ? (itemsCount - dummyCurrentDiff) : (-dummyCurrentDiff);
        listElm.scrollTo({
            left     : listCurrentPos + (frameWidth * steps),
            behavior : ('instant' as any) // no scrolling animation during sync
        });
        
        
        
        // reset the diff of listElm & dummyListElm:
        dummyDiff.current = 0;
    };
    
    const scrollBy           = (listElm: TElement, nextSlide: boolean) => {
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
    const scrollTo           = (targetSlide: HTMLElement|null) => {
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
    
    const isBeginOfScroll    = (listElm: TElement) => (
        (listElm.scrollLeft <= 0.5)
        &&
        (listElm.scrollTop  <= 0.5)
    );
    const isEndOfScroll      = (listElm: TElement) => (
        (((listElm.scrollWidth  - listElm.clientWidth ) - listElm.scrollLeft) <= 0.5)
        &&
        (((listElm.scrollHeight - listElm.clientHeight) - listElm.scrollTop ) <= 0.5)
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
                updateDummyDiff(-1);
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
                updateDummyDiff(1);
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
    const dummyHandleScroll       = useEvent<React.UIEventHandler<TElement>>((event) => {
        const dummyCurrentDiff = dummyDiff.current;
        if (!dummyCurrentDiff) return; // no difference => nothing to do
        
        
        
        const dummyListElm = dummyListRefInternal.current;
        if (!dummyListElm) return; // dummyListElm must be exist for syncing
        
        const listElm      = listRefInternal.current;
        if (!listElm)      return; // listElm must be exist to sync
        
        
        
        // set the dummyListElm's scrollPos to the correct image:
        const dummyListStyle = getComputedStyle(dummyListElm);
        const frameWidth     = dummyListElm.clientWidth - (Number.parseInt(dummyListStyle.paddingLeft) || 0) - (Number.parseInt(dummyListStyle.paddingRight ) || 0);
        if ((dummyListElm.scrollLeft % frameWidth) >= 0.5) return; // not an exact step (fragment step) => scrolling is still in progress => abort
        
        
        
        // sync listElm scrolling position to dummyListElm scrolling position:
        normalizeListItems(listElm);
    });
    
    
    
    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restContentProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            {children && <>
                {/* .list */}
                <Generic<TElement>
                    // refs:
                    elmRef={mergedListRef}
                    
                    
                    
                    // semantics:
                    tag='ul'
                    
                    
                    
                    // classes:
                    classes={_defaultListElmClasses}
                >
                    {React.Children.map(children, (child, index) =>
                        /* .item */
                        <Generic<TElement>
                            // identifiers:
                            key={index}
                            
                            
                            
                            // semantics:
                            tag='li'
                        >
                            {child}
                        </Generic>
                    )}
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
                    {React.Children.map(children, (_child, index) =>
                        /* .dummy-item */
                        <div
                            // identifiers:
                            key={index}
                        />
                    )}
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
                    size     : prevButtonComponent.props.size     ?? basicVariantProps.size     ?? 'lg',
                    gradient : prevButtonComponent.props.gradient ?? basicVariantProps.gradient ?? true,
                    
                    
                    
                    // classes:
                    classes  : mergedPrevButtonClasses,
                    
                    
                    
                    // accessibilities:
                    label    : prevButtonComponent.props.label ?? 'Previous',
                    
                    
                    
                    // handlers:
                    onClick : handlePrevClick,
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
                    size     : nextButtonComponent.props.size     ?? basicVariantProps.size     ?? 'lg',
                    gradient : nextButtonComponent.props.gradient ?? basicVariantProps.gradient ?? true,
                    
                    
                    
                    // classes:
                    classes  : mergedNextButtonClasses,
                    
                    
                    
                    // accessibilities:
                    label    : nextButtonComponent.props.label ?? 'Next',
                    
                    
                    
                    // handlers:
                    onClick : handleNextClick,
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
                    outlined               : navscrollComponent.props.outlined ?? basicVariantProps.outlined ?? true,
                    
                    
                    
                    // classes:
                    classes                : mergedNavscrollClasses,
                    
                    
                    
                    // scrolls:
                    scrollingOf            : navscrollComponent.props.scrollingOf            ?? (infiniteLoop ? dummyListRefInternal : listRefInternal),
                    scrollingInterpolation : navscrollComponent.props.scrollingInterpolation ?? true,
                },
                
                
                
                // children:
                navscrollComponent.props.children ?? React.Children.map(children, (child, index) => (
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
                )),
            )}
        </Content>
    );
};
export {
    Carousel,
    Carousel as default,
}
