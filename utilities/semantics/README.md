# @reusable-ui/semantics 🧠  

A lightweight, type-safe utility for managing **semantic tag/role resolution** in reusable React components.  
This package provides tools like `useResolvedSemanticAttributes()` to determine the correct HTML tag and ARIA role — supporting both **accessibility best practices** and **developer-friendly abstractions**.

## ✨ Features
✔ Declarative semantic resolution based on priority hints  
✔ Smart role-tag pairing with accessibility in mind  
✔ Eliminates redundant roles when tags imply semantics  
✔ Uses lazy evaluation for efficient runtime behavior  

## 📦 Installation
Install **@reusable-ui/semantics** via npm or yarn:

```sh
npm install @reusable-ui/semantics
# or
yarn add @reusable-ui/semantics
```

## 🔁 Exported Hooks & Functions

### `useResolvedSemanticAttributes(props, [options])`
Resolves the correct semantic `role` and `tag` for a component based on input preferences and prioritized expectations. Handles fallback logic, lazy evaluation, and implicit role removal (e.g. `<a role='link'>` ➝ `<a>`).

```tsx
import { useResolvedSemanticAttributes, SemanticPriority, Role, Tag, SemanticProps } from '@reusable-ui/semantics';

const defaultButtonSemanticPriority: SemanticPriority = [
  ['button', 'button'],
  ['link', 'a'],
];

const defaultButtonRole: Role | 'auto' = 'auto';
const defaultButtonTag:  Tag  | 'auto' = 'auto';

interface ButtonProps extends SemanticProps {
  children?: ReactNode;
}
const Button = (props: ButtonProps) => {
    const {
        semanticPriority = defaultButtonSemanticPriority,
        role             = defaultButtonRole,
        tag              = defaultButtonTag,
        ...restProps
    } = props;
    
    const { computedTag, computedRole } = useResolvedSemanticAttributes({
        semanticPriority,
        role,
        tag,
    });
    
    const DynamicTag: Tag = computedTag ?? 'div';
    return (
        <DynamicTag {...restProps} role={computedRole ?? undefined}>
            {props.children}
        </DynamicTag>
    );
};
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/semantics** is a core logic module within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/semantics**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/semantics helps your components speak fluent HTML — smart, accessible, and intention-aware.**  
Give it a ⭐ on GitHub if you find it useful!  
