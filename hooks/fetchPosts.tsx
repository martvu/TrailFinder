import React, {
  useState, useEffect, useContext, createContext, useMemo,
} from 'react';
import {
  collection, getDocs, query, orderBy,
} from 'firebase/firestore';
import { useAuth } from 'context/AuthContext';
import { get, ref } from 'firebase/database';
import { firestore, db } from '../firebase/firebase';
import { PostData } from './PostData';

type PostsProps = {
  loading : boolean;
  error : string;
  recentPostsList : PostData[];
};

const PostsContext = createContext<PostsProps>({
  loading: true,
  error: '',
  recentPostsList: [],
});

export function usePosts() {
  return useContext(PostsContext);
}

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentPostsList, setRecentPostsList] = useState<PostData[]>([]);
  const { currentUser } = useAuth();

  /** fetch posts ordered by most recent */
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

  const value : PostsProps = useMemo(() => ({
    loading,
    error,
    recentPostsList,
  }), [error, loading, recentPostsList]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}
