import React from 'react';
import useFetchPosts from 'hooks/fetchPosts';
import CreatePostModal from './CreatePostModal';
import PostCard from './PostCard';
import Header from './Header';

export default function Home() {
  const { postList } = useFetchPosts();

  return (

    <main className="flex flex-col ">
      <Header />
      <div className="flex flex-row justify-center">
        <CreatePostModal />
        {/* Main screen in the middle */}
        <div className="flex flex-col w-full min-w-[70%] sm:w-3/5 place-items-center p-2 gap-2">
          <div className="w-full main-box flex justify-between items-center">
            <div className="flex main-box w-full">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor="create-modal"
                className="btn btn-outline bg-neutral-50 rounded-full w-full"
              >
                Create new post
              </label>
            </div>
          </div>
          <div className="font-extrabold text-2xl">
            Recent posts:
          </div>
          {postList.map((postData) => (
            <PostCard key={postData.id} post={postData} />
          ))}
        </div>
      </div>
    </main>
  );
}
