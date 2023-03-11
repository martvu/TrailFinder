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
  const { currentUser } = useAuth();
  const { userData } = useFetchUser();
  
  /** fetch posts ordered by most recent*/
  useEffect(() => {
    async function fetchRecent() {
      if (currentUser) {
        console.log(currentUser);
        try {
          const recentQuery = query(collection(firestore, 'posts'), orderBy('date', 'desc'));
          const querySnapshot = await getDocs(recentQuery);
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


  return {
    loading,
    error,
    recentPostsList
  };
}
