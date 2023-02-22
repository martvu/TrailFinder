import React, { useState } from 'react'
import UtilityButtons from './UtilityButtons'
import { PostData } from 'hooks/PostData'

type postProps = {
  post: PostData
}


export default function PostCard(postProps: postProps) {

  const [isDeleted, setIsDeleted] = useState(false);
  const { title, price, rating, date, username, length } = postProps.post;

  if (isDeleted) {
    return null;
  }
  return (
    <div className="card card-side shadow-md min-w-full max-w-full max-h-64 min-h-64">

      <div className="flex w-full justify-center">
        <div className='h-64 min-h-full w-1/6 flex justify-center pt-5'>
          <div className="p-5 flex justify-center items-center border border-solid rounded-full w-12 h-12 border-black">
            <i className="fa-solid fa-user fa-2x"></i>
          </div>
        </div>


        <UtilityButtons setIsDeleted={setIsDeleted} post={postProps.post} className="absolute bottom-0 left-0 m-2" />
        <div className="card-body">
          <h2 className="card-title font-extrabold absolute top-2">{title}</h2>
          <p className="card-title absolute top-8 text-base">{username}</p>
          <div className='flex flex-col items-start w-2/4 h-4/4 pt-6'>
            <>

              <div className='flex items-center'>
                <p className='font-bold'>Route:</p>

              </div>
            </>
          </div>

          <div className="card-actions bg-base300">
            <a href="#" className="font-bold text-green-500 hover:text-green-700 absolute bottom-2">
              Read more
            </a>
          </div>

        </div>

        <div className="flex relative border-l-2 border-0 border-solid flex-col w-1/5 h-full pr-4 p-3 gap-2 ">
          <div>
            <span className='font-bold'>Price: </span> {price}
          </div>
          <div>
            <span className='font-bold'>Rating: </span> {rating}
          </div>
          <div>
            <span className='font-bold'>Trip length: </span>
            <div>{length}</div>
          </div>

          <div className='text-sm absolute bottom-0 left-0 p-2'>
            {date.toDate().toLocaleDateString().replace(',', '')}
          </div>

        </div>
      </div>
    </div>
  )
}


