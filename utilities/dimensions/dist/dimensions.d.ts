import { default as React } from 'react';
import type { CssCustomName, CssCustomSimpleRef, CssSelector } from '@cssfn/css-types';
export declare type ElementResizeCallback<TElement extends Element = Element> = (element: TElement, size: ResizeObserverSize) => void;
export declare const useElementResizeObserver: <TElement extends Element = Element>(elementRef: TElement | React.RefObject<TElement> | null, elementResizeCallback: ElementResizeCallback<TElement>, options?: ResizeObserverOptions) => void;
export declare type WindowResizeCallback = (size: ResizeObserverSize) => void;
export declare const useWindowResizeObserver: (windowResizeCallback: WindowResizeCallback, options?: ResizeObserverOptions) => void;
export interface CssSizeOptions extends ResizeObserverOptions {
    selector?: CssSelector;
    varInlineSize?: CssCustomName | CssCustomSimpleRef;
    varBlockSize?: CssCustomName | CssCustomSimpleRef;
}
export declare const useElementCssSize: <TElement extends Element = Element>(elementRef: TElement | React.RefObject<TElement> | null, options: CssSizeOptions) => void;
export declare const useWindowCssSize: (options: CssSizeOptions) => void;
export interface UseElementCssSizeProps<TElement extends Element = Element> extends CssSizeOptions {
    elementRef: TElement | React.RefObject<TElement> | null;
}
export declare const UseElementCssSize: <TElement extends Element = Element>(props: UseElementCssSizeProps<TElement>) => JSX.Element | null;
export interface UseWindowCssSizeProps extends CssSizeOptions {
}
export declare const UseWindowCssSize: (props: UseWindowCssSizeProps) => JSX.Element | null;
