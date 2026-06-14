# @reusable-ui/effective-state 📦  

**effective-state** provides a collection of reusable **effective state resolvers** for various kinds of props.  
It abstracts recurring state resolution patterns found across many `*-state` packages — from controlled vs uncontrolled inputs to advanced behaviors such as range clamping, context cascading, and external observation.

By centralizing these patterns, you avoid duplicating logic across components and ensure consistency, predictability, and maintainability throughout your UI ecosystem.

With **effective-state**, you can build:  
- **Controllable states** — extract values from props with controlled/uncontrolled fallback.  
- **Ranged states** — controllable states with clamping to valid ranges.  
- **Cascade states** — controllable states that can inherit from context when cascade behavior is enabled.  
- **Observable states** — controllable states that can delegate to external observers with restriction handling.  

Currently, four main state resolvers are provided.  
Future state resolvers can be added as new patterns emerge, keeping the package extensible and adaptable.

## 🔗 Ecosystem Integration

The effective state values produced by these resolvers can be fed directly into other `@reusable-ui` packages:

- [`@reusable-ui/transition-state`](https://www.npmjs.com/package/@reusable-ui/transition-state) — `TransitionStateProps.effectiveState : TState`
- [`@reusable-ui/feedback-state`](https://www.npmjs.com/package/@reusable-ui/feedback-state) — `FeedbackStateProps.effectiveState : TState`
- [`@reusable-ui/interaction-state`](https://www.npmjs.com/package/@reusable-ui/interaction-state) — `InteractionBehaviorStateDefinition.useResolvedEffectiveState() => TState`

This makes **@reusable-ui/effective-state** the foundational layer for consistent state resolution across transitions, feedback, and interaction behaviors.

## ✨ Features
✔ Controlled, uncontrolled, and hybrid state management modes  
✔ Consistent resolution order (props → options → definition → feature-specific rules)  
✔ Specialized extensions for ranged, cascade, and observable behaviors  
✔ Declarative tokens for observation and context inheritance  
✔ Unified type contracts (`Props`, `Options`, `Definition`) for each resolver  

## 📦 Installation
Install **@reusable-ui/effective-state** via npm or yarn:

```sh
npm install @reusable-ui/effective-state
# or
yarn add @reusable-ui/effective-state
```

## 🧩 Exported Hooks

### `useControllableState(props, options, definition)`

Resolves an effective state value from controlled or uncontrolled props.

**Resolution order:**
  1. `state` prop (controlled mode)  
  2. `defaultState` prop (uncontrolled mode)  
  3. `defaultState` option (uncontrolled mode)  
  4. `defaultState` definition (uncontrolled mode)  

#### 💡 Usage Examples

Controlled mode, by supplying `state` prop:

```ts
const expanded = useControllableState(
    // Props:
    { state: true },
    
    // Options:
    { defaultState: false },
    
    // Definition:
    { defaultState: false }
); // → true
```

Uncontrolled mode, by specifying `defaultState` prop:

```ts
const expanded = useControllableState(
    // Props:
    { defaultState: true },
    
    // Options:
    { defaultState: false },
    
    // Definition:
    { defaultState: false }
); // → true
```

Uncontrolled mode, by falling back to `defaultState` option:

```ts
const expanded = useControllableState(
    // Props:
    {},
    
    // Options:
    { defaultState: false },
    
    // Definition:
    { defaultState: false }
); // → false
```

### `useRangedState(props, options, definition)`

Resolves an effective state value from controlled or uncontrolled props, with optional clamping to a valid range.

If a `clampState` function is declared in options or definition, the resolved value is normalized into a valid range.

**Resolution order:**
  1. `state` prop (controlled mode)  
  2. `defaultState` prop (uncontrolled mode)  
  3. `defaultState` option (uncontrolled mode)  
  4. `defaultState` definition (uncontrolled mode)  
  5. `clampState` function (normalization)  

#### 💡 Usage Examples

Controlled mode with clamping, by supplying `state` prop and declaring `clampState` function:

```ts
const viewIndex = useRangedState(
    // Props:
    { state: 5 },
    
    // Options:
    {
        defaultState: 0,
        clampState: (rawIndex) => Math.max(0, Math.min(rawIndex, 10)), // clamp between 0–10
    },
    
    // Definition:
    { defaultState: 0 }
); // → 5
```

Uncontrolled mode with clamping, by falling back to `defaultState` option and declaring `clampState` function:

```ts
const viewIndex = useRangedState(
    // Props:
    {},
    
    // Options:
    {
        defaultState: 0,
        clampState: (rawIndex) => Math.max(0, Math.min(rawIndex, 10)), // clamp between 0–10
    },
    
    // Definition:
    { defaultState: 0 }
); // → 0 (component-level default, clamped)
```

### `useCascadeState(props, options, definition)`

Resolves an effective state value from controlled or uncontrolled props, with optional cascading from context when cascade behavior is enabled.

If cascading is enabled and the resolved state equals `inactiveState`, the hook attempts to inherit from `stateContext`.

**Resolution order:**
  1. `state` prop (controlled mode)  
  2. `defaultState` prop (uncontrolled mode)  
  3. `defaultState` option (uncontrolled mode)  
  4. `defaultState` definition (uncontrolled mode)  
  5. Inherit from `stateContext` (if cascading enabled and resolved state equals `inactiveState`)  
  6. Use `inactiveState` (fallback)  

#### 💡 Usage Examples

Controlled mode with cascading, by supplying `state` prop and inheriting from context:

```ts
const disabled = useCascadeState(
    // Props:
    { state: false, cascadeEnabled: true },
    
    // Options:
    {
        defaultState: false,
        defaultCascadeEnabled: true,
    },
    
    // Definition:
    {
        defaultState: false,
        defaultCascadeEnabled: true,
        inactiveState: false,
        stateContext: DisabledStateContext,
    }
); // → true (assuming context provides `true`)
```

Uncontrolled mode with cascading, by falling back to `defaultState` option and inheriting from context:

```ts
const disabled = useCascadeState(
    // Props:
    { cascadeEnabled: true },
    
    // Options:
    {
        defaultState: false,
        defaultCascadeEnabled: true,
    },
    
    // Definition:
    {
        defaultState: false,
        defaultCascadeEnabled: true,
        inactiveState: false,
        stateContext: DisabledStateContext,
    }
); // → true (assuming context provides `true`)
```

### `useObservableState(props, options, definition)`

Resolves an effective state value from controlled or uncontrolled props, with optional delegation to an external observer when a declarative token is encountered.

If `isRestricted` is true, the state is forced to `inactiveState`.  
If the resolved state equals `observableStateToken`, the hook delegates to `observedState`.

**Resolution order:**
  1. Use `inactiveState` (if `isRestricted` is true)
  2. `state` prop (controlled mode)  
  3. `defaultState` prop (uncontrolled mode)  
  4. `defaultState` option (uncontrolled mode)  
  5. `defaultState` definition (uncontrolled mode)  
  6. Delegate to `observedState` (if resolved state equals `observableStateToken`)

#### 💡 Usage Examples

Controlled mode with observation, by supplying `state` prop:

```ts
const { focused } = useObservableState(
    // Props:
    { state: 'auto', isRestricted: false, observedState: true },
    
    // Options:
    { defaultState: 'auto' },
    
    // Definition:
    {
        defaultState: 'auto',
        inactiveState: false,
        observableStateToken: 'auto',
    }
);
// → true (delegated to observedState)
```

Uncontrolled mode with observation, by falling back to `defaultState` option:

```ts
const { focused } = useObservableState(
    // Props:
    { isRestricted: true, observedState: true },
    
    // Options:
    { defaultState: 'auto' },
    
    // Definition:
    {
        defaultState: 'auto',
        inactiveState: false,
        observableStateToken: 'auto',
    }
);
// → false (restricted forces inactive baseline)
```

## 📚 Related Packages

- [`@reusable-ui/transition-state`](https://www.npmjs.com/package/@reusable-ui/transition-state) – generic transition abstraction.  
- [`@reusable-ui/feedback-state`](https://www.npmjs.com/package/@reusable-ui/feedback-state) – feedback-driven state management.  
- [`@reusable-ui/interaction-state`](https://www.npmjs.com/package/@reusable-ui/interaction-state) – interaction-driven state management.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/effective-state** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/effective-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/effective-state brings predictable, reusable state resolution to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
