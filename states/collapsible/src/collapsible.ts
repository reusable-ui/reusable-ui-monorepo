// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    states,
    style,
    vars,
    iif,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    
    
    
    // reads/writes css variables configuration:
    CssConfigProps,
    Refs,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    EventHandler,
    useScheduleTriggerEvent,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    SemanticProps,
    useSemantic,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
    
    
    
    // react components:
    AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    useAnimatingState,
}                           from '@reusable-ui/animating-state' // a hook for creating animating state

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI



// hooks:

// states:

//#region collapsible
export interface CollapsibleVars {
    anim : any
}
const [collapsibleVars] = cssVars<CollapsibleVars>({ prefix: 'co', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names

{
    const {animationRegistry: {registerAnim}} = usesAnimation();
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
            // config states:
            ...states([
                iif(!!config, {
                    ...ifExpand({
                        // overwrites propName = propName{'Expand'}:
                        ...overwriteProps(config!, usesSuffixedProps(config!, 'expand')),
                    }),
                    ...ifCollapse({
                        // overwrites propName = propName{'Collapse'}:
                        ...overwriteProps(config!, usesSuffixedProps(config!, 'collapse')),
                    }),
                }),
            ]),
            
            
            
            // animation states:
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
        Partial<Pick<TExpandedChangeEvent,
            |'expanded'
        >>
{
}

export const enum CollapsibleState {
    Collapsed  = 0,
    Collapsing = 1,
    Expanding  = 2,
    Expanded   = 3,
}

export interface CollapsibleApi<TElement extends Element = HTMLElement> {
    expanded              : boolean
    isVisible             : boolean
    
    state                 : CollapsibleState
    class                 : string|null
    
    props                 :
        | { open: true }
        | null
    
    handleAnimationStart  : React.AnimationEventHandler<TElement>
    handleAnimationEnd    : React.AnimationEventHandler<TElement>
    handleAnimationCancel : React.AnimationEventHandler<TElement>
}

const collapsibleCtrls = [
    'dialog',
    'details',
];
export const useCollapsible = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: CollapsibleProps<TExpandedChangeEvent> & SemanticProps): CollapsibleApi<TElement> => {
    // fn props:
    const propExpanded = props.expanded ?? false;
    const { tag } = useSemantic(props);
    
    
    
    // fn states:
    /*
     * state is expand/collapse based on [controllable expanded]
     * [uncontrollable expanded] is not supported
     */
    const expandedFn : boolean = propExpanded /*controllable*/;
    
    
    
    // states:
    const [expanded, setExpanded, animation, {handleAnimationStart, handleAnimationEnd, handleAnimationCancel}] = useAnimatingState<boolean, TElement>({
        initialState  : expandedFn,
        animationName : /((^|[^a-z])(expand|collapse)|([a-z])(Expand|Collapse))(?![a-z])/,
    });
    
    
    
    // update state:
    const expandingTokenRef = useRef<number>(0);
    if (expanded !== expandedFn) { // change detected => apply the change & start animating
        const expandingTokenLocal = (expandingTokenRef.current === Number.MAX_SAFE_INTEGER) ? 0 : (++expandingTokenRef.current);
        expandingTokenRef.current = expandingTokenLocal;
        
        
        
        if (expandedFn) {
            // expanding:
            /*
                Make a delay time in order to React to completing the rendering <ChildComponent> (if `lazy=true` applied)
            */
            Promise.resolve().then(() => {
                if (expandingTokenRef.current === expandingTokenLocal) { // if token changed => abort to `setExpanded`
                    setExpanded(expandedFn); // remember the last change
                } // if
            });
        }
        else {
            // collapsing:
            /*
                No need to make a delay time.
            */
            setExpanded(expandedFn); // remember the last change
        } // if
    } // if
    
    
    
    // fn props:
    const state = ((): CollapsibleState => {
        // expanding:
        if (animation === true ) return CollapsibleState.Expanding;
        
        // collapsing:
        if (animation === false) return CollapsibleState.Collapsing;
        
        // fully expanded:
        if (expanded) return CollapsibleState.Expanded;
        
        // fully collapsed:
        return CollapsibleState.Collapsed;
    })();
    const stateClass = ((): string|null => {
        switch (state) {
            // expanding:
            case CollapsibleState.Expanding: {
                // not [expanded] but *still* animating of expanding => force to keep expanding using class .expanding
                if (!expanded) return 'expanding';
                
                if (tag && collapsibleCtrls.includes(tag)) return null; // uses [open]
                return 'expanding';
            };
            
            // collapsing:
            case CollapsibleState.Collapsing: {
                return 'collapsing';
            };
            
            // fully expanded:
            case CollapsibleState.Expanded: {
                return 'expanded';
            };
            
            // fully collapsed:
            case CollapsibleState.Collapsed: {
                return null;
            };
        } // switch
    })();
    
    
    
    // api:
    return {
        expanded  : expanded,
        isVisible : (
            propExpanded // sooner   : The <ChildComponent> need to be rendered first BEFORE the expading animation OCCURED
            // ||
            // expanded  // too late : The expading animation is running BEFORE the <ChildComponent> already rendered
            ||
            (animation !== undefined) // being collapsing but not fully collapsed
        ),
        
        state     : state,
        class     : stateClass,
        
        props     : (() => {
            if (!expanded) return null;
            
            // use [open] if <dialog> or <details>:
            if (tag && collapsibleCtrls.includes(tag)) return { open: true };
            
            // else, use .expanding or .expanded which already defined in `class`:
            return null;
        })(),
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    };
};



export interface CollapsibleEventProps
{
    // handlers:
    onExpandStart   ?: EventHandler<void>
    onExpandEnd     ?: EventHandler<void>
    onCollapseStart ?: EventHandler<void>
    onCollapseEnd   ?: EventHandler<void>
}
export const useCollapsibleEvent = <TElement extends Element = HTMLElement>(props: CollapsibleEventProps, collapsibleApi: CollapsibleApi<TElement>): void => {
    // states:
    const {state} = collapsibleApi;
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
    const {
        onExpandStart,
        onCollapseStart,
        onExpandEnd,
        onCollapseEnd,
    } = props;
    const prevState = useRef<CollapsibleState>(state);
    useEffect(() => {
        // conditions:
        if (prevState.current === state) return; // no change detected => ignore
        prevState.current = state; // sync the last change
        
        
        
        // actions:
        switch (state) {
            // expanding:
            case CollapsibleState.Expanding:
                if (onExpandStart) scheduleTriggerEvent(() => { // runs the `onExpandStart` event *next after* current macroTask completed
                    // fire `onExpandStart` react event:
                    onExpandStart();
                });
                break;
            
            // collapsing:
            case CollapsibleState.Collapsing:
                if (onCollapseStart) scheduleTriggerEvent(() => { // runs the `onCollapseStart` event *next after* current macroTask completed
                    // fire `onCollapseStart` react event:
                    onCollapseStart();
                });
                break;
            
            // fully expanded:
            case CollapsibleState.Expanded:
                if (onExpandEnd) scheduleTriggerEvent(() => { // runs the `onExpandEnd` event *next after* current macroTask completed
                    // fire `onExpandEnd` react event:
                    onExpandEnd();
                });
                break;
            
            // fully collapsed:
            case CollapsibleState.Collapsed:
                if (onCollapseEnd) scheduleTriggerEvent(() => { // runs the `onCollapseEnd` event *next after* current macroTask completed
                    // fire `onCollapseEnd` react event:
                    onCollapseEnd();
                });
                break;
        } // switch
    }, [
        state,
        onExpandStart,
        onCollapseStart,
        onExpandEnd,
        onCollapseEnd,
    ]);
};



export interface ControllableCollapsibleProps<TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // states:
        CollapsibleProps<TExpandedChangeEvent>
{
    // states:
    onExpandedChange ?: EventHandler<TExpandedChangeEvent>
}
export interface UncontrollableCollapsibleProps<TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // states:
        ControllableCollapsibleProps<TExpandedChangeEvent>
{
    // states:
    defaultExpanded  ?: boolean
}
export const useUncontrollableCollapsible = <TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: UncontrollableCollapsibleProps<TExpandedChangeEvent> & Pick<AccessibilityProps, 'enabled'|'inheritEnabled'|'readOnly'|'inheritReadOnly'>): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<void>] => {
    // accessibilities:
    const propEnabled          = usePropEnabled(props);
    const propReadOnly         = usePropReadOnly(props);
    const isDisabledOrReadOnly = (!propEnabled || propReadOnly);
    
    
    
    // states:
    const [expandedTg, setExpandedTg] = useState<boolean>(props.defaultExpanded ?? false);
    
    
    
    /*
     * state is expanded/collapsed based on [controllable expanded] (if set) and fallback to [uncontrollable expanded]
     */
    const expandedFn : boolean = props.expanded /*controllable*/ ?? expandedTg /*uncontrollable*/;
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
    const {
        onExpandedChange,
    } = props;
    /*
          controllable : setExpanded(new) => update state(old => old) => trigger Event(new)
        uncontrollable : setExpanded(new) => update state(old => new) => trigger Event(new)
    */
    const triggerExpandedChange = useEvent<React.Dispatch<boolean>>((expanded) => {
        if (onExpandedChange) scheduleTriggerEvent(() => { // runs the `onExpandedChange` event *next after* current macroTask completed
            // fire `onExpandedChange` react event:
            onExpandedChange({ expanded } as TExpandedChangeEvent);
        });
    });
    
    
    
    // callbacks:
    const setExpanded           = useEvent<React.Dispatch<React.SetStateAction<boolean>>>((expanded) => {
        // conditions:
        if (isDisabledOrReadOnly) return; // control is disabled or readOnly => no response required
        
        const newExpanded = (typeof(expanded) === 'function') ? expanded(expandedFn) : expanded;
        if (newExpanded === expandedFn) return; // still the same => nothing to update
        
        
        
        // update:
        setExpandedTg(newExpanded);
        triggerExpandedChange(newExpanded);
    }); // a stable callback, the `setExpanded` guaranteed to never change
    const toggleExpanded        = useEvent<React.Dispatch<void>>(() => {
        // conditions:
        if (isDisabledOrReadOnly) return; // control is disabled or readOnly => no response required
        
        
        
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
