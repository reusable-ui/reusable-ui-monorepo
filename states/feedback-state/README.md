# @reusable-ui/feedback-state 📦  

**feedback-state** is a reusable abstraction for managing lifecycle-aware feedback states in React components.  
It provides a generic hook that can be specialized into *many kinds of controlled behavioral states* by supplying definition parameters.  

With **feedback-state**, you can build:  
- **Feedback-based states** — such as `focus-state`, `hover-state`, `press-state`, `validity-state`, or `online-state`.  
- **Constraint-based states** — such as `disabled-state`, `read-only-state`, or `locked-state`.  

Instead of re-implementing similar logic for each feedback or constraint state, `feedback-state` acts as a common foundation.  
By reusing the same core contract, you ensure consistent behavior, predictable animation lifecycles, and reduced code duplication across your UI ecosystem.  

## ✨ Features
✔ Controlled mode only via `effectiveState`  
✔ Lifecycle-aware transition animations based on current state  
✔ Gracefully completes running animations before resolving new state  
✔ Semantic phase and classname resolution for consistent styling across states  
✔ Emits a passive notification `onStateUpdate()` whenever the state changes  

## 📦 Installation
Install **@reusable-ui/feedback-state** via npm or yarn:

```sh
npm install @reusable-ui/feedback-state
# or
yarn add @reusable-ui/feedback-state
```

## 🧩 Exported Hooks

### `useFeedbackState(props, options, definition)`

Provides abstract controlled feedback state with animation lifecycle integration.  
Specialize it into **focus-state**, **hover-state**, **press-state**, or **validity-state** by defining the `definition` parameter and supplying normalized concrete state to `effectiveState`.  

To implement live updates, dynamically supply the domain-specific observer result into `effectiveState`.  

Constraint-based states can also be implemented using this base, without observers.  
Specialize it into **disabled-state** or **read-only-state** by defining the `definition` parameter and directly supplying normalized concrete state to `effectiveState`.  

**Definition parameters:**
- **Transition phase resolver**  
  Resolves the semantic phase from the settled state and transition flag.
- **Transition classname resolver**  
  Resolves the semantic classname from the current phase.
- **Previous state resolver (optional)**  
  Tracks the previously settled state for direction-aware styling.
- **Default animation pattern**  
  Default animation names to match against.
- **Default animation bubbling**  
  Whether to enable bubbling from nested child elements.

#### 💡 Usage Examples

##### Feedback-Based States

Represents states that provide feedback based on external conditions or reacting user actions.  
Typically dynamic and can change frequently.

Example: **online/offline** state with animation lifecycle integration.  
Supports live updates based on browser online status.  
Prop-driven (controlled-only), with support for declarative keywords like `'auto'`.  
You normalize these keywords into concrete values, including real-time observation if needed.

```ts
import {
    useState,
    useEffect,
} from 'react'

import {
    useFeedbackState,
    type FeedbackStateOptions,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type FeedbackStateDefinition,
    type FeedbackState,
} from '@reusable-ui/feedback-state'
import { type ValueChangeHandler } from '@reusable-ui/controllable'

/**
 * Example implementation of an online/offline state with animation lifecycle integration.
 * 
 * Provides a controlled online state with support for declarative keywords (`'auto'`).
 * 
 * Exposes semantic phases and classnames for styling, synchronized with animation transitions.
 */

/** Props for controlling the online state of a component. */
export interface OnlineStateProps {
    /**
     * Specifies the online state.
     * 
     * - `true`   → online
     * - `false`  → offline
     * - `'auto'` → automatically determine online state based on live observation
     */
    online         ?: boolean | 'auto'
    
    /** Synchronizes companion components whenever the resolved online state changes. */
    onOnlineUpdate ?: ValueChangeHandler<boolean, unknown>
}

/** Options for customizing online state behavior and animation lifecycle. */
export interface OnlineStateOptions extends FeedbackStateOptions<boolean> {
    /** The default online state if `online` prop is not provided. */
    defaultOnline ?: boolean | 'auto'
}

/** Semantic phases when the component is fully settled. */
export type ResolvedOnlinePhase = 'online' | 'offline'

/** Transitional phases while the component is animating. */
export type TransitioningOnlinePhase = 'connecting' | 'disconnecting'

/** Union of resolved and transitional phases. */
export type OnlinePhase = ResolvedOnlinePhase | TransitioningOnlinePhase

/** Semantic CSS classnames tied to online phases. */
export type OnlineClassname = `is-${OnlinePhase}`

/** Private definition for online state behavior. */
interface OnlineStateDefinition
    extends
        FeedbackStateDefinition<boolean, OnlinePhase, OnlineClassname,
            OnlineStateProps,
            OnlineStateOptions,
            OnlineStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}

/**
 * Public API returned by `useOnlineState`.
 * 
 * @remarks
 * - Mirrors `FeedbackState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `online`, `actualOnline`, etc.
 */
export interface OnlineState<TElement extends Element = HTMLElement>
    extends
        Omit<FeedbackState<boolean, OnlinePhase, OnlineClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /** The current settled online state (animation-aware). */
    online          : boolean
    
    /** The actual resolved online state (immediate, may appear out of sync). */
    actualOnline    : boolean
    
    /** The semantic transition phase (`online`, `offline`, `connecting`, `disconnecting`). */
    onlinePhase     : OnlinePhase
    
    /** A CSS classname reflecting the current online phase. */
    onlineClassname : OnlineClassname
}

/**
 * Hook for managing online state with animation lifecycle integration.
 * 
 * @remarks
 * - Controlled-only: state is always driven by props.
 * - Declarative keywords (`'auto'`) are observed live by `useResolvedOnline`.
 * - Provides resolved online state.
 * - Provides semantic phases and classnames for styling.
 */
export const useOnlineState = <TElement extends Element = HTMLElement>(props: OnlineStateProps, options?: OnlineStateOptions): OnlineState<TElement> => {
    const {
        onOnlineUpdate : onStateUpdate,
    } = props;
    
    // Get live online state (normalized declarative keywords into a concrete boolean):
    const effectiveState = useResolvedOnline(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : online,
        actualState         : actualOnline,
        transitionPhase     : onlinePhase,
        transitionClassname : onlineClassname,
        ...animationHandlers
    } = useFeedbackState<
        boolean,
        OnlinePhase,
        OnlineClassname,
        
        OnlineStateProps,
        OnlineStateOptions,
        OnlineStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateUpdate },
        
        // Options:
        options,
        
        // Definition:
        {
            // Behavior definitions:
            defaultAnimationPattern    : ['connecting', 'disconnecting'],
            defaultAnimationBubbling   : false,
            resolveTransitionPhase     : resolveOnlineTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveOnlineTransitionClassname, // Resolves classnames.
        } satisfies OnlineStateDefinition,
    );
    
    // Return domain-specific API:
    return {
        online,
        actualOnline,
        onlinePhase,
        onlineClassname,
        ...animationHandlers,
    } satisfies OnlineState<TElement>;
};

/**
 * Normalizes declarative keywords into a concrete and effective online state,
 * using a live observer for dynamic updates.
 */
const useResolvedOnline = (props: OnlineStateProps, options?: OnlineStateOptions): boolean => {
    const {
        defaultOnline = 'auto',
    } = options ?? {};
    
    const {
        online: controlledOnline = defaultOnline,
    } = props;
    
    const observedOnline = useOnlineObserver();
    
    if (controlledOnline === 'auto') {
        // Example normalization: use live observed online status.
        return observedOnline;
    }
    
    return controlledOnline;
};

/** Hook that observes the browser's online/offline status. */
const useOnlineObserver = (): boolean => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    
    useEffect(() => {
        const handleOnline  = (): void => setIsOnline(true);
        const handleOffline = (): void => setIsOnline(false);
        
        window.addEventListener('online' , handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online' , handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    
    return isOnline;
};

/** Resolves the semantic transition phase for online behavior. */
const resolveOnlineTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, OnlineStateProps, OnlineStateOptions, OnlineStateDefinition>): OnlinePhase => {
    if (isTransitioning) return settledState ? 'connecting' : 'disconnecting';
    return settledState ? 'online' : 'offline';
};

/** Resolves the semantic transition classname for online behavior. */
const resolveOnlineTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, OnlinePhase, OnlineStateProps, OnlineStateOptions, OnlineStateDefinition>): OnlineClassname => {
    return `is-${transitionPhase}`;
};
```

##### Constraint-Based States

Represents states that limit user interactions.  
Typically static and not changed frequently.

Example: **locked/unlocked** state with animation lifecycle integration.  
Prop-driven (controlled-only), with support for declarative keywords like `'auto'`, `'inherit'`, or custom ones.  
You normalize these keywords into concrete values in your implementation.

```ts
import {
    useFeedbackState,
    type FeedbackStateOptions,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type FeedbackStateDefinition,
    type FeedbackState,
} from '@reusable-ui/feedback-state'
import { type ValueChangeHandler } from '@reusable-ui/controllable'

/**
 * Example implementation of a locked/unlocked state with animation lifecycle integration.
 * 
 * Provides a controlled locked state with support for declarative keywords (`'auto'`).
 * 
 * Exposes semantic phases and classnames for styling, synchronized with animation transitions.
 */

/** Props for controlling the locked state of a component. */
export interface LockedStateProps {
    /**
     * Specifies the locked state.
     * 
     * - `true`   → locked
     * - `false`  → unlocked
     * - `'auto'` → automatically determine locked state based on context
     */
    locked         ?: boolean | 'auto'
    
    /** Synchronizes companion components whenever the resolved locked state changes. */
    onLockedUpdate ?: ValueChangeHandler<boolean, unknown>
}

/** Options for customizing locked state behavior and animation lifecycle. */
export interface LockedStateOptions extends FeedbackStateOptions<boolean> {
    /** The default locked state if `locked` prop is not provided. */
    defaultLocked ?: boolean | 'auto'
}

/** Semantic phases when the component is fully settled. */
export type ResolvedLockedPhase = 'locked' | 'unlocked'

/** Transitional phases while the component is animating. */
export type TransitioningLockedPhase = 'locking' | 'unlocking'

/** Union of resolved and transitional phases. */
export type LockedPhase = ResolvedLockedPhase | TransitioningLockedPhase

/** Semantic CSS classnames tied to locked phases. */
export type LockedClassname = `is-${LockedPhase}`

/** Private definition for online state behavior. */
interface LockedStateDefinition
    extends
        FeedbackStateDefinition<boolean, LockedPhase, LockedClassname,
            LockedStateProps,
            LockedStateOptions,
            LockedStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}

/**
 * Public API returned by `useLockedState`.
 * 
 * @remarks
 * - Mirrors `FeedbackState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `locked`, `actualLocked`, etc.
 */
export interface LockedState<TElement extends Element = HTMLElement>
    extends
        Omit<FeedbackState<boolean, LockedPhase, LockedClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /** The current settled locked state (animation-aware). */
    locked          : boolean
    
    /** The actual resolved locked state (immediate, may appear out of sync). */
    actualLocked    : boolean
    
    /** The semantic transition phase (`locked`, `unlocked`, `locking`, `unlocking`). */
    lockedPhase     : LockedPhase
    
    /** A CSS classname reflecting the current locked phase. */
    lockedClassname : LockedClassname
}

/**
 * Hook for managing locked state with animation lifecycle integration.
 * 
 * @remarks
 * - Controlled-only: state is always driven by props.
 * - Declarative keywords (`'auto'`) are normalized by `useResolvedLocked`.
 * - Provides resolved locked state.
 * - Provides semantic phases and classnames for styling.
 */
export const useLockedState = <TElement extends Element = HTMLElement>(props: LockedStateProps, options?: LockedStateOptions): LockedState<TElement> => {
    const {
        onLockedUpdate : onStateUpdate,
    } = props;
    
    // Normalize declarative keywords into a concrete boolean:
    const effectiveState = useResolvedLocked(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : locked,
        actualState         : actualLocked,
        transitionPhase     : lockedPhase,
        transitionClassname : lockedClassname,
        ...animationHandlers
    } = useFeedbackState<
        boolean,
        LockedPhase,
        LockedClassname,
        
        LockedStateProps,
        LockedStateOptions,
        LockedStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateUpdate },
        
        // Options:
        options,
        
        // Definition:
        {
            // Behavior definitions:
            defaultAnimationPattern    : ['locking', 'unlocking'],
            defaultAnimationBubbling   : false,
            resolveTransitionPhase     : resolveLockedTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveLockedTransitionClassname, // Resolves classnames.
        } satisfies LockedStateDefinition,
    );
    
    // Return domain-specific API:
    return {
        locked,
        actualLocked,
        lockedPhase,
        lockedClassname,
        ...animationHandlers,
    } satisfies LockedState<TElement>;
};

/** Normalizes declarative keywords into a concrete and effective locked state. */
const useResolvedLocked = (props: LockedStateProps, options?: LockedStateOptions): boolean => {
    const {
        defaultLocked = 'auto',
    } = options ?? {};
    
    const {
        locked: controlledLocked = defaultLocked,
    } = props;
    
    if (controlledLocked === 'auto') {
        // Example normalization: treat 'auto' as locked by default.
        return true;
    }
    
    return controlledLocked;
};

/** Resolves the semantic transition phase for locked behavior. */
const resolveLockedTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, LockedStateProps, LockedStateOptions, LockedStateDefinition>): LockedPhase => {
    if (isTransitioning) return settledState ? 'locking' : 'unlocking';
    return settledState ? 'locked' : 'unlocked';
};

/** Resolves the semantic transition classname for locked behavior. */
const resolveLockedTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, LockedPhase, LockedStateProps, LockedStateOptions, LockedStateDefinition>): LockedClassname => {
    return `is-${transitionPhase}`;
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions between concrete states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from one state to another) is deferred until the current animation completes.  
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.  
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded, keeping the lifecycle predictable and consistent across all specialized states.  

## 🧩 Exported CSS Hook

### `usingFeedbackState(feedbackBehavior: CssFeedbackBehavior): CssRule`

Applies live CSS variables for feedback styling, including:
- **Animation variables** for *visual effects* whenever a feedback state changes
- **Flag variables** for *discrete switches* in conditional styling
- **Factor variables** for *gradual drivers* in transitional styling

**`CssFeedbackBehavior` interface:**
- **`animations`**
  Defines feedback animation cases for *visual effects* whenever a feedback state changes.
- **`flags`**
  Defines flag cases for conditional styling.
- **`factorVar`**
  Specifies a CSS variable for smooth transitions.
- **`factorCondVar`**
  Specifies a CSS variable for smooth transitions with inactive fallback.
- **`ifInactiveState`**
  Defines the condition for the inactive baseline state.
- **`activeFactors`**
  Defines active factor cases for holding final numeric values once a transition settles.

#### 💡 Usage Example

```ts
// Describe how feedback focus state should behave:
const focusStateRule : CssRule = usingFeedbackState({
    // Feedback animations for visual effects whenever a feedback state changes:
    animations      : [
        {
            ifState   : ifFocusing,
            variable  : focusStateVars.focusingAnimation,
            animation : options.focusingAnimation,
        },
        {
            ifState   : ifBlurring,
            variable  : focusStateVars.blurringAnimation,
            animation : options.blurringAnimation,
        },
    ],
    
    // Flags for discrete switches in conditional styling:
    flags           : [
        // Current flags:
        {
            ifState  : ifFocusingOrFocused,
            variable : focusStateVars.isFocused,
        },
        {
            ifState  : ifBlurringOrBlurred,
            variable : focusStateVars.isBlurred,
        },
    ],
    
    // Factor variables for gradual drivers in transitional styling:
    factorVar       : focusStateVars.focusFactor,
    factorCondVar   : focusStateVars.focusFactorCond,
    ifInactiveState : ifBlurred,
    activeFactors   : [
        {
            ifState : ifFocused,
            factor  : 1,
        },
    ],
});

// Apply focus states alongside other styles:
return style({
    display  : 'grid',
    fontSize : '1rem',
    
    // Apply focus state rule:
    ...focusStateRule,
    // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
    // so it can be safely spread without risk of overriding other styles.
});
```

#### 🎨 Rendered CSS

```css
.the-component-scope {
    /* Fallbacks (reset defaults, lowest priority, applied before any declarations): */
    --focus-isFocused: unset;
    --focus-isBlurred: unset;
    
    display   : grid;
    font-size : 1rem;
    
    --focus-focusFactorCond: var(--focus-focusFactor);
    
    /* Transition states: */
    &.is-focusing {
        --focus-focusing: var(--anim-focusing);
    }
    &.is-blurring {
        --focus-blurring: var(--anim-blurring);
    }
    
    /* Flag states: */
    &:is(.is-focusing, .is-focused) {
        --focus-isFocused: ;
    }
    &:is(.is-blurring, .is-blurred) {
        --focus-isBlurred: ;
    }
    
    /* Primary factor states: */
    &.is-focused {
        --focus-focusFactor: 1;
    }
    
    /* Conditional factor states: */
    &.is-blurred {
        --focus-focusFactorCond: unset;
    }
}

@property --focus-focusFactor {
    syntax        : "<number>";
    inherits      : true;
    initial-value : 0;
}
```

#### 🧠 How CSS Feedback State Works

Feedback state styling is built from three coordinated parts: **feedback animations**, **flags**, and **factors**.  
Together, they let you declaratively map component states to CSS styling behaviors — from simple on/off switches to smooth interpolations.

##### 1. Feedback Animations

Animations provide the *visual effects* whenever a feedback state changes.  

- **Intent**: Animate the component as it moves between states.  
- **Mechanics**:  
    - State changes toggle a `classname`.  
    - When the `classname` matches an `ifState` condition (e.g. `&.is-focusing { ... }`),
    a CSS variable is assigned with the desired animation:  
        ```css
        .the-component-scope {
            /* Conditional animation: */
            &.is-focusing {
                --focus-focusing: var(--anim-focusing);
            }
        }
        ```
    - That variable can then be used to drive the animation:  
        ```css
        .the-component-scope {
            /* Usage: */
            animation: var(--focus-focusing), var(--other-animation);
        }
        ```

To define multiple animations consistently, the **`CssFeedbackAnimationCase`** interface is used:  
- `ifState`   → determines when the animation applies  
- `variable`  → specifies the CSS variable to assign  
- `animation` → specifies the animation value or reference to apply  

##### 2. Flags

Flags act as *discrete switches* for conditional styling.

- **Intent**: Apply properties on specific states, fully or not at all — never interpolated.  
- **Mechanics**:  
    - State changes toggle a `classname`.  
    - When the `classname` matches an `ifState` condition (e.g. `&:is(.is-focusing, .is-focused) { ... }`),
    a CSS variable is set with an empty string (won't carry any meaningful value) and acts as an **active switch**:  
        ```css
        .the-component-scope {
            /* Unset: */
            --focus-isFocused: unset;
            
            /* Set: */
            &:is(.is-focusing, .is-focused) {
                --focus-isFocused: ;
            }
        }
        ```
    - That variable can then be used to conditionally style properties:  
        ```css
        .the-component-scope {
            /* Usage: */
            background-image: var(--focus-isFocused) url('/res/focused.svg');
            --focused-color: var(--focus-isFocused) blue;
            --blurred-color: var(--focus-isBlurred) gray;
            color: var(--focused-color, var(--blurred-color));
        }
        ```

Flags are perfect for binary styling: either the property is applied or ignored, never interpolated.

**Note:**  
- When set, flag variables hold an empty string (won't carry any meaningful value) — effectively toggling "on".  
- When unset, flag variables invalidate the declaration, so the browser ignores it — effectively toggling "off".  

##### 3. Factors

Factors act as *gradual drivers* for smooth transitions.

- **Intent**: Interpolate properties across states (fade, blend, scale).  
- **Mechanics**:  
    - A factor variable changes within a numeric range:  
        ```
        0 … +0.5 … +1
        ```
    - Driven by animation keyframes:  
        ```css
        0%   { --focus-focusFactor: 0; }
        100% { --focus-focusFactor: 1; }
        ```
    - When settled, the classname "sticks" the factor to its final value:  
        ```css
        .the-component-scope {
            &.is-focused {
                --focus-focusFactor: 1;
            }
        }
        ```
    - That variable can then be used to blend properties proportionally:  
        ```css
        .the-component-scope {
            /* Usage: */
            /* 0 → gray, +1 → blue */
            color: color-mix(in oklch, ... calc(var(--focus-focusFactor) * ...) ... );
            /* Focused → 1, otherwise: 0.5: */
            opacity: clamp(0.5, var(--focus-focusFactor), 1);
        }
        ```

Factors let you fade, blend, or scale smoothly instead of switching abruptly.

There's also a **conditional factor** (`factorCondVar`):  
- Behaves like a factor, but resets to `unset` when inactive.  
- This makes it easier to let default styles take over at baseline.

---

##### React + CSS Separation

The system works by splitting responsibilities:

- **React hook (`useFeedbackState()`)**  
    Orchestrates runtime state: intent, lifecycle, and toggling classnames.  
- **CSS hook (`usingFeedbackState()`)**  
    Describes how those states (via classname toggles) map to animations, flags, and factors at the stylesheet level.  

Together, they form a predictable, declarative system:  
- Animations tell the story of change  
- Flags provide discrete switches  
- Factors drive gradual changes  

##### ✅ Summary
CSS Feedback State combines **animations, flags, and factors** into a unified model:  
- **Animations** → visual effects when state changes  
- **Flags** → binary switches for conditional styling  
- **Factors** → numeric drivers for smooth interpolation (with optional fallback)  

This layered approach makes transitions both **expressive** and **maintainable**, giving you fine control over how styles respond to state changes.

## 📚 Related Packages

- [`@reusable-ui/animation-state`](https://www.npmjs.com/package/@reusable-ui/animation-state) – core animation lifecycle management.  
- [`@reusable-ui/transition-state`](https://www.npmjs.com/package/@reusable-ui/transition-state) – generic transition abstraction.  
- [`@reusable-ui/interaction-state`](https://www.npmjs.com/package/@reusable-ui/interaction-state) – interaction-driven state management.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/feedback-state** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/feedback-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/feedback-state brings expressive, lifecycle-aware feedback management to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
