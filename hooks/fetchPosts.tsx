import { useState, useEffect } from 'react';
import {
  collection, getDocs, query, orderBy, doc, getDoc, where,
} from 'firebase/firestore';
import { useAuth, useFetchUser } from 'context/AuthContext';
import { firestore } from '../firebase/firebase';
import { PostData } from './PostData';

export default function useFetchPosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentPostsList, setRecentPostsList] = useState([] as PostData[]);
  const [likedPostsList, setLikedPostsList] = useState([] as PostData[]);
  const [usersPostsList, setUsersPostsList] = useState([] as PostData[]);
  const { currentUser } = useAuth();
  const { userData } = useFetchUser();

  useEffect(() => {
    async function fetchRecent() {
      if (currentUser) {
        console.log(currentUser);
        try {
          const postsQuery = query(collection(firestore, 'posts'), orderBy('date', 'desc'));
          const querySnapshot = await getDocs(postsQuery);
          const data = querySnapshot.docs.map(
            (docc) => ({ ...docc.data(), id: docc.id } as PostData),
          );
          setRecentPostsList(data);
        } catch (err) {
          setError('Failed to load data');
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchRecent();
  }, [currentUser]);

  useEffect(() => {
    async function fetchLiked() {
      if (currentUser) {
        console.log(currentUser);
        try {
          const docRef = doc(firestore, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const likedPostsRefs = docSnap.data().userLikes as string[];
            const postsQuery = query(collection(firestore, 'posts'), where('__name__', 'in', likedPostsRefs));
            const querySnapshot = await getDocs(postsQuery);
            const data = querySnapshot.docs.map(
              (docc) => ({ ...docc.data(), id: docc.id } as PostData),
            );
            setLikedPostsList(data);
            console.log('likedPostsRefs:', likedPostsRefs);
          } else {
            console.log('did not find anyting');
          }
        } catch (err) {
          setError('Failed to load data');
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchLiked();
  }, [currentUser]);

  useEffect(() => {
    async function fetchUsersPosts() {
      if (currentUser) {
        console.log(currentUser);
        try {
          const postsQuery = query(collection(firestore, 'posts'), where('username', '==', userData.username));
          const querySnapshot = await getDocs(postsQuery);
          const data = querySnapshot.docs.map(
            (docc) => ({ ...docc.data(), id: docc.id } as PostData),
          );
          setUsersPostsList(data);
          console.log(userData.username);
          console.log(data);
        } catch (err) {
          setError('Failed to load data');
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchUsersPosts();
  }, [currentUser, userData.username]);
  /* render */

  return {
    loading,
    error,
    recentPostsList,
    likedPostsList,
    setLikedPostsList,
    usersPostsList,
    setUsersPostsList,
  };
}
