import {
    default as React,
    type RefObject,
    useRef,
} from 'react'

import {
    type BasicTheme,
    type ThemeVariantProps,
    type ThemeVariantOptions,
    type ResolvedThemeVariant,
} from '../dist/types.js'
import {
    defaultTheme,
} from '../dist/internal-defaults.js'
import {
    useThemeVariant,
} from '../dist/theme-variant.js'
import {
    ThemeVariantProvider,
} from '../dist/providers.js'

import { renderHook, render } from '@testing-library/react'
import '@testing-library/jest-dom'



// Tests:

/**
 * Defines a single test case for evaluating theme variant.
 */
interface ThemeVariantTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title           : string
    
    /**
     * The parent theme to use for the test.
     * Set to `undefined` for no parent theme.
     */
    parentTheme    ?: BasicTheme | (string & {})
    
    /**
     * Props to pass to the `useThemeVariant` hook.
     * Set to `undefined` for no props.
     */
    props          ?: ThemeVariantProps<BasicTheme | (string & {})>
    
    /**
     * An optional options for the `useThemeVariant` hook.
     * Set to `undefined` for no options.
     */
    options        ?: ThemeVariantOptions<BasicTheme | (string & {})>
    
    
    
    // Expected Outcomes:
    
    /**
     * The expected result of the `useThemeVariant` hook.
     */
    expectedResult  : ResolvedThemeVariant<BasicTheme | (string & {})>
}



// Mocks:
interface MockComponentProps
    // Bases:
    extends
        ThemeVariantProps<BasicTheme | (string & {})>
{
    /**
     * Passed options to the `useThemeVariant` hook.
     */
    options   : ThemeVariantOptions<BasicTheme | (string & {})> | undefined
    
    /**
     * A ref to peek the result of the `useThemeVariant` hook.
     */
    resultRef : RefObject<ResolvedThemeVariant<BasicTheme | (string & {})> | undefined>
}

/**
 * A mock component for testing the `useThemeVariant` hook.
 */
const MockComponent = (props: MockComponentProps) => {
    // Test the `useThemeVariant` hook:
    const result = useThemeVariant(props, props.options);
    
    // Peek the result:
    props.resultRef.current = result;
    
    // Return null since this is a mock component:
    // It does not render anything to the DOM.
    return null;
};



const allThemes : (BasicTheme | (string & {}))[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
    'hot',
    'cool',
    'fresh-mint',
];



describe('useThemeVariant()', () => {
    const createRef = <TRef extends unknown>() => renderHook(() => useRef<TRef | undefined>(undefined)).result.current;
    
    test.each<ThemeVariantTestCase>([
        //#region direct resolution from props and/or options
        {
            title              : 'resolves success theme from props',
            props              : {
                theme          : 'success',
            },
            expectedResult     : {
                theme          : 'success',
                themeClassname : 't-success',
            },
        },
        {
            title              : 'resolves danger theme from props',
            props              : {
                theme          : 'danger',
            },
            expectedResult     : {
                theme          : 'danger',
                themeClassname : 't-danger',
            },
        },
        ...allThemes.map((theme) => ({
            title              : `resolves ${theme} theme from props`,
            props              : {
                theme          : theme,
            },
            expectedResult     : {
                theme          : theme,
                themeClassname : `t-${theme}`,
            },
        }) satisfies ThemeVariantTestCase),
        
        {
            title              : 'uses default success theme when prop is missing',
            options            : {
                defaultTheme   : 'success',
            },
            expectedResult     : {
                theme          : 'success',
                themeClassname : 't-success',
            },
        },
        {
            title              : 'uses default danger theme when prop is missing',
            options            : {
                defaultTheme   : 'danger',
            },
            expectedResult     : {
                theme          : 'danger',
                themeClassname : 't-danger',
            },
        },
        ...allThemes.map((theme) => ({
            title              : `uses default ${theme} theme when prop is missing`,
            options            : {
                defaultTheme   : theme,
            },
            expectedResult     : {
                theme          : theme,
                themeClassname : `t-${theme}`,
            },
        }) satisfies ThemeVariantTestCase),
        
        {
            title              : 'falls back to system default when prop and option are missing',
            expectedResult     : {
                theme          : defaultTheme,
                themeClassname : `t-${defaultTheme}`,
            },
        },
        {
            title              : 'falls back to system default when inheritance is missing',
            parentTheme        : undefined,
            props              : {
                theme          : 'inherit',
            },
            expectedResult     : {
                theme          : defaultTheme,
                themeClassname : `t-${defaultTheme}`,
            },
        },
        
        {
            title              : 'resolves success theme from props ignoring option',
            props              : {
                theme          : 'success',
            },
            options            : {
                defaultTheme   : 'danger',
            },
            expectedResult     : {
                theme          : 'success',
                themeClassname : 't-success',
            },
        },
        {
            title              : 'resolves danger theme from props ignoring option',
            props              : {
                theme          : 'danger',
            },
            options            : {
                defaultTheme   : 'success',
            },
            expectedResult     : {
                theme          : 'danger',
                themeClassname : 't-danger',
            },
        },
        ...allThemes.map((theme) => ({
            title              : `resolves ${theme} theme from props ignoring option`,
            props              : {
                theme          : theme,
            },
            options            : {
                defaultTheme   : 'whatever',
            },
            expectedResult     : {
                theme          : theme,
                themeClassname : `t-${theme}`,
            },
        }) satisfies ThemeVariantTestCase),
        //#endregion direct resolution from props and/or options
        
        
        
        //#region cascade resolution from props and/or options
        {
            title              : 'resolves success theme from parent',
            parentTheme        : 'success',
            props              : {
                theme          : 'inherit',
            },
            expectedResult     : {
                theme          : 'success',
                themeClassname : 't-success',
            },
        },
        {
            title              : 'resolves danger theme from parent',
            parentTheme        : 'danger',
            props              : {
                theme          : 'inherit',
            },
            expectedResult     : {
                theme          : 'danger',
                themeClassname : 't-danger',
            },
        },
        ...allThemes.map((theme) => ({
            title              : `resolves ${theme} theme from parent`,
            parentTheme        : theme,
            props              : {
                theme          : 'inherit',
            },
            expectedResult     : {
                theme          : theme,
                themeClassname : `t-${theme}`,
            },
        }) satisfies ThemeVariantTestCase),
        
        
        {
            title              : 'resolves success theme from parent ignoring option',
            parentTheme        : 'success',
            props              : {
                theme          : 'inherit',
            },
            options            : {
                defaultTheme   : 'danger',
            },
            expectedResult     : {
                theme          : 'success',
                themeClassname : 't-success',
            },
        },
        {
            title              : 'resolves danger theme from parent ignoring option',
            parentTheme        : 'danger',
            props              : {
                theme          : 'inherit',
            },
            options            : {
                defaultTheme   : 'success',
            },
            expectedResult     : {
                theme          : 'danger',
                themeClassname : 't-danger',
            },
        },
        ...allThemes.map((theme) => ({
            title              : `resolves ${theme} theme from parent ignoring option`,
            parentTheme        : theme,
            props              : {
                theme          : 'inherit',
            },
            options            : {
                defaultTheme   : 'whatever',
            },
            expectedResult     : {
                theme          : theme,
                themeClassname : `t-${theme}`,
            },
        }) satisfies ThemeVariantTestCase),
        //#endregion cascade resolution from props and/or options
    ])(
        `$title`,
        ({
            // Test Inputs:
            title,
            
            parentTheme,
            props,
            options,
            
            
            
            // Expects:
            expectedResult,
        }) => {
            // Create a ref to peek the result:
            const resultRef = createRef<ResolvedThemeVariant<BasicTheme | (string & {})>>();
            
            
            
            // Render the mock component with the provided props and options:
            if (parentTheme === undefined) {
                // Without parent theme:
                render(
                    <MockComponent {...props} options={options} resultRef={resultRef} />
                );
            }
            else {
                // With parent theme:
                render(
                    <ThemeVariantProvider<BasicTheme | (string & {})> theme={parentTheme}>
                        <MockComponent {...props} options={options} resultRef={resultRef} />
                    </ThemeVariantProvider>
                );
            } // if
            
            
            
            // Assert the result:
            expect(resultRef.current).toEqual(expectedResult);
        }
    );
});
