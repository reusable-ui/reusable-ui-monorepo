// react:
import {
    // react:
    default as React,
}                           from 'react'



// utilities:
export const isForwardRef = (node: React.ReactNode): node is React.ReactElement => {
    return (
        React.isValidElement(node)                                                          // JSX element
        &&
        (typeof(node.type) === 'object')                                                    // forwardRef
        &&
        ((node.type as React.ExoticComponent).$$typeof === Symbol.for('react.forward_ref')) // forwardRef
    );
};

export const isReusableUiComponent = <TProps = any, TConstructor extends React.JSXElementConstructor<any> = React.JSXElementConstructor<any>>(node: React.ReactNode): node is React.ReactElement<TProps, TConstructor> => {
    return (
        React.isValidElement(node)
        &&
        (typeof(node.type) !== 'string')
        &&
        !isForwardRef(node)
    );
};
