import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Pagination,
} from '@reusable-ui/pagination'
import {
    ListItem,
} from '@reusable-ui/list'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { NavNextItem, NavPrevItem } from '@reusable-ui/nav';



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [selectedIndex, setSelectedIndex]  = useState(-1);
    
    const listArr = new Array<number>(30);
    for (let i = 0; i < 30; i++) listArr[i] = i;
    
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
                <Pagination theme='primary'
                    itemsLimit={10}
                    orientation='inline'
                    prevItems={
                        <NavPrevItem
                            onClick={() => setSelectedIndex(0)}
                        />
                    }
                    nextItems={
                        <NavNextItem
                            onClick={() => setSelectedIndex(listArr.length - 1)}
                        />
                    }
                >
                    {listArr.map((index) => {
                        return (
                            <ListItem
                                key={index}
                                active={(selectedIndex === index)}
                                onClick={() => setSelectedIndex(index)}
                            >
                                {index + 1}
                            </ListItem>
                        );
                    })}
                </Pagination>
            </div>
        </>
    );
}

export default App;
