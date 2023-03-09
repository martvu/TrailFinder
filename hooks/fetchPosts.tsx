import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, doc, getDoc, where } from 'firebase/firestore'
import { db, firestore } from '../firebase/firebase'
import { useAuth, useFetchUser } from 'context/AuthContext'
import { PostData } from './PostData'

export default function useFetchPosts() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentPostsList, setRecentPostsList] = useState([] as PostData[])
  const [likedPostsList, setLikedPostsList] = useState([] as PostData[])
  const [usersPostsList, setUsersPostsList] = useState([] as PostData[])
  const { currentUser } = useAuth()
  const { userData } = useFetchUser()
  
  useEffect(() => {
    async function fetchRecent() {
      if (currentUser) {
        console.log(currentUser)
        try {
          const postsQuery = query(collection(firestore, 'posts'), orderBy('date', 'desc'));
          const querySnapshot = await getDocs(postsQuery);
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
  }, [currentUser]) 

  /* useEffect(() => {
    async function fetchLiked() {
      if (currentUser) {
        console.log(currentUser)
        try {
          const docRef = doc(firestore, 'users', currentUser.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const likedPostsRefs = docSnap.data().userLikes
            const postsQuery = query(collection(firestore, 'posts'), where('__name__', 'in', likedPostsRefs) );
            const querySnapshot = await getDocs(postsQuery);
            const data = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id} as PostData));
            setLikedPostsList(data);
            //const likedPostsDocs = await Promise.all(likedPostsRefs.map((ref: { get: () => any }) => ref.get()));
            //const likedPosts = likedPostsDocs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('likedPostsRefs:', likedPostsRefs);

            //setLikedPostsList(likedPosts);

          } else {
            console.log('did not find anyting');
          }
       

        } catch (err) {
          setError('Failed to load data')
          console.log(err)

        } finally {
          setLoading(false)

        }
      }
    }
    fetchLiked()
  }, [currentUser]) 

  useEffect(() => {
    async function fetchUsersPosts() {
      if (currentUser) {
        console.log(currentUser)
        try {
          const postsQuery = query(collection(firestore, 'posts'), where('username', '==', userData.username));
          const querySnapshot = await getDocs(postsQuery);
          const data = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id} as PostData));
          setUsersPostsList(data);
          console.log(userData.username)
          console.log(data)
        } catch (err) {
          setError('Failed to load data')
          console.log(err)

        } finally {
          setLoading(false)

        }
      }
    }
    fetchUsersPosts()
  }, [currentUser, userData.username])  */
  /* render */

  return { loading, error, recentPostsList , likedPostsList, setLikedPostsList , usersPostsList, setUsersPostsList};
}
