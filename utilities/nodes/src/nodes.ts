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
 * TypeScript will refine the type of `node` to `ReactElement<PropsWithoutRef<unknown> & RefAttributes<unknown>, JSXElementConstructor<PropsWithoutRef<unknown> & RefAttributes<unknown>>>`.
 *
 * @param node - The React node to inspect.
 * @returns {node is ReactElement<PropsWithoutRef<unknown> & RefAttributes<unknown>, JSXElementConstructor<PropsWithoutRef<unknown> & RefAttributes<unknown>>>} `true` if the node is a React forward ref element, otherwise `false`.
 */
export const isForwardRefElement = (node: ReactNode): node is ReactElement<PropsWithoutRef<unknown> & RefAttributes<unknown>, JSXElementConstructor<PropsWithoutRef<unknown> & RefAttributes<unknown>>> => {
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
 * Determines whether the given `node` is a Reusable UI element.
 *
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ReactElement<TProps, TConstructor>`.
 *
 * Any valid non-native React element is assumed to be a Reusable UI element.
 *
 * @param node - The React node to inspect.
 * @returns {node is ReactElement<TProps, TConstructor>} `true` if the node is a valid Reusable UI element, otherwise `false`.
 */
export const isReusableUiElement = <TProps extends unknown = unknown, TConstructor extends JSXElementConstructor<unknown> = JSXElementConstructor<unknown>>(node: ReactNode): node is ReactElement<TProps, TConstructor> => {
    return (
        // Ensure the node is a valid React element:
        isValidElement(node)
        
        &&
        
        // Exclude native HTML elements:
        (typeof node.type !== 'string')
        
        &&
        
        // Ensure it's not a React fragment:
        !isFragment(node)
        
        &&
        
        // Ensure it's not a React forward ref:
        !isForwardRef(node)
    );
};

/**
 * @deprecated - Use `isReusableUiElement` instead.
 */
export const isReusableUiComponent = isReusableUiElement;



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
