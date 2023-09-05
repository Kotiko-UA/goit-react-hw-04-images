import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { GlobalStyle } from 'GlobalStyle';
import { Toaster } from 'react-hot-toast';
// import './components/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
    <Toaster />
  </React.StrictMode>
);
