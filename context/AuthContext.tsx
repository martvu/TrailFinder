import React, {
  useContext, useState, useEffect, createContext, useMemo,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

type UserType = {
  firstname: string;
  lastname: string;
  username: string;
  birthdate: Timestamp;
  isAdmin: boolean;
  email: string;
  uid: string;
  userLikes: string[];
  profilePicture: string | null;
};

const emptyUser: UserType = {
  firstname: '',
  lastname: '',
  username: '',
  birthdate: Timestamp.now(),
  isAdmin: false,
  email: '',
  uid: '',
  userLikes: [],
  profilePicture: '',
};

type AuthContextType = {
  currentUser: User | null;
};

type FirebaseUserData = {
  firstname: string;
  lastname: string;
  username: string;
  birthdate: Timestamp;
  isAdmin: boolean;
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
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        try {
          const docRef = doc(firestore, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const firebaseData = docSnap.data() as FirebaseUserData;
            const userInfo: UserType = {
              ...firebaseData,
              email: currentUser.email || '',
              uid: currentUser.uid,
              userLikes: [],
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              profilePicture: docSnap.data().profilePicture,
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchUserData();
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
