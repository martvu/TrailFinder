'use client'

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';
import {auth, firestore} from "src/app/firebase";
import firebase from "firebase/compat";
import {BrowserRouter, useNavigate} from "react-router-dom";
import FirebaseError = firebase.FirebaseError;
import Link from 'next/link';
import { setDoc, doc } from 'firebase/firestore';

export default function Signup() {
  //const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function signup() {
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        await setDoc(doc(firestore,"users", user.uid), {name: user.email})
            .then((e) => console.log(e))
            .catch((error) => console.log(error))
            console.log('Document Added')
        //navigate('/login')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Sign-up was not successful.. try again!")

    });
  }

  return (
      <div>
        <div className={"flex h-screen items-center justify-center"}>
          <div className={"w-96 max-h p-6 py-3 shadow-lg bg-white rounded-md gap-4"}>
            <div> 
              <h1 className="text-3xl block text-center font-bold text-green-500">
                Sign-up          
              </h1>
            </div>
              <div className='mt-3'>
                <label className="block text-base mb-2">
                          First Name
                </label>
                <input type="text" placeholder="Enter first name here.." className="input input-bordered w-full"
                       onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div className='mt-3'>
                <label className="block text-base mb-2">
                          Last Name
                </label>
                <input type="text" placeholder="Enter last name here.." className="input input-bordered w-full"
                       onChange={(e) => setLastName(e.target.value)}/>
              </div>
              <div className='mt-3'>
                <label className="block text-base mb-2">
                          Date of birth
                </label>
                <input type="date" className="input input-bordered w-full"
                       onChange={(e) => setBirthDate(e.target.value)}/>
              </div>
              <div className='mt-3'>
                <label className="block text-base mb-2">
                          E-Mail
                </label>
                <input type="text" placeholder="Enter e-mail here.." className="input input-bordered w-full"
                       onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className='mt-3'>
                <label className="block text-base mb-2">
                          Password
                </label>
                <input type="password" placeholder="Enter password here.." className="input input-bordered w-full"
                       onChange={(e) => setPassword(e.target.value)}/>
                <p className={"text-error"}>{error}</p>
              </div>
              <div className='mt-3'>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md justify-center" onClick={signup}>Sign-up</button>
              </div>
            </div>
          </div>
      </div>
      
  );
};