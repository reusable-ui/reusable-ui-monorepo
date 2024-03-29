import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  DialogMessageProvider,
} from '@reusable-ui/dialog-message'
import { Card } from '@reusable-ui/components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <DialogMessageProvider cardComponent={<Card theme='primary' />}>
    <App />
  </DialogMessageProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
