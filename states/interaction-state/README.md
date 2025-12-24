# @reusable-ui/interaction-state 📦  

**interaction-state** is a reusable abstraction for managing lifecycle-aware interaction states in React components.  
It provides a generic hook that can be specialized into *many kinds of interactive behavioral states* by supplying definition parameters.  

With **interaction-state**, you can build:  
- **Interaction-based states** — such as `collapse-state`, `active-state`, `view-state`, or `selected-state`.  

Instead of re-implementing similar logic for each interactive state, `interaction-state` acts as a common foundation.  
By reusing the same core contract, you ensure consistent behavior, predictable animation lifecycles, and reduced code duplication across your UI ecosystem.  

## ✨ Features
✔ Controlled, uncontrolled, and hybrid state management modes via `state` and `defaultState`  
✔ Lifecycle-aware transition animations based on current state  
✔ Gracefully completes running animations before resolving new state  
✔ Declarative state normalization (`'auto'`, `'inherit'`, or custom keywords) into concrete values  
✔ Semantic phase and classname resolution for consistent styling across states  
✔ Exposes a dispatcher `dispatchStateChange()` for interactive state changes  
✔ Restricted state handling — blocks user interaction while restricted (disabled or readonly), preserving the last known state until unrestricted  

## 📦 Installation
Install **@reusable-ui/interaction-state** via npm or yarn:

```sh
npm install @reusable-ui/interaction-state
# or
yarn add @reusable-ui/interaction-state
```

## 🧩 Exported Hook

### `useInteractionBehaviorState(props, options, definition)`

Provides abstract controlled/uncontrolled interaction state with animation lifecycle integration.  
Specialize it into **collapse-state**, **active-state**, or **view-state** by defining the `definition` parameter.

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
- **Default initial state**  
  Provides a fallback initial state when neither `defaultState` prop nor `defaultState` option is provided.
- **Effective state resolver**  
  Normalizes declarative values (`'auto'`, `'inherit'`, etc.) into concrete values, applying domain-specific rules.

## 💡 Usage Examples

Example: **selected/unselected** state with animation lifecycle integration.  
Supports both controlled and uncontrolled modes.  
Exposes a dispatcher (`dispatchSelectedChange`) for interactive state changes.  
Declarative keywords (`'auto'`, `'inherit'`) are supported in controlled mode only.  
In uncontrolled mode, the hook manages internal state holding normalized concrete values.

```ts
import {
    useInteractionBehaviorState,
    type InteractionStateOptions,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type ResolveEffectiveStateArgs,
    type InteractionBehaviorStateDefinition,
    type InteractionBehaviorState,
} from '@reusable-ui/interaction-state'
import { type ValueChangeDispatcher, type ValueChangeEventHandler } from '@reusable-ui/events'

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
export interface SelectedStateOptions extends InteractionStateOptions<boolean> {
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

/** Private definition for selected state behavior. */
interface SelectedBehaviorStateDefinition
    extends
        InteractionBehaviorStateDefinition<boolean | 'auto', boolean, SelectedPhase, SelectedClassname,
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
 * - Mirrors `InteractionBehaviorState` but renames properties into domain-specific terms.
 * - Excludes generic properties (`state`, `actualState`, etc.) in favor of `selected`, `actualSelected`, etc.
 */
export interface SelectedBehaviorState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        Omit<InteractionBehaviorState<boolean, SelectedPhase, SelectedClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
            | 'dispatchStateChange'
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
        defaultSelected  : initialSelected,
        selected         : controlledSelected,
        onSelectedChange : handleSelectedChange,
    } = props;
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : selected,
        actualState         : actualSelected,
        transitionPhase     : selectedPhase,
        transitionClassname : selectedClassname,
        dispatchStateChange : dispatchSelectedChange,
        ...animationHandlers
    } = useInteractionBehaviorState<
        boolean | 'auto',
        boolean,
        SelectedPhase,
        SelectedClassname,
        
        SelectedStateProps,
        SelectedStateOptions,
        SelectedBehaviorStateDefinition,
        
        TElement,
        TChangeEvent
    >(
        // Props:
        { defaultState: initialSelected, state: controlledSelected, onStateChange: handleSelectedChange },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['selecting', 'deselecting'],
            defaultAnimationBubbling   : false,
            defaultInitialState        : false,
            useResolveEffectiveState   : useResolveEffectiveSelectedState,   // Resolves effective state.
            resolveTransitionPhase     : resolveSelectedTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveSelectedTransitionClassname, // Resolves classnames.
        } satisfies SelectedBehaviorStateDefinition,
    );
    
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

/** Resolves the effective selected state, normalizing declarative keywords into concrete values. */
const useResolveEffectiveSelectedState = ({ declarativeState, props, options }: ResolveEffectiveStateArgs<boolean | 'auto', SelectedStateProps, SelectedStateOptions, SelectedBehaviorStateDefinition>): boolean => {
    const effectiveSelected = useSelectedState({
        ...props,
        defaultSelected : undefined,        // Prevents uncontrolled value.
        selected        : declarativeState, // Pass the declarative state as controlled value.
    }, options);
    
    // Return the resolved effective selected state:
    return effectiveSelected;
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

/** Resolves the semantic transition phase for selected behavior. */
const resolveSelectedTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, SelectedStateProps, SelectedStateOptions, SelectedBehaviorStateDefinition>): SelectedPhase => {
    if (isTransitioning) return settledState ? 'selecting' : 'deselecting';
    return settledState ? 'selected' : 'unselected';
};

/** Resolves the semantic transition classname for selected behavior. */
const resolveSelectedTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, SelectedPhase, SelectedStateProps, SelectedStateOptions, SelectedBehaviorStateDefinition>): SelectedClassname => {
    return `is-${transitionPhase}`;
};
```

## 🧠 Transition Animation Behavior

The hook manages transitions between concrete states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from one state to another) is deferred until the current animation completes.  
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.  
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded, keeping the lifecycle predictable and consistent across all specialized states.  

## 📚 Related Packages

- [`@reusable-ui/animation-state`](https://www.npmjs.com/package/@reusable-ui/animation-state) – core animation lifecycle management.  
- [`@reusable-ui/transition-state`](https://www.npmjs.com/package/@reusable-ui/transition-state) – generic transition abstraction.  
- [`@reusable-ui/feedback-state`](https://www.npmjs.com/package/@reusable-ui/feedback-state) – feedback-driven state management.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/interaction-state** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/interaction-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/interaction-state brings expressive, lifecycle-aware interaction management to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
