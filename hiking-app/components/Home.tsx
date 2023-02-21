import React from 'react'
import CreatePostComponent from './CreatePost'
import PostCard from './PostCard'
import Header from './Header'
import useFetchPosts from 'hooks/fetchPosts';


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
          {postList.map((post,index) => (
            <PostCard key= {index}
              //@ts-ignore
              id={post.id}
              //@ts-ignore
              username={post.username}
              //@ts-ignore må løses senere
              price={post.price}
              //@ts-ignore
              rating={post.rating}
              //@ts-ignore
              date={post.date.toDate().toLocaleString().replace(',','')}
              /* date={post.date.toDate().toLocaleString('en-GB', options)} */

              //@ts-ignore
              title={post.title} route={[]}  >
                
              {//@ts-ignore
              }
            </PostCard>
            ))}
        </div>
      </div>
    </main>
  )
}
