'use client'

import React, { useState } from 'react';
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import Link from 'next/link';
import InputField from './Inputfield';

export default function EditProfile({setEdit}:any) {
  //const navigate = useNavigate();
  const [firstName, setFirstName] = useState("Kristine");
  const [lastName, setLastName] = useState("Rapp");
  //const [birthDate, setBirthDate] = useState("");
  //const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <div className={"flex h-screen items-center justify-center"}>
        <div className={"w-96 max-h p-6 py-3 shadow-lg bg-white rounded-md gap-4"}>
          <div className='flex items-center justify-center'>
            <h1 className="text-3xl block text-center font-bold text-green-500">
              Edit profile
            </h1>
            <i className="fa-solid fa-pen-to-square mx-3"></i>
          </div>
          <div className='mt-3 text-center'>
            <div className='shadow-lg bg-white rounded-full w-12 h-12 mx-auto'>
              <img src="/profilbilde.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
            </div>
            <label className="block text-base mb-2">
              <p>Kristine Eide Rapp</p>
              <p className='text-xs'>kristrap@gmail.no</p> 
            </label>
          </div>
          
          <InputField label="First Name" placeholder={firstName} setInput={setFirstName} type="text" />
          <InputField label="Last Name" placeholder={lastName} setInput={setLastName} type="text" />
          <InputField label="Change password" placeholder="Enter old password" setInput={setLastName} type="text" />
          <InputField label="New password" placeholder="Enter new password" setInput={setLastName} type="text" />

          <div className='mt-3 text-center'>
           <button onClick={()=>setEdit(false)} className="btn-sm bg-green-500 hover:bg-green-700 text-white font-bold rounded-md justify-center">Confirm</button>
          </div>
        </div>
      </div>
    </div>

  );
};
