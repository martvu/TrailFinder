'use client'

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';
import {auth, database, firestore} from "src/app/firebase";
import { setDoc, doc } from 'firebase/firestore';
import InputField from './components/inputfield';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  //const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        navigate('/login')
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
          <InputField label="First Name" placeholder="Enter first name..." setInput={setFirstName} type="text" />
          <InputField label="Last Name" placeholder="Enter last name..." setInput={setLastName} type="text" />
          <InputField label="Date of Birth" placeholder="Enter ..." setInput={setBirthDate} type="date" />
          <InputField label="E-mail" placeholder="Enter e-mail..." setInput={setEmail} type="email" />
          <InputField label="Password" placeholder="Enter password..." setInput={setPassword} type="password" />
          <div className='mt-3'>
            <button className="btn btn-primary text-white font-bold py-2 px-4 rounded-md justify-center" type="submit" onClick={signup}>Sign-up</button>
          </div>
        </div>
      </div>
    </div>
  );
};