import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalContextHandler from './GlobalContextHandler.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root') ?? document.createElement('root')).render(
  <React.StrictMode>
    <GlobalContextHandler>
      <App />
    </GlobalContextHandler> 
  </React.StrictMode>,
);
