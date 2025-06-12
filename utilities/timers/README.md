# @reusable-ui/timers ⏳  

A lightweight **React utility** for handling **timing functions** in UI components.  
This package provides hooks like `useSetTimeout` and `useRequestAnimationFrame` to manage **precise delays, animations, and scheduled executions** in React.

## ✨ Features
✔ **Efficient handling of time-based functions in React**  
✔ **Supports both standard timeouts & animation-frame scheduling**  
✔ **Built-in cleanup to prevent memory leaks**  

## 📦 Installation
Install **@reusable-ui/timers** via npm or yarn:

```sh
npm install @reusable-ui/timers
# or
yarn add @reusable-ui/timers
```

## 🔁 Exported Hooks & Functions

### `useSetTimeout(): (delay: number) => ScheduledPromise<boolean>`
Provides a **promise-based timeout mechanism** that supports **manual abortion** and **automatic cleanup on unmount**.

```tsx
import { useSetTimeout } from '@reusable-ui/timers';

const ExampleComponent = () => {
    const setTimeoutAsync = useSetTimeout();
    
    useEffect(() => {
        const scheduledTask = setTimeoutAsync(500);
        
        scheduledTask.then((isCompleted) => {
            console.log(isCompleted ? 'Timeout completed!' : 'Aborted before completion');
        });
        
        return () => scheduledTask.abort(); // Cleanup on unmount
    }, []);
    
    return <div>Waiting for timeout...</div>;
};
```

### `useRequestAnimationFrame(): (frameCount?: number) => ScheduledPromise<DOMHighResTimeStamp | false>`
Executes animation-frame-based requests for **smooth rendering** and **precise frame tracking**.

```tsx
import { useRequestAnimationFrame } from '@reusable-ui/timers';

const AnimatedComponent = () => {
    const requestAnimationFrameAsync = useRequestAnimationFrame();
    
    useEffect(() => {
        const scheduledFrames = requestAnimationFrameAsync(5);
        
        scheduledFrames.then((timestamp) => {
            console.log(timestamp ? `Animation completed at ${timestamp}` : 'Animation aborted!');
        });
        
        return () => scheduledFrames.abort(); // Cleanup on unmount
    }, []);
    
    return <div>Animating...</div>;
};
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/timers** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/timers**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/timers makes handling time-based execution simple!**  
Give it a ⭐ on GitHub if you find it useful!  
