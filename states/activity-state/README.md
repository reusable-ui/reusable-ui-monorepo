# @reusable-ui/activity-state 📦  

**activity-state** is a reusable abstraction for representing **state-driven animations** in React components.  
It makes animations a reliable signal — either to show an *ongoing activity* or to *draw user attention*.  

It provides a generic hook that can be specialized into *many kinds of controlled, animation-aware states* by supplying definition parameters.  

With **activity-state**, you can build:  
- **Activity indicator animations** — such as `busy-state`, `processing-state`, or `on-the-way-state`.  
- **Attention-grabbing animations** — such as `excite-state`, `highlight-state`, or `attract-state`.  
- Any state that models a *visual animation lifecycle* tied directly to component state.  

Instead of re-implementing similar logic for each animated state, `activity-state` acts as a common foundation.  
By reusing the same core contract, you ensure consistent behavior, predictable animation lifecycles, and reduced code duplication across your UI ecosystem.  

## ✨ Features
✔ Controlled mode only via `effectiveState`  
✔ Lifecycle-aware animations that respond to current state changes  
✔ Gracefully completes activity animations before stopping or switching to another activity  
✔ Supports multiple animations for multi-valued states  
✔ Semantic classname resolution for consistent styling tied to the current animation  
✔ Emits proactive notifications (`onStateChange()`) whenever an animation completes and requests a stop or switch  

## 📦 Installation
Install **@reusable-ui/activity-state** via npm or yarn:

```sh
npm install @reusable-ui/activity-state
# or
yarn add @reusable-ui/activity-state
```

## 🧩 Exported Hooks

### `useActivityBehaviorState(props, options, definition)`

Represents **state-driven animations** with full lifecycle awareness in React components.  
It synchronizes an externally controlled state (`effectiveState`) with the animation system, ensuring animations start, stop, or switch gracefully without interruption.  

By supplying a `definition` that declares the inactive baseline, animation patterns, and classname resolver, you can specialize this hook into domain-specific behaviors such as `busy-state`, `processing-state`, or `excite-state`.  

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

### 💡 Usage Example

Represents a component that is busy processing something.  
Prop-driven (controlled-only), with support for declarative keywords like `'auto'`.  
You normalize these keywords into concrete values in your implementation.

```ts
import {
    useActivityBehaviorState,
    type ActivityStateOptions,
    type ResolveActivityClassnameArgs,
    type ActivityBehaviorStateDefinition,
    type ActivityBehaviorState,
} from '@reusable-ui/activity-state'
import { type AnimationEvent } from 'react'
import { type ValueChangeEventHandler } from '@reusable-ui/events'

/** Props for controlling busy state of a component. */
export interface BusyStateProps {
    /**
     * Specifies the busy state.
     * - `true`   → busy
     * - `false`  → idle
     * - `'auto'` → automatically determine busy state based on context
     */
    busy ?: boolean | 'auto'
}

/** Props for reporting proactive change requests to busy state. */
export interface BusyStateChangeProps {
    /** Signals intent to change the external state after busy state animation completes. */
    onBusyChange ?: ValueChangeEventHandler<boolean, AnimationEvent>
}

/** Options for customizing busy state behavior and animation lifecycle. */
export interface BusyStateOptions extends ActivityStateOptions<boolean> {
    /** The default busy state if `busy` prop is not provided. */
    defaultBusy ?: boolean | 'auto'
}

/** Semantic CSS classnames tied to busy state. */
export type BusyClassname = 'is-busy' | 'not-busy'

/** Private definition for busy state behavior. */
interface BusyBehaviorStateDefinition
    extends
        ActivityBehaviorStateDefinition<boolean, BusyClassname,
            BusyStateProps,
            BusyStateOptions,
            BusyBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}

/**
 * Public API returned by `useBusyBehaviorState`.
 * 
 * @remarks
 * - Mirrors `ActivityBehaviorState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `busy`, `actualBusy`, etc.
 */
export interface BusyBehaviorState<TElement extends Element = HTMLElement>
    extends
        Omit<ActivityBehaviorState<boolean, BusyClassname, TElement>,
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
 * - Declarative keywords (`'auto'`) are normalized by `useBusyState`.
 * - Provides resolved busy state.
 * - Provides semantic classnames for styling.
 */
export const useBusyBehaviorState = <TElement extends Element = HTMLElement>(props: BusyStateProps & BusyStateChangeProps, options?: BusyStateOptions): BusyBehaviorState<TElement> => {
    const {
        onBusyChange : onStateChange,
    } = props;
    
    // Normalize declarative keywords into a concrete boolean:
    const effectiveState = useBusyState(props, options);
    
    // Activity orchestration:
    const {
        state             : busy,
        actualState       : actualBusy,
        activityClassname : busyClassname,
        ...animationHandlers
    } = useActivityBehaviorState<
        boolean,
        BusyClassname,
        
        BusyStateProps,
        BusyStateOptions,
        BusyBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateChange },
        
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
        } satisfies BusyBehaviorStateDefinition,
    );
    
    // Return domain-specific API:
    return {
        busy,
        actualBusy,
        busyClassname,
        ...animationHandlers,
    } satisfies BusyBehaviorState<TElement>;
};

/** Normalizes declarative keywords into a concrete and effective busy state. */
const useBusyState = (props: BusyStateProps, options?: BusyStateOptions): boolean => {
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
const resolveBusyActivityClassname = ({ visualState }: ResolveActivityClassnameArgs<boolean, BusyStateProps, BusyStateOptions, BusyBehaviorStateDefinition>): BusyClassname => {
    return visualState ? 'is-busy' : 'not-busy';
};
```

### 🧠 Activity Animation Behavior

The hook manages activity animations between concrete states using a unified lifecycle flow:

- If an animation is already in progress, any new intent (e.g., switching from one state to another) is deferred until the current animation completes.  
- Once the active animation finishes, the latest intent is applied:  
  - It may **restart the same animation** if the state remains unchanged.  
  - It may **switch to another animation** if the state has changed.  
  - Or it may **remain stopped** if the state equals `inactiveState`.  
- This ensures animations are never interrupted mid-flight, while ensuring that repeated, switched, or stopped activities are handled predictably and consistently across all specialized states.  

## 🧩 Exported CSS Hook

### `usesActivityState(activityCases: MaybeArray<ActivityCase>): CssRule`

Defines activity cases that automatically run when `useActivityBehaviorState()` activates the matching classname.

Accepts either:
- A single `ActivityCase`
- An array of `ActivityCase[]`

**`ActivityCase` interface:**
- **`ifState`**  
  The state condition function that determines when the animation applies.
- **`variable`**  
  The CSS variable to assign when the state condition is met.
- **`animation`**  
  The animation value or reference to apply to the variable.

#### 💡 Usage Example
```ts
export default () => style({
    display  : 'grid',
    fontSize : '1rem',
    
    // Apply animations:
    animation: 'var(--order-preparing, none), var(--order-shipping, none), var(--order-delivering, none)',
    
    // Define activity cases when the state is met:
    ...usesActivityState([
        { ifState: ifPreparing,  variable: 'var(--order-preparing)',  animation: 'var(--anim-preparing)'  },
        { ifState: ifShipping,   variable: 'var(--order-shipping)',   animation: 'var(--anim-shipping)'   },
        { ifState: ifDelivering, variable: 'var(--order-delivering)', animation: 'var(--anim-delivering)' },
    ]),
});

// Define conditional selectors:
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
Each **`ActivityCase`** defines a mapping between:
- **Condition (`ifState`)** → determines when the case is active (e.g. `ifPreparing`).
- **Variable (`variable`)** → the CSS variable to assign.
- **Animation (`animation`)** → the animation value or reference applied to the variable.

When `useActivityBehaviorState()` (React side) toggles a classname such as `.is-preparing`, the corresponding case in `usesActivityState()` (CSS side) activates. The browser's CSS engine then applies the animation by assigning the variable to the provided value.  

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
