import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Icon,
} from '@reusable-ui/icon'
import {
    Check,
} from '@reusable-ui/check'
import {
    ButtonIcon,
} from '@reusable-ui/button-icon'
import {
    EditableControl,
} from '@reusable-ui/editable-control'
import {
    EmailInput,
} from '@reusable-ui/input'
import {
    List,
    ListItem,
} from '@reusable-ui/list'
import {
    Alert,
} from '@reusable-ui/alert'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [enableValidation, setEnableValidation] = useState<boolean>(true);
    
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className="App" style={{ color: 'darkred' }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <p>
                                    <Icon icon='face' mild={false} /> <Icon icon='instagram' mild={false} /><ButtonIcon icon='instagram' mild={false} >Test</ButtonIcon> [strong] dark_red.
                                </p>
                                <p>
                                    <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon> [mild] dark_red.
                                </p>
                                <p>
                                    <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' outlined={true} >Test</ButtonIcon> [outlined] dark_red.
                                </p>
                            </td>
                            <td>
                                <p>
                                    <Icon icon='face' theme='primary' mild={false} /> <Icon icon='instagram' theme='primary' mild={false} /><ButtonIcon icon='instagram' theme='primary' mild={false} >Test</ButtonIcon> [strong] blue.
                                </p>
                                <p>
                                    <Icon icon='face' theme='primary' mild={true} /> <Icon icon='instagram' theme='primary' mild={true} /><ButtonIcon icon='instagram' theme='primary' mild={true} >Test</ButtonIcon> [mild] mild_blue.
                                </p>
                                <p>
                                    <Icon icon='face' theme='primary' mild={true} /> <Icon icon='instagram' theme='primary' mild={true} /><ButtonIcon icon='instagram' theme='primary' outlined={true} >Test</ButtonIcon> [outlined] mild_blue.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><hr /></td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' mild={false}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' mild={false}>
                                    <p>
                                        <Icon icon='face' theme='danger' /> <Icon icon='instagram' theme='danger' /><ButtonIcon icon='instagram' theme='danger' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='danger' mild={true} /> <Icon icon='instagram' theme='danger' mild={true} /><ButtonIcon icon='instagram' theme='danger' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' mild={true}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' mild={true}>
                                    <p>
                                        <Icon icon='face' theme='danger' /> <Icon icon='instagram' theme='danger' /><ButtonIcon icon='instagram' theme='danger' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='danger' mild={true} /> <Icon icon='instagram' theme='danger' mild={true} /><ButtonIcon icon='instagram' theme='danger' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' outlined={true}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' outlined={true}>
                                    <p>
                                        <Icon icon='face' theme='danger' /> <Icon icon='instagram' theme='danger' /><ButtonIcon icon='instagram' theme='danger' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='danger' mild={true} /> <Icon icon='instagram' theme='danger' mild={true} /><ButtonIcon icon='instagram' theme='danger' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='warning' mild={false}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='warning' mild={false}>
                                    <p>
                                        <Icon icon='face' theme='danger' /> <Icon icon='instagram' theme='danger' /><ButtonIcon icon='instagram' theme='danger' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='danger' mild={true} /> <Icon icon='instagram' theme='danger' mild={true} /><ButtonIcon icon='instagram' theme='danger' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='warning' mild={true}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='warning' mild={true}>
                                    <p>
                                        <Icon icon='face' theme='danger' /> <Icon icon='instagram' theme='danger' /><ButtonIcon icon='instagram' theme='danger' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='danger' mild={true} /> <Icon icon='instagram' theme='danger' mild={true} /><ButtonIcon icon='instagram' theme='danger' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='warning' outlined={true}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='warning' outlined={true}>
                                    <p>
                                        <Icon icon='face' theme='danger' /> <Icon icon='instagram' theme='danger' /><ButtonIcon icon='instagram' theme='danger' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='danger' mild={true} /> <Icon icon='instagram' theme='danger' mild={true} /><ButtonIcon icon='instagram' theme='danger' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><hr /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Check theme='primary' checkStyle='switch' active={enableValidation} onActiveChange={(event) => setEnableValidation(event.active)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={false} mild={false}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={false} mild={false}>
                                    <p>
                                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /><ButtonIcon icon='instagram' theme='warning' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /><ButtonIcon icon='instagram' theme='warning' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={false} mild={true}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={false} mild={true}>
                                    <p>
                                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /><ButtonIcon icon='instagram' theme='warning' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /><ButtonIcon icon='instagram' theme='warning' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={false} outlined={true}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={false} outlined={true}>
                                    <p>
                                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /><ButtonIcon icon='instagram' theme='warning' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /><ButtonIcon icon='instagram' theme='warning' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={true} mild={false}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={true} mild={false}>
                                    <p>
                                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /><ButtonIcon icon='instagram' theme='warning' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /><ButtonIcon icon='instagram' theme='warning' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={true} mild={true}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={true} mild={true}>
                                    <p>
                                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /><ButtonIcon icon='instagram' theme='warning' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /><ButtonIcon icon='instagram' theme='warning' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={true} outlined={true}>
                                    <p>
                                        <Icon icon='face' /> <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /><ButtonIcon icon='instagram' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                            <td>
                                <EditableControl gradient={true} theme='primary' enableValidation={enableValidation} isValid={true} outlined={true}>
                                    <p>
                                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /><ButtonIcon icon='instagram' theme='warning' >Test</ButtonIcon>
                                    </p>
                                    <p>
                                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /><ButtonIcon icon='instagram' theme='warning' mild={true} >Test</ButtonIcon>
                                    </p>
                                </EditableControl>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <hr />
                
                <List theme='primary'>
                    <ListItem>
                        light_blue
                    </ListItem>
                    <ListItem>
                        light_blue
                    </ListItem>
                    <ListItem active={true}>
                        blue
                    </ListItem>
                    <ListItem theme='success'>
                        light_green
                    </ListItem>
                    <ListItem theme='success' active={true}>
                        green
                    </ListItem>
                    <ListItem theme='danger'>
                        pink
                    </ListItem>
                    <ListItem theme='danger' active={true}>
                        red
                    </ListItem>
                </List>
                
                <hr />
                
                <Alert expanded={true} theme='primary' gradient={true} mild={false}>
                    <Icon icon='face' />
                    <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <EmailInput />
                </Alert>
                <Alert expanded={true} theme='primary' gradient={false} mild={false}>
                    <Icon icon='face' />
                    <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <EmailInput />
                </Alert>
                
                <Alert expanded={true} theme='primary' gradient={true} mild={true}>
                    <Icon icon='face' />
                    <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <EmailInput />
                </Alert>
                <Alert expanded={true} theme='primary' gradient={false} mild={true}>
                    <Icon icon='face' />
                    <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <EmailInput />
                </Alert>
                
                <Alert expanded={true} theme='primary' gradient={true} outlined={true}>
                    <Icon icon='face' />
                    <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <EmailInput />
                </Alert>
                <Alert expanded={true} theme='primary' gradient={false} outlined={true}>
                    <Icon icon='face' />
                    <Icon icon='instagram' /><ButtonIcon icon='instagram' >Test</ButtonIcon>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <EmailInput />
                </Alert>
            </div>
        </>
    );
}

export default App;
