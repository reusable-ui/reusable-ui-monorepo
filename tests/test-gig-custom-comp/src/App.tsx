import styles from './App.module.css'
import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import {
    Accordion,
    AccordionItem,
    Content,
    Group,
    Icon,
    Label,
    Tab,
    TabPanel,
} from '@reusable-ui/components'
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
            <Content className={styles.page} theme='primary' gradient>
                <Tab
                    theme='secondary'
                    size='lg'
                    gradient={false}
                    defaultExpandedTabIndex={1}
                    bodyComponent={<Content size='lg' />}
                >
                    <TabPanel label='React'>
                        <p>The detail of second item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='Custom Components'>
                        <Accordion theme='primary'>
                            <AccordionItem bodyComponent={<Content className={styles.accordionItem} />} label={<h3><Icon icon='account_tree' /> Composition</h3>} defaultExpanded={true}>
                                <p>
                                    Made up from <code>JSX</code> &amp; <code>props</code> with <em>minimal</em> vanilla JS.
                                </p>
                                <p>
                                    No <code>JQuery</code>. Everything is written in <em>react way</em>.
                                </p>
                            </AccordionItem>
                            <AccordionItem bodyComponent={<Content className={styles.accordionItem} />} label={<h3><Icon icon='format_list_bulleted' /> Intellisense Friendly</h3>} defaultExpanded={true}>
                                <p>
                                    Written in <strong>TypeScript</strong>. Useful for <em>VS Code</em> suggestion dropdown &amp; autocomplete.
                                </p>
                            </AccordionItem>
                            <AccordionItem bodyComponent={<Content className={styles.accordionItem} />} label={<h3><Icon icon='color_lens' /> Theme-able</h3>} defaultExpanded={true}>
                                <p style={{display: 'inline'}}>
                                    Contextual theme:
                                </p>
                                <Group style={{display: 'inline-flex', marginInlineStart: '1rem'}}>
                                    <Label theme='primary' mild={false}>Primary</Label>
                                    <Label theme='danger' mild={false}>Danger</Label>
                                    <Label theme='success' mild={false}>Success</Label>
                                    <Label theme='warning' mild={false}>Warning</Label>
                                    <Label theme='dark' mild={false}>Custom 1</Label>
                                    <Label theme='info' mild={false}>Custom 2</Label>
                                </Group>
                            </AccordionItem>
                            <AccordionItem bodyComponent={<Content className={styles.accordionItem} />} label={<h3><Icon icon='tune' /> Customizable</h3>} defaultExpanded={true}>
                                <p>
                                    Using css variables <code>--cust-something: 2em;</code> to customize the component.
                                </p>
                                <p>
                                    No <em>SASS variables</em>, everything are <code>CSS variables</code>.
                                </p>
                            </AccordionItem>
                        </Accordion>
                    </TabPanel>
                    <TabPanel label='Samples'>
                        <p>The detail of second item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                    <TabPanel label='From Figma'>
                        <p>The detail of third item.</p>
                        <ParagraphLorem />
                        <ParagraphLorem />
                    </TabPanel>
                </Tab>
            </Content>
        </>
    );
}

export default App;
