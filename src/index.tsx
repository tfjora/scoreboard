import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import App from './App';
import { msalConfig } from './authConfig';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const msalInstance = new PublicClientApplication(msalConfig);

root.render(
    <MsalProvider instance={msalInstance}>
        <ToastProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ToastProvider>
    </MsalProvider>
);
