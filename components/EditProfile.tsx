/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useFetchUser } from 'context/AuthContext';
import {
  getDownloadURL, ref, uploadBytesResumable, deleteObject,
} from 'firebase/storage';
import useFetchPicture from 'hooks/fetchPictures';
import { firestore, storage } from '../firebase/firebase';

type EditProfileProps = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProfile({ setEdit }: EditProfileProps) {
  const { userData, setUserData } = useFetchUser();
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const { profilePicture } = useFetchPicture();
  const [file, setFile] = useState<File | null>(null);
  const [percent, setPercent] = useState(0);

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
      setEdit(false);
      if (!file && !profilePicture) {
        await updateDoc(docRef, { profilePicture: null }).then(() => {
          setUserData({ ...userData, profilePicture: null });
        }).catch((pictureError) => {
          console.log(pictureError);
        });
      }
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setFile(selectedFile);
    }
  }

  async function handleUpload() {
    /* if (!file) {
      alert('Please choose a file first!');
    } */
    if (currentUser && file) {
      const storageRef = ref(storage, `/profile-pictures/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
          // setFile(null); // set file to null when the upload is finished
        },
      );
      if (file) {
        const fileUrl = `gs://gruppe64-hiking-app.appspot.com/profile-pictures/${file.name}`;
        const newUserData = { ...userData, profilePicture: fileUrl };
        console.log('uploader');
        setUserData(newUserData);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await updateDoc(doc(firestore, 'users', currentUser.uid), { profilePicture: fileUrl });
      }
    }
  }

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <div className="relative w-96 max-h p-6 py-3 shadow-lg bg-neutral rounded-md gap-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl block text-center font-bold text-primary">
              Edit profile
            </h1>
            <i className="fa-solid fa-pen-to-square mx-3" />
          </div>

          <div onClick={() => { setEdit(false); }} className="btn btn-sm btn-circle absolute right-2 top-2">
            <i className="inline fa-solid fa-xmark" />
          </div>
          <div className="flex flex-col justify-center items-center mt-3 text-center">
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {profilePicture ? (
                  <div className="relative">
                    <img src={profilePicture} alt="Profile" className="rounded-full object-cover" />

                  </div>
                ) : (
                  <i className="fa-solid fa-user fa-4x mt-4" />
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (profilePicture) {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    setUserData({ ...userData, profilePicture: null });
                  }
                }}
                className=" btn btn-error btn-outline btn-xs btn-circle absolute top-0 right-0 left-18"
              >
                <i className="fa-solid fa-times" />
              </button>
            </div>
            <div className="flex justify-end items-end">
              <input type="file" className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs mt-4 mb-2" accept="image/*" onChange={handleChange} />
            </div>
            <button type="button" className="btn btn-xs btn-outline" onClick={handleUpload}>Upload</button>
            <p>
              {percent}
              {' '}
              % done
              {' '}
            </p>

            <p className="text-xs mt-2 mb-3 block">{userData.email}</p>
          </div>
          <div className="flex mb-3 items-center">
            <label htmlFor="firstName">
              First name:
              <input
                className="input input-sm input-bordered p-1 rounded-md mx-2"
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
                className="input input-sm input-bordered p-1 rounded-md mx-2"
                value={lastName}
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder={lastName}
              />
            </label>
          </div>
          {error && <div className="w-full max-w-[30ch] text-center border-rose-300 text-rose-300">{error}</div>}
          <div className="mt-3 text-center">
            <button
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={updateUser}
              className="btn-sm btn-primary text-neutral
            font-bold rounded-md justify-center"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
