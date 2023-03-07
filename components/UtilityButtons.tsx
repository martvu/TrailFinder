import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { EditPostModal } from "./EditPostModal";
import { firestore } from "../firebase/firebase";
import { PostData } from "hooks/PostData";
import { useFetchUser } from "context/AuthContext";

interface Props {
  className?: string;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostData;
}

function UtilityButtons({ className, setIsDeleted, post }: Props) {
  const  { userData } = useFetchUser();
  const adminState = userData?.isAdmin ?? false;

  async function deletePost() {

    if (adminState || post.username == userData?.username) {
      await deleteDoc(doc(firestore, 'posts', post.id ));
      setIsDeleted(true);
    }
    else {
      alert("You don't have permission to delete that post..")
    }
  }

  if (post.username != userData?.username && !adminState) return <></> // if the user isn't the author of the post, don't show the buttons

  return (
    <div className={className}>
      <div className="flex flex-row">
      <div onClick={deletePost}>
        <i className="fa-solid fa-trash-can cursor-pointer duration-100 hover:scale-110"></i>
      </div>
      {post.username == userData?.username ? (
        <>
          <div className="mx-2">
            <EditPostModal postData={post} />
            <label htmlFor="edit-modal">
              <i className="fa-solid fa-pen-to-square cursor-pointer duration-100 hover:scale-110"></i>
            </label>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>  
    </div>
  );
};

export default UtilityButtons;