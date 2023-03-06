import React, { useState, useEffect, createContext, useContext } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import { useAuth } from 'context/AuthContext'
import { PostData } from '../types/PostData'

const FetchDataContext = createContext<PostData[]>({} as PostData[]);

export function useFetchPosts() {
  return useContext(FetchDataContext)
}

export default function FetchPostProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [postList, setPostList] = useState([] as PostData[])
  const { currentUser } = useAuth()
  
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        console.log(currentUser)
        try {
          const postsQuery = query(collection(firestore, 'posts'), orderBy('date', 'desc'));
          const querySnapshot = await getDocs(postsQuery);
          const data = querySnapshot.docs.map(doc => ({...doc.data() } as PostData))

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

  return (
    <FetchDataContext.Provider value={postList}>
      {children}
    </FetchDataContext.Provider>
  )
}