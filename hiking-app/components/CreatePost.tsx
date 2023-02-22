'use client'
import { useAuth } from 'context/AuthContext';
import { db, firestore } from '../firebase/firebase';
import { Timestamp, addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import useFetchUser from 'hooks/fetchUser';
import { useRouter } from 'next/router';
import { PostData } from 'hooks/PostData';


export default function CreatePostComponent() {

  const { currentUser } = useAuth();
  const [price, setPrice] = useState("")
  const [length, setLength] = useState("")
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [numStops, setNumStops] = useState(0)
  const [stops, setStops] = useState([] as string[]) // array to hold the stop inputs
  const [newStop, setNewStop] = useState("") // array to hold the stop inputs
  const { userData } = useFetchUser();

  const router = useRouter();

  function createPostData(){
    const now = new Date(Date.now());
    const dateString = now.toString();
    if (userData) {
      const newPost: PostData = {
        id: dateString,
        date: Timestamp.now(),
        stops: stops,
        price: price,
        rating: rating,
        description: description,
        length: length,
        title: title,
        username: userData.username
      }
      return newPost;
  };
}
  
  async function handleAddPost() {
    const newPost = createPostData();
    console.log(newPost);
    if(newPost){
    const postRef = doc(firestore, 'posts', 'post: ' + newPost.id);
    await setDoc(postRef, newPost);
    

    console.log("Successful");
    window.location.reload();
    }

  };

  function updateStops() {
    stops.push(newStop);
    const newStops = stops;
    setStops(newStops)
  }

  function addStop(stop: string) {
    setStops([...stops, stop]);
  }

  function removeStop(index: number) {
    const newStops = [...stops];
    newStops.splice(index, 1);
    setStops(newStops);
  }


  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal"> {/* Opprett innlegg boks */}
        <div className="modal-box relative h-4/5 w-full max-w-5xl">
          <h1> New Post </h1>
          <div className="divider"></div>
          <div className="flex flex-row">
            <div className="flex flex-col w-2/5">
              <div className="flex flex-row">
                <img src="images/bg_trailfinder.png" className="w-full pr-10 mx" /> {/*sett  inn profilbilde*/}
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
                <label>Trip length: </label>
                <input className="border mx-2 mb-1"
                  onChange={(e) => setLength(e.target.value)}
                  type="text"
                  placeholder='Trip length'>
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
              {/* <StopDiv></StopDiv> */}
               <div>

              <ul>
                {stops.map((stop, index) => (
                  <li key={index}>
                    {stop + " "}
                    <button className="btn btn-xs btn-secondary" onClick={() => removeStop(index)}>-</button>
                  </li>
                ))}
              </ul>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  addStop(newStop);
                  setNewStop("");
                }}
              >
                <input value={newStop} type="text" name="stop" onChange={(e) => setNewStop(e.target.value)}/>
                {" "}
                <button type="submit" className='btn btn-xs btn-primary'>+</button>
              </form>
</div>

              <div className=''>
                <label>Trip description: </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell people about your trip!">
                </textarea>
              </div>

            </div>
            <button onClick={handleAddPost} className='btn border border-solid border-black'>Publish </button>
            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          </div>
        </div>
      </div>
    </div>
  )
}