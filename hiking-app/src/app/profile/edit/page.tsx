'use client'

import React, { useState } from 'react';
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import Link from 'next/link';

export default function EditProfile() {
  //const navigate = useNavigate();
  //const [firstName, setFirstName] = useState("");
  //const [lastName, setLastName] = useState("");
  //const [birthDate, setBirthDate] = useState("");
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <div className={"flex h-screen items-center justify-center"}>
        <div className={"w-96 max-h p-6 py-3 shadow-lg bg-white rounded-md gap-4"}>
          <div>
            <h1 className="text-3xl block text-center font-bold text-green-500">
              Edit profile
            </h1>
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
          <div className='mt-3'>
            <label className="block text-base mb-2">
              Change Password
            </label>
            <input type="text" placeholder="Enter old password here.." className="input input-sm input-bordered w-full"/>
          </div>
          <div className='mt-3'>
            <input type="password" placeholder="Enter new password here.." className="input input-sm input-bordered w-full" />
            <p className={"text-error"}>{error}</p>
          </div>
          <div className='mt-3'>
            <input type="password" placeholder="Confirm new password here.." className="input input-sm input-bordered w-full" />
            <p className={"text-error"}>{error}</p>
          </div>
          <div className='mt-3 text-center'>
            <Link href="../profile"><button className="btn-sm bg-green-500 hover:bg-green-700 text-white font-bold rounded-md justify-center">Confirm</button></Link>
          </div>
        </div>
      </div>
    </div>

  );
};
