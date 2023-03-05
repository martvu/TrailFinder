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
  const [likeCounter, setLikeCounter] = useState(post.likedBy?.length);
  const [isDisabled, setIsDisabled] = useState(false);
  const [likedBy, setLikedBy] = useState(post.likedBy);

  async function handleLike() {

    if (isDisabled) {
      return;
    }
    setIsDisabled(true);

    const docRef = doc(firestore, "posts", "post: " + post.id);
    const docSnap = await getDoc(docRef);

    /* can swap username to uid if necessary*/
    if (docSnap.exists()) {
      const post = docSnap.data();
      const likedBy = post.likedBy || [];
      if (!isLiked && !likedBy.includes(userData.username)) {
        likedBy.push(userData.username);
        setLikeCounter(likeCounter + 1);
      } else {
        const index = likedBy.indexOf(userData.username);
        if (index !== -1) likedBy.splice(index, 1);
        setLikeCounter(likeCounter - 1);

      }
      await updateDoc(docRef, { likedBy });
      setIsLiked(!isLiked);
      setLikedBy(likedBy)
      setIsDisabled(false);
    }
  }


  return (
    <div className={className}>
      <div className={`${isLiked ? "text-red-400" : ""} relative group flex flex-row items-center`}>

        {likedBy.length > 0 && (
          <div className="absolute bottom-full bg-white text-sm text-gray-500 px-2 py-1 rounded-md 
          shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {likedBy.slice(0, 5).join(", ")}
            {likedBy.length > 5 && (
              <span> and {likedBy.length - 5} more</span>
            )}
          </div>
        )}

        <div className='cursor-pointer flex flex-row justify-center items-center'
          onClick={handleLike}>
          {/* <i className={`fa-regular fa-heart ${isLiked? " text-red-400": ""} 
          btn btn-sm btn-circle`}></i> */}

          {/* alternative heart */}
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${isLiked ? "text-red-400" : ""} 
            h-8 w-8 hover:scale-110 text-gray-400" hover:text-red-400 focus:text-red-400 
            hover:bg-gray-200 rounded-full p-1 transition-colors duration-200 ease-in-out`} 
            fill={isLiked ? "currentColor" : "none"}
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 
                7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className='text-sm'>
            {likeCounter}
          </div>
        
        </div>
      </div>
    </div>
  );
}





