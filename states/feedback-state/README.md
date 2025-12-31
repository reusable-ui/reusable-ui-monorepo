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

### `useFeedbackBehaviorState(props, options, definition)`

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
    useFeedbackBehaviorState,
    type FeedbackStateOptions,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type FeedbackBehaviorStateDefinition,
    type FeedbackBehaviorState,
} from '@reusable-ui/feedback-state'
import { type ValueChangeEventHandler } from '@reusable-ui/events'

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
    online ?: boolean | 'auto'
}

/** Props for reporting passive updates to the online state. */
export interface OnlineStateUpdateProps {
    /** Reports the updated state whenever the online state changes. */
    onOnlineUpdate ?: ValueChangeEventHandler<boolean, unknown>
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
interface OnlineBehaviorStateDefinition
    extends
        FeedbackBehaviorStateDefinition<boolean, OnlinePhase, OnlineClassname,
            OnlineStateProps,
            OnlineStateOptions,
            OnlineBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}

/**
 * Public API returned by `useOnlineBehaviorState`.
 * 
 * @remarks
 * - Mirrors `FeedbackBehaviorState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `online`, `actualOnline`, etc.
 */
export interface OnlineBehaviorState<TElement extends Element = HTMLElement>
    extends
        Omit<FeedbackBehaviorState<boolean, OnlinePhase, OnlineClassname, TElement>,
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
 * - Declarative keywords (`'auto'`) are observed live by `useLiveOnlineState`.
 * - Provides resolved online state.
 * - Provides semantic phases and classnames for styling.
 */
export const useOnlineBehaviorState = <TElement extends Element = HTMLElement>(props: OnlineStateProps & OnlineStateUpdateProps, options?: OnlineStateOptions): OnlineBehaviorState<TElement> => {
    const {
        onOnlineUpdate : onStateUpdate,
    } = props;
    
    // Get live online state (normalized declarative keywords into a concrete boolean):
    const effectiveState = useLiveOnlineState(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : online,
        actualState         : actualOnline,
        transitionPhase     : onlinePhase,
        transitionClassname : onlineClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean,
        OnlinePhase,
        OnlineClassname,
        
        OnlineStateProps,
        OnlineStateOptions,
        OnlineBehaviorStateDefinition,
        
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
        } satisfies OnlineBehaviorStateDefinition,
    );
    
    // Return domain-specific API:
    return {
        online,
        actualOnline,
        onlinePhase,
        onlineClassname,
        ...animationHandlers,
    } satisfies OnlineBehaviorState<TElement>;
};

/**
 * Normalizes declarative keywords into a concrete and effective online state,
 * using a live observer for dynamic updates.
 */
const useLiveOnlineState = (props: OnlineStateProps, options?: OnlineStateOptions): boolean => {
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
const resolveOnlineTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, OnlineStateProps, OnlineStateOptions, OnlineBehaviorStateDefinition>): OnlinePhase => {
    if (isTransitioning) return settledState ? 'connecting' : 'disconnecting';
    return settledState ? 'online' : 'offline';
};

/** Resolves the semantic transition classname for online behavior. */
const resolveOnlineTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, OnlinePhase, OnlineStateProps, OnlineStateOptions, OnlineBehaviorStateDefinition>): OnlineClassname => {
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
    useFeedbackBehaviorState,
    type FeedbackStateOptions,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type FeedbackBehaviorStateDefinition,
    type FeedbackBehaviorState,
} from '@reusable-ui/feedback-state'
import { type ValueChangeEventHandler } from '@reusable-ui/events'

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
    locked ?: boolean | 'auto'
}

/** Props for reporting passive updates to the locked state. */
export interface LockedStateUpdateProps {
    /** Reports the updated state whenever the locked state changes. */
    onLockedUpdate ?: ValueChangeEventHandler<boolean, unknown>
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
interface LockedBehaviorStateDefinition
    extends
        FeedbackBehaviorStateDefinition<boolean, LockedPhase, LockedClassname,
            LockedStateProps,
            LockedStateOptions,
            LockedBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}

/**
 * Public API returned by `useLockedBehaviorState`.
 * 
 * @remarks
 * - Mirrors `FeedbackBehaviorState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `locked`, `actualLocked`, etc.
 */
export interface LockedBehaviorState<TElement extends Element = HTMLElement>
    extends
        Omit<FeedbackBehaviorState<boolean, LockedPhase, LockedClassname, TElement>,
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
 * - Declarative keywords (`'auto'`) are normalized by `useLockedState`.
 * - Provides resolved locked state.
 * - Provides semantic phases and classnames for styling.
 */
export const useLockedBehaviorState = <TElement extends Element = HTMLElement>(props: LockedStateProps & LockedStateUpdateProps, options?: LockedStateOptions): LockedBehaviorState<TElement> => {
    const {
        onLockedUpdate : onStateUpdate,
    } = props;
    
    // Normalize declarative keywords into a concrete boolean:
    const effectiveState = useLockedState(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : locked,
        actualState         : actualLocked,
        transitionPhase     : lockedPhase,
        transitionClassname : lockedClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean,
        LockedPhase,
        LockedClassname,
        
        LockedStateProps,
        LockedStateOptions,
        LockedBehaviorStateDefinition,
        
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
        } satisfies LockedBehaviorStateDefinition,
    );
    
    // Return domain-specific API:
    return {
        locked,
        actualLocked,
        lockedPhase,
        lockedClassname,
        ...animationHandlers,
    } satisfies LockedBehaviorState<TElement>;
};

/** Normalizes declarative keywords into a concrete and effective locked state. */
const useLockedState = (props: LockedStateProps, options?: LockedStateOptions): boolean => {
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
const resolveLockedTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, LockedStateProps, LockedStateOptions, LockedBehaviorStateDefinition>): LockedPhase => {
    if (isTransitioning) return settledState ? 'locking' : 'unlocking';
    return settledState ? 'locked' : 'unlocked';
};

/** Resolves the semantic transition classname for locked behavior. */
const resolveLockedTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, LockedPhase, LockedStateProps, LockedStateOptions, LockedBehaviorStateDefinition>): LockedClassname => {
    return `is-${transitionPhase}`;
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions between concrete states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from one state to another) is deferred until the current animation completes.  
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.  
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded, keeping the lifecycle predictable and consistent across all specialized states.  

### `useFeedbackStatePhaseEvents(phase, handlePhaseChange)`

A reusable hook for **emitting lifecycle events** in response to **transition phase changes**.  
This hook centralizes the common pattern used across `*-state` packages.

This hook is aliased from `useTransitionStatePhaseEvents()` in `@reusable-ui/transition-state`, canonically renamed here for clarity within the `feedback-state` context.

#### Parameters
- **`phase: TPhase`**  
  The current transition phase value returned from a behavior-specific state hook  
  (e.g. `useDisabledBehaviorState()`, `useFocusBehaviorState()`, etc.).

- **`handlePhaseChange: (phase: TPhase) => void`**  
  A delegate function that maps the given phase to the appropriate event handler calls.  
  This function should contain the switch/case logic for invoking `onStart`/`onEnd` callbacks.

#### Behavior
- Skips event emission on **initial mount** to avoid false positives.
- Emits events on **subsequent updates** before browser paint (`useLayoutEffect`), ensuring handlers can perform timing-sensitive DOM operations.

#### Example: Disabled State
```ts
useFeedbackStatePhaseEvents(disabledPhase, (phase) => {
    switch (phase) {
        case 'enabling'  : props.onEnablingStart?.(phase, undefined);  break;
        case 'enabled'   : props.onEnablingEnd?.(phase, undefined);    break;
        case 'disabling' : props.onDisablingStart?.(phase, undefined); break;
        case 'disabled'  : props.onDisablingEnd?.(phase, undefined);   break;
    }
});
```

#### Example: View State (special case)
```ts
// Remembers the previous transitioning phase for proper end event emission.
const prevPhaseRef = useRef<TransitioningViewPhase | undefined>(undefined);

useFeedbackStatePhaseEvents(viewPhase, (phase) => {
    switch (phase) {
        case 'view-advancing':
            // Remember the current transitioning phase:
            prevPhaseRef.current = phase;
            
            props.onViewAdvancingStart?.(phase, undefined);
            break;
            
        case 'view-receding':
            // Remember the current transitioning phase:
            prevPhaseRef.current = phase;
            
            props.onViewRecedingStart?.(phase, undefined);
            break;
            
        case 'view-settled':
            // Determine the previous transitioning phase to emit the corresponding end event:
            const prevPhase = prevPhaseRef.current;
            
            // Clear the remembered transitioning phase:
            prevPhaseRef.current = undefined;
            
            // Emit the corresponding end event:
            switch (prevPhase) {
                case 'view-advancing':
                    props.onViewAdvancingEnd?.(phase, undefined);
                    break;
                
                case 'view-receding':
                    props.onViewRecedingEnd?.(phase, undefined);
                    break;
            } // switch
            break;
    }
});
```

#### When to Use
- Use in any `*-state` package that needs to emit lifecycle events tied to transition phases.  
- Keeps code DRY, consistent, and easier to maintain.  
- Special cases (like `view-state`) can add local refs but still delegate through this hook.

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
