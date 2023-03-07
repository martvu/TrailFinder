"use client";
import { firestore } from "../firebase/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useFetchUser } from "context/AuthContext";
import { PostData } from "hooks/PostData";
import { PostModal } from "./PostModal";
import CommentCard from "./CommentCard";

type Props = {
	postData: PostData;
};




export function CommentModal({ postData }: Props) {
    const [isDeleted, setIsDeleted] = useState(false);
    const { title, price, rating, date, username, length, stops, description } = postData ;
    return(
        
        <div>
            {/* The button to open modal */}
            <label htmlFor="my-modal-3" className="btn">comments</label>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative h-4/5 w-full max-w-5xl">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col place-items-center p-2 gap-2">
                        <h1> Comments </h1>
                        <div className="divider"/>
                        <div>
                            <textarea className="textarea textarea-bordered max-w-5xl w-full" placeholder="Bio"></textarea>

                        </div>
                        <CommentCard post={postData}/>
                    </div>
                    






                </div>
            </div>
        </div>

    )

}