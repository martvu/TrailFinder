'use client';

import { Timestamp, doc, setDoc } from 'firebase/firestore';
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
  };
  const [post, setPost] = useState<PostData>(emptyPost);
  const { userData } = useFetchUser();

  function createPostData() {
    const now = new Date(Date.now());
    const nowDate = now.toString();
    if (userData) {
      const newPost: PostData = {
        ...post,
        id: nowDate,
        date: Timestamp.now(),
        username: userData.username,
      };
      return newPost;
    } return false;
  }

  async function handleAddPost() {
    const newPost = createPostData();
    console.log(newPost);
    if (newPost) {
      const postRef = doc(firestore, 'posts', `post: ${newPost.id}`);
      await setDoc(postRef, newPost);

      console.log('Successful');
      window.location.reload();
    }
  }

  return PostModal({
    post,
    setPost,
    finish: handleAddPost,
    modalData: {
      modalId: 'create-modal',
      title: 'New Post',
      buttonName: 'Publish',
    },
  });
}
