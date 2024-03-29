import styles from './App.module.css'
import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import {
    Tab,
    TabPanel,
} from '@reusable-ui/tab'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { Button } from '@reusable-ui/button';



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
    const [expandedTabIndex, setExpandedTabIndex] = useState(0);
    
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className={styles.demo}>
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
                
                <br />
                
                <Tab theme='primary' lazy expandedTabIndex={expandedTabIndex} onExpandedChange={(event) => setExpandedTabIndex(event.tabIndex)}>
                    <TabPanel label='first'>
                        <p>The detail of first item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='second'>
                        <p>The detail of second item.</p>
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='third'>
                        <p>The detail of third item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='disabled' enabled={false}>
                        <p>The detail of disabled item.</p>
                        <Button theme='primary'>Click me</Button>
                    </TabPanel>
                </Tab>
                
                <Tab headerComponent={null} theme='primary' lazy expandedTabIndex={expandedTabIndex} onExpandedChange={(event) => setExpandedTabIndex(event.tabIndex)}>
                    <TabPanel label='first'>
                        <p>The detail of first item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                    <>
                        <TabPanel label='second'>
                            <p>The detail of second item.</p>
                            <ParagraphLorem />
                        </TabPanel>
                        <TabPanel label='third'>
                            <p>The detail of third item.</p>
                            <ParagraphLorem />
                            <ParagraphLorem />
                            <ParagraphLorem />
                        </TabPanel>
                    </>
                    <TabPanel label='disabled' enabled={false}>
                        <p>The detail of disabled item.</p>
                        <Button theme='primary'>Click me</Button>
                    </TabPanel>
                </Tab>
                
                {/* <Tab theme='primary' outlined>
                    <TabPanel label='first'>
                        <p>The detail of first item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='second'>
                        <p>The detail of second item.</p>
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='third'>
                        <p>The detail of third item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                </Tab> */}
                
                {/* <Tab theme='primary' mild>
                    <TabPanel label='first'>
                        <p>The detail of first item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='second'>
                        <p>The detail of second item.</p>
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='third'>
                        <p>The detail of third item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                </Tab> */}
            </div>
        </>
    );
}

export default App;
