'use client'

import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db, firestore } from "src/app/firebase";
import { setDoc, doc, deleteDoc, addDoc, collection, Timestamp } from 'firebase/firestore';
import InputField from './components/inputfield';
import { useRouter } from 'next/navigation';
import { ref, set } from 'firebase/database';

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function signup() {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      //should always work if user is created and firebase is working
      const userDoc = setDoc(doc(firestore,"users", user.uid), {
        firstname: firstName,
        lastname: lastName,
        birthdate: Timestamp.fromDate(new Date(birthDate)),
        username: username,
      });
      const usernameDB = set(ref(db, 'users/' + username), email );
      await Promise.all([userDoc, usernameDB]);
    } catch (error) {
      console.log("Error: " + error);
      setError("Sign-up failed, try again")
      return;
    }
    router.push('/login');
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
          <form onSubmit={(e) => {
            e.preventDefault(); // prevent default form submission behavior
            signup(); // call your signup function
          }}>
            <InputField label="First Name" placeholder="Enter first name..." setInput={setFirstName} type="text" />
            <InputField label="Last Name" placeholder="Enter last name..." setInput={setLastName} type="text" />
            <InputField label="Date of Birth" placeholder="Enter ..." setInput={setBirthDate} type="date" />
            <InputField label="Username" placeholder="Enter username..." setInput={setUsername} type="text" />
            <InputField label="E-mail" placeholder="Enter e-mail..." setInput={setEmail} type="email" />
            <InputField label="Password" placeholder="Enter password..." setInput={setPassword} type="password" />
            <button className="btn btn-primary text-white font-bold py-2 px-4 rounded-md justify-center" type="submit">Sign-up</button>
          </form>
        </div>
      </div>
    </div>
  );
};