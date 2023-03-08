import React, {
  useContext, useState, useEffect, createContext, useMemo,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

type UserType = {
  firstname: string;
  lastname: string;
  username: string;
  birthdate: any;
  isAdmin: boolean;
  email: string;
};

const emptyUser: UserType = {
  firstname: '',
  lastname: '',
  username: '',
  birthdate: '',
  isAdmin: false,
  email: '',
};

type AuthContextType = {
  currentUser: User | null;
};

type UserContextType = {
  userData: UserType;
  setUserData: (newUserData: UserType) => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

const UserContext = createContext<UserContextType>({
  userData: emptyUser,
  setUserData: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function useFetchUser() {
  return useContext(UserContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserType>(emptyUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        console.log(currentUser);
        try {
          const docRef = doc(firestore, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userInfo: UserType = {
              firstname: docSnap.data().firstname,
              lastname: docSnap.data().lastname,
              username: docSnap.data().username,
              birthdate: docSnap.data().birthdate.toDate().toLocaleDateString(),
              isAdmin: docSnap.data().isAdmin,
              email: currentUser.email || '',
            };
            setUserData(userInfo);
          } else {
            setUserData(emptyUser);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchUserData();
    return () => {};
  }, [currentUser]);

  const value = useMemo(() => ({
    currentUser,
  }), [currentUser]);

  const userValue = useMemo(() => ({
    userData,
    setUserData,
  }), [userData]);

  return (
    <AuthContext.Provider value={value}>
      <UserContext.Provider value={userValue}>
        {!loading && children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
