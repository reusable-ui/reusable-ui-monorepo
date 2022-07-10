// react:
import {
    // react:
    default as React,
}                           from 'react'



// utilities:

export const isTypeOf = <TProps>(element: React.ReactNode, funcComponent: React.JSXElementConstructor<TProps>): element is React.ReactElement<TProps, React.JSXElementConstructor<TProps>> => {
    return (
        React.isValidElement<TProps>(element)
        &&
        (
            (element.type === funcComponent)
            ||
            (
                (typeof(element.type) === 'function')
                &&
                element.type.prototype
                &&
                funcComponent.prototype
                &&
                (
                    (element.type.prototype === funcComponent.prototype)
                    ||
                    (element.type.prototype instanceof funcComponent)
                )
            )
        )
    );
};

export const isForwardRef = (node: React.ReactNode): node is React.ReactElement => {
    return (
        React.isValidElement(node)                                                          // JSX element
        &&
        (typeof(node.type) === 'object')                                                    // forwardRef
        &&
        ((node.type as React.ExoticComponent).$$typeof === Symbol.for('react.forward_ref')) // forwardRef
    );
};

export const isReusableUiComponent = (node: React.ReactNode): node is React.ReactElement => {
    return (
        React.isValidElement(node)
        &&
        !isForwardRef(node)
    );
};

const isSingleValue = (expression: string|ReadonlyArray<string>): expression is string => (typeof(expression) === 'string') || (Array.isArray(expression) && (expression.length === 1));
export const parseNumber = (expression: number|string|ReadonlyArray<string>|null|undefined): number|null => {
    if (typeof(expression) === 'number') {
        if (isNaN(expression)) return null;
        return expression;
    } // if
    if (!expression) return null;
    
    
    
    if (!isSingleValue(expression)) return null;
    
    
    
    const result = Number.parseFloat(expression);
    if (isNaN(result)) return null;
    return result;
};
