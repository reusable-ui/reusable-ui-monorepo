// react:
import { 
// react:
default as React, } from 'react';
// utilities:
export const isTypeOf = (element, funcComponent) => {
    return (React.isValidElement(element)
        &&
            ((element.type === funcComponent)
                ||
                    ((typeof (element.type) === 'function')
                        &&
                            element.type.prototype
                        &&
                            funcComponent.prototype
                        &&
                            ((element.type.prototype === funcComponent.prototype)
                                ||
                                    (element.type.prototype instanceof funcComponent)))));
};
export const setRef = (ref, value) => {
    if (ref) {
        if (typeof (ref) === 'function') {
            ref(value);
        }
        else {
            ref.current = value;
        } // if
    } // if
};
const isSingleValue = (expression) => (typeof (expression) === 'string') || (Array.isArray(expression) && (expression.length === 1));
export const parseNumber = (expression) => {
    if (typeof (expression) === 'number') {
        if (isNaN(expression))
            return null;
        return expression;
    } // if
    if (!expression)
        return null;
    if (!isSingleValue(expression))
        return null;
    const result = Number.parseFloat(expression);
    if (isNaN(result))
        return null;
    return result;
};
