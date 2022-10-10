// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
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
    imports,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript

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
    setOutlined,
    OutlineableProps,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    setMild,
    MildableProps,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI



// hooks:

// states:

//#region activatable
export interface ActivatableVars {
    /* supports for `usesPressAsActiveState()` */
    
    filterActive : any
    
    animActive   : any
    animPassive  : any
    
    
    
    filter       : any
    
    anim         : any
}
const [activatableVars] = cssVars<ActivatableVars>();

{
    const {animationRegistry: {registerFilter, registerAnim}} = usesAnimation();
    registerFilter(activatableVars.filter);
    registerAnim(activatableVars.anim);
}



// .activated will be added after activating-animation done:
const selectorIfActivated   = '.activated'
// [aria-checked],[aria-pressed],[aria-selected] = styled active, :checked = native active:
const selectorIfActivating  = ':is([aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked):not(.activated)'
// .passivating will be added after loosing active and will be removed after deactivating-animation done:
const selectorIfPassivating = '.passivating'
// if all above are not set => passivated:
const selectorIfPassivated  = ':not(:is(.activated, [aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked, .passivating))'



export const ifActivated         = (styles: CssStyleCollection): CssRule => rule(selectorIfActivated  , styles);
export const ifActivating        = (styles: CssStyleCollection): CssRule => rule(selectorIfActivating , styles);
export const ifPassivating       = (styles: CssStyleCollection): CssRule => rule(selectorIfPassivating, styles);
export const ifPassivated        = (styles: CssStyleCollection): CssRule => rule(selectorIfPassivated , styles);

export const ifActive            = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActivated                                           ], styles);
export const ifPassive           = (styles: CssStyleCollection): CssRule => rule([                                         selectorIfPassivating, selectorIfPassivated], styles);
export const ifActivePassivating = (styles: CssStyleCollection): CssRule => rule([selectorIfActivating, selectorIfActivated, selectorIfPassivating                    ], styles);



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
            // configs:
            ...vars({
                /* supports for `usesPressAsActiveState()` */
                
                [activatableVars.filterActive] : config?.filterActive,
                
                [activatableVars.animActive  ] : config?.animActive,
                [activatableVars.animPassive ] : config?.animPassive,
            }),
            
            
            
            // animation states:
            ...states([
                ifActivated({
                    ...vars({
                        [activatableVars.filter] : activatableVars.filterActive,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [activatableVars.filter] : activatableVars.filterActive,
                        [activatableVars.anim  ] : activatableVars.animActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [activatableVars.filter] : activatableVars.filterActive,
                        [activatableVars.anim  ] : activatableVars.animPassive,
                    }),
                }),
            ]),
        }),
        activatableVars,
    };
};

export interface MarkActiveOptions {
    outlined ?: null|OutlineableProps['outlined']
    mild     ?: null|MildableProps['mild']
}
export const markActive = (options?: MarkActiveOptions): CssRule => {
    // options:
    const { outlined = false, mild = false } = options ?? {};
    
    
    
    return style({
        ...imports([
            setOutlined(outlined), // kill outlined variant
            setMild(mild),         // kill mild     variant
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
    const [activated, setActivated] = useState<boolean>(propActive); // true => active, false => passive
    const [animating, setAnimating] = useState<boolean|null>(null);  // null => no-animation, true => activating-animation, false => deactivating-animation
    
    
    
    /*
     * state is active/passive based on [controllable active]
     * [uncontrollable active] is not supported
     */
    const activeFn : boolean = propActive /*controllable*/;
    
    if (activated !== activeFn) { // change detected => apply the change & start animating
        const updateActivated = () => {
            setActivated(activeFn); // remember the last change
            setAnimating(activeFn); // start activating-animation/deactivating-animation
        };
        if (activeFn) {
            // update the state immediately:
            updateActivated();
        }
        else {
            // update the state a bit delayed:
            setTimeout(updateActivated, 2); // supports for toggle active => make sure the `.passivating` state runs *after* `.releasing` state
        } // if
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
        active    : activated,
        isVisible : activated || (animating !== null),
        
        class     : ((): string|null => {
            // activating:
            if (animating === true) return null; // uses :checked or [aria-checked] or [aria-pressed] or [aria-selected]
            
            // passivating:
            if (animating === false) return 'passivating';
            
            // fully activated:
            if (activated) return 'activated';
            
            // fully passivated:
            return null;
        })(),
        
        props     : (() => {
            if (!activated) return null;
            
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
    
    
    
    // callbacks:
    
    const isDisabledOrReadOnly = (!enabled || readOnly);
    
    /*
          controllable : setActive(new) => update state(old => old) => trigger Event(new)
        uncontrollable : setActive(new) => update state(old => new) => trigger Event(new)
    */
    const triggerActiveChange  = useEvent<React.Dispatch<boolean>>((active) => {
        Promise.resolve().then(() => { // trigger the event after the <Component> has finished rendering (for controllable <Component>)
            // fire change dom event:
            const element = changeEventTarget?.current;
            if (element) {
                // *hack*: trigger `onChange` event:
                // side effect: toggles the [checked] prop:
                
                if ((element.tagName === 'INPUT') && (element.type === 'radio') && (element.checked === active)) {
                    element.checked = !active; // *hack* flip before firing click event
                } // if
                
                element.dispatchEvent(new PointerEvent('click', { bubbles: true, cancelable: true, composed: true }));
            } // if
            
            // fire change synthetic event:
            props.onActiveChange?.({ active } as TActiveChangeEvent);
        });
    });
    const setActive            = useEvent<React.Dispatch<React.SetStateAction<boolean>>>((active) => {
        // conditions:
        if (isDisabledOrReadOnly) return; // control is disabled or readOnly => no response required
        
        const newActive = (typeof(active) === 'function') ? active(activeFn) : active;
        if (newActive === activeFn) return; // still the same => nothing to update
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }); // a stable callback, the `setActive` guaranteed to never change
    const toggleActive         = useEvent<React.Dispatch<void>>(() => {
        // conditions:
        if (isDisabledOrReadOnly) return; // control is disabled or readOnly => no response required
        
        
        
        const newActive = !activeFn;
        
        
        
        // update:
        setActiveTg(newActive);
        triggerActiveChange(newActive);
    }); // a stable callback, the `toggleActive` guaranteed to never change
    
    
    
    return [
        activeFn,
        setActive,
        toggleActive,
    ];
};
//#endregion activatable
