import { firestore } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { PostData } from 'hooks/PostData';
import React, { useState } from 'react'
import { useFetchUser } from 'context/AuthContext';

interface Props {
  className?: string;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  isLiked: boolean;
  post: PostData;
}

export default function HeartButton({ className, setIsLiked, isLiked, post }: Props) {
  const { userData } = useFetchUser();
  const [likeCounter, setLikeCounter] = useState(post.likes.length);
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleLike() {

    if (isDisabled) {
      return;
    }
    setIsDisabled(true);

    const docRef = doc(firestore, "posts", "post: " + post.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const post = docSnap.data();
      const likes = post.likes || [];
      if (!isLiked && !likes.includes(userData.username)) {
        likes.push(userData.username);
        setLikeCounter(likeCounter + 1);
      } else {
        const index = likes.indexOf(userData.username);
        if (index !== -1) likes.splice(index, 1);
        setLikeCounter(likeCounter - 1);

      }
      await updateDoc(docRef, { likes });
      setIsLiked(!isLiked);
      setIsDisabled(false);
    }
  }


  return (
    <div className={className}>
      <div className={`${isLiked ? "text-red-400" : ""} flex flex-row items-center`}>
        <div className='cursor-pointer'
          onClick={handleLike}
        >
          {/* <i className={`fa-regular fa-heart ${isLiked? "text-neutral btn-error": "btn-neutral"} 
          btn btn-sm btn-circle`}></i> */}

          {/* alternative heart */}
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${isLiked ? "text-red-400" : ""} 
            h-6 w-6 hover:scale-110`} fill={isLiked ? "currentColor" : "none"}
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <div className='text-sm text-secondary'>
          {likeCounter}
        </div>
      </div>
    </div>
  );
}





