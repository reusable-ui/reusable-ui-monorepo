// React:
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    type ExoticComponent,
    type PropsWithoutRef,
    type RefAttributes,
    type FragmentProps,
    
    
    
    // Utilities:
    isValidElement,
}                           from 'react'



// Utilities:

/**
 * Symbol used to identify React forward ref elements.
 * This is used to check if an element is a React forward ref element.
 */
const forwardRefType = Symbol.for('react.forward_ref');

/**
 * @deprecated - This utility is no longer used and will be removed in future versions.
 * Determines whether the given `node` is a React forward ref element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `node is ReactElement<PropsWithoutRef<TProps> & RefAttributes<TRef>, JSXElementConstructor<PropsWithoutRef<TProps> & RefAttributes<TRef>>>`.
 * 
 * @template TProps - The props type expected by the component element.
 * @template TRef - The ref type expected by the component element.
 * @param node - The React node to inspect.
 * @returns {node is node is ReactElement<PropsWithoutRef<TProps> & RefAttributes<TRef>, JSXElementConstructor<PropsWithoutRef<TProps> & RefAttributes<TRef>>>} `true` if the node is a React forward ref element, otherwise `false`.
 */
export const isForwardRefElement = <TProps extends unknown = unknown, TRef extends unknown = unknown>(node: ReactNode): node is ReactElement<PropsWithoutRef<TProps> & RefAttributes<TRef>, JSXElementConstructor<PropsWithoutRef<TProps> & RefAttributes<TRef>>> => {
    return (
        // Ensure the node is a valid React element:
        isValidElement(node)
        
        &&
        
        // Check if the node type is a React forward ref object:
        ((typeof node.type === 'object') && ((node.type as ExoticComponent)?.$$typeof === forwardRefType))
    );
};

/**
 * @deprecated - Use `isForwardRefElement` instead.
 */
export const isForwardRef = isForwardRefElement;



/**
 * Symbol used to identify React fragment elements.
 * This is used to check if an element is a React fragment element.
 */
const fragmentType = Symbol.for('react.fragment');

/**
 * Determines whether the given `node` is a React fragment element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ReactElement<FragmentProps, JSXElementConstructor<FragmentProps>>`.
 * 
 * @param node - The React node to inspect.
 * @returns {node is ReactElement<FragmentProps, JSXElementConstructor<FragmentProps>>} `true` if the node is a React fragment element, otherwise `false`.
 */
export const isFragmentElement = (node: ReactNode): node is ReactElement<FragmentProps, JSXElementConstructor<FragmentProps>> => {
    return (
        // Ensure the node is a valid React element:
        isValidElement(node)
        
        &&
        
        // Check if the node type is a React fragment object:
        ((typeof node.type === 'symbol') && (node.type === fragmentType))
    );
};

/**
 * @deprecated - Use `isFragmentElement` instead.
 */
export const isFragment = isFragmentElement;



/**
 * Determines whether the given `node` is a React component element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ReactElement<TProps, TConstructor>`.
 * 
 * @template TProps - The props type expected by the component element.
 * @template TConstructor - The component type constructor.
 * @param node - The React node to inspect.
 * @returns {node is ReactElement<TProps, TConstructor>} `true` if the node is a valid component element, otherwise `false`.
 */
export const isComponentElement = <TProps extends unknown = unknown, TConstructor extends JSXElementConstructor<TProps> = JSXElementConstructor<TProps>>(node: ReactNode): node is ReactElement<TProps, TConstructor> => {
    return (
        // Ensure the node is a valid React element:
        isValidElement(node)
        
        &&
        
        // Ensure the element is a functional or class component:
        (typeof node.type === 'function')
    );
};

/**
 * @deprecated - Use `isComponentElement` instead.
 */
export const isReusableUiComponent = isComponentElement;



/**
 * Determines whether the given `node` is a native DOM element (e.g., `<div>`, `<a>`, `<button>`).
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ReactElement<TProps, string>`.
 * 
 * @template TProps - The props type expected by the DOM element.
 * @param node - The React node to inspect.
 * @returns {node is ReactElement<TProps, string>} `true` if the node is a native DOM element, otherwise `false`.
 */
export const isDOMElement = <TProps extends unknown = unknown>(node: ReactNode): node is ReactElement<TProps, string> => {
    return (
        // Ensure the node is a valid React element:
        isValidElement(node)
        
        &&
        
        // Ensure the element is a DOM component:
        (typeof node.type === 'string')
    );
};



/**
 * Determines whether the given `node` is a renderable React node.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to exclude `undefined`, `null`, and `boolean`.
 * 
 * @param node - The React node to inspect.
 * @returns {node is Exclude<typeof node, undefined | null | boolean>} `true` if the node is renderable, otherwise `false`.
 */
export const isTruthyNode = (node: ReactNode): node is Exclude<typeof node, undefined | null | boolean> => {
    return (
        // Ensure the node is not undefined:
        (node !== undefined)
        
        &&
        
        // Ensure the node is not null:
        (node !== null)
        
        &&
        
        // Ensure the node is not a boolean:
        ((node !== true) && (node !== false))
    );
};

/**
 * Determines whether the given `node` is a non-renderable React node.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `undefined | null | boolean`.
 * 
 * @param node - The React node to inspect.
 * @returns {node is Extract<typeof node, undefined | null | boolean>} `true` if the node is non-renderable, otherwise `false`.
 */
export const isFalsyNode  = (node: ReactNode): node is Extract<typeof node, undefined | null | boolean> => {
    return (
        // Check if the node is undefined:
        (node === undefined)
        
        ||
        
        // Check if the node is null:
        (node === null)
        
        ||
        
        // Check if the node is a boolean:
        ((node === true) || (node === false))
    );
};
