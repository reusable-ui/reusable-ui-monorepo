# @reusable-ui/hooks ⚠️ (Deprecated)

**This package is deprecated** and now serves as a **re-export layer** for the following specialized packages:

| **Deprecated Item** | **Use Instead** | **New Package** |
|--------------------|----------------|------------------|
| `EventHandler` | `EventHandler` | `@reusable-ui/callbacks` |
| `useEvent` | `useStableEventHandler` | `@reusable-ui/callbacks` |
| `useMergeEvents` | `useMergeEventHandlers` | `@reusable-ui/callbacks` |
| `useIsomorphicLayoutEffect` | `useIsomorphicLayoutEffect` | `@reusable-ui/lifecycles` |
| `useTriggerRender` | `useTriggerRender` | `@reusable-ui/lifecycles` |
| `useMountedFlag` | `useMountedFlag` | `@reusable-ui/lifecycles` |
| `useMergeClasses` | `mergeClasses` | `@reusable-ui/styles` |
| `useMergeStyles` | `useMergeStyles` | `@reusable-ui/styles` |
| `useMergeRefs` | `useMergeRefs` | `@reusable-ui/references` |
| `useIsRtl` | `useIsRtl` | `@reusable-ui/directionality` |
| `ScheduledPromise` | `ScheduledPromise` | `@reusable-ui/timers` |
| `useSetTimeout` | `useSetTimeout` | `@reusable-ui/timers` |
| `useRequestAnimationFrame` | `useRequestAnimationFrame` | `@reusable-ui/timers` |
| `useScheduleTriggerEvent` | `useSetTimeout` | `@reusable-ui/timers` |

## 📢 Migration Guide  
If you’re using `@reusable-ui/hooks`, **replace imports** with the appropriate package:  

```ts
// Old (deprecated)
import { useEvent } from '@reusable-ui/hooks';

// New (recommended)
import { useStableEventHandler } from '@reusable-ui/callbacks';
```

## 📦 Installation
Though deprecated, you can still install **@reusable-ui/hooks** for compatibility:

```sh
npm install @reusable-ui/hooks
# or
yarn add @reusable-ui/hooks
```

However, it’s **strongly recommended** to migrate to the new modular packages.

## 🛠️ How This Package Works
`@reusable-ui-hooks` internally:
- **Imports items from specialized packages.**
- **Marks them as deprecated with `@deprecated`.**
- **Re-exports them, helping users transition smoothly.**

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/hooks** was previously an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Since this package is deprecated, contributions should be directed to the specialized packages.  
See our [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **Migrating to modular packages ensures better scalability and organization!**  
If this guide helped, consider updating your imports today.  
