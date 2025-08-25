import {
    type CompatLinkProps,
    useAnchorlessLink,
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
    use,
    useRef,
    
    
    
    // Utilities:
    createContext,
    forwardRef,
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



// Validates component existance:

const TestContext = createContext<number>(999);
const AssertInContext = () => {
    const value = use(TestContext);
    if (value === 999) throw Error('Missing expected context: <TestContext.Provider>');
    
    return (
        <div data-testid='context-verified' />
    );
};

const AssertExist = ({ identifier }: { identifier: string }) => {
    return (
        <div data-testid={`ensured-existence-${identifier}`} />
    );
};



// Simulated platform-specific `<Link>` variants:

interface BareLinkProps {
    ref      ?: Ref<HTMLAnchorElement | null>
    children ?: ReactNode
    href     ?: string
}

/**
 * @returns
 * ```jsx
 * <a>
 *     <InteractiveElement />
 * </a>
 * ```
 */
const BasicLink = (props: BareLinkProps) => {
    // Guard unexpected usage — these props must not propagate downstream:
    if ('anchorless' in props) throw Error('invalid `anchorless` prop.');
    if ('passHref'   in props) throw Error('invalid `passHref` prop.');
    
    return (
        <a {...props} data-testid='built-in-anchor' />
    );
};

/**
 * @returns
 * ```jsx
 * <ForwardRef>
 *      <a>
 *          <InteractiveElement />
 *      </a>
 *  </ForwardRef>
 * ```
 */
const ForwardedLink = forwardRef<HTMLAnchorElement | null, BareLinkProps>((props, ref) => {
    // Guard unexpected usage — these props must not propagate downstream:
    if ('anchorless' in props) throw Error('invalid `anchorless` prop.');
    if ('passHref'   in props) throw Error('invalid `passHref` prop.');
    
    return (
        <a ref={ref} {...props} data-testid='built-in-anchor' />
    );
});

/**
 * @returns
 * ```jsx
 * <ForwardRef>
 *      <ContextProvider>
 *          <a>
 *              <InteractiveElement />
 *          </a>
 *      </ContextProvider>
 *  </ForwardRef>
 * ```
 */
const ForwardedContextedLink = forwardRef<HTMLAnchorElement | null, BareLinkProps>((props, ref) => {
    // Guard unexpected usage — these props must not propagate downstream:
    if ('anchorless' in props) throw Error('invalid `anchorless` prop.');
    if ('passHref'   in props) throw Error('invalid `passHref` prop.');
    
    return (
        <TestContext.Provider value={456}>
            <a ref={ref} {...props} data-testid='built-in-anchor' />
        </TestContext.Provider>
    );
});

/**
 * @returns
 * ```jsx
 * <ForwardRef>
 *      <ContextProvider>
 *          <Fragment>
 *              <a>
 *                  <InteractiveElement />
 *              </a>
 *          </Fragment>
 *      </ContextProvider>
 *  </ForwardRef>
 * ```
 */
const ForwardedContextedFragmentedLink = forwardRef<HTMLAnchorElement | null, BareLinkProps>((props, ref) => {
    // Guard unexpected usage — these props must not propagate downstream:
    if ('anchorless' in props) throw Error('invalid `anchorless` prop.');
    if ('passHref'   in props) throw Error('invalid `passHref` prop.');
    
    return (
        <TestContext.Provider value={456}>
            <>
                <AssertExist identifier='one' />
                <a ref={ref} {...props} data-testid='built-in-anchor' />
                <AssertExist identifier='two' />
                <AssertExist identifier='three' />
            </>
        </TestContext.Provider>
    );
});

/**
 * @returns
 * ```jsx
 * <ForwardRef>
 *      <ForwardRef>
 *          <ContextProvider>
 *              <Fragment>
 *                  <a>
 *                      <InteractiveElement />
 *                  </a>
 *              </Fragment>
 *          </ContextProvider>
 *       </ForwardRef>
 *  </ForwardRef>
 * ```
 */
const DoubleForwardedContextedFragmentedLink = forwardRef<HTMLAnchorElement | null, BareLinkProps>((props, ref) => {
    // Guard unexpected usage — these props must not propagate downstream:
    if ('anchorless' in props) throw Error('invalid `anchorless` prop.');
    if ('passHref'   in props) throw Error('invalid `passHref` prop.');
    
    return (
        <ForwardedContextedFragmentedLink {...props} ref={ref} />
    );
});



// `CompatLink` wrapper to simulate framework adapters:
interface AnchorlessTestLinkProps extends BareLinkProps, CompatLinkProps, DOMAttributes<HTMLAnchorElement> {
    LinkComponent : FunctionComponent<BareLinkProps>
}
const AnchorlessTestLink = (props: AnchorlessTestLinkProps) => {
    const {
        LinkComponent,
        ...restLinkProps
    } = props;
    
    return useAnchorlessLink(
        <LinkComponent href='/about' {...restLinkProps} />
    );
};



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
    LinkComponent         : FunctionComponent<BareLinkProps>
    
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
     * Whether the element should be rendered inside the test context.
     */
    expectInContext       : boolean
    
    /**
     * The element that should receive the forwarded `ref`:
     * - 'built-in-anchor' → ref is applied to the anchor
     * - 'interactive-element' → ref is applied to the promoted child
     */
    expectRefTarget       : 'built-in-anchor' | 'interactive-element'
    
    /**
     * Identifiers for any additional side elements expected in the output.
     */
    expectSides           : string[]
}

describe('useAnchorlessLink - preserves behavior across JSX nesting scenarios', () => {
    const createAnchorRef = () => renderHook(() => useRef<HTMLAnchorElement | null>(null)).result.current;
    
    test.each<AnchorlessLinkTestCase>([
        {
            // Tests:
            title                 : 'BasicLink - nested <a>, no anchorless',
            LinkComponent         : BasicLink,
            anchorless            : false,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'built-in-anchor',
            expectNavigationProps : false,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : false,
            expectRefTarget       : 'built-in-anchor',
            expectSides           : [],
        },
        {
            // Tests:
            title                 : 'BasicLink - unwrap anchorless link (no href)',
            LinkComponent         : BasicLink,
            anchorless            : true,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : false,
            expectRefTarget       : 'interactive-element',
            expectSides           : [],
        },
        {
            // Tests:
            title                 : 'BasicLink - unwrap anchorless link with href',
            LinkComponent         : BasicLink,
            anchorless            : true,
            passHref              : true,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'A',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : '/about',
            expectInContext       : false,
            expectRefTarget       : 'interactive-element',
            expectSides           : [],
        },
        
        
        
        {
            // Tests:
            title                 : 'ForwardRefLink - nested <a>, no anchorless',
            LinkComponent         : ForwardedLink,
            anchorless            : false,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'built-in-anchor',
            expectNavigationProps : false,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : false,
            expectRefTarget       : 'built-in-anchor',
            expectSides           : [],
        },
        {
            // Tests:
            title                 : 'ForwardRefLink - unwrap anchorless link (no href)',
            LinkComponent         : ForwardedLink,
            anchorless            : true,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : false,
            expectRefTarget       : 'interactive-element',
            expectSides           : [],
        },
        {
            // Tests:
            title                 : 'ForwardRefLink - unwrap anchorless link with href',
            LinkComponent         : ForwardedLink,
            anchorless            : true,
            passHref              : true,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'A',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : '/about',
            expectInContext       : false,
            expectRefTarget       : 'interactive-element',
            expectSides           : [],
        },
        
        
        
        {
            // Tests:
            title                 : 'ForwardRef + Context - nested <a>, no anchorless',
            LinkComponent         : ForwardedContextedLink,
            anchorless            : false,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'built-in-anchor',
            expectNavigationProps : false,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : true,
            expectRefTarget       : 'built-in-anchor',
            expectSides           : [],
        },
        {
            // Tests:
            title                 : 'ForwardRef + Context - unwrap anchorless link (no href)',
            LinkComponent         : ForwardedContextedLink,
            anchorless            : true,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : true,
            expectRefTarget       : 'interactive-element',
            expectSides           : [],
        },
        {
            // Tests:
            title                 : 'ForwardRef + Context - unwrap anchorless link with href',
            LinkComponent         : ForwardedContextedLink,
            anchorless            : true,
            passHref              : true,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'A',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : '/about',
            expectInContext       : true,
            expectRefTarget       : 'interactive-element',
            expectSides           : [],
        },
        
        
        
        {
            // Tests:
            title                 : 'ForwardRef + Context + Fragment - nested <a> with side elements, no anchorless',
            LinkComponent         : ForwardedContextedFragmentedLink,
            anchorless            : false,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'built-in-anchor',
            expectNavigationProps : false,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : true,
            expectRefTarget       : 'built-in-anchor',
            expectSides           : [
                'ensured-existence-one',
                'ensured-existence-two',
                'ensured-existence-three',
            ],
        },
        {
            // Tests:
            title                 : 'ForwardRef + Context + Fragment - unwrap anchorless link with side elements (no href)',
            LinkComponent         : ForwardedContextedFragmentedLink,
            anchorless            : true,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : true,
            expectRefTarget       : 'interactive-element',
            expectSides           : [
                'ensured-existence-one',
                'ensured-existence-two',
                'ensured-existence-three',
            ],
        },
        {
            // Tests:
            title                 : 'ForwardRef + Context + Fragment - unwrap anchorless link with side elements and href',
            LinkComponent         : ForwardedContextedFragmentedLink,
            anchorless            : true,
            passHref              : true,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'A',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : '/about',
            expectInContext       : true,
            expectRefTarget       : 'interactive-element',
            expectSides           : [
                'ensured-existence-one',
                'ensured-existence-two',
                'ensured-existence-three',
            ],
        },
        
        
        
        {
            // Tests:
            title                 : 'ForwardRef + ForwardRef + Context + Fragment - nested <a> with side elements, no anchorless',
            LinkComponent         : DoubleForwardedContextedFragmentedLink,
            anchorless            : false,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'built-in-anchor',
            expectNavigationProps : false,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : true,
            expectRefTarget       : 'built-in-anchor',
            expectSides           : [
                'ensured-existence-one',
                'ensured-existence-two',
                'ensured-existence-three',
            ],
        },
        {
            // Tests:
            title                 : 'ForwardRef + ForwardRef + Context + Fragment - unwrap anchorless link with side elements (no href)',
            LinkComponent         : DoubleForwardedContextedFragmentedLink,
            anchorless            : true,
            passHref              : false,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'BUTTON',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : 'NO_HREF_PASSED',
            expectInContext       : true,
            expectRefTarget       : 'interactive-element',
            expectSides           : [
                'ensured-existence-one',
                'ensured-existence-two',
                'ensured-existence-three',
            ],
        },
        {
            // Tests:
            title                 : 'ForwardRef + ForwardRef + Context + Fragment - unwrap anchorless link with side elements and href',
            LinkComponent         : DoubleForwardedContextedFragmentedLink,
            anchorless            : true,
            passHref              : true,
            childElement          : <Button />,
            
            
            
            // Expects:
            expectTag             : 'A',
            expectParentId        : 'body',
            expectNavigationProps : true,
            expectHref            : '/about',
            expectInContext       : true,
            expectRefTarget       : 'interactive-element',
            expectSides           : [
                'ensured-existence-one',
                'ensured-existence-two',
                'ensured-existence-three',
            ],
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
            expectInContext,
            expectRefTarget,
            expectSides,
        }) => {
            const refAnchor      = createAnchorRef(); // ref for AnchorlessTestLink.
            const refInteractive = createAnchorRef(); // ref for child Button.
            
            const handleAnchorClick           = jest.fn();
            const handleInteractiveClick      = jest.fn(); (handleInteractiveClick      as any).__not_internal_navigation_handler__ = true; // Mark as not the **internal** navigation handler.
            
            const handleAnchorMouseEnter      = jest.fn();
            const handleInteractiveMouseEnter = jest.fn(); (handleInteractiveMouseEnter as any).__not_internal_navigation_handler__ = true; // Mark as not the **internal** navigation handler.
            
            const handleAnchorTouchStart      = jest.fn();
            const handleInteractiveTouchStart = jest.fn(); (handleInteractiveTouchStart as any).__not_internal_navigation_handler__ = true; // Mark as not the **internal** navigation handler.
            
            render(
                <div data-testid='body'>
                    <AnchorlessTestLink
                        ref={refAnchor}
                        
                        LinkComponent={LinkComponent}
                        
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
                            expectInContext && <AssertInContext />
                        )}
                    </AnchorlessTestLink>
                </div>
            );
            
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
            
            // Context presence:
            if (expectInContext) screen.getByTestId('context-verified');
            
            // Side elements:
            for (const sideId of expectSides) {
                screen.getByTestId(sideId);
            } // for
            
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
        }
    );
});
