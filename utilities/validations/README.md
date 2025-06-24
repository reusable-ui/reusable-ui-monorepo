# @reusable-ui/validations ✅  

A lightweight, type-safe utility for managing **cascading validation and accessibility state** in reusable React components.  
Includes hooks like `useResolvedValidationState()` for resolving `enableValidation` and `isValid` from **local props and ancestor context**, ensuring consistent behavior across hierarchies.

## ✨ Features
✔ Declarative resolution of validation state (`enableValidation`, `isValid`)  
✔ Optional cascading from parent providers with fine-grained control  
✔ Smart defaults for standalone usage  
✔ Lightweight, composable, and memoized for performance  

## 📦 Installation
Install **@reusable-ui/validations** via npm or yarn:

```sh
npm install @reusable-ui/validations
# or
yarn add @reusable-ui/validations
```

## 🔁 Exported Hooks & Components

### `useResolvedValidationState(props)`
Resolves the final validation state of a component by combining:

- Local props (`enableValidation`, `isValid`)
- Cascading control (`cascadeValidation`)
- Ancestor context (from `<ValidationProvider>`)

```tsx
import {
    type ValidationProps,
    useResolvedValidationState,
    ValidationProvider,
} from '@reusable-ui/validations';

interface PasswordFieldProps extends ValidationProps {
    minLength ?: number;
    maxLength ?: number;
}

const PasswordField = (props: PasswordFieldProps) => {
    const {
        enableValidation,
        isValid,
        
        cascadeValidation,
        
        minLength = 5,
        maxLength = 20,
    } = props;

    const {
        enableValidation : computedEnableValidation,
        isValid          : preComputedIsValid,
    } = useResolvedValidationState({
        enableValidation,
        isValid,
        
        cascadeValidation,
    });

    const [value, setValue] = useState('');
    const computedIsValid = (
        preComputedIsValid !== 'auto'
        ? preComputedIsValid
        : ((value.length >= minLength) && (value.length <= maxLength))
    );

    return (
        <input
            type='password'
            value={value}
            onChange={({ target: { value }}) => setValue(value)}
            
            formNoValidate={!computedEnableValidation}
            aria-invalid={computedIsValid === false}
        />
    );
};
```

### `ValidationProvider`
Wraps a portion of your app to provide shared `enableValidation` and `isValid` values to all descendants.

```tsx
<ValidationProvider enableValidation={false}>
    <ToggleButton /> {/* The child will inherit `enableValidation = false` */}
</ValidationProvider>
```

## 🧩 Use Cases

- Compose form controls that inherit validation or accessibility state from parents
- Short-circuit or force validation across subtree regions
- Enable nested overrides with opt-out cascading

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/validations** is part of the modular [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/validations**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/validations lets your components adapt, inherit, and respond — predictably and accessibly.**  
Give it a ⭐ on GitHub if you find it useful!  
