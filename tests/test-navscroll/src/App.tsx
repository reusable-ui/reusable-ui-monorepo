import {
    default as React,
    useRef,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Navscroll,
} from '@reusable-ui/navscroll'
import {
    ListItem,
} from '@reusable-ui/list'
import { children, descendants, rule, style } from '@cssfn/cssfn'
import {
    Styles,
    HeadPortal,
    dynamicStyleSheet,
} from '@cssfn/cssfn-react'



const useDummyArticleStyleSheet = dynamicStyleSheet(() => style({
            border: 'solid 1px black',
            background : 'hsl(200, 90%, 75%)',
            
            
            ...children(['&', 'section:nth-of-type(4)'], {
                display       : 'flex',
                flexDirection : 'column',
                gap           : 0,
                overflowY     : 'auto',
                
                padding       : '10px',
                
                ...children('section', {
                    flex      : [[0, 0, 'auto']],
                    padding   : '10px',
                }),
            }),
            height            : '250px',
            ...children('section:nth-of-type(4)', {
                height        : '200px',
            }),
            
            
            ...children('section', {
                ...rule(':nth-of-type(3n+1)', {
                    background : 'hsl(350, 90%, 75%)',
                }),
                ...rule(':nth-of-type(3n+2)', {
                    background : 'hsl(120, 90%, 75%)',
                }),
                ...rule(':nth-of-type(3n+3)', {
                    background : 'hsl(39, 90%, 75%)',
                }),
                ...rule(':nth-of-type(4)', {
                    ...children('section', {
                        ...rule(':nth-of-type(3n+1)', {
                            background : 'hsl(084, 90%, 75%)',
                        }),
                        ...rule(':nth-of-type(3n+2)', {
                            background : 'hsl(260, 90%, 75%)',
                        }),
                        ...rule(':nth-of-type(3n+3)', {
                            background : 'hsl(028, 90%, 75%)',
                        }),
                    }),
                }),
            }),
            
            
            ...descendants('section', {
                overflow: 'hidden',
            }),
            ...descendants(['h1', 'h2'], {
                textAlign: 'center',
            }),
            ...descendants('h1', {
                fontSize: '1.25rem',
            }),
            ...descendants('h2', {
                fontSize: '1rem',
            }),
            ...descendants('p', {
                fontSize: '0.5rem',
                textOverflow: 'ellipsis'
            }),
            
            
            ...children('section:nth-of-type(1)', {
                height : '80px',
            }),
            ...children('section:nth-of-type(2)', {
                height : '200px',
            }),
            ...children('section:nth-of-type(3)', {
                height : '400px',
            }),
            ...children('section:nth-of-type(4)', {
                ...children('section:nth-of-type(1)', {
                    height: '200px',
                }),
                ...children('section:nth-of-type(2)', {
                    height: '100px',
                }),
                ...children('section:nth-of-type(3)', {
                    height: '150px',
                }),
                ...children('section:nth-of-type(4)', {
                    height: '100px',
                }),
            }),
            ...children('section:nth-of-type(5)', {
                height : '300px',
            }),
            ...children('section:nth-of-type(6)', {
                height : '100px',
            }),
}));



interface ParagraphLoremProps {
    words? : number
}
const lorems = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem accusantium et ipsam, architecto cupiditate recusandae dolorem itaque tempore expedita commodi eos doloremque molestias. Impedit doloribus maxime rem, iste quia consequuntur?'.split(' ');
const ParagraphLorem = ({ words }: ParagraphLoremProps) => (
    <p>
        { (words ? lorems.slice(0, words) : lorems).join(' ') }
    </p>
);



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const scrollableContainerRef  = useRef<HTMLElement>(null);
    
    const dummyArticleStyleSheet = useDummyArticleStyleSheet();
    
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className="App">
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
                <article
                    ref={scrollableContainerRef}
                    
                    className={dummyArticleStyleSheet.main}
                >
                    <section>
                        <h1>First section</h1>
                        <ParagraphLorem words={10} />
                    </section>
                    <section>
                        <h1>Second section</h1>
                        <ParagraphLorem words={10} />
                        <ParagraphLorem words={10} />
                        <ParagraphLorem words={10} />
                    </section>
                    <section>
                        <h1>Third section</h1>
                        <ParagraphLorem words={10} />
                        <ParagraphLorem words={10} />
                        <ParagraphLorem words={10} />
                    </section>
                    <section>
                        <h1>Fourth section</h1>
                        <ParagraphLorem words={10} />
                        <section>
                            <h2>Fourth sub section 1</h2>
                            <ParagraphLorem words={10} />
                        </section>
                        <section>
                            <h2> Fourth sub section 2</h2>
                            <ParagraphLorem words={10} />
                        </section>
                        <section>
                            <h2>Fourth sub section 3</h2>
                            <ParagraphLorem words={10} />
                        </section>
                        <section>
                            <h2>Fourth sub section 4</h2>
                            <ParagraphLorem words={10} />
                        </section>
                    </section>
                    <section>
                        <h1>Fifth section</h1>
                        <ParagraphLorem words={10} />
                        <ParagraphLorem words={10} />
                        <ParagraphLorem words={10} />
                    </section>
                    <section>
                        <h1>Last section</h1>
                        <ParagraphLorem words={10} />
                    </section>
                </article>
                <Navscroll theme='primary'
                    scrollingOf={scrollableContainerRef}
                    scrollingSelector='section'
                >
                    <ListItem>
                        First section
                    </ListItem>
                    <ListItem>
                        Second section
                    </ListItem>
                    <ListItem>
                        Third section
                    </ListItem>
                    <ListItem>
                        Fourth section
                        <Navscroll>
                            <ListItem>
                                Sub 4-1
                            </ListItem>
                            <ListItem>
                                Sub 4-2
                            </ListItem>
                            <ListItem>
                                Sub 4-3
                            </ListItem>
                            <ListItem>
                                Sub 4-4
                            </ListItem>
                        </Navscroll>
                    </ListItem>
                    <ListItem>
                        Fifth section
                    </ListItem>
                    <ListItem>
                        Last section
                    </ListItem>
                </Navscroll>
            </div>
        </>
    );
}

export default App;
