"use client";
import { firestore } from "../firebase/firebase";
import { Timestamp, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useFetchUser } from "context/AuthContext";
import { PostInfo, PostData } from "hooks/PostData";
import { PostModal } from "./PostModal";


export function CreatePostModal() {
  const emptyPost: PostData = {
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

  function createPostInfo() {
    const now = new Date(Date.now());
    const nowDate = now.toString();
    if (userData) {
      const newPost: PostInfo = {
        ...post,
        date: Timestamp.now(),
        username: userData.username,
      };
      return newPost;
    }
  }

  async function handleAddPost() {
    const newPost = createPostInfo();
    console.log(newPost);
    if (newPost) {
      const postRef = collection(firestore, "posts");
      await addDoc(postRef, newPost);

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
