# @reusable-ui/transition-state 📦  

**transition-state** is a reusable abstraction for managing lifecycle-aware transition states in React components.  
It provides a generic hook that can be specialized into *many kinds of behavioral states* by supplying definition parameters.  

With **transition-state**, you can build:  
- **Constraint-based states** — such as `disabled-state`, `read-only-state`, or `locked-state`.  
- **Feedback-based states** — such as `focus-state`, `hover-state`, `press-state`, `validity-state`, or `online-state`.  
- **Interaction-based states** — such as `collapse-state`, `active-state`, `view-state`, or `selected-state`.  

Instead of re-implementing similar logic for each state type, `transition-state` acts as a common foundation.  
By reusing the same core contract, you ensure consistent behavior, predictable animation lifecycles, and reduced code duplication across your UI ecosystem.  

## ✨ Features
✔ Controlled, uncontrolled, and hybrid state management modes  
✔ Lifecycle-aware transition animations based on current state  
✔ Gracefully completes running animations before resolving new state  
✔ Declarative state normalization (`'auto'`, `'inherit'`, or custom keywords) into concrete values  
✔ Semantic phase and classname resolution for consistent styling across states  
✔ Optional previous-state tracking for direction-aware rendering and transitions  
✔ Extensible definition parameters — tailor driver resolution, phase logic, and classname mapping to your domain  
✔ Setter state intent for interaction-based states, enabling interactive components with smooth transitions  

## 📦 Installation
Install **@reusable-ui/transition-state** via npm or yarn:

```sh
npm install @reusable-ui/transition-state
# or
yarn add @reusable-ui/transition-state
```

## 🧩 Exported Hook

### `useTransitionBehaviorState(props, options, definition)`

Provides abstract transition state management with animation lifecycle integration.  
Specialize it into **constraint-based**, **feedback-based**, or **interaction-based** states by defining the `definition` parameter.

**Definition parameters:**
- **Driver state resolver**  
  Decides which state drives the lifecycle:  
  - from props → controlled only  
  - from internal state → uncontrolled only  
  - prefer props, fallback to internal state → hybrid  
  Must return a concrete value (no declarative keywords). Declarative values must be normalized before returning.  
  Observation logic hook (e.g. live online status) can be applied here.
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

## 💡 Usage Examples

Here are some usage examples demonstrating how to create custom states using `useTransitionBehaviorState`.

### Constraint-Based States

Represents states that limit user interactions.  
Typically static and not changed frequently.

Example: **locked/unlocked** state with animation lifecycle integration.  
Prop-driven (controlled-only), with support for declarative keywords like `'auto'`, `'inherit'`, or custom ones.  
You normalize these keywords into concrete values in your implementation.

```ts
import {
    useLayoutEffect,
} from 'react'

import {
    useTransitionBehaviorState,
    type TransitionStateOptions,
    type ResolveDriverStateArgs,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TransitionBehaviorStateDefinition,
    type TransitionBehaviorState,
} from '@reusable-ui/transition-state'
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
export interface LockedStateOptions extends TransitionStateOptions<boolean> {
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
        TransitionBehaviorStateDefinition<boolean | 'auto', boolean, LockedPhase, LockedClassname,
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
 * - Mirrors `TransitionBehaviorState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `locked`, `actualLocked`, etc.
 */
export interface LockedBehaviorState<TElement extends Element = HTMLElement>
    extends
        Omit<TransitionBehaviorState<boolean, LockedPhase, LockedClassname, TElement>,
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
 * - Provides semantic phases and classnames for styling.
 */
export const useLockedBehaviorState = <TElement extends Element = HTMLElement>(props: LockedStateProps & LockedStateUpdateProps, options?: LockedStateOptions): LockedBehaviorState<TElement> => {
    // Normalize declarative keywords into a concrete boolean:
    const effectiveLocked = useLockedState(props, options);
    
    // Transition orchestration:
    const [{
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : locked,
        actualState         : actualLocked,
        transitionPhase     : lockedPhase,
        transitionClassname : lockedClassname,
        ...animationHandlers
    }] = useTransitionBehaviorState<
        boolean | 'auto',
        boolean,
        LockedPhase,
        LockedClassname,
        
        LockedStateProps,
        LockedStateOptions,
        LockedBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { initialResolvedState: effectiveLocked },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['locking', 'unlocking'],
            defaultAnimationBubbling   : false,
            useResolveDriverState      : useResolveLockedDriverState,      // Controlled mode only.
            resolveTransitionPhase     : resolveLockedTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveLockedTransitionClassname, // Resolves classnames.
        } satisfies LockedBehaviorStateDefinition,
    );
    
    // Observer effect: emits state update events on `effectiveLocked` updates.
    useLayoutEffect(() => {
        // Emits state update events:
        props.onLockedUpdate?.(effectiveLocked, undefined);
    }, [effectiveLocked]);
    
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

/** Resolves the driver state for locked behavior. */
const useResolveLockedDriverState = ({ props, options }: ResolveDriverStateArgs<boolean, LockedStateProps, LockedStateOptions, LockedBehaviorStateDefinition>): boolean => {
    return useLockedState(props, options);
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

### Feedback-Based States

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
    useLayoutEffect,
} from 'react'

import {
    useTransitionBehaviorState,
    type TransitionStateOptions,
    type ResolveDriverStateArgs,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TransitionBehaviorStateDefinition,
    type TransitionBehaviorState,
} from '@reusable-ui/transition-state'
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
export interface OnlineStateOptions extends TransitionStateOptions<boolean> {
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
        TransitionBehaviorStateDefinition<boolean | 'auto', boolean, OnlinePhase, OnlineClassname,
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
 * - Mirrors `TransitionBehaviorState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `online`, `actualOnline`, etc.
 */
export interface OnlineBehaviorState<TElement extends Element = HTMLElement>
    extends
        Omit<TransitionBehaviorState<boolean, OnlinePhase, OnlineClassname, TElement>,
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
 * - Provides semantic phases and classnames for styling.
 */
export const useOnlineBehaviorState = <TElement extends Element = HTMLElement>(props: OnlineStateProps & OnlineStateUpdateProps, options?: OnlineStateOptions): OnlineBehaviorState<TElement> => {
    // Normalize declarative keywords into a concrete boolean:
    const effectiveOnline = useCurrentOnlineState(props, options);
    
    // Transition orchestration:
    const [{
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : online,
        actualState         : actualOnline,
        transitionPhase     : onlinePhase,
        transitionClassname : onlineClassname,
        ...animationHandlers
    }] = useTransitionBehaviorState<
        boolean | 'auto',
        boolean,
        OnlinePhase,
        OnlineClassname,
        
        OnlineStateProps,
        OnlineStateOptions,
        OnlineBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { initialResolvedState: effectiveOnline },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['connecting', 'disconnecting'],
            defaultAnimationBubbling   : false,
            useResolveDriverState      : useResolveOnlineDriverState,      // Controlled mode only.
            resolveTransitionPhase     : resolveOnlineTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveOnlineTransitionClassname, // Resolves classnames.
        } satisfies OnlineBehaviorStateDefinition,
    );
        
        // Observer effect: emits state update events on `effectiveOnline` updates.
        useLayoutEffect(() => {
            // Emits state update events:
            props.onOnlineUpdate?.(effectiveOnline, undefined);
        }, [effectiveOnline]);
    
    // Return domain-specific API:
    return {
        online,
        actualOnline,
        onlinePhase,
        onlineClassname,
        ...animationHandlers,
    } satisfies OnlineBehaviorState<TElement>;
};

/** Normalizes declarative keywords into a concrete and effective online state. */
const useCurrentOnlineState = (props: OnlineStateProps, options?: OnlineStateOptions): boolean => {
    const {
        defaultOnline = 'auto',
    } = options ?? {};
    
    const {
        online: controlledOnline = defaultOnline,
    } = props;
    
    if (controlledOnline === 'auto') {
        // Example normalization: use browser API to determine online status.
        return navigator.onLine;
    }
    
    return controlledOnline;
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

/** Resolves the driver state for online behavior. */
const useResolveOnlineDriverState = ({ props, options }: ResolveDriverStateArgs<boolean, OnlineStateProps, OnlineStateOptions, OnlineBehaviorStateDefinition>): boolean => {
    return useLiveOnlineState(props, options);
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

### Interaction-Based States

Represents states that can be changed through user interactions.  
Typically dynamic and can change frequently.

Example: **selected/unselected** state with animation lifecycle integration.  
Supports both controlled and uncontrolled modes.  
Exposes a dispatcher (`dispatchSelectedChange`) for interactive state changes.  
Declarative keywords (`'auto'`, `'inherit'`) are supported in controlled mode only.  
In uncontrolled mode, the hook manages internal state holding normalized concrete values.

```ts
import {
    useTransitionBehaviorState,
    type TransitionStateOptions,
    type ResolveDriverStateArgs,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TransitionBehaviorStateDefinition,
    type TransitionBehaviorState,
} from '@reusable-ui/transition-state'
import { useStableCallback } from '@reusable-ui/callbacks'
import { type ValueChangeDispatcher, type ValueChangeEventHandler } from '@reusable-ui/events'
import { useDisabledState } from '@reusable-ui/disabled-state'
import { useReadOnlyState } from '@reusable-ui/read-only-state'

/**
 * Example implementation of an interactive selected/unselected state with animation lifecycle integration.
 * 
 * Provides a hybrid controlled/uncontrolled selected state with support for declarative keywords (`'auto'`).
 * 
 * Exposes semantic phases and classnames for styling, synchronized with animation transitions,
 * and a dispatcher for interactive state changes.
 */

/** Props for controlling the selected state of a component. */
export interface SelectedStateProps {
    /**
     * Specifies the selected state for controlled mode.
     * 
     * - `true`   → selected
     * - `false`  → unselected
     * - `'auto'` → automatically determine selected state based on context
     */
    selected ?: boolean | 'auto'
}

/** Props for initializing the selected state in uncontrolled components. */
export interface UncontrollableSelectedStateProps {
    /** Specifies the initial selected state for uncontrolled mode. */
    defaultSelected ?: boolean
}

/** Props for reporting proactive change requests to the selected state. */
export interface SelectedStateChangeProps<TChangeEvent = unknown> {
    /** Signals intent to change the selected state. */
    onSelectedChange ?: ValueChangeEventHandler<boolean, TChangeEvent>
}

/** Options for customizing the selected change dispatcher behavior. */
export interface SelectedChangeDispatcherOptions<TChangeEvent = unknown> {
    /** Optional callback invoked when an internal state update should occur. */
    onInternalChange ?: ValueChangeEventHandler<boolean, TChangeEvent>
}

/** Options for customizing selected state behavior and animation lifecycle. */
export interface SelectedStateOptions extends TransitionStateOptions<boolean> {
    /** The initial selected state if `defaultSelected` prop is not provided. */
    defaultSelected ?: boolean
}

/** Semantic phases when the component is fully settled. */
export type ResolvedSelectedPhase = 'selected' | 'unselected'

/** Transitional phases while the component is animating. */
export type TransitioningSelectedPhase = 'selecting' | 'deselecting'

/** Union of resolved and transitional phases. */
export type SelectedPhase = ResolvedSelectedPhase | TransitioningSelectedPhase

/** Semantic CSS classnames tied to selected phases. */
export type SelectedClassname = `is-${SelectedPhase}`

/** Private definition for online state behavior. */
interface SelectedBehaviorStateDefinition
    extends
        TransitionBehaviorStateDefinition<boolean | 'auto', boolean, SelectedPhase, SelectedClassname,
            SelectedStateProps,
            SelectedStateOptions,
            SelectedBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}

/**
 * Public API returned by `useSelectedBehaviorState`.
 * 
 * @remarks
 * - Mirrors `TransitionBehaviorState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `selected`, `actualSelected`, etc.
 */
export interface SelectedBehaviorState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        Omit<TransitionBehaviorState<boolean, SelectedPhase, SelectedClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /** The current settled selected state (animation-aware). */
    selected               : boolean
    
    /** The actual resolved selected state (immediate, may appear out of sync). */
    actualSelected         : boolean
    
    /** The semantic transition phase (`selected`, `unselected`, `selecting`, `deselecting`). */
    selectedPhase          : SelectedPhase
    
    /** A CSS classname reflecting the current selected phase. */
    selectedClassname      : SelectedClassname
    
    /** Requests a change to the selected state. */
    dispatchSelectedChange : ValueChangeDispatcher<boolean, TChangeEvent>
}

/**
 * Hook for managing selected state with animation lifecycle integration.
 * 
 * @remarks
 * - Supports both controlled and uncontrolled modes.
 * - Declarative keywords (`'auto'`) are normalized by `useSelectedState`.
 * - Provides semantic phases and classnames for styling.
 */
export const useSelectedBehaviorState = <TElement extends Element = HTMLElement, TChangeEvent = unknown>(props: SelectedStateProps & UncontrollableSelectedStateProps & SelectedStateChangeProps<TChangeEvent>, options?: SelectedStateOptions): SelectedBehaviorState<TElement, TChangeEvent> => {
    const {
        defaultSelected = false,
    } = options ?? {};
    
    const {
        defaultSelected : defaultInitialIntent = defaultSelected,
        selected        : initialState         = defaultInitialIntent, // Initial intent comes from `selected` (if controlled) or `defaultSelected` (if uncontrolled).
        selected        : controlledSelected,
    } = props;
    
    // Resolve initial effective selected state:
    // - Use initial selected state as the source (for both controlled and uncontrolled modes)
    // - Effective state normalizes declarative values into concrete ones
    const initialEffectiveSelected = useSelectedState({
        ...props,
        defaultSelected : undefined,    // Prevents uncontrolled value.
        selected        : initialState, // Pass the initial state as controlled value.
    }, options);
    
    // Transition orchestration:
    const [{
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : selected,
        actualState         : actualSelected,
        transitionPhase     : selectedPhase,
        transitionClassname : selectedClassname,
        ...animationHandlers
    }, setInternalState] = useTransitionBehaviorState<
        boolean | 'auto',
        boolean,
        SelectedPhase,
        SelectedClassname,
        
        SelectedStateProps,
        SelectedStateOptions,
        SelectedBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { initialResolvedState: initialEffectiveSelected },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['selecting', 'deselecting'],
            defaultAnimationBubbling   : false,
            useResolveDriverState      : useResolveSelectedDriverState,      // Prefers controlled mode, falls back to uncontrolled mode.
            resolveTransitionPhase     : resolveSelectedTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveSelectedTransitionClassname, // Resolves classnames.
        } satisfies SelectedBehaviorStateDefinition,
    );
    
    // Determine control mode:
    const isControlled = (controlledSelected !== undefined);
    
    // A stable dispatcher for selection change requests:
    const dispatchSelectedChange = useSelectedStateChangeDispatcher<TChangeEvent>(props as Omit<typeof props, 'defaultSelected'>, {
        onInternalChange: (newState) => {
            // Update the internal state only if uncontrolled:
            if (!isControlled) setInternalState(newState);
        },
    });
    
    // Return domain-specific API:
    return {
        selected,
        actualSelected,
        selectedPhase,
        selectedClassname,
        dispatchSelectedChange,
        ...animationHandlers,
    } satisfies SelectedBehaviorState<TElement, TChangeEvent>;
};

/** Normalizes declarative keywords into a concrete and effective selected state. */
const useSelectedState = (props: SelectedStateProps & { defaultSelected?: never }, options?: SelectedStateOptions): boolean => {
    const {
        defaultSelected = false,
    } = options ?? {};
    
    const {
        selected: controlledSelected = defaultSelected,
    } = props;
    
    if (controlledSelected === 'auto') {
        // Example normalization: treat 'auto' as selected by default.
        return true;
    }
    
    return controlledSelected;
};

/** Resolves the driver state for selected behavior. */
const useResolveSelectedDriverState = ({ internalState, props, options }: ResolveDriverStateArgs<boolean, SelectedStateProps & UncontrollableSelectedStateProps, SelectedStateOptions, SelectedBehaviorStateDefinition>): boolean => {
    const {
        selected: controlledSelected,
    } = props;
    
    // Determine control mode:
    const isControlled = (controlledSelected !== undefined);
    
    // Resolve effective state:
    // - Prefers controlled state if available, otherwise uses internal state
    // - Effective state normalizes declarative values into concrete ones
    const driverState       = isControlled ? controlledSelected : internalState;
    const effectiveSelected = useSelectedState({
        ...props,
        defaultSelected : undefined,   // Prevents uncontrolled value.
        selected        : driverState, // Pass the driver state as controlled value.
    }, options);
    
    // Return the resolved effective selected state:
    return effectiveSelected;
};

/** Resolves the semantic transition phase for selected behavior. */
const resolveSelectedTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, SelectedStateProps, SelectedStateOptions, SelectedBehaviorStateDefinition>): SelectedPhase => {
    if (isTransitioning) return settledState ? 'selecting' : 'deselecting';
    return settledState ? 'selected' : 'unselected';
};

/** Resolves the semantic transition classname for selected behavior. */
const resolveSelectedTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, SelectedPhase, SelectedStateProps, SelectedStateOptions, SelectedBehaviorStateDefinition>): SelectedClassname => {
    return `is-${transitionPhase}`;
};

/** Creates a stable dispatcher for requesting a change to the selected state. */
export const useSelectedStateChangeDispatcher = <TChangeEvent = unknown>(props: SelectedStateChangeProps<TChangeEvent> & { defaultSelected?: never }, options?: SelectedChangeDispatcherOptions<TChangeEvent>) : ValueChangeDispatcher<boolean, TChangeEvent> => {
    // Resolve whether the component is in a restricted state:
    const isDisabled   = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    const isReadonly   = useReadOnlyState(props as Parameters<typeof useReadOnlyState>[0]);
    const isRestricted = isDisabled || isReadonly;
    
    // A stable dispatcher for state change requests:
    const dispatchStateChange : ValueChangeDispatcher<boolean, TChangeEvent> = useStableCallback((newState: boolean, event: TChangeEvent): void => {
        // Halt interaction lifecycle when the component is in a restricted state (interaction blocked):
        if (isRestricted) return;
        
        // Update the internal state (if provided):
        options?.onInternalChange?.(newState, event);
        
        // Dispatch external change handler (if provided):
        props.onSelectedChange?.(newState, event);
    });
    
    // Return the state change dispatcher:
    return dispatchStateChange;
};
```

## 🧠 Transition Animation Behavior

The hook manages transitions between concrete states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from one state to another) is deferred until the current animation completes.  
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.  
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded, keeping the lifecycle predictable and consistent across all specialized states.  

## 📚 Related Packages

- [`@reusable-ui/animation-state`](https://www.npmjs.com/package/@reusable-ui/animation-state) – core animation lifecycle management.  
- [`@reusable-ui/feedback-state`](https://www.npmjs.com/package/@reusable-ui/feedback-state) – feedback-driven state management.  
- [`@reusable-ui/interaction-state`](https://www.npmjs.com/package/@reusable-ui/interaction-state) – interaction-driven state management.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/transition-state** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/transition-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/transition-state brings expressive, lifecycle-aware transition management to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
