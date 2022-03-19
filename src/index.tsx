import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CustomTheme from './theme/custom.theme';
import App from './App';
import { SnackbarProvider } from 'notistack';
import AppContextProvider from './components/context/app.context';
import WalletContextProvider from './components/context/wallet.context';
import QuizContextProvider from './components/context/quiz.context';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={CustomTheme}>
            <SnackbarProvider maxSnack={5}>
                <AppContextProvider>
                    <WalletContextProvider>
                        <QuizContextProvider>
                            <BrowserRouter>
                                <CssBaseline />
                                <App />
                            </BrowserRouter>
                        </QuizContextProvider>
                    </WalletContextProvider>
                </AppContextProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
reportWebVitals();
