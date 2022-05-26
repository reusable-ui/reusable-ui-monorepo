import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    // breakpoints,
    
    ifScreenWidthAtLeast,
    ifScreenWidthSmallerThan,
    ifScreenWidthBetween,
    ifScreenWidthAt,
} from '@reusable-ui/breakpoints'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import {
    styleSheet,
    children,
    ifNthChild,
} from '@cssfn/cssfn'



const testResponsive = styleSheet(() => ({
    ...children('div', {
        opacity: 0.15,
        transition: [['opacity', '0.5s']],
        
        ...ifNthChild(0, 1, {
            ...ifScreenWidthAtLeast('xs', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 2, {
            ...ifScreenWidthAtLeast('sm', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 3, {
            ...ifScreenWidthAtLeast('md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 4, {
            ...ifScreenWidthAtLeast('lg', {
                opacity: 1,
            }),
        }),
        
        
        
        ...ifNthChild(0, 5, {
            ...ifScreenWidthSmallerThan('xs', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 6, {
            ...ifScreenWidthSmallerThan('sm', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 7, {
            ...ifScreenWidthSmallerThan('md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 8, {
            ...ifScreenWidthSmallerThan('lg', {
                opacity: 1,
            }),
        }),
        
        
        
        ...ifNthChild(0, 9, {
            ...ifScreenWidthBetween('xs', 'md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 10, {
            ...ifScreenWidthBetween('xs', 'xs', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 11, {
            ...ifScreenWidthBetween('sm', 'md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 12, {
            ...ifScreenWidthBetween('sm', 'lg', {
                opacity: 1,
            }),
        }),
        
        
        
        ...ifNthChild(0, 13, {
            ...ifScreenWidthAt('xs', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 14, {
            ...ifScreenWidthAt('sm', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 15, {
            ...ifScreenWidthAt('md', {
                opacity: 1,
            }),
        }),
        ...ifNthChild(0, 16, {
            ...ifScreenWidthAt('lg', {
                opacity: 1,
            }),
        }),
    })
}));

function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className="App">
                <article className={['test-responsive', testResponsive].join(' ')}>
                    <div>at least xs</div>
                    <div>at least sm</div>
                    <div>at least md</div>
                    <div>at least lg</div>
                    
                    <div>smaller than xs</div>
                    <div>smaller than sm</div>
                    <div>smaller than md</div>
                    <div>smaller than lg</div>
                    
                    <div>between xs-md</div>
                    <div>between xs-xs</div>
                    <div>between sm-md</div>
                    <div>between sm-lg</div>
                    
                    <div>at xs</div>
                    <div>at sm</div>
                    <div>at md</div>
                    <div>at lg</div>
                </article>
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
            </div>
        </>
    );
}

export default App;
