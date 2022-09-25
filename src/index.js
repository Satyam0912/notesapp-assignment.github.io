import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NotesContextProvider } from './Contests/NotesContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </React.StrictMode>
);
