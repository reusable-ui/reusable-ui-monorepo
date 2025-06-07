import {
    isReusableUiComponent,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    
    
    
    // React:
    default as React,
} from 'react'



test('should return true for normal functional component', () => {
    const NormalComponent = () => <div>Hello</div>;
    expect(isReusableUiComponent(<NormalComponent />)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyComponent = NormalComponent as unknown as ReactNode;
    if (isReusableUiComponent(anyComponent)) {
        // @ts-ignore
        const test =
            anyComponent satisfies ReactElement<unknown, JSXElementConstructor<unknown>>;
    } // if
});

test('should return false for native HTML elements', () => {
    expect(isReusableUiComponent(<div />)).toBe(false);
    expect(isReusableUiComponent(<input type='text' aria-label='Name' />)).toBe(false);
    expect(isReusableUiComponent(<button type='button' aria-label='Button' />)).toBe(false);
});

test('should return false for forwardRef component', () => {
    const ForwardRefComponent = React.forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isReusableUiComponent(<ForwardRefComponent />)).toBe(false);
});

test('should return false for React Fragment', () => {
    expect(isReusableUiComponent(<></>)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isReusableUiComponent(null)).toBe(false);
    expect(isReusableUiComponent(undefined)).toBe(false);
    expect(isReusableUiComponent(true)).toBe(false);
    expect(isReusableUiComponent(false)).toBe(false);
});
