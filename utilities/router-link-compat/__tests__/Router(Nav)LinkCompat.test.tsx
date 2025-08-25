import {
    RouterLinkCompat,
    RouterLinkCompatProps,
    
    RouterNavLinkCompat,
    RouterNavLinkCompatProps,
} from '../dist/index.js'
import {
    // Types:
    type ReactNode,
    type Ref,
    type FunctionComponent,
    type DOMAttributes,
    type ReactElement,
    
    
    
    // React:
    default as React,
    
    
    
    // Hooks:
    useRef,
    
    
    
    // Utilities:
    cloneElement,
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
import { render, renderHook, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { jest } from '@jest/globals'
import { createRoutesStub } from 'react-router'



// Flexible test `<Button>` that reflects resolved navigation props:

const fallbackButtonPriority    : SemanticPriority = [
    ['button', 'button'],
    ['link', 'a'],
];
const prioritizedLinkThenButton : SemanticPriority = [
    ['link', 'a'],
    ['button', 'button'],
];

const fallbackButtonRole : Role | 'auto' = 'auto';
const fallbackButtonTag  : Tag  | 'auto' = 'auto';

interface ButtonProps extends SemanticProps, AccessibilityProps, DOMAttributes<HTMLButtonElement> {
    ref      ?: Ref<HTMLButtonElement | null>
    children ?: ReactNode
}
const Button = (props: ButtonProps) => {
    const {
        semanticPriority = (
            'href' in props
            ? prioritizedLinkThenButton // If    `href` provided => prefer link over button.
            : fallbackButtonPriority    // If no `href` provided => prefer button over link.
        ),
        role             = fallbackButtonRole,
        tag              = fallbackButtonTag,
        
        disabled,
        readOnly,
        active,
        cascadeDisabled,
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
        disabled : isDisabled,
        readOnly : isReadOnly,
        active   : isActive,
    } = useResolvedAccessibilityState({
        disabled,
        readOnly,
        active,
        
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
    });
    
    
    
    const DynamicTag : Tag = resolvedTag ?? 'span';
    return (
        <DynamicTag
            {...(restProps as {})}
            
            role={resolvedRole ?? undefined}
            
            data-testid='interactive-element'
            
            data-disabled = {isDisabled || undefined}
            data-readonly = {isReadOnly || undefined}
            data-active   = {isActive   || undefined}
            
            data-passed-nav={
                !!props.ref
                &&
                (typeof props.onClick === 'function' && !('__not_internal_navigation_handler__' in props.onClick))
                &&
                (typeof props.onMouseEnter === 'function' && !('__not_internal_navigation_handler__' in props.onMouseEnter))
                &&
                (typeof props.onTouchStart === 'function' && !('__not_internal_navigation_handler__' in props.onTouchStart))
            }
            data-passed-href={(props as any).href ?? 'NO_HREF_PASSED'}
        >
            {props.children}
        </DynamicTag>
    );
};



// Tests:

interface AnchorlessLinkTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title                 : string
    
    /**
     * The underlying `<Link>` implementation being tested.
     */
    LinkComponent         : FunctionComponent<RouterLinkCompatProps> | FunctionComponent<RouterNavLinkCompatProps>
    
    /**
     * Whether to enable anchorless rendering for this test.
     */
    anchorless            : boolean
    
    /**
     * Whether to forward `href` from `<Link>` to the interactive child.
     */
    passHref              : boolean
    
    /**
     * The interactive element to nest inside `<Link>`.
     */
    childElement          : ReactElement<ButtonProps>
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected tag name of the rendered interactive element.
     */
    expectTag             : 'BUTTON' | 'A'
    
    /**
     * The expected parent container:
     * - 'built-in-anchor' → nested inside `<a>`
     * - 'body' → promoted out of `<a>`
     */
    expectParentId        : 'built-in-anchor' | 'body'
    
    /**
     * Expectation for navigation-related props:
     * Should `ref`, `onClick`, `onMouseEnter`, and `onTouchStart` be present?
     */
    expectNavigationProps : boolean
    
    /**
     * The expected `href` value on the interactive element (if forwarded).
     */
    expectHref            : '/about' | 'NO_HREF_PASSED'
    
    /**
     * The element that should receive the forwarded `ref`:
     * - 'built-in-anchor' → ref is applied to the anchor
     * - 'interactive-element' → ref is applied to the promoted child
     */
    expectRefTarget       : 'built-in-anchor' | 'interactive-element'
}

describe('useAnchorlessLink - preserves behavior across JSX nesting scenarios', () => {
    const createAnchorRef = () => renderHook(() => useRef<HTMLAnchorElement | null>(null)).result.current;
    
    test.each<AnchorlessLinkTestCase>([
        {
            // Tests:
            title                 : 'React Router <Link> - nested <a>, no anchorless',
            LinkComponent         : RouterLinkCompat,
            anchorless            : false,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'built-in-anchor',
            expectNavigationProps : false,
            expectHref            : 'NO_HREF_PASSED',
            expectRefTarget       : 'built-in-anchor',
        },
        {
            // Tests:
            title                 : 'React Router <Link> - unwrap anchorless link (no href)',
            LinkComponent         : RouterLinkCompat,
            anchorless            : true,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : 'NO_HREF_PASSED',
            expectRefTarget       : 'interactive-element',
        },
        {
            // Tests:
            title                 : 'React Router <Link> - unwrap anchorless link with href',
            LinkComponent         : RouterLinkCompat,
            anchorless            : true,
            passHref              : true,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'A',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : '/about',
            expectRefTarget       : 'interactive-element',
        },
        
        
        
        {
            // Tests:
            title                 : 'React Router <NextLink> - nested <a>, no anchorless',
            LinkComponent         : RouterNavLinkCompat,
            anchorless            : false,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'built-in-anchor',
            expectNavigationProps : false,
            expectHref            : 'NO_HREF_PASSED',
            expectRefTarget       : 'built-in-anchor',
        },
        {
            // Tests:
            title                 : 'React Router <NextLink> - unwrap anchorless link (no href)',
            LinkComponent         : RouterNavLinkCompat,
            anchorless            : true,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : 'NO_HREF_PASSED',
            expectRefTarget       : 'interactive-element',
        },
        {
            // Tests:
            title                 : 'React Router <NextLink> - unwrap anchorless link with href',
            LinkComponent         : RouterNavLinkCompat,
            anchorless            : true,
            passHref              : true,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'A',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : '/about',
            expectRefTarget       : 'interactive-element',
        },
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            LinkComponent,
            anchorless,
            passHref,
            childElement,
            
            
            
            // Expects:
            expectTag,
            expectParentId,
            expectNavigationProps,
            expectHref,
            expectRefTarget,
        }) => {
            const refAnchor      = createAnchorRef(); // ref for AnchorlessTestLink.
            const refInteractive = createAnchorRef(); // ref for child Button.
            
            const handleAnchorClick           = jest.fn();
            const handleInteractiveClick      = jest.fn(); (handleInteractiveClick      as any).__not_internal_navigation_handler__ = true; // Mark as not the **internal** navigation handler.
            
            const handleAnchorMouseEnter      = jest.fn();
            const handleInteractiveMouseEnter = jest.fn(); (handleInteractiveMouseEnter as any).__not_internal_navigation_handler__ = true; // Mark as not the **internal** navigation handler.
            
            const handleAnchorTouchStart      = jest.fn();
            const handleInteractiveTouchStart = jest.fn(); (handleInteractiveTouchStart as any).__not_internal_navigation_handler__ = true; // Mark as not the **internal** navigation handler.
            
            const Stub = createRoutesStub([
                {
                    path: '/',
                    Component: function HomePage() {
                        return (
                            <main data-testid='home-page'>
                                <div data-testid='body'>
                                    <LinkComponent
                                        to='/about'
                                        
                                        data-testid='built-in-anchor'
                                        
                                        ref={refAnchor}
                                        
                                        anchorless={anchorless}
                                        passHref={passHref}
                                        
                                        onClick={handleAnchorClick}
                                        onMouseEnter={handleAnchorMouseEnter}
                                        onTouchStart={handleAnchorTouchStart}
                                    >
                                        {cloneElement<ButtonProps>(childElement,
                                            // Props:
                                            {
                                                ref          : refInteractive as Ref<HTMLButtonElement | null>,
                                                
                                                onClick      : handleInteractiveClick,
                                                onMouseEnter : handleInteractiveMouseEnter,
                                                onTouchStart : handleInteractiveTouchStart,
                                            },
                                            
                                            
                                            
                                            // Children:
                                            'click me',
                                        )}
                                    </LinkComponent>
                                </div>
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
            render(<Stub initialEntries={['/']} />);
            
            // Ensure the test starts on the home page:
            screen.getByTestId('home-page');
            
            const interactiveElement = screen.getByTestId('interactive-element');
            
            // Structural checks:
            expect(interactiveElement.tagName).toBe(expectTag);
            expect(interactiveElement.parentElement).toHaveAttribute('data-testid', expectParentId);
            expect(interactiveElement).toHaveAttribute('data-passed-nav', String(expectNavigationProps));
            expect(interactiveElement).toHaveAttribute('data-passed-href', expectHref);
            
            // Ref integrity: both refs should point to the same DOM element
            expect(refAnchor.current).toBe(
                !anchorless
                ? interactiveElement.parentElement // Has anchor : Attached to the anchor itself.
                : interactiveElement               // No anchor  : Fallback attached to the interactive.
            );
            expect(refInteractive.current).toBe(interactiveElement);
            expect(refAnchor.current).toHaveAttribute('data-testid', expectRefTarget);
            
            // Navigation event merging:
            const anchorOrInteractive = refAnchor.current!;
            
            fireEvent.mouseEnter(anchorOrInteractive);
            expect(handleAnchorMouseEnter).toHaveBeenCalledTimes(1); // Has anchor: clicked from the anchor itself, otherwise clicked from the interactive.
            expect(handleInteractiveMouseEnter).toHaveBeenCalledTimes(
                !anchorless
                ? 0 // Has anchor : clicked from the anchor, no click from interactive.
                : 1 // No anchor  : clicked from the interactive.
            );
            
            fireEvent.touchStart(anchorOrInteractive);
            expect(handleAnchorTouchStart).toHaveBeenCalledTimes(1); // Has anchor: clicked from the anchor itself, otherwise clicked from the interactive.
            expect(handleInteractiveTouchStart).toHaveBeenCalledTimes(
                !anchorless
                ? 0 // Has anchor : clicked from the anchor, no click from interactive.
                : 1 // No anchor  : clicked from the interactive.
            );
            
            // Trigger the click event after testing mouseEnter and touchStart,
            // so that any navigation side-effects don't interfere with the previous assertions:
            fireEvent.click(anchorOrInteractive);
            expect(handleAnchorClick).toHaveBeenCalledTimes(1); // Has anchor: clicked from the anchor itself, otherwise clicked from the interactive.
            expect(handleInteractiveClick).toHaveBeenCalledTimes(
                !anchorless
                ? 0 // Has anchor : clicked from the anchor, no click from interactive.
                : 1 // No anchor  : clicked from the interactive.
            );
            
            // Verify that the page navigated successfully to `/about`:
            screen.getByTestId('about-page');
        }
    );
});
