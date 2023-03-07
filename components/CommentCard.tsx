import React, { useState } from 'react'
import UtilityButtons from './UtilityButtons'
import { PostData } from 'hooks/PostData'

type postProps = {
  post: PostData
}


export default function CommentCard(postProps: postProps) {

    const [isDeleted, setIsDeleted] = useState(false);
  const { title, price, rating, date, username, length, stops, description } = postProps.post;

    return(
        <div className="card card-side shadow-md min-w-full max-w-full max-h-64 min-h-64 bg-neutral-50">

            <div className="flex w-full">
  
                {/* left section */}
                <div className='h-64 min-h-full w-1/6 flex items-center flex-col pt-5'>
                    <div className="p-5 flex justify-center items-center border border-solid rounded-full w-12 h-12 border-black">
                        <i className="fa-solid fa-user fa-2x"></i>
                    </div>
                <p className="card-title flex text-sm opacity-90 ">
                {username}</p>
                </div>
            </div>
            
        </div>
    )
}
