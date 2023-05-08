import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Details,
} from '@reusable-ui/details'
import {
    Content,
} from '@reusable-ui/content'
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
                
                <Details theme='primary' label='An awesome thing' onExpandedChange={(event) => console.log(event)}>
                    <ParagraphLorem />
                    <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                    <ParagraphLorem />
                </Details>
                
                <br />
                
                <Details theme='primary' label='An awesome thing' detailsStyle='content'>
                    <ParagraphLorem />
                    <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                    <ParagraphLorem />
                </Details>
                
                <br />
                
                <Details theme='primary' label='An awesome thing' bodyComponent={<Content />}>
                    <ParagraphLorem />
                    <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                    <ParagraphLorem />
                </Details>
                
                <br />
                
                <Details theme='primary' label='An awesome thing' bodyComponent={<Content />} detailsStyle='content'>
                    <ParagraphLorem />
                    <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                    <ParagraphLorem />
                </Details>
            </div>
        </>
    );
}

export default App;
