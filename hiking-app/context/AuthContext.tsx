import React, { useContext, useState, useEffect, createContext } from 'react'
import { auth, db } from '../firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'

type AuthContextType = {
  currentUser: User | null;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
      currentUser,
    } as unknown as { currentUser: User | null};
  
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}