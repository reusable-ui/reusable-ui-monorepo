import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {borderRadiusValues, borderValues} from '@reusable-ui/core'

borderRadiusValues.md = '20px';
borderRadiusValues.lg = '50px';
borderValues.hair = '8px';
borderValues.style = 'dashed';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
