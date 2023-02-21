import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import { useAuth } from 'context/AuthContext'
import useFetchUser from './fetchUser'

export default function useFetchPosts() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [postList, setPostList] = useState([])
  const { currentUser } = useAuth()
  
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        console.log(currentUser)
        try {
          const postsQuery = query(collection(firestore, 'posts'), orderBy('date', 'desc'));
          const querySnapshot = await getDocs(postsQuery);
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          
          //@ts-ignore
          setPostList(data)

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
  /* render */

  return { loading, error, postList };
}
