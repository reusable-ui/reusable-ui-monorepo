import {
    isReusableUiElement,
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
    expect(isReusableUiElement(<NormalComponent />)).toBe(true);
    
    
    
    // TypeScript type guard test:
    const anyElement = NormalComponent as unknown as ReactNode;
    if (isReusableUiElement(anyElement)) {
        // @ts-ignore
        const test =
            anyElement satisfies ReactElement<unknown, JSXElementConstructor<unknown>>;
    } // if
});

test('should return false for native HTML elements', () => {
    expect(isReusableUiElement(<div />)).toBe(false);
    expect(isReusableUiElement(<input type='text' aria-label='Name' />)).toBe(false);
    expect(isReusableUiElement(<button type='button' aria-label='Button' />)).toBe(false);
});

test('should return false for forwardRef element', () => {
    const ForwardRefComponent = React.forwardRef<HTMLInputElement | null>((props, ref) => <input {...props} ref={ref} />);
    expect(isReusableUiElement(<ForwardRefComponent />)).toBe(false);
});

test('should return false for React Fragment element', () => {
    expect(isReusableUiElement(<></>)).toBe(false);
});

test('should return false for null, undefined, and boolean values', () => {
    expect(isReusableUiElement(null)).toBe(false);
    expect(isReusableUiElement(undefined)).toBe(false);
    expect(isReusableUiElement(true)).toBe(false);
    expect(isReusableUiElement(false)).toBe(false);
});
