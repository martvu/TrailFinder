import React, { useContext, useState, useEffect, createContext } from 'react'
import { auth, firestore, storage } from '../firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';

type UserType = {
  firstname: string;
  lastname: string;
  username: string;
  birthdate: any;
  isAdmin: boolean;
  email: string;
  profilePicture?: string;
}

const emptyUser: UserType = {
  firstname: '',
  lastname: '',
  username: '',
  birthdate: '',
  isAdmin: false,
  email: '',
  profilePicture: '',
};

type AuthContextType = {
  currentUser: User | null;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (firstName: string, lastName: string, profilePicture: string | null) => Promise<void>;
};

type UserContextType = {
  userData: UserType;
  setUserData: (newUserData: UserType) => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateEmail: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
});

const UserContext = createContext<UserContextType>({
  userData: emptyUser,
  setUserData: () => {},
});


export function useAuth() {
  return useContext(AuthContext)
}

export function useFetchUser() {
  return useContext(UserContext)
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<UserType>(emptyUser)
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');


  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        console.log(currentUser)
        try {
          const docRef = doc(firestore, 'users', currentUser.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const userInfo: UserType = {
              firstname: docSnap.data().firstname,
              lastname: docSnap.data().lastname,
              username: docSnap.data().username,
              birthdate: docSnap.data().birthdate.toDate().toLocaleDateString(),
              isAdmin: docSnap.data().isAdmin,
              profilePicture: docSnap.data().profilePicture,
              email: currentUser.email || ""
            }
            setUserData(userInfo)
          } else {
            setUserData(emptyUser)
          }
        } catch (err) {
          setError('Failed to load data')
          console.log(err)

        } finally {
          setLoading(false)

        }
      }
    }
    fetchUserData()
    return () => {};
  }, [currentUser])

  const value = {
    currentUser
    

  };

  const userValue = {
    userData,
    setUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      <UserContext.Provider value={userValue}>
        {!loading && children}
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}