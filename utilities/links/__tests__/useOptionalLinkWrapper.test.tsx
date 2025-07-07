import {
    // Types:
    type ReactNode,
    type Ref,
    type DOMAttributes,
    type PropsWithChildren,
    type FunctionComponent,
    
    
    
    // React:
    default as React,
    
    
    
    // Hooks:
    useRef,
} from 'react'
import {
    type Role,
    type Tag,
    type SemanticPriority,
    type SemanticProps,
    useResolvedSemanticAttributes,
} from '@reusable-ui/semantics'
import {
    type AccessibilityProps,
    useResolvedAccessibilityState,
} from '@reusable-ui/accessibilities'
import {
    useOptionalLinkWrapper,
} from '../dist/index.js'
import { type NextLinkCompatProps, NextLinkCompat } from '@reusable-ui/next-link-compat'
import { type RouterLinkCompatProps, RouterLinkCompat, RouterNavLinkCompatProps, RouterNavLinkCompat } from '@reusable-ui/router-link-compat'
import {
    createRoutesStub,
} from 'react-router'
import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'



//#region Mock Components

const fallbackPriority  : SemanticPriority = [
    ['button', 'button'],
    ['link', 'a'],
];
const linkFirstPriority : SemanticPriority = [
    ['link', 'a'],
    ['button', 'button'],
];

const fallbackRole : Role | 'auto' = 'auto';
const fallbackTag  : Tag  | 'auto' = 'auto';

interface ButtonProps extends SemanticProps, AccessibilityProps, DOMAttributes<HTMLButtonElement> {
    ref      ?: Ref<HTMLButtonElement | null>
    children ?: ReactNode
}
const Button = (props: ButtonProps) => {
    const {
        semanticPriority = (
            'href' in props
            ? linkFirstPriority // If    `href` provided => prefer link over button.
            : fallbackPriority  // If no `href` provided => prefer button over link.
        ),
        role = fallbackRole,
        tag  = fallbackTag,
        
        enabled,
        readOnly,
        active,
        cascadeEnabled,
        cascadeReadOnly,
        cascadeActive,
        
        ...restProps
    } = props;
    
    const {
        tag  : resolvedTag,
        role : resolvedRole,
    } = useResolvedSemanticAttributes({
        semanticPriority,
        role,
        tag,
    });
    
    const {
        enabled  : isEnabled,
        readOnly : isReadOnly,
        active   : isActive,
    } = useResolvedAccessibilityState({
        enabled,
        readOnly,
        active,
        
        cascadeEnabled,
        cascadeReadOnly,
        cascadeActive,
    });
    
    
    
    const DynamicTag : Tag = resolvedTag ?? 'span';
    return (
        <DynamicTag
            {...(restProps as {})}
            
            role={resolvedRole ?? undefined}
            
            // @ts-ignore
            href={(props as any).href ?? undefined}
            
            data-testid='interactive-element'
            
            data-disabled = {!isEnabled || undefined}
            data-readonly = {isReadOnly || undefined}
            data-active   = {isActive   || undefined}
        >
            {props.children}
        </DynamicTag>
    );
};



interface MockSmartButtonProps extends ButtonProps {
}
const MockSmartButton = (props: MockSmartButtonProps) => {
    const {
        semanticPriority = (
            'href' in props
            ? linkFirstPriority // If    `href` provided => prefer link over button.
            : fallbackPriority  // If no `href` provided => prefer button over link.
        ),
        role = fallbackRole,
        tag  = fallbackTag,
    } = props;
    
    const {
        tag  : resolvedTag,
        role : resolvedRole,
    } = useResolvedSemanticAttributes({
        semanticPriority,
        role,
        tag,
    });
    
    return useOptionalLinkWrapper(
        <Button {...props} tag={resolvedTag} role={resolvedRole} />
    );
};



const MockNextLinkCompat = (props: NextLinkCompatProps) => {
    return (
        <div
            data-mock='NextLinkCompat'
            data-anchorless={String(props.anchorless ?? false)}
            data-passhref={String(props.passHref ?? false)}
        >
            <NextLinkCompat {...props} />
        </div>
    )
};
const MockRouterLinkCompat = (props: RouterLinkCompatProps) => {
    return (
        <div
            data-mock='RouterLinkCompat'
            data-anchorless={String(props.anchorless ?? false)}
            data-passhref={String(props.passHref ?? false)}
        >
            <RouterLinkCompat {...props} />
        </div>
    )
};
const MockRouterNavLinkCompat = (props: RouterNavLinkCompatProps) => {
    return (
        <div
            data-mock='RouterNavLinkCompat'
            data-anchorless={String(props.anchorless ?? false)}
            data-passhref={String(props.passHref ?? false)}
        >
            <RouterNavLinkCompat {...props} />
        </div>
    )
};



const MockRouterContext = (props: PropsWithChildren<{}>) => {
    const Stub = createRoutesStub([
        {
            path: '/',
            Component: function HomePage() {
                return (
                    <main data-testid='home-page'>
                        {props.children}
                    </main>
                );
            },
        },
        {
            path: '/about',
            Component: function AboutPage() {
                return (
                    <main data-testid='about-page'>
                        this is me
                    </main>
                );
            },
        },
    ]);
    
    return(
        <Stub initialEntries={['/']} />
    );
};
//#endregion Mock Components



// Tests:

interface SmartButtonTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title        : string
    
    /**
     * The role of `<SmartButton>`.
     */
    role         : 'auto' | 'button' | 'link'
    
    enabled      : boolean,
    
    /**
     * The mix of `<Link>` and other structures to nest inside `<SmartButton>`.
     */
    children     : ReactNode
    
    /**
     * An optional route context in order the `<Link>` component to work correctly.
     */
    RouteContext : FunctionComponent<PropsWithChildren<{}>> | null
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected tag name of the rendered `<SmartButton>` element.
     */
    expectTag    : 'BUTTON' | 'A'
    
    /**
     * The expected `href` value on the interactive element (if forwarded).
     */
    expectHref   : '/about' | 'NO_HREF_PASSED'
    
    /**
     * The expected JSX structure.
     */
    expectJSX    : ReactNode
}



describe('useOptionalLinkWrapper - semantic composition + link behavior', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | null>(null)).result.current;
    
    test.each<SmartButtonTestCase>([
        // Tests without <Link> elements:
        {
            // Tests:
            title        : 'renders plain children without any <Link>',
            role         : 'auto',
            enabled      : true,
            children     : (
                'click me'
            ),
            RouteContext : null,
            
            
            
            // Expects:
            expectTag    : 'BUTTON',
            expectHref   : 'NO_HREF_PASSED',
            expectJSX    : (
                <button data-testid='interactive-element'>
                    click me
                </button>
            ),
        },
        {
            // Tests:
            title        : 'renders complex nested structure without any <Link>',
            role         : 'auto',
            enabled      : true,
            children     : [
                <span key={1}>boo</span>,
                <span key={2}>okay</span>,
                'click me',
                <span key={4}>wow</span>,
                <span key={5}>
                    yeah
                    <em>super</em>
                    <strong>complex</strong>
                </span>,
                <span key={6}>foo</span>,
                <strong key={7}>
                    hell
                    <span>sick</span>
                </strong>,
            ],
            RouteContext : null,
            
            
            
            // Expects:
            expectTag    : 'BUTTON',
            expectHref   : 'NO_HREF_PASSED',
            expectJSX    : (
                <button data-testid='interactive-element'>
                    <span>boo</span>
                    <span>okay</span>
                    click me
                    <span>wow</span>
                    <span>
                        yeah
                        <em>super</em>
                        <strong>complex</strong>
                    </span>
                    <span>foo</span>
                    <strong>
                        hell
                        <span>sick</span>
                    </strong>
                </button>
            ),
        },
        
        
        
        // Tests with Next.js <Link>:
        {
            // Tests:
            title        : 'renders with nested Next.js <Link> (anchorless, role="auto")',
            role         : 'auto',
            enabled      : true,
            children     : (
                <MockNextLinkCompat href='/about'>
                    click me
                </MockNextLinkCompat>
            ),
            RouteContext : null,
            
            
            
            // Expects:
            expectTag    : 'BUTTON',
            expectHref   : 'NO_HREF_PASSED',
            expectJSX    : (
                <div data-mock='NextLinkCompat' data-anchorless='true' data-passhref='false'>
                    <button data-testid='interactive-element'>
                        click me
                    </button>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders with Next.js <Link> and explicit role="link"',
            role         : 'link',
            enabled      : true,
            children     : (
                <MockNextLinkCompat href='/about'>
                    click me
                </MockNextLinkCompat>
            ),
            RouteContext : null,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='NextLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        click me
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders deeply nested structure with a single Next.js <Link> + role="link"',
            role         : 'link',
            enabled      : true,
            children     : [
                <span key={1}>boo</span>,
                <MockNextLinkCompat key={2} href='/about'>
                    <span>okay</span>
                    click me
                    <span>wow</span>
                    <span>
                        yeah
                        <em>super</em>
                        <strong>complex</strong>
                    </span>
                </MockNextLinkCompat>,
                <span key={3}>foo</span>,
                <strong key={4}>
                    hell
                    <span>sick</span>
                </strong>,
            ],
            RouteContext : null,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='NextLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        <span>boo</span>
                        <span>okay</span>
                        click me
                        <span>wow</span>
                        <span>
                            yeah
                            <em>super</em>
                            <strong>complex</strong>
                        </span>
                        <span>foo</span>
                        <strong>
                            hell
                            <span>sick</span>
                        </strong>
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders multiple <Link> children but uses only the first valid Next.js <Link> + role="link"',
            role         : 'link',
            enabled      : true,
            children     : [
                <span key={1}>boo</span>,
                <MockNextLinkCompat key={2} href='/about'>
                    <span>okay</span>
                    click me
                    <span>wow</span>
                    <span>
                        yeah
                        <em>super</em>
                        <strong>complex</strong>
                    </span>
                </MockNextLinkCompat>,
                <span key={3}>foo</span>,
                <MockNextLinkCompat key={4} href='/invalid'>
                    invalid
                </MockNextLinkCompat>,
                <strong key={5}>
                    hell
                    <span>sick</span>
                </strong>,
                <MockNextLinkCompat key={6} href='/error'>
                    error
                </MockNextLinkCompat>,
            ],
            RouteContext : null,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='NextLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        <span>boo</span>
                        <span>okay</span>
                        click me
                        <span>wow</span>
                        <span>
                            yeah
                            <em>super</em>
                            <strong>complex</strong>
                        </span>
                        <span>foo</span>
                        <div data-mock='NextLinkCompat' data-anchorless='false' data-passhref='false'>
                            <a href='/invalid'>
                                invalid
                            </a>
                        </div>
                        <strong>
                            hell
                            <span>sick</span>
                        </strong>
                        <div data-mock='NextLinkCompat' data-anchorless='false' data-passhref='false'>
                            <a href='/error'>
                                error
                            </a>
                        </div>
                    </a>
                </div>
            ),
        },
        
        
        
        // Tests with React Router <Link>:
        {
            // Tests:
            title        : 'renders with nested React Router <Link> (anchorless, role="auto")',
            role         : 'auto',
            enabled      : true,
            children     : (
                <MockRouterLinkCompat to='/about'>
                    click me
                </MockRouterLinkCompat>
            ),
            RouteContext : MockRouterContext,
            
            
            
            // Expects:
            expectTag    : 'BUTTON',
            expectHref   : 'NO_HREF_PASSED',
            expectJSX    : (
                <div data-mock='RouterLinkCompat' data-anchorless='true' data-passhref='false'>
                    <button data-testid='interactive-element'>
                        click me
                    </button>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders with React Router <Link> and explicit role="link"',
            role         : 'link',
            enabled      : true,
            children     : (
                <MockRouterLinkCompat to='/about'>
                    click me
                </MockRouterLinkCompat>
            ),
            RouteContext : MockRouterContext,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='RouterLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        click me
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders deeply nested structure with a single React Router <Link> + role="link"',
            role         : 'link',
            enabled      : true,
            children     : [
                <span key={1}>boo</span>,
                <MockRouterLinkCompat key={2} to='/about'>
                    <span>okay</span>
                    click me
                    <span>wow</span>
                    <span>
                        yeah
                        <em>super</em>
                        <strong>complex</strong>
                    </span>
                </MockRouterLinkCompat>,
                <span key={3}>foo</span>,
                <strong key={4}>
                    hell
                    <span>sick</span>
                </strong>,
            ],
            RouteContext : MockRouterContext,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='RouterLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        <span>boo</span>
                        <span>okay</span>
                        click me
                        <span>wow</span>
                        <span>
                            yeah
                            <em>super</em>
                            <strong>complex</strong>
                        </span>
                        <span>foo</span>
                        <strong>
                            hell
                            <span>sick</span>
                        </strong>
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders multiple <Link> children but uses only the first valid React Router <Link> + role="link"',
            role         : 'link',
            enabled      : true,
            children     : [
                <span key={1}>boo</span>,
                <MockRouterLinkCompat key={2} to='/about'>
                    <span>okay</span>
                    click me
                    <span>wow</span>
                    <span>
                        yeah
                        <em>super</em>
                        <strong>complex</strong>
                    </span>
                </MockRouterLinkCompat>,
                <span key={3}>foo</span>,
                <MockRouterLinkCompat key={4} to='/invalid'>
                    invalid
                </MockRouterLinkCompat>,
                <strong key={5}>
                    hell
                    <span>sick</span>
                </strong>,
                <MockRouterLinkCompat key={6} to='/error'>
                    error
                </MockRouterLinkCompat>,
            ],
            RouteContext : MockRouterContext,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='RouterLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        <span>boo</span>
                        <span>okay</span>
                        click me
                        <span>wow</span>
                        <span>
                            yeah
                            <em>super</em>
                            <strong>complex</strong>
                        </span>
                        <span>foo</span>
                        <div data-mock='RouterLinkCompat' data-anchorless='false' data-passhref='false'>
                            <a href='/invalid' data-discover='true'>
                                invalid
                            </a>
                        </div>
                        <strong>
                            hell
                            <span>sick</span>
                        </strong>
                        <div data-mock='RouterLinkCompat' data-anchorless='false' data-passhref='false'>
                            <a href='/error' data-discover='true'>
                                error
                            </a>
                        </div>
                    </a>
                </div>
            ),
        },
        
        
        
        // Tests with React Router <NavLink>:
        {
            // Tests:
            title        : 'renders with nested React Router <NavLink> (anchorless, role="auto")',
            role         : 'auto',
            enabled      : true,
            children     : (
                <MockRouterNavLinkCompat to='/about'>
                    click me
                </MockRouterNavLinkCompat>
            ),
            RouteContext : MockRouterContext,
            
            
            
            // Expects:
            expectTag    : 'BUTTON',
            expectHref   : 'NO_HREF_PASSED',
            expectJSX    : (
                <div data-mock='RouterNavLinkCompat' data-anchorless='true' data-passhref='false'>
                    <button data-testid='interactive-element'>
                        click me
                    </button>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders with React Router <NavLink> and explicit role="link"',
            role         : 'link',
            enabled      : true,
            children     : (
                <MockRouterNavLinkCompat to='/about'>
                    click me
                </MockRouterNavLinkCompat>
            ),
            RouteContext : MockRouterContext,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='RouterNavLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        click me
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders deeply nested structure with a single React Router <NavLink> + role="link"',
            role         : 'link',
            enabled      : true,
            children     : [
                <span key={1}>boo</span>,
                <MockRouterNavLinkCompat key={2} to='/about'>
                    <span>okay</span>
                    click me
                    <span>wow</span>
                    <span>
                        yeah
                        <em>super</em>
                        <strong>complex</strong>
                    </span>
                </MockRouterNavLinkCompat>,
                <span key={3}>foo</span>,
                <strong key={4}>
                    hell
                    <span>sick</span>
                </strong>,
            ],
            RouteContext : MockRouterContext,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='RouterNavLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        <span>boo</span>
                        <span>okay</span>
                        click me
                        <span>wow</span>
                        <span>
                            yeah
                            <em>super</em>
                            <strong>complex</strong>
                        </span>
                        <span>foo</span>
                        <strong>
                            hell
                            <span>sick</span>
                        </strong>
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title        : 'renders multiple <NavLink> children but uses only the first valid React Router <NavLink> + role="link"',
            role         : 'link',
            enabled      : true,
            children     : [
                <span key={1}>boo</span>,
                <MockRouterNavLinkCompat key={2} to='/about'>
                    <span>okay</span>
                    click me
                    <span>wow</span>
                    <span>
                        yeah
                        <em>super</em>
                        <strong>complex</strong>
                    </span>
                </MockRouterNavLinkCompat>,
                <span key={3}>foo</span>,
                <MockRouterNavLinkCompat key={4} to='/invalid'>
                    invalid
                </MockRouterNavLinkCompat>,
                <strong key={5}>
                    hell
                    <span>sick</span>
                </strong>,
                <MockRouterNavLinkCompat key={6} to='/error'>
                    error
                </MockRouterNavLinkCompat>,
            ],
            RouteContext : MockRouterContext,
            
            
            
            // Expects:
            expectTag    : 'A',
            expectHref   : '/about',
            expectJSX    : (
                <div data-mock='RouterNavLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        <span>boo</span>
                        <span>okay</span>
                        click me
                        <span>wow</span>
                        <span>
                            yeah
                            <em>super</em>
                            <strong>complex</strong>
                        </span>
                        <span>foo</span>
                        <div data-mock='RouterNavLinkCompat' data-anchorless='false' data-passhref='false'>
                            <a className='' href='/invalid' data-discover='true'>
                                invalid
                            </a>
                        </div>
                        <strong>
                            hell
                            <span>sick</span>
                        </strong>
                        <div data-mock='RouterNavLinkCompat' data-anchorless='false' data-passhref='false'>
                            <a className='' href='/error' data-discover='true'>
                                error
                            </a>
                        </div>
                    </a>
                </div>
            ),
        },
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            role,
            enabled,
            children,
            RouteContext,
            
            
            
            // Expects:
            expectTag,
            expectHref,
            expectJSX,
        }) => {
            const containerRef = createRef<HTMLDivElement>();
            
            const content = (
                <div data-testid='body' ref={containerRef}>
                    <MockSmartButton
                        role={role}
                        enabled={enabled}
                    >
                        {children}
                    </MockSmartButton>
                </div>
            );
            if (RouteContext) {
                render(
                    <RouteContext>
                        {content}
                    </RouteContext>
                );
            }
            else {
                render(content);
            } // if
            
            const buttonElement = screen.getByTestId('interactive-element');
            
            // Tag match:
            expect(buttonElement.tagName).toBe(expectTag);
            
            // `href` match (if present):
            if (expectHref !== 'NO_HREF_PASSED') expect(buttonElement).toHaveAttribute('href', expectHref);
            
            // Validate expectJSX:
            const expectedRef = createRef<HTMLDivElement>();
            const expectedContent = (
                <div data-testid='body' ref={expectedRef}>
                    {expectJSX}
                </div>
            );
            if (RouteContext) {
                render(
                    <RouteContext>
                        {expectedContent}
                    </RouteContext>
                );
            }
            else {
                render(expectedContent);
            } // if
            
            const containerElm = containerRef.current;
            const expectedElm  = expectedRef.current;
            expect(containerElm).toBeTruthy();
            expect(expectedElm).toBeTruthy();
            expect(containerElm!.innerHTML).toBe(expectedElm!.innerHTML);
        }
    );
});
