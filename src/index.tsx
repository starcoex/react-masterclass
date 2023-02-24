import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Reset } from 'styled-reset';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <Reset />
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);