import Layout from 'components/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'context/AuthContext'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
    <ThemeProvider defaultTheme="trailfinder_dark">
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ThemeProvider>
    </AuthProvider>
  )
}