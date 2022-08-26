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

// reusable-ui components:
import {
    // react components:
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import type {
    // react components:
    BasicProps,
}                           from '@reusable-ui/basic'           // a base component
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

// .navbar > .list > .item > .media
const listElm      = ':where(.list)'; // zero specificity
const dummyListElm = '.dummy';
const itemElm      = '*';             // zero specificity
const prevBtnElm   = '.prevBtn';
const nextBtnElm   = '.nextBtn';
const navElm       = '.nav';



export const usesNavbarLayout = (options?: ContentChildrenMediaOptions) => {
    // dependencies:
    
    // features:
    const {paddingRule, paddingVars} = usesPadding(navbars);
    
    
    
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
            
            
            
            // customize:
            ...usesCssProps(navbars), // apply config's cssProps
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
};
export const usesNavbarVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(navbars);
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            resizableRule,
        ]),
    });
};

export const useNavbarStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesNavbarLayout(),
        
        // variants:
        usesNavbarVariants(),
    ]),
}), { id: 'v35mas3qt6' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export interface NavbarVariant {
    infiniteLoop ?: boolean
}
export const useNavbarVariant = (props: NavbarVariant) => {
    return {
        infiniteLoop: props.infiniteLoop ?? false,
    };
};



// configs:
export const [navbars, navbarValues, cssNavbarConfig] = cssConfig(() => {
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
export interface NavbarProps<TElement extends HTMLElement = HTMLElement>
    extends
        // bases:
        ContentProps<TElement>,
        
        // variants:
        NavbarVariant,
        
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
const Navbar = <TElement extends HTMLElement = HTMLElement>(props: NavbarProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet    = useNavbarStyleSheet();
    
    
    
    // variants:
    const navbarVariant = useNavbarVariant(props);
    const infiniteLoop  = navbarVariant.infiniteLoop;
    
    
    
    // forward props:
    const {
        // from <Basic>:
        size,
        nude,
        theme,
        gradient,
        outlined,
        mild,
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
        navscrollComponent  = (<Navscroll<Element> orientation='inline' listStyle='bullet' />                                                        as React.ReactComponentElement<any, NavscrollProps<Element>>),
        
        
        
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
    const colorSystemProps : BasicProps<any> = {
        // from <Basic>:
        size,
        nude,
        theme,
        gradient,
        outlined,
        mild,
    };
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
                    // color system props:
                    ...colorSystemProps,
                    
                    
                    
                    // other props:
                    ...prevButtonComponent.props,
                    
                    
                    
                    // classes:
                    classes : mergedPrevButtonClasses,
                    
                    
                    
                    // accessibilities:
                    label   : prevButtonComponent.props.label ?? 'Previous',
                    
                    
                    
                    // handlers:
                    onClick : handlePrevClick,
                },
            )}
            
            {React.cloneElement<ButtonProps>(nextButtonComponent,
                // props:
                {
                    // color system props:
                    ...colorSystemProps,
                    
                    
                    
                    // other props:
                    ...nextButtonComponent.props,
                    
                    
                    
                    // classes:
                    classes : mergedNextButtonClasses,
                    
                    
                    
                    // accessibilities:
                    label   : nextButtonComponent.props.label ?? 'Next',
                    
                    
                    
                    // handlers:
                    onClick : handleNextClick,
                },
            )}
            
            {React.cloneElement<NavscrollProps<Element>>(navscrollComponent,
                // props:
                {
                    // color system props:
                    ...colorSystemProps,
                    
                    
                    
                    // other props:
                    ...navscrollComponent.props,
                    
                    
                    
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
    Navbar,
    Navbar as default,
}
