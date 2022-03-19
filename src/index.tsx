import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import App from './App';
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
reportWebVitals();
