import React from 'react'
import { CreatePostModal } from "./CreatePostModal";
import PostCard from './PostCard'
import Header from './Header'
import useFetchPosts from 'hooks/fetchPosts';

export default function Home() {
  const { recentPostsList } = useFetchPosts();
  
  function empty(){

  }
  return (

    <main className="flex flex-col ">
      <Header />
      <div className="flex flex-row justify-center">
        <CreatePostModal />
        {/* Main screen in the middle */}
        <div className="flex flex-col w-full min-w-[70%] sm:w-3/5 place-items-center p-2 gap-2">
          <div className="w-full main-box flex justify-between items-center">
            <div className="flex main-box w-full">
              <label htmlFor="create-modal" className="btn btn-outline bg-neutral-50 
              rounded-full w-full">
                Create new post
                </label>
            </div>
          </div>
          <div className='font-extrabold text-2xl'>
            Recent posts:
          </div>
          {recentPostsList.map((postData, index) => (
            <PostCard onLike={empty} key={index} post={postData}/>
            ))}
        </div>
      </div>
    </main>
  )
}
