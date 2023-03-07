import React, { useEffect, useState } from "react";
import Header from "./Header";
import 'firebase/firestore'
import useFetchPosts from "hooks/fetchPosts";
import PostCard from "./PostCard";
import { useFetchUser } from "context/AuthContext";
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase/firebase';

export default function Profile({ setEdit }: any) {
  const { userData } = useFetchUser();
  const { postList } = useFetchPosts();
  const usersPosts = postList.filter(post => post.username == userData?.username);
  const [profilePicture, setProfilePictureUrl] = useState<string>('');

  useEffect(() => {
    async function fetchProfilePicture() {
      if (userData.profilePicture) {
        const profilePictureRef = ref(storage, userData.profilePicture);
        const downloadUrl = await getDownloadURL(profilePictureRef);
        setProfilePictureUrl(downloadUrl);
      }
    }
    fetchProfilePicture();
  }, [userData]);

  return (
    <>
      <Header />

      <div className="flex w-full p-4 justify-center items-center flex-col">
        <div className="flex w-full sm:w-4/5 justify-left rounded-md shadow-lg p-4 bg-neutral-50">
          <div className="flex p-4 justify-center items-center font-inter">
            { userData && (
              <>
                <div className="p-5 mr-10 flex justify-center items-center border border-solid rounded-full grow-0 shrink-0 w-21 h-21 border-black">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="rounded-full w-20 h-20 object-cover" />
                  ) : (
                    <i className="fa-solid fa-user fa-4x"></i>
                  )}
                </div>
                <div className="font-inter">
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
