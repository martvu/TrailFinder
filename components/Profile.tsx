import React, { useState } from 'react';
import 'firebase/firestore';
import { usePosts } from 'hooks/fetchPosts';
import { useFetchUser } from 'context/AuthContext';
import useFetchPicture from 'hooks/fetchPictures';
import Image from 'next/image';
import PostCard from './PostCard';
import Header from './Header';

type ProfileProps = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Profile({ setEdit }: ProfileProps) {
  const { userData } = useFetchUser();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { recentPostsList } = usePosts();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const myPosts = recentPostsList.filter((post) => post.username === userData?.username);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const likedPosts = recentPostsList.filter(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (post) => post.likedBy.includes(userData?.username) && post.username !== userData?.username,
  );
  const { profilePicture } = useFetchPicture();
  const [filterMyPosts, setFilterMyPosts] = useState(true);
  const [filterLikedPosts, setFilterLikedPosts] = useState(false);

  function handleFilterClick(setFilterMy: boolean, setFilterLiked: boolean) {
    setFilterMyPosts(setFilterMy);
    setFilterLikedPosts(setFilterLiked);
  }

  return (
    <>
      <Header />

      <div className="flex w-full p-4 justify-center items-center flex-col">
        <div className="flex w-full sm:w-4/5 justify-left rounded-md shadow-lg p-4 bg-neutral">

          <div className="flex p-4 justify-center items-center font-inter ">

            {userData && (
              <>
                <div className="avatar pr-5">
                  <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {profilePicture ? (
                      <Image
                        loader={() => profilePicture}
                        src={profilePicture}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full w-28 h-28 object-cover"
                      />
                    ) : (
                      <i className="fa-solid fa-user fa-4x object-cover ml-7 mt-5" />
                    )}

                  </div>
                </div>
                <div>
                  <div className="text-3xl pb-2 font-bold ">
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
                    <p className="text-sm">{userData.birthdate.toDate().toDateString()}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="inline-flex mr-2">
                      <button
                        type="button"
                        onClick={() => setEdit(true)}
                        className="btn btn-sm btn-outline border border-solid border-secondary text-base py-1 px-12 rounded flex items-center justify-center"
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
            <div className="mt-3 mb-3 justify-between flex">

              <button
                type="button"
                onClick={() => { handleFilterClick(true, false); }}
                className={`${filterMyPosts ? 'btn-primary text-lg text-neutral font-extrabold' : ''} 
              btn flex-1 p-3 font-bold`}
              >
                My posts
                {' '}
                <i className="mx-2 mb-1 fa-solid fa-user" />
              </button>

              <button
                type="button"
                onClick={() => { handleFilterClick(false, true); }}
                className={`${filterLikedPosts ? 'btn-accent text-lg text-neutral font-extrabold' : ''} 
              btn flex-1 p-3 font-bold`}
              >
                Liked posts
                {' '}
                <i className="mx-2 fa-solid fa-heart" />
              </button>
            </div>
            {(filterLikedPosts ? likedPosts : myPosts).map((post) => (
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
