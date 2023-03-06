"use client";
import { firestore } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { PostData } from "types/PostData";

type Props = {
  post: PostData;
};

export default function EditPostModal({ post }: Props) {
 
  const [price, setPrice] = useState(post.price);
  const [length, setLength] = useState(post.length)
  const [rating, setRating] = useState(post.rating);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [stops, setStops] = useState(post.stops); // array to hold the stop inputs
  const [newStop, setNewStop] = useState("") // array to hold the stop inputs


  async function updatePost() {
    const docRef = doc(firestore, "posts", "post: " + post.id);
    const editedData = {
      stops: stops,
      price: price,
      rating: rating,
      description: description,
      length: length,
      title: title,
    };

    try {
      await updateDoc(docRef, editedData)
      window.location.reload();
      console.log(
        "Update successful"
      );
    } catch (error) {
      console.log(error);
    }
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
      <input type="checkbox" id="edit-modal" className="modal-toggle" />
      <div className="modal"> {/* Opprett innlegg boks */}
        <div className="modal-box relative h-4/5 w-full max-w-5xl">
          <h1> Edit Post </h1>
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
                <input
                  className="border mx-2 mb-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder='Title of the trip'>
                </input>
              </div>
              <div className="flex">
                <label>Trip length: </label>
                <input className="border mx-2 mb-1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  type="text"
                  placeholder='Trip length'>
                </input>
              </div>
              <div className="flex">
                <label>Price: </label>
                <input
                  className="border mx-2 mb-1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  placeholder="Price"
                ></input>
              </div>
              <div className="flex">
                <label>Rating: </label>
                <div className="rating rating-lg rating-half">
                  <input type="radio" name="rating-10" className="rating-hidden" />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={() => setRating(0.5)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={() => setRating(1)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={() => setRating(1.5)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={() => setRating(2)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={() => setRating(2.5)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={() => setRating(3)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={() => setRating(3.5)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={() => setRating(4)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" onChange={() => setRating(4.5)} />
                  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" onChange={() => setRating(5)} />
                </div>
              </div>
              {/* <StopDiv></StopDiv> */}
              <div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    addStop(newStop);
                    setNewStop("");
                  }}
                ><label>Stops: </label>
                  <input className="mx-2 mb-1" placeholder="Stop" value={newStop} type="text" name="stop" onChange={(e) => setNewStop(e.target.value)} />
                  {" "}
                  <button type="submit" className='btn btn-xs btn-primary'>+</button>
                </form>
              </div>
              <ul>
                {stops && stops.map((stop, index) => (
                  <li key={index}>
                    {stop + " "}
                    <button className="btn btn-xs btn-secondary" onClick={() => removeStop(index)}>-</button>
                  </li>
                ))}
              </ul>
              <div className=''>
                <label>Trip description: </label>
                <textarea
                  className="block textarea textarea-bordered w-full max-w-sm"
                  maxLength={140}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell people about your trip!">
                </textarea>
              </div>

            </div>
            <button
              onClick={updatePost}
              className="btn border border-solid border-black"
            >
              Save{" "}
            </button>
            <label
              htmlFor="edit-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
