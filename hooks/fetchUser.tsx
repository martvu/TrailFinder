import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import { useAuth } from 'context/AuthContext'

type User = {
  firstname: string;
  lastname: string;
  username:string;
  birthdate: any;
  isAdmin: boolean;
  email:string;
}

const emptyUser: User = {
  firstname: '',
  lastname: '',
  username: '',
  birthdate: '',
  isAdmin: false,
  email: '',
};

export default function useFetchUser() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<User | null>(emptyUser)
  const { currentUser } = useAuth()
  
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        console.log(currentUser)
        try {
          const docRef = doc(firestore, 'users', currentUser.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const userInfo: User = {
              firstname: docSnap.data().firstname,
              lastname: docSnap.data().lastname,
              username: docSnap.data().username,
              birthdate: docSnap.data().birthdate,
              isAdmin: docSnap.data().isAdmin,
              email: docSnap.data().email
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
    fetchData()
  }, [currentUser])

  return ({ loading, error, userData, setUserData });
}