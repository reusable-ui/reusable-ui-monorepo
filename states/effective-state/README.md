# @reusable-ui/effective-state 📦  

**effective-state** provides a collection of reusable **effective state resolvers** for various kinds of props.  
It abstracts recurring state resolution patterns found across many `*-state` packages — from controlled inputs to advanced behaviors such as range clamping, context cascading, and external observation.

By centralizing these patterns, you avoid duplicating logic across components and ensure consistency, predictability, and maintainability throughout your UI ecosystem.

With **effective-state**, you can build:  
- **Controlled states** — extract values from controlled props.  
- **Ranged states** — controlled states with clamping to valid ranges.  
- **Cascade states** — controlled states that can inherit from context when cascade behavior is enabled.  
- **Observable states** — controlled states that can delegate to external observers with restriction handling.  

Currently, four main state resolvers are provided.  
Future state resolvers can be added as new patterns emerge, keeping the package extensible and adaptable.

## 🔗 Ecosystem Integration

The effective state values produced by these resolvers can be fed directly into other `@reusable-ui` packages:

- [`@reusable-ui/transition-state`](https://www.npmjs.com/package/@reusable-ui/transition-state) — `TransitionStateProps.effectiveState : TState`
- [`@reusable-ui/feedback-state`](https://www.npmjs.com/package/@reusable-ui/feedback-state) — `FeedbackStateProps.effectiveState : TState`
- [`@reusable-ui/interaction-state`](https://www.npmjs.com/package/@reusable-ui/interaction-state) — `InteractionStateDefinition.useResolvedEffectiveState() => TState`

This makes **@reusable-ui/effective-state** the foundational layer for consistent state resolution across transitions, feedback, and interaction behaviors.

## ✨ Features
✔ Controlled state management mode  
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

### `useResolvedControlledState(props, options, definition)`

Resolves an effective state value from controlled props.

**Resolution order:**
  1. `props.state`  
  2. `options.defaultState`  
  3. `definition.defaultState`  

#### 💡 Usage Examples

Controlled mode, by supplying `state` prop:

```ts
const expanded = useResolvedControlledState(
    // Props:
    { state: true },
    
    // Options:
    { defaultState: false },
    
    // Definition:
    { defaultState: false }
); // → true
```

Default mode, by falling back to `defaultState` option:

```ts
const expanded = useResolvedControlledState(
    // Props:
    {},
    
    // Options:
    { defaultState: false },
    
    // Definition:
    { defaultState: false }
); // → false
```

### `useResolvedRangedState(props, options, definition)`

Resolves an effective state value from controlled props while optionally
clamping for a valid range when the clamping function is available.

**Resolution order:**
  1. `props.state`  
  2. `options.defaultState`  
  3. `definition.defaultState`  
  4. `clampState` function (normalization)  

#### 💡 Usage Examples

Controlled mode with clamping, by supplying `state` prop and declaring `clampState` function:

```ts
const viewIndex = useResolvedRangedState(
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

Default mode with clamping, by falling back to `defaultState` option and declaring `clampState` function:

```ts
const viewIndex = useResolvedRangedState(
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

### `useResolvedCascadeState(props, options, definition)`

Resolves an effective state value from controlled props while optionally
cascading from context when cascade behavior is enabled.

**Resolution order:**
  1. `props.state`  
  2. `options.defaultState`  
  3. `definition.defaultState`  
  4. `stateContext` (when the cascading is enabled)  
  5. `inactiveState` (fallback)  

#### 💡 Usage Examples

Controlled mode with cascading, by supplying `state` prop and inheriting from context:

```ts
const disabled = useResolvedCascadeState(
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

Default mode with cascading, by falling back to `defaultState` option and inheriting from context:

```ts
const disabled = useResolvedCascadeState(
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

### `useResolvedObservableState(props, options, definition)`

Resolves an effective state value from controlled props while optionally
delegating to an external observer when the resolved value equals the explicit
observable token.

When `isRestricted` is true, the state is forced to `inactiveState`.  

**Resolution order:**
  1. `inactiveState` (when `isRestricted` is true)  
  2. `props.state`  
  3. `options.defaultState`  
  4. `definition.defaultState`  
  5. `observedState` (when the resolved value equals `observableStateToken`)  

#### 💡 Usage Examples

Controlled mode with observation, by supplying `state` prop:

```ts
const { focused } = useResolvedObservableState(
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

Default mode with observation, by falling back to `defaultState` option:

```ts
const { focused } = useResolvedObservableState(
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
