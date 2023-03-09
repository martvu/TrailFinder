import React, { useEffect, useState } from "react";
import Header from "./Header";
import 'firebase/firestore'
import useFetchPosts from "hooks/fetchPosts";
import PostCard from "./PostCard";
import { useFetchUser } from "context/AuthContext";
import { PostData } from "hooks/PostData";



export default function Profile({ setEdit }: any) {
  const { userData } = useFetchUser();
  const { recentPostsList } = useFetchPosts();
  const myPosts = recentPostsList.filter(post => post.username == userData?.username);
  const likedPosts = recentPostsList.filter(post => post.likedBy.includes(userData?.username) && post.username != userData?.username); 
  const [filterMyPosts, setFilterMyPosts] = useState(true);
  const [filterLikedPosts, setFilterLikedPosts] = useState(false);

  function handleFilterMyPostsClick() {
    setFilterMyPosts(true);
    setFilterLikedPosts(false);
  }

  function handleFilterLikedPostsClick() {
    setFilterMyPosts(false);
    setFilterLikedPosts(true);
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
                        className="btn btn-sm btn-outline border border-solid border-secondary text-base py-1 px-12 rounded text-xs flex items-center justify-center"
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

              <button onClick={handleFilterMyPostsClick} className={`${filterMyPosts ? 'btn-primary text-lg text-neutral font-extrabold' : ''} 
              btn flex-1 text-center p-3 justify-center font-bold cursor-pointer`}>
                My posts  <i className="mx-2 mb-1 fa-solid fa-user"></i>
              </button>

              <button onClick={handleFilterLikedPostsClick} className={`${filterLikedPosts ? 'btn-accent text-lg text-neutral font-extrabold' : ''} 
              btn flex-1 text-center p-3 font-bold cursor-pointer`}>
                Liked posts <i className="mx-2 fa-solid fa-heart"></i>
              </button>

            </div>

            {filterLikedPosts && likedPosts.map((post) => (
              <div key={post.id} className="mb-2">
                <PostCard post={post} />
              </div>
            ))}
            {filterMyPosts &&myPosts.map((post) => (
              <div key={post.id} className="mb-2">
                <PostCard post={post} />
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
