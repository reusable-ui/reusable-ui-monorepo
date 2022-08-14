// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useCallback,
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
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

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
import {
    // hooks:
    usePropAccessibility,
    usePropActive,
    
    
    
    // react components:
    AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// reusable-ui features:
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui variants:
import {
    // hooks:
    outlinedOf,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    mildOf,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI



// hooks:

// states:

//#region activatable
export interface ActivatableVars {
    filter : any
    anim   : any
}
const [activatableVars] = cssVars<ActivatableVars>();

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(activatableVars.filter);
    registerAnim(activatableVars.anim);
}



// .actived will be added after activating-animation done:
const selectorIfActived     = '.actived'
// [aria-checked],[aria-pressed],[aria-selected] = styled active, :checked = native active:
const selectorIfActivating  = ':is([aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked):not(.actived)'
// .passivating will be added after loosing active and will be removed after deactivating-animation done:
const selectorIfPassivating = '.passivating'
// if all above are not set => passived:
const selectorIfPassived    = ':not(:is(.actived, [aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked, .passivating))'



export const ifActived           = (styles: CssStyleCollection): CssRule => rule(selectorIfActived    , styles);
export const ifActivating        = (styles: CssStyleCollection): CssRule => rule(selectorIfActivating , styles);
export const ifPassivating       = (styles: CssStyleCollection): CssRule => rule(selectorIfPassivating, styles);
export const ifPassived          = (styles: CssStyleCollection): CssRule => rule(selectorIfPassived   , styles);

export const ifActive            = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActived                                           ], styles);
export const ifPassive           = (styles: CssStyleCollection): CssRule => rule([                                         selectorIfPassivating, selectorIfPassived], styles);
export const ifActivePassivating = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActived, selectorIfPassivating                    ], styles);



export interface ActivatableStuff { activatableRule: Factory<CssRule>, activatableVars: CssVars<ActivatableVars> }
export interface ActivatableConfig {
    filterActive ?: CssKnownProps['filter'   ]
    
    animActive   ?: CssKnownProps['animation']
    animPassive  ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to be highlighted/selected/activated.
 * @param config  A configuration of `activatableRule`.
 * @returns A `ActivatableStuff` represents an activatable state.
 */
export const usesActivatable = (config?: ActivatableConfig): ActivatableStuff => {
    return {
        activatableRule: () => style({
            ...states([
                ifActived({
                    ...vars({
                        [activatableVars.filter] : config?.filterActive,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [activatableVars.filter] : config?.filterActive,
                        [activatableVars.anim  ] : config?.animActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [activatableVars.filter] : config?.filterActive,
                        [activatableVars.anim  ] : config?.animPassive,
                    }),
                }),
            ]),
        }),
        activatableVars,
    };
};

export interface MarkActiveOptions {
    outlined ?: boolean|null
    mild     ?: boolean|null
}
export const markActive = (options?: MarkActiveOptions): CssRule => {
    // options:
    const { outlined = false, mild = false } = options ?? {};
    
    
    
    return style({
        ...imports([
            outlinedOf(outlined), // kill outlined variant
            mildOf(mild),         // kill mild     variant
        ]),
    });
};



export interface ActivatableProps
    extends
        // states:
        Partial<Pick<AccessibilityProps, 'active'|'inheritActive'>>
{
}

const checkableCtrls = [
    'checkbox',
    'radio',
];
export const useActivatable = <TElement extends Element = HTMLElement>(props: ActivatableProps & SemanticProps) => {
    // fn props:
    const propActive  = usePropActive(props);
    const {tag, role} = useSemantic(props);
    
    
    
    // states:
    const [actived,   setActived  ] = useState<boolean>(propActive); // true => active, false => passive
    const [animating, setAnimating] = useState<boolean|null>(null);  // null => no-animation, true => activating-animation, false => deactivating-animation
    
    
    
    /*
     * state is active/passive based on [controllable active]
     * [uncontrollable active] is not supported
     */
    const activeFn : boolean = propActive /*controllable*/;
    
    if (actived !== activeFn) { // change detected => apply the change & start animating
        setActived(activeFn);   // remember the last change
        setAnimating(activeFn); // start activating-animation/deactivating-animation
    } // if
    
    
    
    // handlers:
    const handleAnimationEnd = useEvent<React.AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (event.target !== event.currentTarget) return; // ignores bubbling
        if (!/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(event.animationName)) return; // ignores animation other than (active|passive)[Foo] or boo(Active|Passive)[Foo]
        
        
        
        // clean up finished animation
        
        setAnimating(null); // stop activating-animation/deactivating-animation
    });
    
    
    
    return {
        active    : actived,
        isVisible : actived || (animating !== null),
        
        class     : ((): string|null => {
            // activating:
            if (animating === true) return null; // uses :checked or [aria-checked] or [aria-pressed] or [aria-selected]
            
            // passivating:
            if (animating === false) return 'passivating';
            
            // fully actived:
            if (actived) return 'actived';
            
            // fully passived:
            return null;
        })(),
        
        props     : (() => {
            if (!actived) return null;
            
            // use :checked if <input type="checkbox|radio">:
            if ((tag === 'input') && checkableCtrls.includes((props as any).type)) return { checked: true };
            
            // use [aria-checked] if [role="checkbox|radio"]:
            if (role && checkableCtrls.includes(role)) return { 'aria-checked': true };
            
            // use [aria-pressed] if <button> or [role="button"]:
            if ((tag === 'button') || (role === 'button')) return { 'aria-pressed': true };
            
            // else, use [aria-selected]:
            return { 'aria-selected' : true };
        })(),
        
        handleAnimationEnd,
    };
};



export interface ActiveChangeEvent {
    // states:
    active : boolean
}
export interface ToggleActivatableProps<TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>
    extends
        // states:
        ActivatableProps,
        
        // accessibilities:
        AccessibilityProps
{
    // states:
    defaultActive  ?: boolean
    onActiveChange ?: EventHandler<TActiveChangeEvent>
}
export const useToggleActivatable = <TActiveChangeEvent extends ActiveChangeEvent = ActiveChangeEvent>(props: ToggleActivatableProps<TActiveChangeEvent>, changeEventTarget?: (React.RefObject<HTMLInputElement>|null)): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<void>] => {
    // fn props:
    const {enabled, readOnly, active} = usePropAccessibility<boolean, boolean, null>(props, undefined, undefined, null);
    
    
    
    // states:
    const [activeTg, setActiveTg] = useState<boolean>(props.defaultActive ?? false);
    
    
    
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn : boolean = active /*controllable*/ ?? activeTg /*uncontrollable*/;
    
    
    
    // states:
    const isDisabledOrReadOnly   = useRef<boolean>(!enabled || readOnly); // a stable reference used by 2 callbacks below
    isDisabledOrReadOnly.current = (!enabled || readOnly);
    
    const wasActiveFn            = useRef<boolean>(activeFn); // a stable reference used by 2 callbacks below
    wasActiveFn.current          = (activeFn);
    
    const onActiveChange         = useRef<EventHandler<TActiveChangeEvent>|undefined>(props.onActiveChange);
    onActiveChange.current       = props.onActiveChange;
    
    
    
    // callbacks:
    /*
          controllable : setActive(new) => update state(old => old) => trigger Event(new)
        uncontrollable : setActive(new) => update state(old => new) => trigger Event(new)
    */
    const triggerActiveChange = useCallback((active: boolean): void => {
        Promise.resolve().then(() => { // trigger the event after the <Component> has finished rendering (for controllable <Component>)
            // fire change synthetic event:
            onActiveChange.current?.({ active } as TActiveChangeEvent);
            
            // fire change dom event:
            if (changeEventTarget?.current) {
                // *hack*: trigger `onChange` event:
                // side effect: toggles the [checked] prop:
                changeEventTarget.current.dispatchEvent(new PointerEvent('click', { bubbles: true, cancelable: true, composed: true }));
            } // if
        });
    }, []);
    const setActive    : React.Dispatch<React.SetStateAction<boolean>> = useCallback((active: React.SetStateAction<boolean>): void => {
        // conditions:
        if (isDisabledOrReadOnly.current) return; // control is disabled or readOnly => no response required
        
        const newActive = (typeof(active) === 'function') ? active(wasActiveFn.current) : active;
        if (newActive === wasActiveFn.current) return; // still the same => nothing to update
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }, []); // a stable callback, the `setActive` guaranteed to never change
    const toggleActive : React.Dispatch<void> = useCallback((): void => {
        // conditions:
        if (isDisabledOrReadOnly.current) return; // control is disabled or readOnly => no response required
        
        
        
        const newActive = !wasActiveFn.current;
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }, []); // a stable callback, the `toggleActive` guaranteed to never change
    
    
    
    return [
        activeFn,
        setActive,
        toggleActive,
    ];
};
//#endregion activatable
