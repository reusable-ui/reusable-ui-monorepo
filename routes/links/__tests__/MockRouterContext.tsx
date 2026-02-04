import {
    // Types:
    type PropsWithChildren,
    
    
    
    // React:
    default as React,
} from 'react'
import {
    createRoutesStub,
} from 'react-router'



export const MockRouterContext = (props: PropsWithChildren<{}>) => {
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
                        about page
                    </main>
                );
            },
        },
    ]);
    
    return(
        <Stub initialEntries={['/']} />
    );
};
