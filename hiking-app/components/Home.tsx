import React from 'react'
import NewPost from './NewPost'
import PostCard from './PostCard'
import Header from './Header'

export default function Home() {
  return (

    <main className="flex flex-col ">
      <Header />
      <section className="flex flex-row ">
        <NewPost />

        <section className="flex flex-col w-1/5 place-items-center p-2">
          {/*recommendations */}
        </section>

        {/* Main screen in the middle */}
        <section className="flex flex-col w-3/5 place-items-center p-2 gap-2">
          <div className="alert shadow-md main-box">
            <div>
              <img src="/profilbilde.jpg" className="w-12 h-12 rounded-full" /> {/*sett  inn profilbilde*/}
            </div>
            <div className="flex-none main-box w-5/6">
              <label htmlFor="my-modal-3" className="btn btn-outline rounded-full w-full">opprett innlegg:</label>
            </div>
          </div>
          <PostCard />
        </section>
        <section className="flex flex-col w-1/5 place-items-center p-2">
          {/* ads */}
        </section>
      </section>
    </main>
  )
}
