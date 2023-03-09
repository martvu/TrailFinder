import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, doc, getDoc, where } from 'firebase/firestore'
import { db, firestore } from '../firebase/firebase'
import { useAuth, useFetchUser } from 'context/AuthContext'
import { PostData } from './PostData'

export default function useFetchPosts() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentPostsList, setRecentPostsList] = useState([] as PostData[])
  const { currentUser } = useAuth()
  const { userData } = useFetchUser()
  
  /** fetch posts ordered by most recent*/
  useEffect(() => {
    async function fetchRecent() {
      if (currentUser) {
        console.log(currentUser)
        try {
          const recentQuery = query(collection(firestore, 'posts'), orderBy('date', 'desc'));
          const querySnapshot = await getDocs(recentQuery);
          const data = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id} as PostData));
          setRecentPostsList(data);
        } catch (err) {
          setError('Failed to load data')
          console.log(err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchRecent()
    return () => {};
  }, [currentUser]) 


  return { loading, error, recentPostsList};
}
