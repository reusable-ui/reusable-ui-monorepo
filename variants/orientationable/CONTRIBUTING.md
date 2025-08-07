# Contributing to @reusable-ui/orientationable ✍️  

Thank you for your interest in contributing! 🚀  
While this package is **deprecated**, we still welcome contributions that improve documentation, support migration, or maintain legacy compatibility.  

## 🛠️ How to Contribute  

### 1️⃣ **Report Issues**  
- Found a bug in legacy usage or migration path? Open an issue [here](https://github.com/reusable-ui/reusable-ui-monorepo/issues).  
- Provide **clear reproduction steps**, expected behavior, and whether it affects migration to the new variants.  

### 2️⃣ **Submit a Pull Request (PR)**  
- **Fork the repository** and clone it locally.  
- Create a new **branch** (`fix-legacy-support` or `docs-migration-guide`).  
- Follow our **code style and linting rules**.  
- Focus on **non-breaking changes**, documentation improvements, or migration helpers.  
- Open a PR with a meaningful title and summary!  

### 3️⃣ **Improve Documentation**  
Even if you're not coding, you can help by:  
- Clarifying migration steps in the README.  
- Fixing typos or enhancing legacy usage examples.  
- Adding notes for developers transitioning to `variants/orientation-variant` and `variants/flow-direction-variant`.  

## 🔥 Code Guidelines  
- Use TypeScript for consistency.  
- Follow **ESLint** rules defined in the repository.  
- Avoid introducing new features — focus on stability and clarity.  

## 📦 Setting Up Locally  
```sh
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd variants/orientationable
npm install
npm run dev
