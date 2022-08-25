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
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssStyleCollection,
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

// reusable-ui configs:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system

// reusable-ui utilities:
import {
    // styles:
    stripoutList,
    stripoutScrollbar,
    stripoutImage,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useIsomorphicLayoutEffect,
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

// reusable-ui components:
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
import {
    // react components:
    ButtonProps,
    Button,
    
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



// styles:

// .carousel > .list > .item > .media
const listElm      = ':where(.list)'; // zero specificity
const dummyListElm = '.dummy';
const itemElm      = '*';              // zero specificity
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
            ...usesCssProps(usesPrefixedProps(contents, 'list')), // apply config's cssProps starting with list***
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
        ...usesCssProps(usesPrefixedProps(contents, 'item')), // apply config's cssProps starting with item***
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
            ...usesCssProps(usesPrefixedProps(contents, 'media')), // apply config's cssProps starting with media***
        }),
    });
};

export const usesNavBtnLayout = () => {
    return style({
        // customize:
        ...usesCssProps(usesPrefixedProps(contents, 'navBtn')), // apply config's cssProps starting with navBtn***
    });
};
export const usesPrevBtnLayout = () => {
    return style({
        // layouts:
        gridArea : 'prevBtn',
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(contents, 'prevBtn')), // apply config's cssProps starting with prevBtn***
    });
};
export const usesNextBtnLayout = () => {
    return style({
        // layouts:
        gridArea : 'nextBtn',
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(contents, 'nextBtn')), // apply config's cssProps starting with nextBtn***
    });
};

export const usesNavLayout = () => {
    return style({
        // layouts:
        gridArea    : 'nav',
        
        
        
        // sizes:
        justifySelf : 'center', // do not stretch the nav, just place it at the center horizontally
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(contents, 'nav')), // apply config's cssProps starting with nav***
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
export interface CarouselProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ContentProps<TElement>,
        
        // variants:
        CarouselVariant,
        
        // components:
        NavscrollComponentProps
{
    // refs:
    scrollingRef        ?: React.Ref<TElement> // setter ref
    
    
    
    // components:
    prevButtonComponent ?: ButtonComponentProps['buttonComponent']
    nextButtonComponent ?: ButtonComponentProps['buttonComponent']
    
    
    
    // children:
    children            ?: React.ReactNode
}
const Carousel = <TElement extends Element = HTMLElement>(props: CarouselProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet      = useCarouselStyleSheet();
    
    
    
    // variants:
    const carouselVariant = useCarouselVariant(props);
    const infiniteLoop    = carouselVariant.infiniteLoop;
    
    
    
    // forward props:
    const {
        // from <Basic>:
        size,
        nude,
        theme,
        gradient,
        outlined,
        mild,
        
        
        
        // from <Indicator>:
        enabled,
        inheritEnabled,
        readOnly,
        inheritReadOnly,
        active,
        inheritActive,
    } = props;
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        scrollingRef,
        
        
        
        // variants:
        infiniteLoop : _infiniteLoop, // remove
        
        
        
        // components:
        prevButtonComponent = (<ButtonIcon iconPosition='start' icon='prev' size='lg' buttonStyle='ghost' gradient={true} outlined={false} /> as React.ReactComponentElement<any, ButtonProps>),
        nextButtonComponent = (<ButtonIcon iconPosition='end'   icon='next' size='lg' buttonStyle='ghost' gradient={true} outlined={false} /> as React.ReactComponentElement<any, ButtonProps>),
        navscrollComponent  = (<Navscroll<TElement> orientation='inline' nude={true} />                                                       as React.ReactComponentElement<any, NavscrollProps<TElement>>),
        
        
        
        // children:
        children,
    ...restContentProps} = props;
    type T1 = typeof restContentProps
    type T2 = Omit<T1, keyof ContentProps>
    
    
    
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
    
    const scrollBy = (listElm: TElement, nextSlide: boolean) => {
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
    const scrollTo = (targetSlide: HTMLElement|null) => {
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
    
    const isBeginOfScroll = (listElm: TElement) => (
        (listElm.scrollLeft <= 0.5)
        &&
        (listElm.scrollTop  <= 0.5)
    );
    const isEndOfScroll   = (listElm: TElement) => (
        (((listElm.scrollWidth  - listElm.clientWidth ) - listElm.scrollLeft) <= 0.5)
        &&
        (((listElm.scrollHeight - listElm.clientHeight) - listElm.scrollTop ) <= 0.5)
    );
    
    
    
    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restContentProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    Carousel,
    Carousel as default,
}
