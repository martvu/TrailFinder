import React, { } from "react";
import Header from "./Header";
import 'firebase/firestore'
import useFetchUser from "hooks/fetchUser";
import useFetchPosts from "hooks/fetchPosts";
import PostCard from "./PostCard";



export default function Profile({ setEdit }: any) {
  const { userData, loading } = useFetchUser();
  const { postList } = useFetchPosts();

  const usersPosts = postList.filter(post => post.username == userData.username);
  console.log(usersPosts);
  return (
    <>
      <Header />
      
      <div className="flex w-full p-4 justify-center">
      
        <div className="flex flex-col">
  
          <div className="flex w-full justify-left rounded-md shadow-md p-4">
         
            <div className="flex p-4 justify-center items-center font-inter ">

              {/* loading userData */}
              {(loading) && (<div className='flex-1 grid place-items-center'>
                <i className="fa-solid fa-spinner fa-xl animate-spin opacity-40"></i>
              </div>)}
              
              {/* show userData when finished loading*/}
              {(!loading) && userData && (
                <>
                  <div className="p-5 mr-10 flex justify-center items-center border border-solid rounded-full grow-0 shrink-0 w-21 h-21 border-black">
                    <i className="fa-solid fa-user fa-4x"></i>
                  </div>
                  <div className="font-inter">
                  </div>
                  <div>
                    <div className="text-3xl pb-2 font-bold">
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
                      <p className="text-sm">{userData.birthdate.toDate().toLocaleDateString()}</p>
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
          <div className="flex justify-left">
            <p className="mt-5 h-10 text-xl font-bold">
              My posts
            </p>
          </div>

          {usersPosts.map((post, index) => (
            <PostCard key={index} post={post}/>
          ))}
        </div>
      </div>
    </>
  );
}
