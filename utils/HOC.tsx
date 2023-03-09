import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function AuthHoc(Component: React.FC) {
  return function AuthHocComponent() {
    const { currentUser } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!currentUser) {
        router.push('/login').catch((e) => console.log(e));
      }
    }, [currentUser, router]);
    return <Component />;
  };
}
