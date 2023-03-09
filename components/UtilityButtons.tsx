import {
  arrayRemove, collection, deleteDoc, doc, getDocs, query, where, writeBatch,
} from 'firebase/firestore';
import React from 'react';
import { PostData } from 'hooks/PostData';
import { useFetchUser } from 'context/AuthContext';
import EditPostModal from './EditPostModal';
import { firestore } from '../firebase/firebase';

interface Props {
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostData;
}

function UtilityButtons({ setIsDeleted, post }: Props) {
  const { userData } = useFetchUser();
  const adminState = userData?.isAdmin ?? false;

  async function deletePost() {
    if (adminState || post.username === userData?.username) {
      await deleteDoc(doc(firestore, 'posts', post.id));
      const likesRef = collection(firestore, 'users');
      const q = query(likesRef, where('userLikes', 'array-contains', post.id));
      const querySnapshot = await getDocs(q);
      console.log('deleting');
      // 2. Remove the post ID from the `likes` array of each user who has liked the post.
      const batch = writeBatch(firestore);
      querySnapshot.forEach((docc) => {
        const userRef = docc.ref;
        console.log(docc);
        batch.update(userRef, { userLikes: arrayRemove(post.id) });
      });
      await batch.commit();
      setIsDeleted(true);
    } else {
      alert("You don't have permission to delete that post..");
    }
  }
  // if the user isn't the author of the post, don't show the buttons
  if (post.username !== userData?.username && !adminState) return null;

  return (
    <div className="absolute bottom-0 left-0 m-2">
      <div className="flex flex-row">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button title="Delete post" onClick={deletePost} type="button">
          <i className="fa-solid fa-trash-can cursor-pointer duration-100 hover:scale-110" />
        </button>
        {post.username === userData?.username ? (
          <div className="mx-2">
            <EditPostModal postData={post} />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="edit-modal">
              <i className="fa-solid fa-pen-to-square cursor-pointer duration-100 hover:scale-110" />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UtilityButtons;
