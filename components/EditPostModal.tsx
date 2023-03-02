"use client";
import { firestore } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { PostModal } from "./PostModal";
import { PostData } from "hooks/PostData";

type Props = {
	postData: PostData;
};

export function EditPostModal({ postData }: Props) {
  const [post, setPost] = useState(postData);

  async function updatePost() {
    const docRef = doc(firestore, "posts", "post: " + post.id);

    try {
      await updateDoc(docRef, post);
      window.location.reload();
      console.log("Update successful");
    } catch (error) {
      console.log(error);
    }
  }
  return PostModal({
    post,
    setPost,
    finish: updatePost,
    modalData: {
      modalId: "edit-modal",
      title: "Edit Post",
      buttonName: "Update",
    },
  });
}
