import {
    type ReactNode,
    type RefObject,
    default as React,
    useRef,
} from 'react'
import {
    type Role,
    type Tag,
    type SemanticPriority,
    type SemanticProps,
    type ResolvedSemanticAttributes,
    useResolvedSemantics,
} from '../dist/index.js'
import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'



const defaultButtonSemanticPriority : SemanticPriority = [
    ['button', 'button'],
    ['link', 'a'],
];
const defaultButtonRole : Role | 'auto' = 'auto';
const defaultButtonTag  : Tag  | 'auto' = 'auto';



interface ButtonProps extends SemanticProps {
    children ?: ReactNode
    resultRef ?: RefObject<ResolvedSemanticAttributes | null>
}
const Button = (props: ButtonProps) => {
    const {
        semanticPriority = defaultButtonSemanticPriority,
        role             = defaultButtonRole,
        tag              = defaultButtonTag,
        resultRef,
        ...restProps
    } = props;
    
    const resolvedSemanticAttributes = useResolvedSemantics({
        semanticPriority,
        role,
        tag,
    });
    const {
        tag  : resolvedTag,
        role : resolvedRole,
    } = resolvedSemanticAttributes;
    if (resultRef) resultRef.current = resolvedSemanticAttributes;
    
    
    
    const DynamicTag : Tag = resolvedTag ?? 'div';
    return (
        <DynamicTag {...restProps} role={resolvedRole ?? undefined}>
            {props.children}
        </DynamicTag>
    );
}



describe('Resolved semantics rendering in <Button>', () => {
    test("no role or tag → renders as <button> without role", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('BUTTON');
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : 'button',
            isExpectedRole : true,
            isExpectedTag  : true,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("role=auto, tag='div' → renders as <div role='button'>", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button tag='div' resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).toHaveAttribute('role', 'button');
        expect(element.tagName).toBe('DIV');
        expect(resultRef.current).toMatchObject({
            role           : 'button',
            tag            : 'div',
            isExpectedRole : true,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("role=auto, tag=null → renders as <div role='button'>", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button tag={null} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).toHaveAttribute('role', 'button');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : 'button',
            tag            : null,
            isExpectedRole : true,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("role=auto, tag='a' → renders as <a> without role", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button tag='a' resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('A');
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : 'a',
            isExpectedRole : true,
            isExpectedTag  : true,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("role='link', tag=auto → renders as <a> without role", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button role='link' resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('A');
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : 'a',
            isExpectedRole : true,
            isExpectedTag  : true,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("role=auto, tag='span' → renders as <span role='button'>", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button tag='span' resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).toHaveAttribute('role', 'button');
        expect(element.tagName).toBe('SPAN');
        expect(resultRef.current).toMatchObject({
            role           : 'button',
            tag            : 'span',
            isExpectedRole : true,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("role='menuitem', tag=auto → renders as <div role='menuitem'>", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button role='menuitem' resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).toHaveAttribute('role', 'menuitem');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : 'menuitem',
            tag            : null,
            isExpectedRole : false,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("role='menuitem', tag='span' → renders as <span role='menuitem'>", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button role='menuitem' tag='span' resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).toHaveAttribute('role', 'menuitem');
        expect(element.tagName).toBe('SPAN');
        expect(resultRef.current).toMatchObject({
            role           : 'menuitem',
            tag            : 'span',
            isExpectedRole : false,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
});



describe('Semantic priority handling in <Button>', () => {
    test("semanticPriority = null → falls back to defaults", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={null} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : null,
            isExpectedRole : false,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("semanticPriority = false → treated as no semantic hint", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={false} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : null,
            isExpectedRole : false,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("semanticPriority = true → defaults apply", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={true} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : null,
            isExpectedRole : false,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("semanticPriority = [] → treated as no semantic hint", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={[]} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : null,
            isExpectedRole : false,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("semanticPriority = [null, false, true] → effectively empty, fallback to default", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={[null, false, true]} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : null,
            isExpectedRole : false,
            isExpectedTag  : false,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("semanticPriority = ['menuitem', 'null'] → applies 'menuitem'", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={['menuitem', null]} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).toHaveAttribute('role', 'menuitem');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : 'menuitem',
            tag            : null,
            isExpectedRole : true,
            isExpectedTag  : true,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("semanticPriority = ['menuitem', 'null'] → applies matched pair", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={['menuitem', null]} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).toHaveAttribute('role', 'menuitem');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : 'menuitem',
            tag            : null,
            isExpectedRole : true,
            isExpectedTag  : true,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("semanticPriority = [['menuitem', 'null'], ['link', 'a']] → applies matched pair", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={[['menuitem', null], ['link', 'a']]} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).toHaveAttribute('role', 'menuitem');
        expect(element.tagName).toBe('DIV'); // fallback tag
        expect(resultRef.current).toMatchObject({
            role           : 'menuitem',
            tag            : null,
            isExpectedRole : true,
            isExpectedTag  : true,
        } satisfies ResolvedSemanticAttributes);
    });
    
    test("semanticPriority = [['link', 'a'], ['menuitem', 'null']] → applies matched pair", () => {
        const { result: { current: resultRef } } = renderHook(() => useRef<ResolvedSemanticAttributes | null>(null));
        render(<Button semanticPriority={[['link', 'a'], ['menuitem', null]]} resultRef={resultRef}>click me</Button>);
        const element = screen.getByText('click me');
        expect(element).not.toHaveAttribute('role');
        expect(element.tagName).toBe('A');
        expect(resultRef.current).toMatchObject({
            role           : null,
            tag            : 'a',
            isExpectedRole : true,
            isExpectedTag  : true,
        } satisfies ResolvedSemanticAttributes);
    });
});
