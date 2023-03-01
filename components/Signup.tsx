'use client'

import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db, firestore } from "../firebase/firebase";
import { setDoc, doc, deleteDoc, addDoc, collection, Timestamp } from 'firebase/firestore';
import InputField from './Inputfield';
import { useRouter } from 'next/navigation';
import { get, ref, set } from 'firebase/database';

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function signUp() {
    setError("");
    try {
      const userDBref = ref(db, 'users/' + username);
      const usernameDBsnap = await get(userDBref);
      if (usernameDBsnap.exists()) {
        setError("Username already taken.");
        return;
      }
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      const userDoc = setDoc(doc(firestore, "users", user.uid), {
        firstname: firstName,
        lastname: lastName,
        birthdate: Timestamp.fromDate(new Date(birthDate)),
        username: username,
        isAdmin: false,
      });
      const usernameDB = set(ref(db, 'users/' + username), email );
      await Promise.all([userDoc, usernameDB]);
      router.push('/login');
    } catch (error) {
      console.log("Error: " + error);
      setError("Sign-up failed. Try again.");
    }
  }
  function hasAllFieldsFilledOut(): boolean {
    return firstName != "" && lastName != "" && birthDate != "" && email != "" && password != "" && username != "";
    
  }

  //TODO Se på om løsningen under er bedre med tanke på effektivisering
  /* function notAllFieldsFilledOut(): boolean {
    return ([firstName, lastName, birthDate, email, password, username].some(el => el == ""))
  } */

  return (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <form onSubmit={(e) => {
              e.preventDefault(); // prevent default form submission behavior
              signUp();
            }}
            className="w-full sm:w-96 p-6 space-y-4 bg-white rounded-lg shadow-lg"
          >
            <h1 className="text-3xl block text-center font-bold text-green-500">
              Sign-up
            </h1>
            <InputField label="First Name" placeholder="Enter first name..." setInput={setFirstName} type="text" />
            <InputField label="Last Name" placeholder="Enter last name..." setInput={setLastName} type="text" />
            <InputField label="Date of Birth" placeholder="Enter ..." setInput={setBirthDate} type="date" />
            <InputField label="Username" placeholder="Enter username..." setInput={setUsername} type="text" />
            <InputField label="E-mail" placeholder="Enter e-mail..." setInput={setEmail} type="email" />
            <InputField label="Password" placeholder="Enter password..." setInput={setPassword} type="password" />
            {error != "" ? <p className="text-red-500 mt-3">{error}</p> : null}
            <div className="flex justify-between">
              <button className="btn btn-secondary text-white font-bold py-2 px-4 mt-5 rounded-md justify-center" type="button" onClick={router.back}>Back</button>
              <button className="btn btn-primary text-white font-bold py-2 px-4 mt-5 rounded-md justify-center" type="submit" disabled={!hasAllFieldsFilledOut()}>Sign-up</button>
            </div>
          </form>
        </div>
  );
};