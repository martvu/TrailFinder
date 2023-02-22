"use client";
import { useAuth } from "context/AuthContext";
import { firestore } from "../firebase/firebase";
import { Timestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import useFetchUser from "hooks/fetchUser";
import { useRouter } from "next/router";
import { PostData } from "hooks/PostData";

type Props = {
	post: PostData;
};

export default function EditPostModal({ post }: Props) {
	const { currentUser } = useAuth();
	const [price, setPrice] = useState(post.price);
	const [rating, setRating] = useState(post.rating);
	const [title, setTitle] = useState(post.title);
	const [numStops, setNumStops] = useState(0);
	const [stops, setStops] = useState([] as string[]); // array to hold the stop inputs
	const { userData } = useFetchUser();

	const router = useRouter();

	function addStop(): void {
		setStops((prevStops) => [...prevStops, ""]); // add an empty string to the stops array
	}

	async function updatePost() {
		const docRef = doc(firestore, "posts", "post: " + post.id);
		const editedData = {
        id: post.id,
        price: price,
        rating: rating,
        title: title,      
		};

    try{
      await updateDoc(docRef, editedData)
      window.location.reload();
      console.log(
        "Update successful"
      );
    } catch (error) {
      console.log(error);
    }
	}

	return (
		<div>
			<input type="checkbox" id="edit-modal" className="modal-toggle" />
			<div className="modal">
				{" "}
				{/* Opprett innlegg boks */}
				<div className="modal-box relative h-4/5 w-full max-w-5xl">
					<h1> Edit Post </h1>
					<div className="divider"></div>
					<div className="flex flex-row">
						<div className="flex flex-col w-2/5">
							<div className="flex flex-row place-items-center h-full">
								<img
									src="images/bg_trailfinder.png"
									className="w-full h-full pr-10"
								/>{" "}
								{/*sett  inn profilbilde*/}
								<div className="opprett-info p-1">
									{/* importer navn på brukeren*/}
								</div>
							</div>
						</div>
						<div className="flex flex-col w-3/5">
							<div className="flex">
								<label>Title: </label>
								<input
									className="border mx-2 mb-1"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									type="text"
									placeholder="Title of the trip"
								></input>
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
								<input
									className="border mx-2 mb-1"
									onChange={(e) =>
										setRating(parseInt(e.target.value))
									}
									value={rating}
									type="number"
									min="1"
									max="5"
									placeholder="Rating"
								></input>
							</div>
							<div className="addStops">
								Add stops:{" "}
								<button
									onClick={addStop}
									className="btn btn-xs rounded-full"
								>
									+
								</button>
							</div>
							<div className="">
								<label>Comments: </label>
								<textarea
									className="textarea textarea-bordered w-full"
									placeholder="Tell about your trip!"
								></textarea>
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
