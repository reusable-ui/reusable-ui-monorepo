import { default as React } from 'react';
export declare const isTypeOf: <TProps>(element: React.ReactNode, funcComponent: React.JSXElementConstructor<TProps>) => element is React.ReactElement<TProps, React.JSXElementConstructor<TProps>>;
export declare const setRef: <TValue>(ref: React.Ref<TValue> | undefined, value: TValue | null) => void;
export declare const parseNumber: (expression: number | string | ReadonlyArray<string> | null | undefined) => number | null;
