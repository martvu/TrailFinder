import React, { useEffect, useState } from "react";
import Header from "./Header";
import 'firebase/firestore'
import useFetchPosts from "hooks/fetchPosts";
import PostCard from "./PostCard";
import { useFetchUser } from "context/AuthContext";
import { PostData } from "hooks/PostData";



export default function Profile({ setEdit }: any) {
  const { userData } = useFetchUser();
  const { recentPostsList, likedPostsList, usersPostsList } = useFetchPosts();
  //const usersList = useState(recentPostsList.filter(post => post.username == userData?.username));
  //const likedPosts = recentPostsList.filter(post => post.likedBy.includes(userData?.username)); 
  const [myPosts, setMyPosts] = useState(true);
  const [likedPosts, setLikedPosts] = useState(false);
  const [myPostsArray, setMyPostsArray] = useState([] as PostData[]);
  const [likedPostsArray, setLikedPostsArray] = useState([] as PostData[]);

  useEffect(() => {
    setLikedPostsArray(likedPostsList);
    setMyPostsArray(usersPostsList)
  }, [likedPostsList, usersPostsList]);

  function handleMyPostsClick() {
    setMyPosts(true);
    setLikedPosts(false);
  }

  function handleLikedPostsClick() {
    setMyPosts(false);
    setLikedPosts(true);
  }

  /*Makes sure the likes update correctly in profile page */
  function onLike(post: PostData) {

    if (myPosts) {
      if (post.likedBy.includes(userData.username)) {
        const newLikedPostsList = likedPostsArray.filter((likedPost) => likedPost.id !== post.id);
        setLikedPostsArray(newLikedPostsList);
      } else {
        const newLikedPostsList = likedPostsArray.concat(post);
        setLikedPostsArray(newLikedPostsList);
      }
    }

    if (likedPosts) {
      if (post.likedBy.includes(userData.username)) {
        const newLikedPostsList = likedPostsArray.filter((likedPost) => likedPost.id !== post.id);
        setLikedPostsArray(newLikedPostsList);

        const unLikePost = myPostsArray.find(oldPost => oldPost.id === post.id);
        if (unLikePost) {
          const userIndex = unLikePost.likedBy.indexOf(userData.username);
          if (userIndex !== -1) unLikePost.likedBy.splice(userIndex, 1);
          const postIndex = myPostsArray.findIndex(p => p.id === post.id);

          if (postIndex !== -1) {
            const updatedPosts = [...myPostsArray.slice(0, postIndex), unLikePost, ...myPostsArray.slice(postIndex + 1)];
            setMyPostsArray(updatedPosts);
          }
        }
      }
    }
  }
  return (
    <>
      <Header />

      <div className="flex w-full p-4 justify-center items-center flex-col">
        <div className="flex w-full sm:w-4/5 justify-left rounded-md shadow-lg p-4 bg-neutral">

          <div className="flex p-4 justify-center items-center font-inter ">

            {userData && (
              <>
                <div className="p-5 mr-10 flex justify-center items-center border border-solid rounded-full grow-0 shrink-0 w-20 h-20">
                  <i className="fa-solid fa-user fa-3x"></i>
                </div>
                <div className="font-inter">
                </div>
                <div>
                  <div className="text-3xl pb-2 font-bold ">
                    {userData.firstname} {userData.lastname}
                  </div>
                  <div className="mb-2">
                    <p className="text-m">{userData.username}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-m">{userData.email}</p>
                  </div>
                  <div className="mb-2 flex items-center">
                    <i className="fa-solid fa-cake-candles mr-2"></i>
                    <p className="text-sm">{userData.birthdate}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="inline-flex mr-2">
                      <button
                        onClick={() => setEdit(true)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-12 rounded text-xs flex items-center justify-center"
                      >Edit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        <div className="flex w-full justify-center ">
          <div className="flex w-full flex-col sm:w-3/5">
            <div className="mt-3 mb-3 justify-between flex">

              <button onClick={handleMyPostsClick} className={`${myPosts ? 'btn-primary text-lg text-neutral font-extrabold' : ''} 
              btn flex-1 text-center p-3 justify-center font-bold cursor-pointer`}>
                My posts  <i className="mx-2 mb-1 fa-solid fa-user"></i>
              </button>

              <button onClick={handleLikedPostsClick} className={`${likedPosts ? 'btn-accent text-lg text-neutral font-extrabold' : ''} 
              btn flex-1 text-center p-3 font-bold cursor-pointer`}>
                Liked posts <i className="mx-2 fa-solid fa-heart"></i>
              </button>

            </div>

            {likedPosts && likedPostsArray.map((post) => (
              <div key={post.id} className="mb-2">
                <PostCard post={post} onLike={() => onLike(post)} />
              </div>
            ))}

            {myPosts && myPostsArray.map((post) => (
              <div key={post.id} className="mb-2">
                <PostCard post={post} onLike={() => onLike(post)} />
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
