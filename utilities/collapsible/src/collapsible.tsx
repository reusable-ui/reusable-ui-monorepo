// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    states,
    keyframes,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // types:
    SemanticProps,
    useSemantic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeConditional,
    outlinedOf,
    mildOf,
    usesAnim,
    fallbackNoneFilter,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component



// hooks:

// accessibilities:

//#region expandable
export interface ExpandCollapseVars {
    filter : any
    anim   : any
}
const [expands] = cssVar<ExpandCollapseVars>();

{
    const [, , animRegistry] = usesAnim();
    animRegistry.registerFilter(expands.filter);
    animRegistry.registerAnim(expands.anim);
}



// .expanded will be added after expanding-animation done:
const selectorIfExpanded   = '.expanded'
// .expanding = styled expand, [open] = native expand:
const selectorIfExpanding  = ':is(.expanding, [open]):not(.expanded)'
// .collapsing will be added after loosing expand and will be removed after collapsing-animation done:
const selectorIfCollapsing = '.collapsing'
// if all above are not set => collapsed:
const selectorIfCollapsed  = ':not(:is(.expanded, .expanding, [open], .collapsing))'



export const ifExpanded          = (styles: CssStyleCollection): CssRule => rule(selectorIfExpanded  , styles);
export const ifExpanding         = (styles: CssStyleCollection): CssRule => rule(selectorIfExpanding , styles);
export const ifCollapsing        = (styles: CssStyleCollection): CssRule => rule(selectorIfCollapsing, styles);
export const ifCollapsed         = (styles: CssStyleCollection): CssRule => rule(selectorIfCollapsed , styles);

export const ifExpand            = (styles: CssStyleCollection): CssRule => rule([selectorIfExpanding, selectorIfExpanded                                           ], styles);
export const ifCollapse          = (styles: CssStyleCollection): CssRule => rule([                                         selectorIfCollapsing, selectorIfCollapsed], styles);
export const ifExpandCollapsing  = (styles: CssStyleCollection): CssRule => rule([selectorIfExpanding, selectorIfExpanded, selectorIfCollapsing                     ], styles);
export const ifExpandingCollapse = (styles: CssStyleCollection): CssRule => rule([selectorIfExpanding,                     selectorIfCollapsing, selectorIfCollapsed], styles);



export const useExpandCollapseState = <TElement extends Element = HTMLElement, TExpandChangeEvent extends ExpandChangeEvent = ExpandChangeEvent>(props: ExpandableProps<TExpandChangeEvent> & SemanticProps) => {
    // fn props:
    const expand  = props.expand ?? false;
    const { tag } = useSemantic(props);
    
    
    
    // states:
    const [expanded,  setExpanded ] = useState<boolean>(expand);    // true => expand, false => collapse
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => expanding-animation, false => collapsing-animation
    
    
    
    /*
     * state is expand/collapse based on [controllable expand]
     * [uncontrollable expand] is not supported
     */
    const expandFn : boolean = expand /*controllable*/;
    
    if (expanded !== expandFn) { // change detected => apply the change & start animating
        setExpanded(expandFn);   // remember the last change
        setAnimating(expandFn);  // start expanding-animation/collapsing-animation
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(expand|collapse)|(?<=[a-z])(Expand|Collapse))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (active|passive)[Foo] or boo(Active|Passive)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop activating-animation/deactivating-animation
    }, []);
    
    
    
    return {
        expand    : expanded,
        isVisible : expanded || (animating !== null),
        
        class     : ((): string|null => {
            // expanding:
            if (animating === true) return null; // uses :checked or [aria-checked] or [aria-pressed] or [aria-selected] or [data-active]
            if (animating === true) {
                //
            } // if
            
            // collapsing:
            if (animating === false) return 'collapsing';
            
            // fully expanded:
            if (expanded) return 'expanded';
            
            // fully collapsed:
            return null;
        })(),
        
        props     : (() => {
            if (!expanded) return null;
            
            // use :checked if <input type="checkbox|radio">:
            if ((tag === 'input') && checkableCtrls.includes((props as any).type)) return { checked: true };
            
            // use [aria-checked] if [role="checkbox|radio"]:
            if (role && checkableCtrls.includes(role)) return { 'aria-checked': true };
            
            // use [aria-pressed] if <button> or [role="button"]:
            if ((tag === 'button') || (role === 'button')) return { 'aria-pressed': true };
            
            if (role && popupRoles.includes(role)) return { 'data-active': true }
            
            // else, use [aria-selected]:
            return { 'aria-selected' : true };
        })(),
        
        handleAnimationEnd,
    };
};
//#endregion expandable



// react components:
export interface ExpandChangeEvent {
    expand: boolean
}
export interface ExpandableProps<TExpandChangeEvent extends ExpandChangeEvent = ExpandChangeEvent> {
    expand         ?: boolean
    onExpandChange ?: EventHandler<TExpandChangeEvent>
}
