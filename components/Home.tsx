import React from 'react';
import CreatePostModal from './CreatePostModal';
import Header from './Header';
import PostsList from './PostsList';

export default function Home() {
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
                className="btn btn-outline bg-neutral
              rounded-full w-full"
              >
                Create new post
              </label>
            </div>
          </div>
          <PostsList />
        </div>
      </div>
    </main>
  );
}
