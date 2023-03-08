'use client';

import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useFetchUser } from 'context/AuthContext';
import { firestore } from '../firebase/firebase';

type EditProfileProps = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProfile({ setEdit }: EditProfileProps) {
  const { userData, setUserData } = useFetchUser();
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
    }
  }, [userData]);

  async function updateUser() {
    if (firstName !== '' && lastName !== '' && currentUser) {
      const docRef = doc(firestore, 'users', currentUser.uid);
      const data = {
        firstname: firstName,
        lastname: lastName,
      };
      await updateDoc(docRef, data)
        .then(() => {
          console.log('A New Document Field has been added to an existing document');
        })
        .catch((e) => {
          console.log(e);
        });
      const newUserData = { ...userData, firstname: firstName, lastname: lastName };
      setUserData(newUserData);
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
      <div className="flex h-screen items-center justify-center">
        <div className="relative w-96 max-h p-6 py-3 shadow-lg bg-white rounded-md gap-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl block text-center font-bold text-green-500">
              Edit profile
            </h1>
            <i className="fa-solid fa-pen-to-square mx-3" />
          </div>

          <button onClick={() => { setEdit(false); }} type="button" title="Exit editing" className="btn btn-sm btn-circle absolute right-2 top-2">
            <i className="inline fa-solid fa-xmark" />
          </button>
          <div className="mt-3 text-center">
            <div className="flex justify-center items-center border p-8 shadow-lg bg-white rounded-full w-12 h-12 mx-auto">
              <i className="fa-solid fa-user fa-2x " />
            </div>
            <p className="text-xs mt-2 mb-3 block">{userData.email}</p>
          </div>
          <div className="flex mb-3 items-center">
            <label htmlFor="firstName">
              First name:
              <input
                className="p-1 rounded-md border focus:outline-primary mx-2"
                value={firstName}
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />
            </label>

          </div>
          <div className="flex items-center">
            <label htmlFor="lastName">
              Last name:
              <input
                className="p-1 rounded-md border focus:outline-primary mx-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                name="lastName"
                placeholder={lastName}
              />
            </label>
          </div>
          {error && <div className="w-full max-w-[30ch] text-center border-rose-300 text-rose-300">{error}</div>}
          <div className="mt-3 text-center">
            <button type="button" onClick={() => { updateUser(); }} className="btn-sm btn-primary text-white font-bold rounded-md justify-center">Confirm</button>
          </div>
        </div>
      </div>
    </div>

  );
}
