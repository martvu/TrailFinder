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
    const docRef = doc(firestore, 'posts', post.id);

    try {
      await updateDoc(docRef, post);
      window.location.reload();
      console.log('Update successful');
    } catch (error) {
      console.log(error);
    }
  }
  const modalId = `edit-modal${post.id}`;
  return PostModal({
    post,
    setPost,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    finish: updatePost,
    modalData: {
      modalId,
      title: 'Edit Post',
      buttonName: 'Update',
    },
  });
}
