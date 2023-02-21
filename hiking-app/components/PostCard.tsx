import { deleteDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/firebase';
import React, { useState } from 'react'
import TrashDiv from './TrashDiv';
import useFetchUser from "hooks/fetchUser";

export default function PostCard(props: { route: Array<string>, children: any, id: string, price: string, rating: number, date: any, title: string , username: string;}) {


  const { route, children, price, rating, date, title , username, id} = props;
  const [isDeleted, setIsDeleted] = useState(false);
  const { userData, loading } = useFetchUser();
  const adminState = userData?.isAdmin ?? false;

  
  async function deletePost() {
    if (adminState || username == userData?.username) {
      await deleteDoc(doc(firestore, 'posts', 'post: ' + id));
      setIsDeleted(true);
    }
    else {
      alert("You don't have permission to delete that post..")
    }
  }

  if(isDeleted){
    return null;
  }

  

  return (
    <div className="card card-side bg-base 300 shadow-md min-w-full max-w-full max-h-64 min-h-64">
      <div className="flex w-full lg:flex-row min-w-full h-64 ">
          <div className='bg-base-300'>
            <img src="/profilbilde.jpg" alt="Profile" className="w-20 h-20 p-2 overflow-hidden rounded-full " />
          </div>

          
          <div onClick ={()=>deletePost()}className="absolute bottom-0 left-0 m-2 duration-200 hover:scale-110 cursor-pointer bg-base ">
            <TrashDiv isVisible={adminState || username == userData?.username} />
          </div>
        <div className="card-body bg-base- w-3/5">

          <h2 className="card-title font-extrabold  absolute top-2">{title}</h2>
          <p className="card-title  absolute top-8 text-base">{username}</p>
          <div className='flex flex-col items-start bg-base-300 w-2/4 h-4/4 pt-6'>
            <>
              {children}
              <div className='flex  bg-base-300 w-full h-full  '>
                <div className='bg-base300 '>
                  <img src="images/bg_trailfinder.png" alt="Profile" className=" object-none h-2/4"  />
                
                </div>
                
                <div className='flex justify-center p-2'>
                  {/* {firstTrip.map((item, index) => (
                    <div className="p-2" key={index}>
                      {item}
                      {index != firstTrip.length -1 && <i className="pl-2 fa-solid fa-arrow-right"></i>}
                    </div>
                  ))} */}
                </div>
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
            <span  className='font-bold'>Price: </span> {price}
          </div>
          <div>
            <span  className='font-bold'>Rating: </span> {rating}
          </div>
          
          <p className='font-bold '>Route:</p>

          <div className='text-sm absolute bottom-0 left-0 p-2'>
            {date}
          </div>
          
        </div>
      </div>
    </div>
  )
}


