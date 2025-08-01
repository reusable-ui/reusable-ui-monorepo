# @reusable-ui/styling-variants 📦  

A utility for extracting and filtering styling-related variant props consistently across React components.  
Designed to streamline styling prop forwarding in composite UIs — ensuring only relevant styling props are passed along.

## ✨ Features
✔ Extracts styling-related props like `size`, `theme`, `mild`, `outlined`, etc.
✔ Filters out undefined or foreign values for clean prop forwarding
✔ Ideal for composite components that delegate styling to nested UIs
✔ Integrates seamlessly with appearance, spacing, and styling systems

## 📦 Installation
Install **@reusable-ui/styling-variants** via npm or yarn:

```sh
npm install @reusable-ui/styling-variants
# or
yarn add @reusable-ui/styling-variants
```

## 🧩 Exported Hooks

### `useStylingVariants(props)`

Extracts all known styling-related variant props of the component and returns a filtered object suitable for forwarding.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useStylingVariants,
    StylingVariantsProps,
} from '@reusable-ui/styling-variants';
import { InputBase } from '@/components/InputBase';
import { DropdownList } from '@/components/DropdownList';

export interface InputWithAutocompleteProps extends StylingVariantsProps {
    // ...other props
}

/**
 * A component that forwards styling variants to a sibling UI.
 */
export const InputWithAutocomplete : FC<InputWithAutocompleteProps> = (props) => {
    // Extract all known styling-related variant props:
    const stylingVariants = useStylingVariants(props);
    
    return (
        <>
            {/* Primary UI: */}
            <InputBase {...props} />
            
            {/* Forward styling variant props to sibling component: */}
            <DropdownList {...stylingVariants} />
        </>
    );
};
```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/styling-variants** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/styling-variants**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/styling-variants build scalable, styling-aware UIs.**  
Give it a ⭐ on GitHub if you find it useful!  
