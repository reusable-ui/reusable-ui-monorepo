import { default as React } from 'react';
import type { SingleOrArray } from '@cssfn/types';
/**
 * Contains responsive props.
 */
export interface Responsive<TFallback> {
    currentFallback: TFallback;
}
/**
 * A react context for responsive stuff.
 */
export declare const ResponsiveContext: React.Context<Responsive<any>>;
export declare const useResponsiveCurrentFallback: <TFallback>() => TFallback;
export declare const isOverflowed: (element: Element) => boolean;
export interface ClientAreaResizeObserverOptions {
    horzResponsive?: boolean;
    vertResponsive?: boolean;
}
export declare const useClientAreaResizeObserver: (resizingElementRefs: SingleOrArray<React.RefObject<Element> | null>, clientAreaResizeCallback: () => void, options?: ClientAreaResizeObserverOptions) => void;
export declare type Fallbacks<TFallback> = [TFallback, ...TFallback[]];
export interface ResponsiveProviderProps<TFallback> extends ClientAreaResizeObserverOptions {
    fallbacks: Fallbacks<TFallback>;
    useTransition?: boolean;
    children: React.ReactNode | ((fallback: TFallback) => React.ReactNode);
}
declare const ResponsiveProvider: <TFallback>(props: ResponsiveProviderProps<TFallback>) => JSX.Element;
export { ResponsiveProvider, ResponsiveProvider as default, };
