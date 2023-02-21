import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();
  const { currentUser } = useAuth();

  if (!currentUser) {
    useEffect(() => {
      router.push('/login');
    }, []);
  } else {
    useEffect(() => {
      router.push('/home');
    }, []);
  } 
  
  
  return (
    <>
      <Head>
        <title>Trailfinder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    </>
  )
}
