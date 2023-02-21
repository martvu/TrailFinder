'use client'

import React, { useState } from 'react';
import InputField from './Inputfield';
import useFetchUser from 'hooks/fetchUser';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase'
import { useAuth } from 'context/AuthContext';

export default function EditProfile({ setEdit }: any) {
  //const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [birthDate, setBirthDate] = useState("");
  //const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { userData, loading } = useFetchUser()
  const { currentUser } = useAuth()

  function updateUser(firstName:string, lastName:string) {
    if (firstName !== "" && lastName !== ""  && currentUser) {
    const docRef = doc(firestore, "users", currentUser.uid);

    const data = {
      firstname: firstName,
      lastname: lastName
    };

    //TODO Kanskje en bedre løsning?
    /* function updateUser(firstName:string, lastName:string, userName:string) {
      if (currentUser && !([firstName, lastName, userName].some(el => el == ""))) {
      const docRef = doc(firestore, "users", currentUser.uid);
  
      const data = {
        username: userName,
        firstname: firstName,
        lastname: lastName
      }; */
    

    updateDoc(docRef, data)
      .then(() => {
        console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
        console.log(error);
      })
      setEdit(false);
    } else {
      setError('Field required');
      console.log('Error');
    }
    
  }

  if (!userData) {
    return <div>Error: User does not exist.</div>;
  }
  return (
    <div>
      <div className={"flex h-screen items-center justify-center"}>
        <div className={"relative w-96 max-h p-6 py-3 shadow-lg bg-white rounded-md gap-4"}>
          <div className='flex items-center justify-center'>
            <h1 className="text-2xl block text-center font-bold text-green-500">
              Edit profile
            </h1>
            <i className="fa-solid fa-pen-to-square mx-3"></i>
          </div>

          <div onClick={() => { setEdit(false) }} className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer hover:opacity-40 duration-300" >
            <i className="inline fa-solid fa-xmark"></i>
          </div>
          <div className='mt-3 text-center'>
            <div className='flex justify-center items-center border p-8 shadow-lg bg-white rounded-full w-12 h-12 mx-auto'>
              <i className="fa-solid fa-user fa-2x "></i>
              {/* <img src="/profilbilde.jpg" alt="Profile" className="w-12 h-12 rounded-full" /> */}
            </div>
            <label className="block text-base mb-3">
              {/* <p>{userData.firstname} {userData.lastname}</p> */}
              <p className='text-xs mt-2'>{userData.email}</p>
            </label>
          </div>
          <InputField label="First Name" placeholder={userData.firstname} setInput={setFirstName} type="text" />
          <InputField label="Last Name" placeholder={userData.lastname} setInput={setLastName} type="text" />
          {/* <InputField label="Change password" placeholder="Enter old password" setInput={s} type="text" />
          <InputField label="New password" placeholder="Enter new password" setInput={set} type="text" /> */}
          {error && <div className='w-full max-w-[30ch] text-center border-rose-300 text-rose-300'>{error}</div>}
          <div className='mt-3 text-center'>
            <button onClick={() => { updateUser(firstName, lastName) }} className="btn-sm bg-green-500 hover:bg-green-700 text-white font-bold rounded-md justify-center">Confirm</button>
          </div>
        </div>
      </div>
    </div>

  );
};
