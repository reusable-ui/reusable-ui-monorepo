# @reusable-ui/orientationable

> ⚠️ **Deprecated** — superseded by [`@reusable-ui/orientation-variant`](https://www.npmjs.com/package/@reusable-ui/orientation-variant) and [`@reusable-ui/flow-direction-variant`](https://www.npmjs.com/package/@reusable-ui/flow-direction-variant)

---

## 📦 Deprecation Summary

The `@reusable-ui/orientationable` package has been deprecated in favor of a more modular and semantically clear approach.  
Its responsibilities have been split into two focused packages:

| Replacement | Purpose |
|-------------|---------|
| [`@reusable-ui/orientation-variant`](https://www.npmjs.com/package/@reusable-ui/orientation-variant) | Handles layout orientation (`inline` vs `block`) |
| [`@reusable-ui/flow-direction-variant`](https://www.npmjs.com/package/@reusable-ui/flow-direction-variant) | Handles directional flow (`start` vs `end`) |

---

## 🧠 Why the Change?

The original `orientationable` API combined orientation and directional flow into a single abstraction. While powerful, this coupling introduced:

- Redundant logic and selector complexity
- Reduced composability with other variant systems
- Ambiguity between layout axis and directional semantics

By separating these concerns, the new packages offer:

✅ Cleaner APIs  
✅ More predictable styling behavior  
✅ Easier integration with other variant hooks

---

## 🔄 Migration Guide

### From `useOrientationable` → `useOrientationVariant`

```ts
// Before
const { class: orientationClassname, isOrientationVertical } = useOrientationable(props);

// After
const { orientationClassname, isOrientationBlock } = useOrientationVariant(props);
```

### From `usesOrientationable` → `usesOrientationVariant`

```ts
// Before
const orientationStuff = usesOrientationable();

// After
const orientationStuff = usesOrientationVariant();
```

> Note: `isOrientationVertical` was a heuristic based on `isOrientationBlock`.  
> For more accurate vertical detection, consider inspecting `writing-mode` directly.

---

### From `usesOrientationableWithDirection` → Combined Hooks

```ts
// Before
const {
  ifOrientationInlineStart,
  ifOrientationInlineEnd,
  
  ifOrientationBlockStart,
  ifOrientationBlockEnd,
} = usesOrientationableWithDirection();

// After
const {
  ifOrientationInline,
  ifOrientationBlock,
} = usesOrientationVariant();

const {
  ifFlowDirectionStart,
  ifFlowDirectionEnd,
} = usesFlowDirectionVariant();
```

---

## 🧩 Legacy Support

This package will remain available for backward compatibility but is no longer maintained.  
All types, selectors, and hooks are marked with `@deprecated` and will be removed in future major versions.

---

## 🧪 Deprecated API Overview

| Deprecated | Replacement |
|------------|-------------|
| `OrientationableStuff` | `OrientationVariantProps` + `FlowDirectionVariantProps` |
| `usesOrientationable()` | `usesOrientationVariant()` |
| `useOrientationable()` | `useOrientationVariant()` |
| `usesOrientationableWithDirection()` | `usesOrientationVariant()` + `usesFlowDirectionVariant()` |
| `useOrientationableWithDirection()` | `useOrientationVariant()` + `useFlowDirectionVariant()` |
| `OrientationWithDirectionName` | `Orientation` + `FlowDirection` |
