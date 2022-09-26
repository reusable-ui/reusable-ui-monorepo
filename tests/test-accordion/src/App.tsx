import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Accordion,
    AccordionItem,
} from '@reusable-ui/accordion'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



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
                
                <br />
                
                <Accordion theme='primary'>
                    <AccordionItem key={0} onExpandedChange={(event) => console.log(event)} label='A first item'>
                        <p>The detail of first item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={1} label='A second item' className='fluid'>
                        <p>The detail of second item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={2} label='A third item' theme='success'>
                        <p>The detail of third item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={3} label='A fourth item' defaultExpanded={true}>
                        <p>The detail of fourth item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                    <AccordionItem key={4} label='A fifth item' theme='danger'>
                        <p>The detail of fifth item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
}

export default App;
