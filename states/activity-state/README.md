# @reusable-ui/activity-state 📦  

**activity-state** is a reusable abstraction for representing **state-driven animations** in React components.  
It makes animations a reliable signal — either to show an *ongoing activity* or to *draw user attention*.  

It provides a generic hook that can be specialized into *many kinds of controlled, animation-aware states* by supplying definition parameters.  

With **activity-state**, you can build:  
- **Activity indicator animations** — such as `busy-state`, `processing-state`, or `on-the-way-state`.  
- **Attention-grabbing animations** — such as `excited-state`, `highlight-state`, or `attract-state`.  
- Any state that models a *visual animation lifecycle* tied directly to component state.  

Instead of re-implementing similar logic for each animated state, `activity-state` acts as a common foundation.  
By reusing the same core contract, you ensure consistent behavior, predictable animation lifecycles, and reduced code duplication across your UI ecosystem.  

## ✨ Features
✔ Controlled mode only via `effectiveState`  
✔ Lifecycle-aware animations that respond to current state changes  
✔ Gracefully completes activity animations before stopping or switching to another activity  
✔ Supports multiple animations for multi-valued states  
✔ Semantic classname resolution for consistent styling tied to the current animation  
✔ Emits proactive notifications (`onStateComplete()`) whenever an animation completes and requests a stop or switch  

## 📦 Installation
Install **@reusable-ui/activity-state** via npm or yarn:

```sh
npm install @reusable-ui/activity-state
# or
yarn add @reusable-ui/activity-state
```

## 🧩 Exported Hooks

### `useActivityState(props, options, definition)`

Represents **state-driven animations** with full lifecycle awareness in React components.  
It synchronizes an externally controlled state (`effectiveState`) with the animation system, ensuring animations start, stop, or switch gracefully without interruption.  

By supplying a `definition` that declares the inactive baseline, animation patterns, and classname resolver, you can specialize this hook into domain-specific behaviors such as `busy-state`, `processing-state`, or `excited-state`.  

To implement live updates, dynamically supply the domain-specific observer result into `effectiveState`.  

**Definition parameters:**
- **Activity state classname resolver**  
  Resolves the semantic classname from the current activity.
- **Default animation pattern**  
  Default animation names to match against.
- **Default animation bubbling**  
  Whether to enable bubbling from nested child elements.
- **Inactive state**  
  The baseline state that indicates no activity.

Supports controlled mode only with automatic re-triggering if the parent does not reset its `state` prop after animation completion.  

Declarative keywords (`'auto'`, `'inherit'`, etc.) must be resolved externally before passing into `effectiveState`.  

#### 💡 Usage Example

Represents a component that is busy processing something.  
Prop-driven (controlled-only), with support for declarative keywords like `'auto'`.  
You normalize these keywords into concrete values in your implementation.

```ts
import {
    useActivityState,
    type ActivityStateOptions,
    type ResolveActivityClassnameArgs,
    type ActivityStateDefinition,
    type ActivityState,
} from '@reusable-ui/activity-state'
import { type AnimationEvent } from 'react'
import { type ValueChangeHandler } from '@reusable-ui/controllable'

/** Props for controlling busy state of a component. */
export interface BusyStateProps {
    /**
     * Specifies the busy state.
     * - `true`   → busy
     * - `false`  → idle
     * - `'auto'` → automatically determine busy state based on context
     */
    busy           ?: boolean | 'auto'
    
    /** Signals a request to update the external state driver after completing a busy animation cycle. */
    onBusyComplete ?: ValueChangeHandler<boolean, AnimationEvent>
}

/** Options for customizing busy state behavior and animation lifecycle. */
export interface BusyStateOptions extends ActivityStateOptions<boolean> {
    /** The default busy state if `busy` prop is not provided. */
    defaultBusy ?: boolean | 'auto'
}

/** Semantic CSS classnames tied to busy state. */
export type BusyClassname = 'is-busy' | 'not-busy'

/** Private definition for busy state behavior. */
interface BusyStateDefinition
    extends
        ActivityStateDefinition<boolean, BusyClassname,
            BusyStateProps,
            BusyStateOptions,
            BusyStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}

/**
 * Public API returned by `useBusyState`.
 * 
 * @remarks
 * - Mirrors `ActivityState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `busy`, `actualBusy`, etc.
 */
export interface BusyState<TElement extends Element = HTMLElement>
    extends
        Omit<ActivityState<boolean, BusyClassname, TElement>,
            | 'state'
            | 'actualState'
            | 'activityClassname'
        >
{
    /** The current busy state (animation-aware). */
    busy          : boolean
    
    /** The actual resolved busy state (immediate, may appear out of sync). */
    actualBusy    : boolean
    
    /** A CSS classname reflecting the current busy state. */
    busyClassname : BusyClassname
}

/**
 * Hook for managing busy state with animation lifecycle integration.
 * 
 * @remarks
 * - Controlled-only: state is always driven by props.
 * - Declarative keywords (`'auto'`) are normalized by `useResolvedBusy`.
 * - Provides resolved busy state.
 * - Provides semantic classnames for styling.
 */
export const useBusyState = <TElement extends Element = HTMLElement>(props: BusyStateProps, options?: BusyStateOptions): BusyState<TElement> => {
    const {
        onBusyComplete : onStateComplete,
    } = props;
    
    // Normalize declarative keywords into a concrete boolean:
    const effectiveState = useResolvedBusy(props, options);
    
    // Activity orchestration:
    const {
        state             : busy,
        actualState       : actualBusy,
        activityClassname : busyClassname,
        ...animationHandlers
    } = useActivityState<
        boolean,
        BusyClassname,
        
        BusyStateProps,
        BusyStateOptions,
        BusyStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateComplete },
        
        // Options:
        options,
        
        // Definition:
        {
            // State definitions:
            inactiveState            : false,
            
            // Behavior definitions:
            defaultAnimationPattern  : 'busy',
            defaultAnimationBubbling : false,
            resolveActivityClassname : resolveBusyActivityClassname, // Resolves classnames.
        } satisfies BusyStateDefinition,
    );
    
    // Return domain-specific API:
    return {
        busy,
        actualBusy,
        busyClassname,
        ...animationHandlers,
    } satisfies BusyState<TElement>;
};

/** Normalizes declarative keywords into a concrete and effective busy state. */
const useResolvedBusy = (props: BusyStateProps, options?: BusyStateOptions): boolean => {
    const {
        defaultBusy = 'auto',
    } = options ?? {};
    
    const {
        busy: controlledBusy = defaultBusy,
    } = props;
    
    if (controlledBusy === 'auto') {
        // Example normalization: treat 'auto' as idle by default.
        return false;
    }
    
    return controlledBusy;
};

/** Resolves the semantic activity classname for busy behavior. */
const resolveBusyActivityClassname = ({ visualState }: ResolveActivityClassnameArgs<boolean, BusyStateProps, BusyStateOptions, BusyStateDefinition>): BusyClassname => {
    return visualState ? 'is-busy' : 'not-busy';
};
```

#### 🧠 Activity Animation Behavior

The hook manages activity animations between concrete states using a unified lifecycle flow.  
When `useActivityState()` toggles an `activityClassname` (e.g. `.is-preparing`, `.is-shipping`, `.is-delivering`), the corresponding case in `usingActivityState()` activates, and the browser's CSS engine runs the assigned animation.

The lifecycle flow ensures:

- If an animation is already in progress, any new intent (e.g., switching from one activity state to another) is deferred until the current animation completes.  
- Once the active animation finishes, the latest intent is applied:  
  - It may **restart the same animation** if the state remains unchanged.  
  - It may **switch to another animation** if the state has changed.  
  - Or it may **remain stopped** if the state equals `inactiveState`.  
- This ensures animations are never interrupted mid-flight, while repeated, switched, or stopped activities are handled predictably and consistently across all specialized states.  

## 🧩 Exported CSS Hook

### `usingActivityState(activityBehavior: CssActivityBehavior): CssRule`

Applies live CSS variables for activity styling.

Activates **animation variables** for *visual effects* whenever the corresponding activity is in progress.

Each activity case provides:
- **`ifState`**
  Determines when the animation applies.
- **`variable`**
  Specifies the CSS variable to assign when the state condition is met.
- **`animation`**
  Specifies the animation value or reference to apply to the variable.

#### 💡 Usage Example

```ts
// Describe how order animations should behave:
const orderAnimations : CssRule = usingActivityState({
    animations      : [
        {
            ifState   : ifPreparing,
            variable  : orderStateVars.animationPreparing,
            animation : options.animationPreparing,
        },
        {
            ifState   : ifShipping,
            variable  : orderStateVars.animationShipping,
            animation : options.animationShipping,
        },
        {
            ifState   : ifDelivering,
            variable  : orderStateVars.animationDelivering,
            animation : options.animationDelivering,
        },
    ],
    
    // Optional factor variables for movement drivers of activity animation:
    factorVar       : orderStateVars.orderFactor,
    factorCondVar   : orderStateVars.orderFactorCond,
    ifInactiveState : ifIdle,
    baselineFactor  : 0,
});

// Apply order animations alongside other styles:
return style({
    display  : 'grid',
    fontSize : '1rem',
    
    // Apply animations:
    animation: `${switchOf(orderStateVars.animationPreparing, 'none')}, ${switchOf(orderStateVars.animationShipping, 'none')}, ${switchOf(orderStateVars.animationDelivering, 'none')}`,
    
    // Apply activity state rule:
    ...orderAnimations,
    // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
    // so it can be safely spread without risk of overriding other styles.
});

// Define conditional selectors:
const ifIdle       = (styles: CssStyleCollection) => rule('.is-idle'      , styles);
const ifPreparing  = (styles: CssStyleCollection) => rule('.is-preparing' , styles);
const ifShipping   = (styles: CssStyleCollection) => rule('.is-shipping'  , styles);
const ifDelivering = (styles: CssStyleCollection) => rule('.is-delivering', styles);
```

#### 🎨 Rendered CSS
```css
.the-component-scope {
    display   : grid;
    font-size : 1rem;
    
    animation: var(--order-preparing, none), var(--order-shipping, none), var(--order-delivering, none);
    
    &.is-preparing {
        --order-preparing: var(--anim-preparing);
    }
    &.is-shipping {
        --order-shipping: var(--anim-shipping);
    }
    &.is-delivering {
        --order-delivering: var(--anim-delivering);
    }
}
```

#### 🧠 How CSS Activity State Works

Each **`CssActivityAnimationCase`** defines a mapping between:
- **Condition (`ifState`)** → determines when the case is active (e.g. `ifPreparing`).
- **Variable (`variable`)** → the CSS variable to assign.
- **Animation (`animation`)** → the animation value or reference applied to the variable.

When `useActivityState()` (React side) toggles an `activityClassname` (e.g. `.is-preparing`, `.is-shipping`, `.is-delivering`), the corresponding case in `usingActivityState()` (CSS side) activates. The browser's CSS engine then applies the animation by assigning the variable to the provided value.  

This separation ensures:
- **React hook** orchestrates runtime state (`intent`, `running`, lifecycle handlers).  
- **CSS hook** declares how those states map to animations at the stylesheet level.  
- Together they form a predictable, declarative activity animation system.

## 📚 Related Packages

- [`@reusable-ui/animation-state`](https://www.npmjs.com/package/@reusable-ui/animation-state) – core animation lifecycle management.  
- [`@reusable-ui/transition-state`](https://www.npmjs.com/package/@reusable-ui/transition-state) – generic transition abstraction.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/activity-state** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/activity-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/activity-state brings expressive, lifecycle-aware state-driven animations to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
