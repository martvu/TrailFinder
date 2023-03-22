'use client';

import {
  addDoc, collection, Timestamp, updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { useFetchUser } from 'context/AuthContext';
import { PostData } from 'hooks/PostData';
import { firestore } from '../firebase/firebase';
import PostModal from './PostModal';

export default function CreatePostModal() {
  const emptyPost: PostData = {
    id: '',
    date: Timestamp.now(),
    username: '',
    title: '',
    length: '',
    price: '',
    rating: 5,
    stops: [],
    description: '',
    likedBy: [],
    reports: [],
    uid: '',
  };
  const [post, setPost] = useState<PostData>(emptyPost);
  const { userData } = useFetchUser();

  function createPostData() {
    if (userData) {
      const newPost: PostData = {
        ...post,
        date: Timestamp.now(),
        username: userData.username,
        uid: userData.uid,
      };
      return newPost;
    } return false;
  }

  async function handleAddPost() {
    const newPost = createPostData();
    console.log(newPost);
    if (newPost) {
      const newDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      await updateDoc(newDocRef, { ...newPost, id: newDocRef.id });
      console.log('Successful');
      window.location.reload();
    }
  }

  return PostModal({
    post,
    setPost,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    finish: handleAddPost,
    modalData: {
      modalId: 'create-modal',
      title: 'New Post',
      buttonName: 'Publish',
    },
  });
}
