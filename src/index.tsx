import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CustomTheme from './theme/custom.theme';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={CustomTheme}>
            <BrowserRouter>
                <CssBaseline />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
reportWebVitals();
