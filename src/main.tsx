import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { DemoProvider } from './state/useDemoState';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </DemoProvider>
  </React.StrictMode>,
);
