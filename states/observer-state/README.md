# @reusable-ui/observer-state 📦  

**observer-state** observes a specific condition (typically a DOM interaction) and emits a resolved state whenever that condition changes.  
It abstracts the **reactive resolution** of observed states, providing a unified foundation for domain-specific observers such as `focus-observer`, `hover-observer`, `press-observer`, or even environment-driven observers like `online-status-observer`.  

By centralizing these patterns, you eliminate duplicated event logic across components and ensure **consistency, predictability, and maintainability** throughout your UI ecosystem.  

With **observer-state**, you can:  
- Build domain-specific observers (e.g. focus, hover, press) with minimal boilerplate.  
- Support both **controlled and uncontrolled modes**, activating observers only when uncontrolled.  
- Correctly wire up corresponding event handlers (`onFocus`/`onBlur`, `onMouseEnter`/`onMouseLeave`, `onMouseDown`/`onMouseUp`, etc.) under restricted or unrestricted conditions.  
Apply **restriction behaviors** (continuous vs discrete) to persist or reset the observed state in predictable ways.  

## ✨ Features
✔ Reactive observation of DOM (or environment) conditions (focus, hover, press, online-status, etc.)  
✔ Controlled, uncontrolled, and hybrid state management modes  
✔ Restriction handling with discrete (always reset) or continuous (resume if valid) behaviors  
✔ Seamless integration with event handlers for common DOM events  
✔ Consistent state emission contract (`Props`, `Options`, `Definition`) for each observer  

## 📦 Installation
Install **@reusable-ui/observer-state** via npm or yarn:

```sh
npm install @reusable-ui/observer-state
# or
yarn add @reusable-ui/observer-state
```

## 🧩 Exported Hooks

### `useObserverState(props, options, definition)`

Observes a specific condition (typically a DOM interaction) and emits a resolved state whenever that condition changes.

Actively tracks the component's state by listening to event updates and applying restriction rules when the component is disabled or read-only.

#### Controlled mode
When `isControlled` is `true`, the observer becomes inactive and stops emitting state updates.  
In this mode, `observedState` should be considered *unreliable*,
and the component must rely entirely on its externally controlled state.

#### Restricted mode
When `isRestricted` is `true`, the state is always treated as inactive, regardless of incoming updates.  
In this mode, `observedState` remains *reliable* as a reflection of the restricted condition.

#### 💡 Usage Example

This example demonstrates how to use the `useFocusObserverState` hook to track whether a component should display a **focus indicator**.

Unlike raw focus, not all elements show a visible indicator when focused.  
- **Inputs/textareas** always display focus indicators.  
- **Buttons and other non-text inputs** only display focus indicators when keyboard navigation is detected.  

The `observedFocus` value tells you whether the focus indicator should be shown.

```ts
import { useRef, useEffect } from 'react'
import { useObserverState, type ObserverProps, type ObserverDefinition } from '@reusable-ui/observer-state'
import { useStableCallback } from '@reusable-ui/callbacks'



// Define how the focus observer should behave:
// - This is not a raw "isFocused" check, but a *focus indicator* observer.
// - Inputs/textareas always show focus indicators.
// - Other elements (like buttons) only show focus indicators when keyboard navigation is detected.
// - inactiveState: The default state when not focused.
// - restrictionBehavior: 'discrete' means state resets when restriction is lifted.
// - getCurrentState: a function to check if the element or its descendants are focused and need focus indication.
const focusObserverDefinition : ObserverDefinition<boolean, Element> = {
    inactiveState       : false,
    restrictionBehavior : 'discrete',
    getCurrentState     : (element) =>
        element.matches(
            ':is(:focus-visible, .input-like-focus:focus, :has(:focus-visible, .input-like-focus:focus))'
        ),
};

// Props interface for the focus observer hook:
// - Currently identical to ObserverProps, but reserved for future extensions.
export interface FocusObserverState extends ObserverProps {
    /* no additional props yet - reserved for future extensions */
}

// Hook: useFocusObserverState
// Observes whether the component should display a focus indicator.
export const useFocusObserverState = <TElement extends Element = HTMLElement>(props: FocusObserverState) => {
    // `useObserverState` provides the core observer logic:
    // - elementRef: ref to attach to the target element
    // - observedState: the current focus state (true/false)
    // - safeUpdateState: helper to safely update state based on events
    const {
        elementRef,
        observedState,
        safeUpdateState,
    } = useObserverState<boolean, TElement>(props, undefined, focusObserverDefinition);
    
    // Event handlers:
    
    // Marks focus indicator as active when element receives focus:
    const handleFocus   = useStableCallback((event: React.FocusEvent<TElement>) => safeUpdateState(event.currentTarget, true));
    
    // Mark focus indicator as inactive when element loses focus:
    const handleBlur    = useStableCallback((event: React.FocusEvent<TElement>) => safeUpdateState(event.currentTarget, false));
    
    // Detect keyboard navigation:
    //   For non-heavy-input elements (like buttons), focus indicators should only appear
    //   if keyboard input is detected. This handler ensures that pressing keys other than Tab
    //   can activate the focus indicator.
    const handleKeyDown = useStableCallback((event: React.KeyboardEvent<TElement>) => {
        if (props.isControlled) return; // Skip if externally controlled.
        if (event.key === 'Tab' && !event.defaultPrevented) return; // Let browser handle Tab focus.
        safeUpdateState(event.currentTarget, true);
    });
    
    // Return the observed focus indicator state and handlers for integration:
    return {
        observedFocus: observedState, // whether to show focus indicator
        elementRef,                   // attach to the element you want to observe
        handleFocus,                  // bind to onFocus
        handleBlur,                   // bind to onBlur
        handleKeyDown,                // bind to onKeyDown
    };
};
```

## 📚 Related Packages

- [`@reusable-ui/feedback-state`](https://www.npmjs.com/package/@reusable-ui/feedback-state) – feedback-driven state management  
- [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state) – focus resolution with observer fallback  
- [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state) – hover resolution with observer fallback  
- [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state) – press resolution with observer fallback  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/observer-state** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/observer-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/observer-state delivers predictable, reusable state resolution for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
