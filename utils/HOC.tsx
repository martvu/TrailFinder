import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export function LoggedInHoc(Component: React.FC) {
  return function Wrapper() {
    const { currentUser } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!currentUser) {
        router.replace('/login').catch((e) => console.log(e));
      }
    }, [currentUser, router]);
    return <Component />;
  };
}

export function LoggedOutHoc(Component: React.FC) {
  return function Wrapper() {
    const { currentUser } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (currentUser) {
        router.replace('/').catch((e) => console.log(e));
      }
    }, [currentUser, router]);
    return <Component />;
  };
}
