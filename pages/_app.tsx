import Layout from 'components/Layout';
import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from 'context/AuthContext';
import { ThemeProvider } from 'next-themes';
import { PostsProvider } from '../hooks/fetchPosts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="trailfinder_dark">
        <PostsProvider>
          <Layout>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Layout>
        </PostsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
