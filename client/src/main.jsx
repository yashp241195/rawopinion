import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { ApolloProvider, } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';
import { GOOGLE_AUTH_CLIENT, } from './config/config.jsx'

import App from './App.jsx'
import client from './Apollo.jsx'
import theme from './Theme.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </ApolloProvider>,
);

registerSW({ });