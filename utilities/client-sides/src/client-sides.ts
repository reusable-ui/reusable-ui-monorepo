// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // utilities:
    isForwardRef,
}                           from '@reusable-ui/nodes'           // a set of React node utility functions

// other libs:
import type {
    // types:
    To,
}                           from 'history'                      // a helper lib
import {
    // tests:
    isBrowser,
    isJsDom,
}                           from 'is-in-browser'



// utilities:
export const isClientSide : boolean = isBrowser || isJsDom;

export type JsxReactRouterLink = React.ReactElement<{
    // links:
    to            ?: To
    
    
    
    // components:
    passHref      ?: boolean
    linkComponent ?: React.ReactElement<any>
    
    
    
    // children:
    children      ?: React.ReactNode
}>
export const isReactRouterLink = (node: React.ReactNode): node is JsxReactRouterLink => {
    return (
        isForwardRef(node) // JSX element
        &&
        !!node.props.to    // one of ReactRouter prop
    );
};

export type JsxNextLink = React.ReactElement<{
    // links:
    href          ?: To
    
    
    
    // components:
    passHref      ?: boolean
    
    
    
    // children:
    children      ?: React.ReactNode
}>
export const isNextLink = (node: React.ReactNode): node is JsxNextLink => {
    return (
        isForwardRef(node) // JSX element
        &&
        !!node.props.href  // one of NextLink prop
    );
};

export type JsxClientSideLink = JsxReactRouterLink & JsxNextLink
export const isClientSideLink = (node: React.ReactNode): node is JsxClientSideLink => {
    return (
        isReactRouterLink(node)
        ||
        isNextLink(node)
    );
};
