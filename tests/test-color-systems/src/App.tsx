import {
    default as React,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Icon,
} from '@reusable-ui/icon'
import {
    EditableActionControl,
} from '@reusable-ui/editable-action-control'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className="App" style={{ color: 'darkred' }}>
                <p>
                    <Icon icon='face' mild={false} /> <Icon icon='instagram' mild={false} /> [no theme] dark_red.
                </p>
                <p>
                    <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /> [no theme] dark_red.
                </p>
                
                <hr />
                
                <p>
                    <Icon icon='face' theme='primary' mild={false} /> <Icon icon='instagram' theme='primary' mild={false} /> [has theme] blue.
                </p>
                <p>
                    <Icon icon='face' theme='primary' mild={true} /> <Icon icon='instagram' theme='primary' mild={true} /> [has theme] mild_blue.
                </p>
                
                <hr />
                
                <EditableActionControl gradient={true} theme='primary' mild={false}>
                    <p>
                        <Icon icon='face' /> <Icon icon='instagram' /> [no theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /> [no theme] background_color.
                    </p>
                    
                    <hr />
                    
                    <p>
                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /> [has theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /> [has theme] background_color.
                    </p>
                </EditableActionControl>
                <EditableActionControl gradient={true} theme='primary' mild={true}>
                    <p>
                        <Icon icon='face' /> <Icon icon='instagram' /> [no theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /> [no theme] background_color.
                    </p>
                    
                    <hr />
                    
                    <p>
                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /> [has theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /> [has theme] background_color.
                    </p>
                </EditableActionControl>
                
                <hr />
                
                <EditableActionControl gradient={true} theme='primary' enableValidation={true} isValid={false} mild={false}>
                    <p>
                        <Icon icon='face' /> <Icon icon='instagram' /> [no theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /> [no theme] background_color.
                    </p>
                    
                    <hr />
                    
                    <p>
                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /> [has theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /> [has theme] background_color.
                    </p>
                </EditableActionControl>
                <EditableActionControl gradient={true} theme='primary' enableValidation={true} isValid={false} mild={true}>
                    <p>
                        <Icon icon='face' /> <Icon icon='instagram' /> [no theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /> [no theme] background_color.
                    </p>
                    
                    <hr />
                    
                    <p>
                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /> [has theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /> [has theme] background_color.
                    </p>
                </EditableActionControl>
                
                <hr />
                
                <EditableActionControl gradient={true} theme='primary' enableValidation={true} isValid={true} mild={false}>
                    <p>
                        <Icon icon='face' /> <Icon icon='instagram' /> [no theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /> [no theme] background_color.
                    </p>
                    
                    <hr />
                    
                    <p>
                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /> [has theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /> [has theme] background_color.
                    </p>
                </EditableActionControl>
                <EditableActionControl gradient={true} theme='primary' enableValidation={true} isValid={true} mild={true}>
                    <p>
                        <Icon icon='face' /> <Icon icon='instagram' /> [no theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' mild={true} /> <Icon icon='instagram' mild={true} /> [no theme] background_color.
                    </p>
                    
                    <hr />
                    
                    <p>
                        <Icon icon='face' theme='warning' /> <Icon icon='instagram' theme='warning' /> [has theme] alternate_background_color.
                    </p>
                    <p>
                        <Icon icon='face' theme='warning' mild={true} /> <Icon icon='instagram' theme='warning' mild={true} /> [has theme] background_color.
                    </p>
                </EditableActionControl>
            </div>
        </>
    );
}

export default App;
