import React from 'react'
import CreatePostComponent from './CreatePost'
import PostCard from './PostCard'
import Header from './Header'
import useFetchPosts from 'hooks/fetchPosts';
import { PostData } from 'hooks/PostData';


export default function Home() {
  const { postList } = useFetchPosts();
  
  /* Another way to display date */
  /* const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }; */
  
  return (

    <main className="flex flex-col ">
      <Header />
      <div className="flex flex-row justify-center">
        <CreatePostComponent />


        {/* Main screen in the middle */}
        <div className="flex flex-col w-full sm:w-3/5 place-items-center p-2 gap-2">
          <div className="w-full main-box flex justify-between items-center">
            <div className="flex main-box w-full">
              <label htmlFor="my-modal-3" className="btn btn-outline 
              rounded-full w-full">
                Create new post
                </label>
            </div>
          </div>
          <div className='font-extrabold text-2xl'>
            Recent posts:
          </div>
          {postList.map((postData, index) => (
            <PostCard key={index} post={postData}/>
            ))}
        </div>
      </div>
    </main>
  )
}
