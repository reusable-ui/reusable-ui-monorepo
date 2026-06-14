# @reusable-ui/styles 📦  

A **React utility library** for efficiently merging and managing styles and class names.  
It provides optimized functions for combining multiple styles, handling conditional class names, and ensuring performance in deep merging operations.

## ✨ Features
✔ **Optimized merging for styles and class names**  
✔ **Supports deeply nested arrays and conditional mappings**  
✔ **Improves performance by reducing unnecessary object mutations**  
✔ **Compatible with React components and dynamic styling needs**  

## 📦 Installation
Install **@reusable-ui/styles** via npm or yarn:

```sh
npm install @reusable-ui/styles
# or
yarn add @reusable-ui/styles
```

## 🔗 Exported Hooks & Functions

### `mergeClasses(...classes: MaybeDeepArray<OptionalOrBoolean<string | Record<string, unknown>>>[]): string`
Efficiently combines multiple class names into a **single space-separated string**, handling deeply nested structures and conditional mappings.  

```tsx
import { mergeClasses } from '@reusable-ui/styles';

const className = mergeClasses(
    // Static class:
    'btn',
    
    // Conditional class:
    isPressed && 'pressed',
    
    // Conditional mapping:
    { active: true, disabled: false },
    
    // Deeply nested structure:
    ['primary', ['rounded', { shadow: true }]]
);

// Result: "btn pressed active primary rounded shadow"
```

---

### `useMergedStyles(...styles: MaybeDeepArray<OptionalOrBoolean<CSSProperties>>[]): CSSProperties`
Merges multiple style objects efficiently, handling **deeply nested arrays and conditional styling**.

```tsx
import { useMergedStyles } from '@reusable-ui/styles';

const styles = useMergedStyles(
    // Static style:
    { color: 'red', fontSize: '16px' },
    
    // Conditional style:
    isPressed && { filter: 'brightness(0.5)' },
    
    // Deeply nested structure:
    [{ backgroundColor: 'blue' }, isTransparent && { opacity: 0.5 }]
);

// Result: { color: 'red', fontSize: '16px', filter: 'brightness(0.5)', backgroundColor: 'blue', opacity: 0.5 }
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/styles** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/styles**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/styles efficiently merging and managing styles and class names for React apps!**  
Give it a ⭐ on GitHub if you find it useful!  
