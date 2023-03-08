import Layout from 'components/Layout';
import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from 'context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
