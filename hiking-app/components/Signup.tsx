import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from "../firebase/firebase";
import { setDoc, doc, addDoc, collection, Timestamp } from 'firebase/firestore';
import InputField from './Inputfield';
import { useRouter } from 'next/navigation';
import { ref, set } from 'firebase/database';
import Link from 'next/link';

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
      await setDoc(doc(db, "users", user.uid), {
        firstname: firstName,
        lastname: lastName,
        birthdate: Timestamp.fromDate(new Date(birthDate)),
        username: username,
      });
      //set(ref(db, 'users/' + username), email );
      router.push('/login');
    } catch (e) {
      // delete created documents from potentially auth, firestore and realtime database
      console.log("Error: " + e);
      setError("Sign-up was not successful.. try again!")
    }
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
            <div className="text-center">
              <button className="btn btn-primary text-white font-bold my-2 py-2 px-4 rounded-md">Sign-up</button>
            </div>
            <div className="mt-3 text-center text-sm text-gray-500">
        Already have a user?
        <Link href="/login" className="font-bold mx-2 duration-300 hover:opacity-40">
          Login here
        </Link>
      </div>
          </form>
        </div>
      </div>
    </div>
  );
};