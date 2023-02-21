'use client'
import { useAuth } from 'context/AuthContext';
import { db, firestore } from '../firebase/firebase';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import useFetchUser from 'hooks/fetchUser';
import { useRouter } from 'next/router';
import StopDiv from './StopDiv';


type Post = {
  date: any;
  id: string;
  route: Array<string>;
  price: string;
  rating: number;
  title: string;
  username:string;
}

export default function CreatePostComponent() {

  const { currentUser } = useAuth();
  const [price, setPrice] = useState("")
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [route, setRoute] = useState([])
  const [numStops, setNumStops] = useState(0)
  const [stops, setStops] = useState([stop]) // array to hold the stop inputs
  const { userData } = useFetchUser();

  const router = useRouter();

  function createPost(){
    const now = new Date(Date.now());
    const dateString = now.toString();
  if (userData) {
    const newPost: Post = {
      date: serverTimestamp(),
      id: dateString,
      route: route,
      price: price,
      rating: rating,
      username: userData.username,
      title: title
    }
    return newPost;
  };
}
  
  async function handleAddPost() {
    const newPost = createPost();
    console.log(newPost);
    if(newPost){
    const postRef = doc(firestore, 'posts', 'post: ' + newPost.id);
    await setDoc(postRef, newPost);
    

    console.log("Successful");
    window.location.reload();
    }

  };

 /*  const addStop = () => {
    const newStop = <div> Some stop </div>;
    setStops([...stops, newStop]);
  } */

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal"> {/* Opprett innlegg boks */}
        <div className="modal-box relative h-4/5 w-full max-w-5xl">
          <h1> New Post </h1>
          <div className="divider"></div>
          <div className="flex flex-row">
            <div className="flex flex-col w-2/5">
              <div className="flex flex-row place-items-center h-full">
                <img src="images/bg_trailfinder.png" className="w-full h-full pr-10" /> {/*sett  inn profilbilde*/}
                <div className="opprett-info p-1">
                  {/* importer navn på brukeren*/}
                </div>
              </div>
            </div>
            < div className="flex flex-col w-3/5">
              <div className="flex">
                <label>Title: </label>
                <input className="border mx-2 mb-1"
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder='Title of the trip'>
                </input>
              </div>
              <div className="flex">
                <label>Price: </label>
                <input className="border mx-2 mb-1"
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  placeholder='Price'>
                </input>
              </div>
              <div className="flex">
                <label>Rating: </label>
                <div className="rating rating-lg rating-half">
                  <input type="radio" name="rating-10" className="rating-hidden" />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={()=> setRating(0.5) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={()=> setRating(1) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={()=> setRating(1.5) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={()=> setRating(2) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={()=> setRating(2.5) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={()=> setRating(3) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={()=> setRating(3.5) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={()=> setRating(4) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={()=> setRating(4.5) }/>
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={()=> setRating(5) }/>
                </div>
              </div>
              <StopDiv></StopDiv>
              {/* <div className="addStops">
                Add stops: <button onClick={addStop} className="btn btn-xs rounded-full">+</button>
              </div> */}
              <div className=''>
                <label>Comments: </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Tell about your trip!">
                </textarea>
              </div>

            </div>
            <button onClick={()=>{ handleAddPost();}} className='btn border border-solid border-black'>Publish </button>
            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          </div>
        </div>
      </div>
    </div>
  )
}


