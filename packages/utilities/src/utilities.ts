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

export const setRef = <TValue>(ref: React.Ref<TValue>|undefined, value: TValue|null): void => {
    if (ref) {
        if (typeof(ref) === 'function') {
            ref(value);
        }
        else {
            (ref as React.MutableRefObject<TValue|null>).current = value;
        } // if
    } // if
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
