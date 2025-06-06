# @reusable-ui/numbers 🔢  

A **lightweight JavaScript utility library** for precision handling, including **decimal formatting** and **value clamping**.  
Designed for **human-friendly number processing** in calculations, UI elements, and general numerical operations.

## ✨ Features
✔ **`decimalify`** → Cleans floating-point precision errors, limiting decimals to a readable format.  
✔ **`clamp`** → Restricts a number within a specified min/max boundary.  

## 📦 Installation
Install **@reusable-ui/numbers** via npm or yarn:

```sh
npm install @reusable-ui/numbers
# or
yarn add @reusable-ui/numbers
```

## 🔥 Usage

### 🔹 `decimalify(value: number): number`
Formats a number to **avoid floating-point precision issues**, limiting it to **up to 11 decimal places**.
```js
import { decimalify } from '@reusable-ui/numbers';

console.log(decimalify(0.1 * 0.2)); // 0.020000000000000004 => 0.02
console.log(decimalify(4.9 * 5.51)); // 26.999000000000002 => 26.999
```

### 🔹 `clamp(min: number, value: number, max: number): number`
Restricts a value within a **min-max boundary**.
```js
import { clamp } from '@reusable-ui/numbers';

console.log(clamp(5, 10, 20)); // 10 (value is within range)
console.log(clamp(5, 2, 20));  // 5 (value is below min)
console.log(clamp(5, 25, 20)); // 20 (value is above max)
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/numbers** is a **number-processing utility** within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/numbers**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/numbers streamlines precision handling for dynamic UI experiences.**  
Give it a ⭐ on GitHub if you find it useful!  
