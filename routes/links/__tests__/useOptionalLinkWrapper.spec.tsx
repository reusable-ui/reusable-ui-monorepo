import {
    // Types:
    type ReactNode,
    
    
    
    // React:
    default as React,
} from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import {
    MockSmartButton,
} from './MockSmartButton.js'
import {
    MockNextLinkCompat,
} from './MockNextLinkCompat.js'
import {
    MockRouterLinkCompat,
} from './MockRouterLinkCompat.js'
import {
    MockRouterNavLinkCompat,
} from './MockRouterNavLinkCompat.js'
import {
    MockRouterContext,
} from './MockRouterContext.js'



interface SmartButtonTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title            : string
    
    /**
     * The role of `<SmartButton>`.
     */
    role             : 'auto' | 'button' | 'link'
    
    disabled         : boolean,
    
    /**
     * The mix of `<Link>` and other structures to nest inside `<SmartButton>`.
     */
    children         : ReactNode
    
    /**
     * An optional route context in order the `<Link>` component to work correctly.
     */
    useRouterContext : boolean
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected tag name of the rendered `<SmartButton>` element.
     */
    expectTag        : 'BUTTON' | 'A'
    
    /**
     * The expected `href` value on the interactive element (if forwarded).
     */
    expectHref       : '/about' | 'NO_HREF_PASSED'
    
    /**
     * The expected JSX structure.
     */
    expectJSX        : ReactNode
}



test.describe('useOptionalLinkWrapper - semantic composition + link behavior', () => {
    for (const {
        // Test Inputs:
        title,
        role,
        disabled,
        children,
        useRouterContext,
        
        
        
        // Expects:
        expectTag,
        expectHref,
        expectJSX,
    } of [
        // Tests without <Link> elements:
        {
            // Tests:
            title            : 'renders plain children without any <Link>',
            role             : 'auto',
            disabled         : false,
            children         : (
                'click me'
            ),
            useRouterContext : false,
            
            
            
            // Expects:
            expectTag        : 'BUTTON',
            expectHref       : 'NO_HREF_PASSED',
            expectJSX        : (
                <button data-testid='interactive-element'>
                    click me
                </button>
            ),
        },
        {
            // Tests:
            title            : 'renders complex nested structure without any <Link>',
            role             : 'auto',
            disabled         : false,
            children         : [
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
            useRouterContext : false,
            
            
            
            // Expects:
            expectTag        : 'BUTTON',
            expectHref       : 'NO_HREF_PASSED',
            expectJSX        : (
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
            title            : 'renders with nested Next.js <Link> (anchorless, role="auto")',
            role             : 'auto',
            disabled         : false,
            children         : (
                <MockNextLinkCompat href='/about'>
                    click me
                </MockNextLinkCompat>
            ),
            useRouterContext : false,
            
            
            
            // Expects:
            expectTag        : 'BUTTON',
            expectHref       : 'NO_HREF_PASSED',
            expectJSX        : (
                <div data-mock='NextLinkCompat' data-anchorless='true' data-passhref='false'>
                    <button data-testid='interactive-element'>
                        click me
                    </button>
                </div>
            ),
        },
        {
            // Tests:
            title            : 'renders with Next.js <Link> and explicit role="link"',
            role             : 'link',
            disabled         : false,
            children         : (
                <MockNextLinkCompat href='/about'>
                    click me
                </MockNextLinkCompat>
            ),
            useRouterContext : false,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
                <div data-mock='NextLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        click me
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title            : 'renders deeply nested structure with a single Next.js <Link> + role="link"',
            role             : 'link',
            disabled         : false,
            children         : [
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
            useRouterContext : false,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
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
            title            : 'renders multiple <Link> children but uses only the first valid Next.js <Link> + role="link"',
            role             : 'link',
            disabled         : false,
            children         : [
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
            useRouterContext : false,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
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
            title            : 'renders with nested React Router <Link> (anchorless, role="auto")',
            role             : 'auto',
            disabled         : false,
            children         : (
                <MockRouterLinkCompat to='/about'>
                    click me
                </MockRouterLinkCompat>
            ),
            useRouterContext : true,
            
            
            
            // Expects:
            expectTag        : 'BUTTON',
            expectHref       : 'NO_HREF_PASSED',
            expectJSX        : (
                <div data-mock='RouterLinkCompat' data-anchorless='true' data-passhref='false'>
                    <button data-testid='interactive-element'>
                        click me
                    </button>
                </div>
            ),
        },
        {
            // Tests:
            title            : 'renders with React Router <Link> and explicit role="link"',
            role             : 'link',
            disabled         : false,
            children         : (
                <MockRouterLinkCompat to='/about'>
                    click me
                </MockRouterLinkCompat>
            ),
            useRouterContext : true,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
                <div data-mock='RouterLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        click me
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title            : 'renders deeply nested structure with a single React Router <Link> + role="link"',
            role             : 'link',
            disabled         : false,
            children         : [
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
            useRouterContext : true,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
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
            title            : 'renders multiple <Link> children but uses only the first valid React Router <Link> + role="link"',
            role             : 'link',
            disabled         : false,
            children         : [
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
            useRouterContext : true,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
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
            title            : 'renders with nested React Router <NavLink> (anchorless, role="auto")',
            role             : 'auto',
            disabled         : false,
            children         : (
                <MockRouterNavLinkCompat to='/about'>
                    click me
                </MockRouterNavLinkCompat>
            ),
            useRouterContext : true,
            
            
            
            // Expects:
            expectTag        : 'BUTTON',
            expectHref       : 'NO_HREF_PASSED',
            expectJSX        : (
                <div data-mock='RouterNavLinkCompat' data-anchorless='true' data-passhref='false'>
                    <button data-testid='interactive-element'>
                        click me
                    </button>
                </div>
            ),
        },
        {
            // Tests:
            title            : 'renders with React Router <NavLink> and explicit role="link"',
            role             : 'link',
            disabled         : false,
            children         : (
                <MockRouterNavLinkCompat to='/about'>
                    click me
                </MockRouterNavLinkCompat>
            ),
            useRouterContext : true,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
                <div data-mock='RouterNavLinkCompat' data-anchorless='true' data-passhref='true'>
                    <a href='/about' data-testid='interactive-element'>
                        click me
                    </a>
                </div>
            ),
        },
        {
            // Tests:
            title            : 'renders deeply nested structure with a single React Router <NavLink> + role="link"',
            role             : 'link',
            disabled         : false,
            children         : [
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
            useRouterContext : true,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
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
            title            : 'renders multiple <NavLink> children but uses only the first valid React Router <NavLink> + role="link"',
            role             : 'link',
            disabled         : false,
            children         : [
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
            useRouterContext : true,
            
            
            
            // Expects:
            expectTag        : 'A',
            expectHref       : '/about',
            expectJSX        : (
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
    ] as SmartButtonTestCase[]) {
        test(title, async ({ mount }) => {
            // First render:
            const content = (
                <div data-testid='body'>
                    <MockSmartButton
                        role={role}
                        disabled={disabled}
                    >
                        {children}
                    </MockSmartButton>
                </div>
            );
            const component = await mount(
                useRouterContext
                ? (
                    <MockRouterContext>
                        {content}
                    </MockRouterContext>
                )
                : content
            );
            const containerHtmlA = await component.evaluate(el => el.innerHTML);
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('interactive-element');
            
            // Tag match:
            await expect(box).toHaveJSProperty('tagName', expectTag);
            
            // `href` match (if present):
            if (expectHref !== 'NO_HREF_PASSED') await expect(box).toHaveAttribute('href', expectHref);
            
            // Re-render:
            const expectedContent = (
                <div data-testid='body'>
                    {expectJSX}
                </div>
            );
            component.update(
                useRouterContext
                ? (
                    <MockRouterContext>
                        {expectedContent}
                    </MockRouterContext>
                )
                : expectedContent
            );
            const containerHtmlB = await component.evaluate(el => el.innerHTML);
            
            // Compare rendered HTML:
            expect(containerHtmlA).toBe(containerHtmlB);
        });
    } // for
});
