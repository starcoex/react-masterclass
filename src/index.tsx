import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Reset } from 'styled-reset';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Reset />
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);