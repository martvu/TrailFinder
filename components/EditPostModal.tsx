'use client';

import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { PostData } from 'hooks/PostData';
import PostModal from './PostModal';
import { firestore } from '../firebase/firebase';

type Props = {
  postData: PostData;
};

export default function EditPostModal({ postData }: Props) {
  const [post, setPost] = useState(postData);

  async function updatePost() {
    const docRef = doc(firestore, 'posts', `post: ${post.id}`);

    try {
      await updateDoc(docRef, post);
      window.location.reload();
      console.log('Update successful');
    } catch (error) {
      console.log(error);
    }
  }
  return PostModal({
    post,
    setPost,
    finish: updatePost,
    modalData: {
      modalId: 'edit-modal',
      title: 'Edit Post',
      buttonName: 'Update',
    },
  });
}
