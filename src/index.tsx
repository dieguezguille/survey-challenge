import { CssBaseline, ThemeProvider } from '@mui/material';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AppProvider from './contexts/app.context';
import SurveyContractProvider from './contexts/survey-contract.context';
import WalletProvider from './contexts/wallet.context';
import reportWebVitals from './reportWebVitals';
import CustomTheme from './theme/custom.theme';

const { REACT_APP_SENTRY_DSN } = process.env;

Sentry.init({
    dsn: REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={CustomTheme}>
            <SnackbarProvider maxSnack={5}>
                <AppProvider>
                    <WalletProvider>
                        <SurveyContractProvider>
                            <BrowserRouter>
                                <CssBaseline />
                                <App />
                            </BrowserRouter>
                        </SurveyContractProvider>
                    </WalletProvider>
                </AppProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
reportWebVitals();
