# @reusable-ui/strict-props 🛡️

Prevents forgotten or foreign props from leaking into base components.
Any disallowed props are flagged as errors at development/compile time,
making them easy to identify and remove.

## ✨ Features
✔ **Zero runtime overhead** — purely compile-time enforcement.  
✔ **Clear type errors** — unintended props are flagged as errors, making them easy to spot and remove.  
✔ **Flexible contracts** — works with any base props and supports extra whitelisted props.  

## 📦 Installation
Install **@reusable-ui/strict-props** via npm or yarn:

```sh
npm install @reusable-ui/strict-props --save-dev
# or
yarn add @reusable-ui/strict-props --dev
```

## 🚀 Usage Example

Use `StrictProps` to ensure that only valid props are passed to a base component.
Forgotten or foreign props are flagged as errors at development/compile time.

```tsx
import type { StrictProps } from '@reusable-ui/strict-props'

export interface ProductComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    header ?: string
    text   ?: string
    price  ?: number
}

export const ProductComponent = (props: ProductComponentProps) => {
    const {
        header = 'Default Product Header',
        text   = 'Default Product Description',
        // price  = 0, // ⚠️ Simulate a forgotten prop that should have been removed.
        
        ...restDivProps
    } = props;
    
    
    
    return (
        <div
            // ✅ `StrictProps` ensures that if `price` is included in `restDivProps`,
            // it triggers a TypeScript error because `price` is not a valid prop for <div>.
            // 
            // 🚫 Error:
            // Types of property 'price' are incompatible.
            //     Type 'number | undefined' is not assignable to type 'never'.
            //         Type 'undefined' is not assignable to type 'never'.
            {...restDivProps satisfies StrictProps<
                typeof restDivProps,
                React.HTMLAttributes<HTMLDivElement>,
                { suppressHydrationWarning ?: boolean } // Optional: example of extra whitelisted prop that is valid for <div>.
            >}
        >
            <h1>{header}</h1>
            <p>{text}</p>
        </div>
    );
}

export interface FeaturedProductComponentProps extends ProductComponentProps {
    featured ?: boolean
    stars    ?: number
}

export const FeaturedProductComponent = (props: FeaturedProductComponentProps) => {
    const {
        featured = false,
        // stars    = 0, // ⚠️ Simulate a forgotten prop that should have been removed.
        
        ...restProductProps
    } = props;
    
    
    
    return (
        <ProductComponent
            // ✅ `StrictProps` ensures that if `stars` is included in `restProductProps`,
            // it triggers a TypeScript error because `stars` is not a valid prop for <ProductComponent>.
            // 
            // 🚫 Error:
            // Types of property 'stars' are incompatible.
            //     Type 'number | undefined' is not assignable to type 'never'.
            //         Type 'undefined' is not assignable to type 'never'.
            {...restProductProps satisfies StrictProps<
                typeof restProductProps,
                ProductComponentProps
            >}
        />
    );
}
```

### 🔎 What Happens
If `price` sneaks into `restDivProps`, TypeScript flags it immediately:

```
Types of property 'price' are incompatible.
    Type 'number | undefined' is not assignable to type 'never'.
        Type 'undefined' is not assignable to type 'never'.
```

The same happens if `stars` sneaks into `restProductProps`:

```
Types of property 'stars' are incompatible.
    Type 'number | undefined' is not assignable to type 'never'.
        Type 'undefined' is not assignable to type 'never'.
```

These errors clearly indicate that `price` and `stars` are invalid props for their respective base components,
making it easy to identify and remove them.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/strict-props** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/strict-props**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/strict-props prevents forgotten or foreign props from leaking into base components.**  
Give it a ⭐ on GitHub if you find it useful!  
