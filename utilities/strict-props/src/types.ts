// Types:
import {
    type ForbiddenProps,
}                           from './internal-types.js'



/**
 * Prevents forgotten or foreign props from leaking into base components.
 * Any disallowed props are flagged as errors at development/compile time,
 * making them easy to identify and remove.
 * 
 * @template TRestProps The remaining properties being validated.
 * @template TBaseProps The base props type (e.g. HTML attributes).
 * @template TExtraProps Any additional allowed props.
 * 
 * @example
 * ```tsx
 * import type { StrictProps } from '@reusable-ui/strict-props'
 * 
 * export interface ProductComponentProps extends React.HTMLAttributes<HTMLDivElement> {
 *     header ?: string
 *     text   ?: string
 *     price  ?: number
 * }
 * 
 * export const ProductComponent = (props: ProductComponentProps) => {
 *     const {
 *         header = 'Default Product Header',
 *         text   = 'Default Product Description',
 *         // price  = 0, // ⚠️ Simulate a forgotten prop that should have been removed.
 *         
 *         ...restDivProps
 *     } = props;
 *     
 *     
 *     
 *     return (
 *         <div
 *             // ✅ `StrictProps` ensures that if `price` is included in `restDivProps`,
 *             // it triggers a TypeScript error because `price` is not a valid prop for <div>.
 *             // 
 *             // 🚫 Error:
 *             // Types of property 'price' are incompatible.
 *             //     Type 'number | undefined' is not assignable to type 'never'.
 *             //         Type 'undefined' is not assignable to type 'never'.
 *             {...restDivProps satisfies StrictProps<
 *                 typeof restDivProps,
 *                 React.HTMLAttributes<HTMLDivElement>,
 *                 { suppressHydrationWarning ?: boolean } // Optional: example of extra whitelisted prop that is valid for <div>.
 *             >}
 *         >
 *             <h1>{header}</h1>
 *             <p>{text}</p>
 *         </div>
 *     );
 * }
 * 
 * export interface FeaturedProductComponentProps extends ProductComponentProps {
 *     featured ?: boolean
 *     stars    ?: number
 * }
 * 
 * export const FeaturedProductComponent = (props: FeaturedProductComponentProps) => {
 *     const {
 *         featured = false,
 *         // stars    = 0, // ⚠️ Simulate a forgotten prop that should have been removed.
 *         
 *         ...restProductProps
 *     } = props;
 *     
 *     
 *     
 *     return (
 *         <ProductComponent
 *             // ✅ `StrictProps` ensures that if `stars` is included in `restProductProps`,
 *             // it triggers a TypeScript error because `stars` is not a valid prop for <ProductComponent>.
 *             // 
 *             // 🚫 Error:
 *             // Types of property 'stars' are incompatible.
 *             //     Type 'number | undefined' is not assignable to type 'never'.
 *             //         Type 'undefined' is not assignable to type 'never'.
 *             {...restProductProps satisfies StrictProps<
 *                 typeof restProductProps,
 *                 ProductComponentProps
 *             >}
 *         />
 *     );
 * }
 * ```
 */
export type StrictProps<
    TRestProps extends TBaseProps,
    TBaseProps extends {},
    TExtraProps extends {} = {}
> =
    // 🔍 Check for foreign props:
    // - Use `Required` so even **optional props** are considered.
    // - Omit all keys from the base + extra sets.
    // - If nothing remains, there are no foreign props (pass).
    {} extends Omit<Required<TRestProps>, keyof TBaseProps | keyof TExtraProps>
    
    // ✅ Pass → All props are valid, return the original props type:
    ? TRestProps
    
    // 🚫 Fail → Foreign props remain:
    // - Flag them as `never` via `ForbiddenProps`,
    //   so they **show up** in the type error and are easy to identify and remove.
    : ForbiddenProps<TRestProps, TBaseProps, TExtraProps>
