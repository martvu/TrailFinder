import React, { } from 'react';
import useFetchPosts from 'hooks/fetchPosts';
import { useFetchUser } from 'context/AuthContext';
import Header from './Header';
import 'firebase/firestore';
import PostCard from './PostCard';

export default function Profile({ setEdit }: any) {
  const { userData } = useFetchUser();
  const { postList } = useFetchPosts();
  const usersPosts = postList.filter((post) => post.username === userData?.username);

  return (
    <>
      <Header />

      <div className="flex w-full p-4 justify-center items-center flex-col">
        <div className="flex w-full sm:w-4/5 justify-left rounded-md shadow-lg p-4 bg-neutral-50">

          <div className="flex p-4 justify-center items-center font-inter ">

            { userData && (
              <>
                <div className="p-5 mr-10 flex justify-center items-center border border-solid rounded-full grow-0 shrink-0 w-21 h-21 border-black">
                  <i className="fa-solid fa-user fa-4x" />
                </div>
                <div className="font-inter" />
                <div>
                  <div className="text-3xl pb-2 font-bold">
                    {userData.firstname}
                    {' '}
                    {userData.lastname}
                  </div>
                  <div className="mb-2">
                    <p className="text-m">{userData.username}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-m">{userData.email}</p>
                  </div>
                  <div className="mb-2 flex items-center">
                    <i className="fa-solid fa-cake-candles mr-2" />
                    <p className="text-sm">{userData.birthdate}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="inline-flex mr-2">
                      <button
                        onClick={() => setEdit(true)}
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-12 rounded text-xs flex items-center justify-center"
                      >
                        Edit
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
            <div className="flex justify-center">
              <p className="mt-5 h-10 text-xl font-bold">
                My posts
              </p>
            </div>

            {usersPosts.map((post) => (
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
