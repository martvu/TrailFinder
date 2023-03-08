"use client";
import { firestore } from "../firebase/firebase";
import { Timestamp, doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useFetchUser } from "context/AuthContext";
import { PostData } from "hooks/PostData";
import { PostModal } from "./PostModal";


export function CreatePostModal() {
  const emptyPost: PostData= {
    id: "",
    date: Timestamp.now(),
    username: "",
    title: "",
    length: "",
    price: "",
    rating: 5,
    stops: [],
    description: "",
    likedBy: []
  };
  const [post, setPost] = useState<PostData>(emptyPost);
  const { userData } = useFetchUser();

  function createPostData() {
   
    if (userData) {
      const newPost: PostData = {
        ...post,
        date: Timestamp.now(),
        username: userData.username,
      };
      return newPost;
    }
  }

  async function handleAddPost() {
    const newPost = createPostData();
    console.log(newPost);
    if (newPost) {
      const postRef = collection(firestore, "posts");
      const newDocRef = await addDoc(postRef, newPost);
      await updateDoc(newDocRef, { ...newPost, id: newDocRef.id });
      console.log("Successful");
      window.location.reload();
    }
  }

  return PostModal({
    post,
    setPost,
    finish: handleAddPost,
    modalData: {
      modalId: "create-modal",
      title: "New Post",
      buttonName: "Publish",
    },
  });
}
