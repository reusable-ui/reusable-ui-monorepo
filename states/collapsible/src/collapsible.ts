// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
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
    
    
    
    // styles:
    style,
    vars,
    
    
    
    // utilities:
    iif,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    // types:
    CssConfigProps,
    Refs,
    
    
    
    // utilities:
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    EventHandler,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    SemanticProps,
    useSemantic,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI



// hooks:

// states:

//#region collapsible
export interface CollapsibleVars {
    filter : any
    anim   : any
}
const [collapsibleVars] = cssVars<CollapsibleVars>();

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(collapsibleVars.filter);
    registerAnim(collapsibleVars.anim);
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



export interface CollapsibleStuff { collapsibleRule: Factory<CssRule>, collapsibleVars: CssVars<CollapsibleVars> }
export interface CollapsibleConfig {
    animExpand   ?: CssKnownProps['animation']
    animCollapse ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to expand/reduce its size or toggle the visibility.
 * @param config  A configuration of `collapsibleRule`.
 * @returns A `CollapsibleStuff` represents a collapsible state.
 */
export const usesCollapsible = <TConfigProps extends CssConfigProps = CssConfigProps>(config?: CollapsibleConfig & Refs<TConfigProps>): CollapsibleStuff => {
    return {
        collapsibleRule: () => style({
            ...states([
                ifExpanding({
                    ...vars({
                        [collapsibleVars.anim] : config?.animExpand,
                    }),
                }),
                ifCollapsing({
                    ...vars({
                        [collapsibleVars.anim] : config?.animCollapse,
                    }),
                }),
                
                
                
                iif(!!config, {
                    ...ifExpand({
                        // overwrites propName = propName{'Expand'}:
                        ...overwriteProps(config!, usesSuffixedProps(config!, 'Expand')),
                    }),
                    ...ifCollapse({
                        // overwrites propName = propName{'Collapse'}:
                        ...overwriteProps(config!, usesSuffixedProps(config!, 'Collapse')),
                    }),
                }),
            ]),
        }),
        collapsibleVars,
    };
};



export interface ExpandedChangeEvent {
    // states:
    expanded : boolean
}
export interface CollapsibleProps<TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // states:
        Partial<Pick<TExpandedChangeEvent, 'expanded'>>
{
}

const collapsibleCtrls = [
    'dialog',
    'details',
];
export const useCollapsible = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: CollapsibleProps<TExpandedChangeEvent> & SemanticProps) => {
    // fn props:
    const isExpanded  = props.expanded ?? false;
    const { tag } = useSemantic(props);
    
    
    
    // states:
    const [expanded,  setExpanded ] = useState<boolean>(isExpanded); // true => expand, false => collapse
    const [animating, setAnimating] = useState<boolean|null>(null);  // null => no-animation, true => expanding-animation, false => collapsing-animation
    
    
    
    /*
     * state is expand/collapse based on [controllable expanded]
     * [uncontrollable expanded] is not supported
     */
    const expandFn : boolean = isExpanded /*controllable*/;
    
    if (expanded !== expandFn) { // change detected => apply the change & start animating
        setExpanded(expandFn);   // remember the last change
        setAnimating(expandFn);  // start expanding-animation/collapsing-animation
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(expand|collapse)|(?<=[a-z])(Expand|Collapse))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (expand|collapse)[Foo] or boo(Expand|Collapse)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop expanding-animation/collapsing-animation
    });
    
    
    
    return {
        expanded  : expanded,
        isVisible : expanded || (animating !== null),
        
        class     : ((): string|null => {
            // expanding:
            if (animating === true) {
                if (tag && collapsibleCtrls.includes(tag)) return null; // uses [open]
                return 'expanding';
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
            
            // use [open] if <dialog> or <details>:
            if (tag && collapsibleCtrls.includes(tag)) return { open: true };
            
            // else, use .expanding or .expanded which already defined in `class`:
            return null;
        })(),
        
        handleAnimationEnd,
    };
};



export interface ToggleCollapsibleProps<TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // states:
        CollapsibleProps<TExpandedChangeEvent>
{
    // states:
    defaultExpanded  ?: boolean
    onExpandedChange ?: EventHandler<TExpandedChangeEvent>
}
export const useToggleCollapsible = <TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: ToggleCollapsibleProps<TExpandedChangeEvent>): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<void>] => {
    // states:
    const [expandedTg, setExpandedTg] = useState<boolean>(props.defaultExpanded ?? false);
    
    
    
    /*
     * state is expanded/collapsed based on [controllable expanded] (if set) and fallback to [uncontrollable expanded]
     */
    const expandedFn : boolean = props.expanded /*controllable*/ ?? expandedTg /*uncontrollable*/;
    
    
    
    // callbacks:
    /*
          controllable : setExpanded(new) => update state(old => old) => trigger Event(new)
        uncontrollable : setExpanded(new) => update state(old => new) => trigger Event(new)
    */
    const triggerExpandedChange = useEvent<React.Dispatch<boolean>>((expanded) => {
        Promise.resolve().then(() => { // trigger the event after the <Collapsible> has finished rendering (for controllable <Collapsible>)
            // fire expandedChange synthetic event:
            props.onExpandedChange?.({ expanded } as TExpandedChangeEvent);
        });
    });
    const setExpanded           = useEvent<React.Dispatch<React.SetStateAction<boolean>>>((expanded) => {
        // conditions:
        const newExpanded = (typeof(expanded) === 'function') ? expanded(expandedFn) : expanded;
        if (newExpanded === expandedFn) return; // still the same => nothing to update
        
        
        
        // update:
        setExpandedTg(newExpanded);
        triggerExpandedChange(newExpanded);
    }); // a stable callback, the `setExpanded` guaranteed to never change
    const toggleExpanded        = useEvent<React.Dispatch<void>>(() => {
        const newExpanded = !expandedFn;
        
        
        
        // update:
        setExpandedTg(newExpanded);
        triggerExpandedChange(newExpanded);
    }); // a stable callback, the `toggleExpanded` guaranteed to never change
    
    
    
    return [
        expandedFn,
        setExpanded,
        toggleExpanded,
    ];
};
//#endregion collapsible
